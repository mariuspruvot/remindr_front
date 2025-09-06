import type React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Remindr.dev - Simple Reminder Service',
  description:
    'Create simple and effective reminders with built-in URL shortener. Get notified via email at your scheduled time.',
  keywords: ['reminder', 'notification', 'url shortener', 'email'],
  authors: [{ name: 'Remindr Team' }],
  openGraph: {
    title: 'Remindr.dev - Simple Reminder Service',
    description: 'Create simple and effective reminders with built-in URL shortener',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
