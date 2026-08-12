"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MediaIndicator } from "@/components/ui/media-indicator";
import { CursorIndicator } from "@/components/ui/cursor-indicator";
import { SplitTextLink } from "@/components/ui/split-text-link";

interface InstagramVideo {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

export function InstagramVideos({ videos }: { videos: InstagramVideo[] }) {
  const [mounted, setMounted] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndex = useRef<number | null>(null);
  const isSwipingRef = useRef(false);
  const swipeStartRef = useRef({ x: 0, y: 0 });

  const setIndicatorState = (index: number, isPlaying: boolean) => {
    setPlayingIndex(isPlaying ? index : (current) => (current === index ? null : current));
  };

  const getVideo = (index: number) => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    return isMobile ? mobileVideoRefs.current[index] : desktopVideoRefs.current[index];
  };

  const pauseVideo = (index: number, reset = false) => {
    const video = getVideo(index);
    if (!video) return;
    video.pause();
    if (reset) video.currentTime = 0;
    setIndicatorState(index, false);
  };

  const toggleVideo = async (index: number) => {
    if (isSwipingRef.current) return;

    const video = getVideo(index);
    if (!video) return;

    if (activeIndex.current === index && !video.paused) {
      pauseVideo(index);
      activeIndex.current = null;
      return;
    }

    videos.forEach((_, itemIndex) => {
      if (itemIndex !== index) pauseVideo(itemIndex, true);
    });

    try {
      video.muted = false;
      await video.play();
      activeIndex.current = index;
      setIndicatorState(index, true);
    } catch {
      activeIndex.current = null;
      setIndicatorState(index, false);
    }
  };

  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">DARI INSTAGRAM</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Video Harus Kamu Tahu</h2>
        </div>
        <SplitTextLink
          href="https://www.instagram.com/tahutech.idn"
          target="_blank"
          rel="noopener noreferrer"
          className="items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          icon={<ArrowUpRight className="h-4 w-4" />}
        >
          @tahutech.idn
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
                <div
                  className="group relative aspect-[4/6] cursor-pointer select-none overflow-hidden border border-border bg-surface-alt"
                  onPointerDown={(event) => {
                    swipeStartRef.current = { x: event.clientX, y: event.clientY };
                    isSwipingRef.current = false;
                  }}
                  onPointerUp={(event) => {
                    const dx = event.clientX - swipeStartRef.current.x;
                    const dy = event.clientY - swipeStartRef.current.y;
                    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) isSwipingRef.current = true;
                  }}
                  onClick={() => toggleVideo(index)}
                >
                  <video
                    ref={(element) => { mobileVideoRefs.current[index] = element; }}
                    src={video.media_url}
                    poster={`/images/instagram/${video.id}.jpg`}
                    loop
                    playsInline
                    preload="auto"
                    suppressHydrationWarning
                    onLoadedMetadata={(event) => {
                      event.currentTarget.currentTime = 0.1;
                    }}
                    onPause={() => setIndicatorState(index, false)}
                    onPlay={() => setIndicatorState(index, true)}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                  <img
                    src={`/images/instagram/${video.id}.jpg`}
                    alt={video.caption?.split("\n")[0] || "Thumbnail video Instagram Tahutech"}
                    className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playingIndex === index ? "opacity-0" : "opacity-100"}`}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Instagram Reel</span>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-white">{video.caption?.split("\n")[0] || "Lihat video terbaru Tahutech"}</p>
                    <Link href={video.permalink} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="pointer-events-auto mt-4 inline-block cursor-pointer text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white">
                      Buka Instagram ↗
                    </Link>
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <MediaIndicator variant={playingIndex === index ? "pause" : "play"} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Desktop grid */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <CursorIndicator
            key={video.id}
            variant={playingIndex === index ? "pause" : "play"}
            className="aspect-[4/6] cursor-none select-none overflow-hidden border border-border bg-surface-alt"
          >
            <div onClick={() => toggleVideo(index)} className="h-full w-full">
              <video
                ref={(element) => { desktopVideoRefs.current[index] = element; }}
                src={video.media_url}
                poster={`/images/instagram/${video.id}.jpg`}
                loop
                playsInline
                preload="auto"
                suppressHydrationWarning
                onLoadedMetadata={(event) => {
                  event.currentTarget.currentTime = 0.1;
                }}
                onPause={() => setIndicatorState(index, false)}
                onPlay={() => setIndicatorState(index, true)}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
              <img
                src={`/images/instagram/${video.id}.jpg`}
                alt={video.caption?.split("\n")[0] || "Thumbnail video Instagram Tahutech"}
                className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playingIndex === index ? "opacity-0" : "opacity-100"}`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Instagram Reel</span>
                <p className="mt-2 line-clamp-2 text-sm font-medium text-white">{video.caption?.split("\n")[0] || "Lihat video terbaru Tahutech"}</p>
                <Link href={video.permalink} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="pointer-events-auto mt-4 inline-block cursor-pointer text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white">
                  Buka Instagram ↗
                </Link>
              </div>
            </div>
          </CursorIndicator>
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
