/**
 * Modal Context - Centralized modal state management
 *
 * Why this exists?
 * - Eliminates prop drilling (passing callbacks through 3-4 levels)
 * - Eliminates "trigger" anti-pattern (incrementing counters to open modals)
 * - Single source of truth for all modal states
 * - Any component can open/close modals without passing props
 *
 * Usage:
 * ```tsx
 * const { openReminderModal, closeReminderModal } = useModals();
 *
 * // Open for creating new reminder
 * <button onClick={() => openReminderModal()}>New Reminder</button>
 *
 * // Open for editing existing reminder
 * <button onClick={() => openReminderModal(reminder)}>Edit</button>
 * ```
 */

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Reminder, Output } from "../types/reminder.types";

interface ModalState {
  // Reminder modal state
  reminderModal: {
    isOpen: boolean;
    reminder?: Reminder; // undefined = create mode, defined = edit mode
    initialDate?: string; // ISO date string for pre-filling scheduled_at in create mode
  };
  // Channel modal state
  channelModal: {
    isOpen: boolean;
    channel?: Output; // undefined = create mode, defined = validation mode
  };
}

interface ModalContextValue {
  // State
  modals: ModalState;

  // Reminder modal actions
  openReminderModal: (reminder?: Reminder, initialDate?: string) => void;
  closeReminderModal: () => void;

  // Channel modal actions
  openChannelModal: (channel?: Output) => void;
  closeChannelModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * Provider component that wraps the app and provides modal state
 */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalState>({
    reminderModal: { isOpen: false },
    channelModal: { isOpen: false },
  });

  // Reminder modal actions
  const openReminderModal = (reminder?: Reminder, initialDate?: string) => {
    setModals((prev) => ({
      ...prev,
      reminderModal: { isOpen: true, reminder, initialDate },
    }));
  };

  const closeReminderModal = () => {
    setModals((prev) => ({
      ...prev,
      reminderModal: { isOpen: false, reminder: undefined, initialDate: undefined },
    }));
  };

  // Channel modal actions
  const openChannelModal = (channel?: Output) => {
    setModals((prev) => ({
      ...prev,
      channelModal: { isOpen: true, channel },
    }));
  };

  const closeChannelModal = () => {
    setModals((prev) => ({
      ...prev,
      channelModal: { isOpen: false, channel: undefined },
    }));
  };

  const value: ModalContextValue = {
    modals,
    openReminderModal,
    closeReminderModal,
    openChannelModal,
    closeChannelModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

/**
 * Hook to access modal state and actions
 * Must be used within ModalProvider
 *
 * @throws Error if used outside ModalProvider
 */
export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within ModalProvider");
  }
  return context;
}
