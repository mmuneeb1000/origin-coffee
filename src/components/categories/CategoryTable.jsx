import { FiEdit2, FiFolder, FiTrash2 } from "react-icons/fi";
import { Button, Empty, Loading } from "../common";

export default function CategoryTable({
  categories = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <Loading text="Loading categories..." />;
  }

  if (!categories.length) {
    return (
      <Empty
        title="No Categories"
        description="Create your first category to organize your products."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-amber-100 p-3 text-amber-800">
                      <FiFolder size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {category.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ID: {category.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {category.product_count ?? 0}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {category.created_at
                    ? new Date(category.created_at).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={FiEdit2}
                      onClick={() => onEdit(category)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      icon={FiTrash2}
                      onClick={() => onDelete(category)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t bg-gray-50 px-6 py-3 text-sm text-gray-500">
        {categories.length} categor{categories.length === 1 ? "y" : "ies"}
      </div>
    </div>
  );
}
