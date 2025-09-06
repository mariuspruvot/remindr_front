/**
 * Server Actions for reminder operations
 * These run on the server side, eliminating client-side API calls
 */

'use server';

import type { FormData } from '@/lib/types';

interface ActionResult {
  success: boolean;
  message?: string;
  errors?: string[];
  reminderId?: string;
}

/**
 * Create a new reminder using Server Action
 */
export async function createReminderAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    // Extract data from FormData
    const data = {
      message: formData.get('message') as string,
      link: formData.get('link') as string,
      contact: formData.get('contact') as string,
      datetime: formData.get('datetime') as string,
    };

    // Validate form data
    const errors = validateFormData(data);
    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    // Prepare API data
    const apiData = {
      reminder_text: data.message,
      target_url: data.link || undefined,
      contact: data.contact,
      scheduled_at: data.datetime,
    };

    // Make API call from server
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN || 'toto';

    const response = await fetch(`${apiUrl}/api/reminders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to create reminder',
      };
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Reminder created successfully!',
      reminderId: result.id,
    };
  } catch (error) {
    console.error('Server Action Error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

/**
 * Validate form data (server-side validation)
 */
function validateFormData(data: {
  message: string;
  link: string;
  contact: string;
  datetime: string;
}): string[] {
  const errors: string[] = [];

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Reminder message is required');
  } else if (data.message.length > 500) {
    errors.push('Reminder message must be less than 500 characters');
  }

  if (!data.contact || data.contact.trim().length === 0) {
    errors.push('Email address is required');
  } else if (!isValidEmail(data.contact)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.datetime || data.datetime.trim().length === 0) {
    errors.push('Reminder date and time is required');
  } else {
    const reminderDate = new Date(data.datetime);
    const now = new Date();
    if (reminderDate <= now) {
      errors.push('Reminder date must be in the future');
    }
  }

  if (data.link && data.link.trim().length > 0) {
    try {
      new URL(data.link);
    } catch {
      errors.push('Please enter a valid URL');
    }
  }

  return errors;
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
