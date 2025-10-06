/**
 * Email channel configuration
 */

import { Mail } from "lucide-react";
import type { ChannelConfig } from "./types";

export const emailConfig: ChannelConfig = {
  type: "email",
  label: "Email",
  icon: Mail,
  placeholder: "you@example.com",
  helpText: "We'll send a verification code to this email address",
  validation: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
};
