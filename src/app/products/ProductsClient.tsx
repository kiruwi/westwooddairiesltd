"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCT_CATEGORIES, PRODUCT_ITEMS } from "../../data/products";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category") ?? "";
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = useMemo(() => {
    const defaultCategory = PRODUCT_CATEGORIES[0];
    return (
      PRODUCT_CATEGORIES.find((entry) => entry.id === requestedCategory) ??
      defaultCategory
    );
  }, [requestedCategory]);

  const activeItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const sourceItems = query
      ? PRODUCT_ITEMS
      : PRODUCT_ITEMS.filter((item) => item.categoryId === activeCategory.id);
    if (!query) return sourceItems;
    return sourceItems.filter((item) => {
      const name = item.name.toLowerCase();
      const desc = item.description.toLowerCase();
      return name.includes(query) || desc.includes(query);
    });
  }, [activeCategory, searchQuery]);

  const yogurtToneMap: Record<string, string> = {
    "blueberry-yogurt": "#7c3aed",
    "key-lime-yogurt": "#84cc16",
    "lemon-biscuit-yogurt": "#facc15",
    "mango-coconut-yogurt": "#fb923c",
    "mango-yogurt": "#f97316",
    "mixed-berry-yogurt": "#f43f5e",
  };

  return (
    <div className="bg-[#eef7ff] px-6 pb-20 pt-24 text-zinc-900">
      <main className="mx-auto w-full max-w-[1200px]">
        <header className="mb-10 pt-20">
          <div className="mx-auto max-w-xl">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              placeholder="Search products"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-full border border-[#62b4e3]/40 bg-white px-6 py-3 text-base text-black placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62b4e3]/40"
            />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_3fr]">
          <aside className="card rounded-3xl bg-white p-6 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-5xl font-normal tracking-normal text-[#0154ba] font-title-italic">
              Product list
            </h2>
            <nav className="mt-5 grid gap-4 text-lg text-black">
              {PRODUCT_CATEGORIES.map((category) => (
                <a
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className={`border-l-2 pl-3 transition font-paragraph text-base hover:border-black hover:text-black ${
                    category.id === activeCategory.id
                      ? "border-black text-black"
                      : "border-transparent"
                  }`}
                >
                  {category.title}
                </a>
              ))}
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#62b4e3] px-4 py-2 text-base font-semibold text-white transition hover:bg-[#4f9fc8]"
              >
                Order
              </a>
            </nav>
          </aside>

          <section className="grid gap-6">
            <div className="card rounded-3xl bg-white p-6">
              <div
                className="mb-4 h-1 w-full"
                style={{ backgroundColor: activeCategory.tone }}
              />
              <h2 className="text-5xl font-medium tracking-tight text-[#0154ba] font-title-italic">
                {activeCategory.title}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-black">
                {activeCategory.description}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activeItems.length ? (
                activeItems.map((item) => (
                  <div
                    key={item.slug}
                    className="card rounded-3xl bg-white font-chewy"
                  >
                    <div className="relative h-96 w-full overflow-hidden rounded-t-3xl bg-white">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 90vw, 30vw"
                          className="object-contain p-1"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full flex-col items-center justify-center gap-2 text-black"
                          style={{ backgroundColor: activeCategory.tone }}
                        >
                          <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                            Image
                          </span>
                          <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                            Coming soon
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className="rounded-b-3xl p-5"
                      style={
                        activeCategory.id === "yogurt"
                          ? { backgroundColor: yogurtToneMap[item.slug] ?? "#fde7f3" }
                          : undefined
                      }
                    >
                      <h3
                        className={`text-2xl font-bold font-paragraph ${
                          activeCategory.id === "yogurt" ? "text-white" : "text-[#0154ba]"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`mt-3 font-paragraph text-lg leading-7 ${
                          activeCategory.id === "yogurt" ? "text-white/90" : "text-black"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-3xl bg-white p-8 text-center text-lg text-black">
                  No products match that search.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
