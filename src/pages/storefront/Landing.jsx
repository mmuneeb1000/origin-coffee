import { useEffect, useState } from "react";

import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";

import Header from "../../components/store/Header";
import Hero from "../../components/store/Hero";
import CategoriesSection from "../../components/store/CategoriesSection";
import FeaturedProducts from "../../components/store/FeaturedProducts";
import CTASection from "../../components/store/CTASection";
import Footer from "../../components/store/Footer";
import ProductModal from "../../components/store/ProductModal";
import CartDrawer from "../../components/store/CartDrawer";

export default function Landing() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const featuredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory.id)
    : products.slice(0, 6);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        <Hero />

        <CategoriesSection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={(category) =>
            setSelectedCategory(
              selectedCategory?.id === category.id ? null : category,
            )
          }
        />

        <FeaturedProducts
          products={featuredProducts}
          onViewProduct={setSelectedProduct}
        />

        <CTASection />
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
