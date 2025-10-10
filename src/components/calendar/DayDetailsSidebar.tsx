/**
 * Day Details Sidebar
 * Shows reminders for the selected day with actions
 */

import { Calendar, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OutputChannels from "../OutputChannels";
import StatusBadge from "../StatusBadge";
import type { Reminder } from "../../types/reminder.types";

interface DayDetailsSidebarProps {
  selectedDate: Date | null;
  reminders: Reminder[];
  onClose: () => void;
  onCreateReminder: (date: Date) => void;
  onEditReminder: (reminder: Reminder) => void;
  onDeleteReminder: (reminderId: string) => void;
}

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatSelectedDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return "Tomorrow";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export default function DayDetailsSidebar({
  selectedDate,
  reminders,
  onClose,
  onCreateReminder,
  onEditReminder,
  onDeleteReminder,
}: DayDetailsSidebarProps) {
  if (!selectedDate) return null;

  // Filter reminders for selected day
  const dayReminders = reminders.filter((reminder) => {
    const reminderDate = new Date(reminder.scheduled_at);
    return (
      reminderDate.getDate() === selectedDate.getDate() &&
      reminderDate.getMonth() === selectedDate.getMonth() &&
      reminderDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  // Sort by time
  const sortedReminders = [...dayReminders].sort((a, b) => {
    return new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime();
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-base-100 rounded-2xl border border-base-300 shadow-xl overflow-hidden h-full flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-base-300 bg-gradient-to-r from-base-200/50 to-base-100">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-base-content">
                  {formatSelectedDate(selectedDate)}
                </h3>
                <p className="text-sm text-base-content/60">
                  {sortedReminders.length}{" "}
                  {sortedReminders.length === 1 ? "reminder" : "reminders"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => onCreateReminder(selectedDate)}
            className="btn btn-primary btn-sm w-full gap-2 mt-3 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Reminder
          </button>
        </div>

        {/* Reminders list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sortedReminders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-base-200 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-base-content/30" />
              </div>
              <p className="text-base-content/60 text-sm mb-4">
                No reminders scheduled for this day
              </p>
              <button
                onClick={() => onCreateReminder(selectedDate)}
                className="btn btn-primary btn-sm gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                Create One
              </button>
            </div>
          ) : (
            sortedReminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="card-body p-4 space-y-3">
                  {/* Time and Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {formatTime(reminder.scheduled_at)}
                    </span>
                    <StatusBadge sent={reminder.sent} />
                  </div>

                  {/* Message */}
                  <p className="text-sm text-base-content font-medium">
                    {reminder.reminder_text}
                  </p>

                  {/* Link if exists */}
                  {reminder.target_url && (
                    <a
                      href={reminder.target_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline truncate block"
                    >
                      {reminder.target_url}
                    </a>
                  )}

                  {/* Channels */}
                  <div className="pt-2 border-t border-base-300">
                    <OutputChannels
                      outputs={reminder.outputs}
                      variant="compact"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditReminder(reminder)}
                      className="btn btn-xs btn-ghost flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this reminder?"
                          )
                        ) {
                          onDeleteReminder(reminder.id);
                        }
                      }}
                      className="btn btn-xs btn-ghost text-error flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

