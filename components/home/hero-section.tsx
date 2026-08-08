"use client";

import {useRef, useEffect, useState} from "react";
import Link from "next/link";
import {gsap} from "@/lib/gsap";
import {getAllReviews} from "@/lib/reviews";

const VIDEO_SOURCES = [
  "/videos/vid-1.mp4",
  "/videos/vid-2.mp4",
  "/videos/vid-3.mp4",
];

const OFFSET_STYLE: Record<
  number,
  {x: number; scale: number; rotate: number; opacity: number; z: number}
> = {
  0: {x: 0, scale: 1, rotate: 0, opacity: 1, z: 3},
  1: {x: -28, scale: 0.92, rotate: -6, opacity: 1, z: 2},
  2: {x: -66, scale: 0.82, rotate: -9, opacity: 1, z: 1},
};

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const reviews = getAllReviews().slice(0, 3);
  const total = reviews.length;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (activeIndex === i) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-title]", {
        yPercent: 105,
        opacity: 0,
        duration: 1.25,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from("[data-hero-bullet]", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.5,
      });
      gsap.from("[data-hero-right]", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.6,
      });
      gsap.from("[data-hero-marquee]", {
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Custom Cursor & Drag Logic via GSAP
  useEffect(() => {
    const cursor = customCursorRef.current;
    const container = stackContainerRef.current;
    if (!cursor || !container) return;

    gsap.set(cursor, {opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50});

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };
    const onMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)",
      });
      document.body.style.cursor = "none";
    };
    const onMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in",
      });
      document.body.style.cursor = "auto";
      isDragging.current = false;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      container.setPointerCapture(e.pointerId);
      if (e.pointerType === "mouse") {
        gsap.to(cursor, {scale: 0.8, duration: 0.2});
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!e.isPrimary || !isDragging.current) return;
      isDragging.current = false;
      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
      if (e.pointerType === "mouse") {
        gsap.to(cursor, {scale: 1, duration: 0.2, ease: "back.out(1.5)"});
      }
      const diffX = e.clientX - dragStart.current.x;
      const diffY = e.clientY - dragStart.current.y;
      if (Math.abs(diffX) < 40 || Math.abs(diffX) <= Math.abs(diffY)) return;
      setActiveIndex((prev) =>
        diffX > 0 ? (prev - 1 + total) % total : (prev + 1) % total
      );
    };
    const onPointerCancel = () => {
      isDragging.current = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      document.body.style.cursor = "auto";
    };
  }, [total]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:py-0 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Left Column: Title + Bullets ── */}
          <div className="lg:col-span-4 z-10">
            <h1
              data-hero-title
              className="font-heading text-5xl sm:text-6xl lg:text-6xl font-bold leading-[1.2] tracking-tight"
            >
              Review yang
              <br />
              <span className="text-muted">bikin kamu</span>
              <br />
              paham.
            </h1>

            <div className="mt-10 space-y-3">
              {[
                "KEYBOARD & MOUSE",
                "HEADSET & MICROPHONE",
                "MONITOR & CONTROLLER",
              ].map((item) => (
                <div
                  key={item}
                  data-hero-bullet
                  className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-muted"
                >
                  <span className="text-foreground text-lg">*</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ── Center Column: Horizontal Stacked Phone Cards ── */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Curved text marquee */}
            <div
              data-hero-marquee
              className="absolute inset-0 pointer-events-none z-0"
            >
              <svg
                viewBox="0 0 600 600"
                className="w-full h-full opacity-25"
                style={{transform: "rotate(-10deg)"}}
              >
                <defs>
                  <path
                    id="curve"
                    d="M 300 300 m -250 0 a 250 250 0 1 1 500 0 a 250 250 0 1 1 -500 0"
                    fill="none"
                  />
                </defs>
                <text className="fill-muted text-xs tracking-[0.3em] uppercase font-mono">
                  <textPath href="#curve" startOffset="0%">
                    KEYBOARD REVIEW • MOUSE REVIEW • HEADSET REVIEW • MONITOR
                    REVIEW •{" "}
                    <animate
                      attributeName="startOffset"
                      from="0%"
                      to="100%"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Card Stack (no click, swipe-only) */}
            <div
              ref={stackContainerRef}
              className="relative w-60 sm:w-96 h-[420px] sm:h-[680px] select-none touch-pan-y"
            >
              {reviews.map((review, i) => {
                const offset = (((i - activeIndex) % total) + total) % total;
                const style = OFFSET_STYLE[offset];
                return (
                  <div
                    key={review.slug}
                    data-card
                    data-offset={offset}
                    className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      zIndex: style.z,
                      transform: `translateX(${style.x}px) scale(${style.scale}) rotate(${style.rotate}deg)`,
                      opacity: style.opacity,
                    }}
                  >
                    {/* Video (autoplay muted loop only when active) */}
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      className="w-full h-full object-cover pointer-events-none"
                       muted
                       loop
                       playsInline
                       poster={review.thumbnail?.src}
                       preload="metadata"
                       style={{width: "100%", height: "100%"}}
                    >
                      <source src={VIDEO_SOURCES[i]} type="video/mp4" />
                      <img
                        src={review.thumbnail?.src}
                        alt={review.thumbnail?.alt}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </video>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Info + CTA ── */}
          <div className="lg:col-span-3 z-10 space-y-10 flex flex-col justify-end h-full">
            <div
              data-hero-right
              className="bg-white rounded-xl p-4 shadow-sm border border-border flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <img
                  src={reviews[activeIndex]?.thumbnail.src}
                  alt={reviews[activeIndex]?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-muted">
                  REVIEW TERBARU
                </p>
                <p className="text-sm font-semibold mt-1 line-clamp-2 text-black">
                  {reviews[activeIndex]?.name}
                </p>
              </div>
            </div>

            <div data-hero-right>
              <p className="text-sm leading-relaxed text-muted">
                Gaming Gear Review membantu kamu menemukan gear terbaik dengan
                review jujur, benchmark detail, dan rekomendasi berdasarkan
                kebutuhan.
              </p>
            </div>

            <div data-hero-right className="flex items-center gap-3">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors"
              >
                Lihat Semua Review
              </Link>
              <Link
                href="/reviews"
                className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center hover:bg-muted/30 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Custom GSAP Swipe Cursor ── */}
      <div
        ref={customCursorRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
      >
        <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow-xl">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">
            Swipe
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
