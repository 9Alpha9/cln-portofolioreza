import type { NotionGearPage, Gear } from "./types";

const EMPTY_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";

function extractRichText(
  property: { type: "rich_text"; rich_text: Array<{ plain_text: string }> } | undefined
): string {
  if (!property || property.type !== "rich_text") return "";
  return property.rich_text.map((t) => t.plain_text).join("");
}

function extractTitle(
  property: { type: "title"; title: Array<{ plain_text: string }> } | undefined
): string {
  if (!property || property.type !== "title") return "";
  return property.title.map((t) => t.plain_text).join("");
}

function extractCheckbox(
  property: { type: "checkbox"; checkbox: boolean } | undefined
): boolean {
  if (!property || property.type !== "checkbox") return false;
  return property.checkbox;
}

function extractNumber(
  property: { type: "number"; number: number | null } | undefined
): number {
  if (!property || property.type !== "number" || property.number === null) return 0;
  return property.number;
}

function extractDate(
  property: { type: "date"; date: { start: string | null } | null } | undefined
): string | undefined {
  if (!property || property.type !== "date" || !property.date) return undefined;
  return property.date.start ?? undefined;
}

function extractSelect(
  property: { type: "select"; select: { name: string } | null } | undefined
): string {
  if (!property || property.type !== "select" || !property.select) return "";
  return property.select.name;
}

function normalizeTier(tier: string): string {
  return tier.replace(/\s+tier$/i, "").trim().toUpperCase();
}

function extractUrl(property: { type: "url"; url: string | null } | undefined): string {
  if (!property || property.type !== "url") return "";
  return property.url ?? "";
}

function extractFiles(
  property:
    | {
        type: "files";
        files: Array<
          | { type: "file"; file: { url: string; expiry_time?: string } }
          | { type: "external"; external: { url: string } }
        >;
      }
    | undefined
): string {
  if (!property || property.type !== "files" || property.files.length === 0) return "";
  const file = property.files[0];
  if (!file) return "";
  if (file.type === "external") return file.external.url;
  if (file.type === "file") return file.file.url;
  return "";
}

function extractRichTextAsNumber(
  property: { type: "rich_text"; rich_text: Array<{ plain_text: string }> } | undefined
): number {
  if (!property || property.type !== "rich_text") return 0;
  const text = property.rich_text.map((t) => t.plain_text).join("").trim();
  const num = parseInt(text, 10);
  return isNaN(num) ? 0 : num;
}

function extractPrice(
  property:
    | { type: "number"; number: number | null }
    | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
    | undefined
): number | undefined {
  if (!property) return undefined;
  if (property.type === "number") return property.number ?? undefined;

  const value = property.rich_text.map((item) => item.plain_text).join("").replace(/[^\d]/g, "");
  const price = Number(value);
  return Number.isFinite(price) && price > 0 ? price : undefined;
}

function generateSlugFallback(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function mapNotionPageToGear(page: NotionGearPage): Gear {
  const props = page.properties as Record<string, unknown>;

  const name = extractTitle(
    props["Nama Barang"] as
      | { type: "title"; title: Array<{ plain_text: string }> }
      | undefined
  );

  const slugRaw = extractRichText(
    props["Slug"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );
  const slug = slugRaw || generateSlugFallback(name);

  const category = extractSelect(
    props["Kategori"] as
      | { type: "select"; select: { name: string } | null }
      | undefined
  );

  const brand = extractRichText(
    props["Brand"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );

  // Handle "Thumbnail Konten" or "Thumbnail"
  const thumbnail = extractFiles(
    (props["Thumbnail Konten"] ?? props["Thumbnail"]) as
      | {
          type: "files";
          files: Array<
            | { type: "file"; file: { url: string; expiry_time?: string } }
            | { type: "external"; external: { url: string } }
          >;
        }
      | undefined
  );

  const productImage = extractFiles(
    props["Foto Produk"] as
      | {
          type: "files";
          files: Array<
            | { type: "file"; file: { url: string; expiry_time?: string } }
            | { type: "external"; external: { url: string } }
          >;
        }
      | undefined
  );

  const tier = normalizeTier(
    extractSelect(
      props["Tier"] as
        | { type: "select"; select: { name: string } | null }
        | undefined
    )
  );

  const priceFrom = extractPrice(
    props["Harga"] as
      | { type: "number"; number: number | null }
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );

  const description = extractRichText(
    props["Deskripsi"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );

  const pros = extractRichText(
    props["Kelebihan"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );

  const cons = extractRichText(
    props["Kekurangan"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );

  const conclusion = extractRichText(
    props["Kesimpulan"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );

  const marketplaces = [
    {
      platform: "tokopedia" as const,
      url: extractUrl(props["Tokopedia"] as { type: "url"; url: string | null } | undefined),
      price: extractPrice(props["HargaTokopedia"] as { type: "rich_text"; rich_text: Array<{ plain_text: string }> } | undefined),
    },
    {
      platform: "shopee" as const,
      url: extractUrl(props["Shopee"] as { type: "url"; url: string | null } | undefined),
      price: extractPrice(props["HargaShopee"] as { type: "rich_text"; rich_text: Array<{ plain_text: string }> } | undefined),
    },
    {
      platform: "tiktok" as const,
      url: extractUrl(props["Tiktok"] as { type: "url"; url: string | null } | undefined),
      price: extractPrice(props["HargaTiktok"] as { type: "rich_text"; rich_text: Array<{ plain_text: string }> } | undefined),
    },
  ].filter((marketplace) => marketplace.url);

  // Handle "Published" as rich_text type (check if text exists and is truthy)
  const publishedRaw = extractRichText(
    props["Published"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  );
  // If the field has any content, treat as published; otherwise check checkbox
  const published = publishedRaw
    ? publishedRaw.toLowerCase() !== "false" && publishedRaw.toLowerCase() !== "0"
    : extractCheckbox(
        props["Published"] as
          | { type: "checkbox"; checkbox: boolean }
          | undefined
      );

  // Handle "Featured" - support both Checkbox and Files types
  // If it's a checkbox, use the checkbox value
  // If it's files, featured = true if there are any files
  let featured = false;
  const featuredProp = props["Featured"];
  if (featuredProp) {
    const prop = featuredProp as { type: string; checkbox?: boolean; files?: unknown[] };
    if (prop.type === "checkbox") {
      featured = prop.checkbox ?? false;
    } else if (prop.type === "files") {
      featured = Array.isArray(prop.files) && prop.files.length > 0;
    }
  }

  // Handle "Order" as rich_text type
  const order = extractRichTextAsNumber(
    props["Order"] as
      | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
      | undefined
  ) || extractNumber(
    props["Order"] as
      | { type: "number"; number: number | null }
      | undefined
  );

  const reviewDate = extractDate(
    props["Review Date"] as
      | { type: "date"; date: { start: string | null } | null }
      | undefined
  );

  return {
    id: page.id,
    name,
    slug,
    category: category || "uncategorized",
    brand: brand || undefined,
    thumbnail: thumbnail || productImage || EMPTY_IMAGE,
    productImage: productImage || thumbnail || EMPTY_IMAGE,
    tier: tier || "unranked",
    priceFrom,
    description,
    pros,
    cons,
    conclusion,
    marketplaces,
    published,
    featured,
    order,
    reviewDate,
  };
}
