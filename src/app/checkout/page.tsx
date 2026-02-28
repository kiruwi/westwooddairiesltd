"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PRODUCT_ITEMS } from "../../data/products";

const SOFT_SERVE_CATEGORY_ID = "ice-cream";
const SOFT_SERVE_PACK_SIZE_LITRES = 5;

type CartCounts = Record<string, number>;

type CheckoutLine = {
  slug: string;
  name: string;
  categoryId: string;
  quantity: number;
  unitPriceKsh: number;
  lineTotalKsh: number;
};

type InitializePaymentResponse = {
  authorizationUrl?: string;
  message?: string;
};

function normalizeCount(value: number) {
  return Math.max(0, Math.round(value));
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2).replace(/\.?0+$/, "");
}

function formatQuantity(categoryId: string, quantity: number) {
  if (categoryId === SOFT_SERVE_CATEGORY_ID) {
    const formattedCount = formatNumber(quantity);
    return `${formattedCount} tub${quantity === 1 ? "" : "s"}`;
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
  const [customerEmail, setCustomerEmail] = useState("");
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const updateLineQuantity = (slug: string, delta: number) => {
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

  const removeLine = (slug: string) => {
    setCounts((prev) => {
      if (!(slug in prev)) {
        return prev;
      }

      const next = { ...prev };
      delete next[slug];
      return next;
    });
  };

  const initializePaystackPayment = async () => {
    if (!lines.length || totalKsh <= 0 || isInitializingPayment) {
      return;
    }

    const normalizedEmail = customerEmail.trim().toLowerCase();
    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setPaymentError("Enter a valid email before starting payment.");
      return;
    }

    setIsInitializingPayment(true);
    setPaymentError(null);

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          amountKsh: totalKsh,
          metadata: {
            source: "checkout-page",
            itemCount: lines.length,
            items: lines.map((line) => ({
              slug: line.slug,
              name: line.name,
              quantity: line.quantity,
              lineTotalKsh: line.lineTotalKsh,
            })),
          },
        }),
      });

      const payload = (await response.json()) as InitializePaymentResponse;

      if (!response.ok || !payload.authorizationUrl) {
        setPaymentError(payload.message ?? "Could not start Paystack payment.");
        setIsInitializingPayment(false);
        return;
      }

      window.location.href = payload.authorizationUrl;
    } catch {
      setPaymentError("Could not reach the payment service. Please try again.");
      setIsInitializingPayment(false);
    }
  };

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
      <main className="bg-[#c7d5f0] px-6 pb-28 pt-48 text-[#213864] md:pt-52">
        <div className="mx-auto max-w-[1000px] rounded-3xl bg-white p-8">Loading checkout...</div>
      </main>
    );
  }

  return (
    <main className="bg-[#c7d5f0] px-6 pb-28 pt-48 text-[#213864] md:pt-52">
      <div className="mx-auto grid max-w-[1000px] gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl bg-white p-6 font-paragraph">
          <h1 className="text-4xl font-title-italic leading-tight tracking-tight">Checkout</h1>
          <p className="mt-2 text-base text-black/80">
            Confirm quantities and prices before payment.
          </p>

          {lines.length ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-black/10 text-xs uppercase tracking-[0.18em] text-black/60">
                    <th className="py-3 pr-4 font-semibold">Product</th>
                    <th className="py-3 pr-4 font-semibold">Quantity</th>
                    <th className="py-3 pr-4 font-semibold">Unit Price</th>
                    <th className="py-3 font-semibold">Line Total</th>
                    <th className="py-3 pl-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => (
                    <tr key={line.slug} className="border-b border-black/10">
                      <td className="py-4 pr-4 text-base font-semibold text-[#213864]">{line.name}</td>
                      <td className="py-4 pr-4 text-base text-black">
                        {formatQuantity(line.categoryId, line.quantity)}
                      </td>
                      <td className="py-4 pr-4 text-base text-black">
                        {line.categoryId === SOFT_SERVE_CATEGORY_ID
                          ? `KSH ${line.unitPriceKsh.toLocaleString("en-KE")} / ${SOFT_SERVE_PACK_SIZE_LITRES}L tub`
                          : `KSH ${line.unitPriceKsh.toLocaleString("en-KE")}`}
                      </td>
                      <td className="py-4 text-base font-semibold text-black">
                        KSH {line.lineTotalKsh.toLocaleString("en-KE")}
                      </td>
                      <td className="py-4 pl-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => updateLineQuantity(line.slug, -1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#213864]/40 text-[#213864] transition hover:bg-[#213864] hover:text-white"
                            aria-label={`Decrease ${line.name}`}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => updateLineQuantity(line.slug, 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#213864] text-white transition hover:bg-[#1a2f57]"
                            aria-label={`Increase ${line.name}`}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeLine(line.slug)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#b63b3b]/40 text-[#b63b3b] transition hover:bg-[#b63b3b] hover:text-white"
                            aria-label={`Remove ${line.name}`}
                            title="Remove item"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M4 7h16" />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                              <path d="M6 7l1 13h10l1-13" />
                              <path d="M9 7V4h6v3" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-black/20 bg-[#f7f9ff] p-6 text-sm text-black/70">
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

        <aside className="h-fit rounded-3xl bg-white p-6 font-paragraph lg:sticky lg:top-32">
          <h2 className="text-2xl font-title-italic tracking-tight">Order Summary</h2>
          <div className="mt-5 grid gap-3 text-sm text-black">
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
          <div className="mt-5">
            <label htmlFor="checkout-email" className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
              Customer Email
            </label>
            <input
              id="checkout-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-[#213864]/20 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#213864]/30"
            />
            <button
              type="button"
              onClick={initializePaystackPayment}
              disabled={!lines.length || totalKsh <= 0 || isInitializingPayment}
              className={`mt-3 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white transition ${
                !lines.length || totalKsh <= 0 || isInitializingPayment
                  ? "cursor-not-allowed bg-[#213864]/40"
                  : "bg-[#213864] hover:bg-[#1a2f57]"
              }`}
            >
              {isInitializingPayment ? "Redirecting to Paystack..." : "Pay with Paystack"}
            </button>
            {paymentError ? (
              <p className="mt-2 text-xs text-[#b63b3b]">{paymentError}</p>
            ) : null}
          </div>
          <p className="mt-5 text-xs text-black/60">
            Paystack will redirect back to checkout callback after payment.
          </p>
        </aside>
      </div>
    </main>
  );
}
