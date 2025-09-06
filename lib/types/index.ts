/**
 * Core domain types for Remindr application
 * Following Single Responsibility Principle - each type has one clear purpose
 */

export interface Reminder {
  id: string;
  type: ReminderType;
  reminder_text: string;
  target_url?: string;
  short_url?: ShortURL;
  scheduled_at: string;
  created_at: string;
  expires_at?: string;
  sent: boolean;
}

export interface ShortURL {
  id: string;
  original_url: string;
  short_code: string;
  created_at: string;
  expires_at?: string;
}

export interface CreateReminderRequest {
  target_url?: string;
  reminder_text: string;
  contact: string;
  scheduled_at: string;
  expires_at?: string;
}

export interface CreateReminderResponse {
  id: string;
  message: string;
  scheduled_at: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export type ReminderType = 'email';

export interface FormData {
  link: string;
  contact: string;
  datetime: string;
  message: string;
}

export interface ModalState {
  isOpen: boolean;
  type: 'success' | 'error';
}

export type DateShortcut = 'tomorrow' | 'week' | 'month';

// Export new clean types
export * from './reminder';
