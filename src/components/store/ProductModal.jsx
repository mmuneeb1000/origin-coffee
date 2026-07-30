import { X, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import Logo from "/coffee.svg";

export default function ProductModal({ product, open, onClose }) {
  const { addItem } = useCart();

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full bg-white p-3 shadow transition hover:bg-stone-100"
        >
          <X size={20} />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="bg-stone-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-[500px] items-center justify-center">
                <img className="w-20" src={Logo} />
              </div>
            )}
          </div>

          <div className="flex flex-col p-10">
            <div className="mb-4 flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}

              <span className="ml-2 text-stone-500">4.9 Rating</span>
            </div>

            <h2 className="text-4xl font-bold">{product.name}</h2>

            <p className="mt-6 leading-8 text-stone-600">
              {product.description ||
                "Freshly prepared using premium ingredients."}
            </p>

            <div className="mt-8 rounded-2xl bg-stone-50 p-6">
              <div className="flex justify-between">
                <span className="text-stone-500">Category</span>

                <span className="font-semibold">
                  {product.category_name || "Coffee"}
                </span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-stone-500">Price</span>

                <span className="text-2xl font-bold text-amber-700">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => addItem(product)}
              className="mt-auto flex items-center justify-center gap-3 rounded-2xl bg-amber-700 py-4 text-lg font-semibold text-white transition hover:bg-amber-800"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
