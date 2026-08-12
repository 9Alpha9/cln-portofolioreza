import instagramMedia from "@/content/media/instagram-media.json";

type InstagramMedia = {
  id: string;
  thumbnail_url?: string;
};

function isAllowedThumbnailUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".fna.fbcdn.net");
  } catch {
    return false;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const media = (instagramMedia as InstagramMedia[]).find((item) => item.id === id);
  const sourceUrl = media?.thumbnail_url;

  if (!sourceUrl || !isAllowedThumbnailUrl(sourceUrl)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const upstream = await fetch(sourceUrl, { next: { revalidate: 21600 } });
    const contentType = upstream.headers.get("content-type") ?? "";

    if (!upstream.ok || !contentType.startsWith("image/")) {
      return new Response("Thumbnail unavailable", { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Thumbnail unavailable", { status: 502 });
  }
}
