/**
 * Channel Validation Form - Professional shadcn implementation
 * Step 2 of channel creation flow (verification code)
 */

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DialogFooter } from "@/components/ui/dialog";

interface ChannelValidationFormProps {
  identifier: string;
  verificationCode: string;
  error: string | null;
  isLoading: boolean;
  attemptsRemaining: number;
  onCodeChange: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onCancel: () => void;
}

export default function ChannelValidationForm({
  identifier,
  verificationCode,
  error,
  isLoading,
  attemptsRemaining,
  onCodeChange,
  onSubmit,
  onResend,
  onCancel,
}: ChannelValidationFormProps) {
  const isCodeValid = verificationCode.trim().length === 6;
  const canSubmit = isCodeValid && attemptsRemaining > 0 && !isLoading;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Instructions */}
      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm text-muted-foreground">
          We sent a verification code to{" "}
          <span className="font-medium text-foreground">{identifier}</span>
        </p>
      </div>

      {/* Code Input */}
      <div className="space-y-2">
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          type="text"
          value={verificationCode}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Enter 6-digit code"
          className="text-center text-lg tracking-wider"
          maxLength={6}
          required
          disabled={isLoading}
          autoFocus
        />
        <p className="text-xs text-muted-foreground text-center">
          {attemptsRemaining} {attemptsRemaining === 1 ? "attempt" : "attempts"}{" "}
          remaining
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Resend Code */}
      <div className="text-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onResend}
          disabled={isLoading}
        >
          Didn't receive code? Resend
        </Button>
      </div>

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
        <Button type="submit" disabled={!canSubmit}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
