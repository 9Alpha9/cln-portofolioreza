import { reviews } from "@/data/reviews";
import type { ReviewMetadata, ReviewCategory, ReviewSummary } from "@/types";

function toSummary(review: ReviewMetadata): ReviewSummary {
  return {
    slug: review.slug,
    name: review.name,
    brand: review.brand,
    category: review.category,
    shortDescription: review.shortDescription,
    verdict: review.verdict,
    score: review.score,
    priceFrom: review.priceFrom,
    currency: review.currency,
    thumbnail: review.thumbnail,
    featured: review.featured,
    publishedAt: review.publishedAt,
    tags: review.tags,
  };
}

export function getAllReviews(): ReviewSummary[] {
  return reviews.map(toSummary);
}

export function getReviewBySlug(slug: string): ReviewMetadata | undefined {
  return reviews.find((r) => r.slug === slug);
}

export function getFeaturedReviews(): ReviewSummary[] {
  return reviews.filter((r) => r.featured).map(toSummary);
}

export function getReviewsByCategory(category: ReviewCategory): ReviewSummary[] {
  return reviews.filter((r) => r.category === category).map(toSummary);
}

export function getReviewsByBrand(brand: string): ReviewSummary[] {
  return reviews.filter((r) => r.brand.toLowerCase() === brand.toLowerCase()).map(toSummary);
}

export function getRelatedReviews(
  review: ReviewMetadata,
  limit = 3
): ReviewSummary[] {
  return reviews
    .filter((r) => r.slug !== review.slug)
    .sort((a, b) => {
      let score = 0;
      if (a.category === review.category) score += 3;
      if (a.brand === review.brand) score += 2;
      if (a.tags.some((t) => review.tags.includes(t))) score += 1;
      if (a.priceFrom && review.priceFrom) {
        const diff = Math.abs(a.priceFrom - review.priceFrom);
        if (diff < 500000) score += 1;
      }
      // Use b for secondary sort if needed
      void b;
      return score;
    })
    .slice(0, limit)
    .map(toSummary);
}

export function getAllSlugs(): string[] {
  return reviews.map((r) => r.slug);
}

export function getAllBrands(): string[] {
  return [...new Set(reviews.map((r) => r.brand))];
}

export function getAllCategories(): ReviewCategory[] {
  return [...new Set(reviews.map((r) => r.category))];
}
