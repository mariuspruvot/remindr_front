/**
 * Reusable component to display output channels
 * Shows icons for each channel type with verification status
 */

import { Check } from "lucide-react";
import { getOutputIcon } from "../utils/reminder-helpers";
import type { Output } from "../types/reminder.types";

interface OutputChannelsProps {
  outputs: Output[];
  variant?: "compact" | "detailed";
}

function OutputChannels({ outputs, variant = "compact" }: OutputChannelsProps) {
  if (variant === "compact") {
    // Compact view for tables - just icons
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {outputs.map((output) => {
          const Icon = getOutputIcon(output.output_type);
          return (
            <div
              key={output.id}
              className="inline-flex items-center gap-1 text-base-content/70"
              title={`${output.output_type}${
                output.confirmed ? " (verified)" : ""
              }`}
            >
              <Icon className="w-4 h-4" />
              {output.confirmed && <Check className="w-3 h-3 text-success" />}
            </div>
          );
        })}
      </div>
    );
  }

  // Detailed view for cards - badges with labels
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {outputs.map((output) => {
        const Icon = getOutputIcon(output.output_type);
        return (
          <div
            key={output.id}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-base-300 bg-base-100 text-base-content/70"
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{output.output_type}</span>
            {output.confirmed && <Check className="w-3 h-3 text-success" />}
          </div>
        );
      })}
    </div>
  );
}

export default OutputChannels;
