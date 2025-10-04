import { useState } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className="flex-1 w-full lg:w-auto">{children}</main>
      </div>

      {/* Floating Action Button (FAB) - Mobile only */}
      <button
        className="fixed bottom-6 right-6 z-40 lg:hidden btn btn-circle btn-lg bg-base-content text-base-100 hover:bg-base-content/90 border-none shadow-xl hover:shadow-2xl transition-all"
        aria-label="New reminder"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
