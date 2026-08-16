export type MarketplacePlatform = "tokopedia" | "shopee" | "tiktok";

export type ReviewCategory = string;

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface MarketplaceOffer {
  platform: MarketplacePlatform;
  label: string;
  url: string;
  price?: number;
  originalPrice?: number;
  storeName?: string;
  affiliate?: boolean;
}

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface SpecificationGroup {
  title: string;
  items: SpecificationItem[];
}

export interface ReviewVideo {
  platform: "youtube" | "tiktok" | "instagram";
  url: string;
  videoId?: string;
  thumbnail?: string;
}

export interface ReviewMetadata {
  slug: string;
  name: string;
  brand: string;
  category: ReviewCategory;
  tier?: string;
  shortDescription: string;
  verdict: string;
  score?: number;
  priceFrom?: number;
  currency: "IDR";
  thumbnail: ProductImage;
  gallery: ProductImage[];
  video?: ReviewVideo;
  pros: string[];
  cons: string[];
  specifications: SpecificationGroup[];
  marketplaces: MarketplaceOffer[];
  featured: boolean;
  publishedAt: string;
  updatedAt?: string;
  priceUpdatedAt?: string;
  tags: string[];
}

export type ReviewSummary = Pick<
  ReviewMetadata,
  | "slug"
  | "name"
   | "brand"
  | "category"
  | "tier"
  | "shortDescription"
  | "verdict"
  | "score"
  | "priceFrom"
  | "currency"
  | "thumbnail"
  | "specifications"
  | "video"
  | "featured"
  | "publishedAt"
  | "tags"
>;
