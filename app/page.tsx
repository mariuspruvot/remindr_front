'use client';

import React from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { ReminderFormSSR } from '@/components/reminder/ReminderFormSSR';
import { UserButton, SignIn } from '@clerk/nextjs';

export default function Page() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center p-4'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-white tracking-tight'>
              remindr.dev
            </h1>
            <p className='text-gray-400 text-sm'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center p-4'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-white tracking-tight'>
              remindr.dev
            </h1>
            <p className='text-gray-400 text-sm'>
              Sign in to access your reminders
            </p>
          </div>

          <div className='flex justify-center'>
            <SignIn 
              routing="hash"
              afterSignInUrl="/"
            />
          </div>

          <div className='text-center'>
            <p className='text-xs text-gray-500'>Made with ☕</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center space-y-2 relative'>
          <div className='absolute top-0 right-0'>
            <UserButton />
          </div>
          <h1 className='text-3xl font-bold text-white tracking-tight'>
            remindr.dev
          </h1>
          <p className='text-gray-400 text-sm'>
            Create a simple and effective reminder
          </p>
        </div>

        <ReminderFormSSR userEmail={user?.emailAddresses?.[0]?.emailAddress} />

        <div className='text-center'>
          <p className='text-xs text-gray-500'>Made with ☕</p>
        </div>
      </div>
    </div>
  );
}
