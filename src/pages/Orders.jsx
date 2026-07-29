import { useMemo, useState } from "react";
import { Button, Input, Loading } from "../components/common";
import { OrderCard, OrderModal } from "../components/orders";
import useOrders from "../hooks/useOrders";

const filters = [
  {
    value: "",
    label: "All",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "preparing",
    label: "Preparing",
  },
  {
    value: "ready",
    label: "Ready",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];

export default function Orders() {
  const { orders, loading, error, updateStatus, refresh } = useOrders();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        order.phone.includes(search);

      const matchesStatus = !status || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const openOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  if (loading) {
    return <Loading text="Loading orders..." />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

          <p className="mt-1 text-gray-500">Manage incoming coffee orders.</p>
        </div>

        <Button onClick={refresh}>Refresh</Button>
      </div>

      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
        <Input
          placeholder="Search customer or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setStatus(item.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                status === item.value
                  ? "bg-amber-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {!filteredOrders.length ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} onView={openOrder} />
          ))}
        </div>
      )}

      <OrderModal
        open={showModal}
        onClose={closeModal}
        order={selectedOrder}
        updateStatus={updateStatus}
      />
    </div>
  );
}
