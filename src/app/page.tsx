"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CircularGallery from "../components/CircularGallery";

const products = [
  {
    name: "Yogurt",
    size: "Plain and flavoured (500 ml / 1 litre)",
    image: "/images/BLUEBERRY.webp",
    href: "/products?category=yogurt",
  },
  {
    name: "Ice Cream",
    size: "Assorted flavours",
    image: "/images/MANGO.webp",
    href: "/products?category=ice-cream",
  },
  {
    name: "Maziwa Lala",
    size: "Fermented milk (500 ml / 1 litre)",
    image: "/images/MIXED BERRY.webp",
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
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

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
    <div className="min-h-screen w-full bg-[#f9f6ef] text-[#5b8915]">
      <section id="home" className="pb-10">
        <div
          className="relative w-full overflow-hidden border-y border-emerald-100/60"
          data-reveal
          data-delay="0"
        >
          <div
            ref={sectionRef}
            className="relative w-full overflow-hidden rounded-b-[36px]"
            style={{
              background:
                "radial-gradient(circle at center, #e0f2e8 0%, #b7e4c7 70%, #95d5b2 100%)",
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
            <div className="relative h-[560px] w-full px-6 pb-10 pt-24">
              <p className="absolute left-1/2 top-14 w-full max-w-2xl -translate-x-1/2 px-10 text-center text-2xl font-bold text-white leading-9">
                <span className="block">Fresh Dairy Made with Care,</span>
                <span className="block">yogurt, ice cream,</span>
                <span className="block">and maziwa lala made from quality cow milk.</span>
              </p>
              <CircularGallery
                items={items}
                bend={1}
                borderRadius={0.05}
                scrollSpeed={2}
                scrollEase={0.06}
                textColor="#14532d"
                showTitles={false}
                backgroundTargetRef={sectionRef}
                overlayTargetRef={overlayRef}
                onItemClick={handleCarouselClick}
              />
            </div>
          </div>
        </div>

        <div className="grid items-center gap-8 px-6 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal data-delay="120" className="text-center lg:text-left">
            <h1 className="text-5xl font-medium tracking-tight text-[#5b8915] sm:text-6xl">
              Fresh dairy for everyday moments.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-black lg:mx-0">
              Yogurt, ice cream, and maziwa lala prepared fresh using quality cow milk and
              simple, trusted methods.
            </p>
            <button className="mt-6 inline-flex items-center justify-center rounded-full bg-[#5b8915] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4d7612]">
              Order Now
            </button>
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

      <section id="products" className="px-6 py-12" data-reveal data-delay="140">
        <h2 className="text-center text-3xl font-medium text-[#5b8915] sm:text-4xl">
          Our Products
        </h2>
        <p className="mt-2 text-center text-sm text-black">
          Yogurt, ice cream, and maziwa lala made fresh for you.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="card relative overflow-hidden rounded-[26px] bg-white p-5 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b8915]/40"
              aria-label={`View ${product.name}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-milkyway text-xl font-medium text-black sm:text-2xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-black">{product.size}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5b8915] text-white">
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
              <div className="relative mt-6 flex h-72 items-end justify-center">
                <div className="absolute inset-x-6 bottom-0 h-60 rounded-t-[160px] bg-[#e6f2c8]" />
                <div className="relative h-52 w-48">
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
        <h2 className="text-center text-3xl font-medium text-[#5b8915] sm:text-4xl">
          Good Food Starts at the Source
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-2xl font-bold leading-9 text-black">
          We work with well-kept cows and simple production methods to make dairy you can
          trust. Our yogurt, ice cream, and maziwa lala are prepared fresh, with no
          unnecessary additives, so you get clean taste and consistent quality every time.
        </p>
      </section>

      <section className="px-6 py-12" data-reveal data-delay="260">
        <h2 className="text-center text-3xl font-medium text-[#5b8915] sm:text-4xl">
          Why Choose Us
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Quality cow milk",
            "Freshly prepared",
            "No unnecessary additives",
            "Trusted local production",
          ].map((item) => (
            <div
              key={item}
              className="card rounded-2xl bg-white p-4 text-sm font-medium text-[#5b8915]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12" data-reveal data-delay="320">
        <h2 className="text-center text-3xl font-medium text-[#5b8915] sm:text-4xl">
          Delivery & Payment
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="card rounded-3xl bg-white p-6">
            <h3 className="text-lg font-medium text-[#5b8915]">Delivery</h3>
            <p className="mt-2 text-sm leading-6 text-black">
              We deliver fresh dairy products within our delivery areas, packed to stay cold
              and safe.
            </p>
          </div>
          <div className="card rounded-3xl bg-white p-6">
            <h3 className="text-lg font-medium text-[#5b8915]">Payment</h3>
            <p className="mt-2 text-sm leading-6 text-black">
              Pay easily via mobile money or cash on delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12" data-reveal data-delay="440">
        <h2 className="text-center text-3xl font-medium text-[#5b8915] sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 grid gap-3">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="card rounded-2xl border border-emerald-100 bg-white p-4 transition">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-sm font-medium text-[#5b8915]"
                onClick={() => setOpenFaq(index)}
              >
                {faq.question}
                <span>{openFaq === index ? "-" : "+"}</span>
              </button>
              {openFaq === index ? (
                <p className="mt-3 text-sm text-black">{faq.answer}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative px-6 py-14" data-reveal data-delay="500">
        <div className="absolute left-6 top-10 hidden h-32 w-32 overflow-hidden rounded-full bg-white/60 lg:block">
          <Image
            src="/images/BLUEBERRY.webp"
            alt=""
            fill
            sizes="128px"
            className="object-contain p-4"
          />
        </div>
        <div className="absolute right-6 bottom-10 hidden h-32 w-32 overflow-hidden rounded-full bg-white/60 lg:block">
          <Image
            src="/images/MANGO.webp"
            alt=""
            fill
            sizes="128px"
            className="object-contain p-4"
          />
        </div>
        <div className="card relative mx-auto max-w-2xl rounded-3xl bg-white p-8">
          <h2 className="text-2xl font-medium text-[#5b8915]">Send Us a Message</h2>
          <form className="mt-6 grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full rounded-full border border-emerald-100 px-4 py-3 text-sm"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              required
              className="w-full rounded-full border border-emerald-100 px-4 py-3 text-sm"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full rounded-3xl border border-emerald-100 px-4 py-3 text-sm"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-[#5b8915] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4d7612]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-emerald-100 px-6 py-6 text-xs text-black">
        © {new Date().getFullYear()} Fresh dairy made with care.
      </footer>
    </div>
  );
}
