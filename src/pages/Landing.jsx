import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";

export default function Landing() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchStoreData() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Failed loading store data", error);
      }
    }

    fetchStoreData();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-5">
          <h1 className="text-2xl font-bold text-amber-900">Origin Coffee</h1>

          <Link
            to="/login"
            className="rounded-lg bg-amber-800 px-5 py-2 text-white"
          >
            Admin
          </Link>
        </div>
      </header>

      <section className="px-6 py-20 text-center">
        <h2 className="text-5xl font-bold">Fresh coffee, crafted daily</h2>

        <p className="mx-auto mt-5 max-w-xl text-stone-600">
          Explore our menu of handcrafted coffee, drinks, and snacks.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <h2 className="mb-6 text-3xl font-bold">Categories</h2>

        <div className="grid gap-5 md:grid-cols-4">
          {categories.map((category) => (
            <div key={category.id} className="rounded-xl bg-white p-5 shadow">
              <h3 className="font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-6 text-3xl font-bold">Our Menu</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl bg-white shadow"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">
                <h3 className="text-xl font-semibold">{product.name}</h3>

                <p className="mt-2 text-stone-600">{product.description}</p>

                <p className="mt-4 font-bold text-amber-800">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
