"use client";

import { useState, useCallback } from "react";
import type { ReviewVideo } from "@/types";

interface LazyYouTubeEmbedProps {
  video: ReviewVideo;
  productName: string;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function LazyYouTubeEmbed({ video, productName }: LazyYouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (!video.videoId) {
    return (
      <div className="arcade-card relative w-full overflow-hidden p-6">
        <div className="flex items-center justify-center">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="arcade-btn bg-accent px-4 py-2 text-sm text-accent-foreground"
          >
            Tonton video di {video.platform}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="arcade-card relative aspect-video w-full overflow-hidden">
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
          <img
            src={video.thumbnail ?? getYouTubeThumbnailUrl(video.videoId)}
            alt={`Thumbnail video review ${productName}`}
            className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/40">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground border-4 border-border transition-transform duration-300 ease-out group-hover:scale-110">
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
            <span className="arcade-badge bg-background/80 px-3 py-1.5 text-sm font-bold backdrop-blur-sm">
              Putar Video
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
