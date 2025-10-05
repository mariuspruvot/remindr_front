/**
 * Toast notification utility using DaisyUI
 * Provides success, error, and info notifications
 */

import { CheckCircle, XCircle, Info } from "lucide-react";
import { createRoot } from "react-dom/client";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
}

const ToastComponent = ({
  message,
  type,
  onClose,
}: ToastProps & { onClose: () => void }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
  };

  const Icon = icons[type];

  return (
    <div className={`alert ${colors[type]} shadow-lg max-w-md`}>
      <Icon className="w-5 h-5" />
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        className="btn btn-ghost btn-sm btn-circle"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

/**
 * Show a toast notification
 * @param message The message to display
 * @param type The type of toast (success, error, info)
 * @param duration Duration in ms (default 3000)
 */
export const showToast = (
  message: string,
  type: ToastType = "info",
  duration: number = 3000
) => {
  // Create container if it doesn't exist
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(container);
  }

  // Create toast element
  const toastElement = document.createElement("div");
  toastElement.className =
    "pointer-events-auto animate-in slide-in-from-right duration-300";
  container.appendChild(toastElement);

  // Render toast
  const root = createRoot(toastElement);
  const handleClose = () => {
    toastElement.classList.add("animate-out", "slide-out-to-right");
    setTimeout(() => {
      root.unmount();
      toastElement.remove();

      // Remove container if empty
      if (container && container.children.length === 0) {
        container.remove();
      }
    }, 300);
  };

  root.render(
    <ToastComponent message={message} type={type} onClose={handleClose} />
  );

  // Auto-dismiss
  if (duration > 0) {
    setTimeout(handleClose, duration);
  }
};
