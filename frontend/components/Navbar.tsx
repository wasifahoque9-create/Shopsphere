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