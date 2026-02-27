import { PRODUCT_CATEGORIES, PRODUCT_ITEMS } from "../../data/products";

export type SiteSearchItem = {
  label: string;
  href: string;
  category: "Flavour" | "Product" | "Service" | "Payment" | "Section";
  keywords: string[];
};

const nonFlavourItemSlugs = new Set(["maziwa-lala"]);

const flavourCategoryKeywords: Record<string, string[]> = {
  "ice-cream": ["ice cream", "soft serve"],
  yogurt: ["yogurt"],
  "fermented-milk": ["fermented milk", "maziwa lala"],
};

export function buildFlavourSearchItems(): SiteSearchItem[] {
  const categoryById = new Map(
    PRODUCT_CATEGORIES.map((category) => [category.id, category])
  );
  const seenLabels = new Set<string>();

  return PRODUCT_ITEMS.filter((item) => !nonFlavourItemSlugs.has(item.slug))
    .map((item) => {
      const normalizedLabel = item.name.trim().toLowerCase();
      const category = categoryById.get(item.categoryId);
      const categoryTerms = flavourCategoryKeywords[item.categoryId] ?? [];

      return {
        normalizedLabel,
        searchItem: {
          label: item.name,
          href: `/products?category=${item.categoryId}`,
          category: "Flavour" as const,
          keywords: Array.from(
            new Set([
              "flavour",
              "flavor",
              item.categoryId,
              category?.title?.toLowerCase() ?? "",
              ...categoryTerms,
            ])
          ).filter(Boolean),
        },
      };
    })
    .filter(({ normalizedLabel }) => {
      if (seenLabels.has(normalizedLabel)) {
        return false;
      }

      seenLabels.add(normalizedLabel);
      return true;
    })
    .map(({ searchItem }) => searchItem);
}

const flavourSearchItems: SiteSearchItem[] = buildFlavourSearchItems();

const otherSearchItems: SiteSearchItem[] = [
  {
    label: "Yogurt",
    href: "/products?category=yogurt",
    category: "Product",
    keywords: ["product", "dairy", "category"],
  },
  {
    label: "Soft Serve Ice Cream",
    href: "/products?category=ice-cream",
    category: "Product",
    keywords: ["product", "dairy", "category"],
  },
  {
    label: "Fermented Milk",
    href: "/products?category=fermented-milk",
    category: "Product",
    keywords: ["product", "dairy", "category", "maziwa lala"],
  },
  {
    label: "Maziwa Lala",
    href: "/products?category=fermented-milk",
    category: "Product",
    keywords: ["product", "fermented milk", "dairy"],
  },
  {
    label: "Delivery Service",
    href: "/#services",
    category: "Service",
    keywords: ["delivery", "service", "dairy delivery", "local areas"],
  },
  {
    label: "Order Placement",
    href: "/#contact",
    category: "Service",
    keywords: ["order", "buy", "contact", "sales"],
  },
  {
    label: "Production Site Visit",
    href: "/#services",
    category: "Service",
    keywords: ["visit", "tour", "factory", "production"],
  },
  {
    label: "Mobile Money",
    href: "/#payment-options",
    category: "Payment",
    keywords: ["payment", "pay", "mobile"],
  },
  {
    label: "Cash on Delivery",
    href: "/#payment-options",
    category: "Payment",
    keywords: ["payment", "pay", "cash", "cod"],
  },
  {
    label: "Home",
    href: "/#home",
    category: "Section",
    keywords: ["landing", "top"],
  },
  {
    label: "About",
    href: "/#about",
    category: "Section",
    keywords: ["about us", "company", "story"],
  },
  {
    label: "Products",
    href: "/products",
    category: "Section",
    keywords: ["catalog", "shop", "order"],
  },
  {
    label: "Process",
    href: "/#process",
    category: "Section",
    keywords: ["how we make", "production"],
  },
  {
    label: "Stockists",
    href: "/#stockists",
    category: "Section",
    keywords: ["stores", "where to buy", "retailers"],
  },
  {
    label: "Contact",
    href: "/#contact",
    category: "Section",
    keywords: ["call", "email", "reach us"],
  },
];

export const siteSearchItems: SiteSearchItem[] = [
  ...flavourSearchItems,
  ...otherSearchItems,
];
