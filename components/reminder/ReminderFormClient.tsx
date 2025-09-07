/**
 * Reminder Form Client Component
 *
 * Client-side form component that handles user interactions and form state.
 * Uses React's useActionState hook for server action integration.
 * Follows clean code principles with clear separation of concerns.
 *
 * Architecture:
 * - Uses custom hook for form state management
 * - Composes smaller, focused UI components
 * - Handles client-side interactions only
 * - Integrates with server actions for form submission
 *
 * @component
 * @example
 * ```tsx
 * <ReminderFormClient action={createReminderAction} />
 * ```
 */

'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { StatusMessage } from '@/components/ui/status-message';
import { SubmitButton } from '@/components/ui/submit-button';
import { DateShortcuts } from '@/components/ui/date-shortcuts';
import { ClipboardButton } from '@/components/ui/clipboard-button';
import { useReminderForm } from '@/hooks/use-reminder-form';
import type { FormComponentProps } from '@/lib/types/reminder';

/**
 * Client-side reminder form component
 *
 * Handles form state, user interactions, and integrates with server actions.
 * Automatically resets form on successful submission.
 *
 * @param action - Server action function to handle form submission
 * @returns JSX form element with all form fields and interactions
 */
export const ReminderFormClient: React.FC<FormComponentProps> = ({ action }) => {
  // Server action state management
  const [state, formAction] = useActionState(action, { success: false });

  // Form state management using custom hook
  const { formData, updateField, resetForm } = useReminderForm();

  /**
   * Reset form when server action succeeds
   * Automatically clears form data after successful submission
   */
  useEffect(() => {
    if (state.success) {
      resetForm();
    }
  }, [state.success, resetForm]);

  /**
   * Handle date selection from shortcuts
   * @param date - Selected date string
   */
  const handleDateSelect = (date: string) => {
    updateField('datetime', date);
  };

  /**
   * Handle clipboard paste for link field
   * @param text - Pasted text from clipboard
   */
  const handleClipboardPaste = (text: string) => {
    updateField('link', text);
  };

  return (
    <Card className='p-6 space-y-6 border-border bg-card'>
      {/* Status Message - Shows success/error from server action */}
      <StatusMessage result={state} />

      {/* Form with server action integration */}
      <form action={formAction} className='space-y-4'>
        {/* Link Input Field */}
        <div className='space-y-2'>
          <Label htmlFor='link' className='text-sm font-medium text-card-foreground'>
            Link to remind
          </Label>
          <div className='relative'>
            <Input
              id='link'
              name='link'
              type='url'
              placeholder='https://example.com'
              value={formData.link}
              onChange={e => updateField('link', e.target.value)}
              className='bg-input border-border focus:ring-ring pr-12'
            />
            <ClipboardButton onPaste={handleClipboardPaste} />
          </div>
        </div>

        {/* Message Input Field */}
        <div className='space-y-2'>
          <Label htmlFor='message' className='text-sm font-medium text-card-foreground'>
            Reminder message
          </Label>
          <Textarea
            id='message'
            name='message'
            placeholder="Don't forget to..."
            value={formData.message}
            onChange={e => updateField('message', e.target.value)}
            className='bg-input border-border focus:ring-ring min-h-[80px] resize-none'
            required
          />
        </div>

        {/* Contact Input Field */}
        <div className='space-y-2'>
          <Label htmlFor='contact' className='text-sm font-medium text-card-foreground'>
            Email address
          </Label>
          <Input
            id='contact'
            name='contact'
            type='email'
            placeholder='your@email.com'
            value={formData.contact}
            onChange={e => updateField('contact', e.target.value)}
            className='bg-input border-border focus:ring-ring'
            required
          />
        </div>

        {/* Date/Time Input Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='datetime'
            className='text-sm font-medium text-card-foreground'
          >
            Reminder date and time
          </Label>
          <Input
            id='datetime'
            name='datetime'
            type='datetime-local'
            value={formData.datetime}
            onChange={e => updateField('datetime', e.target.value)}
            className='bg-input border-border focus:ring-ring'
            required
          />
          {/* Hidden field with client timezone */}
          <input
            type='hidden'
            name='timezone'
            value={Intl.DateTimeFormat().resolvedOptions().timeZone}
          />
          <DateShortcuts onDateSelect={handleDateSelect} />
        </div>

        {/* Submit Button */}
        <SubmitButton />
      </form>
    </Card>
  );
};
