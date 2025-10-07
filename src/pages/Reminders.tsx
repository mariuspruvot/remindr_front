/**
 * Reminders Page - Full list view
 *
 * REFACTORED:
 * - Uses useModals() instead of prop callbacks
 * - Uses PageHeader, LoadingState, ErrorState components
 * - Much cleaner code structure
 */

import { Plus } from "lucide-react";
import { PageHeader, LoadingState, ErrorState } from "../components/common";
import ReminderTable from "../components/ReminderTable";
import { useReminders, useDeleteReminder } from "../hooks/useReminders";
import { useModals } from "../contexts/ModalContext";

function RemindersPage() {
  const { openReminderModal } = useModals();
  const { data: reminders, isLoading, error } = useReminders();
  const deleteReminder = useDeleteReminder();

  const handleDelete = async (reminderId: string) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      await deleteReminder.mutateAsync(reminderId);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="All Reminders"
        subtitle={`${reminders?.length || 0} total reminders`}
        action={
          <button
            onClick={() => openReminderModal()}
            className="btn bg-base-300 rounded-lg border-none hover:bg-neutral/30 shadow-xl hover:shadow-xl gap-2"
          >
            <Plus className="w-5 h-5" />
            New Reminder
          </button>
        }
      />

      {/* Loading State */}
      {isLoading && <LoadingState size="lg" />}

      {/* Error State */}
      {error && (
        <ErrorState message="Failed to load reminders. Please try again." />
      )}

      {/* Reminders Table */}
      {reminders && (
        <ReminderTable
          reminders={reminders}
          onEdit={openReminderModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default RemindersPage;
