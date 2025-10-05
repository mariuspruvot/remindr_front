/**
 * Custom hook for reminder form state and logic
 *
 * Why this hook?
 * - Separates business logic from UI rendering
 * - Makes the form logic reusable and testable
 * - Reduces ReminderFormModal from 373 lines to ~150 lines
 * - Easier to test without rendering the full component
 *
 * Single Responsibility: Manage reminder form state and validation
 */

import { useState, useEffect } from "react";
import {
  isoToDateTimeLocal,
  getDefaultScheduleTime,
  toDateTimeLocalFormat,
  getFutureDate,
} from "../utils/dateHelpers";
import { useCreateReminder, useUpdateReminder } from "./useReminders";
import { getErrorMessage } from "../utils/errorHandler";
import type { Reminder, ReminderCreateRequest } from "../types/reminder.types";

interface UseReminderFormProps {
  mode: "create" | "edit";
  reminder?: Reminder;
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

interface UseReminderFormReturn {
  // Form state
  reminderText: string;
  setReminderText: (value: string) => void;
  targetUrl: string;
  setTargetUrl: (value: string) => void;
  scheduledAt: string;
  setScheduledAt: (value: string) => void;
  selectedOutputIds: string[];
  setSelectedOutputIds: (ids: string[]) => void;

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  toggleChannel: (outputId: string) => void;
  handleQuickSchedule: (minutesFromNow: number) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;

  // Validation
  validateForm: () => string | null;
}

/**
 * Hook to manage reminder form state and logic
 *
 * @example
 * function ReminderFormModal(props) {
 *   const form = useReminderForm({
 *     mode: props.mode,
 *     reminder: props.reminder,
 *     isOpen: props.isOpen,
 *     onSuccess: props.onSuccess,
 *     onClose: props.onClose,
 *   });
 *
 *   return (
 *     <form onSubmit={form.handleSubmit}>
 *       <input value={form.reminderText} onChange={e => form.setReminderText(e.target.value)} />
 *       {form.error && <div>{form.error}</div>}
 *     </form>
 *   );
 * }
 */
export const useReminderForm = ({
  mode,
  reminder,
  isOpen,
  onSuccess,
  onClose,
}: UseReminderFormProps): UseReminderFormReturn => {
  // React Query mutations
  const createMutation = useCreateReminder();
  const updateMutation = useUpdateReminder();

  // Form state
  const [reminderText, setReminderText] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [selectedOutputIds, setSelectedOutputIds] = useState<string[]>([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize form with reminder data in edit mode
   * Or set defaults in create mode
   * IMPORTANT: Reset on every open to prevent state pollution
   */
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && reminder) {
        // Load existing reminder data
        setReminderText(reminder.reminder_text);
        setTargetUrl(reminder.target_url || "");
        setScheduledAt(isoToDateTimeLocal(reminder.scheduled_at));
        setSelectedOutputIds(reminder.outputs.map((o) => o.uuid));
      } else {
        // Create mode: set defaults
        setReminderText("");
        setTargetUrl("");
        setScheduledAt(getDefaultScheduleTime());
        setSelectedOutputIds([]);
      }
      setError(null);
    }
  }, [mode, reminder, isOpen]);

  /**
   * Toggle channel selection
   * Adds or removes a channel from the selected list
   */
  const toggleChannel = (outputId: string) => {
    setSelectedOutputIds((prev) =>
      prev.includes(outputId)
        ? prev.filter((id) => id !== outputId)
        : [...prev, outputId]
    );
  };

  /**
   * Validate form data before submission
   * Returns error message if validation fails, null if valid
   */
  const validateForm = (): string | null => {
    if (reminderText.trim().length === 0) {
      return "Reminder message is required";
    }
    if (selectedOutputIds.length === 0) {
      return "Please select at least one channel";
    }
    return null;
  };

  /**
   * Build the API request payload from form state
   */
  const buildRequestPayload = (): ReminderCreateRequest => {
    return {
      reminder_text: reminderText.trim(),
      target_url: targetUrl.trim() || undefined,
      scheduled_at: new Date(scheduledAt).toISOString(),
      output_uuids: selectedOutputIds,
      expires_at: undefined,
    };
  };

  /**
   * Handle form submission
   * Validates, builds payload, and calls appropriate API mutation
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const data = buildRequestPayload();

      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (reminder) {
        await updateMutation.mutateAsync({
          uuid: reminder.uuid,
          data,
        });
      }

      // Success handled by mutation's onSuccess callback
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        getErrorMessage(err, "Failed to save reminder. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Quick action: Set schedule to X minutes from now
   * Used by quick scheduling buttons (1 hour, 1 day, etc.)
   */
  const handleQuickSchedule = (minutesFromNow: number) => {
    const futureDate = getFutureDate(minutesFromNow);
    setScheduledAt(toDateTimeLocalFormat(futureDate));
  };

  return {
    // Form state
    reminderText,
    setReminderText,
    targetUrl,
    setTargetUrl,
    scheduledAt,
    setScheduledAt,
    selectedOutputIds,
    setSelectedOutputIds,

    // UI state
    isLoading,
    error,

    // Actions
    toggleChannel,
    handleQuickSchedule,
    handleSubmit,
    validateForm,
  };
};
