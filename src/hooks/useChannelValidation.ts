/**
 * Channel validation hook
 * Provides validation logic based on channel type configuration
 */

import { useState, useCallback } from "react";
import type { OutputType } from "../types/reminder.types";
import { getChannelConfig } from "../config/channels";

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

export function useChannelValidation(channelType: OutputType) {
  const config = getChannelConfig(channelType);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (value: string): ValidationResult => {
      // Required field check
      if (!value.trim()) {
        const error = "This field is required";
        setError(error);
        return { valid: false, error };
      }

      // Regex validation
      if (!config.validation.regex.test(value)) {
        const error = config.validation.message;
        setError(error);
        return { valid: false, error };
      }

      // Custom validator (if provided)
      if (config.validation.validator && !config.validation.validator(value)) {
        const error = config.validation.message;
        setError(error);
        return { valid: false, error };
      }

      // All validations passed
      setError(null);
      return { valid: true, error: null };
    },
    [config]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    validate,
    error,
    clearError,
    config,
  };
}
