/**
 * Application constants
 * Centralized values used across the application
 */

import type { OutputType } from "../types/reminder.types";

// Re-export animations for convenience
export * from "./animations";

// Output/Channel types configuration
export const OUTPUT_TYPES: OutputType[] = [
  "email",
  "whatsapp",
  "telegram",
  "webhook",
];

export const OUTPUT_TYPE_LABELS: Record<OutputType, string> = {
  email: "Email Address",
  whatsapp: "Phone Number",
  telegram: "Username",
  webhook: "Webhook URL",
};

export const OUTPUT_TYPE_PLACEHOLDERS: Record<OutputType, string> = {
  email: "user@example.com",
  whatsapp: "+33612345678",
  telegram: "@username",
  webhook: "https://example.com/webhook",
};

// Validation constraints
export const VALIDATION = {
  REMINDER_TEXT_MAX_LENGTH: 500,
  REMINDER_TEXT_MIN_LENGTH: 1,
  VERIFICATION_CODE_LENGTH: 6,
  MAX_VALIDATION_ATTEMPTS: 3,
  RESEND_COOLDOWN_SECONDS: 60,
} as const;

// UI Constants
export const UI = {
  NAVBAR_HEIGHT: "64px",
  SIDEBAR_WIDTH: "256px",
  DEFAULT_PAGE_LIMIT: 20,
  DEFAULT_PAGINATION_SIZE: 10,
} as const;

// Animation durations (in seconds)
export const ANIMATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  TOAST_DURATION: 3000, // milliseconds
} as const;
