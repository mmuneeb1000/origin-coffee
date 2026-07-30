import { Grid2X2, ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";

export default function CategoriesSection({
  categories = [],
  selectedCategory = null,
  onCategorySelect,
}) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
            <Grid2X2 size={16} />
            Browse Categories
          </div>

          <h2 className="text-4xl font-bold text-stone-900 md:text-5xl">
            Explore Our Menu
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            From handcrafted coffees to delicious desserts, discover everything
            we freshly prepare every day.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 self-start rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-700 transition hover:border-amber-700 hover:text-amber-700">
          View Menu
          <ArrowRight size={18} />
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white py-20 text-center">
          <h3 className="text-xl font-semibold text-stone-700">
            No categories available
          </h3>

          <p className="mt-2 text-stone-500">
            Categories will appear here once they are added.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              active={selectedCategory?.id === category.id}
              onClick={onCategorySelect}
            />
          ))}
        </div>
      )}
    </section>
  );
}
