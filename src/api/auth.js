import api from "./axios";

export const login = (email, password) =>
  api.post("/admin/login", {
    email,
    password,
  });

export const logout = () => api.post("/admin/logout");

export const me = () => api.get("/admin/me");
