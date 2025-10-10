/**
 * ErrorState - Professional error display using shadcn Alert
 * Consistent error UX across the app
 */

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  retry,
}: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between gap-4">
        <span>{message}</span>
        {retry && (
          <Button onClick={retry} variant="outline" size="sm">
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
