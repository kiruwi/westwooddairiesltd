import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-slate-50 px-6 pb-20 pt-24 text-zinc-900">
          <main className="mx-auto w-full max-w-[1200px]">
            <div className="h-40 animate-pulse bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]" />
          </main>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
