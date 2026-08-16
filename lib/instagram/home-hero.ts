import instagramMedia from "@/content/media/instagram-media.json";
import type { ReviewSummary } from "@/types";

export type HomeHeroItem = {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  href: string;
};

type InstagramMedia = {
  id: string;
  media_type: string;
  media_url: string;
  blob_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getCaptionTitle(caption?: string): string {
  const firstLine = caption?.split("\n").find((line) => line.trim())?.trim();
  return firstLine?.replace(/https?:\/\/\S+/g, "").trim() || "Video terbaru TahuTech";
}

function findMatchingReview(caption: string, reviews: ReviewSummary[]) {
  const normalizedCaption = normalize(caption);
  const match = reviews
    .map((review) => {
      const name = normalize(review.name);
      const nameWords = name.split(" ").filter((word) => word.length > 2);
      const matchedWords = nameWords.filter((word) => normalizedCaption.includes(word)).length;
      const isExactMatch = normalizedCaption.includes(name);
      return { review, matchedWords, isExactMatch };
    })
    .sort((a, b) => Number(b.isExactMatch) - Number(a.isExactMatch) || b.matchedWords - a.matchedWords)[0];

  if (!match || (!match.isExactMatch && match.matchedWords < 2)) return undefined;
  return match;
}

export function getHomeHeroItems(reviews: ReviewSummary[]): HomeHeroItem[] {
  return (instagramMedia as InstagramMedia[])
    .filter((item) => item.media_type === "VIDEO" && item.media_url)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3)
    .map((item) => {
      const match = findMatchingReview(item.caption ?? "", reviews);

      return {
        id: item.id,
        title: match
      ? `Review Terbaru: ${match.review.name}`
      : getCaptionTitle(item.caption),
        videoUrl: item.blob_url || item.media_url,
        thumbnailUrl: `/images/instagram/${item.id}.jpg`,
        permalink: item.permalink,
        href: match ? `/reviews/${match.review.slug}` : item.permalink,
      };
    });
}
