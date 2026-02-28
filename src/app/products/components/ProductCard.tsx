import Image from "next/image";

import type { ProductCategory, ProductItem } from "../../../data/products";
import { productsStyles } from "./productsStyles";

const SOFT_SERVE_PACK_SIZE_LITRES = 5;

type ProductCardProps = {
  item: ProductItem;
  activeCategory: ProductCategory;
  itemCount: number;
  onChangeCount: (slug: string, delta: number) => void;
  yogurtToneMap: Record<string, string>;
};

export default function ProductCard({
  item,
  activeCategory,
  itemCount,
  onChangeCount,
  yogurtToneMap,
}: ProductCardProps) {
  const isYogurt = activeCategory.id === "yogurt";
  const isSoftServe = activeCategory.id === "ice-cream";
  const mediaWrapStyle = isYogurt
    ? { backgroundColor: yogurtToneMap[item.slug] ?? "#fde7f3" }
    : { backgroundColor: activeCategory.tone };
  const unitPrice = item.priceKsh;
  const priceLabel = isSoftServe
    ? `KSH ${unitPrice.toLocaleString("en-KE")} / ${SOFT_SERVE_PACK_SIZE_LITRES}L tub`
    : `KSH ${unitPrice.toLocaleString("en-KE")}`;
  const quantityLabel = `${itemCount}`;

  return (
    <div className={productsStyles.card}>
      <div className={productsStyles.mediaWrap} style={mediaWrapStyle}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 90vw, 30vw"
            className="object-contain p-1"
          />
        ) : (
          <div
            className={productsStyles.imageFallback}
            style={{ backgroundColor: activeCategory.tone }}
          >
            <span className={productsStyles.comingSoonLabel}>Image</span>
            <span className={productsStyles.comingSoonText}>Coming soon</span>
          </div>
        )}
      </div>
      <div className={productsStyles.cardBody}>
        <h3 className={`${productsStyles.cardTitle} text-[#213864]`}>
          {item.name}
        </h3>
        <p
          className={`${productsStyles.cardDescription} ${
            isYogurt ? "text-[#213864]" : "text-black"
          }`}
        >
          {item.description}
        </p>
        <div className={productsStyles.cardFooter}>
          <span className={`${productsStyles.cardPrice} text-[#213864]`}>
            {priceLabel}
          </span>
          <div className={productsStyles.counterWrap}>
            <button
              type="button"
              onClick={() => onChangeCount(item.slug, -1)}
              disabled={!itemCount}
              aria-label={`Remove ${item.name}`}
              className={`${productsStyles.decrementButtonBase} ${
                itemCount
                  ? productsStyles.decrementEnabled
                  : productsStyles.decrementDisabled
              }`}
            >
              -
            </button>
            <span className={productsStyles.quantity}>{quantityLabel}</span>
            <button
              type="button"
              onClick={() => onChangeCount(item.slug, 1)}
              aria-label={`Add ${item.name}`}
              className={productsStyles.incrementButton}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
