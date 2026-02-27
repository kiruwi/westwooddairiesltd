"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeContactSection from "../components/home/HomeContactSection";
import HomeFaqSection from "../components/home/HomeFaqSection";
import HomeHeroSection from "../components/home/HomeHeroSection";
import HomeProcessSection from "../components/home/HomeProcessSection";
import HomeProductsSection from "../components/home/HomeProductsSection";
import HomeStockistsSection from "../components/home/HomeStockistsSection";
import { HOME_FAQS, HOME_GALLERY_ITEMS, HOME_PRODUCTS } from "../data/home";

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

  const handleCarouselClick = useCallback(() => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <HomeHeroSection
        sectionRef={sectionRef}
        overlayRef={overlayRef}
        galleryItems={HOME_GALLERY_ITEMS}
        onCarouselClick={handleCarouselClick}
      />

      <HomeProductsSection products={HOME_PRODUCTS} />

      <HomeAboutSection />

      <HomeProcessSection />

      <HomeStockistsSection />

      <HomeFaqSection
        faqs={HOME_FAQS}
        openFaq={openFaq}
        onToggleFaq={(index) =>
          setOpenFaq((current) => (current === index ? null : index))
        }
      />

      <HomeContactSection />
    </div>
  );
}
