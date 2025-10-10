/**
 * Toast notification utility - Professional shadcn-style implementation
 * Success, error, and info notifications
 */

import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const styles = {
    success:
      "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-50",
    error:
      "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-50",
    info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-50",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4 shadow-lg max-w-md",
        styles[type]
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm flex-1">{message}</span>
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full flex-shrink-0"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

/**
 * Show a toast notification
 */
export const showToast = (
  message: string,
  type: ToastType = "info",
  duration: number = 3000
) => {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(container);
  }

  const toastElement = document.createElement("div");
  toastElement.className =
    "pointer-events-auto animate-in slide-in-from-right duration-300";
  container.appendChild(toastElement);

  const root = createRoot(toastElement);
  const handleClose = () => {
    toastElement.classList.add("animate-out", "slide-out-to-right");
    setTimeout(() => {
      root.unmount();
      toastElement.remove();

      if (container && container.children.length === 0) {
        container.remove();
      }
    }, 300);
  };

  root.render(
    <ToastComponent message={message} type={type} onClose={handleClose} />
  );

  if (duration > 0) {
    setTimeout(handleClose, duration);
  }
};
