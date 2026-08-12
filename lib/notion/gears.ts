import { unstable_cache as cache, revalidateTag } from "next/cache";
import { notion } from "./client";
import { mapNotionPageToGear } from "./mapper";
import type { Gear, GearSummary } from "./types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const CACHE_TAG_GEARS = "notion-gears";
const CACHE_REVALIDATION_SECONDS = 300; // 5 minutes

async function fetchGearsFromNotion(): Promise<Gear[]> {
  try {
    const allPages: PageObjectResponse[] = [];
    let cursor: string | undefined = undefined;

    // Use search to find all pages, then filter by database
    do {
      const response = await notion.search({
        filter: { value: "page", property: "object", in_trash: false },
        start_cursor: cursor,
        page_size: 100,
      });

      for (const result of response.results) {
        if ("properties" in result) {
          const page = result as PageObjectResponse;
          const props = page.properties as Record<string, unknown>;
          // Check if this page belongs to our database by looking for "Nama Barang" title property
          if (props["Nama Barang"] && props["Kategori"]) {
            allPages.push(page);
          }
        }
      }

      cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
    } while (cursor);

    // Map and filter
    const gears = allPages.map(mapNotionPageToGear);

    // Filter only published gears with valid name and category
    return gears.filter(
      (gear) =>
        gear.published &&
        gear.name &&
        gear.name.trim() !== "" &&
        gear.category &&
        gear.category !== "uncategorized"
    );
  } catch (error) {
    console.error("[Notion] Failed to fetch gears:", error);
    throw new Error(
      "Failed to fetch gears from Notion. Check your NOTION_API_KEY and NOTION_GEARS_DATABASE_ID."
    );
  }
}

const getCachedGears = cache(
  fetchGearsFromNotion,
  [CACHE_TAG_GEARS],
  {
    revalidate: CACHE_REVALIDATION_SECONDS,
    tags: [CACHE_TAG_GEARS],
  }
);

export async function getGears(): Promise<Gear[]> {
  if (process.env.NODE_ENV === "development") {
    return fetchGearsFromNotion();
  }

  return getCachedGears();
}

export async function getFeaturedGears(): Promise<Gear[]> {
  const gears = await getGears();
  return gears.filter((gear) => gear.featured);
}

export async function getGearBySlug(slug: string): Promise<Gear | null> {
  const gears = await getGears();
  return gears.find((gear) => gear.slug === slug) ?? null;
}

export async function getGearsByCategory(category: string): Promise<Gear[]> {
  const gears = await getGears();
  return gears.filter((gear) => gear.category === category);
}

export async function getAllSlugs(): Promise<string[]> {
  const gears = await getGears();
  return gears.map((gear) => gear.slug);
}

export async function getAllCategories(): Promise<string[]> {
  const gears = await getGears();
  return [...new Set(gears.map((gear) => gear.category))];
}

export async function getAllBrands(): Promise<string[]> {
  const gears = await getGears();
  const brands = gears.map((gear) => gear.brand).filter((b): b is string => Boolean(b));
  return [...new Set(brands)];
}

export function revalidateGears(): void {
  revalidateTag(CACHE_TAG_GEARS, "max");
}

export function gearToSummary(gear: Gear): GearSummary {
  return {
    id: gear.id,
    name: gear.name,
    slug: gear.slug,
    category: gear.category,
    brand: gear.brand,
    thumbnail: gear.thumbnail,
    tier: gear.tier,
    description: gear.description,
    pros: gear.pros,
    cons: gear.cons,
    conclusion: gear.conclusion,
    marketplaces: gear.marketplaces,
    featured: gear.featured,
    order: gear.order,
    reviewDate: gear.reviewDate,
  };
}
