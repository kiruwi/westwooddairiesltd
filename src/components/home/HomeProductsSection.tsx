import Image from "next/image";
import Link from "next/link";

import type { HomeProduct } from "../../data/home";

type HomeProductsSectionProps = {
  products: HomeProduct[];
};

export default function HomeProductsSection({ products }: HomeProductsSectionProps) {
  return (
    <section
      id="products"
      className="relative isolate overflow-hidden bg-[#c7d5f0] px-6 py-12"
      data-reveal
      data-delay="140"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 scale-125 opacity-[0.07] rotate-180"
        style={{
          backgroundColor: "#213864",
          WebkitMaskImage: "url('/images/Untitled-1milk-spash.svg')",
          maskImage: "url('/images/Untitled-1milk-spash.svg')",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          maskSize: "cover",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <h2 className="text-center text-5xl font-medium text-[#213864] sm:text-6xl font-title-italic">
        Our Products
      </h2>
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            className="card font-chewy relative flex flex-col overflow-hidden rounded-[26px] bg-white p-5 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#213864]/40"
            aria-label={`View ${product.name}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#213864] font-paragraph sm:text-3xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-base text-black sm:text-lg font-paragraph">
                  {product.size}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#213864] text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M7 7h10l-1 12H8L7 7Z" />
                  <path d="M9 7a3 3 0 1 1 6 0" />
                </svg>
              </div>
            </div>
            <div className="relative mt-4 mt-auto flex h-80 items-end justify-center -mx-5 -mb-5">
              <div
                className="absolute inset-x-8 bottom-0 h-72 rounded-t-[200px]"
                style={{
                  backgroundColor:
                    product.name === "Soft Serve Ice Cream"
                      ? "#f8d6e6"
                      : product.name === "Yogurt"
                        ? "#e5d6ff"
                        : "#d5ecff",
                }}
              />
              <div className="relative h-64 w-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 40vw, 180px"
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
