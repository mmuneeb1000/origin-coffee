import useSettings from "../../hooks/useSettings";

export default function Settings() {
  const { settings, loading } = useSettings();

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="mt-6 bg-white p-6 rounded shadow">
        <p>
          Restaurant:
          {settings.restaurant_name}
        </p>

        <p>
          Phone:
          {settings.phone}
        </p>
      </div>
    </div>
  );
}
