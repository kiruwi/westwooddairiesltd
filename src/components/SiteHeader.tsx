"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/products" },
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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#home"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-900"
        >
          Westwood Dairies
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-4 text-sm text-zinc-600 md:flex"
        >
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
