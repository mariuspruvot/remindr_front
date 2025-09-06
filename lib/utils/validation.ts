/**
 * Validation utility functions
 * Provides client-side validation for form data
 */

import type { ReminderFormData } from '@/lib/types/reminder';
import { isFutureDate } from './date';

/**
 * Validate email address format
 * @param email - Email string to validate
 * @returns True if email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 * @param url - URL string to validate
 * @returns True if URL format is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate reminder form data
 * @param data - Form data to validate
 * @returns Array of validation error messages
 */
export function validateReminderFormData(data: ReminderFormData): string[] {
  const errors: string[] = [];

  // Validate message
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Reminder message is required');
  } else if (data.message.length > 500) {
    errors.push('Reminder message must be less than 500 characters');
  }

  // Validate email
  if (!data.contact || data.contact.trim().length === 0) {
    errors.push('Email address is required');
  } else if (!isValidEmail(data.contact)) {
    errors.push('Please enter a valid email address');
  }

  // Validate date
  if (!data.datetime || data.datetime.trim().length === 0) {
    errors.push('Reminder date and time is required');
  } else if (!isFutureDate(data.datetime)) {
    errors.push('Reminder date must be in the future');
  }

  // Validate URL (optional)
  if (data.link && data.link.trim().length > 0) {
    if (!isValidUrl(data.link)) {
      errors.push('Please enter a valid URL');
    }
  }

  return errors;
}
