import {
  FiPackage,
  FiFolder,
  FiShoppingBag,
  FiDollarSign,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router";
import useDashboard from "../../hooks/useDashboard";

export default function Dashboard() {
  const { stats, recentOrders, loading } = useDashboard();

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  const cards = [
    {
      title: "Products",
      value: stats.products,
      icon: FiPackage,
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: FiFolder,
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: FiShoppingBag,
    },
    {
      title: "Revenue",
      value: `$${Number(stats.revenue).toLocaleString("en-US")}`,
      icon: FiDollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-1 text-gray-500">Manage your coffee shop overview.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{card.title}</p>

                <div className="rounded-xl bg-amber-100 p-3 text-amber-800">
                  <Icon size={22} />
                </div>
              </div>

              <strong className="mt-4 block text-3xl font-bold text-gray-900">
                {card.value}
              </strong>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>

            <Link
              to="/dashboard/orders"
              className="text-sm font-medium text-amber-800 hover:underline"
            >
              View All
            </Link>
          </div>

          {!recentOrders?.length ? (
            <p className="text-gray-500">No recent orders.</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.customer_name}
                    </p>

                    <p className="text-sm text-gray-500">{order.phone}</p>

                    <p className="mt-1 text-xs capitalize text-gray-500">
                      {order.status}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-amber-800">
                      ${Number(order.subtotal).toLocaleString("en-US")}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-amber-800 p-6 text-white">
          <h2 className="text-xl font-semibold">Quick Actions</h2>

          <div className="mt-5 space-y-3">
            <Link
              to="/dashboard/products"
              className="flex items-center gap-3 rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <FiPlus />
              Add Product
            </Link>

            <Link
              to="/dashboard/categories"
              className="flex items-center gap-3 rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <FiPlus />
              Add Category
            </Link>

            <Link
              to="/dashboard/orders"
              className="flex items-center gap-3 rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <FiShoppingBag />
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
