import api from "./axios";

export const uploadImage = (file) => {
  const formData = new FormData();

  formData.append("image", file);

  return api.post("/admin/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteImage = (fileName) =>
  api.delete(`/admin/upload/${fileName}`);
