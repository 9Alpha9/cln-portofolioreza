interface TextMarqueeProps {
  text?: string;
}

export function TextMarquee({
  text = "GAMING GEAR REVIEW • DIUJI DALAM SESI NYATA • TANPA BASA-BASI • ",
}: TextMarqueeProps) {
  return (
    <div className="overflow-hidden border-y border-border/60 bg-surface py-4 sm:py-5">
      <p className="sr-only">{text}</p>
      <div className="marquee-track flex w-max will-change-transform motion-reduce:transform-none motion-reduce:animate-none" aria-hidden="true">
        <div className="flex shrink-0 items-center">
          <span className="whitespace-nowrap font-mono text-xs font-semibold tracking-[0.22em] text-muted sm:text-sm">
            {text}{text}
          </span>
        </div>
        <div className="flex shrink-0 items-center">
          <span className="whitespace-nowrap font-mono text-xs font-semibold tracking-[0.22em] text-muted sm:text-sm">
            {text}{text}
          </span>
        </div>
      </div>
    </div>
  );
}
