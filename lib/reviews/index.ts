import {
  getGears,
  getFeaturedGears,
  getGearBySlug,
  getGearsByCategory,
  getAllSlugs as notionGetAllSlugs,
  getAllCategories as notionGetAllCategories,
  getAllBrands as notionGetAllBrands,
} from "@/lib/notion/gears";
import { gearToReviewMetadata, gearToReviewSummary } from "@/lib/notion/adapter";
import type {
  ReviewMetadata,
  ReviewCategory,
  ReviewSummary,
  MarketplaceOffer,
  MarketplacePlatform,
} from "@/types";

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
    specifications: review.specifications,
    featured: review.featured,
    publishedAt: review.publishedAt,
    tags: review.tags,
  };
}

export async function getAllReviews(): Promise<ReviewSummary[]> {
  const gears = await getGears();
  return gears.map(gearToReviewSummary);
}

export async function getReviewBySlug(
  slug: string
): Promise<ReviewMetadata | undefined> {
  const gear = await getGearBySlug(slug);
  if (!gear) return undefined;
  return gearToReviewMetadata(gear);
}

export async function getFeaturedReviews(): Promise<ReviewSummary[]> {
  const gears = await getFeaturedGears();
  return gears.map(gearToReviewSummary);
}

export async function getReviewsByCategory(
  category: ReviewCategory
): Promise<ReviewSummary[]> {
  const gears = await getGearsByCategory(category);
  return gears.map(gearToReviewSummary);
}

export async function getReviewsByBrand(
  brand: string
): Promise<ReviewSummary[]> {
  const gears = await getGears();
  return gears
    .filter((g) => g.brand?.toLowerCase() === brand.toLowerCase())
    .map(gearToReviewSummary);
}

export async function getRelatedReviews(
  review: ReviewMetadata,
  limit = 3
): Promise<ReviewSummary[]> {
  const gears = await getGears();
  const reviews = gears.map(gearToReviewMetadata);

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
      void b;
      return score;
    })
    .slice(0, limit)
    .map(toSummary);
}

export async function getAllSlugs(): Promise<string[]> {
  return notionGetAllSlugs();
}

export async function getAllBrands(): Promise<string[]> {
  return notionGetAllBrands();
}

export async function getAllCategories(): Promise<ReviewCategory[]> {
  const categories = await notionGetAllCategories();
  return categories as ReviewCategory[];
}

export interface ProductOffer extends MarketplaceOffer {
  productName: string;
  productSlug: string;
}

export async function getAllOffers(): Promise<ProductOffer[]> {
  const gears = await getGears();
  const reviews = gears.map(gearToReviewMetadata);

  return reviews.flatMap((review) =>
    review.marketplaces.map((offer) => ({
      ...offer,
      productName: review.name,
      productSlug: review.slug,
    }))
  );
}

export async function getOffersByPlatform(
  platform: MarketplacePlatform
): Promise<ProductOffer[]> {
  const allOffers = await getAllOffers();
  return allOffers.filter((offer) => offer.platform === platform);
}
