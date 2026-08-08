import { cn } from "@/lib/utils";
import type { SpecificationGroup as SpecificationGroupType } from "@/types";

interface SpecificationListProps {
  specifications: SpecificationGroupType[];
  className?: string;
}

export function SpecificationList({ specifications, className }: SpecificationListProps) {
  if (specifications.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-xl font-heading">Spesifikasi</h2>
      {specifications.map((group, groupIndex) => (
        <SpecificationGroup key={groupIndex} group={group} />
      ))}
    </div>
  );
}

function SpecificationGroup({ group }: { group: SpecificationGroupType }) {
  return (
    <div className="arcade-card p-4">
      <h3 className="text-sm font-medium text-muted mb-3">{group.title}</h3>
      <dl className="grid gap-2">
        {group.items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="flex items-baseline justify-between gap-4 py-2 border-b border-border last:border-0"
          >
            <dt className="text-sm text-muted">{item.label}</dt>
            <dd className="text-sm font-semibold text-right">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
