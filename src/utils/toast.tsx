/**
 * Toast utility using Sonner - Industry standard
 * Clean, accessible, and beautiful notifications
 */

import { toast as sonnerToast } from "sonner";

type ToastType = "success" | "error" | "info";

/**
 * Show a toast notification using Sonner
 * @param message The message to display
 * @param type The type of toast (success, error, info)
 */
export const showToast = (message: string, type: ToastType = "info") => {
  switch (type) {
    case "success":
      sonnerToast.success(message);
      break;
    case "error":
      sonnerToast.error(message);
      break;
    case "info":
      sonnerToast.info(message);
      break;
  }
};
