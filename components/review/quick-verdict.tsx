import { ScoreBadge } from "./score-badge";
import { cn } from "@/lib/utils";
import { GsapReveal } from "@/components/animation";

interface QuickVerdictProps {
  verdict: string;
  score?: number;
  className?: string;
}

export function QuickVerdict({
  verdict,
  score,
  className,
}: QuickVerdictProps) {
  return (
    <GsapReveal>
      <div className={cn("arcade-card p-6", className)}>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-xl font-heading font-bold">Quick Verdict</h2>
          {score && <ScoreBadge score={score} />}
        </div>
        <p className="text-base leading-relaxed text-foreground/90">{verdict}</p>
      </div>
    </GsapReveal>
  );
}
