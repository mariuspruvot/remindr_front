/**
 * Professional Calendar Page
 *
 * Features:
 * - Modern monthly calendar view with interactive grid
 * - Day details sidebar with reminders list
 * - Create reminders directly from calendar
 * - View and edit existing reminders
 * - Beautiful animations and responsive design
 * - Fully integrated with DaisyUI theme
 */

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader, LoadingState } from "../components/common";
import { CalendarGrid, DayDetailsSidebar } from "../components/calendar";
import { useReminders, useDeleteReminder } from "../hooks/useReminders";
import { useModals } from "../contexts/ModalContext";
import type { Reminder } from "../types/reminder.types";

function CalendarPage() {
  const { data: reminders = [], isLoading } = useReminders();
  const { openReminderModal } = useModals();
  const deleteReminder = useDeleteReminder();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleCreateReminder = (date?: Date) => {
    const scheduledDate = date || selectedDate || new Date();
    
    // Set time to next hour
    scheduledDate.setHours(scheduledDate.getHours() + 1, 0, 0, 0);
    
    openReminderModal(undefined, scheduledDate.toISOString());
  };

  const handleEditReminder = (reminder: Reminder) => {
    openReminderModal(reminder);
  };

  const handleDeleteReminder = async (reminderId: string) => {
    await deleteReminder.mutateAsync(reminderId);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Calendar"
          subtitle="Schedule and manage your reminders"
        />
        <LoadingState size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Calendar"
        subtitle={`${reminders.length} ${reminders.length === 1 ? "reminder" : "reminders"} scheduled`}
        action={
          <button
            onClick={() => handleCreateReminder()}
            className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">New Reminder</span>
          </button>
        }
      />

      {/* Calendar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar Grid */}
        <div className="lg:col-span-2">
          <CalendarGrid
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            reminders={reminders}
          />
        </div>

        {/* Day Details Sidebar */}
        <div className="lg:col-span-1 hidden lg:block">
          {selectedDate && (
            <div className="sticky top-6">
              <DayDetailsSidebar
                selectedDate={selectedDate}
                reminders={reminders}
                onClose={() => setSelectedDate(null)}
                onCreateReminder={handleCreateReminder}
                onEditReminder={handleEditReminder}
                onDeleteReminder={handleDeleteReminder}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Day Details - Show as modal on small screens */}
      {selectedDate && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg max-h-[80vh] overflow-hidden">
            <DayDetailsSidebar
              selectedDate={selectedDate}
              reminders={reminders}
              onClose={() => setSelectedDate(null)}
              onCreateReminder={handleCreateReminder}
              onEditReminder={handleEditReminder}
              onDeleteReminder={handleDeleteReminder}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
