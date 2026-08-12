"use client";

import type { ReviewVideo } from "@/types";
import { LazyYouTubeEmbed } from "./lazy-youtube-embed";

interface ReviewVideoPlayerProps {
  video: ReviewVideo;
  productName: string;
}

function isDirectMp4(url: string) {
  return /\.mp4(\?.*)?$/i.test(url);
}

export function ReviewVideoPlayer({ video, productName }: ReviewVideoPlayerProps) {
  if (!isDirectMp4(video.url)) {
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
