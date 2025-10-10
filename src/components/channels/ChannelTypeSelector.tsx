/**
 * Channel Type Selector - Professional shadcn implementation
 * Grid of channel type buttons with proper visual states
 */

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { OutputType } from "../../types/reminder.types";
import { getAllChannelTypes, getChannelConfig } from "../../config/channels";

interface ChannelTypeSelectorProps {
  selectedType: OutputType;
  onSelect: (type: OutputType) => void;
  disabled?: boolean;
}

export default function ChannelTypeSelector({
  selectedType,
  onSelect,
  disabled = false,
}: ChannelTypeSelectorProps) {
  const availableTypes = getAllChannelTypes();

  return (
    <div className="space-y-3">
      <Label>Channel Type</Label>
      <div className="grid grid-cols-2 gap-2">
        {availableTypes.map((type) => {
          const config = getChannelConfig(type);
          const Icon = config.icon;
          const isSelected = selectedType === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              disabled={disabled}
              className={cn(
                "flex items-center justify-center gap-2 p-4 rounded-lg border-2",
                "transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input hover:border-muted-foreground/50 hover:bg-accent",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium capitalize">{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
