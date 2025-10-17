"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>(null);

  // Check token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // optional if logout action already clears it
    toast.success("Logged out successfully!");
    router.push("/login");
    setToken(null);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1
        onClick={() => router.push("/products")}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        Product Management
      </h1>

      {token ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition"
        >
          Login
        </button>
      )}
    </nav>
  );
}
