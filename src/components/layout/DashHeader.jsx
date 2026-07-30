import { Menu, Bell, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashHeader({ onMenu }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenu}
          className="rounded-xl p-2 hover:bg-stone-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-3 rounded-xl border border-stone-200 px-4 py-2 md:flex">
          <Search size={18} />

          <input
            className="bg-transparent outline-none"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-xl bg-stone-100 p-3">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-white">
            O
          </div>

          <div className="hidden md:block">
            <p className="font-semibold">Origin Coffee</p>

            <p className="text-sm text-stone-500">Administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-stone-100 p-3 text-stone-600 transition hover:bg-red-100 hover:text-red-600"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
