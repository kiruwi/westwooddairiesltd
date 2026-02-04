"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CircularGallery from "../components/CircularGallery";

const products = [
  {
    name: "Yogurt",
    size: "Premium and For Kids",
    image: "/images/BLUEBERRY.webp",
    href: "/products?category=yogurt",
  },
  {
    name: "Soft Serve Ice Cream",
    size: "Assorted flavours",
    image: "/images/strawberry.webp",
    href: "/products?category=ice-cream",
  },
  {
    name: "Maziwa Lala",
    size: "Fermented milk (500 ml / 1 litre)",
    image: "/images/maziwa lala.webp",
    href: "/products?category=fermented-milk",
  },
];

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Send your order through the form below or call our sales line and we will confirm availability.",
  },
  {
    question: "Which areas do you deliver to?",
    answer:
      "We deliver within our local areas in Kenya. Share your location and we will confirm delivery options.",
  },
  {
    question: "Do the products contain preservatives?",
    answer:
      "We focus on fresh preparation with no unnecessary additives for a clean, consistent taste.",
  },
  {
    question: "How long do the products stay fresh?",
    answer:
      "Keep products chilled and follow the use-by dates on each pack.",
  },
  {
    question: "Can I visit your production site?",
    answer:
      "Visits can be arranged on request. Contact us to plan a tour.",
  },
  {
    question: "Delivery & Payment",
    answer:
      "We deliver fresh dairy products within our delivery areas, packed to stay cold and safe. Pay easily via mobile money or cash on delivery.",
  },
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!elements.length || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = parseInt(target.dataset.delay ?? "0", 10);
            target.style.transitionDelay = `${delay}ms`;
            target.classList.add("is-visible");
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
      {
        image: "/images/MANGO%20COCNUT.webp",
        text: "Mango Coconut",
        color: "#fb923c",
      },
      { image: "/images/MANGO.webp", text: "Mango", color: "#f97316" },
      { image: "/images/MIXED%20BERRY.webp", text: "Mixed Berry", color: "#f43f5e" },
    ],
    []
  );

  const handleCarouselClick = useCallback(() => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <section id="home" className="pb-10">
        <div
          className="relative w-full overflow-hidden"
          data-reveal
          data-delay="0"
        >
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
                items={items}
                bend={1}
                borderRadius={0.05}
                scrollSpeed={2}
                scrollEase={0.06}
                textColor="#213864"
                showTitles={false}
                backgroundTargetRef={sectionRef}
                overlayTargetRef={overlayRef}
                onItemClick={handleCarouselClick}
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
              Yogurt, ice cream, and maziwa lala prepared fresh using quality cow milk and
              simple, trusted methods, made locally to deliver consistent taste, freshness, and
              everyday dairy products you can rely on for home and family use.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#213864] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a2f57]"
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

      <section
        id="products"
        className="bg-[#c7d5f0] px-6 py-12"
        data-reveal
        data-delay="140"
      >
        <h2 className="text-center text-5xl font-medium text-[#213864] sm:text-6xl font-title-italic">
          Our Products
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
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

      <section id="about" className="px-6 py-12" data-reveal data-delay="200">
        <h2 className="text-center text-5xl font-medium text-[#213864] sm:text-6xl font-title-italic">
          Good Food Starts at the Source
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-2xl font-bold leading-9 text-black font-paragraph">
          <span className="block">
            We work with <span className="highlight-jagged">well-kept cows</span> and simple
          </span>
          <span className="block">production methods to make dairy you can trust.</span>
          <span className="block">Our yogurt, ice cream, and maziwa lala are prepared fresh,</span>
          <span className="block">
            with <span className="highlight-jagged">no unnecessary additives</span>, so you get
            clean
          </span>
          <span className="block">taste and consistent quality every time.</span>
        </p>
      </section>

      <section
        className="bg-[#c7d5f0] px-6 pt-12 pb-4"
        data-reveal
        data-delay="260"
      >
        <h2 className="text-center text-5xl font-medium text-[#213864] sm:text-6xl font-title-italic">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 grid gap-3">
          {faqs.map((faq, index) => (
            <button
              key={faq.question}
              type="button"
              onClick={() =>
                setOpenFaq((current) => (current === index ? null : index))
              }
              aria-expanded={openFaq === index}
              className={`card w-full rounded-2xl p-4 text-left transition focus-visible:outline-none ${
                openFaq === index
                  ? "bg-[#c7d5f0]"
                  : "bg-white"
              }`}
            >
              <div className="grid w-full grid-cols-[50%_1fr] items-start gap-4">
                <span
                  className={`text-lg font-semibold ${
                    openFaq === index ? "text-white" : "text-[#213864]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex w-full items-start justify-between gap-4 text-left text-lg font-semibold ${
                    openFaq === index ? "text-white" : "text-black"
                  }`}
                >
                  <span className="block">{faq.question}</span>
                  <span>{openFaq === index ? "-" : "+"}</span>
                </span>
                {openFaq === index ? (
                  <p className="col-start-2 text-sm text-black">{faq.answer}</p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative isolate min-h-[70vh] overflow-hidden bg-white pb-24 md:min-h-[85vh] md:pb-32"
        data-reveal
        data-delay="500"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 scale-125 opacity-[0.05]"
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
        <div className="relative z-10 px-6 py-14">
          <div className="pointer-events-none absolute left-2 top-2 hidden h-44 w-44 overflow-hidden lg:block rotate-[-8deg]">
            <Image
              src="/images/BLUEBERRY.webp"
              alt=""
              fill
              sizes="176px"
              className="object-contain"
            />
          </div>
          <div className="pointer-events-none absolute right-0 bottom-2 hidden h-48 w-48 overflow-hidden lg:block rotate-[8deg]">
            <Image
              src="/images/MANGO.webp"
              alt=""
              fill
              sizes="192px"
              className="object-contain"
            />
          </div>
          <div className="pointer-events-none absolute right-24 top-6 hidden h-36 w-36 overflow-hidden lg:block rotate-[12deg]">
            <Image
              src="/images/KEY LIME.webp"
              alt=""
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>
          <div className="pointer-events-none absolute left-20 bottom-4 hidden h-40 w-40 overflow-hidden lg:block rotate-[-12deg]">
            <Image
              src="/images/MIXED BERRY.webp"
              alt=""
              fill
              sizes="160px"
              className="object-contain"
            />
          </div>
          <div className="pointer-events-none absolute right-36 bottom-24 hidden h-32 w-32 overflow-hidden lg:block rotate-[4deg]">
            <Image
              src="/images/MANGO COCNUT.webp"
              alt=""
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
          <div className="card relative mx-auto max-w-2xl rounded-3xl bg-white p-8">
            <h2 className="text-3xl font-medium text-[#213864] font-title-italic">
              Send Us a Message
            </h2>
            <form className="mt-6 grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full rounded-full border border-[#c7d5f0]/30 px-4 py-3 text-sm"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                required
                className="w-full rounded-full border border-[#c7d5f0]/30 px-4 py-3 text-sm"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="w-full rounded-3xl border border-[#c7d5f0]/30 px-4 py-3 text-sm"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#213864] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2f57]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
