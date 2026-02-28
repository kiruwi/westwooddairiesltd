"use client";

import HomeProcessSection from "../../components/home/HomeProcessSection";
import HomeContactSection from "../../components/home/HomeContactSection";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProcessPage() {
  useRevealOnScroll();

  return (
    <main className="min-h-screen w-full bg-white pt-40">
      <HomeProcessSection />
      <HomeContactSection />
    </main>
  );
}
