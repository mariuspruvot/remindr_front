/**
 * Channels page - Full channel management
 * Shows all channels with verification status and actions
 */

import { Plus, Loader2 } from "lucide-react";
import ChannelsList from "../components/ChannelsList";
import { useOutputs, useDeleteOutput } from "../hooks/useOutputs";
import type { Output } from "../types/reminder.types";

interface ChannelsPageProps {
  onAddChannel: () => void;
  onResendVerification: (channel: Output) => void;
}

function ChannelsPage({
  onAddChannel,
  onResendVerification,
}: ChannelsPageProps) {
  const { data: channels, isLoading, error } = useOutputs();
  const deleteOutput = useDeleteOutput();

  const handleDelete = async (channelId: string) => {
    await deleteOutput.mutateAsync(channelId);
  };

  const verifiedCount = channels?.filter((ch) => ch.confirmed).length || 0;
  const pendingCount = channels?.filter((ch) => !ch.confirmed).length || 0;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-base-content mb-2">
            Channels
          </h1>
          <p className="text-base-content/60">
            {verifiedCount} verified, {pendingCount} pending
          </p>
        </div>
        <button onClick={onAddChannel} className="btn btn-primary gap-2">
          <Plus className="w-5 h-5" />
          Add Channel
        </button>
      </div>

      {/* Info Banner */}
      <div className="alert mb-6">
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
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>Failed to load channels. Please try again.</span>
        </div>
      )}

      {/* Channels List */}
      {channels && (
        <ChannelsList
          channels={channels}
          onDelete={handleDelete}
          onResendVerification={onResendVerification}
        />
      )}
    </div>
  );
}

export default ChannelsPage;
