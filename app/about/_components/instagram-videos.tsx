"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SplitTextLink } from "@/components/ui/split-text-link";
import { YouTubePlayer, type YouTubePlayerHandle } from "@/components/ui/youtube-player";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  publishedAt: string;
  views: number;
  url: string;
}

export function InstagramVideos({ videos }: { videos: VideoItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const playerRefs = useRef<(YouTubePlayerHandle | null)[]>([]);

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
        <SplitTextLink
          href="https://www.youtube.com/@tahu_tech"
          target="_blank"
          rel="noopener noreferrer"
          className="items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          icon={<ArrowUpRight className="h-4 w-4" />}
        >
          @tahu_tech
        </SplitTextLink>
      </div>

      <div className="sm:hidden">
        {mounted && (
          <Swiper
            slidesPerView={1.15}
            spaceBetween={16}
            centeredSlides
            grabCursor
            watchSlidesProgress
            onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
            className="-mx-4 !overflow-hidden px-4"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id} className="!h-auto">
                <div className="group relative aspect-[4/5] overflow-hidden border border-border bg-surface-alt">
                  <YouTubePlayer
                    videoUrl={video.videoUrl}
                    poster={video.thumbnail}
                    autoplay={false}
                    muted
                    loop
                    className="w-full h-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Instagram</span>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-white">{video.title}</p>
                    <Link href={video.url} target="_blank" rel="noopener noreferrer" className="pointer-events-auto mt-4 inline-block cursor-pointer text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white">
                      Buka Instagram ↗
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="relative aspect-[4/5] overflow-hidden border border-border bg-surface-alt"
          >
            <YouTubePlayer
              videoUrl={video.videoUrl}
              poster={video.thumbnail}
              autoplay={false}
              muted
              loop
              className="w-full h-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Instagram</span>
              <p className="mt-2 line-clamp-2 text-sm font-medium text-white">{video.title}</p>
              <Link href={video.url} target="_blank" rel="noopener noreferrer" className="pointer-events-auto mt-4 inline-block cursor-pointer text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white">
                Buka Instagram ↗
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 sm:hidden" aria-label="Posisi slide">
        {videos.map((video, index) => (
          <span
            key={video.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === slideIndex ? "w-8 bg-foreground" : "w-1.5 bg-muted"}`}
          />
        ))}
      </div>
    </section>
  );
}

export default InstagramVideos;
