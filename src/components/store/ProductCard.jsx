import { ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import Logo from "/coffee.svg";

export default function ProductCard({ product, onView }) {
  const { addItem } = useCart();

  return (
    <div className="group overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative overflow-hidden bg-stone-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-72 items-center justify-center">
            <img className="h-20" src={Logo} />
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700 shadow">
          Popular
        </div>

        <button
          onClick={() => onView?.(product)}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-all duration-300 group-hover:opacity-100 hover:bg-white"
        >
          <Eye size={18} />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-stone-900">{product.name}</h3>

          <span className="text-2xl font-bold text-amber-700">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={16} fill="currentColor" />
          ))}

          <span className="ml-2 text-sm text-stone-500">(4.9)</span>
        </div>

        <p className="line-clamp-2 min-h-[48px] text-stone-600">
          {product.description || "Freshly prepared using premium ingredients."}
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => addItem(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button
            onClick={() => onView?.(product)}
            className="rounded-xl border border-stone-300 px-5 py-3 font-semibold transition hover:border-amber-700 hover:text-amber-700"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
