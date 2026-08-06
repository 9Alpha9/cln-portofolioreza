import { ScoreBadge } from "./score-badge";
import { cn } from "@/lib/utils";

interface QuickVerdictProps {
  verdict: string;
  score?: number;
  pros: string[];
  cons: string[];
  className?: string;
}

export function QuickVerdict({
  verdict,
  score,
  pros,
  cons,
  className,
}: QuickVerdictProps) {
  return (
    <div className={cn("rounded-xl border border-border p-4", className)}>
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-lg font-semibold">Quick Verdict</h2>
        {score && <ScoreBadge score={score} />}
      </div>
      <p className="text-muted">{verdict}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-success mb-2">Kelebihan</h3>
          <ul className="space-y-1">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-danger mb-2">Kekurangan</h3>
          <ul className="space-y-1">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-danger"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
