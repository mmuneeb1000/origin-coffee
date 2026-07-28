import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Coffee,
  Grid2x2,
  ShoppingBag,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Products",
    icon: Coffee,
    path: "/products",
  },
  {
    name: "Categories",
    icon: Grid2x2,
    path: "/categories",
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    path: "/orders",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function MobileSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold text-amber-700">Origin Coffee</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {links.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={onClose}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 ${
                  isActive ? "bg-amber-700 text-white" : "hover:bg-stone-100"
                }`
              }
            >
              <Icon size={20} />

              {name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
