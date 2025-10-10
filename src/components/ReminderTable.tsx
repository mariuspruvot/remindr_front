/**
 * Table component for displaying a list of reminders
 * Provides a compact, scannable view with actions
 */

import { Link2, Calendar, Pencil, Trash2 } from "lucide-react";
import { formatReminderDate } from "../utils/reminder-helpers";
import StatusBadge from "./StatusBadge";
import OutputChannels from "./OutputChannels";
import type { Reminder } from "../types/reminder.types";

interface ReminderTableProps {
  reminders: Reminder[];
  onEdit: (reminder: Reminder) => void;
  onDelete: (reminderId: string) => void;
}

function ReminderTable({ reminders, onEdit, onDelete }: ReminderTableProps) {
  return (
    <div className="border border-base-300 rounded-xl bg-base-100 shadow-lg overflow-hidden">
      {/* Table wrapper with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="table table-hover table-sm sm:table-md">
          <thead>
            <tr className="border-b border-base-300 text-xs sm:text-sm">
              <th className="bg-base-100">Message</th>
              <th className="bg-base-100 hidden sm:table-cell">Link</th>
              <th className="bg-base-100">Scheduled</th>
              <th className="bg-base-100">Status</th>
              <th className="bg-base-100 hidden md:table-cell">Channels</th>
              <th className="bg-base-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.id} className="hover:bg-base-200/50">
                {/* Message */}
                <td className="font-medium text-base-content min-w-[150px] sm:min-w-[200px] max-w-[200px] sm:max-w-[300px]">
                  <div className="truncate text-xs sm:text-sm">
                    {reminder.reminder_text}
                  </div>
                </td>

                {/* Link - Hidden on mobile */}
                <td className="min-w-[100px] hidden sm:table-cell">
                  {reminder.target_url ? (
                    <a
                      href={reminder.target_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs sm:text-sm"
                    >
                      <Link2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Link
                    </a>
                  ) : (
                    <span className="text-base-content/40 text-xs sm:text-sm">
                      —
                    </span>
                  )}
                </td>

                {/* Scheduled Date */}
                <td className="text-xs sm:text-sm text-base-content/70 min-w-[120px] sm:min-w-[150px]">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 hidden xs:block" />
                    <span>{formatReminderDate(reminder.scheduled_at)}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="min-w-[80px] sm:min-w-[100px]">
                  <StatusBadge sent={reminder.sent} />
                </td>

                {/* Channels - Hidden on mobile */}
                <td className="min-w-[150px] hidden md:table-cell">
                  <OutputChannels
                    outputs={reminder.outputs}
                    variant="compact"
                  />
                </td>

                {/* Actions */}
                <td className="text-right min-w-[80px] sm:min-w-[100px]">
                  <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                    <button
                      onClick={() => onEdit(reminder)}
                      className="btn btn-ghost btn-xs sm:btn-sm btn-square"
                      aria-label="Edit reminder"
                    >
                      <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(reminder.id)}
                      className="btn btn-ghost btn-xs sm:btn-sm btn-square text-error hover:bg-error/10"
                      aria-label="Delete reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {reminders.length === 0 && (
        <div className="text-center py-12 text-base-content/60">
          <p>No reminders yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}

export default ReminderTable;
