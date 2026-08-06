import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ReviewGrid } from "@/components/review/review-grid";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getReviewsByCategory, getFeaturedReviews } from "@/lib/reviews";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
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

  if (!category) {
    notFound();
  }

  const reviews = getReviewsByCategory(category.slug);
  const featured = getFeaturedReviews().filter(
    (r) => r.category === category.slug
  );
  const relatedCategories = categories.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ label: "Categories" }, { label: category.name }]} />

        <SectionHeading description={category.description}>
          {category.name}
        </SectionHeading>

        {reviews.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted">
              Belum ada review untuk kategori ini.
            </p>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Featured</h2>
                <ReviewGrid reviews={featured} featured />
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Semua Review {category.name}
              </h2>
              <ReviewGrid reviews={reviews} />
            </div>
          </>
        )}

        {relatedCategories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">Kategori Lainnya</h2>
            <div className="flex flex-wrap gap-2">
              {relatedCategories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
