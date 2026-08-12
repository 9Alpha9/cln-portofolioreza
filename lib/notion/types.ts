import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionGearPage = PageObjectResponse;

export type Gear = {
  id: string;

  name: string;
  slug: string;

  category: string;
  brand?: string;

  thumbnail: string;
  productImage: string;

  tier: string;
  priceFrom?: number;
  marketplaces: Array<{
    platform: "tokopedia" | "shopee" | "tiktok";
    url: string;
    price?: number;
  }>;

  description: string;
  pros: string;
  cons: string;
  conclusion: string;

  published: boolean;
  featured: boolean;

  order: number;

  reviewDate?: string;
};

export type GearSummary = Pick<
  Gear,
  | "id"
  | "name"
  | "slug"
  | "category"
  | "brand"
  | "thumbnail"
  | "tier"
  | "description"
  | "pros"
  | "cons"
   | "conclusion"
   | "marketplaces"
   | "featured"
  | "order"
  | "reviewDate"
>;
