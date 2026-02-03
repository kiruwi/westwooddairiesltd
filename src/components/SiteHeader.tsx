"use client";

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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="w-full bg-[#5b8915] text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span>Call: +254 700 000 000</span>
            <span>Email: orders@westwooddairies.com</span>
          </div>
          <div className="flex items-center gap-3">
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
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V12H8v3h2v6h3v-6h2.5l.5-3H13v-2.2c0-.5.3-.8.5-.8Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M6.5 9.5H3.8V21h2.7V9.5ZM5.1 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.5 14.2c0-2.7-1.4-4-3.4-4-1.6 0-2.3.9-2.7 1.5V9.5h-2.6V21h2.6v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.9 2 3.2V21h2.6v-6.8Z" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-3 py-1 text-sm font-semibold text-[#5b8915] transition hover:bg-[#f4f8ef]"
            >
              Order
            </a>
          </div>
        </div>
      </div>
      <div className="grid w-full items-center gap-4 border-b border-zinc-200/70 px-6 py-4 md:grid-cols-[1fr_auto_1fr]">
        <nav
          aria-label="Primary left"
          className="hidden items-center justify-end gap-6 pr-6 text-base text-black md:flex"
        >
          {leftNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-[#5b8915] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b8915]/50"
            >
              {item.label}
            </a>
          ))}
          <div className="group relative">
            <a
              href="/products"
              className="inline-flex items-center gap-1 transition-colors hover:text-[#5b8915] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b8915]/50"
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
                    className="px-2 py-1 transition hover:bg-zinc-50 hover:text-[#5b8915]"
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
          className="mx-auto text-base font-medium uppercase tracking-[0.3em] text-zinc-900"
        >
          Westwood Dairies
        </a>

        <div className="flex items-center justify-start gap-4">
          <nav
            aria-label="Primary right"
            className="hidden items-center justify-start gap-6 pl-6 text-base text-black md:flex"
          >
            {rightNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-[#5b8915] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b8915]/50"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-zinc-200 text-black transition hover:border-zinc-300 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
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
