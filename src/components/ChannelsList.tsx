/**
 * Component for displaying and managing user's channels
 * Shows verification status and allows deletion
 */

import { Check, X, Trash2, RefreshCw } from "lucide-react";
import { getOutputIcon } from "../utils/reminder-helpers";
import type { Output } from "../types/reminder.types";

interface ChannelsListProps {
  channels: Output[];
  onDelete: (channelId: string) => void;
  onResendVerification: (channel: Output) => void;
}

function ChannelsList({
  channels,
  onDelete,
  onResendVerification,
}: ChannelsListProps) {
  if (channels.length === 0) {
    return (
      <div className="border border-base-300 rounded-xl p-12 bg-base-100 shadow-lg text-center">
        <p className="text-base-content/60 mb-1">No channels yet</p>
        <p className="text-sm text-base-content/40">
          Add a channel to start sending reminders
        </p>
      </div>
    );
  }

  return (
    <div className="border border-base-300 rounded-xl bg-base-100 shadow-lg divide-y divide-base-300">
      {channels.map((channel) => {
        const Icon = getOutputIcon(channel.output_type);
        return (
          <div
            key={channel.uuid}
            className="p-4 hover:bg-base-200/30 transition-colors flex items-center justify-between gap-4"
          >
            {/* Channel Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-base-200">
                <Icon className="w-5 h-5 text-base-content/70" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium capitalize">
                    {channel.output_type}
                  </p>
                  {channel.confirmed ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      <Check className="w-3 h-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                      <X className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                  {channel.primary && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-sm text-base-content/60 truncate">
                  {channel.identifier}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {!channel.confirmed && (
                <button
                  onClick={() => onResendVerification(channel)}
                  className="btn btn-ghost btn-sm btn-square"
                  aria-label="Resend verification"
                  title="Resend verification code"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete this ${channel.output_type} channel?`
                    )
                  ) {
                    onDelete(channel.uuid);
                  }
                }}
                className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                aria-label="Delete channel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChannelsList;
