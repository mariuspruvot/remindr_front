/**
 * Reusable status badge component for reminders
 * Displays sent/scheduled status with consistent styling
 */

import { getStatusConfig } from "../utils/reminder-helpers";

interface StatusBadgeProps {
  sent: boolean;
}

function StatusBadge({ sent }: StatusBadgeProps) {
  const { label, className } = getStatusConfig(sent);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
