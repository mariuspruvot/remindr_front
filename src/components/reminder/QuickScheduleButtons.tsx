/**
 * Quick schedule preset buttons - Professional shadcn implementation
 * Allows users to quickly set reminder time (1 hour, 1 day, 1 week)
 */

import { Button } from "@/components/ui/button";
import { QUICK_SCHEDULE_PRESETS } from "../../constants/time";

interface QuickScheduleButtonsProps {
  onSchedule: (minutesFromNow: number) => void;
  disabled?: boolean;
}

export default function QuickScheduleButtons({
  onSchedule,
  disabled = false,
}: QuickScheduleButtonsProps) {
  return (
    <div className="flex gap-2">
      {QUICK_SCHEDULE_PRESETS.map((preset) => (
        <Button
          key={preset.label}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onSchedule(preset.minutes)}
          disabled={disabled}
          className="flex-1"
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}
