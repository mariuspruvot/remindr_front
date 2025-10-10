/**
 * Component for displaying and managing user's channels
 * Shows verification status and allows deletion
 */

import { Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-1">No channels yet</p>
        <p className="text-sm text-muted-foreground/60">
          Add a channel to start sending reminders
        </p>
      </Card>
    );
  }

  return (
    <Card className="divide-y">
      {channels.map((channel) => {
        const Icon = getOutputIcon(channel.output_type);
        return (
          <div
            key={channel.id}
            className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between gap-4"
          >
            {/* Channel Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-muted">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium capitalize">
                    {channel.output_type}
                  </p>
                  {channel.confirmed ? (
                    <Badge variant="default" className="text-xs">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Pending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {channel.identifier}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {!channel.confirmed && (
                <Button
                  onClick={() => onResendVerification(channel)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Resend verification"
                  title="Resend verification code"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete this ${channel.output_type} channel?`
                    )
                  ) {
                    onDelete(channel.id);
                  }
                }}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                aria-label="Delete channel"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export default ChannelsList;
