import api from "./axios";

export const createOrder = (data) => api.post("/orders", data);

export const getOrders = () => api.get("/admin/orders");

export const getOrder = (id) => api.get(`/admin/orders/${id}`);
export const getAdminOrders = () => api.get("/admin/orders");

export const updateOrderStatus = (id, status) =>
  api.put(`/admin/orders/${id}/status`, {
    status,
  });

export const updateStatus = (id, status) =>
  api.patch(`/admin/orders/${id}/status`, {
    status,
  });
