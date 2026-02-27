import { Suspense } from "react";
import ProductsCatalogClient from "./components/ProductsCatalogClient";
import { productsStyles } from "./components/productsStyles";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className={productsStyles.suspenseShell}>
          <main className={productsStyles.suspenseMain}>
            <div className={productsStyles.suspensePulse} />
          </main>
        </div>
      }
    >
      <ProductsCatalogClient />
    </Suspense>
  );
}
