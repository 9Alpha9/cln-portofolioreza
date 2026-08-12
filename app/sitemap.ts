import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/reviews";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";

const BASE_URL = "https://www.tahutechsetup.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const slugs = await getAllSlugs();
  const reviewPages = slugs.map((slug) => ({
    url: `${BASE_URL}/reviews/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const brandPages = brands.map((brand) => ({
    url: `${BASE_URL}/brand/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...reviewPages, ...categoryPages, ...brandPages];
}
