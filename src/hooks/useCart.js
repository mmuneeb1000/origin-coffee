import { useEffect, useState } from "react";

export default function useCart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addItem(product) {
    setCart((prev) => [...prev, product]);
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
  };
}
