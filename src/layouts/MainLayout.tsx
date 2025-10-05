import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChannelModal from "../components/ChannelModal";
import ReminderFormModal from "../components/ReminderFormModal";
import { useOutputs } from "../hooks/useOutputs";
import type { Output, Reminder } from "../types/reminder.types";

interface MainLayoutProps {
  children: React.ReactNode;
  reminderEditTrigger?: { trigger: number; reminder: Reminder } | null;
  channelModalTrigger?: number;
  reminderModalTrigger?: number;
  channelToValidate?: Output | null;
}

export default function MainLayout({
  children,
  reminderEditTrigger,
  channelModalTrigger,
  reminderModalTrigger,
  channelToValidate: externalChannelToValidate,
}: MainLayoutProps) {
  // State for mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State for modals
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState<Reminder | undefined>(
    undefined
  );
  const [channelToValidate, setChannelToValidate] = useState<Output | null>(
    null
  );

  // Fetch channels using React Query
  const { data: availableChannels = [] } = useOutputs();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const openChannelModal = () => setIsChannelModalOpen(true);
  const closeChannelModal = () => {
    setIsChannelModalOpen(false);
    // Don't reset here, it will be reset when opening the modal next time
  };
  const openChannelValidationModal = (channel: Output) => {
    setIsChannelModalOpen(true);
    setChannelToValidate(channel);
  };

  const openReminderModal = (reminder?: Reminder) => {
    setReminderToEdit(reminder);
    setIsReminderModalOpen(true);
  };

  // Open modal when edit trigger fires (from Edit button)
  useEffect(() => {
    if (reminderEditTrigger && reminderEditTrigger.trigger > 0) {
      openReminderModal(reminderEditTrigger.reminder);
    }
  }, [reminderEditTrigger]);

  // Open channel modal when trigger changes (from Dashboard "Add Channel" button)
  useEffect(() => {
    if (channelModalTrigger && channelModalTrigger > 0) {
      openChannelModal();
    }
  }, [channelModalTrigger]);

  // Open reminder modal when trigger changes (from "New Reminder" button)
  useEffect(() => {
    if (reminderModalTrigger && reminderModalTrigger > 0) {
      openReminderModal();
    }
  }, [reminderModalTrigger]);

  // Open validation modal when external channel is set (from Resend button)
  useEffect(() => {
    if (externalChannelToValidate) {
      openChannelValidationModal(externalChannelToValidate);
    }
  }, [externalChannelToValidate]);

  const closeReminderModal = () => {
    setIsReminderModalOpen(false);
    setReminderToEdit(undefined);
  };

  const handleChannelSuccess = () => {
    // Refresh channels list when a new channel is added
    console.log("Channel added successfully!");
    // TODO: Trigger channels list refresh
  };

  const handleReminderSuccess = () => {
    // Refresh reminders list
    console.log("Reminder saved successfully!");
    // TODO: Trigger reminders list refresh
  };

  return (
    <motion.div
      className="min-h-screen bg-base-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* SVG Noise Filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Dots pattern + Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, currentColor 20%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "hsl(var(--bc))",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          filter: "url(#noise)",
        }}
      />

      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onAddChannel={openChannelModal}
          onNewReminder={() => openReminderModal()}
        />
        <main className="flex-1 w-full lg:w-auto">{children}</main>
      </div>

      {/* Floating Action Button (FAB) - Mobile only */}
      <button
        onClick={() => openReminderModal()}
        className="fixed bottom-6 right-6 z-40 lg:hidden btn btn-circle btn-lg bg-base-content text-base-100 hover:bg-base-content/90 border-none shadow-xl hover:shadow-2xl transition-all"
        aria-label="New reminder"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modals */}
      <ChannelModal
        isOpen={isChannelModalOpen}
        onClose={closeChannelModal}
        onSuccess={handleChannelSuccess}
        channelToValidate={channelToValidate}
      />
      <ReminderFormModal
        key={reminderToEdit ? `edit-${reminderToEdit.uuid}` : "create"}
        isOpen={isReminderModalOpen}
        onClose={closeReminderModal}
        onSuccess={handleReminderSuccess}
        mode={reminderToEdit ? "edit" : "create"}
        reminder={reminderToEdit}
        availableChannels={availableChannels}
        onAddChannel={openChannelModal}
      />
    </motion.div>
  );
}
