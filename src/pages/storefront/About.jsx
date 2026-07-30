import Header from "../../components/store/Header";
import Footer from "../../components/store/Footer";
import { Coffee, Heart, Leaf, Award } from "lucide-react";
import Logo from "/coffee.svg";

export default function About() {
  const values = [
    {
      icon: Coffee,
      title: "Premium Coffee",
      description:
        "Every cup is brewed from carefully selected beans to deliver rich flavor and exceptional quality.",
    },
    {
      icon: Heart,
      title: "Made With Passion",
      description:
        "From handcrafted espresso to signature drinks, every order is prepared with care.",
    },
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      description:
        "We use fresh milk, premium syrups, and quality ingredients to ensure every drink tastes its best.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description:
        "Our goal is to provide a welcoming experience with quick service and consistently great coffee.",
    },
  ];

  return (
    <main className="bg-stone-50 mt-20">
      <Header />
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            About Origin Coffee
          </span>

          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight">
            Great coffee begins with great ingredients and people who genuinely
            care.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-amber-100">
            Origin Coffee is more than just a coffee shop. It's a place where
            every cup is crafted with passion, premium beans, and a commitment
            to creating memorable moments for every customer.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900"
              alt="Coffee shop"
              className="h-full w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-800">
              Our Story
            </span>

            <h2 className="mt-3 text-4xl font-bold text-stone-900">
              Crafted for coffee lovers.
            </h2>

            <p className="mt-6 leading-8 text-stone-600">
              Origin Coffee was founded with a simple mission: serve exceptional
              coffee in a warm and inviting atmosphere. Every drink is prepared
              using carefully selected beans, fresh ingredients, and attention
              to detail.
            </p>

            <p className="mt-5 leading-8 text-stone-600">
              Whether you're stopping by for your morning espresso or meeting
              friends over a latte, we strive to make every visit enjoyable and
              every cup unforgettable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-800">
              Why Choose Us
            </span>

            <h2 className="mt-3 text-4xl font-bold text-stone-900">
              What makes Origin Coffee different
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-3xl border border-stone-200 bg-stone-50 p-8 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-stone-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-stone-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div
          className="flex flex-col justify-center mx-auto max-w-5xl rounded-3xl bg-amber-800
         px-8 py-16 text-center text-white shadow-xl"
        >
          <img src={Logo} className="h-24" />

          <h2 className="text-4xl font-bold">Every cup tells a story.</h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-amber-100">
            We believe coffee should be an experience. From sourcing quality
            beans to serving every drink with care, we're committed to making
            every visit worth remembering.
          </p>

          <button className="mt-10 rounded-xl bg-white px-8 py-3 font-semibold text-amber-800 transition hover:bg-amber-50">
            Explore Our Menu
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
