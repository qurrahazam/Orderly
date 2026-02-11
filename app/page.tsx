type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory?: { quantity: number };
  categories: { category: { name: string } }[];
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    next: { revalidate: 0 },
  });
  return (await res.json()) as Product[];
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our amazing collection</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold opacity-20">
                    {product.name.charAt(0)}
                  </span>
                </div>
                
                {/* Stock Badge */}
                {product.inventory && (
                  <div className="absolute top-3 right-3">
                    {product.inventory.quantity > 0 ? (
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        In Stock ({product.inventory.quantity})
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        Out of Stock
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {product.description || "No description available"}
                </p>

                {/* Categories */}
                {product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.categories.map((c, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200"
                      >
                        {c.category.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                  </div>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products available
            </h3>
            <p className="text-gray-500">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>
    </main>
  );
}