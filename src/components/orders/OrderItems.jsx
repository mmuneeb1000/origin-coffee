import { FiCoffee } from "react-icons/fi";

export default function OrderItems({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
        No items found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-xl border border-gray-200 p-4"
        >
          <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
            {item.products?.image ? (
              <img
                src={item.products.image}
                alt={item.products.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                <FiCoffee size={24} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">
              {item.products?.name}
            </h4>

            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>

            {item.options && Object.keys(item.options).length > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                {Object.entries(item.options)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-900">
              ${(Number(item.unit_price) * item.quantity).toFixed(2)}
            </p>

            <p className="text-xs text-gray-500">
              ${Number(item.unit_price).toFixed(2)} each
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
