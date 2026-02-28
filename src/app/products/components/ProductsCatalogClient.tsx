"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { PRODUCT_CATEGORIES, PRODUCT_ITEMS } from "../../../data/products";
import ProductCategorySidebar from "./ProductCategorySidebar";
import ProductGrid from "./ProductGrid";
import { productsStyles } from "./productsStyles";

function normalizeCount(value: number) {
  return Math.max(0, Math.round(value));
}

const yogurtToneMap: Record<string, string> = {
  "blueberry-yogurt": "#7c3aed",
  "key-lime-yogurt": "#84cc16",
  "lemon-biscuit-yogurt": "#facc15",
  "mango-coconut-yogurt": "#fb923c",
  "mango-yogurt": "#f97316",
  "mixed-berry-yogurt": "#f43f5e",
};

export default function ProductsCatalogClient() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category") ?? "";

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  const activeCategory = useMemo(() => {
    const defaultCategory = PRODUCT_CATEGORIES[0];
    return (
      PRODUCT_CATEGORIES.find((entry) => entry.id === requestedCategory) ??
      defaultCategory
    );
  }, [requestedCategory]);

  const activeItems = useMemo(() => {
    return PRODUCT_ITEMS.filter((item) => item.categoryId === activeCategory.id);
  }, [activeCategory.id]);

  const cartTotal = useMemo(
    () =>
      Object.values(counts).reduce(
        (sum, value) => sum + (typeof value === "number" ? value : 0),
        0
      ),
    [counts]
  );

  useEffect(() => {
    let nextCounts: Record<string, number> = {};

    try {
      const raw = window.localStorage.getItem("westwood-cart");
      const parsed: unknown = raw ? JSON.parse(raw) : {};

      if (parsed && typeof parsed === "object") {
        nextCounts = Object.entries(parsed as Record<string, unknown>).reduce<Record<string, number>>(
          (acc, [slug, value]) => {
            if (typeof value !== "number" || !Number.isFinite(value)) {
              return acc;
            }

            const normalized = normalizeCount(value);
            if (normalized > 0) {
              acc[slug] = normalized;
            }

            return acc;
          },
          {}
        );
      }
    } catch {
      nextCounts = {};
    }

    const raf = window.requestAnimationFrame(() => {
      setCounts(nextCounts);
      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  const updateCounts = (slug: string, delta: number) => {
    setCounts((prev) => {
      const next = { ...prev };
      const current = next[slug] ?? 0;
      const updated = normalizeCount(Math.max(0, current + delta));

      if (updated === 0) {
        delete next[slug];
      } else {
        next[slug] = updated;
      }

      return next;
    });
  };

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem("westwood-cart", JSON.stringify(counts));
      const total = Object.values(counts).reduce(
        (sum, value) => sum + (typeof value === "number" ? value : 0),
        0
      );
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: { total } }));
    } catch {
      // ignore storage errors
    }
  }, [counts, isHydrated]);

  return (
    <div className={productsStyles.pageShell}>
      <main className={productsStyles.main}>
        <div aria-hidden="true" className={productsStyles.searchHeader} />

        <div className={productsStyles.contentGrid}>
          <ProductCategorySidebar
            activeCategoryId={activeCategory.id}
            cartTotal={cartTotal}
          />

          <ProductGrid
            activeCategory={activeCategory}
            activeItems={activeItems}
            counts={counts}
            onChangeCount={updateCounts}
            yogurtToneMap={yogurtToneMap}
          />
        </div>
      </main>
    </div>
  );
}
