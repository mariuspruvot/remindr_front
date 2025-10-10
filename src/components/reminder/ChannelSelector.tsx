/**
 * Channel selector component - Professional shadcn implementation
 * Multi-select interface for verified channels
 */

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import OutputChannels from "../OutputChannels";
import type { Output } from "../../types/reminder.types";

interface ChannelSelectorProps {
  channels: Output[];
  selectedIds: string[];
  onToggle: (channelId: string) => void;
  onAddChannel: () => void;
  disabled?: boolean;
}

export default function ChannelSelector({
  channels,
  selectedIds,
  onToggle,
  onAddChannel,
  disabled = false,
}: ChannelSelectorProps) {
  const verifiedChannels = channels.filter((ch) => ch.confirmed);

  if (verifiedChannels.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed p-6 text-center">
        <AlertCircle className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
        <p className="mb-4 text-sm text-muted-foreground">
          You don't have any verified channels yet.
          <br />
          Add and verify a channel to create reminders.
        </p>
        <Button type="button" size="sm" onClick={onAddChannel}>
          Add Channel
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {verifiedChannels.map((channel) => {
        const isSelected = selectedIds.includes(channel.id);
        const id = `channel-${channel.id}`;

        return (
          <Label
            key={channel.id}
            htmlFor={id}
            className={cn(
              "flex items-center gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-input hover:border-muted-foreground/50 hover:bg-accent",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Checkbox
              id={id}
              checked={isSelected}
              onCheckedChange={() => onToggle(channel.id)}
              disabled={disabled}
            />

            <div className="flex-1">
              <OutputChannels outputs={[channel]} variant="compact" />
            </div>

            {channel.primary && (
              <Badge variant="default" className="text-xs">
                Primary
              </Badge>
            )}
          </Label>
        );
      })}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onAddChannel}
        disabled={disabled}
        className="w-full"
      >
        + Add Another Channel
      </Button>
    </div>
  );
}
