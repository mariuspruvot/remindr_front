/**
 * Date utility functions for reminder form
 * Provides timezone-aware date manipulation and formatting using Luxon
 */

import { DateTime } from 'luxon';

/**
 * Date shortcut types for quick date selection
 */
export type DateShortcutType = 'tomorrow' | 'week' | 'month';

/**
 * Get a future DateTime based on shortcut type (in user's local timezone)
 * @param type - The type of date shortcut
 * @returns DateTime object for the calculated date in user's timezone
 */
export function getDateShortcut(type: DateShortcutType): DateTime {
  const now = DateTime.local();

  switch (type) {
    case 'tomorrow':
      return now.plus({ days: 1 });
    case 'week':
      return now.plus({ weeks: 1 });
    case 'month':
      return now.plus({ months: 1 });
    default:
      return now;
  }
}

/**
 * Format a DateTime for datetime-local input (preserves local timezone)
 * @param dateTime - DateTime object to format
 * @returns Formatted date string (YYYY-MM-DDTHH:MM) in local timezone
 */
export function formatDateTimeLocal(dateTime: DateTime): string {
  return dateTime.toFormat("yyyy-MM-dd'T'HH:mm");
}

/**
 * Format a Date object for datetime-local input (legacy support)
 * @param date - Date object to format
 * @returns Formatted date string (YYYY-MM-DDTHH:MM) in local timezone
 */
export function formatDateTimeLocalFromDate(date: Date): string {
  return formatDateTimeLocal(DateTime.fromJSDate(date));
}

/**
 * Check if a datetime string is in the future
 * @param datetimeString - datetime-local string (YYYY-MM-DDTHH:MM) or ISO string
 * @returns True if the datetime is in the future
 */
export function isFutureDate(datetimeString: string): boolean {
  let dateTime: DateTime;

  // If the string looks like datetime-local format (no timezone info)
  if (datetimeString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
    // Treat as local timezone
    dateTime = DateTime.fromISO(datetimeString);
  } else {
    // Parse as ISO string (with timezone)
    dateTime = DateTime.fromISO(datetimeString);
  }

  const now = DateTime.local();
  return dateTime > now;
}

/**
 * Get current date formatted for datetime-local input
 * @returns Current date formatted for input in user's timezone
 */
export function getCurrentDateTimeLocal(): string {
  return formatDateTimeLocal(DateTime.local());
}

/**
 * Get browser's timezone name using Luxon
 * @returns Timezone name (e.g., "America/New_York", "Europe/London")
 */
export function getBrowserTimezone(): string {
  return DateTime.local().zoneName || 'UTC';
}

/**
 * Convert datetime-local string to UTC ISO string with proper timezone handling
 * This is the KEY function that fixes the timezone issue!
 * 
 * @param datetimeLocal - datetime-local string (YYYY-MM-DDTHH:MM) from browser form
 * @returns UTC ISO string that can be sent to backend
 */
export function convertLocalToUTC(datetimeLocal: string): string {
  // If the input already includes timezone info, parse it directly
  if (datetimeLocal.includes('+') || datetimeLocal.includes('Z') || datetimeLocal.includes('-', 10)) {
    const dateTime = DateTime.fromISO(datetimeLocal);
    return dateTime.toUTC().toISO() || '';
  }

  // For datetime-local inputs (no timezone), treat as local timezone
  // This is the critical fix - we interpret the datetime-local as local time
  const localDateTime = DateTime.fromISO(datetimeLocal, { zone: 'local' });

  if (!localDateTime.isValid) {
    console.error('Invalid datetime string:', datetimeLocal);
    return '';
  }

  // Convert to UTC and return as ISO string
  const utcDateTime = localDateTime.toUTC();
  const result = utcDateTime.toISO() || '';

  console.log('🌍 Timezone conversion:', {
    input: datetimeLocal,
    localTimezone: getBrowserTimezone(),
    localDateTime: localDateTime.toISO(),
    utcResult: result
  });

  return result;
}

/**
 * Convert UTC datetime back to local datetime for display
 * @param utcIsoString - UTC ISO string from backend
 * @returns DateTime in local timezone
 */
export function convertUTCToLocal(utcIsoString: string): DateTime {
  return DateTime.fromISO(utcIsoString, { zone: 'utc' }).toLocal();
}

/**
 * Convert UTC datetime back to datetime-local string for form inputs
 * @param utcIsoString - UTC ISO string from backend
 * @returns datetime-local string (YYYY-MM-DDTHH:MM)
 */
export function convertUTCToDateTimeLocal(utcIsoString: string): string {
  const localDateTime = convertUTCToLocal(utcIsoString);
  return formatDateTimeLocal(localDateTime);
}
