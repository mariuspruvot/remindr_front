/**
 * Custom hook for channel creation and validation form
 *
 * Why this hook?
 * - Separates two-step flow logic from UI
 * - Makes the channel creation process reusable
 * - Reduces ChannelModal from 352 lines to ~150 lines
 * - Easier to test the creation/validation flow
 *
 * Single Responsibility: Manage channel creation and validation flow
 */

import { useState, useEffect } from "react";
import {
  useCreateOutput,
  useValidateOutput,
  useResendVerification,
} from "./useOutputs";
import { getErrorMessage } from "../utils/errorHandler";
import type {
  OutputType,
  OutputCreateRequest,
  Output,
} from "../types/reminder.types";

type Step = "create" | "validate";

interface UseChannelFormProps {
  onSuccess: () => void;
  onClose: () => void;
  existingChannel?: Output | null;
}

interface UseChannelFormReturn {
  // Step management
  step: Step;

  // Form state
  selectedType: OutputType;
  setSelectedType: (type: OutputType) => void;
  identifier: string;
  setIdentifier: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;

  // UI state
  isLoading: boolean;
  error: string | null;
  attemptsRemaining: number;
  outputUuid: string | null;

  // Actions
  handleCreateChannel: (e: React.FormEvent) => Promise<void>;
  handleValidateCode: (e: React.FormEvent) => Promise<void>;
  handleResendCode: () => Promise<void>;
  resetForm: () => void;
}

/**
 * Hook to manage channel creation and validation flow
 *
 * Flow:
 * 1. User selects type and enters identifier (email/phone)
 * 2. Backend sends verification code
 * 3. User enters code to validate
 *
 * @example
 * function ChannelModal(props) {
 *   const form = useChannelForm({
 *     isOpen: props.isOpen,
 *     onSuccess: props.onSuccess,
 *     onClose: props.onClose,
 *   });
 *
 *   if (form.step === "create") {
 *     return <CreateChannelForm form={form} />;
 *   }
 *
 *   return <ValidateChannelForm form={form} />;
 * }
 */
export const useChannelForm = ({
  onSuccess,
  onClose,
  existingChannel,
}: UseChannelFormProps): UseChannelFormReturn => {
  // React Query mutations
  const createMutation = useCreateOutput();
  const validateMutation = useValidateOutput();
  const resendMutation = useResendVerification();

  // Step management (initialize based on existingChannel)
  const [step, setStep] = useState<Step>("create");

  // Form state
  const [selectedType, setSelectedType] = useState<OutputType>("email");
  const [identifier, setIdentifier] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [outputUuid, setOutputUuid] = useState<string | null>(null);
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);

  /**
   * Initialize state based on existingChannel
   * Only runs once when the hook is created
   */
  useEffect(() => {
    if (existingChannel) {
      setStep("validate");
      setSelectedType(existingChannel.output_type);
      setIdentifier(existingChannel.identifier);
      setOutputUuid(existingChannel.uuid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps = only on mount

  /**
   * Reset form to initial state
   * Called when modal opens or after successful completion
   */
  const resetForm = () => {
    setStep(existingChannel ? "validate" : "create");
    setSelectedType(existingChannel?.output_type || "email");
    setIdentifier(existingChannel?.identifier || "");
    setVerificationCode("");
    setOutputUuid(existingChannel?.uuid || null);
    setError(null);
    setAttemptsRemaining(3);
  };

  /**
   * Handle channel creation (Step 1)
   * Creates the output and sends verification code
   */
  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data: OutputCreateRequest = {
        output_type: selectedType,
        identifier: identifier.trim(),
      };

      const result = await createMutation.mutateAsync(data);

      // Store the output UUID for validation step
      setOutputUuid(result.uuid);
      setStep("validate");

      // Toast notification is shown by mutation's onSuccess
    } catch (err) {
      setError(
        getErrorMessage(err, "Failed to create channel. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle code validation (Step 2)
   * Validates the verification code entered by user
   */
  const handleValidateCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!outputUuid) {
      setError("No output UUID found. Please try creating the channel again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await validateMutation.mutateAsync({
        uuid: outputUuid,
        code: verificationCode.trim(),
      });

      if (result.success && result.confirmed) {
        // Toast is shown by mutation's onSuccess
        // Trigger parent refresh (invalidates cache) and close modal
        onSuccess();
        onClose();
        resetForm();
      } else {
        setAttemptsRemaining((prev) => prev - 1);
        setError(
          result.message ||
            `Invalid code. ${attemptsRemaining - 1} attempts remaining.`
        );
      }
    } catch (err) {
      setError(getErrorMessage(err, "Validation failed. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resend verification code
   * Called when user clicks "Resend Code" button
   */
  const handleResendCode = async () => {
    if (!outputUuid) return;

    setIsLoading(true);
    setError(null);

    try {
      await resendMutation.mutateAsync(outputUuid);
      // Toast is shown by mutation's onSuccess
      setAttemptsRemaining(3); // Reset attempts
    } catch (err) {
      setError(
        getErrorMessage(err, "Failed to resend code. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Step management
    step,

    // Form state
    selectedType,
    setSelectedType,
    identifier,
    setIdentifier,
    verificationCode,
    setVerificationCode,

    // UI state
    isLoading,
    error,
    attemptsRemaining,
    outputUuid,

    // Actions
    handleCreateChannel,
    handleValidateCode,
    handleResendCode,
    resetForm,
  };
};
