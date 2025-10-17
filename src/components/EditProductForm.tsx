"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
}

const EditProductForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fetch single product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://api.bitechx.com/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch product");
          return;
        }

        setFormData({
          id: data.id,
          name: data.name || "",
          description: data.description || "",
        });
      } catch (err) {
        setError("Error fetching product");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // ✅ Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update product via PUT request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://api.bitechx.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update product");
        setLoading(false);
        return;
      }

      setSuccess("✅ Product updated successfully!");
      setLoading(false);

      setTimeout(() => {
        router.push("/products");
      }, 1200);
    } catch (err) {
      setError("Error updating product");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">✏️ Edit Product</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            required
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
