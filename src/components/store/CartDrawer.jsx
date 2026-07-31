import { useNavigate } from "react-router";
import { X, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const navigate = useNavigate();

  const { isOpen, closeCart, items, subtotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={closeCart}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Your Cart</h2>

            <p className="text-sm text-stone-500">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={closeCart}
            className="rounded-xl p-2 transition hover:bg-stone-100"
          >
            <X size={22} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={70} className="text-stone-300" />

            <h3 className="mt-6 text-xl font-semibold">Your cart is empty</h3>

            <p className="mt-2 text-stone-500">
              Add a few delicious drinks to get started.
            </p>

            <button
              onClick={closeCart}
              className="mt-8 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <footer className="border-t bg-stone-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-stone-500">Subtotal</span>

                <span className="text-2xl font-bold text-amber-700">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    closeCart();
                    navigate("/checkout");
                  }}
                  className="w-full rounded-xl bg-amber-700 py-4 font-semibold text-white transition hover:bg-amber-800"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                  Clear Cart
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
