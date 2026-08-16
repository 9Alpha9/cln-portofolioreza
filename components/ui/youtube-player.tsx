"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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

let apiLoaded = false;
let apiLoading = false;

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (apiLoaded) {
      resolve();
      return;
    }

    if (apiLoading) {
      const check = setInterval(() => {
        if (apiLoaded) {
          clearInterval(check);
          resolve();
        }
      }, 100);
      return;
    }

    apiLoading = true;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true;
      resolve();
    };
  });
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
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [, setIsReady] = useState(false);
  const [, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(!autoplay);

  const createPlayer = useCallback(async () => {
    if (!containerRef.current || playerRef.current) return;

    await loadYouTubeAPI();

    if (!containerRef.current) return;

    const playerId = `yt-player-${videoId}-${Date.now()}`;
    containerRef.current.id = playerId;

    playerRef.current = new window.YT.Player(playerId, {
      videoId,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
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
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          setIsReady(true);
          onReady?.(playerRef.current);
          if (autoplay) {
            setIsPlaying(true);
            setShowPoster(false);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStateChange: (event: any) => {
          const state = event.data;
          if (state === window.YT?.PlayerState?.PLAYING) {
            setIsPlaying(true);
            setShowPoster(false);
            onPlay?.();
          } else if (state === window.YT?.PlayerState?.PAUSED) {
            setIsPlaying(false);
            onPause?.();
          } else if (state === window.YT?.PlayerState?.ENDED) {
            setIsPlaying(false);
            if (loop) {
              event.target?.playVideo?.();
            }
          }
        },
      },
    });
  }, [videoId, autoplay, muted, loop, onReady, onPlay, onPause]);

  useEffect(() => {
    createPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy?.();
        playerRef.current = null;
      }
    };
  }, [createPlayer]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={containerRef} className="absolute inset-0" />
      {poster && showPoster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        />
      )}
    </div>
  );
}

export type { YouTubePlayerProps };

export function useYouTubePlayer() {
  return {
    loadAPI: loadYouTubeAPI,
  };
}
