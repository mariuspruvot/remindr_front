// Types for the Remindr app
// These match the Django backend API schemas exactly

export type OutputType = "email" | "whatsapp" | "telegram" | "webhook";

export interface Output {
  id: string;
  output_type: OutputType;
  identifier: string; // email address, phone number, username, or webhook URL
  confirmed: boolean;
  primary: boolean;
}

export interface Reminder {
  id: string;
  reminder_text: string;
  target_url?: string | null;
  outputs: Output[];
  scheduled_at: string; // ISO 8601 datetime string from API
  expires_at?: string | null;
  sent: boolean;
  created_at: string;
}

export interface OutputStats {
  type: OutputType;
  totalSent: number;
  successRate: number; // percentage (0-100)
}

// Request types for creating reminders
export interface ReminderCreateRequest {
  reminder_text: string;
  target_url?: string;
  output_ids: string[];
  scheduled_at: string; // ISO 8601 datetime string
  expires_at?: string;
}

// Output/Channel management types
export interface OutputCreateRequest {
  output_type: OutputType;
  identifier: string; // email, phone, username, or webhook URL
}

export interface OutputValidationRequest {
  code: string;
}

export interface OutputValidationResponse {
  success: boolean;
  message: string;
  confirmed: boolean;
}

export interface ValidationStatusResponse {
  output_id: string;
  confirmed: boolean;
  pending_validation: boolean;
  attempts_remaining: number;
}
