import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewGrid } from "@/components/review/review-grid";
import { GsapReveal } from "@/components/animation";
import type { ReviewSummary } from "@/types";

type Category = {
  slug: string;
  name: string;
  description: string;
};

type CategoryPageContentProps = {
  category: Category;
  reviews: ReviewSummary[];
  relatedCategories: Category[];
};

export function CategoryPageContent({
  category,
  reviews,
  relatedCategories,
}: CategoryPageContentProps) {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <Container className="py-8 sm:py-12">
        <GsapReveal delay={0.15}>
          <SectionHeading description={category.description}>
            {category.name}
          </SectionHeading>
        </GsapReveal>

        {reviews.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted">Belum ada review untuk kategori ini.</p>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-heading mb-4">
                Semua Review {category.name}
              </h2>
              <ReviewGrid reviews={reviews} />
            </div>
          </>
        )}

        {relatedCategories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-heading mb-4">Kategori Lainnya</h2>
            <div className="flex flex-wrap gap-2">
              {relatedCategories.map((relatedCategory) => (
                <a
                  key={relatedCategory.slug}
                  href={`/category/${relatedCategory.slug}`}
                  className="arcade-badge bg-surface px-4 py-2 text-sm text-foreground hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
                >
                  {relatedCategory.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
