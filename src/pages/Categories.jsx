import { useMemo, useState } from "react";
import { Button, ConfirmDialog, Input, Loading } from "../components/common";
import { CategoryGrid, CategoryModal } from "../components/categories";
import useCategories from "../hooks/useCategories";

export default function Categories() {
  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const openCreateModal = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await removeCategory(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loading text="Loading categories..." />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>

          <p className="mt-1 text-gray-500">Organize your coffee shop menu.</p>
        </div>

        <Button onClick={openCreateModal}>Add Category</Button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <CategoryGrid
        categories={filteredCategories}
        loading={loading}
        onEdit={openEditModal}
        onDelete={setDeleteTarget}
      />

      <CategoryModal
        open={showModal}
        onClose={closeModal}
        category={selectedCategory}
        addCategory={addCategory}
        editCategory={editCategory}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        loading={deleting}
        title="Delete Category"
        description={`Delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
