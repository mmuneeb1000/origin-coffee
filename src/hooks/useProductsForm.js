import { useEffect, useState } from "react";
import useUpload from "./useUpload";

const initialState = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  image: "",
  imageFile: "",
  featured: false,
  available: true,
};

export default function useProductForm(product = null) {
  const { upload, uploading, remove } = useUpload();

  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!product) {
      setForm(initialState);
      return;
    }

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category_id: product.category_id || "",
      image: product.image || "",
      imageFile: product.imageFile || "",
      featured: product.featured || false,
      available: product.available === undefined ? true : product.available,
    });
  }, [product]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const setImage = (image) => {
    setForm((prev) => ({
      ...prev,
      image: image.url,
      imageFile: image.fileName,
    }));
  };

  const removeImage = async () => {
    if (form.imageFile) {
      try {
        await remove(form.imageFile);
      } catch {}
    }

    setForm((prev) => ({
      ...prev,
      image: "",
      imageFile: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Product name is required.";
    }

    if (!form.price || Number(form.price) <= 0) {
      nextErrors.price = "Enter a valid price.";
    }

    if (!form.category_id) {
      nextErrors.category_id = "Select a category.";
    }

    if (!form.image) {
      nextErrors.image = "Product image is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  return {
    form,
    errors,
    saving,
    uploading,
    setSaving,
    setErrors,
    updateField,
    setImage,
    removeImage,
    validate,
    reset: () => setForm(initialState),
  };
}
