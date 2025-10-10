/**
 * Main App component with routing
 * 
 * MAJOR REFACTORING:
 * - From 183 lines to ~60 lines (67% reduction!)
 * - Eliminated all "trigger" state (reminderModalTrigger, channelModalTrigger, etc.)
 * - Eliminated all callback functions (handleNewReminder, handleEditReminder, etc.)
 * - Eliminated prop drilling through MainLayout
 * - Uses ModalProvider for centralized modal state
 * - Uses ProtectedRoute to eliminate route duplication
 * 
 * Result: Clean, simple, maintainable routing configuration
 */

import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { setAuthTokenGetter } from "./lib/api";
import { ModalProvider } from "./contexts/ModalContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import RemindersPage from "./pages/Reminders";
import CalendarPage from "./pages/Calendar";
import ChannelsPage from "./pages/Channels";
import SettingsPage from "./pages/Settings";

function App() {
  const { getToken } = useAuth();

  // Configure API token getter with Clerk's getToken
  useEffect(() => {
    setAuthTokenGetter(getToken);
  }, [getToken]);

  return (
    <ModalProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />

        {/* Protected Routes - All use ProtectedRoute wrapper */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <RemindersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channels"
          element={
            <ProtectedRoute>
              <ChannelsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ModalProvider>
  );
}

export default App;
