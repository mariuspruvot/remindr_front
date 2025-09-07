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

/**
 * Get browser's timezone offset as ISO string format
 * @returns Timezone offset string (e.g., "+02:00", "-05:00")
 */
export function getBrowserTimezoneOffset(): string {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? '+' : '-';
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Convert datetime-local string to ISO string with browser timezone
 * @param datetimeLocal - datetime-local string (YYYY-MM-DDTHH:MM)
 * @returns ISO string with timezone (YYYY-MM-DDTHH:MM:SS+TZ)
 */
export function addTimezoneToDateTime(datetimeLocal: string): string {
  // Add seconds if not present
  const withSeconds = datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal;
  // Add browser timezone
  const timezoneOffset = getBrowserTimezoneOffset();
  return `${withSeconds}${timezoneOffset}`;
}

/**
 * Convert datetime-local string to UTC ISO string with timezone awareness
 * @param datetimeLocal - datetime-local string (YYYY-MM-DDTHH:MM)
 * @returns UTC ISO string
 */
export function convertLocalToUTC(datetimeLocal: string): string {
  // If the input already includes timezone info, use it directly
  if (datetimeLocal.includes('+') || datetimeLocal.includes('Z')) {
    console.log('🔍 Input already has timezone:', datetimeLocal);
    const date = new Date(datetimeLocal);
    const result = date.toISOString();
    console.log('🔍 Converted to UTC:', result);
    return result;
  }

  // For datetime-local inputs without timezone, add browser timezone first
  const datetimeWithTimezone = addTimezoneToDateTime(datetimeLocal);

  console.log('🔍 Input datetime-local:', datetimeLocal);
  console.log('🔍 Added browser timezone:', datetimeWithTimezone);

  // Now convert to UTC
  const date = new Date(datetimeWithTimezone);
  const result = date.toISOString();
  console.log('🔍 Converted to UTC:', result);
  return result;
}

/**
 * Convert datetime-local string to UTC ISO string with explicit timezone
 * @param datetimeLocal - datetime-local string (YYYY-MM-DDTHH:MM)
 * @returns UTC ISO string with explicit timezone
 */
export function convertLocalToUTCExplicit(datetimeLocal: string): string {
  // Create date and force UTC interpretation
  const date = new Date(datetimeLocal);
  // Return with explicit UTC timezone
  return date.toISOString().replace('Z', '+00:00');
}
