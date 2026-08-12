import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewGrid } from "@/components/review/review-grid";
import { GsapReveal } from "@/components/animation";
import { getBrandBySlug, brands } from "@/data/brands";
import { getReviewsByBrand } from "@/lib/reviews";
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

  if (!brand) {
    notFound();
  }

  const reviews = await getReviewsByBrand(brand.slug);
  const relatedBrands = brands.filter((b) => b.slug !== brand.slug);

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <Container className="py-8 sm:py-12">

        <GsapReveal delay={0.15}>
          <SectionHeading description={brand.description}>
            {brand.name}
          </SectionHeading>
          <p className="text-sm text-muted mb-6">
            {reviews.length} review tersedia
          </p>
        </GsapReveal>

        {reviews.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted">
              Belum ada review untuk brand ini.
            </p>
          </div>
        ) : (
          <ReviewGrid reviews={reviews} />
        )}

        {relatedBrands.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-heading mb-4">Brand Lainnya</h2>
            <div className="flex flex-wrap gap-2">
              {relatedBrands.map((b) => (
                <a
                  key={b.slug}
                  href={`/brand/${b.slug}`}
                  className="arcade-badge bg-surface px-4 py-2 text-sm text-foreground hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
                >
                  {b.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
