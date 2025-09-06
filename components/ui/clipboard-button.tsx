/**
 * Clipboard Button Component
 *
 * A button that allows users to paste content from their clipboard.
 * Follows Single Responsibility Principle - only handles clipboard operations.
 *
 * @component
 * @example
 * ```tsx
 * <ClipboardButton onPaste={(text) => setValue(text)} />
 * ```
 */

import React from 'react';
import { ClipboardIcon } from 'lucide-react';
import type { ClipboardButtonProps } from '@/lib/types/reminder';

/**
 * Clipboard paste button component
 *
 * Provides a button to paste content from the user's clipboard.
 * Handles clipboard API errors gracefully.
 *
 * @param onPaste - Callback function when text is pasted from clipboard
 * @returns JSX button element for clipboard operations
 */
export const ClipboardButton: React.FC<ClipboardButtonProps> = ({ onPaste }) => {
  /**
   * Handle clipboard paste operation
   * Attempts to read text from clipboard and calls onPaste callback
   */
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onPaste(text);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
      // Could show a toast notification here in a real app
    }
  };

  return (
    <button
      type='button'
      onClick={handlePasteFromClipboard}
      className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors'
      title='Paste from clipboard'
      aria-label='Paste from clipboard'
    >
      <ClipboardIcon className='h-4 w-4' />
    </button>
  );
};
