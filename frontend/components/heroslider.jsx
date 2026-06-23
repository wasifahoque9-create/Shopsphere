"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Shop Smart, Live Better",
    description:
      "Discover premium products with unbeatable quality and affordable prices.",
   image: "/homepage2.png",
  },
  {
    id: 2,
    title: "Latest Fashion Collection",
    description:
      "Explore trendy outfits and accessories for every occasion.",
    image: "/homepage1.jpg",
  },
  {
    id: 3,
    title: "Fast Delivery Across Bangladesh",
    description:
      "Get your favorite products delivered safely to your doorstep.",
    image: "/homepage1.jpg",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="h-screen bg-[#121358]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="max-w-7xl mx-auto h-full px-6 grid md:grid-cols-2 items-center gap-10">

            <div>
              <p className="text-[#F59E0B] uppercase tracking-widest mb-3">
                Premium Ecommerce Store
              </p>

              <h1 className="text-5xl font-bold text-white mb-6">
                {slide.title}
              </h1>

              <p className="text-gray-300 mb-8">
                {slide.description}
              </p>

              <button className="bg-[#F59E0B] text-white px-8 py-4 rounded-full">
                Shop Now
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={slide.image}
                alt=""
                className="max-h-[500px]"
              />
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}