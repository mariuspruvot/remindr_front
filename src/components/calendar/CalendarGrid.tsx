/**
 * Modern Calendar Grid Component
 * Professional monthly calendar view with reminder integration
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Reminder } from "../../types/reminder.types";

interface CalendarGridProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  reminders: Reminder[];
}

// Get days in month
const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Add empty cells for days before month starts
  const startDayOfWeek = firstDay.getDay();
  for (let i = 0; i < startDayOfWeek; i++) {
    const prevDate = new Date(year, month, -i);
    days.unshift(prevDate);
  }

  // Add all days in month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add empty cells for days after month ends
  const endDayOfWeek = lastDay.getDay();
  for (let i = 1; i < 7 - endDayOfWeek; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

// Check if two dates are the same day
const isSameDay = (date1: Date | null, date2: Date): boolean => {
  if (!date1) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Check if date is today
const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(today, date);
};

// Get reminders for a specific day
const getRemindersForDay = (date: Date, reminders: Reminder[]): Reminder[] => {
  return reminders.filter((reminder) => {
    const reminderDate = new Date(reminder.scheduled_at);
    return isSameDay(date, reminderDate);
  });
};

export default function CalendarGrid({
  currentDate,
  onDateChange,
  selectedDate,
  onDateSelect,
  reminders,
}: CalendarGridProps) {
  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    onDateChange(today);
    onDateSelect(today);
  };

  const currentMonth = currentDate.getMonth();

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-base-300 bg-gradient-to-r from-base-200/50 to-base-100">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevMonth}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-300"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-base-content min-w-[200px] text-center">
            {monthName}
          </h2>
          <button
            onClick={handleNextMonth}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-300"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={handleToday}
          className="btn btn-primary btn-sm shadow-md hover:shadow-lg transition-all"
        >
          Today
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-base-200/30">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-3 text-sm font-semibold text-base-content/60 border-b border-base-300"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayReminders = getRemindersForDay(day, reminders);
          const isCurrentMonth = day.getMonth() === currentMonth;
          const isSelected = isSameDay(selectedDate, day);
          const isTodayDate = isToday(day);

          return (
            <motion.button
              key={index}
              onClick={() => onDateSelect(day)}
              className={`
                relative min-h-[100px] p-2 border-b border-r border-base-300
                transition-all duration-200
                ${!isCurrentMonth ? "bg-base-200/20 text-base-content/30" : ""}
                ${isSelected ? "bg-primary/10 ring-2 ring-primary ring-inset" : "hover:bg-base-200/50"}
                ${isTodayDate && !isSelected ? "bg-info/5 ring-1 ring-info ring-inset" : ""}
              `}
              whileHover={{ scale: isCurrentMonth ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Date number */}
              <div className="flex items-start justify-between mb-1">
                <span
                  className={`
                    text-sm font-medium
                    ${isTodayDate ? "text-info font-bold" : ""}
                    ${!isCurrentMonth ? "text-base-content/30" : "text-base-content"}
                    ${isSelected ? "text-primary font-bold" : ""}
                  `}
                >
                  {day.getDate()}
                </span>
                {dayReminders.length > 0 && (
                  <span className="badge badge-xs badge-primary">
                    {dayReminders.length}
                  </span>
                )}
              </div>

              {/* Reminder indicators */}
              {isCurrentMonth && dayReminders.length > 0 && (
                <div className="space-y-1">
                  {dayReminders.slice(0, 2).map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`
                        text-xs px-2 py-1 rounded-md truncate text-left font-medium
                        ${reminder.sent ? "badge badge-success badge-sm" : "badge badge-info badge-sm"}
                      `}
                      title={reminder.reminder_text}
                    >
                      {reminder.reminder_text}
                    </div>
                  ))}
                  {dayReminders.length > 2 && (
                    <div className="badge badge-ghost badge-xs ml-2">
                      +{dayReminders.length - 2}
                    </div>
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

