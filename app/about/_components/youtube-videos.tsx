"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SplitTextLink } from "@/components/ui/split-text-link";
import { MediaIndicator } from "@/components/ui/media-indicator";
import { youtubeThumbnailUrl } from "@/lib/youtube/thumbnail";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views: number;
  url: string;
}

function YouTubeVideoCard({
  video,
  isActive,
  onActiveChange,
}: {
  video: VideoItem;
  isActive: boolean;
  onActiveChange: (videoId: string | null) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const sendCommand = (func: "playVideo" | "pauseVideo" | "mute" | "unMute") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "https://www.youtube.com"
    );
  };

  const togglePlay = () => {
    if (!isLoaded) {
      setIsLoaded(true);
      onActiveChange(video.id);
      return;
    }

    if (isActive) {
      sendCommand("pauseVideo");
      onActiveChange(null);
    } else {
      sendCommand("playVideo");
      onActiveChange(video.id);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    sendCommand(isActive ? "playVideo" : "pauseVideo");
  }, [isActive, isLoaded]);

  const toggleMute = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    sendCommand(isMuted ? "unMute" : "mute");
    setIsMuted((muted) => !muted);
  };

  useEffect(() => {
    const frame = frameRef.current;
    const iframe = iframeRef.current;
    if (!frame || !iframe) return;

    const applyCover = () => {
      const { width, height } = frame.getBoundingClientRect();
      if (!width || !height) return;

      const shortsRatio = 9 / 16;
      const frameRatio = width / height;
      const iframeWidth = frameRatio > shortsRatio ? width : height * shortsRatio;
      const iframeHeight = frameRatio > shortsRatio ? width / shortsRatio : height;

      iframe.style.width = `${iframeWidth}px`;
      iframe.style.height = `${iframeHeight}px`;
    };

    applyCover();
    const observer = new ResizeObserver(applyCover);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <div ref={frameRef} className="group relative aspect-[4/5] overflow-hidden border border-border bg-surface-alt">
      {isLoaded ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
        />
      ) : (
        <img
          src={youtubeThumbnailUrl(video.id, thumbnailIndex)}
          alt={video.title}
          onError={() => setThumbnailIndex((current) => Math.min(current + 1, 2))}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isActive ? "Pause YouTube video" : "Play YouTube video"}
        className="absolute inset-0 z-10 border-0 bg-transparent p-0"
      >
        <MediaIndicator
          variant="play"
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${isActive ? "pointer-events-none opacity-0" : "opacity-100"}`}
        />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
        <p className="line-clamp-2 text-sm font-medium text-white">{video.title.replace(/#[^\s]+/g, "").trim()}</p>
        <Link href={video.url} target="_blank" rel="noopener noreferrer" className="pointer-events-auto mt-4 inline-block cursor-pointer text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white">
          Buka YouTube ↗
        </Link>
      </div>

      {isLoaded && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Turn video sound on" : "Mute video"}
          className="absolute right-3 top-3 z-30 flex h-9 items-center border border-white/70 bg-black/60 px-3 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-sm"
        >
          {isMuted ? "Sound on" : "Sound off"}
        </button>
      )}
    </div>
  );
}

export function YouTubeVideos({ videos }: { videos: VideoItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">DARI YOUTUBE</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Video Harus Kamu Tahu</h2>
        </div>
        <SplitTextLink href="https://www.youtube.com/@tahu_tech" target="_blank" rel="noopener noreferrer" className="items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground" icon={<ArrowUpRight className="h-4 w-4" />}>
          @tahu_tech
        </SplitTextLink>
      </div>

      <div className="sm:hidden">
        {mounted && (
          <Swiper slidesPerView={1.15} spaceBetween={16} centeredSlides grabCursor watchSlidesProgress onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)} className="-mx-4 !overflow-hidden px-4">
            {videos.map((video) => (
              <SwiperSlide key={video.id} className="!h-auto">
                <YouTubeVideoCard video={video} isActive={activeVideoId === video.id} onActiveChange={setActiveVideoId} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <YouTubeVideoCard key={video.id} video={video} isActive={activeVideoId === video.id} onActiveChange={setActiveVideoId} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 sm:hidden" aria-label="Posisi slide">
        {videos.map((video) => (
          <span key={video.id} className={`h-1.5 rounded-full transition-all duration-300 ${slideIndex === videos.findIndex((item) => item.id === video.id) ? "w-8 bg-foreground" : "w-1.5 bg-muted"}`} />
        ))}
      </div>
    </section>
  );
}

export default YouTubeVideos;
