"use client";

import type { ReviewVideo } from "@/types";
import { LazyYouTubeEmbed } from "./lazy-youtube-embed";

interface ReviewVideoPlayerProps {
  video: ReviewVideo;
  productName: string;
}

function InstagramEmbed({ shortcode }: { shortcode: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-border bg-surface-alt">
      <iframe
        src={`https://www.instagram.com/p/${shortcode}/embed/?cr=1&v=14&om=1`}
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
        loading="lazy"
        title="Instagram video"
      />
    </div>
  );
}

export function ReviewVideoPlayer({ video, productName }: ReviewVideoPlayerProps) {
  if (video.platform === "instagram" && video.videoId) {
    return <InstagramEmbed shortcode={video.videoId} />;
  }

  if (video.platform === "youtube" || video.platform === "tiktok") {
    return <LazyYouTubeEmbed video={video} productName={productName} />;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-border bg-black">
      <video
        src={video.url}
        poster={video.thumbnail}
        controls
        preload="metadata"
        playsInline
        suppressHydrationWarning
        className="absolute inset-0 h-full w-full"
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
