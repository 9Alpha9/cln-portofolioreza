import { notFound } from "next/navigation";
import { getCategoryBySlug, categories } from "@/content/site/categories";
import { getReviewsByCategory } from "@/lib/reviews";
import { CategoryPageContent } from "./_components/category-page-content";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} Reviews | Gaming Gear Review`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const reviews = await getReviewsByCategory(category.slug);
  const relatedCategories = categories.filter(
    (item) => item.slug !== category.slug
  );

  return (
    <CategoryPageContent
      category={category}
      reviews={reviews}
      relatedCategories={relatedCategories}
    />
  );
}
