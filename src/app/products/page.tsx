"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LIMIT = 8;
const DEBOUNCE_DELAY = 500;

const ProductPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedSearch(searchTerm.trim()),
      DEBOUNCE_DELAY
    );
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch products
  const fetchProducts = async (offsetValue = 0, searchQuery = "") => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found! Please log in first.");
        setLoading(false);
        return;
      }

      const endpoint = searchQuery
        ? `https://api.bitechx.com/products/search?searchedText=${encodeURIComponent(
            searchQuery
          )}`
        : `https://api.bitechx.com/products?offset=${offsetValue}&limit=${LIMIT}`;

      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      const fetchedProducts = Array.isArray(data)
        ? data
        : data.products || [];
      setProducts(fetchedProducts);
      setHasMore(!searchQuery && fetchedProducts.length === LIMIT);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load products
  useEffect(() => {
    if (!debouncedSearch) fetchProducts(offset);
  }, [offset, debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch) fetchProducts(0, debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="p-6 relative">
      {/* Title and Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🛍️ All Products</h1>
        <button
          onClick={() => router.push("/products/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Loading & Error */}
      {loading && (
        <p className="text-gray-500 text-center mt-10">Loading products...</p>
      )}
      {error && <p className="text-red-500 text-center mt-10">{error}</p>}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative"
              >
                {/* Image */}
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col justify-between h-44">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.description || "No description available"}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-600">
                      ${product.price}
                    </p>
                    <button
                      onClick={() =>
                        router.push(`/products/details/${product.slug}`)
                      }
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-600 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {!debouncedSearch && products.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setOffset((prev) => Math.max(0, prev - LIMIT))}
            disabled={offset === 0}
            className={`px-4 py-2 rounded-lg cursor-pointer text-white transition ${
              offset === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            ← Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {offset / LIMIT + 1}
          </span>

          <button
            onClick={() => setOffset((prev) => prev + LIMIT)}
            disabled={!hasMore}
            className={`px-4 py-2 rounded-lg cursor-pointer text-white transition ${
              !hasMore
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
