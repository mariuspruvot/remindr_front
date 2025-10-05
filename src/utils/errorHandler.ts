/**
 * Centralized error handling utilities
 * Extracts error messages from different error types
 *
 * Why this file?
 * - Error handling code was duplicated in every component
 * - Provides consistent error messages across the app
 * - Easy to customize error messages in one place
 */

import axios from "axios";

/**
 * Extract a user-friendly error message from any error type
 *
 * Handles:
 * - Axios errors (API responses)
 * - Native Error objects
 * - Unknown error types
 *
 * @param error - The error to extract message from
 * @param fallback - Default message if no specific message found
 * @returns User-friendly error message
 *
 * @example
 * try {
 *   await api.post('/reminders', data);
 * } catch (err) {
 *   setError(getErrorMessage(err));
 * }
 */
export const getErrorMessage = (
  error: unknown,
  fallback: string = "An unexpected error occurred. Please try again."
): string => {
  // Handle Axios errors (API responses)
  if (axios.isAxiosError(error)) {
    // Backend sent a structured error message
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    // Backend sent error detail
    if (error.response?.data?.detail) {
      return error.response.data.detail;
    }
    // Network or connection error
    if (error.message) {
      return error.message;
    }
  }

  // Handle native JavaScript errors
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Unknown error type
  return fallback;
};

/**
 * Get a specific error message for common operations
 * Provides context-aware error messages
 *
 * @param operation - The operation that failed
 * @param error - The error object
 * @returns Context-aware error message
 */
export const getOperationErrorMessage = (
  operation: "create" | "update" | "delete" | "fetch" | "validate",
  error: unknown
): string => {
  const baseMessage = getErrorMessage(error);

  const prefixes: Record<typeof operation, string> = {
    create: "Failed to create",
    update: "Failed to update",
    delete: "Failed to delete",
    fetch: "Failed to load",
    validate: "Validation failed",
  };

  // If error already contains context, return as is
  if (baseMessage.toLowerCase().includes("failed")) {
    return baseMessage;
  }

  return `${prefixes[operation]}: ${baseMessage}`;
};
