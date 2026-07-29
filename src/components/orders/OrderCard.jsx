import { FiClock, FiMapPin, FiPhone, FiShoppingBag } from "react-icons/fi";
import { Button } from "../common";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order, onView }) {
  const itemCount = order.order_items?.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>

          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {order.customer_name}
          </h3>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-5 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FiPhone />
          <span>{order.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiShoppingBag />
          <span className="capitalize">{order.order_type}</span>
        </div>

        {order.address && (
          <div className="flex items-center gap-2">
            <FiMapPin />
            <span className="line-clamp-1">{order.address}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <FiClock />
          <span>{new Date(order.created_at).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-sm text-gray-500">Items</p>

          <p className="font-semibold text-gray-900">{itemCount}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>

          <p className="font-semibold text-amber-800">
            ${Number(order.subtotal).toFixed(2)}
          </p>
        </div>
      </div>

      <Button className="mt-5 w-full" onClick={() => onView(order)}>
        View Order
      </Button>
    </div>
  );
}
