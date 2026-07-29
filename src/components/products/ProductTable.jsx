import { FiEdit2, FiTrash2, FiStar } from "react-icons/fi";
import Button from "../common/Button";
import Empty from "../common/Empty";
import Loading from "../common/Loading";

export default function ProductTable({
  products = [],
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <Loading text="Loading products..." />;
  }

  if (!products.length) {
    return (
      <Empty
        title="No Products"
        description="Create your first coffee product."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {product.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                    {product.categories?.name}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold">
                  ${Number(product.price).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.available ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {product.featured ? (
                    <FiStar className="text-amber-500" size={18} />
                  ) : (
                    <FiStar className="text-gray-300" size={18} />
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={FiEdit2}
                      onClick={() => onEdit(product)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      icon={FiTrash2}
                      onClick={() => onDelete(product)}
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
        {products.length} product{products.length !== 1 && "s"}
      </div>
    </div>
  );
}
