/**
 * Date Shortcuts Component
 *
 * Provides quick date selection buttons for common future dates.
 * Follows Single Responsibility Principle - only handles date shortcuts.
 *
 * @component
 * @example
 * ```tsx
 * <DateShortcuts onDateSelect={(date) => setDate(date)} />
 * ```
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import type { DateShortcutsProps } from '@/lib/types/reminder';
import { getDateShortcut, formatDateTimeLocal } from '@/lib/utils/date';

/**
 * Date shortcuts component for quick date selection
 *
 * Provides buttons for common future dates (tomorrow, next week, next month).
 * Calculates dates relative to current time.
 *
 * @param onDateSelect - Callback function when a date is selected
 * @returns JSX element with date shortcut buttons
 */
export const DateShortcuts: React.FC<DateShortcutsProps> = ({ onDateSelect }) => {
  /**
   * Handle date shortcut selection
   * @param type - The type of date shortcut to apply
   */
  const handleDateShortcut = (type: 'tomorrow' | 'week' | 'month') => {
    const targetDateTime = getDateShortcut(type);
    const formattedDateTime = formatDateTimeLocal(targetDateTime);
    onDateSelect(formattedDateTime);
  };

  return (
    <div className='flex flex-row gap-2 mt-4 justify-center'>
      <Button
        type='button'
        onClick={() => handleDateShortcut('tomorrow')}
        variant='outline'
        size='sm'
        className='text-xs border-border text-card-foreground hover:bg-muted bg-transparent flex-1'
      >
        Tomorrow
      </Button>
      <Button
        type='button'
        onClick={() => handleDateShortcut('week')}
        variant='outline'
        size='sm'
        className='text-xs border-border text-card-foreground hover:bg-muted bg-transparent flex-1'
      >
        Next week
      </Button>
      <Button
        type='button'
        onClick={() => handleDateShortcut('month')}
        variant='outline'
        size='sm'
        className='text-xs border-border text-card-foreground hover:bg-muted bg-transparent flex-1'
      >
        Next month
      </Button>
    </div>
  );
};
