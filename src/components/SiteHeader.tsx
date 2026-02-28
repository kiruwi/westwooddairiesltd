"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { PRODUCT_CATEGORIES } from "../data/products";
import { siteSearchItems } from "./header/siteSearchItems";

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
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);
  const desktopSearchRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setActiveSearchIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredSearchItems = useMemo(() => {
    if (!normalizedSearchQuery) {
      return siteSearchItems;
    }

    return siteSearchItems.filter((item) => {
      const allTerms = [item.label, ...item.keywords].map((term) =>
        term.toLowerCase()
      );
      return allTerms.some((term) => term.includes(normalizedSearchQuery));
    });
  }, [normalizedSearchQuery]);

  useEffect(() => {
    setActiveSearchIndex((prev) => {
      if (!filteredSearchItems.length) return -1;
      if (prev >= filteredSearchItems.length) return filteredSearchItems.length - 1;
      return prev;
    });
  }, [filteredSearchItems]);

  const closeSearchAfterSelection = () => {
    setSearchQuery("");
    setSearchOpen(false);
    setMenuOpen(false);
    setActiveSearchIndex(-1);
  };

  const navigateToSearchItem = (href: string) => {
    router.push(href);
    closeSearchAfterSelection();
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!filteredSearchItems.length) return;
    if (!normalizedSearchQuery && activeSearchIndex < 0) return;

    const selectedItem =
      activeSearchIndex >= 0
        ? filteredSearchItems[activeSearchIndex]
        : filteredSearchItems[0];
    if (!selectedItem) return;

    navigateToSearchItem(selectedItem.href);
  };

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
    setActiveSearchIndex(-1);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!filteredSearchItems.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSearchOpen(true);
      setActiveSearchIndex((prev) =>
        prev < filteredSearchItems.length - 1 ? prev + 1 : 0
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSearchOpen(true);
      setActiveSearchIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSearchItems.length - 1
      );
      return;
    }

    if (event.key === "Enter" && activeSearchIndex >= 0) {
      event.preventDefault();
      const selectedItem = filteredSearchItems[activeSearchIndex];
      if (selectedItem) {
        navigateToSearchItem(selectedItem.href);
      }
      return;
    }

    if (event.key === "Escape") {
      setSearchOpen(false);
      setActiveSearchIndex(-1);
    }
  };

  const isLightBackgroundRoute = pathname !== "/";
  const useBlueNavTheme = scrolled || isLightBackgroundRoute;
  const navTextClass = useBlueNavTheme ? "text-[#213864]" : "text-white";
  const navHoverClass = useBlueNavTheme
    ? "hover:text-[#1a2f57]"
    : "hover:text-[#c7d5f0]";
  const navRingClass = "focus-visible:ring-2 focus-visible:ring-[#c7d5f0]/50";
  const bannerContent = (
    <>
      <div className="flex items-center gap-6 whitespace-nowrap">
        <a
          href="tel:+254700000000"
          aria-label="Call Westwood Dairies"
          className="inline-flex items-center gap-2 transition hover:text-white/80"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.5 4.5 8.2 4c.5-.1 1 .2 1.1.7l.6 2.7c.1.5-.1 1-.6 1.2l-1.7.8c.9 2.2 2.6 3.9 4.8 4.8l.8-1.7c.2-.5.7-.7 1.2-.6l2.7.6c.5.1.8.6.7 1.1l-.5 2.7c-.1.5-.5.9-1 .9-6.1 0-11-4.9-11-11 0-.5.4-.9.9-1Z"
            />
          </svg>
          <span>+254 700 000 000</span>
        </a>
        <a
          href="mailto:orders@westwooddairies.com"
          aria-label="Email Westwood Dairies"
          className="inline-flex items-center gap-2 transition hover:text-white/80"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16v12H4z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4 7 8 6 8-6"
            />
          </svg>
          <span>orders@westwooddairies.com</span>
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
      </div>
    </>
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transform transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="w-full bg-[#213864] text-white">
        <div className="marquee text-base md:hidden">
          <div className="marquee-track">
            <div className="marquee-content">{bannerContent}</div>
            <div className="marquee-content marquee-duplicate" aria-hidden="true">
              {bannerContent}
            </div>
          </div>
        </div>
        <div className="hidden items-center justify-between gap-3 px-6 py-2 text-base md:flex">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <a
              href="tel:+254700000000"
              aria-label="Call Westwood Dairies"
              className="inline-flex items-center gap-2 transition hover:text-white/80"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.5 4.5 8.2 4c.5-.1 1 .2 1.1.7l.6 2.7c.1.5-.1 1-.6 1.2l-1.7.8c.9 2.2 2.6 3.9 4.8 4.8l.8-1.7c.2-.5.7-.7 1.2-.6l2.7.6c.5.1.8.6.7 1.1l-.5 2.7c-.1.5-.5.9-1 .9-6.1 0-11-4.9-11-11 0-.5.4-.9.9-1Z"
                />
              </svg>
              <span>+254 700 000 000</span>
            </a>
            <a
              href="mailto:orders@westwooddairies.com"
              aria-label="Email Westwood Dairies"
              className="inline-flex items-center gap-2 transition hover:text-white/80"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16v12H4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4 7 8 6 8-6"
                />
              </svg>
              <span>orders@westwooddairies.com</span>
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
          </div>
        </div>
      </div>
      <div
        className={`flex w-full flex-nowrap items-center justify-between gap-4 px-6 py-8 md:grid md:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "border-b border-zinc-200/70 bg-white" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary left"
          className={`hidden items-center justify-end gap-6 pr-6 text-base md:flex ${navTextClass}`}
        >
          {leftNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors ${navHoverClass} focus-visible:outline-none ${navRingClass}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <Link
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
            </Link>
            <div className="invisible absolute left-0 top-full z-20 w-48 border border-zinc-200 bg-white opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="grid gap-1 p-3 text-sm text-black">
                {PRODUCT_CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    className="px-2 py-1 transition hover:bg-zinc-50 hover:text-[#c7d5f0]"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <Link
          href="/"
          className={`shrink-0 ${navTextClass} md:mx-auto`}
          aria-label="Westwood Dairies home"
        >
          <Image
            src={useBlueNavTheme ? "/images/logo-2.webp" : "/images/logo-2-wite.webp"}
            alt="Westwood Dairies"
            width={324}
            height={94}
            priority
            className="h-[86px] w-auto"
          />
        </Link>

        <div className="flex items-center justify-end gap-4 md:justify-start">
          <nav
            aria-label="Primary right"
            className={`hidden items-center justify-start gap-6 pl-2 text-base md:flex ${navTextClass}`}
          >
            {rightNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors ${navHoverClass} focus-visible:outline-none ${navRingClass}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div ref={desktopSearchRef} className="relative hidden md:block">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-controls="desktop-search-panel"
              onClick={() => {
                setSearchOpen((open) => !open);
                setActiveSearchIndex(-1);
              }}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7d5f0]/60 ${
                useBlueNavTheme
                  ? "border-zinc-200 bg-white text-[#213864] hover:bg-zinc-50"
                  : "border-white/50 bg-white/15 text-white backdrop-blur hover:bg-white/25"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" d="m21 21-4.4-4.4" />
                <circle cx="11" cy="11" r="6.5" />
              </svg>
            </button>
            {searchOpen ? (
              <div
                id="desktop-search-panel"
                className="absolute right-0 top-[calc(100%+10px)] z-40 w-[22rem] max-w-[90vw] rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg"
              >
                <form onSubmit={submitSearch}>
                  <label htmlFor="desktop-site-search" className="sr-only">
                    Search flavours, services, and payment options
                  </label>
                  <input
                    id="desktop-site-search"
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(event) => handleSearchQueryChange(event.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    aria-controls="desktop-search-results"
                    aria-activedescendant={
                      activeSearchIndex >= 0
                        ? `desktop-search-option-${activeSearchIndex}`
                        : undefined
                    }
                    placeholder="Search flavours, services, payment"
                    className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm text-black placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#213864]/30"
                  />
                </form>
                <div
                  id="desktop-search-results"
                  role="listbox"
                  className="mt-2 max-h-72 overflow-auto"
                >
                  {filteredSearchItems.length ? (
                    <div className="grid gap-1">
                      {filteredSearchItems.map((item, index) => (
                        <Link
                          key={`${item.category}-${item.label}`}
                          id={`desktop-search-option-${index}`}
                          role="option"
                          aria-selected={index === activeSearchIndex}
                          href={item.href}
                          onClick={closeSearchAfterSelection}
                          onMouseEnter={() => setActiveSearchIndex(index)}
                          className={`rounded-xl px-3 py-2 text-sm text-black transition ${
                            index === activeSearchIndex
                              ? "bg-zinc-100"
                              : "hover:bg-zinc-100"
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <span className="ml-2 text-xs text-zinc-500">{item.category}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="px-3 py-2 text-sm text-zinc-500">
                      No match found. Try strawberry, delivery service, or mobile money.
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex h-10 w-10 items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7d5f0]/60 md:hidden ${
              useBlueNavTheme ? "text-[#213864]" : "text-white"
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
              <form onSubmit={submitSearch}>
                <label htmlFor="mobile-site-search" className="sr-only">
                  Search flavours, services, and payment options
                </label>
                <input
                  id="mobile-site-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => handleSearchQueryChange(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  aria-controls="mobile-search-results"
                  aria-activedescendant={
                    activeSearchIndex >= 0
                      ? `mobile-search-option-${activeSearchIndex}`
                      : undefined
                  }
                  placeholder="Search flavours, services, payment"
                  className="w-full rounded-full border border-zinc-200 px-4 py-3 text-sm text-black placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#213864]/30"
                />
              </form>
              {normalizedSearchQuery ? (
                <div
                  id="mobile-search-results"
                  role="listbox"
                  className="grid gap-1 rounded-2xl border border-zinc-200 bg-zinc-50 p-2"
                >
                  {filteredSearchItems.length ? (
                    filteredSearchItems.map((item, index) => (
                      <Link
                        key={`mobile-${item.category}-${item.label}`}
                        id={`mobile-search-option-${index}`}
                        role="option"
                        aria-selected={index === activeSearchIndex}
                        href={item.href}
                        onClick={closeSearchAfterSelection}
                        onMouseEnter={() => setActiveSearchIndex(index)}
                        className={`rounded-lg px-3 py-2 text-sm transition ${
                          index === activeSearchIndex ? "bg-white" : "hover:bg-white"
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className="ml-2 text-xs text-zinc-500">{item.category}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-zinc-500">
                      No match found. Try vanilla, order placement, or cash on delivery.
                    </p>
                  )}
                </div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="transition-colors hover:text-sky-700"
              >
                Products
              </Link>
              <div className="grid gap-2 pl-3 text-xs uppercase tracking-[0.3em] text-black">
                {PRODUCT_CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium normal-case tracking-normal text-black transition-colors hover:text-sky-700"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
            {leftNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="transition-colors hover:text-sky-700"
              >
                {item.label}
              </Link>
            ))}
            {rightNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="transition-colors hover:text-sky-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
