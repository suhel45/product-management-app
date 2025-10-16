"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.bitechx.com/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      dispatch(setToken(data.token));
      alert("Login success ✅");
    } catch (err) {
      setError("Invalid request or network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg rounded-2xl w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
