import { supabase } from "../origin/supabase.js";

export const getDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: orders, error } = await supabase
      .schema("origin")
      .from("orders")
      .select("status, subtotal, created_at")
      .gte("created_at", today.toISOString());

    if (error) throw error;

    const todayOrders = orders.length;

    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    const completedOrders = orders.filter(
      (o) => o.status === "completed",
    ).length;

    const todayRevenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + Number(o.subtotal), 0);

    res.json({
      todayOrders,
      pendingOrders,
      completedOrders,
      todayRevenue,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
