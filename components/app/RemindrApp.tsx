'use client';

import React from 'react';
import { ReminderFormSSR } from '@/components/reminder/ReminderFormSSR';
import { UserButton } from '@clerk/nextjs';

export default function RemindrApp() {
    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-4'>
            <div className='w-full max-w-md space-y-8'>
                {/* Header with User Menu */}
                <div className='text-center space-y-2 relative'>
                    <div className='absolute top-0 right-0'>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8",
                                    userButtonPopoverCard: "bg-card border border-border shadow-lg",
                                    userButtonPopoverActionButton: "text-foreground hover:bg-secondary",
                                }
                            }}
                        />
                    </div>
                    <h1 className='text-3xl font-bold text-foreground tracking-tight'>
                        remindr.dev
                    </h1>
                    <p className='text-muted-foreground text-sm'>
                        Create a simple and effective reminder
                    </p>
                </div>

                {/* Form with Server Action. */}
                <ReminderFormSSR />

                {/* Footer */}
                <div className='text-center'>
                    <p className='text-xs text-muted-foreground'>Made with ☕</p>
                </div>
            </div>
        </div>
    );
} 