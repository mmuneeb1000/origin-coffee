import { Minus, Plus, Trash2, Coffee } from "lucide-react";
import { useCart } from "../../hooks/useCart";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const total = Number(item.price) * item.quantity;

  return (
    <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition hover:shadow-md">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Coffee size={36} className="text-stone-300" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-stone-900">
              {item.name}
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              ${Number(item.price).toFixed(2)} each
            </p>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center rounded-xl border border-stone-200">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="p-2 transition hover:bg-stone-100"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[44px] text-center font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="p-2 transition hover:bg-stone-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <span className="text-xl font-bold text-amber-700">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
