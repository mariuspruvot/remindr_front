/**
 * Custom Hook for Reminder Form Management
 *
 * Encapsulates form state management and validation logic.
 * Follows Single Responsibility Principle - handles only form state and logic.
 * Provides a clean API for form components to use.
 *
 * @example
 * ```tsx
 * const { formData, updateField, resetForm } = useReminderForm();
 * ```
 */

import { useState, useCallback } from 'react';
import type { ReminderFormData } from '@/lib/types/reminder';
import { validateReminderFormData } from '@/lib/utils/validation';
import { getDateShortcut, formatDateTimeLocal } from '@/lib/utils/date';
import type { DateShortcutType } from '@/lib/utils/date';

/**
 * Initial form data state
 */
const INITIAL_FORM_DATA: ReminderFormData = {
  link: '',
  contact: '',
  datetime: '',
  message: '',
};

/**
 * Custom hook for managing reminder form state
 *
 * Provides form data management, validation, and utility functions.
 * All state updates are memoized for optimal performance.
 *
 * @returns Object containing form state and management functions
 */
export const useReminderForm = () => {
  const [formData, setFormData] = useState<ReminderFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<string[]>([]);

  /**
   * Update a specific form field
   * @param field - The field name to update
   * @param value - The new value for the field
   */
  const updateField = useCallback(
    (field: keyof ReminderFormData, value: string) => {
      setFormData((prev: ReminderFormData) => ({ ...prev, [field]: value }));

      // Clear errors when user starts typing
      if (errors.length > 0) {
        setErrors([]);
      }
    },
    [errors.length]
  );

  /**
   * Validate the current form data
   * @returns True if form is valid, false otherwise
   */
  const validateForm = useCallback(() => {
    const validationErrors = validateReminderFormData(formData);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  }, [formData]);

  /**
   * Reset form to initial state
   * Clears all form data and errors
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors([]);
  }, []);

  /**
   * Set form data from external source
   * Useful for pre-filling forms or setting data from server
   * @param data - The form data to set
   */
  const setFormDataFromExternal = useCallback((data: Partial<ReminderFormData>) => {
    setFormData((prev: ReminderFormData) => ({ ...prev, ...data }));
  }, []);

  /**
   * Set datetime field using a date shortcut
   * @param type - The type of date shortcut to apply
   */
  const setDateShortcut = useCallback((type: DateShortcutType) => {
    const targetDateTime = getDateShortcut(type);
    const formattedDateTime = formatDateTimeLocal(targetDateTime);
    updateField('datetime', formattedDateTime);
  }, [updateField]);

  /**
   * Paste content from clipboard to link field
   */
  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        updateField('link', text);
      }
    } catch (error) {
      console.warn('Failed to read from clipboard:', error);
    }
  }, [updateField]);

  return {
    // State
    formData,
    errors,

    // Actions
    updateField,
    validateForm,
    resetForm,
    setFormDataFromExternal,
    setDateShortcut,
    pasteFromClipboard,
  };
};
