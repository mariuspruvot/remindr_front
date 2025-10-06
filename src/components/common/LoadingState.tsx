/**
 * LoadingState - Reusable loading indicator
 * 
 * Why this exists?
 * - Every page had identical loading state markup
 * - Consistent loading UX across the app
 */

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function LoadingState({ size = "md" }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  );
}

