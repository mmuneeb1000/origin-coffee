import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
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
      to: "/",
    },
    {
      name: "Menu",
      to: "/menu",
    },
    {
      name: "Categories",
      to: "/storecategories",
    },
    {
      name: "About",
      to: "/about",
    },
    {
      name: "Contact",
      to: "/contact",
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
            <img src={Logo} alt="Origin Coffee" className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-xl uppercase font-bold text-stone-900">
              Origin Coffee
            </h1>

            <p className="text-xs uppercase text-right tracking-[0.3em] text-stone-500">
              Since 2026
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 font-semibold transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-amber-700/30
        ${
          isActive
            ? "bg-amber-100 text-amber-800"
            : "text-stone-700 hover:bg-amber-50 hover:text-amber-700"
        }`
              }
            >
              {link.name}
            </NavLink>
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
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-xl border border-stone-200 p-3 lg:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="space-y-2 px-6 py-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-amber-700/30
        ${
          isActive
            ? "bg-amber-100 text-amber-800"
            : "text-stone-700 hover:bg-amber-50 hover:text-amber-700"
        }`
                }
              >
                {link.name}
              </NavLink>
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
