/**
 * Card component for displaying a single reminder
 * Provides a detailed view with all reminder information
 */

import { Link2, Calendar } from "lucide-react";
import { formatReminderDate } from "../utils/reminder-helpers";
import StatusBadge from "./StatusBadge";
import OutputChannels from "./OutputChannels";
import type { Reminder } from "../types/reminder.types";

interface ReminderCardProps {
  reminder: Reminder;
}

function ReminderCard({ reminder }: ReminderCardProps) {
  return (
    <div className="border border-base-300 rounded-xl p-5 bg-base-100 hover:border-base-content/20 transition-all group">
      {/* Header with status */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-medium text-base-content leading-snug flex-1">
          {reminder.reminder_text}
        </h3>
        <StatusBadge sent={reminder.sent} />
      </div>

      {/* Scheduled time */}
      <div className="flex items-center gap-2 text-sm text-base-content/60 mb-4">
        <Calendar className="w-4 h-4" />
        <span>{formatReminderDate(reminder.scheduled_at, false)}</span>
      </div>

      {/* Output channels */}
      <OutputChannels outputs={reminder.outputs} variant="detailed" />

      {/* Link if exists */}
      {reminder.target_url && (
        <a
          href={reminder.target_url}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Link2 className="w-3.5 h-3.5" />
          View link
        </a>
      )}
    </div>
  );
}

export default ReminderCard;
