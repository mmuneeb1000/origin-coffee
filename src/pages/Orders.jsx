import useOrders from "../hooks/useOrders";

export default function Orders() {
  const { orders, loading, changeStatus } = useOrders();

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg p-4 shadow">
            <p>Order #{order.id}</p>

            <p>Status: {order.status}</p>

            <select
              value={order.status}
              onChange={(e) => changeStatus(order.id, e.target.value)}
            >
              <option value="pending">Pending</option>

              <option value="processing">Processing</option>

              <option value="completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
