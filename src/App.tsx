/**
 * Main App component with routing
 * Handles authentication flow and route protection
 */

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import { setAuthTokenGetter } from "./lib/api";
import MainLayout from "./layouts/MainLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import RemindersPage from "./pages/Reminders";
import ChannelsPage from "./pages/Channels";
import SettingsPage from "./pages/Settings";
import type { Output, Reminder } from "./types/reminder.types";

function App() {
  const { getToken } = useAuth();
  const location = useLocation();
  const [reminderEditTrigger, setReminderEditTrigger] = useState<{
    trigger: number;
    reminder: Reminder;
  } | null>(null);
  const [channelModalTrigger, setChannelModalTrigger] = useState(0);
  const [reminderModalTrigger, setReminderModalTrigger] = useState(0);
  const [channelToValidate, setChannelToValidate] = useState<Output | null>(
    null
  );

  // Configure API token getter with Clerk's getToken
  useEffect(() => {
    setAuthTokenGetter(getToken);
  }, [getToken]);

  // Reset modal triggers when changing pages to prevent modals opening on navigation
  useEffect(() => {
    setReminderEditTrigger(null);
    setReminderModalTrigger(0);
    setChannelModalTrigger(0);
    setChannelToValidate(null);
  }, [location.pathname]);

  const handleEditReminder = (reminder: Reminder) => {
    setReminderEditTrigger((prev) => ({
      trigger: (prev?.trigger || 0) + 1,
      reminder,
    }));
  };

  const handleNewReminder = () => {
    setReminderEditTrigger(null);
    setReminderModalTrigger((prev) => prev + 1);
  };

  const handleAddChannel = () => {
    setChannelModalTrigger((prev) => prev + 1);
  };

  const handleResendVerification = (channel: Output) => {
    // Reset to null first to force re-render even for same channel
    setChannelToValidate(null);
    // Then set the new channel in next tick
    setTimeout(() => setChannelToValidate(channel), 0);
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Route - Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Protected Routes - Require Authentication */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <MainLayout
                  reminderEditTrigger={reminderEditTrigger}
                  channelModalTrigger={channelModalTrigger}
                  reminderModalTrigger={reminderModalTrigger}
                  channelToValidate={channelToValidate}
                >
                  <Dashboard
                    onEditReminder={handleEditReminder}
                    onNewReminder={handleNewReminder}
                    onAddChannel={handleAddChannel}
                    onResendVerification={handleResendVerification}
                  />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/reminders"
          element={
            <>
              <SignedIn>
                <MainLayout
                  reminderEditTrigger={reminderEditTrigger}
                  channelModalTrigger={channelModalTrigger}
                  reminderModalTrigger={reminderModalTrigger}
                  channelToValidate={channelToValidate}
                >
                  <RemindersPage
                    onEditReminder={handleEditReminder}
                    onNewReminder={handleNewReminder}
                  />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/channels"
          element={
            <>
              <SignedIn>
                <MainLayout
                  reminderEditTrigger={reminderEditTrigger}
                  channelModalTrigger={channelModalTrigger}
                  reminderModalTrigger={reminderModalTrigger}
                  channelToValidate={channelToValidate}
                >
                  <ChannelsPage
                    onAddChannel={handleAddChannel}
                    onResendVerification={handleResendVerification}
                  />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <SignedIn>
                <MainLayout
                  reminderEditTrigger={reminderEditTrigger}
                  channelModalTrigger={channelModalTrigger}
                  reminderModalTrigger={reminderModalTrigger}
                  channelToValidate={channelToValidate}
                >
                  <SettingsPage />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
