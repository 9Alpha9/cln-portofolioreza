"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface YouTubePlayerProps {
  videoId?: string;
  videoUrl?: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export interface YouTubePlayerHandle {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
}

export const YouTubePlayer = forwardRef<YouTubePlayerHandle, YouTubePlayerProps>(
  (
    {
      videoUrl,
      poster,
      autoplay = false,
      muted = true,
      loop = true,
      className = "",
      onReady,
      onPlay,
      onPause,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      playVideo: () => {
        videoRef.current?.play().catch(() => {});
      },
      pauseVideo: () => {
        videoRef.current?.pause();
      },
      seekTo: (seconds: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = seconds;
        }
      },
      mute: () => {
        if (videoRef.current) videoRef.current.muted = true;
      },
      unMute: () => {
        if (videoRef.current) videoRef.current.muted = false;
      },
      isMuted: () => {
        return videoRef.current?.muted ?? true;
      },
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handlePlay = () => onPlay?.();
      const handlePause = () => onPause?.();

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }, [onPlay, onPause]);

    useEffect(() => {
      if (autoplay) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    }, [autoplay]);

    if (!videoUrl) {
      return (
        <div className={`relative overflow-hidden bg-black ${className}`}>
          {poster ? (
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden bg-black ${className}`}>
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline
          onLoadedData={() => onReady?.()}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
);

YouTubePlayer.displayName = "YouTubePlayer";

export type { YouTubePlayerProps };