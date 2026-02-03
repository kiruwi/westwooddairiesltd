"use client";

import { useEffect, useState } from "react";

import { PRODUCT_CATEGORIES } from "../data/products";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
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
    <header
      className={`sticky top-0 z-50 w-full border-b border-zinc-200/70 bg-white transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-4">
        <a
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-900"
        >
          Westwood Dairies
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-4 text-sm text-zinc-600 md:flex"
        >
          <div className="group relative">
            <a
              href="/products"
              className="inline-flex items-center gap-1 transition-colors hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50"
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
            <div className="absolute left-0 top-full z-20 w-48 border border-zinc-200 bg-white opacity-0 shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition invisible group-hover:visible group-hover:opacity-100">
              <div className="grid gap-1 p-3 text-sm text-zinc-700">
                {PRODUCT_CATEGORIES.map((category) => (
                  <a
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    className="px-2 py-1 transition hover:bg-zinc-50 hover:text-sky-700"
                  >
                    {category.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center justify-center rounded-none bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/60 md:inline-flex"
          >
            Order / Enquire
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-zinc-200 text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50 md:hidden"
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
          <div className="grid gap-3 text-sm text-zinc-700">
          <div className="grid gap-2">
            <a
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-sky-700"
            >
              Products
            </a>
            <div className="grid gap-2 pl-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
              {PRODUCT_CATEGORIES.map((category) => (
                <a
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium normal-case tracking-normal text-zinc-700 transition-colors hover:text-sky-700"
                >
                  {category.title}
                </a>
              ))}
            </div>
          </div>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-sky-700"
            >
              {item.label}
            </a>
          ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-none bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800"
            >
              Order / Enquire
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
