/**
 * Webhook channel configuration
 */

import { Link2 } from "lucide-react";
import type { ChannelConfig } from "./types";

export const webhookConfig: ChannelConfig = {
  type: "webhook",
  label: "Webhook",
  icon: Link2,
  placeholder: "https://your-webhook-url.com/endpoint",
  helpText: "URL where we'll send POST requests with reminder data",
  validation: {
    regex: /^https?:\/\/.+/,
    message: "Please enter a valid URL starting with http:// or https://",
    validator: (value: string) => {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },
  },
};
