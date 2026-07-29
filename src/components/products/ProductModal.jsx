import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import ProductForm from "./ProductForm";

export default function ProductModal({
  open,
  onClose,
  product = null,
  categories = [],
  addProduct,
  editProduct,
}) {
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setSaving(false);
    }
  }, [open]);

  const handleSubmit = async (values) => {
    try {
      setSaving(true);

      if (product) {
        await editProduct(product.id, values);
      } else {
        await addProduct(values);
      }

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product ? "Edit Product" : "Add Product"}
      size="xl"
    >
      <ProductForm
        product={product}
        categories={categories}
        loading={saving}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
