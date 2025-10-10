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
    <span className={className}>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
      {label}
    </span>
  );
}

export default StatusBadge;
