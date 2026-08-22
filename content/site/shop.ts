import type { MarketplacePlatform } from "@/types";

export interface ShopPlatform {
  id: MarketplacePlatform;
  name: string;
  description: string;
  logo: string;
  badgeColor: string;
  buttonColor: string;
}

export const shopPlatforms: ShopPlatform[] = [
  {
    id: "tokopedia",
    name: "Tokopedia",
    description: "Marketplace terbesar di Indonesia dengan ribuan toko resmi gaming gear.",
    logo: "/logos/tokopedia-logo.png",
    badgeColor: "bg-green-600/10 text-green-700 dark:text-green-500",
    buttonColor: "hover:bg-green-600 hover:border-green-600 hover:text-white dark:text-foreground dark:hover:bg-green-600 dark:hover:border-green-600 dark:hover:text-white",
  },
  {
    id: "shopee",
    name: "Shopee",
    description: "Platform e-commerce populer dengan flash sale & free shipping harian.",
    logo: "/logos/shopee-logos.png",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-500",
    buttonColor: "hover:bg-orange-500 hover:border-orange-500 hover:text-white dark:text-foreground dark:hover:bg-orange-500 dark:hover:border-orange-500 dark:hover:text-white",
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    description: "Belanja langsung dari livestream & video creator gaming favorit.",
    logo: "/logos/tiktok-logo-shop.webp",
    badgeColor: "bg-gray-200 dark:bg-gray-800 text-foreground dark:text-gray-100",
    buttonColor: "hover:bg-foreground hover:border-foreground hover:text-background dark:text-foreground dark:hover:bg-white dark:hover:border-white dark:hover:text-black",
  },
];

export const shopPage = {
  title: "Shop | Gaming Gear Review",
  description: "Toko resmi & marketplace terpercaya untuk beli gear gaming: Tokopedia, Shopee, TikTok Shop.",
  heading: "Shop",
  tagline: "Marketplace resmi & toko terpercaya untuk beli gear gaming favoritmu.",
  disclaimer:
    "Harga dan ketersediaan dapat berubah di marketplace. Data diambil dari informasi pada halaman produk.",
  disclaimerNote: "Klik produk untuk lihat review detail & semua pilihan marketplace.",
};

export function getShopPlatform(id: MarketplacePlatform): ShopPlatform {
  const platform = shopPlatforms.find((p) => p.id === id);
  if (!platform) throw new Error(`Unknown shop platform: ${id}`);
  return platform;
}
