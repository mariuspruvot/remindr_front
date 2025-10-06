/**
 * WhatsApp channel configuration
 */

import { MessageCircle } from "lucide-react";
import type { ChannelConfig } from "./types";

export const whatsappConfig: ChannelConfig = {
  type: "whatsapp",
  label: "WhatsApp",
  icon: MessageCircle,
  placeholder: "+1234567890",
  helpText: "Include country code (e.g., +1 for US, +33 for France)",
  validation: {
    regex: /^\+[1-9]\d{1,14}$/,
    message: "Please enter a valid phone number with country code",
    validator: (value: string) => {
      // Additional validation: must start with + and be 8-15 digits total
      const digits = value.replace(/\D/g, "");
      return digits.length >= 8 && digits.length <= 15;
    },
  },
};
