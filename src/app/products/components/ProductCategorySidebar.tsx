import Link from "next/link";

import { PRODUCT_CATEGORIES } from "../../../data/products";
import { productsStyles } from "./productsStyles";

type ProductCategorySidebarProps = {
  activeCategoryId: string;
  cartTotal: number;
};

function formatCartTotal(total: number) {
  return Number.isInteger(total) ? `${total}` : total.toFixed(2).replace(/\.?0+$/, "");
}

export default function ProductCategorySidebar({
  activeCategoryId,
  cartTotal,
}: ProductCategorySidebarProps) {
  return (
    <aside className={productsStyles.sidebar}>
      <h2 className={productsStyles.sidebarTitle}>Product list</h2>
      <nav className={productsStyles.sidebarNav}>
        {PRODUCT_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className={`border-l-2 pl-3 font-paragraph text-base transition hover:border-black hover:text-black ${
              category.id === activeCategoryId
                ? "border-black text-black"
                : "border-transparent"
            }`}
          >
            {category.title}
          </Link>
        ))}
        <div className={productsStyles.cartPill}>
          Cart
          <span className={productsStyles.cartCount}>{formatCartTotal(cartTotal)}</span>
        </div>
      </nav>
    </aside>
  );
}
