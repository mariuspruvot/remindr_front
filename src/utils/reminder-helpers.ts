/**
 * Helper functions for reminder display and formatting
 * Following DRY principle - single source of truth for common operations
 */

import type { LucideIcon } from "lucide-react";
import { Mail } from "lucide-react";
import type { OutputType } from "../types/reminder.types";
import { getChannelConfig } from "../config/channels";

/**
 * Get the appropriate icon component for an output type
 * Now uses the channel registry for consistency
 */
export const getOutputIcon = (outputType: OutputType): LucideIcon => {
  const config = getChannelConfig(outputType);
  return config?.icon || Mail;
};

/**
 * Format ISO date string to human-readable format
 * @param isoDate - ISO 8601 datetime string
 * @param includeYear - Whether to include year in the output
 */
export const formatReminderDate = (
  isoDate: string,
  includeYear: boolean = true
): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (includeYear) {
    options.year = "numeric";
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

/**
 * Get status display configuration - Using DaisyUI badges
 */
export const getStatusConfig = (sent: boolean) => {
  return sent
    ? {
        label: "Sent",
        className: "badge badge-success gap-1",
      }
    : {
        label: "Scheduled",
        className: "badge badge-info gap-1",
      };
};
