"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PRODUCT_ITEMS } from "../../data/products";

const SOFT_SERVE_CATEGORY_ID = "ice-cream";

type CartCounts = Record<string, number>;

type CheckoutLine = {
  slug: string;
  name: string;
  categoryId: string;
  quantity: number;
  unitPriceKsh: number;
  lineTotalKsh: number;
};

function normalizeCount(value: number) {
  return Math.round(value * 100) / 100;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2).replace(/\.?0+$/, "");
}

function formatQuantity(categoryId: string, quantity: number) {
  if (categoryId === SOFT_SERVE_CATEGORY_ID) {
    return `${formatNumber(quantity)} L`;
  }

  return formatNumber(quantity);
}

function readCartCounts(): CartCounts {
  try {
    const raw = window.localStorage.getItem("westwood-cart");
    const parsed: unknown = raw ? JSON.parse(raw) : {};

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.entries(parsed as Record<string, unknown>).reduce<CartCounts>(
      (acc, [slug, value]) => {
        if (typeof value !== "number" || !Number.isFinite(value)) {
          return acc;
        }

        const normalizedValue = normalizeCount(Math.max(0, value));
        if (normalizedValue > 0) {
          acc[slug] = normalizedValue;
        }

        return acc;
      },
      {}
    );
  } catch {
    return {};
  }
}

export default function CheckoutPage() {
  const [counts, setCounts] = useState<CartCounts>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const syncFromStorage = () => {
      setCounts(readCartCounts());
      setIsHydrated(true);
    };

    syncFromStorage();

    const onStorage = () => syncFromStorage();
    const onCartUpdated = () => syncFromStorage();

    window.addEventListener("storage", onStorage);
    window.addEventListener("cart-updated", onCartUpdated as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart-updated", onCartUpdated as EventListener);
    };
  }, []);

  const lines = useMemo<CheckoutLine[]>(() => {
    return Object.entries(counts)
      .map(([slug, quantity]) => {
        const product = PRODUCT_ITEMS.find((item) => item.slug === slug);
        if (!product) return null;

        const safeQuantity = normalizeCount(Math.max(0, quantity));
        const lineTotalKsh = Math.round(product.priceKsh * safeQuantity);

        return {
          slug,
          name: product.name,
          categoryId: product.categoryId,
          quantity: safeQuantity,
          unitPriceKsh: product.priceKsh,
          lineTotalKsh,
        };
      })
      .filter((line): line is CheckoutLine => Boolean(line))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [counts]);

  const totalQuantity = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const totalKsh = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotalKsh, 0),
    [lines]
  );

  if (!isHydrated) {
    return (
      <main className="bg-[#c7d5f0] px-6 pb-28 pt-40 text-[#213864]">
        <div className="mx-auto max-w-[1000px] rounded-3xl bg-white p-8">Loading checkout...</div>
      </main>
    );
  }

  return (
    <main className="bg-[#c7d5f0] px-6 pb-28 pt-40 text-[#213864]">
      <div className="mx-auto grid max-w-[1000px] gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl bg-white p-6">
          <h1 className="text-4xl font-title-italic">Checkout</h1>
          <p className="mt-2 text-sm font-paragraph text-black/80">
            Confirm quantities and prices before payment.
          </p>

          {lines.length ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-black/10 text-xs uppercase tracking-[0.18em] text-black/60">
                    <th className="py-3 pr-4 font-semibold">Product</th>
                    <th className="py-3 pr-4 font-semibold">Quantity</th>
                    <th className="py-3 pr-4 font-semibold">Unit Price</th>
                    <th className="py-3 font-semibold">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => (
                    <tr key={line.slug} className="border-b border-black/10">
                      <td className="py-4 pr-4 text-base font-semibold text-black">{line.name}</td>
                      <td className="py-4 pr-4 text-base font-paragraph text-black">
                        {formatQuantity(line.categoryId, line.quantity)}
                      </td>
                      <td className="py-4 pr-4 text-base font-paragraph text-black">
                        {line.categoryId === SOFT_SERVE_CATEGORY_ID
                          ? `KSH ${line.unitPriceKsh.toLocaleString("en-KE")} / litre`
                          : `KSH ${line.unitPriceKsh.toLocaleString("en-KE")}`}
                      </td>
                      <td className="py-4 text-base font-semibold text-black">
                        KSH {line.lineTotalKsh.toLocaleString("en-KE")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-black/20 bg-[#f7f9ff] p-6 text-sm font-paragraph text-black/70">
              Your cart is empty. Add items from the products page to continue.
            </div>
          )}

          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex rounded-full bg-[#213864] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a2f57]"
            >
              Back to products
            </Link>
          </div>
        </section>

        <aside className="h-fit rounded-3xl bg-white p-6 lg:sticky lg:top-32">
          <h2 className="text-2xl font-title-italic">Order Summary</h2>
          <div className="mt-5 grid gap-3 text-sm font-paragraph text-black">
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <span>Total quantity</span>
              <span className="font-semibold">{formatNumber(normalizeCount(totalQuantity))}</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <span>Subtotal</span>
              <span className="font-semibold">KSH {totalKsh.toLocaleString("en-KE")}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>KSH {totalKsh.toLocaleString("en-KE")}</span>
            </div>
          </div>
          <p className="mt-5 text-xs font-paragraph text-black/60">
            Payment integrations (M-Pesa and Visa) can now hook into this computed total.
          </p>
        </aside>
      </div>
    </main>
  );
}
