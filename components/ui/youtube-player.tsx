"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { youtubeThumbnailUrl } from "@/lib/youtube/thumbnail";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var YT: any;
  var onYouTubeIframeAPIReady: () => void;
}

interface YouTubePlayerProps {
  videoId: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReady?: (player: any) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

let apiPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });

  return apiPromise;
}

function applyCoverFill(wrapper: HTMLDivElement) {
  const iframe = wrapper.querySelector("iframe") as HTMLIFrameElement | null;
  if (!iframe) return;

  const w = wrapper.clientWidth;
  const h = wrapper.clientHeight;
  if (w === 0 || h === 0) return;

  const videoRatio = 16 / 9;
  const iframeW = Math.max(w, h * videoRatio);
  const iframeH = Math.max(h, w / videoRatio);

  iframe.style.position = "absolute";
  iframe.style.top = "50%";
  iframe.style.left = "50%";
  iframe.style.width = `${iframeW}px`;
  iframe.style.height = `${iframeH}px`;
  iframe.style.border = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.transform = "translate(-50%, -50%)";
}

export interface YouTubePlayerHandle {
  playVideo: () => void;
  pauseVideo: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seekTo: (seconds: number, allowSeekAhead?: any) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
}

export function YouTubePlayer({
  videoId,
  poster,
  autoplay = false,
  muted = true,
  loop = true,
  className = "",
  onReady,
  onPlay,
  onPause,
}: YouTubePlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerTargetRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [posterIndex, setPosterIndex] = useState(0);

  const autoplayRef = useRef(autoplay);
  const onReadyRef = useRef(onReady);
  const onPlayRef = useRef(onPlay);
  const onPauseRef = useRef(onPause);

  useEffect(() => {
    autoplayRef.current = autoplay;
    onReadyRef.current = onReady;
    onPlayRef.current = onPlay;
    onPauseRef.current = onPause;
  });

  const createPlayer = useCallback(async () => {
    if (!playerTargetRef.current || playerRef.current) return;
    await loadYouTubeAPI();
    if (!playerTargetRef.current || playerRef.current || !window.YT?.Player) return;

    const playerId = `yt-player-${videoId}-${Date.now()}`;
    playerTargetRef.current.id = playerId;

    const initialAutoplay = autoplayRef.current ? 1 : 0;

    playerRef.current = new window.YT.Player(playerId, {
      videoId,
      playerVars: {
        autoplay: initialAutoplay,
        mute: muted ? 1 : 0,
        loop: loop ? 1 : 0,
        playlist: loop ? videoId : undefined,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        origin: typeof window !== "undefined" ? window.location.origin : "",
      },
      events: {
        onReady: () => {
          if (wrapperRef.current) applyCoverFill(wrapperRef.current);
          onReadyRef.current?.(playerRef.current);
          if (autoplayRef.current) {
            if (posterRef.current) posterRef.current.style.opacity = "0";
            playerRef.current.playVideo?.();
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStateChange: (event: any) => {
          const state = event.data;
          if (state === window.YT?.PlayerState?.PLAYING) {
            if (posterRef.current) posterRef.current.style.opacity = "0";
            onPlayRef.current?.();
          } else if (state === window.YT?.PlayerState?.PAUSED) {
            onPauseRef.current?.();
          } else if (state === window.YT?.PlayerState?.ENDED) {
            if (loop) event.target?.playVideo?.();
          }
        },
      },
    });
  }, [videoId, muted, loop]);

  useEffect(() => {
    createPlayer();
    return () => {
      if (playerRef.current) { playerRef.current.destroy?.(); playerRef.current = null; }
    };
  }, [createPlayer]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || typeof player.getPlayerState !== "function") return;

    if (autoplay) {
      player.mute?.();
      player.seekTo?.(0, true);
      if (posterRef.current) posterRef.current.style.opacity = "0";
      player.playVideo?.();
    } else {
      player.pauseVideo?.();
      player.seekTo?.(0, true);
      if (posterRef.current) posterRef.current.style.opacity = "1";
    }
  }, [autoplay, poster]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => applyCoverFill(wrapper));
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden bg-black ${className}`}>
      <div ref={playerTargetRef} className="absolute inset-0" />
      {poster && (
        <img
          ref={posterRef}
          src={youtubeThumbnailUrl(videoId, posterIndex)}
          onError={() => setPosterIndex((current) => Math.min(current + 1, 2))}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-200 ${autoplay ? "opacity-0" : "opacity-100"}`}
        />
      )}
    </div>
  );
}

export type { YouTubePlayerProps };