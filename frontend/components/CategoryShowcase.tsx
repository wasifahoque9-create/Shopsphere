// FILE LOCATION: frontend/app/components/CategoryShowcase.tsx
// Import in frontend/app/page.tsx:
//   import CategoryShowcase from "./components/CategoryShowcase";
//   <CategoryShowcase />

type Category = {
  name: string;
  image: string;
};

const categories: Category[] = [
  { name: "iPhone", image: "/hero/mobil1.webp" },
  { name: "Tablet", image: "/hero/tablet.webp" },
  { name: "Mac", image: "/hero/mac.webp" },
  { name: "Laptop", image: "/hero/laptop.webp" },
  { name: "Smart Watch", image: "/hero/smart-watch.webp" },
  { name: "Apple", image: "/hero/apple1.webp" },
  { name: "Smart TV", image: "/hero/smart-tv.jpg" },
  { name: "Gaming Laptop", image: "/hero/game.jpg" },
  { name: "Power Bank", image: "/hero/power-bank.jpg" },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-white px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          <span style={{ color: " #121358" }}>Shop By </span>
          <span style={{ color: "#EA580C" }}>Popular Categories</span>
        </h2>

        {/* Mobile: horizontal scroll. Desktop: wrapped grid row */}
        <div
          className="
            flex gap-6 overflow-x-auto pb-2
            md:grid md:grid-cols-8 md:gap-x-4 md:gap-y-8 md:overflow-visible md:pb-0
            snap-x snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex shrink-0 snap-start flex-col items-center gap-3 md:shrink"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 md:h-28 md:w-28"
                style={{ backgroundColor: "#F3F4F4" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-12 w-12 object-contain md:h-40 md:w-50"
                />
              </div>
              <span
                className="whitespace-nowrap text-xs font-medium md:text-sm"
                style={{ color: "#1F2937" }}
              >
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}