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
 * SSR-safe version that returns a placeholder DateTime
 * Use this for components that might render server-side
 */
export function getDateShortcutSSRSafe(type: DateShortcutType): DateTime {
  // During SSR, return a UTC-based placeholder
  // Client will re-render with correct local timezone
  if (typeof window === 'undefined') {
    const utcNow = DateTime.utc();
    switch (type) {
      case 'tomorrow':
        return utcNow.plus({ days: 1 });
      case 'week':
        return utcNow.plus({ weeks: 1 });
      case 'month':
        return utcNow.plus({ months: 1 });
      default:
        return utcNow;
    }
  }
  return getDateShortcut(type);
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
 * SSR-safe version that returns empty string (to be hydrated client-side)
 * Use this in components that can run server-side
 */
export function getCurrentDateTimeLocalSSRSafe(): string {
  // During SSR, return empty to avoid timezone mismatch
  // Will be hydrated with correct local time on client
  if (typeof window === 'undefined') {
    return '';
  }
  return getCurrentDateTimeLocal();
}

/**
 * Get browser's timezone name using Luxon
 * @returns Timezone name (e.g., "America/New_York", "Europe/London")
 */
export function getBrowserTimezone(): string {
  return DateTime.local().zoneName || 'UTC';
}

/**
 * Convert naive datetime + timezone to UTC ISO string
 * 
 * Server receives:
 * 1. Naive datetime string (YYYY-MM-DDTHH:MM) - no timezone info
 * 2. Client timezone (e.g., "Europe/Paris") 
 * 
 * Process:
 * 1. Interpret naive datetime in the provided timezone
 * 2. Convert the resulting DateTime to UTC
 * 3. Return as ISO string for backend
 * 
 * @param datetimeLocal - naive datetime string (YYYY-MM-DDTHH:MM) from datetime-local input
 * @param clientTimezone - client's timezone (e.g., "Europe/Paris") from Intl.DateTimeFormat
 * @returns UTC ISO string that can be sent to backend
 */
export function convertLocalToUTC(datetimeLocal: string, clientTimezone?: string): string {
  // If the input already includes timezone info, parse it directly
  if (datetimeLocal.includes('+') || datetimeLocal.includes('Z') || datetimeLocal.includes('-', 10)) {
    const dateTime = DateTime.fromISO(datetimeLocal);
    if (!dateTime.isValid) {
      console.error('Invalid datetime with timezone:', datetimeLocal);
      return '';
    }
    return dateTime.toUTC().toISO() || '';
  }

  // For server-side processing, timezone should always be provided
  if (!clientTimezone) {
    console.warn('No timezone provided, falling back to local timezone detection');
  }

  const targetZone = clientTimezone || 'local';

  // Validate timezone
  if (clientTimezone && !DateTime.local().setZone(clientTimezone).isValid) {
    console.error('Invalid timezone provided:', clientTimezone);
    return '';
  }

  // Step 1: Interpret the naive datetime in the client's timezone
  // Example: "2025-09-07T15:00" + "Europe/Paris" = "2025-09-07T15:00+02:00"
  const localDateTime = DateTime.fromISO(datetimeLocal, { zone: targetZone });

  if (!localDateTime.isValid) {
    console.error('Invalid datetime string:', datetimeLocal, 'in timezone:', targetZone);
    return '';
  }

  // Step 2: Convert to UTC
  // Example: "2025-09-07T15:00+02:00" -> "2025-09-07T13:00:00.000Z"
  const utcDateTime = localDateTime.toUTC();
  const result = utcDateTime.toISO() || '';

  console.log('🌍 Naive datetime + timezone → UTC conversion:', {
    naiveDatetime: datetimeLocal,
    clientTimezone: clientTimezone || 'local (auto-detected)',
    interpretedAs: localDateTime.toISO(),
    convertedToUTC: result,
    offsetFromUTC: localDateTime.toFormat('ZZ')
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
