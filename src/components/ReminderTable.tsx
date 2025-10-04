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
}

function ReminderTable({ reminders }: ReminderTableProps) {
  return (
    <div className="border border-base-300 rounded-xl bg-base-100 overflow-hidden">
      {/* Table wrapper with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="table table-hover">
          <thead>
            <tr className="border-b border-base-300">
              <th className="bg-base-100">Message</th>
              <th className="bg-base-100">Link</th>
              <th className="bg-base-100">Scheduled</th>
              <th className="bg-base-100">Status</th>
              <th className="bg-base-100">Channels</th>
              <th className="bg-base-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.id} className="hover:bg-base-200/50">
                {/* Message */}
                <td className="font-medium text-base-content min-w-[200px] max-w-[300px]">
                  <div className="truncate">{reminder.reminder_text}</div>
                </td>

                {/* Link */}
                <td className="min-w-[100px]">
                  {reminder.target_url ? (
                    <a
                      href={reminder.target_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      Link
                    </a>
                  ) : (
                    <span className="text-base-content/40 text-sm">—</span>
                  )}
                </td>

                {/* Scheduled Date */}
                <td className="text-sm text-base-content/70 min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatReminderDate(reminder.scheduled_at)}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="min-w-[100px]">
                  <StatusBadge sent={reminder.sent} />
                </td>

                {/* Channels */}
                <td className="min-w-[150px]">
                  <OutputChannels
                    outputs={reminder.outputs}
                    variant="compact"
                  />
                </td>

                {/* Actions */}
                <td className="text-right min-w-[100px]">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="btn btn-ghost btn-sm btn-square"
                      aria-label="Edit reminder"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                      aria-label="Delete reminder"
                    >
                      <Trash2 className="w-4 h-4" />
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
