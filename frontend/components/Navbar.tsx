"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-[#121358]">
            WorkWorm
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-medium text-gray-700 hover:text-[#121358] transition">
              Home
            </Link>

            <Link href="/products" className="font-medium text-gray-700 hover:text-[#121358] transition">
              Products
            </Link>

            <Link href="/categories" className="font-medium text-gray-700 hover:text-[#121358] transition">
              Categories
            </Link>

            <Link href="/about" className="font-medium text-gray-700 hover:text-[#121358] transition">
              About
            </Link>

            <Link href="/contact" className="font-medium text-gray-700 hover:text-[#121358] transition">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            
            {/* Search Box */}
            <input
              type="text"
              placeholder="Search..."
              className="hidden lg:block px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#121358]"
            />

            {/* Cart Icon */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <ShoppingCart size={22} className="text-gray-800" />

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Login */}
            <button className="bg-[#121358] text-white px-5 py-2 rounded-lg hover:bg-[#1c1d7a] transition">
              Login
            </button>
          </div>
        </div>
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#121358]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6">

        <h1 className="text-white text-3xl font-bold">
          E<span className="text-[#F59E0B]">Commerce</span>
        </h1>

        <ul className="hidden md:flex gap-8 text-white">
          <li>Home</li>
          <li>Products</li>
          <li>Categories</li>
         <li><Link href="/about">About</Link></li>
          <li>Contact</li>
        </ul>

        <button className="bg-[#F59E0B] px-5 py-2 rounded-lg text-white">
          Login
        </button>

      </div>
    </nav>
  );
}