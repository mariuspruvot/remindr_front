/**
 * OutputChannels component - Professional shadcn implementation
 * Displays channel icons with verification status
 */

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getOutputIcon } from "../utils/reminder-helpers";
import type { Output } from "../types/reminder.types";

interface OutputChannelsProps {
  outputs: Output[];
  variant?: "compact" | "detailed";
}

export default function OutputChannels({
  outputs,
  variant = "compact",
}: OutputChannelsProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {outputs.map((output) => {
          const Icon = getOutputIcon(output.output_type);
          return (
            <div
              key={output.id}
              className="inline-flex items-center gap-2 text-muted-foreground"
              title={`${output.output_type}${
                output.confirmed ? " (verified)" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{output.identifier}</span>
              {output.confirmed && (
                <Check className="h-3 w-3 text-green-600 dark:text-green-500" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {outputs.map((output) => {
        const Icon = getOutputIcon(output.output_type);
        return (
          <Badge key={output.id} variant="outline" className="gap-1.5">
            <Icon className="h-3.5 w-3.5" />
            <span>{output.output_type}</span>
            {output.confirmed && (
              <Check className="h-3 w-3 text-green-600 dark:text-green-500" />
            )}
          </Badge>
        );
      })}
    </div>
  );
}
