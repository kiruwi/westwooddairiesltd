import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";

import type { HomeGalleryItem } from "../../data/home";
import CircularGallery from "../CircularGallery";

type HomeHeroSectionProps = {
  sectionRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  galleryItems: HomeGalleryItem[];
  onCarouselClick: () => void;
};

export default function HomeHeroSection({
  sectionRef,
  overlayRef,
  galleryItems,
  onCarouselClick,
}: HomeHeroSectionProps) {
  return (
    <section id="home" className="pb-10">
      <div className="relative w-full overflow-hidden" data-reveal data-delay="0">
        <div
          ref={sectionRef}
          className="relative w-full overflow-hidden pt-24 md:pt-40"
          style={{
            background:
              "radial-gradient(circle at center, #c7d5f0 0%, #213864 70%, #213864 100%)",
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
          <div className="relative h-[560px] w-full pb-10 pt-16 md:pt-24">
            <CircularGallery
              items={galleryItems}
              bend={1}
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.06}
              textColor="#213864"
              showTitles={false}
              backgroundTargetRef={sectionRef}
              overlayTargetRef={overlayRef}
              onItemClick={onCarouselClick}
            />
          </div>
          <svg
            className="pointer-events-none absolute bottom-0 left-0 h-16 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              className="hidden sm:block"
              d="M0,64 C120,96 240,32 360,64 C480,96 600,24 720,64 C840,104 960,44 1080,64 C1160,78 1200,96 1200,96 L1200,120 L0,120 Z"
              fill="#ffffff"
            />
            <path
              className="sm:hidden"
              d="M0,70 C200,110 400,30 600,70 C800,110 1000,30 1200,70 L1200,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      <div className="grid items-center gap-8 px-6 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-reveal data-delay="120" className="text-center lg:text-left">
          <h1 className="text-6xl font-medium tracking-tight text-[#213864] sm:text-7xl font-title-italic">
            Fresh dairy for everyday moments.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-black lg:mx-0">
            From fresh farm milk to finished dairy, we keep the process simple and clean. The
            result is yogurt, ice cream and maziwa lala made for both daily family meals and
            grown-up tastes.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#213864] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a2f57] font-paragraph"
          >
            Order Now
          </Link>
        </div>
        <div
          className="relative h-64 w-full overflow-hidden rounded-[28px] bg-white"
          data-reveal
          data-delay="180"
        >
          <Image
            src="/images/products.webp"
            alt="Fresh dairy"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
