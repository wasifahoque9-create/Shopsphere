"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { catalogApi, formatPrice, getProductImage } from "@/lib/api";
import type { Product } from "@/types";

const tabs = [
  {
    label: "Accessories",
    value: "accessories",
    description:
      "Keyboard, mouse, mouse pad, Bluetooth speaker, webcam, cable, converter, memory card, pendrive, microphone.",
    categorySlugs: ["accessories"],
  },
  {
    label: "Gadgets",
    value: "gadgets",
    description:
      "Earbuds, earphones, headphones and audio gadgets.",
    categorySlugs: ["earbuds"],
  },
  {
    label: "Smart Devices",
    value: "smart-devices",
    description:
      "Laptops, mobile phones, desktop PCs and tablets.",
    categorySlugs: ["laptops", "mobile-phones", "desktop-pcs", "tablets"],
  },
];

export default function ProductsByCategory() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const active =
    tabs.find((item) => item.value === activeTab) ?? tabs[0];

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const responses = await Promise.all(
          active.categorySlugs.map((slug) =>
            catalogApi.getCategoryProducts(slug, {
              per_page: 6,
            }),
          ),
        );

        const mergedProducts = responses
          .flatMap((response) => response.data ?? [])
          .slice(0, 6);

        if (isActive) {
          setProducts(mergedProducts);
        }
      } catch (error) {
        console.error("Unable to load products by category:", error);

        if (isActive) {
          setProducts([]);
          setError("Products could not be loaded.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [activeTab, active.categorySlugs]);

  return (
    <section className="bg-[#EEF2FF] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-600">
              Explore Our Technology
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#121358] sm:text-4xl">
              Products By Category
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {active.description}
            </p>
          </div>

          <div className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`whitespace-nowrap rounded-xl px-6 py-3 text-sm font-black transition ${
                  activeTab === tab.value
                    ? "bg-[#121358] text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#121358]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-sm font-bold text-slate-500 shadow-sm">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const imageUrl = getProductImage(product);
              const price = formatPrice(
                Number(product.effective_price ?? product.price),
              );

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                        {product.brand ?? "ShopSphere"}
                      </p>

                      <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] text-lg font-black text-[#121358]">
                        {product.name}
                      </h3>

                      <p className="mt-4 text-2xl font-black text-[#121358]">
                        {price}
                      </p>
                    </div>
                  </Link>

                  <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-[#121358] px-5 py-4 text-sm font-black text-white shadow-md transition hover:shadow-lg">
                    ADD TO CART
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-black text-[#121358]">
              No products found
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Add products in this category from admin dashboard.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
