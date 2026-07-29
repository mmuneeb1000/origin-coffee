import { FiMapPin, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";
import OrderItems from "./OrderItems";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderDetails({ order }) {
  if (!order) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-gray-50 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>

          <h3 className="font-semibold text-gray-900">#{order.id}</h3>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-4 rounded-2xl border border-gray-200 p-5 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <FiUser className="text-amber-800" />

          <div>
            <p className="text-xs text-gray-500">Customer</p>

            <p className="font-medium">{order.customer_name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiPhone className="text-amber-800" />

          <div>
            <p className="text-xs text-gray-500">Phone</p>

            <p className="font-medium">{order.phone}</p>
          </div>
        </div>

        {order.address && (
          <div className="flex items-center gap-3">
            <FiMapPin className="text-amber-800" />

            <div>
              <p className="text-xs text-gray-500">Address</p>

              <p className="font-medium">{order.address}</p>
            </div>
          </div>
        )}

        {order.notes && (
          <div className="flex items-center gap-3">
            <FiMessageSquare className="text-amber-800" />

            <div>
              <p className="text-xs text-gray-500">Notes</p>

              <p className="font-medium">{order.notes}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Items</h3>

        <OrderItems items={order.order_items} />
      </div>

      <div className="flex justify-end border-t pt-5">
        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>

          <p className="text-2xl font-bold text-amber-800">
            ${Number(order.subtotal).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
