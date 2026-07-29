import { useState } from "react";
import Modal from "../common/Modal";
import CategoryForm from "./CategoryForm";

export default function CategoryModal({
  open,
  onClose,
  category = null,
  addCategory,
  editCategory,
}) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSaving(true);

      if (category) {
        await editCategory(category.id, values);
      } else {
        await addCategory(values);
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
      title={category ? "Edit Category" : "New Category"}
      size="md"
    >
      <CategoryForm
        category={category}
        loading={saving}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
