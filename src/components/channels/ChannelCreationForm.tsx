/**
 * Channel Creation Form
 * Form for creating a new channel (step 1)
 */

import { Loader2 } from "lucide-react";
import type { OutputType } from "../../types/reminder.types";
import ChannelTypeSelector from "./ChannelTypeSelector";
import ChannelInput from "./ChannelInput";

interface ChannelCreationFormProps {
  selectedType: OutputType;
  identifier: string;
  error: string | null;
  isLoading: boolean;
  onTypeChange: (type: OutputType) => void;
  onIdentifierChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ChannelCreationForm({
  selectedType,
  identifier,
  error,
  isLoading,
  onTypeChange,
  onIdentifierChange,
  onSubmit,
  onCancel,
}: ChannelCreationFormProps) {
  const isValid = identifier.trim().length > 0;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Channel Type Selection */}
      <ChannelTypeSelector
        selectedType={selectedType}
        onSelect={onTypeChange}
        disabled={isLoading}
      />

      {/* Identifier Input with validation */}
      <ChannelInput
        channelType={selectedType}
        value={identifier}
        onChange={onIdentifierChange}
        disabled={isLoading}
      />

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost flex-1"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-1"
          disabled={isLoading || !isValid}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Code"
          )}
        </button>
      </div>
    </form>
  );
}
