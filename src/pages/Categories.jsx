import useCategories from "../hooks/useCategories";

export default function Categories() {
  const { categories, loading, removeCategory } = useCategories();

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="mt-6 space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between rounded-lg bg-white p-4 shadow"
          >
            <span>{category.name}</span>

            <button
              onClick={() => removeCategory(category.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
