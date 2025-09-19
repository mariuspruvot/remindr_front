/**
 * Server-side wrapper for ReminderForm
 * Properly separates server and client concerns
 */

import React from 'react';
import { ReminderFormClient } from './ReminderFormClient';
import { createReminderAction } from '@/lib/actions/reminder';

interface ReminderFormSSRProps {
  userEmail?: string;
}

/**
 * Server-side form component
 * No 'use client' directive - this runs on the server
 */
export const ReminderFormSSR: React.FC<ReminderFormSSRProps> = ({ userEmail }) => {
  return <ReminderFormClient action={createReminderAction} initialEmail={userEmail} />;
};
