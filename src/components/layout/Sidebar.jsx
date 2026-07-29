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
    path: "/dashboard",
  },
  {
    name: "Products",
    icon: Coffee,
    path: "products",
  },
  {
    name: "Categories",
    icon: Grid2x2,
    path: "categories",
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    path: "orders",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-stone-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-stone-200 p-8">
        <h1 className="text-2xl font-bold text-amber-700">Origin Coffee</h1>

        <p className="mt-1 text-sm text-stone-500">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {links.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-amber-700 text-white"
                  : "text-stone-600 hover:bg-stone-100"
              }`
            }
          >
            <Icon size={20} />

            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
