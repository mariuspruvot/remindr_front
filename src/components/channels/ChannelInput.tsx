/**
 * Channel Input Component - Professional shadcn implementation
 * Input field with validation for specific channel types
 */

import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <Label htmlFor="channel-input" className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {config.label}
      </Label>

      <Input
        id="channel-input"
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={config.placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={error ? "border-destructive" : ""}
      />

      {config.helpText && !error && (
        <p className="text-xs text-muted-foreground">{config.helpText}</p>
      )}

      {error && (
        <div className="flex items-start gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
