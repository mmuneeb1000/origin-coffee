import { useEffect, useState } from "react";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);

      const { data } = await getAdminProducts();

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(product) {
    const { data } = await createProduct(product);

    setProducts((prev) => [...prev, data]);

    return data;
  }

  async function editProduct(id, product) {
    const { data } = await updateProduct(id, product);

    setProducts((prev) => prev.map((item) => (item.id === id ? data : item)));

    return data;
  }

  async function removeProduct(id) {
    await deleteProduct(id);

    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refresh: fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
}
