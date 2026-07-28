import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";

export default function useDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const { data } = await getDashboardStats();
      setStats(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    refresh: fetchStats,
  };
}
