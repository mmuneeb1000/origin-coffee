import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Logo from "/coffee.svg";

export default function FeaturedProducts({ products = [], onViewProduct }) {
  return (
    <section id="menu" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              <img className="h-6" src={Logo} />
              Featured Menu
            </div>

            <h2 className="text-4xl font-bold text-stone-900 md:text-5xl">
              Customer Favorites
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
              Our most loved handcrafted drinks and freshly prepared treats.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 self-start rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-700 transition hover:border-amber-700 hover:text-amber-700">
            View Full Menu
            <ArrowRight size={18} />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 py-20 text-center">
            <Coffee size={48} className="mx-auto text-stone-300" />

            <h3 className="mt-6 text-xl font-semibold text-stone-700">
              No products available
            </h3>

            <p className="mt-2 text-stone-500">
              Products will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={onViewProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
