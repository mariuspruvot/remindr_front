/**
 * Quick schedule preset buttons
 * Allows users to quickly set reminder time (1 hour, 1 day, 1 week)
 *
 * Why a separate component?
 * - Reusable across different forms
 * - Single responsibility: render schedule buttons
 * - Easier to test and style
 * - Reduces parent component complexity
 */

import { QUICK_SCHEDULE_PRESETS } from "../../constants/time";

interface QuickScheduleButtonsProps {
  onSchedule: (minutesFromNow: number) => void;
  disabled?: boolean;
}

/**
 * Renders quick schedule preset buttons
 *
 * @example
 * <QuickScheduleButtons
 *   onSchedule={(minutes) => setScheduledAt(getFutureDate(minutes))}
 *   disabled={isLoading}
 * />
 */
export default function QuickScheduleButtons({
  onSchedule,
  disabled = false,
}: QuickScheduleButtonsProps) {
  return (
    <div className="flex gap-2">
      {QUICK_SCHEDULE_PRESETS.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => onSchedule(preset.minutes)}
          disabled={disabled}
          className="btn btn-sm btn-outline flex-1"
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
