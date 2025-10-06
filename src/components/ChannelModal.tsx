/**
 * ChannelModal - Modal for creating and validating channels
 *
 * REFACTORED v2: Now uses Channel Registry System
 *
 * Changes:
 * - Uses ModalContext and generic Modal component
 * - Decomposed into smaller, focused components
 * - Uses Channel Registry for automatic configuration
 * - Business logic in useChannelForm hook
 *
 * Result: Much cleaner, easier to maintain, extensible
 */

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "./common/Modal";
import { useModals } from "../contexts/ModalContext";
import { useChannelForm } from "../hooks/useChannelForm";
import { ChannelCreationForm, ChannelValidationForm } from "./channels";

function ChannelModal() {
  const queryClient = useQueryClient();
  const { modals, closeChannelModal } = useModals();
  const { channelModal } = modals;

  // Custom hook for form logic
  const form = useChannelForm({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outputs"] });
    },
    onClose: closeChannelModal,
    existingChannel: channelModal.channel,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (channelModal.isOpen) {
      form.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelModal.isOpen, channelModal.channel]);

  const modalTitle = form.step === "create" ? "Add Channel" : "Verify Channel";

  return (
    <Modal
      isOpen={channelModal.isOpen}
      onClose={closeChannelModal}
      title={modalTitle}
      maxWidth="sm"
    >
      {/* Step 1: Create Channel */}
      {form.step === "create" && (
        <ChannelCreationForm
          selectedType={form.selectedType}
          identifier={form.identifier}
          error={form.error}
          isLoading={form.isLoading}
          onTypeChange={form.setSelectedType}
          onIdentifierChange={form.setIdentifier}
          onSubmit={form.handleCreateChannel}
          onCancel={closeChannelModal}
        />
      )}

      {/* Step 2: Validate Code */}
      {form.step === "validate" && (
        <ChannelValidationForm
          identifier={form.identifier}
          verificationCode={form.verificationCode}
          error={form.error}
          isLoading={form.isLoading}
          attemptsRemaining={form.attemptsRemaining}
          onCodeChange={form.setVerificationCode}
          onSubmit={form.handleValidateCode}
          onResend={form.handleResendCode}
          onCancel={closeChannelModal}
        />
      )}
    </Modal>
  );
}

export default ChannelModal;
