import Loading from "../common/Loading";
import Empty from "../common/Empty";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid({
  categories,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <Loading text="Loading categories..." />;
  }

  if (!categories.length) {
    return (
      <Empty title="No Categories" description="Create your first category." />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
