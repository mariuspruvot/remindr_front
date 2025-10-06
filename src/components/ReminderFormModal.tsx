/**
 * ReminderFormModal - Modal for creating and editing reminders
 * 
 * REFACTORED: Now uses ModalContext and generic Modal component
 * 
 * Changes:
 * - Uses useModals() to get state/actions (no props needed)
 * - Uses generic <Modal> component (eliminates 60 lines of duplicate code)
 * - Business logic still in useReminderForm hook (separation of concerns)
 * 
 * Result: From ~210 lines to ~130 lines, cleaner and more maintainable
 */

import { Calendar, Link2, Loader2, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "./common/Modal";
import { useModals } from "../contexts/ModalContext";
import { useOutputs } from "../hooks/useOutputs";
import { useReminderForm } from "../hooks/useReminderForm";
import { getMinScheduleTime } from "../utils/dateHelpers";
import QuickScheduleButtons from "./reminder/QuickScheduleButtons";
import ChannelSelector from "./reminder/ChannelSelector";

function ReminderFormModal() {
  const queryClient = useQueryClient();
  const { modals, closeReminderModal, openChannelModal } = useModals();
  const { reminderModal } = modals;
  const { data: availableChannels = [] } = useOutputs();

  // Determine mode based on whether we're editing
  const mode = reminderModal.reminder ? "edit" : "create";

  // Custom hook for form logic
  const form = useReminderForm({
    mode,
    reminder: reminderModal.reminder,
    isOpen: reminderModal.isOpen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onClose: closeReminderModal,
  });

  return (
    <Modal
      isOpen={reminderModal.isOpen}
      onClose={closeReminderModal}
      title={mode === "create" ? "Create Reminder" : "Edit Reminder"}
      maxWidth="lg"
    >
      <form onSubmit={form.handleSubmit} className="space-y-6">
        {/* Error Message */}
        {form.error && (
          <div className="alert alert-error">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{form.error}</span>
          </div>
        )}

        {/* Reminder Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
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
          <label htmlFor="datetime" className="block text-sm font-medium mb-2">
            When to send <span className="text-error">*</span>
          </label>

          {/* Quick schedule buttons */}
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

        {/* Channel Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Send to <span className="text-error">*</span>
          </label>

          <ChannelSelector
            channels={availableChannels}
            selectedIds={form.selectedOutputIds}
            onToggle={form.toggleChannel}
            onAddChannel={() => openChannelModal()}
            disabled={form.isLoading}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-base-300">
          <button
            type="button"
            onClick={closeReminderModal}
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
      </form>
    </Modal>
  );
}

export default ReminderFormModal;
