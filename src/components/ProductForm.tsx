"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductForm = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found for fetching categories");
          return;
        }

        const res = await fetch("https://api.bitechx.com/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Failed to fetch categories:", errorData);
          return;
        }

        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : [];
        setCategories(list);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate input before submit
  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Price must be a valid number";
    else if (Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.categoryId) newErrors.categoryId = "Please select a category";
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please log in.");
      setLoading(false);
      return;
    }

    const payload = {
      categoryId: formData.categoryId,
      description: formData.description,
      images: [formData.imageUrl],
      name: formData.name,
      price: Number(formData.price),
    };

    try {
      const res = await fetch("https://api.bitechx.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      console.log("Product created:", data);

      alert("Product created successfully!");
      router.push("/products");
    } catch (err: any) {
      console.error("Error creating product:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          >
            <option value="">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
