/**
 * Main Remindr application component with Server-Side Rendering
 * Following Single Responsibility Principle - orchestrates form and modal
 */

import React from 'react';
import { ReminderFormSSR } from '@/components/reminder/ReminderFormSSR';
import { createReminderAction } from '@/lib/actions/reminder';

export default function RemindrApp() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* Header */}
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold text-foreground tracking-tight'>
            remindr.dev
          </h1>
          <p className='text-muted-foreground text-sm'>
            Create a simple and effective reminder
          </p>
        </div>

        {/* Form with Server Action */}
        <ReminderFormSSR action={createReminderAction} />

        {/* Footer */}
        <div className='text-center'>
          <p className='text-xs text-muted-foreground'>Made with ☕</p>
        </div>
      </div>
    </div>
  );
}
