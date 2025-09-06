/**
 * Date utility functions for reminder form
 * Provides date manipulation and formatting utilities
 */

/**
 * Date shortcut types for quick date selection
 */
export type DateShortcutType = 'tomorrow' | 'week' | 'month';

/**
 * Get a future date based on shortcut type
 * @param type - The type of date shortcut
 * @returns Date object for the calculated date
 */
export function getDateShortcut(type: DateShortcutType): Date {
  const now = new Date();

  switch (type) {
    case 'tomorrow':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case 'week':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case 'month':
      return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    default:
      return now;
  }
}

/**
 * Format a date for datetime-local input
 * @param date - Date object to format
 * @returns Formatted date string (YYYY-MM-DDTHH:MM)
 */
export function formatDateTimeLocal(date: Date): string {
  return date.toISOString().slice(0, 16);
}

/**
 * Check if a date is in the future
 * @param dateString - Date string to validate
 * @returns True if the date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}

/**
 * Get current date formatted for datetime-local input
 * @returns Current date formatted for input
 */
export function getCurrentDateTimeLocal(): string {
  return formatDateTimeLocal(new Date());
}
