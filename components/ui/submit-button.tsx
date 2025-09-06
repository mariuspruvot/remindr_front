/**
 * Submit Button Component
 *
 * A submit button that shows loading state during form submission.
 * Uses React's useFormStatus hook to automatically track form state.
 *
 * @component
 * @example
 * ```tsx
 * <SubmitButton />
 * ```
 */

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

/**
 * Submit button component with loading state
 *
 * Automatically shows loading state when form is being submitted.
 * Uses React's useFormStatus hook for optimal performance.
 *
 * @returns JSX button element with loading state
 */
export const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className='w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium'
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create reminder'}
    </Button>
  );
};
