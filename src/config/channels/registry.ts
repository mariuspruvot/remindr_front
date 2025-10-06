/**
 * Channel Registry
 * Central configuration for all channel types
 *
 * To add a new channel:
 * 1. Create a new config file (e.g., slack.config.ts)
 * 2. Import it here
 * 3. Add it to CHANNEL_REGISTRY
 * That's it! Everything else is automatic.
 */

import type { ChannelRegistry } from "./types";
import type { OutputType } from "../../types/reminder.types";
import { emailConfig } from "./email.config";
import { whatsappConfig } from "./whatsapp.config";
import { telegramConfig } from "./telegram.config";
import { webhookConfig } from "./webhook.config";

export const CHANNEL_REGISTRY: ChannelRegistry = {
  email: emailConfig,
  whatsapp: whatsappConfig,
  telegram: telegramConfig,
  webhook: webhookConfig,
};

/**
 * Get configuration for a specific channel type
 */
export const getChannelConfig = (type: OutputType) => CHANNEL_REGISTRY[type];

/**
 * Get all available channel types
 */
export const getAllChannelTypes = () =>
  Object.keys(CHANNEL_REGISTRY) as OutputType[];

/**
 * Check if a channel type exists
 */
export const isValidChannelType = (type: string): type is OutputType =>
  type in CHANNEL_REGISTRY;
