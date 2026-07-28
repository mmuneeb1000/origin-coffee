import useProducts from "../hooks/useProducts";

export default function Products() {
  const { products, loading, removeProduct } = useProducts();

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="grid gap-4 mt-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={product.image}
              className="h-32 w-32 object-cover rounded"
            />

            <h2 className="font-semibold mt-2">{product.name}</h2>

            <p>${product.price}</p>

            <button
              onClick={() => removeProduct(product.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
