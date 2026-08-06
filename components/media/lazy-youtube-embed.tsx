"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { ReviewVideo } from "@/types";

interface LazyYouTubeEmbedProps {
  video: ReviewVideo;
  productName: string;
}

function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

export function LazyYouTubeEmbed({ video, productName }: LazyYouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (!video.videoId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface">
        <div className="flex h-full items-center justify-center">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Tonton video di {video.platform}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      {isLoaded ? (
        <iframe
          src={getYouTubeEmbedUrl(video.videoId)}
          title={`Video review ${productName}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={handleLoad}
          className="group relative h-full w-full"
          aria-label={`Putar video review ${productName}`}
        >
          <Image
            src={video.thumbnail ?? getYouTubeThumbnailUrl(video.videoId)}
            alt={`Thumbnail video review ${productName}`}
            fill
            sizes="(min-width: 640px) 60vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-110">
              <svg
                className="h-6 w-6 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="rounded-lg bg-background/80 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              Putar Video
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
