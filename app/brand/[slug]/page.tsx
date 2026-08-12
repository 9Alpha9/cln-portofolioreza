import { notFound } from "next/navigation";
import { getBrandBySlug, brands } from "@/content/site/brands";
import { getReviewsByBrand } from "@/lib/reviews";
import { BrandPageContent } from "./_components/brand-page-content";
import type { Metadata } from "next";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  return {
    title: `${brand.name} Reviews | Gaming Gear Review`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) notFound();

  const reviews = await getReviewsByBrand(brand.slug);
  const relatedBrands = brands.filter((item) => item.slug !== brand.slug);

  return (
    <BrandPageContent
      brand={brand}
      reviews={reviews}
      relatedBrands={relatedBrands}
    />
  );
}
