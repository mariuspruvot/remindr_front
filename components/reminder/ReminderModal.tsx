/**
 * ReminderModal component following Single Responsibility Principle
 * Handles only modal display logic
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import type { ModalState } from '@/lib/types';

interface ReminderModalProps {
  modalState: ModalState;
  onClose: () => void;
  onCreateAnother?: () => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  modalState,
  onClose,
  onCreateAnother,
}) => {
  if (!modalState.isOpen) return null;

  const isSuccess = modalState.type === 'success';
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <Card className='p-6 max-w-sm w-full space-y-4 bg-card border-border'>
        <div className='text-center space-y-2'>
          <div className='flex justify-center'>
            <Icon
              className={`h-8 w-8 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}
            />
          </div>
          <h3 className='text-lg font-semibold text-card-foreground'>
            {isSuccess ? 'Reminder Created!' : 'Something went wrong'}
          </h3>
          <p className='text-sm text-muted-foreground'>
            {isSuccess
              ? 'Your reminder has been successfully created and will be sent at the specified time.'
              : 'There was an error creating your reminder. Please try again.'}
          </p>
        </div>

        <div className='space-y-2'>
          {isSuccess && onCreateAnother && (
            <Button
              onClick={onCreateAnother}
              className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
            >
              Create another reminder
            </Button>
          )}
          <Button
            onClick={onClose}
            variant='outline'
            className='w-full border-border text-card-foreground hover:bg-muted bg-transparent'
          >
            {isSuccess ? 'Close' : 'Try again'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
