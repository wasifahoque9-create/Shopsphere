"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

type ReviewItem = {
  name: string;
  image: string;
  stars: number;
  text: string;
  location: string;
};

const reviews: ReviewItem[] = [
  {
    name: "Sunaina Suirat",
    image: "/image/re1.jpg",
    stars: 5,
    location: "Dhaka",
    text: "Excellent as always, recommend this store 100%. Fast dispatch, fast delivery and fair prices.",
  },
  {
    name: "Nadia Nisha",
    image: "/image/re2.jpg",
    stars: 4,
    location: "Khulna",
    text: "I recently made a mistake with my address and both Best Grocery and DHL saved the day.",
  },
  {
    name: "Aziza Meherin",
    image: "/image/re3.jpg",
    stars: 5,
    location: "Rajshahi",
    text: "Best grocery, impresses with fresh quality groceries and reliable delivery.",
  },
  {
    name: "Muntaha Jahed",
    image: "/image/re4.jpg",
    stars: 5,
    location: "Chattogram",
    text: "They were always accessible and open to help when I had a problem regarding delivery.",
  },
  {
    name: "Ayesha Islam",
    image: "/image/re1.jpg",
    stars: 5,
    location: "Sylhet",
    text: "Very fresh products and amazing customer support.",
  },
  {
    name: "Tanvir Hasan",
    image: "/image/re2.jpg",
    stars: 5,
    location: "Barishal",
    text: "Quick delivery and quality groceries every time.",
  },
];

export default function Review() {
  return (
    <section id="Review" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h1 className="mb-16 text-center text-4xl font-bold">
          <span style={{ color: "#121358" }}>Customer </span>
          <span style={{ color: "#EA580C" }}>Review</span>
        </h1>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div
                className="
                  relative
                  mx-auto
                  mt-12
                  flex
                  h-[380px]
                  w-full
                  flex-col
                  items-center
                  rounded-xl
                  border
                  border-transparent
                  p-6
                  text-center
                  shadow-md
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:border-orange-500
                  hover:shadow-2xl
                "
                style={{ backgroundColor: "#F3F4F4" }}
              >
                {/* Avatar */}
                <div className="absolute left-1/2 -top-10 -translate-x-1/2">
                  <div className="relative">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          hover:scale-110
                        "
                      />
                    </div>

                    {/* Quote Icon */}
                    <div
                      className="
                        absolute
                        left-1/2
                        bottom-0
                        flex
                        h-8
                        w-8
                        translate-y-1/2
                        -translate-x-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        shadow-md
                      "
                    >
                      <FaQuoteLeft size={12} />
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-12 mb-4 flex gap-1">
                  {[...Array(review.stars)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-500"
                    />
                  ))}
                </div>

                {/* Title */}
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Great Price & Services
                </h2>

                {/* Review Text */}
                <p className="mb-6 text-sm leading-7 text-gray-600">
                  {review.text}
                </p>

                {/* User */}
                <div className="mt-auto">
                  <span className="font-bold text-gray-800 transition-colors duration-300 hover:text-orange-600">
                    {review.name}
                  </span>

                  <span className="text-gray-400">
                    {" "}
                    - From {review.location}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}