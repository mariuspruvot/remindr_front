/**
 * Channel Type Selector
 * Allows user to select which type of channel to add
 */

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
    <div>
      <label className="block text-sm font-medium mb-3">Channel Type</label>
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
              className={`
                flex items-center justify-center gap-2 p-4 rounded-lg border-2
                transition-all duration-200
                ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-base-300 hover:border-base-400"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-normal capitalize">{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
