/**
 * Channel Input Component
 * Renders an input field with validation for a specific channel type
 */

import { AlertCircle } from "lucide-react";
import type { OutputType } from "../../types/reminder.types";
import { useChannelValidation } from "../../hooks/useChannelValidation";

interface ChannelInputProps {
  channelType: OutputType;
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (valid: boolean) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function ChannelInput({
  channelType,
  value,
  onChange,
  onValidationChange,
  disabled = false,
  autoFocus = false,
}: ChannelInputProps) {
  const { validate, error, clearError, config } =
    useChannelValidation(channelType);

  const Icon = config.icon;

  const handleChange = (newValue: string) => {
    onChange(newValue);
    clearError();
  };

  const handleBlur = () => {
    const result = validate(value);
    onValidationChange?.(result.valid);
  };

  return (
    <div className="space-y-2">
      <label className="label">
        <span className="label-text font-medium flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {config.label}
        </span>
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={config.placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
      />

      {config.helpText && !error && (
        <p className="text-xs text-base-content/60">{config.helpText}</p>
      )}

      {error && (
        <div className="flex items-start gap-2 text-error text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
