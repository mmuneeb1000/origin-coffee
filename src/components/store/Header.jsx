import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, ChevronDown } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import Logo from "/coffee.svg";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "Menu",
      href: "#menu",
    },
    {
      name: "Categories",
      href: "#categories",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Contact",
      href: "#footer",
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-stone-200/70 bg-white/90 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-3 transition hover:opacity-80"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-800 text-white shadow-lg">
            <img src={Logo} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-stone-900">Origin Coffee</h1>

            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Since 2026
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-stone-700 transition hover:text-amber-700"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="rounded-xl border border-stone-200 p-3 transition hover:border-amber-700 hover:bg-amber-50">
            <Search size={18} />
          </button>

          <button
            onClick={openCart}
            className="relative rounded-xl border border-stone-200 p-3 transition hover:border-amber-700 hover:bg-amber-50"
          >
            <ShoppingBag size={18} />

            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-700 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-stone-200 p-3 lg:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="space-y-2 px-6 py-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 font-medium text-stone-700 transition hover:bg-amber-50 hover:text-amber-700"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {
                openCart();
                setMobileOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl border border-stone-200 px-4 py-3 font-medium transition hover:border-amber-700 hover:bg-amber-50"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                Shopping Cart
              </div>

              <span className="rounded-full bg-amber-700 px-2 py-1 text-xs font-semibold text-white">
                {count}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
