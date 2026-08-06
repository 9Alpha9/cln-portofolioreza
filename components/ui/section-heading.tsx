import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  description?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export function SectionHeading({
  children,
  description,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-6", className)}>
      <Tag className="text-2xl font-bold tracking-tight sm:text-3xl">
        {children}
      </Tag>
      {description && (
        <p className="mt-2 text-muted">{description}</p>
      )}
    </div>
  );
}
