import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";

import { getProducts } from "../api/products";

export default function useMenu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMenu() {
    const [categoriesResponse, productsResponse] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);

    setCategories(categoriesResponse.data);
    setProducts(productsResponse.data);

    setLoading(false);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return {
    categories,
    products,
    loading,
  };
}
