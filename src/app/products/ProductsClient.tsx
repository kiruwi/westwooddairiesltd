"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCT_CATEGORIES, PRODUCT_ITEMS } from "../../data/products";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category") ?? "";

  const activeCategory = useMemo(() => {
    const defaultCategory = PRODUCT_CATEGORIES[0];
    return (
      PRODUCT_CATEGORIES.find((entry) => entry.id === requestedCategory) ??
      defaultCategory
    );
  }, [requestedCategory]);

  const activeItems = useMemo(
    () => PRODUCT_ITEMS.filter((item) => item.categoryId === activeCategory.id),
    [activeCategory]
  );

  const yogurtToneMap: Record<string, string> = {
    "blueberry-yogurt": "#7c3aed",
    "key-lime-yogurt": "#84cc16",
    "lemon-biscuit-yogurt": "#facc15",
    "mango-coconut-yogurt": "#fb923c",
    "mango-yogurt": "#f97316",
    "mixed-berry-yogurt": "#f43f5e",
  };

  return (
    <div className="bg-slate-50 px-6 pb-20 pt-24 text-zinc-900">
      <main className="mx-auto w-full max-w-[1200px]">
        <header className="mb-10 text-center">
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-[#5b8915] sm:text-5xl">
            Products
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black">
            Ice cream, yogurt, and fermented milk made with care from farm intake to
            finished product.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_3fr]">
          <aside className="card border border-zinc-200 bg-white p-6 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-sm font-medium uppercase tracking-[0.35em] text-zinc-900">
              Product list
            </h2>
            <nav className="mt-5 grid gap-3 text-sm text-black">
              {PRODUCT_CATEGORIES.map((category) => (
                <a
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className={`border-l-2 pl-3 transition hover:border-sky-700 hover:text-sky-800 ${
                    category.id === activeCategory.id
                      ? "border-sky-700 text-sky-800"
                      : "border-transparent"
                  }`}
                >
                  {category.title}
                </a>
              ))}
              <a
                href="/#contact"
                className="inline-flex items-center justify-center border border-zinc-300 px-4 py-2 text-sm font-semibold text-black transition hover:border-zinc-400 hover:text-black"
              >
                Order / Enquire
              </a>
            </nav>
          </aside>

          <section className="grid gap-6">
            <div className="card border border-zinc-200 bg-white p-6">
              <div
                className="mb-4 h-1 w-full"
                style={{ backgroundColor: activeCategory.tone }}
              />
              <h2 className="font-milkyway text-2xl font-medium tracking-tight text-black">
                {activeCategory.title}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-black">
                {activeCategory.description}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activeItems.map((item) => (
                <div
                  key={item.slug}
                  className="card border border-zinc-200 bg-white"
                >
                  <div className="relative h-64 w-full overflow-hidden border-b border-zinc-200 bg-white">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 90vw, 30vw"
                        className="object-contain p-2"
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
                    className="p-4"
                    style={
                      activeCategory.id === "yogurt"
                        ? { backgroundColor: yogurtToneMap[item.slug] ?? "#fde7f3" }
                        : undefined
                    }
                  >
                    <h3
                      className={`font-milkyway text-lg font-medium ${
                        activeCategory.id === "yogurt" ? "text-white" : "text-black"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-6 ${
                        activeCategory.id === "yogurt" ? "text-white/90" : "text-black"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
