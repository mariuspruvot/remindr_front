/**
 * Time-related constants
 *
 * Why constants?
 * - Self-documenting: "MINUTES_IN_HOUR" is clearer than "60"
 * - Single source of truth: change once, applies everywhere
 * - Easy to maintain: all time values in one place
 */

/**
 * Milliseconds in one minute
 * Used for timezone offset calculations: getTimezoneOffset() * MS_PER_MINUTE
 */
export const MS_PER_MINUTE = 60000; // 60 seconds * 1000 milliseconds

/**
 * Minutes in one hour
 * Used for quick scheduling: "In 1 hour" button
 */
export const MINUTES_IN_HOUR = 60;

/**
 * Minutes in one day (24 hours)
 * Used for quick scheduling: "In 1 day" button
 */
export const MINUTES_IN_DAY = 24 * 60; // 1440 minutes

/**
 * Minutes in one week (7 days)
 * Used for quick scheduling: "In 1 week" button
 */
export const MINUTES_IN_WEEK = 7 * 24 * 60; // 10080 minutes

/**
 * Quick schedule presets
 * Centralized configuration for quick scheduling buttons
 *
 * Benefits:
 * - Easy to add/remove presets
 * - Consistent labels across the app
 * - Single place to modify values
 */
export const QUICK_SCHEDULE_PRESETS = [
  {
    label: "In 1 hour",
    minutes: MINUTES_IN_HOUR,
  },
  {
    label: "In 1 day",
    minutes: MINUTES_IN_DAY,
  },
  {
    label: "In 1 week",
    minutes: MINUTES_IN_WEEK,
  },
] as const;

/**
 * Default scheduling buffer
 * How many minutes ahead to default new reminders
 */
export const DEFAULT_SCHEDULE_BUFFER_MINUTES = 5;

/**
 * Minimum scheduling buffer
 * Minimum time ahead required for scheduling (prevents immediate/past reminders)
 */
export const MIN_SCHEDULE_BUFFER_MINUTES = 1;
