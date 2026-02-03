export type ProductCategory = {
  id: string;
  title: string;
  description: string;
  tone: string;
};

export type ProductItem = {
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  image?: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "ice-cream",
    title: "Ice cream",
    description:
      "Soft serve ice cream made for cones, cups, and food service partners.",
    tone: "#fff4d6",
  },
  {
    id: "yogurt",
    title: "Yogurt",
    description: "Creamy, high-protein yogurt with vibrant fruit flavors.",
    tone: "#fde7f3",
  },
  {
    id: "fermented-milk",
    title: "Fermented milk",
    description:
      "Traditional maziwa lala with a gentle tang for everyday drinking.",
    tone: "#e7f6ef",
  },
];

export const PRODUCT_ITEMS: ProductItem[] = [
  {
    slug: "soft-serve-ice-cream",
    name: "Soft serve ice cream",
    description: "Smooth, airy, and clean on the finish.",
    categoryId: "ice-cream",
  },
  {
    slug: "blueberry-yogurt",
    name: "Blueberry",
    description: "Blueberry yogurt with a smooth, creamy finish.",
    categoryId: "yogurt",
    image: "/images/BLUEBERRY.webp",
  },
  {
    slug: "key-lime-yogurt",
    name: "Key lime",
    description: "Zesty key lime with a bright, tangy lift.",
    categoryId: "yogurt",
    image: "/images/KEY LIME.webp",
  },
  {
    slug: "lemon-biscuit-yogurt",
    name: "Lemon and biscuit",
    description: "Citrus yogurt balanced with a biscuit finish.",
    categoryId: "yogurt",
    image: "/images/LEMON AND BISCUIT.webp",
  },
  {
    slug: "mango-coconut-yogurt",
    name: "Mango coconut",
    description: "Tropical mango with a soft coconut note.",
    categoryId: "yogurt",
    image: "/images/MANGO COCNUT.webp",
  },
  {
    slug: "mango-yogurt",
    name: "Mango",
    description: "Sweet mango yogurt with a clean dairy finish.",
    categoryId: "yogurt",
    image: "/images/MANGO.webp",
  },
  {
    slug: "mixed-berry-yogurt",
    name: "Mixed berry",
    description: "Berry blend with a balanced, creamy taste.",
    categoryId: "yogurt",
    image: "/images/MIXED BERRY.webp",
  },
  {
    slug: "maziwa-lala",
    name: "Maziwa lala",
    description: "Cultured milk with a smooth, refreshing finish.",
    categoryId: "fermented-milk",
  },
];
