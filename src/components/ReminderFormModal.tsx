/**
 * ReminderFormModal - Professional modal using shadcn Dialog
 * Clean, accessible form with proper labeling and error states
 */

import { Calendar, Link2, Loader2, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useModals } from "../contexts/ModalContext";
import { useOutputs } from "../hooks/useOutputs";
import { useReminderForm } from "../hooks/useReminderForm";
import { getMinScheduleTime } from "../utils/dateHelpers";
import QuickScheduleButtons from "./reminder/QuickScheduleButtons";
import ChannelSelector from "./reminder/ChannelSelector";

export default function ReminderFormModal() {
  const queryClient = useQueryClient();
  const { modals, closeReminderModal, openChannelModal } = useModals();
  const { reminderModal } = modals;
  const { data: availableChannels = [] } = useOutputs();

  const mode = reminderModal.reminder ? "edit" : "create";

  const form = useReminderForm({
    mode,
    reminder: reminderModal.reminder,
    initialDate: reminderModal.initialDate,
    isOpen: reminderModal.isOpen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onClose: closeReminderModal,
  });

  return (
    <Dialog open={reminderModal.isOpen} onOpenChange={closeReminderModal}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Reminder" : "Edit Reminder"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Schedule a new reminder to be sent at a specific time."
              : "Update your reminder details and schedule."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit} className="space-y-5">
          {/* Error Alert */}
          {form.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{form.error}</AlertDescription>
            </Alert>
          )}

          {/* Reminder Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Reminder Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              value={form.reminderText}
              onChange={(e) => form.setReminderText(e.target.value)}
              placeholder="Don't forget to..."
              className="resize-none h-24"
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {form.reminderText.length}/500
            </p>
          </div>

          {/* Target URL (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="url">Link (Optional)</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                value={form.targetUrl}
                onChange={(e) => form.setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="pl-9"
              />
            </div>
          </div>

          {/* Scheduled Date & Time */}
          <div className="space-y-2">
            <Label htmlFor="datetime">
              When to send <span className="text-destructive">*</span>
            </Label>

            {/* Quick schedule buttons */}
            <div className="mb-2">
              <QuickScheduleButtons
                onSchedule={form.handleQuickSchedule}
                disabled={form.isLoading}
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="datetime"
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => form.setScheduledAt(e.target.value)}
                min={getMinScheduleTime()}
                className="pl-9"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Schedule for at least 1 minute in the future
            </p>
          </div>

          {/* Channel Selection */}
          <div className="space-y-2">
            <Label>
              Send to <span className="text-destructive">*</span>
            </Label>
            <ChannelSelector
              channels={availableChannels}
              selectedIds={form.selectedOutputIds}
              onToggle={form.toggleChannel}
              onAddChannel={() => openChannelModal()}
              disabled={form.isLoading}
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={closeReminderModal}
              disabled={form.isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                form.isLoading ||
                form.reminderText.trim().length === 0 ||
                !form.scheduledAt ||
                form.selectedOutputIds.length === 0
              }
            >
              {form.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : mode === "create" ? (
                "Create Reminder"
              ) : (
                "Update Reminder"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
