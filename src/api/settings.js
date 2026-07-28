import api from "./axios";

export const getSettings = () => api.get("/admin/settings");

export const updateSettings = (data) => api.patch("/admin/settings", data);
