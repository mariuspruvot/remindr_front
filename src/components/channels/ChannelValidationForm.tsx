/**
 * Channel Validation Form
 * Form for validating a channel with verification code (step 2)
 */

import { Loader2 } from "lucide-react";

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
      <div className="bg-base-200 rounded-lg p-4">
        <p className="text-sm text-base-content/70">
          We sent a verification code to{" "}
          <span className="font-medium text-base-content">{identifier}</span>
        </p>
      </div>

      {/* Code Input */}
      <div>
        <label htmlFor="code" className="block text-sm font-medium mb-2">
          Verification Code
        </label>
        <input
          id="code"
          type="text"
          value={verificationCode}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Enter 6-digit code"
          className="input input-bordered w-full text-center text-lg tracking-wider"
          maxLength={6}
          required
          disabled={isLoading}
          autoFocus
        />
        <p className="text-xs text-base-content/60 mt-1 text-center">
          {attemptsRemaining} {attemptsRemaining === 1 ? "attempt" : "attempts"}{" "}
          remaining
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Resend Code */}
      <div className="text-center">
        <button
          type="button"
          onClick={onResend}
          className="btn btn-ghost btn-sm"
          disabled={isLoading}
        >
          Didn't receive code? Resend
        </button>
      </div>

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
          disabled={!canSubmit}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </button>
      </div>
    </form>
  );
}
