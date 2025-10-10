/**
 * ChannelModal - Professional modal using shadcn Dialog
 * Two-step flow: creation → validation
 */

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModals } from "../contexts/ModalContext";
import { useChannelForm } from "../hooks/useChannelForm";
import { ChannelCreationForm, ChannelValidationForm } from "./channels";

export default function ChannelModal() {
  const queryClient = useQueryClient();
  const { modals, closeChannelModal } = useModals();
  const { channelModal } = modals;

  const form = useChannelForm({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outputs"] });
    },
    onClose: closeChannelModal,
    existingChannel: channelModal.channel,
  });

  useEffect(() => {
    if (channelModal.isOpen) {
      form.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelModal.isOpen, channelModal.channel]);

  const modalTitle = form.step === "create" ? "Add Channel" : "Verify Channel";
  const modalDescription =
    form.step === "create"
      ? "Choose a channel type and provide the necessary details."
      : "Enter the verification code sent to your channel.";

  return (
    <Dialog open={channelModal.isOpen} onOpenChange={closeChannelModal}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}
