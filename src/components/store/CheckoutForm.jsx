import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, ArrowLeft } from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { createOrder } from "../../api/orders";

import { Button, Input, Textarea } from "../common";

export default function CheckoutForm() {
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    orderType: "pickup",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.customerName.trim()) {
      nextErrors.customerName = "Customer name is required.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (form.orderType === "delivery" && !form.address.trim()) {
      nextErrors.address = "Delivery address is required.";
    }

    if (items.length === 0) {
      nextErrors.cart = "Your cart is empty.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      customerName: form.customerName,
      phone: form.phone,
      email: form.email,
      orderType: form.orderType,
      address: form.orderType === "delivery" ? form.address : "",
      notes: form.notes,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        options: {},
      })),
    };

    try {
      setLoading(true);

      const { data } = await createOrder(payload);

      clearCart();

      navigate("/order-success", {
        state: {
          orderId: data.orderId,
          customerName: form.customerName,
          orderType: form.orderType,
          subtotal,
          itemCount,
        },
      });
    } catch (error) {
      alert(error.response?.data?.error || "Unable to place your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-[1fr_420px]"
    >
      <div className="space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-800"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

          <h1 className="text-3xl font-bold text-stone-900">Checkout</h1>

          <p className="mt-2 text-stone-500">
            Complete your details to place your order.
          </p>

          <div className="mt-8 space-y-6">
            <Input
              label="Full Name"
              required
              value={form.customerName}
              error={errors.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
            />

            <Input
              label="Phone Number"
              required
              type="tel"
              value={form.phone}
              error={errors.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />

            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Order Type
              </label>

              <select
                value={form.orderType}
                onChange={(e) => updateField("orderType", e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
              >
                <option value="pickup">Pickup</option>

                <option value="delivery">Delivery</option>
              </select>
            </div>

            {form.orderType === "delivery" && (
              <Input
                label="Delivery Address"
                required
                value={form.address}
                error={errors.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            )}

            <Textarea
              label="Order Notes"
              rows={4}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>
        </div>
      </div>
      <aside className="h-fit rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <ShoppingBag className="text-amber-800" size={22} />

          <div>
            <h2 className="text-xl font-bold text-stone-900">Order Summary</h2>

            <p className="text-sm text-stone-500">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {errors.cart && (
          <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {errors.cart}
          </p>
        )}

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 py-12 text-center">
            <ShoppingBag className="mx-auto mb-4 text-stone-300" size={48} />

            <p className="font-medium text-stone-700">Your cart is empty</p>

            <p className="mt-2 text-sm text-stone-500">
              Add some coffee before checking out.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-stone-100 pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-stone-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-stone-500">
                      ${Number(item.price).toFixed(2)}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-stone-100"
                        >
                          −
                        </button>

                        <span className="w-6 text-center font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t pt-6">
              <div className="flex items-center justify-between text-stone-600">
                <span>Subtotal</span>

                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-xl font-bold text-stone-900">
                <span>Total</span>

                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={items.length === 0}
                className="mt-6 w-full"
              >
                Place Order
              </Button>
            </div>
          </>
        )}
      </aside>
    </form>
  );
}
