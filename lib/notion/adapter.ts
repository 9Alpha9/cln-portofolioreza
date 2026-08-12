import type { Gear } from "@/lib/notion/types";
import type { ReviewMetadata, ReviewSummary, ProductImage } from "@/types";

function normalizeCategory(category: string): string {
  return category.trim();
}

function gearThumbnailToProductImage(thumbnail: string): ProductImage {
  return {
    src: thumbnail,
    alt: "Product image",
    width: 800,
    height: 600,
  };
}

function gearProsToArray(pros: string): string[] {
  if (!pros) return [];
  return pros
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

function gearConsToArray(cons: string): string[] {
  if (!cons) return [];
  return cons
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean);
}

export function gearToReviewMetadata(gear: Gear): ReviewMetadata {
  const thumbnailImage = gearThumbnailToProductImage(gear.thumbnail);
  const productImage = gearThumbnailToProductImage(gear.productImage);

  return {
    slug: gear.slug,
    name: gear.name,
    brand: gear.brand ?? "Unknown",
    category: normalizeCategory(gear.category),
    tier: gear.tier,
    shortDescription: gear.description || `${gear.name} review by TahuTech.`,
    verdict: gear.conclusion || gear.description || `${gear.name} review.`,
    score: undefined,
    priceFrom: gear.priceFrom,
    currency: "IDR",
    thumbnail: thumbnailImage,
    gallery: [thumbnailImage, productImage].filter(
      (img) => img.src && img.src !== "/images/placeholder.png"
    ),
    video: undefined,
    pros: gearProsToArray(gear.pros),
    cons: gearConsToArray(gear.cons),
    specifications: [],
    marketplaces: gear.marketplaces.map((marketplace) => ({
      platform: marketplace.platform,
      label: "Lihat Produk",
      url: marketplace.url,
      price: marketplace.price,
      affiliate: false,
    })),
    featured: gear.featured,
    publishedAt: gear.reviewDate ?? new Date().toISOString(),
    updatedAt: gear.reviewDate,
    priceUpdatedAt: undefined,
    tags: [gear.category, gear.brand ?? ""].filter(Boolean),
  };
}

export function gearToReviewSummary(gear: Gear): ReviewSummary {
  const metadata = gearToReviewMetadata(gear);
  return {
    slug: metadata.slug,
    name: metadata.name,
    brand: metadata.brand,
    category: metadata.category,
    tier: metadata.tier,
    shortDescription: metadata.shortDescription,
    verdict: metadata.verdict,
    score: metadata.score,
    priceFrom: metadata.priceFrom,
    currency: metadata.currency,
    thumbnail: metadata.thumbnail,
    specifications: metadata.specifications,
    video: metadata.video,
    featured: metadata.featured,
    publishedAt: metadata.publishedAt,
    tags: metadata.tags,
  };
}
