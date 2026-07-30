import { useMemo, useState } from "react";
import {
  Button,
  ConfirmDialog,
  Input,
  Loading,
  Select,
} from "../../components/common";
import { ProductModal, ProductTable } from "../../components/products";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";

export default function Products() {
  const { products, loading, error, addProduct, editProduct, removeProduct } =
    useProducts();

  const { categories } = useCategories();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = !category || product.category_id === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const openCreateModal = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      await removeProduct(deleteTarget.id);

      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loading text="Loading products..." />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>

          <p className="mt-1 text-gray-500">
            Create, update and manage your coffee menu.
          </p>
        </div>

        <Button onClick={openCreateModal}>Add Product</Button>
      </div>

      <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 md:grid-cols-2">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="All Categories"
          options={categories.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <ProductTable
        products={filteredProducts}
        loading={loading}
        onEdit={openEditModal}
        onDelete={setDeleteTarget}
      />

      <ProductModal
        open={showModal}
        onClose={closeModal}
        product={selectedProduct}
        categories={categories}
        addProduct={addProduct}
        editProduct={editProduct}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        loading={deleting}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
