"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LoginPage from "./login/page";
import ProductPage from "./products/page";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {token ? <ProductPage /> : <LoginPage />}
      </main>
    </>
  );
}
