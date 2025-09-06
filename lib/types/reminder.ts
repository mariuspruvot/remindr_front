/**
 * Type definitions for reminder-related data structures
 * Centralized types for better maintainability and type safety
 */

/**
 * Form data structure for reminder creation
 * Represents the data collected from the user form
 */
export interface ReminderFormData {
  /** URL to remind about (optional) */
  link: string;
  /** Email address to send the reminder to */
  contact: string;
  /** Date and time when the reminder should be sent */
  datetime: string;
  /** The reminder message content */
  message: string;
}

/**
 * Server action result structure
 * Represents the response from server actions
 */
export interface ActionResult {
  /** Whether the action was successful */
  success: boolean;
  /** Optional success or error message */
  message?: string;
  /** Array of validation errors (if any) */
  errors?: string[];
  /** ID of the created reminder (if successful) */
  reminderId?: string;
}

/**
 * Props interface for form components
 * Ensures type safety for component props
 */
export interface FormComponentProps {
  /** Server action function to handle form submission */
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
}

/**
 * Props interface for status message component
 * Defines the structure for displaying action results
 */
export interface StatusMessageProps {
  /** The result from a server action */
  result: ActionResult | null;
}

/**
 * Props interface for date shortcut buttons
 * Defines the callback for date selection
 */
export interface DateShortcutsProps {
  /** Callback function when a date shortcut is selected */
  onDateSelect: (date: string) => void;
}

/**
 * Props interface for clipboard button
 * Defines the callback for clipboard operations
 */
export interface ClipboardButtonProps {
  /** Callback function when text is pasted from clipboard */
  onPaste: (text: string) => void;
}
