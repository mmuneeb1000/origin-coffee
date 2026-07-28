import { useEffect, useState } from "react";
import { getOrders, getOrder, updateStatus } from "../api/orders";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    try {
      setLoading(true);

      const { data } = await getOrders();

      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(id, status) {
    const { data } = await updateStatus(id, status);

    setOrders((prev) => prev.map((order) => (order.id === id ? data : order)));

    return data;
  }

  async function fetchOrder(id) {
    const { data } = await getOrder(id);

    return data;
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    refresh: fetchOrders,
    fetchOrder,
    changeStatus,
  };
}
