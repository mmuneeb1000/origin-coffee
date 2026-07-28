import { supabase, supabaseAuth } from "../origin/supabase.js";

export async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const {
      data: { user },
      error,
    } = await supabaseAuth.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const { data: admin, error: adminError } = await supabase
      .schema("origin")
      .from("admins")
      .select("user_id, role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      return res.status(500).json({
        success: false,
        message: adminError.message,
      });
    }

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    req.user = user;
    req.admin = admin;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
