import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {
  const { stats, loading } = useDashboard();

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="rounded-lg bg-white p-4 shadow">
          Products
          <strong className="block text-2xl">{stats.products}</strong>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          Categories
          <strong className="block text-2xl">{stats.categories}</strong>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          Orders
          <strong className="block text-2xl">{stats.orders}</strong>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          Revenue
          <strong className="block text-2xl">${stats.revenue}</strong>
        </div>
      </div>
    </div>
  );
}
