"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* Top Header */}
      <TopBar />

      {/* Main Navbar */}
      <Navbar />

      <main className="min-h-screen">

        
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}