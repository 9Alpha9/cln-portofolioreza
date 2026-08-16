import youtubeMedia from "@/content/media/youtube-media.json";
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

type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  publishedAt: string;
  views: number;
  url: string;
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
  return (youtubeMedia as YouTubeVideo[])
    .filter((item) => item.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)
    .map((item) => {
      const match = findMatchingReview(item.title, reviews);

      return {
        id: item.id,
        title: match
          ? `Review Terbaru: ${match.review.name}`
          : item.title.replace(/#[^\s]+/g, "").trim().slice(0, 60),
        videoId: item.id,
        videoUrl: item.videoUrl,
        thumbnailUrl: item.thumbnail,
        permalink: item.url,
        href: match ? `/reviews/${match.review.slug}` : item.url,
      };
    });
}
