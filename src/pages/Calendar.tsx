/**
 * Minimal Calendar Page - Clean and simple calendar view
 *
 * Features:
 * - Minimal design with clean interface
 * - Simple month view focus
 * - Clean typography and spacing
 * - Subtle interactions
 */

import { useState, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { PageHeader } from "../components/common";
import { useReminders } from "../hooks/useReminders";
import { useModals } from "../contexts/ModalContext";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configure moment localizer
const localizer = momentLocalizer(moment);

// Minimal toolbar component
const MinimalToolbar = ({ label, onNavigate }: any) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate("PREV")}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-lg font-medium text-base-content">{label}</h2>
        <button
          onClick={() => onNavigate("NEXT")}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Minimal event component
const MinimalEvent = ({ event }: any) => {
  return (
    <div className="text-xs font-medium truncate text-white">{event.title}</div>
  );
};

function CalendarPage() {
  const { data: reminders = [], isLoading } = useReminders();
  const { openReminderModal } = useModals();
  const [date, setDate] = useState(new Date());

  // Transform reminders into calendar events
  const events = useMemo(() => {
    return reminders.map((reminder) => ({
      id: reminder.id,
      title: reminder.title,
      start: new Date(reminder.scheduled_for),
      end: new Date(new Date(reminder.scheduled_for).getTime() + 30 * 60000),
      sent: reminder.sent,
      resource: reminder,
    }));
  }, [reminders]);

  // Handle event selection
  const handleSelectEvent = (event: any) => {
    openReminderModal(event.resource);
  };

  // Handle date/time selection for new events
  const handleSelectSlot = (slotInfo: any) => {
    const newReminder = {
      scheduled_for: slotInfo.start.toISOString(),
    };
    openReminderModal(newReminder);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <PageHeader title="Calendar" subtitle="View your reminders" />
        <div className="flex items-center justify-center h-96">
          <div className="loading loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageHeader title="Calendar" subtitle="View your reminders" />

      <div className="card-elevated p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "600px" }}
          view={Views.MONTH}
          date={date}
          onNavigate={setDate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          components={{
            toolbar: MinimalToolbar,
            event: MinimalEvent,
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.sent ? "#059669" : "#2563eb",
              borderRadius: "4px",
              border: "none",
              color: "white",
              fontSize: "12px",
              padding: "2px 6px",
            },
          })}
          className="minimal-calendar"
        />
      </div>
    </div>
  );
}

export default CalendarPage;
