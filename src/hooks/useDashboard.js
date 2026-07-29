import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import { getAdminOrders } from "../api/orders";

export default function useDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    try {
      setLoading(true);

      const [statsResponse, ordersResponse] = await Promise.all([
        getDashboardStats(),
        getAdminOrders(),
      ]);

      setStats(statsResponse.data);

      setRecentOrders(ordersResponse.data.slice(0, 5));
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    stats,
    recentOrders,
    loading,
    refresh: fetchDashboard,
  };
}
