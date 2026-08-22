import type { Metadata } from "next";
import { getOffersByPlatform } from "@/lib/reviews";
import { shopPlatforms, shopPage } from "@/content/site/shop";
import { ShopClient } from "./shop-client";

export const metadata: Metadata = {
  title: shopPage.title,
  description: shopPage.description,
};

export default async function ShopPage() {
  const platformsWithOffers = await Promise.all(
    shopPlatforms.map(async (p) => ({
      ...p,
      offers: await getOffersByPlatform(p.id),
    }))
  );
  const platforms = platformsWithOffers.filter((p) => p.offers.length > 0);

  return <ShopClient platforms={platforms} />;
}
