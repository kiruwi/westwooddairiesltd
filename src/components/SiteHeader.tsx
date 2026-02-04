"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { PRODUCT_CATEGORIES } from "../data/products";

const leftNavItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
];

const rightNavItems = [
  { label: "Process", href: "/#process" },
  { label: "Stockists", href: "/#stockists" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 6);
      if (currentY > lastY && currentY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastY = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTextClass = scrolled ? "text-black" : "text-white";
  const navHoverClass = "hover:text-[#62b4e3]";
  const navRingClass = "focus-visible:ring-2 focus-visible:ring-[#62b4e3]/50";
  const bannerContent = (
    <>
      <div className="flex items-center gap-6 whitespace-nowrap">
        <a
          href="tel:+254700000000"
          className="transition hover:text-white/80"
        >
          Call: +254 700 000 000
        </a>
        <a
          href="mailto:orders@westwooddairies.com"
          className="transition hover:text-white/80"
        >
          Email: orders@westwooddairies.com
        </a>
      </div>
      <div className="flex items-center gap-3 whitespace-nowrap">
        <a
          href="#"
          aria-label="Instagram"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="17.5" cy="6.5" r="1" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="Facebook"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V12H8v3h2v6h3v-6h2.5l.5-3H13v-2.2c0-.5.3-.8.5-.8Z" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M6.5 9.5H3.8V21h2.7V9.5ZM5.1 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.5 14.2c0-2.7-1.4-4-3.4-4-1.6 0-2.3.9-2.7 1.5V9.5h-2.6V21h2.6v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.9 2 3.2V21h2.6v-6.8Z" />
          </svg>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-lg bg-white px-3 py-1 text-sm font-semibold text-[#62b4e3] transition hover:bg-[#62b4e3]/20"
        >
          Order
        </a>
      </div>
    </>
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transform transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="w-full bg-[#0154ba] text-white">
        <div className="marquee text-sm md:hidden">
          <div className="marquee-track">
            <div className="marquee-content">{bannerContent}</div>
            <div className="marquee-content marquee-duplicate" aria-hidden="true">
              {bannerContent}
            </div>
          </div>
        </div>
        <div className="hidden items-center justify-between gap-3 px-6 py-2 text-sm md:flex">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <span>Call: +254 700 000 000</span>
            <span>Email: orders@westwooddairies.com</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V12H8v3h2v6h3v-6h2.5l.5-3H13v-2.2c0-.5.3-.8.5-.8Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M6.5 9.5H3.8V21h2.7V9.5ZM5.1 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.5 14.2c0-2.7-1.4-4-3.4-4-1.6 0-2.3.9-2.7 1.5V9.5h-2.6V21h2.6v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.9 2 3.2V21h2.6v-6.8Z" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#0154ba] transition hover:bg-[#62b4e3]/20"
            >
              Order
            </a>
          </div>
        </div>
      </div>
      <div
        className={`flex w-full flex-nowrap items-center justify-between gap-4 px-6 py-8 md:grid md:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "border-b border-zinc-200/70 bg-[#f9f6ef]" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary left"
          className={`hidden items-center justify-end gap-6 pr-6 text-base md:flex ${navTextClass}`}
        >
          {leftNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors ${navHoverClass} focus-visible:outline-none ${navRingClass}`}
            >
              {item.label}
            </a>
          ))}
          <div className="group relative">
            <a
              href="/products"
              className={`inline-flex items-center gap-1 transition-colors ${navHoverClass} focus-visible:outline-none ${navRingClass}`}
            >
              Products
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path strokeLinecap="round" d="M6 8l4 4 4-4" />
              </svg>
            </a>
            <div className="absolute left-0 top-full z-20 w-48 border border-zinc-200 bg-white opacity-0 transition invisible group-hover:visible group-hover:opacity-100">
              <div className="grid gap-1 p-3 text-sm text-black">
                {PRODUCT_CATEGORIES.map((category) => (
                  <a
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    className="px-2 py-1 transition hover:bg-zinc-50 hover:text-[#62b4e3]"
                  >
                    {category.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <a
          href="/"
          className={`shrink-0 ${navTextClass} md:mx-auto`}
          aria-label="Westwood Dairies home"
        >
          <Image
            src={scrolled ? "/images/logo1.webp" : "/images/logo-white1.webp"}
            alt="Westwood Dairies"
            width={324}
            height={94}
            priority
            className="h-[86px] w-auto"
          />
        </a>

        <div className="flex items-center justify-start gap-4 md:justify-start">
          <nav
            aria-label="Primary right"
            className={`hidden items-center justify-start gap-6 pl-6 text-base md:flex ${navTextClass}`}
          >
            {rightNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors ${navHoverClass} focus-visible:outline-none ${navRingClass}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex h-10 w-10 items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62b4e3]/60 md:hidden ${
              scrolled ? "text-[#0154ba]" : "text-white"
            }`}
          >
            <span className="sr-only">Menu</span>
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`border-t border-zinc-200/70 bg-white px-6 py-4 transition md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav aria-label="Mobile">
          <div className="grid gap-3 text-sm text-black">
          <div className="grid gap-2">
            <a
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-sky-700"
            >
              Products
            </a>
            <div className="grid gap-2 pl-3 text-xs uppercase tracking-[0.3em] text-black">
              {PRODUCT_CATEGORIES.map((category) => (
                <a
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium normal-case tracking-normal text-black transition-colors hover:text-sky-700"
                >
                  {category.title}
                </a>
              ))}
            </div>
          </div>
          {leftNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-sky-700"
            >
              {item.label}
            </a>
          ))}
          {rightNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-sky-700"
            >
              {item.label}
            </a>
          ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
