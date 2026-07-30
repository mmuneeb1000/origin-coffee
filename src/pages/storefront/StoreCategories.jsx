import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo from "/coffee.svg";

import Header from "../../components/store/Header";
import Footer from "../../components/store/Footer";
import Loading from "../../components/common/Loading";

import { getCategories } from "../../api/categories";

export default function StoreCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="py-20">
        <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Browse Menu
            </span>

            <h1 className="mt-6 text-5xl font-bold">Explore Our Categories</h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-amber-100">
              Browse our handcrafted drinks and freshly prepared favorites.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          {loading ? (
            <Loading />
          ) : categories.length === 0 ? (
            <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
              <img src={Logo} />

              <h2 className="mt-6 text-2xl font-bold text-stone-900">
                No Categories Found
              </h2>

              <p className="mt-3 text-stone-500">
                Categories will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/menu?category=${category.id}`}
                  className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-amber-100 to-amber-50">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <img src={Logo} className="h-40" />
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-stone-900">
                      {category.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-stone-500">
                      {category.description ||
                        "Discover delicious drinks and freshly prepared menu items."}
                    </p>

                    <div className="mt-6 flex items-center justify-between text-amber-700">
                      <span className="font-medium">Browse Menu</span>

                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
