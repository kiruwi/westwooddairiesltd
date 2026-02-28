"use client";

import HomeContactSection from "../../components/home/HomeContactSection";
import HomeStockistsSection from "../../components/home/HomeStockistsSection";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function StockistsPage() {
  useRevealOnScroll();

  return (
    <main className="min-h-screen w-full bg-[#c7d5f0] pt-40">
      <HomeStockistsSection />
      <HomeContactSection />
    </main>
  );
}
