import { Button, Input } from "../common";
import { useEffect, useState } from "react";

export default function CategoryForm({
  category,
  loading = false,
  onSubmit,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(category?.name || "");
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    setError("");

    await onSubmit({
      name: name.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Category Name"
        placeholder="Coffee"
        value={name}
        error={error}
        onChange={(e) => {
          setName(e.target.value);

          if (error) {
            setError("");
          }
        }}
      />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={loading}>
          {category ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
