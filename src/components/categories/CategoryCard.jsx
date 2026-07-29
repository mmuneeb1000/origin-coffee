import { FiCoffee, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "../common";

export default function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-xl bg-amber-100 p-3 text-amber-800">
          <FiCoffee size={22} />
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {category.product_count ?? 0} Products
        </span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>

      <p className="mt-2 text-sm text-gray-500">
        Manage products inside this category.
      </p>

      <div className="mt-6 flex gap-2">
        <Button
          className="flex-1"
          variant="secondary"
          icon={FiEdit2}
          onClick={() => onEdit(category)}
        >
          Edit
        </Button>

        <Button
          className="flex-1"
          variant="danger"
          icon={FiTrash2}
          onClick={() => onDelete(category)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
