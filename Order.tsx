// FILE LOCATION: frontend/components/Order.tsx
"use client";

import Image from "next/image";

export default function Order() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: connect this to your Laravel API endpoint
    console.log("Order submitted");
  };

  return (
    <section className="bg-gray-50 px-6 py-16" id="order">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#121358]">
          <span className="text-[#F59E0B]">Order</span> Now
        </h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-col items-center gap-10 lg:flex-row">
        {/* Image Section */}
        <div className="flex flex-1 justify-center">
          <Image
            src="/image/o12.jpg"
            alt="Order Image"
            width={450}
            height={450}
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex-1 rounded-xl bg-white p-8 shadow-lg"
        >
          <div className="mb-4">
            <p className="mb-2 font-semibold text-[#121358]">Name</p>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#F59E0B] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 font-semibold text-[#121358]">Email</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#F59E0B] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 font-semibold text-[#121358]">Number</p>
            <input
              type="tel"
              placeholder="Your number"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#F59E0B] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 font-semibold text-[#121358]">How Much</p>
            <input
              type="number"
              placeholder="How many orders"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#F59E0B] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 font-semibold text-[#121358]">Your Order</p>
            <input
              type="text"
              placeholder="Food name"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#F59E0B] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 font-semibold text-[#121358]">Address</p>
            <input
              type="text"
              placeholder="Your address"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#F59E0B] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#121358] py-3 text-white transition duration-300 hover:bg-[#F59E0B] hover:text-[#121358]"
          >
            Order Now
          </button>
        </form>
      </div>
    </section>
  );
}