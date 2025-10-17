"use client";

import { useState } from "react";
import { loginUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const result = await dispatch(loginUser(email));

      if (loginUser.fulfilled.match(result)) {
        const token = result.payload?.access_token || result.payload?.token;
        if (token) {
          localStorage.setItem("token", token);
        }

        toast.success("Login successful!");
        router.push("/products");
      } else {
        toast.error("Invalid email or server error!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
