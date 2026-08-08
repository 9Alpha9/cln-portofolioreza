import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductHero } from "@/components/review/product-hero";
import { QuickVerdict } from "@/components/review/quick-verdict";
import { ProsCons } from "@/components/review/pros-cons";
import { ReviewGrid } from "@/components/review/review-grid";
import { ProductGallery } from "@/components/media/product-gallery";
import { LazyYouTubeEmbed } from "@/components/media/lazy-youtube-embed";
import { SpecificationList } from "@/components/product/specification-list";
import { MarketplaceOfferList } from "@/components/marketplace/marketplace-offer-list";
import { MobilePurchaseBar } from "@/components/marketplace/mobile-purchase-bar";
import {
  ProductStructuredData,
  BreadcrumbStructuredData,
} from "@/lib/metadata";
import { getReviewBySlug, getAllSlugs, getRelatedReviews } from "@/lib/reviews";
import { formatDate } from "@/lib/formatters";
import type { Metadata } from "next";

interface ReviewDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ReviewDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};

  return {
    title: `${review.name} Review | Gaming Gear Review`,
    description: review.verdict,
    openGraph: {
      title: `${review.name} Review`,
      description: review.verdict,
      images: [
        {
          url: review.thumbnail.src,
          width: review.thumbnail.width,
          height: review.thumbnail.height,
          alt: review.thumbnail.alt,
        },
      ],
    },
  };
}

export default async function ReviewDetailPage({
  params,
}: ReviewDetailPageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) {
    notFound();
  }

  const relatedReviews = getRelatedReviews(review);

  return (
    <>
      <ProductStructuredData review={review} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Reviews", url: "/reviews" },
          { name: review.category, url: `/category/${review.category}` },
          { name: review.name, url: `/reviews/${review.slug}` },
        ]}
      />

      <div className="min-h-screen pb-24 md:pb-8">
        <Container className="py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Reviews", href: "/reviews" },
              { label: review.category, href: `/category/${review.category}` },
              { label: review.name },
            ]}
          />

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <ProductHero review={review} />

            {/* Gallery */}
            {review.gallery.length > 0 && (
              <section className="mt-8">
                <ProductGallery
                  images={review.gallery}
                  productName={review.name}
                />
              </section>
            )}

            {/* Quick Verdict */}
            <section className="mt-8">
              <QuickVerdict
                verdict={review.verdict}
                score={review.score}
                pros={review.pros}
                cons={review.cons}
              />
            </section>

            {/* Video */}
            {review.video && (
              <section className="mt-8" id="video">
                <h2 className="text-xl font-heading mb-4">Video Review</h2>
                <LazyYouTubeEmbed
                  video={review.video}
                  productName={review.name}
                />
              </section>
            )}

            {/* Pros and Cons Detail */}
            <section className="mt-8">
              <h2 className="text-xl font-heading mb-4">
                Kelebihan dan Kekurangan
              </h2>
              <ProsCons pros={review.pros} cons={review.cons} />
            </section>

            {/* Specifications */}
            <section className="mt-8">
              <SpecificationList specifications={review.specifications} />
            </section>

            {/* Marketplace Offers */}
            <section className="mt-8">
              <MarketplaceOfferList offers={review.marketplaces} />
            </section>

            {/* Related Reviews */}
            {relatedReviews.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-heading mb-4">Review Terkait</h2>
                <ReviewGrid reviews={relatedReviews} />
              </section>
            )}
          </article>

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* Price & CTA */}
              <div className="arcade-card p-4">
                <h3 className="text-sm font-medium text-muted mb-2">
                  Informasi Harga
                </h3>
                {review.priceFrom ? (
                  <p className="text-xl font-semibold">
                    Mulai dari{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(review.priceFrom)}
                  </p>
                ) : (
                  <p className="text-muted">Harga tidak tersedia</p>
                )}
                {review.priceUpdatedAt && (
                  <p className="mt-1 text-xs text-muted">
                    Terakhir diperbarui {formatDate(review.priceUpdatedAt)}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted">
                  Harga dan ketersediaan dapat berubah di marketplace.
                </p>
              </div>

              {/* Quick Marketplace Links */}
              {review.marketplaces.length > 0 && (
                <div className="arcade-card p-4">
                  <h3 className="text-sm font-medium text-muted mb-3">
                    Link Pembelian
                  </h3>
                  <div className="space-y-2">
                    {review.marketplaces.map((offer, index) => (
                      <a
                        key={index}
                        href={offer.url}
                        target="_blank"
                        rel={
                          offer.affiliate
                            ? "noopener noreferrer sponsored"
                            : "noopener noreferrer"
                        }
                        className="flex items-center justify-between rounded-lg border border-border p-3 text-sm font-medium hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
                      >
                        <span>{offer.platform}</span>
                        {offer.storeName && (
                          <span className="text-xs text-muted">
                            {offer.storeName}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {review.tags.length > 0 && (
                <div className="arcade-card p-4">
                  <h3 className="text-sm font-medium text-muted mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        className="arcade-badge bg-surface-alt px-3 py-1 text-xs text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>

      {/* Mobile Purchase Bar */}
        <MobilePurchaseBar
          price={review.priceFrom}
          offers={review.marketplaces}
        />
      </div>
    </>
  );
}
