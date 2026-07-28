import api from "./axios";

export const getCategories = () => api.get("/categories");

export const getAdminCategories = () => api.get("/admin/categories");

export const createCategory = (data) => api.post("/admin/categories", data);

export const updateCategory = (id, data) =>
  api.patch(`/admin/categories/${id}`, data);

export const deleteCategory = (id) => api.delete(`/admin/categories/${id}`);
