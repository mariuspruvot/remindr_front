'use client';

import React, { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-4'>
            <div className='w-full max-w-md space-y-8'>
                {/* Header */}
                <div className='text-center space-y-2'>
                    <h1 className='text-3xl font-bold text-foreground tracking-tight'>
                        remindr.dev
                    </h1>
                    <p className='text-muted-foreground text-sm'>
                        {isSignUp
                            ? 'Create your account to start setting reminders'
                            : 'Sign in to access your reminders'
                        }
                    </p>
                </div>

                {/* Auth Form */}
                <div className='flex justify-center'>
                    {isSignUp ? (
                        <SignUp
                            routing="hash"
                            appearance={{
                                elements: {
                                    rootBox: "mx-auto",
                                    card: "bg-card border border-border shadow-lg",
                                    headerTitle: "text-foreground",
                                    headerSubtitle: "text-muted-foreground",
                                    socialButtonsBlockButton: "bg-secondary hover:bg-secondary/80 border border-border",
                                    socialButtonsBlockButtonText: "text-foreground",
                                    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                                    formFieldInput: "bg-background border border-border text-foreground",
                                    footerActionLink: "text-primary hover:text-primary/80",
                                }
                            }}
                            afterSignUpUrl="/"
                        />
                    ) : (
                        <SignIn
                            routing="hash"
                            appearance={{
                                elements: {
                                    rootBox: "mx-auto",
                                    card: "bg-card border border-border shadow-lg",
                                    headerTitle: "text-foreground",
                                    headerSubtitle: "text-muted-foreground",
                                    socialButtonsBlockButton: "bg-secondary hover:bg-secondary/80 border border-border",
                                    socialButtonsBlockButtonText: "text-foreground",
                                    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                                    formFieldInput: "bg-background border border-border text-foreground",
                                    footerActionLink: "text-primary hover:text-primary/80",
                                }
                            }}
                            afterSignInUrl="/"
                        />
                    )}
                </div>

                {/* Toggle */}
                <div className='text-center'>
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                        {isSignUp
                            ? 'Already have an account? Sign in'
                            : "Don't have an account? Sign up"
                        }
                    </button>
                </div>

                {/* Footer */}
                <div className='text-center'>
                    <p className='text-xs text-muted-foreground'>Made with ☕</p>
                </div>
            </div>
        </div>
    );
} 