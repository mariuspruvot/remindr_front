/**
 * ChannelsList - Minimal and elegant channel display
 * Compact design with clear status
 */

import { Trash2, RefreshCw, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOutputIcon } from "../utils/reminder-helpers";
import type { Output } from "../types/reminder.types";

interface ChannelsListProps {
  channels: Output[];
  onDelete: (channelId: string) => void;
  onResendVerification: (channel: Output) => void;
}

export default function ChannelsList({
  channels,
  onDelete,
  onResendVerification,
}: ChannelsListProps) {
  if (channels.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No channels yet. Add one to start sending reminders.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {channels.map((channel) => {
        const Icon = getOutputIcon(channel.output_type);
        return (
          <div
            key={channel.id}
            className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
          >
            {/* Channel info - compact */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium capitalize truncate">
                    {channel.output_type}
                  </p>
                  {channel.confirmed ? (
                    <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {channel.identifier}
                </p>
              </div>
            </div>

            {/* Actions - appear on hover */}
            <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {!channel.confirmed && (
                <Button
                  onClick={() => onResendVerification(channel)}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  title="Resend code"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              )}
              <Button
                onClick={() => {
                  if (
                    window.confirm(`Delete ${channel.output_type} channel?`)
                  ) {
                    onDelete(channel.id);
                  }
                }}
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
