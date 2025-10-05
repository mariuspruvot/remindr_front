/**
 * Date and time utility functions
 * Centralized date manipulation to avoid duplication and improve maintainability
 */

import { MS_PER_MINUTE } from "../constants/time";

/**
 * Converts a Date object to datetime-local input format (YYYY-MM-DDTHH:mm)
 * Handles timezone offset to display correct local time
 *
 * Why this function?
 * - HTML datetime-local input requires a specific format
 * - We need to account for timezone differences
 * - This logic was repeated 3 times in ReminderFormModal!
 *
 * @param date - The Date object to convert
 * @returns String in YYYY-MM-DDTHH:mm format for datetime-local input
 *
 * @example
 * const now = new Date();
 * const formatted = toDateTimeLocalFormat(now);
 * // Returns: "2025-10-04T19:45"
 */
export const toDateTimeLocalFormat = (date: Date): string => {
  // Subtract timezone offset to get local time
  // getTimezoneOffset() returns minutes, so we multiply by MS_PER_MINUTE (60000)
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * MS_PER_MINUTE
  );

  // toISOString() gives us "2025-10-04T19:45:00.000Z"
  // slice(0, 16) extracts "2025-10-04T19:45"
  return localDate.toISOString().slice(0, 16);
};

/**
 * Converts an ISO datetime string from the API to datetime-local format
 * Used when loading existing reminder data into the form
 *
 * @param isoString - ISO 8601 datetime string from API
 * @returns String in datetime-local format
 *
 * @example
 * const apiDate = "2025-10-04T19:45:00.000Z";
 * const formatted = isoToDateTimeLocal(apiDate);
 * // Returns: "2025-10-04T19:45"
 */
export const isoToDateTimeLocal = (isoString: string): string => {
  const date = new Date(isoString);
  return toDateTimeLocalFormat(date);
};

/**
 * Creates a Date object set to X minutes in the future from now
 *
 * Why a separate function?
 * - Makes intent clear: "I want a time X minutes from now"
 * - Reusable for quick scheduling buttons
 * - Easy to test
 *
 * @param minutesFromNow - Number of minutes to add to current time
 * @returns Date object representing the future time
 *
 * @example
 * const inOneHour = getFutureDate(60);
 * const inOneDay = getFutureDate(24 * 60);
 */
export const getFutureDate = (minutesFromNow: number): Date => {
  const future = new Date();
  future.setMinutes(future.getMinutes() + minutesFromNow);
  return future;
};

/**
 * Gets minimum allowed datetime for reminder scheduling (now + 1 minute)
 * Ensures reminders are always scheduled in the future
 *
 * @returns String in datetime-local format
 *
 * @example
 * <input type="datetime-local" min={getMinScheduleTime()} />
 */
export const getMinScheduleTime = (): string => {
  return toDateTimeLocalFormat(getFutureDate(1));
};

/**
 * Gets a default datetime for new reminders (now + 5 minutes)
 * Provides a sensible default that gives users a bit of buffer time
 *
 * @returns String in datetime-local format
 */
export const getDefaultScheduleTime = (): string => {
  return toDateTimeLocalFormat(getFutureDate(5));
};
