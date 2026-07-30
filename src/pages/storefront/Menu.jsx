import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "/coffee.svg";

import Header from "../../components/store/Header";
import Footer from "../../components/store/Footer";
import ProductCard from "../../components/store/ProductCard";
import ProductModal from "../../components/store/ProductModal";
import CartDrawer from "../../components/store/CartDrawer";
import Loading from "../../components/common/Loading";

import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    async function loadData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Failed loading menu", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "all" || product.category_id === selectedCategory;

      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [products, selectedCategory, search]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="py-20">
        <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Freshly Brewed
            </span>

            <h1 className="mt-6 text-5xl font-bold">Our Menu</h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-amber-100">
              Browse our complete collection of handcrafted coffee and freshly
              prepared drinks.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-12 pr-4 focus:border-amber-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSearchParams({})}
                className={`rounded-full px-5 py-2 font-medium transition ${
                  selectedCategory === "all"
                    ? "bg-amber-700 text-white"
                    : "border border-stone-300 bg-white hover:border-amber-700"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSearchParams({
                      category: category.id,
                    })
                  }
                  className={`rounded-full px-5 py-2 font-medium transition ${
                    selectedCategory === category.id
                      ? "bg-amber-700 text-white"
                      : "border border-stone-300 bg-white hover:border-amber-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-24">
              <Loading />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <img src={Logo} />

              <h2 className="mt-6 text-2xl font-bold text-stone-900">
                No Products Found
              </h2>

              <p className="mt-3 text-stone-500">
                Try selecting another category or changing your search.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />
    </div>
  );
}
