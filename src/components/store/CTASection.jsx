import { ArrowRight } from "lucide-react";
import Logo from "/coffee.svg";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur">
          <img src={Logo} />
        </div>

        <h2 className="max-w-3xl text-4xl font-bold text-white md:text-5xl">
          Freshly Brewed Coffee.
          <br />
          Delivered With Care.
        </h2>

        <p className="max-w-2xl text-lg leading-8 text-amber-100">
          Discover handcrafted drinks, premium coffee beans and delicious
          desserts prepared fresh every day.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-amber-900 transition hover:scale-105"
          >
            Explore Menu
            <ArrowRight size={18} />
          </a>

          <a
            href="#categories"
            className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Browse Categories
          </a>
        </div>
      </div>
    </section>
  );
}
