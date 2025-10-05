/**
 * Modal for creating and editing reminders
 * Handles both create and edit modes with a single component
 *
 * REFACTORED: Extracted business logic to useReminderForm hook
 * Now focused on UI rendering only (~180 lines vs 373 before)
 */

import { X, Calendar, Link2, Loader2, AlertCircle } from "lucide-react";
import { getMinScheduleTime } from "../utils/dateHelpers";
import { useReminderForm } from "../hooks/useReminderForm";
import QuickScheduleButtons from "./reminder/QuickScheduleButtons";
import ChannelSelector from "./reminder/ChannelSelector";
import type { Reminder, Output } from "../types/reminder.types";

interface ReminderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "create" | "edit";
  reminder?: Reminder; // For edit mode
  availableChannels: Output[]; // List of user's channels
  onAddChannel: () => void; // Callback to open channel modal
}

function ReminderFormModal({
  isOpen,
  onClose,
  onSuccess,
  mode,
  reminder,
  availableChannels,
  onAddChannel,
}: ReminderFormModalProps) {
  // Use custom hook for all form logic
  const form = useReminderForm({
    mode,
    reminder,
    isOpen,
    onSuccess,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300 sticky top-0 bg-base-100 z-10">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create Reminder" : "Edit Reminder"}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={form.handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Error Message */}
            {form.error && (
              <div className="alert alert-error">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{form.error}</span>
              </div>
            )}

            {/* Reminder Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Reminder Message <span className="text-error">*</span>
              </label>
              <textarea
                id="message"
                value={form.reminderText}
                onChange={(e) => form.setReminderText(e.target.value)}
                placeholder="Don't forget to..."
                className="textarea textarea-bordered w-full h-24 resize-none"
                maxLength={500}
                required
              />
              <p className="text-xs text-base-content/60 mt-1 text-right">
                {form.reminderText.length}/500
              </p>
            </div>

            {/* Target URL (Optional) */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2">
                Link (Optional)
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                <input
                  id="url"
                  type="url"
                  value={form.targetUrl}
                  onChange={(e) => form.setTargetUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* Scheduled Date & Time */}
            <div>
              <label
                htmlFor="datetime"
                className="block text-sm font-medium mb-2"
              >
                When to send <span className="text-error">*</span>
              </label>

              {/* Quick schedule buttons - extracted to component */}
              <div className="mb-3">
                <QuickScheduleButtons
                  onSchedule={form.handleQuickSchedule}
                  disabled={form.isLoading}
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                <input
                  id="datetime"
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) => form.setScheduledAt(e.target.value)}
                  min={getMinScheduleTime()}
                  className="input input-bordered w-full pl-10"
                  required
                />
              </div>
              <p className="text-xs text-base-content/60 mt-1">
                Schedule for at least 1 minute in the future
              </p>
            </div>

            {/* Channel Selection - extracted to component */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Send to <span className="text-error">*</span>
              </label>

              <ChannelSelector
                channels={availableChannels}
                selectedIds={form.selectedOutputIds}
                onToggle={form.toggleChannel}
                onAddChannel={onAddChannel}
                disabled={form.isLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-base-300">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost flex-1"
                disabled={form.isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={
                  form.isLoading ||
                  form.reminderText.trim().length === 0 ||
                  !form.scheduledAt ||
                  form.selectedOutputIds.length === 0
                }
              >
                {form.isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : mode === "create" ? (
                  "Create Reminder"
                ) : (
                  "Update Reminder"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReminderFormModal;
