/**
 * Table component for displaying a list of reminders
 * Provides a compact, scannable view with actions
 */

import { Link2, Calendar, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
      {/* Table wrapper with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-xs sm:text-sm">
              <th className="text-left font-medium p-4">Message</th>
              <th className="text-left font-medium p-4 hidden sm:table-cell">Link</th>
              <th className="text-left font-medium p-4">Scheduled</th>
              <th className="text-left font-medium p-4">Status</th>
              <th className="text-left font-medium p-4 hidden md:table-cell">Channels</th>
              <th className="text-right font-medium p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.id} className="border-b hover:bg-muted/50 transition-colors">
                {/* Message */}
                <td className="p-4 font-medium min-w-[150px] sm:min-w-[200px] max-w-[200px] sm:max-w-[300px]">
                  <div className="truncate text-xs sm:text-sm">
                    {reminder.reminder_text}
                  </div>
                </td>

                {/* Link - Hidden on mobile */}
                <td className="p-4 min-w-[100px] hidden sm:table-cell">
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
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      —
                    </span>
                  )}
                </td>

                {/* Scheduled Date */}
                <td className="p-4 text-xs sm:text-sm text-muted-foreground min-w-[120px] sm:min-w-[150px]">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 hidden xs:block" />
                    <span>{formatReminderDate(reminder.scheduled_at)}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="p-4 min-w-[80px] sm:min-w-[100px]">
                  <StatusBadge sent={reminder.sent} />
                </td>

                {/* Channels - Hidden on mobile */}
                <td className="p-4 min-w-[150px] hidden md:table-cell">
                  <OutputChannels
                    outputs={reminder.outputs}
                    variant="compact"
                  />
                </td>

                {/* Actions */}
                <td className="p-4 text-right min-w-[80px] sm:min-w-[100px]">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      onClick={() => onEdit(reminder)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Edit reminder"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => onDelete(reminder.id)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      aria-label="Delete reminder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {reminders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No reminders yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}

export default ReminderTable;
