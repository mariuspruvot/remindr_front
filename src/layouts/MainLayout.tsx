/**
 * MainLayout - Professional SaaS Layout
 * Beautiful, modern, and elegant design
 */

import { motion } from "framer-motion";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "../components/app-sidebar";
import { PageBreadcrumbs } from "../components/page-breadcrumbs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReminderFormModal from "../components/ReminderFormModal";
import ChannelModal from "../components/ChannelModal";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <motion.div
        className="flex min-h-screen w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-1 flex-col">
          {/* Header - fixed with shadow */}
          <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-sidebar shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
            <div className="flex w-full items-center gap-2 px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />

              {/* Breadcrumbs */}
              <div className="flex flex-1 items-center gap-2">
                <PageBreadcrumbs />
              </div>

              {/* Navbar (Theme + User) */}
              <Navbar />
            </div>
          </header>

          {/* Page Content - with overflow */}
          <div className="flex flex-1 flex-col overflow-auto custom-scrollbar bg-background">
            <main className="flex-1">{children}</main>

            {/* Footer - sticky at bottom */}
            <div className="sticky bottom-0 mt-auto">
              <Footer />
            </div>
          </div>
        </SidebarInset>

        {/* Global Modals */}
        <ReminderFormModal />
        <ChannelModal />
      </motion.div>
    </SidebarProvider>
  );
}
