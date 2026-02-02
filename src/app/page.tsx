"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import CircularGallery from "../components/CircularGallery";

export default function Home() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleCarouselClick = useCallback(() => {
    router.push("/products");
  }, [router]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const items = useMemo(
    () => [
      { image: "/images/BLUEBERRY.webp", text: "Blueberry", color: "#7c3aed" },
      { image: "/images/KEY%20LIME.webp", text: "Key Lime", color: "#84cc16" },
      {
        image: "/images/LEMON%20AND%20BISCUIT.webp",
        text: "Lemon and Biscuit",
        color: "#facc15",
      },
      { image: "/images/MANGO%20COCNUT.webp", text: "Mango Coconut", color: "#fb923c" },
      { image: "/images/MANGO.webp", text: "Mango", color: "#f97316" },
      { image: "/images/MIXED%20BERRY.webp", text: "Mixed Berry", color: "#f43f5e" },
    ],
    []
  );

  const sectionTones = {
    hero: "#fde7f3",
    about: "#fff4d6",
    products: "#e7f6ef",
    process: "#fde7f3",
    stockists: "#fff4d6",
  };

  return (
    <div className="bg-slate-50 px-6 pb-20 pt-24 text-zinc-900">
      <main className="mx-auto w-full max-w-6xl">
        <section
          id="home"
          data-reveal
          className="scroll-mt-24 overflow-hidden rounded-none border border-zinc-100 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
          style={{
            background:
              `radial-gradient(120% 140% at 0% 0%, #ffffff 0%, ${sectionTones.hero} 55%, #f8d6e8 100%)`,
          }}
        >
          <div className="grid items-center gap-8 p-8 sm:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-700/70">
                Westwood Dairies
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Fresh milk, expertly processed into cultured favorites.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
                We're a milk processing plant focused on clean, consistent quality from
                farm intake to finished product. Our newest launch is a smooth, high-protein
                yogurt crafted in small batches for full flavor and a creamy finish.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-none bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/60"
                >
                  View products
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center justify-center rounded-none border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60"
                >
                  Our process
                </a>
              </div>
            </div>
            <div className="relative h-60 w-full overflow-hidden rounded-none bg-white shadow-[0_12px_24px_rgba(15,23,42,0.12)] sm:h-72">
              <Image
                src="/images/BLUEBERRY.webp"
                alt="Westwood Dairies blueberry yogurt"
                fill
                priority
                sizes="(max-width: 640px) 90vw, 45vw"
                className="object-contain p-4"
              />
            </div>
          </div>
        </section>

        <section
          id="about"
          data-reveal
          className="scroll-mt-24 mt-12 rounded-none border-y border-zinc-200/80 px-6 py-8"
          style={{ backgroundColor: sectionTones.about }}
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              From plant to shelf, with freshness in every batch.
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              Our production line pasteurizes, cultures, and packs on-site to lock in taste
              and texture. That means consistent quality, reliable supply, and a product
              your customers will come back for.
            </p>
          </div>
        </section>

        <section
          id="products"
          data-reveal
          className="scroll-mt-24 mt-12 rounded-none px-6 py-8 shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
          style={{ backgroundColor: sectionTones.products }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Our dairy range
            </h2>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-700/70">
              Products
            </p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <a
              href="#contact"
              className="group flex h-full flex-col justify-between rounded-none border border-zinc-200/70 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50"
            >
              <div>
                <h3 className="text-base font-semibold text-zinc-900">Soft serve ice cream</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Smooth, airy, and ready for cones or cups, with a clean dairy finish that
                  pairs perfectly with fruit, syrups, or toppings.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-sky-700 transition group-hover:text-sky-800">
                View details
              </span>
            </a>
            <a
              href="#contact"
              className="group flex h-full flex-col justify-between rounded-none border border-zinc-200/70 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50"
            >
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Maziwa lala (fermented milk)
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Traditional cultured milk with a gentle tang, ideal for daily drinking or
                  serving chilled alongside meals.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-sky-700 transition group-hover:text-sky-800">
                View details
              </span>
            </a>
            <a
              href="#contact"
              className="group flex h-full flex-col justify-between rounded-none border border-zinc-200/70 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50"
            >
              <div>
                <h3 className="text-base font-semibold text-zinc-900">Yogurt</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Creamy, high-protein yogurt crafted in small batches for a balanced flavor
                  and a lush, spoonable texture.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-sky-700 transition group-hover:text-sky-800">
                View details
              </span>
            </a>
          </div>
        </section>

        <section
          id="process"
          data-reveal
          className="scroll-mt-24 mt-12 rounded-none border border-zinc-200/70 px-6 py-8"
          style={{ backgroundColor: sectionTones.process }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            From plant to shelf
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-none bg-white px-4 py-4 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-sky-50 text-sky-700">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3s-5 6-5 10a5 5 0 0 0 10 0c0-4-5-10-5-10Z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-zinc-900">Milk sourcing</p>
            </div>
            <div className="flex items-center gap-3 rounded-none bg-white px-4 py-4 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-sky-50 text-sky-700">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M10 4v10.2a3.8 3.8 0 1 0 4 0V4" />
                  <path d="M8.5 7h7" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-zinc-900">Pasteurisation</p>
            </div>
            <div className="flex items-center gap-3 rounded-none bg-white px-4 py-4 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-sky-50 text-sky-700">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M9 3h6" />
                  <path d="M10 3v5l-4.5 7.2a3.5 3.5 0 0 0 3 5.3h7a3.5 3.5 0 0 0 3-5.3L14 8V3" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-zinc-900">Culturing</p>
            </div>
            <div className="flex items-center gap-3 rounded-none bg-white px-4 py-4 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-sky-50 text-sky-700">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
                  <path d="M3 7.5v9l9 4.5 9-4.5v-9" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-zinc-900">Packing</p>
            </div>
          </div>
        </section>

        <section
          id="stockists"
          data-reveal
          className="scroll-mt-24 mt-12 rounded-none px-6 py-8 shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
          style={{ backgroundColor: sectionTones.stockists }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Become a stockist
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                Partner with us for consistent supply, dependable delivery, and a product
                lineup that customers ask for by name.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-none bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60"
            >
              Become a stockist
            </a>
          </div>
        </section>

        <section className="mt-12" aria-label="Product gallery">
          <div
            ref={sectionRef}
            className="relative w-full overflow-hidden rounded-none border border-white/50 shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
            style={{
              background:
                "radial-gradient(circle at center, #fce7f3 0%, #f9a8d4 70%, #f472b6 100%)",
            }}
          >
            <div
              ref={overlayRef}
              aria-hidden="true"
              className="pointer-events-none absolute opacity-20 transition-transform duration-700 ease-out"
              style={{
                inset: "-56%",
                transformOrigin: "center",
              }}
            >
              <Image
                src="/images/bg overlay.svg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-[600px] w-full p-8">
              <CircularGallery
                items={items}
                bend={1}
                borderRadius={0.05}
                scrollSpeed={2}
                scrollEase={0.06}
                textColor="#b91c5c"
                backgroundTargetRef={sectionRef}
                overlayTargetRef={overlayRef}
                onItemClick={handleCarouselClick}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
