/**
 * Channels Page - Clean and minimal
 * Elegant list with subtle info banner
 */

import { Plus, Info } from "lucide-react";
import { PageHeader, LoadingState, ErrorState } from "../components/common";
import { Button } from "@/components/ui/button";
import ChannelsList from "../components/ChannelsList";
import { useOutputs, useDeleteOutput } from "../hooks/useOutputs";
import { useModals } from "../contexts/ModalContext";

function ChannelsPage() {
  const { openChannelModal } = useModals();
  const { data: channels, isLoading, error } = useOutputs();
  const deleteOutput = useDeleteOutput();

  const handleDelete = async (channelId: string) => {
    await deleteOutput.mutateAsync(channelId);
  };

  const verifiedCount = channels?.filter((ch) => ch.confirmed).length || 0;
  const pendingCount = channels?.filter((ch) => !ch.confirmed).length || 0;

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-8">
      <PageHeader
        title="Channels"
        subtitle={`${verifiedCount} verified • ${pendingCount} pending`}
        action={
          <Button onClick={() => openChannelModal()} size="sm">
            <Plus className="h-4 w-4" />
            Add channel
          </Button>
        }
      />

      {/* Info banner - subtle */}
      <div className="mb-6 flex gap-3 rounded-lg border bg-muted/50 p-3 text-sm">
        <Info className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
        <p className="text-muted-foreground">
          Channels must be verified before you can use them for reminders.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingState size="lg" />}

      {/* Error State */}
      {error && (
        <ErrorState message="Failed to load channels. Please try again." />
      )}

      {/* Channels List */}
      {channels && (
        <ChannelsList
          channels={channels}
          onDelete={handleDelete}
          onResendVerification={(channel) => openChannelModal(channel)}
        />
      )}
    </div>
  );
}

export default ChannelsPage;
