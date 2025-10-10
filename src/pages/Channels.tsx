/**
 * Channels Page - Full channel management
 *
 * REFACTORED:
 * - Uses useModals() instead of prop callbacks
 * - Uses PageHeader, LoadingState, ErrorState components
 * - Cleaner and more maintainable
 */

import { Plus } from "lucide-react";
import { PageHeader, LoadingState, ErrorState } from "../components/common";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Channels"
        subtitle={`${verifiedCount} verified, ${pendingCount} pending`}
        action={
          <Button onClick={() => openChannelModal()} variant="secondary">
            <Plus className="h-4 w-4" />
            Add Channel
          </Button>
        }
      />

      {/* Info Banner */}
      <Alert className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <AlertDescription>
          Channels must be verified before you can use them for reminders. Check
          your email/phone for verification codes.
        </AlertDescription>
      </Alert>

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
