"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ReviewGrid } from "@/components/review/review-grid";
import { CategoryNav } from "@/components/layout/category-nav";
import { CreatorProfile } from "@/components/layout/creator-profile";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animation";
import { getAllReviews, getFeaturedReviews } from "@/lib/reviews";
import { formatCurrency } from "@/lib/formatters";

export default function Home() {
  const featured = getFeaturedReviews();
  const latest = getAllReviews().slice(0, 6);
  const featuredReview = featured[0];

  return (
    <div className="min-h-screen">
      {/* Featured Review Hero */}
      <section className="border-b border-border bg-surface">
        <Container className="py-8 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {featuredReview && (
              <>
                <FadeIn className="w-full sm:w-1/2">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image
                      src={featuredReview.thumbnail.src}
                      alt={featuredReview.thumbnail.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1} className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{featuredReview.category}</Badge>
                    <Badge variant="accent">Featured</Badge>
                  </div>
                  <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    {featuredReview.name}
                  </h1>
                  <p className="mt-1 text-sm text-muted">
                    {featuredReview.brand}
                  </p>
                  <p className="mt-3 text-muted line-clamp-3">
                    {featuredReview.verdict}
                  </p>
                  {featuredReview.priceFrom && (
                    <p className="mt-3 text-lg font-semibold">
                      Mulai dari {formatCurrency(featuredReview.priceFrom)}
                    </p>
                  )}
                  <div className="mt-4 flex gap-3">
                    <Link
                      href={`/reviews/${featuredReview.slug}`}
                      className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
                    >
                      Baca Review
                    </Link>
                    <Link
                      href={`/reviews/${featuredReview.slug}#video`}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium hover:bg-surface transition-colors"
                    >
                      Tonton Video
                    </Link>
                  </div>
                </FadeIn>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-border">
        <Container className="py-4">
          <CategoryNav />
        </Container>
      </section>

      {/* Latest Reviews */}
      <section>
        <Container className="py-8 sm:py-12">
          <FadeIn>
            <SectionHeading description="Review terbaru dari berbagai kategori produk.">
              Latest Reviews
            </SectionHeading>
          </FadeIn>
          <ReviewGrid reviews={latest} />
        </Container>
      </section>

      {/* Highlighted Bento */}
      <section className="bg-surface">
        <Container className="py-8 sm:py-12">
          <FadeIn>
            <SectionHeading description="Pilihan review untuk kamu.">
              Recommended Gear
            </SectionHeading>
          </FadeIn>
          <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.slice(0, 3).map((review) => (
              <StaggerItem key={review.slug}>
                <Link
                  href={`/reviews/${review.slug}`}
                  className="group relative flex flex-col rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-start justify-between">
                    <Badge>{review.category}</Badge>
                    {review.score && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
                        {review.score.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-semibold line-clamp-2 group-hover:text-accent transition-colors">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{review.brand}</p>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {review.verdict}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* Creator Profile & Social */}
      <CreatorProfile />
    </div>
  );
}
