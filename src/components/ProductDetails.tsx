"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const ProductDetailsPage = () => {
  const { slug } = useParams(); // get product slug from URL
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch product by slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found! Please log in.");
          setLoading(false);
          return;
        }

        const res = await fetch(`https://api.bitechx.com/products/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Error fetching product: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Delete product
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`https://api.bitechx.com/products/${product.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete product");

      alert("Product deleted successfully!");
      router.push("/products");
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Product Image */}
      <div className="w-full h-96 bg-gray-100 mb-6">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Product Info */}
      <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
      <p className="text-gray-600 mb-3">{product.description || "No description available"}</p>
      <p className="text-xl font-semibold text-blue-600 mb-3">${product.price}</p>
      <p className="text-gray-700 mb-6">
        Category: <span className="font-medium">{product.category?.name}</span>
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push(`/products/edit/${product.id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`px-4 py-2 rounded-lg cursor-pointer text-white transition ${
            isDeleting ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
