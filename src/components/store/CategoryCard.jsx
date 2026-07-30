import Logo from "/coffee.svg";

export default function CategoryCard({ category, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(category)}
      className={`group w-full rounded-3xl border bg-white p-8 text-left transition-all duration-300 ${
        active
          ? "border-amber-600 shadow-xl ring-2 ring-amber-100"
          : "border-stone-200 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 transition-all duration-300 group-hover:bg-amber-700 group-hover:text-white">
          <img src={Logo} />
        </div>

        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
          Category
        </span>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-stone-900">{category.name}</h3>

        {category.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
            {category.description}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium text-amber-700">
            Browse Menu
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 transition-all duration-300 group-hover:bg-amber-700 group-hover:text-white">
            →
          </div>
        </div>
      </div>
    </button>
  );
}
