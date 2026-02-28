"use client";

import { useCallback, useRef, useState } from "react";

import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeContactSection from "../components/home/HomeContactSection";
import HomeFaqSection from "../components/home/HomeFaqSection";
import HomeHeroSection from "../components/home/HomeHeroSection";
import HomeProductsSection from "../components/home/HomeProductsSection";
import { HOME_FAQS, HOME_GALLERY_ITEMS, HOME_PRODUCTS } from "../data/home";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useRevealOnScroll();

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
