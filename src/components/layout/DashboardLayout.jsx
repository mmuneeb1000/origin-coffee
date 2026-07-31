import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashHeader from "./DashHeader";
import MobileSidebar from "./MobileSidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100">
      <Sidebar />

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-72">
        <DashHeader onMenu={() => setSidebarOpen(true)} />

        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
