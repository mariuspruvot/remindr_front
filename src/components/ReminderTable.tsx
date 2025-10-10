/**
 * Reminders table using shadcn Table component
 * Clean, professional display with proper semantics
 */

import { Link2, Calendar, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatReminderDate } from "../utils/reminder-helpers";
import StatusBadge from "./StatusBadge";
import OutputChannels from "./OutputChannels";
import type { Reminder } from "../types/reminder.types";

interface ReminderTableProps {
  reminders: Reminder[];
  onEdit: (reminder: Reminder) => void;
  onDelete: (reminderId: string) => void;
}

export default function ReminderTable({
  reminders,
  onEdit,
  onDelete,
}: ReminderTableProps) {
  if (reminders.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No reminders yet. Create your first one!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Message</TableHead>
            <TableHead className="hidden sm:table-cell">Link</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Channels</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reminders.map((reminder) => (
            <TableRow key={reminder.id}>
              {/* Message */}
              <TableCell className="font-medium max-w-[200px] sm:max-w-[300px]">
                <div className="truncate">{reminder.reminder_text}</div>
              </TableCell>

              {/* Link */}
              <TableCell className="hidden sm:table-cell">
                {reminder.target_url ? (
                  <a
                    href={reminder.target_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Link2 className="h-3 w-3" />
                    Link
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              {/* Scheduled Date */}
              <TableCell className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 hidden sm:inline" />
                  <span>{formatReminderDate(reminder.scheduled_at)}</span>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge sent={reminder.sent} />
              </TableCell>

              {/* Channels */}
              <TableCell className="hidden md:table-cell">
                <OutputChannels outputs={reminder.outputs} variant="compact" />
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    onClick={() => onEdit(reminder)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    onClick={() => onDelete(reminder.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
