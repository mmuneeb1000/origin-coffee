import { Link, Navigate, useLocation } from "react-router-dom";
import { CheckCircle2, Coffee, ArrowRight, Receipt } from "lucide-react";

import Header from "../../components/store/Header";
import Footer from "../../components/store/Footer";

export default function CheckoutSuccess() {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { orderId, customerName, orderType, subtotal, itemCount } = state;

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center px-6 py-28">
        <div className="w-full max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 size={54} className="text-green-600" />
            </div>

            <h1 className="mt-8 text-4xl font-bold text-stone-900">
              Thank you, {customerName}!
            </h1>

            <p className="mt-4 text-lg text-stone-600">
              Your order has been placed successfully and is now being prepared.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <div className="mb-5 flex items-center gap-3">
              <Receipt size={22} className="text-amber-700" />

              <h2 className="text-xl font-semibold text-stone-900">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Order ID</span>

                <span className="font-semibold text-stone-900">
                  #{orderId.slice(0, 8).toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500">Order Type</span>

                <span className="font-semibold capitalize text-stone-900">
                  {orderType}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500">Items</span>

                <span className="font-semibold text-stone-900">
                  {itemCount}
                </span>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-semibold text-stone-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-amber-700">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-amber-50 p-6">
            <div className="flex items-center gap-3">
              <Coffee size={22} className="text-amber-700" />

              <h3 className="font-semibold text-amber-900">
                {orderType === "delivery"
                  ? "Your order is being prepared for delivery."
                  : "Your order is being prepared for pickup."}
              </h3>
            </div>

            <p className="mt-3 text-stone-600">
              We appreciate your order. If we need any additional information,
              we'll contact you using the phone number you provided.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/menu"
              className="rounded-xl border border-amber-700 px-6 py-3 text-center font-semibold text-amber-700 transition hover:bg-amber-50"
            >
              Order Again
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-900"
            >
              Back to Home
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
