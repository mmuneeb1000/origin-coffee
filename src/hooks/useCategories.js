import { useEffect, useState } from "react";
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categories";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCategories() {
    try {
      setLoading(true);

      const { data } = await getAdminCategories();

      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addCategory(category) {
    const { data } = await createCategory(category);

    setCategories((prev) => [...prev, data]);

    return data;
  }

  async function editCategory(id, category) {
    const { data } = await updateCategory(id, category);

    setCategories((prev) => prev.map((item) => (item.id === id ? data : item)));

    return data;
  }

  async function removeCategory(id) {
    await deleteCategory(id);

    setCategories((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refresh: fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  };
}
