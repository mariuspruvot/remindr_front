/**
 * ReminderForm component following Open/Closed Principle
 * Open for extension, closed for modification
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ClipboardIcon } from 'lucide-react';
import { useReminderForm } from '@/hooks/use-reminder-form';
import type { FormData } from '@/lib/types';

interface ReminderFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const {
    formData,
    errors,
    updateField,
    setDateShortcut,
    pasteFromClipboard,
    validateForm,
  } = useReminderForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <Card className='p-6 space-y-6 border-border bg-card'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Error Display */}
        {errors.length > 0 && (
          <div className='p-3 bg-destructive/10 border border-destructive/20 rounded-md'>
            <ul className='text-sm text-destructive space-y-1'>
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Link Input */}
        <div className='space-y-2'>
          <Label htmlFor='link' className='text-sm font-medium text-card-foreground'>
            Link to remind
          </Label>
          <div className='relative'>
            <Input
              id='link'
              type='url'
              placeholder='https://example.com'
              value={formData.link}
              onChange={e => updateField('link', e.target.value)}
              className='bg-input border-border focus:ring-ring pr-12'
              required
            />
            <button
              type='button'
              onClick={pasteFromClipboard}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors'
              title='Paste from clipboard'
            >
              <ClipboardIcon className='h-4 w-4' />
            </button>
          </div>
        </div>

        {/* Message Input */}
        <div className='space-y-2'>
          <Label htmlFor='message' className='text-sm font-medium text-card-foreground'>
            Reminder message
          </Label>
          <Textarea
            id='message'
            placeholder="Don't forget to..."
            value={formData.message}
            onChange={e => updateField('message', e.target.value)}
            className='bg-input border-border focus:ring-ring min-h-[80px] resize-none'
            required
          />
        </div>

        {/* Contact Input */}
        <div className='space-y-2'>
          <Label htmlFor='contact' className='text-sm font-medium text-card-foreground'>
            Email address
          </Label>
          <Input
            id='contact'
            type='email'
            placeholder='your@email.com'
            value={formData.contact}
            onChange={e => updateField('contact', e.target.value)}
            className='bg-input border-border focus:ring-ring'
            required
          />
        </div>

        {/* DateTime Input */}
        <div className='space-y-2'>
          <Label
            htmlFor='datetime'
            className='text-sm font-medium text-card-foreground'
          >
            Reminder date and time
          </Label>
          <Input
            id='datetime'
            type='datetime-local'
            value={formData.datetime}
            onChange={e => updateField('datetime', e.target.value)}
            className='bg-input border-border focus:ring-ring'
            required
          />
          <div className='flex flex-row gap-2 mt-4 justify-center'>
            <Button
              type='button'
              onClick={() => setDateShortcut('tomorrow')}
              variant='outline'
              size='sm'
              className='text-xs border-border text-card-foreground hover:bg-muted bg-transparent flex-1'
            >
              Tomorrow
            </Button>
            <Button
              type='button'
              onClick={() => setDateShortcut('week')}
              variant='outline'
              size='sm'
              className='text-xs border-border text-card-foreground hover:bg-muted bg-transparent flex-1'
            >
              Next week
            </Button>
            <Button
              type='button'
              onClick={() => setDateShortcut('month')}
              variant='outline'
              size='sm'
              className='text-xs border-border text-card-foreground hover:bg-muted bg-transparent flex-1'
            >
              Next month
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          className='w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create reminder'}
        </Button>
      </form>
    </Card>
  );
};
