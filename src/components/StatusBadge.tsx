/**
 * Reusable status badge component for reminders
 * Displays sent/scheduled status with consistent styling
 */

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  sent: boolean;
}

function StatusBadge({ sent }: StatusBadgeProps) {
  return (
    <Badge variant={sent ? "default" : "secondary"} className="gap-1.5">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
      {sent ? "Sent" : "Scheduled"}
    </Badge>
  );
}

export default StatusBadge;
