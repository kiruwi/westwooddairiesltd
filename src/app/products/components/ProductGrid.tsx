import type { ProductCategory, ProductItem } from "../../../data/products";
import ProductCard from "./ProductCard";
import { productsStyles } from "./productsStyles";

type ProductGridProps = {
  activeCategory: ProductCategory;
  activeItems: ProductItem[];
  counts: Record<string, number>;
  onChangeCount: (slug: string, delta: number) => void;
  yogurtToneMap: Record<string, string>;
};

export default function ProductGrid({
  activeCategory,
  activeItems,
  counts,
  onChangeCount,
  yogurtToneMap,
}: ProductGridProps) {
  return (
    <section className={productsStyles.productsSection}>
      <div className={productsStyles.productsHeadingWrap}>
        <h2 className={productsStyles.productsHeading}>{activeCategory.title}</h2>
      </div>

      <div className={productsStyles.productsGrid}>
        {activeItems.length ? (
          activeItems.map((item) => (
            <ProductCard
              key={item.slug}
              item={item}
              activeCategory={activeCategory}
              itemCount={counts[item.slug] ?? 0}
              onChangeCount={onChangeCount}
              yogurtToneMap={yogurtToneMap}
            />
          ))
        ) : (
          <div className={productsStyles.emptyState}>No products match that search.</div>
        )}
      </div>
    </section>
  );
}
