'use client';

import React from 'react';
import { useAuth } from '@clerk/nextjs';
import AuthPage from '@/components/auth/AuthPage';
import RemindrApp from '@/components/app/RemindrApp';

export default function Page() {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-foreground tracking-tight'>
              remindr.dev
            </h1>
            <p className='text-muted-foreground text-sm'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show auth page if user is not signed in
  if (!isSignedIn) {
    return <AuthPage />;
  }

  // Show main app if user is signed in
  return <RemindrApp />;
}
