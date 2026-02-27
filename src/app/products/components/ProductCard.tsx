import Image from "next/image";

import type { ProductCategory, ProductItem } from "../../../data/products";
import { productsStyles } from "./productsStyles";

const SOFT_SERVE_STEP_LITRES = 0.25;

function formatNumber(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2).replace(/\.?0+$/, "");
}

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
  const cardBodyStyle = isYogurt
    ? { backgroundColor: yogurtToneMap[item.slug] ?? "#fde7f3" }
    : undefined;
  const unitPrice = item.priceKsh;
  const computedPriceKsh = isSoftServe
    ? Math.round(unitPrice * Math.max(itemCount, 0))
    : unitPrice;
  const priceLabel = isSoftServe
    ? itemCount > 0
      ? `KSH ${computedPriceKsh.toLocaleString("en-KE")} (${formatNumber(itemCount)} L)`
      : `KSH ${unitPrice.toLocaleString("en-KE")} / litre`
    : `KSH ${unitPrice.toLocaleString("en-KE")}`;
  const quantityLabel = isSoftServe ? `${formatNumber(itemCount)} L` : `${itemCount}`;

  return (
    <div className={productsStyles.card}>
      <div className={productsStyles.mediaWrap}>
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
      <div className={productsStyles.cardBody} style={cardBodyStyle}>
        <h3
          className={`${productsStyles.cardTitle} ${
            isYogurt ? "text-white" : "text-[#213864]"
          }`}
        >
          {item.name}
        </h3>
        <p
          className={`${productsStyles.cardDescription} ${
            isYogurt ? "text-white/90" : "text-black"
          }`}
        >
          {item.description}
        </p>
        <div className={productsStyles.cardFooter}>
          <span
            className={`${productsStyles.cardPrice} ${
              isYogurt ? "text-white" : "text-[#213864]"
            }`}
          >
            {priceLabel}
          </span>
          <div className={productsStyles.counterWrap}>
            <button
              type="button"
              onClick={() =>
                onChangeCount(item.slug, isSoftServe ? -SOFT_SERVE_STEP_LITRES : -1)
              }
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
              onClick={() =>
                onChangeCount(item.slug, isSoftServe ? SOFT_SERVE_STEP_LITRES : 1)
              }
              aria-label={`Add ${item.name}`}
              className={productsStyles.incrementButton}
            >
              +
            </button>
          </div>
        </div>
        {isSoftServe ? (
          <p className="mt-2 px-1 text-xs font-semibold text-[#213864]/80 font-paragraph">
            Price algorithm: KSH {unitPrice.toLocaleString("en-KE")} per litre, adjustable
            by 0.25 L.
          </p>
        ) : null}
      </div>
    </div>
  );
}
