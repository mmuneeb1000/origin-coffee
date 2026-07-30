import Header from "../components/store/Header";
import Footer from "../components/store/Footer";
import CheckoutForm from "../components/store/CheckoutForm";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-20">
        <CheckoutForm />
      </main>

      <Footer />
    </div>
  );
}
