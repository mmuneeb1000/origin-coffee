import {
  Button,
  Input,
  Textarea,
  Select,
  Switch,
  ImageUploader,
} from "../common";

import useProductForm from "../../hooks/useProductsForm";

export default function ProductForm({
  product,
  categories,
  loading = false,
  onSubmit,
  onCancel,
}) {
  const {
    form,
    errors,
    uploading,
    updateField,
    setImage,
    removeImage,
    validate,
  } = useProductForm(product);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <Input
            label="Product Name"
            required
            value={form.name}
            error={errors.name}
            placeholder="Cappuccino"
            onChange={(e) => updateField("name", e.target.value)}
          />

          <Textarea
            label="Description"
            rows={5}
            value={form.description}
            placeholder="Fresh espresso with steamed milk..."
            onChange={(e) => updateField("description", e.target.value)}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Price"
              required
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              error={errors.price}
              onChange={(e) => updateField("price", e.target.value)}
            />

            <Select
              label="Category"
              required
              value={form.category_id}
              error={errors.category_id}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              onChange={(e) => updateField("category_id", e.target.value)}
            />
          </div>
          <div>
            <ImageUploader value={form.image} onChange={setImage} />

            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}

            {form.image && (
              <div className="mt-3 flex justify-end">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={removeImage}
                >
                  Remove Image
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Preview
            </h3>

            {form.image ? (
              <img
                src={form.image}
                alt={form.name || "Preview"}
                className="aspect-square w-full rounded-xl border object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white text-gray-400">
                No image selected
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-gray-900">
                {form.name || "Product Name"}
              </h4>

              <p className="line-clamp-4 text-sm text-gray-600">
                {form.description ||
                  "Your product description will appear here."}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-2xl font-bold text-amber-800">
                  {form.price ? `$${Number(form.price).toFixed(2)}` : "$0.00"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    form.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {form.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
            <Switch
              label="Featured"
              checked={form.featured}
              onChange={(checked) => updateField("featured", checked)}
            />

            <Switch
              label="Available"
              description="Display this product on the menu."
              checked={form.available}
              onChange={(checked) => updateField("available", checked)}
            />
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t pt-6">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" loading={loading || uploading}>
              {product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
