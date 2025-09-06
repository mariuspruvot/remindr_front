/**
 * Status Message Component
 *
 * Displays success or error messages from server actions.
 * Follows Single Responsibility Principle - only handles status display.
 *
 * @component
 * @example
 * ```tsx
 * <StatusMessage result={{ success: true, message: "Reminder created!" }} />
 * ```
 */

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { StatusMessageProps } from '@/lib/types/reminder';

/**
 * Status message component for displaying action results
 *
 * @param result - The result from a server action (success/error state)
 * @returns JSX element or null if no message to display
 */
export const StatusMessage: React.FC<StatusMessageProps> = ({ result }) => {
  // Don't render anything if no result or no meaningful content
  if (!result) return null;

  // Don't show anything if no action has been performed yet
  if (
    !result.success &&
    !result.message &&
    (!result.errors || result.errors.length === 0)
  ) {
    return null;
  }

  // Render success message
  if (result.success) {
    return (
      <div className='p-4 bg-green-50 border border-green-200 rounded-md'>
        <div className='flex items-center space-x-2'>
          <CheckCircle className='h-5 w-5 text-green-600' />
          <p className='text-sm text-green-800'>{result.message}</p>
        </div>
      </div>
    );
  }

  // Render error message
  return (
    <div className='p-4 bg-red-50 border border-red-200 rounded-md'>
      <div className='flex items-center space-x-2 mb-2'>
        <XCircle className='h-5 w-5 text-red-600' />
        <p className='text-sm text-red-800'>{result.message}</p>
      </div>
      {result.errors && result.errors.length > 0 && (
        <ul className='text-sm text-red-700 space-y-1'>
          {result.errors.map((error, index) => (
            <li key={index}>• {error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
