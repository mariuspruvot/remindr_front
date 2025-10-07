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
          <button
            onClick={() => openChannelModal()}
            className="btn bg-base-300 rounded-lg border-none hover:bg-neutral/30 shadow-xl hover:shadow-2xl gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Channel
          </button>
        }
      />

      {/* Info Banner */}
      <div className="alert mb-6 shadow-md bg-base-200/60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm">
          Channels must be verified before you can use them for reminders. Check
          your email/phone for verification codes.
        </span>
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
