/**
 * Channel selector component
 * Displays available channels and allows multi-selection
 *
 * Why a separate component?
 * - Reusable channel selection logic
 * - Single responsibility: manage channel selection UI
 * - Easier to add features (search, filter, etc.)
 * - Reduces parent component size
 */

import { AlertCircle } from "lucide-react";
import OutputChannels from "../OutputChannels";
import type { Output } from "../../types/reminder.types";

interface ChannelSelectorProps {
  channels: Output[];
  selectedIds: string[];
  onToggle: (channelId: string) => void;
  onAddChannel: () => void;
  disabled?: boolean;
}

/**
 * Renders channel selection interface
 * Shows verified channels with checkboxes
 *
 * @example
 * <ChannelSelector
 *   channels={verifiedChannels}
 *   selectedIds={form.selectedOutputIds}
 *   onToggle={form.toggleChannel}
 *   onAddChannel={openChannelModal}
 * />
 */
export default function ChannelSelector({
  channels,
  selectedIds,
  onToggle,
  onAddChannel,
  disabled = false,
}: ChannelSelectorProps) {
  // Filter only verified channels
  const verifiedChannels = channels.filter((ch) => ch.confirmed);

  // No channels available
  if (verifiedChannels.length === 0) {
    return (
      <div className="border-2 border-dashed border-base-300 rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-base-content/40" />
        <p className="text-sm text-base-content/70 mb-4">
          You don't have any verified channels yet.
          <br />
          Add and verify a channel to create reminders.
        </p>
        <button
          type="button"
          onClick={onAddChannel}
          className="btn btn-primary btn-sm"
        >
          Add Channel
        </button>
      </div>
    );
  }

  // Channels available - show selection
  return (
    <div className="space-y-3">
      {verifiedChannels.map((channel) => {
        const isSelected = selectedIds.includes(channel.id);

        return (
          <label
            key={channel.id}
            className={`
              flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-base-300 hover:border-base-400 hover:bg-base-200/50"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(channel.id)}
              disabled={disabled}
              className="checkbox checkbox-primary"
            />

            <div className="flex-1">
              <OutputChannels outputs={[channel]} variant="compact" />
            </div>

            {channel.primary && (
              <span className="badge badge-sm badge-primary">Primary</span>
            )}
          </label>
        );
      })}

      {/* Add more channels button */}
      <button
        type="button"
        onClick={onAddChannel}
        className="btn btn-ghost btn-sm w-full"
        disabled={disabled}
      >
        + Add Another Channel
      </button>
    </div>
  );
}
