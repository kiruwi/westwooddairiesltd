export type HomeProduct = {
  name: string;
  size: string;
  image: string;
  href: string;
};

export type HomeFaq = {
  question: string;
  answer: string;
};

export type HomeGalleryItem = {
  image: string;
  text: string;
  color: string;
};

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    name: "Yogurt",
    size: "Kids and Adults",
    image: "/images/BLUEBERRY.webp",
    href: "/products?category=yogurt",
  },
  {
    name: "Soft Serve Ice Cream",
    size: "Ice Cream Ingredient",
    image: "/images/strawberry.webp",
    href: "/products?category=ice-cream",
  },
  {
    name: "Maziwa Lala",
    size: "Fermented milk",
    image: "/images/maziwa lala.webp",
    href: "/products?category=fermented-milk",
  },
];

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "How do I place an order?",
    answer:
      "Place your order through the form below or give us a quick call. We will confirm what is available and sort you out right away.",
  },
  {
    question: "Which areas do you deliver to?",
    answer:
      "We deliver across our local areas in Kenya. Share your location and we will let you know the fastest delivery option.",
  },
  {
    question: "Do the products contain preservatives?",
    answer:
      "We keep it simple and fresh, with no unnecessary additives. That is how we keep the taste clean and natural.",
  },
  {
    question: "How long do the products stay fresh?",
    answer:
      "Keep everything chilled and follow the use-by date on the pack. If you need help with storage, we are happy to guide you.",
  },
  {
    question: "Can I visit your production site?",
    answer:
      "Yes, you can. We arrange visits on request, so just reach out and we will help you plan a good time.",
  },
  {
    question: "Delivery & Payment",
    answer:
      "Your order is packed to stay fresh and delivered safely within our routes. You can pay by mobile money or cash on delivery.",
  },
];

export const HOME_GALLERY_ITEMS: HomeGalleryItem[] = [
  { image: "/images/BLUEBERRY.webp", text: "Blueberry", color: "#7c3aed" },
  { image: "/images/KEY%20LIME.webp", text: "Key Lime", color: "#84cc16" },
  {
    image: "/images/LEMON%20AND%20BISCUIT.webp",
    text: "Lemon and Biscuit",
    color: "#facc15",
  },
  {
    image: "/images/MANGO%20COCNUT.webp",
    text: "Mango Coconut",
    color: "#fb923c",
  },
  { image: "/images/MANGO.webp", text: "Mango", color: "#f97316" },
  { image: "/images/MIXED%20BERRY.webp", text: "Mixed Berry", color: "#f43f5e" },
];
