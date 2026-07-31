import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-stone-100">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="text-stone-500">
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="rounded-xl bg-amber-700 px-6 py-3 text-white">
        Back to Dashboard
      </Link>
    </main>
  );
}
