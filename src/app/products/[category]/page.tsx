import { redirect } from "next/navigation";

type PageProps = {
  params: { category: string };
};

export default function ProductCategoryPage({ params }: PageProps) {
  redirect(`/products?category=${params.category}`);
}
