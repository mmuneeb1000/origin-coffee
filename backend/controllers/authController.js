import { supabaseAuth } from "../origin/supabase.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        error: error.message,
      });
    }

    res.json({
      user: data.user,
      session: data.session,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { error } = await supabaseAuth.auth.signOut();

    if (error) throw error;

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const me = async (req, res) => {
  res.json({
    user: req.user,
    admin: req.admin,
  });
};
