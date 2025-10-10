/**
 * MainLayout - Professional application layout
 * Consistent structure with shadcn styling
 */

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
      className="min-h-screen bg-background relative flex flex-col"
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

      {/* Floating Action Button - Mobile only */}
      <Button
        onClick={() => openReminderModal()}
        size="lg"
        className="fixed bottom-6 right-6 z-40 lg:hidden h-14 w-14 rounded-full shadow-lg hover:shadow-xl"
        aria-label="New reminder"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Global Modals */}
      <ReminderFormModal />
      <ChannelModal />
    </motion.div>
  );
}
