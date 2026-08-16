import instagramMedia from "@/content/media/instagram-media.json";
import type { ReviewSummary } from "@/types";

export type HomeHeroItem = {
  id: string;
  title: string;
  videoId: string;
  videoUrl?: string;
  thumbnailUrl: string;
  permalink: string;
  href: string;
};

type InstagramMediaItem = {
  id: string;
  media_type: string;
  media_url?: string;
  blob_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function findMatchingReview(title: string, reviews: ReviewSummary[]) {
  const normalizedTitle = normalize(title);
  const match = reviews
    .map((review) => {
      const name = normalize(review.name);
      const nameWords = name.split(" ").filter((word) => word.length > 2);
      const matchedWords = nameWords.filter((word) => normalizedTitle.includes(word)).length;
      const isExactMatch = normalizedTitle.includes(name);
      return { review, matchedWords, isExactMatch };
    })
    .sort((a, b) => Number(b.isExactMatch) - Number(a.isExactMatch) || b.matchedWords - a.matchedWords)[0];

  if (!match || (!match.isExactMatch && match.matchedWords < 2)) return undefined;
  return match;
}

export function getHomeHeroItems(reviews: ReviewSummary[]): HomeHeroItem[] {
  return (instagramMedia as InstagramMediaItem[])
    .filter((item) => item.media_type === "VIDEO" && (item.blob_url || item.media_url))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3)
    .map((item) => {
      const caption = item.caption || "";
      const match = findMatchingReview(caption, reviews);
      const videoSrc = item.blob_url || item.media_url;

      return {
        id: item.id,
        title: match
          ? `Review Terbaru: ${match.review.name}`
          : caption.replace(/#[^\s]+/g, "").trim().slice(0, 60) || "Review Terbaru",
        videoId: item.id,
        videoUrl: videoSrc,
        thumbnailUrl: item.thumbnail_url || `/images/instagram/${item.id}.jpg`,
        permalink: item.permalink,
        href: match ? `/reviews/${match.review.slug}` : item.permalink,
      };
    });
}
