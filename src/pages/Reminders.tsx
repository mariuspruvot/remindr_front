/**
 * Reminders page - Full list view
 * Shows all reminders with filtering and actions
 */

import { Plus, Loader2 } from "lucide-react";
import ReminderTable from "../components/ReminderTable";
import { useReminders, useDeleteReminder } from "../hooks/useReminders";
import type { Reminder } from "../types/reminder.types";

interface RemindersPageProps {
  onEditReminder: (reminder: Reminder) => void;
  onNewReminder: () => void;
}

function RemindersPage({ onEditReminder, onNewReminder }: RemindersPageProps) {
  const { data: reminders, isLoading, error } = useReminders();
  const deleteReminder = useDeleteReminder();

  const handleDelete = async (reminderId: string) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      await deleteReminder.mutateAsync(reminderId);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-base-content mb-2">
            All Reminders
          </h1>
          <p className="text-base-content/60">
            {reminders?.length || 0} total reminders
          </p>
        </div>
        <button onClick={onNewReminder} className="btn btn-primary gap-2">
          <Plus className="w-5 h-5" />
          New Reminder
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>Failed to load reminders. Please try again.</span>
        </div>
      )}

      {/* Reminders Table */}
      {reminders && (
        <ReminderTable
          reminders={reminders}
          onEdit={onEditReminder}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default RemindersPage;
