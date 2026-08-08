import { cn } from "@/lib/utils";
import { StaggerReveal, StaggerItem } from "@/components/animation";

interface ProsConsProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export function ProsCons({ pros, cons, className }: ProsConsProps) {
  return (
    <StaggerReveal className={cn("grid gap-6 sm:grid-cols-2", className)} stagger={0.15}>
      <StaggerItem>
        <div className="arcade-card p-4">
          <h3 className="text-lg font-heading text-green mb-3">Kelebihan</h3>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      </StaggerItem>

      <StaggerItem>
        <div className="arcade-card p-4">
          <h3 className="text-lg font-heading text-danger mb-3">Kekurangan</h3>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-danger"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </StaggerItem>
    </StaggerReveal>
  );
}
