/**
 * Status badge component using shadcn Badge
 * Shows sent/scheduled status with proper semantic colors
 */

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

interface StatusBadgeProps {
  sent: boolean;
}

export default function StatusBadge({ sent }: StatusBadgeProps) {
  if (sent) {
    return (
      <Badge variant="default" className="gap-1">
        <CheckCircle2 className="h-3 w-3" />
        Sent
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="gap-1">
      <Clock className="h-3 w-3" />
      Scheduled
    </Badge>
  );
}
