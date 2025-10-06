/**
 * Channel configuration types
 * Defines the structure for channel configurations
 */

import type { LucideIcon } from "lucide-react";
import type { OutputType } from "../../types/reminder.types";

export interface ChannelValidation {
  regex: RegExp;
  message: string;
  validator?: (value: string) => boolean;
}

export interface ChannelConfig {
  type: OutputType;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  helpText: string;
  validation: ChannelValidation;
}

export type ChannelRegistry = Record<OutputType, ChannelConfig>;
