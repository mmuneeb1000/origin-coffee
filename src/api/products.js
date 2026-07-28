import api from "./axios";

export const getProducts = () => api.get("/products");

export const getAdminProducts = () => api.get("/admin/products");

export const getProduct = (id) => api.get(`/admin/products/${id}`);

export const createProduct = (data) => api.post("/admin/products", data);

export const updateProduct = (id, data) =>
  api.patch(`/admin/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/admin/products/${id}`);
