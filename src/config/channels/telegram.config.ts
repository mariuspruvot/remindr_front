/**
 * Telegram channel configuration
 */

import { Send } from "lucide-react";
import type { ChannelConfig } from "./types";

export const telegramConfig: ChannelConfig = {
  type: "telegram",
  label: "Telegram",
  icon: Send,
  placeholder: "@username or phone number",
  helpText: "Your Telegram username (with @) or phone number",
  validation: {
    regex: /^(@[a-zA-Z0-9_]{5,32}|\+[1-9]\d{1,14})$/,
    message: "Please enter a valid Telegram username or phone number",
  },
};
