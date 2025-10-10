/**
 * Reminders Page - All reminders with clean table
 * Minimal and focused
 */

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, LoadingState } from "../components/common";
import ReminderTable from "../components/ReminderTable";
import { useReminders, useDeleteReminder } from "../hooks/useReminders";
import { useModals } from "../contexts/ModalContext";

function RemindersPage() {
  const { openReminderModal } = useModals();
  const { data: reminders = [], isLoading } = useReminders();
  const deleteReminder = useDeleteReminder();

  const handleDelete = async (reminderId: string) => {
    if (window.confirm("Delete this reminder?")) {
      await deleteReminder.mutateAsync(reminderId);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="All reminders"
        subtitle={`${reminders.length} total`}
        action={
          <Button onClick={() => openReminderModal()} size="sm">
            <Plus className="h-4 w-4" />
            New reminder
          </Button>
        }
      />

      {isLoading ? (
        <LoadingState size="lg" />
      ) : (
        <ReminderTable
          reminders={reminders}
          onEdit={(reminder) => openReminderModal(reminder)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default RemindersPage;
