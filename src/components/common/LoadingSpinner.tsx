import { Bell } from "lucide-react";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export function LoadingSpinner({ fullScreen = false }: LoadingSpinnerProps) {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center bg-base-100"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <Bell
          className="w-12 h-12 text-primary animate-pulse"
          strokeWidth={2}
        />
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}
