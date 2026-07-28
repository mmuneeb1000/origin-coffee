import { useState } from "react";
import { uploadImage, deleteImage } from "../api/upload";

export default function useUpload() {
  const [uploading, setUploading] = useState(false);

  async function upload(file) {
    setUploading(true);

    const { data } = await uploadImage(file);

    setUploading(false);

    return data;
  }

  async function remove(fileName) {
    return deleteImage(fileName);
  }

  return {
    uploading,
    upload,
    remove,
  };
}
