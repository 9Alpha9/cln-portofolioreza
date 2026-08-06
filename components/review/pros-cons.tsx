import { cn } from "@/lib/utils";

interface ProsConsProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export function ProsCons({ pros, cons, className }: ProsConsProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      <div>
        <h3 className="text-lg font-semibold text-success mb-3">Kelebihan</h3>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-success"
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
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-danger mb-3">Kekurangan</h3>
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
