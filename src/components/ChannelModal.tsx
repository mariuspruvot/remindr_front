/**
 * Modal for creating and validating channels
 * Two-step process: 1) Create channel, 2) Validate with code
 *
 * REFACTORED: Extracted business logic to useChannelForm hook
 * Now focused on UI rendering only (~180 lines vs 352 before)
 */

import { useEffect } from "react";
import { X, Mail, MessageCircle, Send, Link2, Loader2 } from "lucide-react";
import { useChannelForm } from "../hooks/useChannelForm";
import type { Output, OutputType } from "../types/reminder.types";

interface ChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback when channel is created & validated
  channelToValidate?: Output | null;
}

function ChannelModal({
  isOpen,
  onClose,
  onSuccess,
  channelToValidate,
}: ChannelModalProps) {
  // Use custom hook for all form logic
  const form = useChannelForm({
    onSuccess,
    onClose,
    existingChannel: channelToValidate,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      form.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, channelToValidate]); // Also reset when channelToValidate changes

  const getChannelIcon = (type: OutputType) => {
    const icons = {
      email: Mail,
      whatsapp: MessageCircle,
      telegram: Send,
      webhook: Link2,
    };
    const Icon = icons[type] || Mail;
    return <Icon className="w-5 h-5" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-base-100 rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h2 className="text-xl font-semibold">
            {form.step === "create" ? "Add Channel" : "Verify Channel"}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Create Channel */}
          {form.step === "create" && (
            <form onSubmit={form.handleCreateChannel} className="space-y-4">
              {/* Channel Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Channel Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["email", "whatsapp"] as OutputType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => form.setSelectedType(type)}
                      className={`
                        flex items-center justify-center gap-2 p-4 rounded-lg border-2
                        transition-all duration-200
                        ${
                          form.selectedType === type
                            ? "border-primary bg-primary/10"
                            : "border-base-300 hover:border-base-400"
                        }
                      `}
                    >
                      {getChannelIcon(type)}
                      <span className="font-medium capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Identifier Input */}
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium mb-2"
                >
                  {form.selectedType === "email"
                    ? "Email Address"
                    : "Phone Number"}
                </label>
                <input
                  id="identifier"
                  type={form.selectedType === "email" ? "email" : "tel"}
                  value={form.identifier}
                  onChange={(e) => form.setIdentifier(e.target.value)}
                  placeholder={
                    form.selectedType === "email"
                      ? "your@email.com"
                      : "+33 6 12 34 56 78"
                  }
                  className="input input-bordered w-full"
                  required
                  disabled={form.isLoading}
                />
                {form.selectedType === "whatsapp" && (
                  <p className="text-xs text-base-content/60 mt-1">
                    Include country code (e.g., +33 for France)
                  </p>
                )}
              </div>

              {/* Error Message */}
              {form.error && (
                <div className="alert alert-error">
                  <span className="text-sm">{form.error}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost flex-1"
                  disabled={form.isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={form.isLoading || !form.identifier.trim()}
                >
                  {form.isLoading ? (
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
          )}

          {/* Step 2: Validate Code */}
          {form.step === "validate" && (
            <form onSubmit={form.handleValidateCode} className="space-y-4">
              {/* Instructions */}
              <div className="bg-base-200 rounded-lg p-4">
                <p className="text-sm text-base-content/70">
                  We sent a verification code to{" "}
                  <span className="font-medium text-base-content">
                    {form.identifier}
                  </span>
                </p>
              </div>

              {/* Code Input */}
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium mb-2"
                >
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  value={form.verificationCode}
                  onChange={(e) => form.setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="input input-bordered w-full text-center text-lg tracking-wider"
                  maxLength={6}
                  required
                  disabled={form.isLoading}
                  autoFocus
                />
                <p className="text-xs text-base-content/60 mt-1 text-center">
                  {form.attemptsRemaining} attempts remaining
                </p>
              </div>

              {/* Error Message */}
              {form.error && (
                <div className="alert alert-error">
                  <span className="text-sm">{form.error}</span>
                </div>
              )}

              {/* Resend Code */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={form.handleResendCode}
                  className="btn btn-ghost btn-sm"
                  disabled={form.isLoading}
                >
                  Didn't receive code? Resend
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost flex-1"
                  disabled={form.isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={
                    form.isLoading ||
                    form.verificationCode.trim().length !== 6 ||
                    form.attemptsRemaining === 0
                  }
                >
                  {form.isLoading ? (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelModal;
