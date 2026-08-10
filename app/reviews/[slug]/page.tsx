import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ProductHero } from "@/components/review/product-hero";
import { QuickVerdict } from "@/components/review/quick-verdict";
import { ProsCons } from "@/components/review/pros-cons";
import { ReviewGrid } from "@/components/review/review-grid";
import { GsapReveal } from "@/components/animation";
import { ReviewVideoPlayer } from "@/components/media/review-video-player";
import { SpecificationList } from "@/components/product/specification-list";
import { MobilePurchaseBar } from "@/components/marketplace/mobile-purchase-bar";
import {
  ProductStructuredData,
  BreadcrumbStructuredData,
} from "@/lib/metadata";
import { getReviewBySlug, getAllSlugs, getRelatedReviews } from "@/lib/reviews";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { getShopPlatform } from "@/data/shop";
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

      <div className="min-h-screen pt-28 md:pt-32 pb-24 md:pb-8">
        <Container className="py-8 sm:py-12">

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
          {/* Main Content */}
          <article className="min-w-0">
            <ProductHero review={review} />

            <GsapReveal delay={0.15} y={32}>
              <section className="mt-8">
                <QuickVerdict verdict={review.verdict} score={review.score} />
              </section>
            </GsapReveal>

            {review.video && (
              <GsapReveal delay={0.15} y={32}>
                <section className="mt-8" id="video">
                  <h2 className="text-xl font-heading mb-4">Video Review</h2>
                  <ReviewVideoPlayer video={review.video} productName={review.name} />
                </section>
              </GsapReveal>
            )}

            <GsapReveal delay={0.15} y={32}>
              <section className="mt-8">
                <h2 className="text-xl font-heading mb-4">Kelebihan dan Kekurangan</h2>
                <ProsCons pros={review.pros} cons={review.cons} />
              </section>
            </GsapReveal>

            <GsapReveal delay={0.15} y={32}>
              <section className="mt-8">
                <SpecificationList specifications={review.specifications} />
              </section>
            </GsapReveal>

            {/* Related Reviews */}
            {relatedReviews.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-heading mb-4">Review Terkait</h2>
                <ReviewGrid reviews={relatedReviews} compact />
              </section>
            )}
          </article>

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-28 xl:top-32">
              <GsapReveal delay={0.3} y={32} className="space-y-6">
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
                    {review.marketplaces.map((offer, index) => {
                      const platform = getShopPlatform(offer.platform);
                      return (
                        <a
                          key={`${offer.platform}-${offer.storeName ?? index}`}
                          href={offer.url}
                          target="_blank"
                          rel={offer.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                          className="group flex items-center gap-3 border border-border p-3 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${platform.badgeColor}`}>
                            <img src={platform.logo} alt="" className="h-7 w-7 object-contain" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold">{platform.name}</p>
                            <p className="truncate text-[10px] text-muted">{offer.storeName ?? "Toko tersedia"}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-mono text-xs font-bold">
                              {offer.price ? formatCurrency(offer.price) : "Cek harga"}
                            </p>
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted group-hover:text-foreground">
                              Buka →
                            </span>
                          </div>
                        </a>
                      );
                    })}
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
              </GsapReveal>
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
