import { createOrder } from "../api/orders";

export default function useCheckout() {
  async function checkout(order) {
    const { data } = await createOrder(order);

    return data;
  }

  return {
    checkout,
  };
}
