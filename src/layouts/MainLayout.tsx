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
import Footer from "../components/Footer";
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
      className="min-h-screen bg-base-200 relative flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Layout Structure */}
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 w-full lg:w-auto">{children}</main>
          <Footer />
        </div>
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
