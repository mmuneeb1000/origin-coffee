import { ArrowRight, Star } from "lucide-react";
import Logo from "/coffee.svg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-amber-600/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row lg:py-32">
        <div className="max-w-2xl flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-amber-100 backdrop-blur">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            Freshly Roasted Every Day
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            Every Cup
            <span className="block text-amber-400">Tells a Story.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-stone-300">
            Experience handcrafted coffee, premium beans, delicious pastries,
            and a warm atmosphere. Made fresh, served with passion.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-7 py-4 font-semibold text-white transition hover:bg-amber-500"
            >
              Explore Menu
              <ArrowRight size={18} />
            </a>

            <a
              href="#categories"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Browse Categories
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <h3 className="text-3xl font-bold text-white">20+</h3>
              <p className="mt-1 text-stone-400">Coffee Varieties</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">100%</h3>
              <p className="mt-1 text-stone-400">Premium Beans</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">4.9★</h3>
              <p className="mt-1 text-stone-400">Customer Rating</p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute h-[420px] w-[420px] rounded-full bg-amber-700/20 blur-3xl" />

          <div className="relative">
            <div className="flex h-[380px] w-[380px] items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
              <img className="h-80" src={Logo} />
            </div>

            <div className="absolute -left-8 top-8 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-xs uppercase tracking-widest text-stone-500">
                Signature
              </p>

              <h4 className="mt-1 font-bold text-stone-900">Caramel Latte</h4>
            </div>

            <div className="absolute -bottom-6 right-0 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-xs uppercase tracking-widest text-stone-500">
                Fresh Beans
              </p>

              <h4 className="mt-1 font-bold text-stone-900">Ethiopian Roast</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
