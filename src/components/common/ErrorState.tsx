/**
 * ErrorState - Reusable error display
 * 
 * Why this exists?
 * - Consistent error UX across the app
 * - DRY principle for error handling UI
 */

import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  retry,
}: ErrorStateProps) {
  return (
    <div className="alert alert-error">
      <AlertCircle className="w-5 h-5" />
      <span>{message}</span>
      {retry && (
        <button onClick={retry} className="btn btn-sm btn-ghost">
          Retry
        </button>
      )}
    </div>
  );
}

