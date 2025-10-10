/**
 * Channel Creation Form - Professional shadcn implementation
 * Step 1 of channel creation flow
 */

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DialogFooter } from "@/components/ui/dialog";
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
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <DialogFooter className="gap-2 sm:gap-0">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !isValid}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Code"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
