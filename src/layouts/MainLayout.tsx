/**
 * MainLayout - Main application layout
 *
 * REFACTORED: From 183 lines to ~80 lines
 *
 * What it does:
 * - Provides consistent layout structure (Navbar, Sidebar, Content)
 * - Handles mobile sidebar toggle
 * - Renders background patterns
 * - Renders global modals (managed by ModalContext)
 *
 * What it NO LONGER does:
 * - ❌ Manages modal state (now in ModalContext)
 * - ❌ Listens to "trigger" props (anti-pattern eliminated)
 * - ❌ Invalidates React Query cache (modals handle their own success)
 * - ❌ Receives callbacks from parent (no more prop drilling)
 */

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ReminderFormModal from "../components/ReminderFormModal";
import ChannelModal from "../components/ChannelModal";
import { useModals } from "../contexts/ModalContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { openReminderModal } = useModals();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <motion.div
      className="min-h-screen bg-base-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage:
          "radial-gradient(color-mix(in srgb, currentColor 20%, transparent) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        color: "hsl(var(--bc))",
      }}
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

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          filter: "url(#noise)",
        }}
      />

      {/* Layout Structure */}
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
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

      {/* Global Modals - Managed by ModalContext */}
      <ReminderFormModal />
      <ChannelModal />
    </motion.div>
  );
}
