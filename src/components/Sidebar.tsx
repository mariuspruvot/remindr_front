/**
 * Sidebar - Navigation and quick actions
 *
 * REFACTORED: Uses ModalContext instead of prop callbacks
 *
 * Before: Received onAddChannel and onNewReminder callbacks from parent
 * After: Directly calls useModals() - no prop drilling needed
 */

import { LayoutDashboard, Bell, Radio, Settings, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      Icon: LayoutDashboard,
      path: "/dashboard",
    },
    { id: "reminders", label: "Reminders", Icon: Bell, path: "/reminders" },
    { id: "channels", label: "Channels", Icon: Radio, path: "/channels" },
    { id: "settings", label: "Settings", Icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Backdrop - only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          inset-x-0 top-16 lg:top-16
          z-40
          w-full lg:w-64
          max-h-[80vh] lg:max-h-[calc(100vh-4rem)]
          overflow-y-auto
          border-b lg:border-b-0 lg:border-r border-base-200 bg-base-100
          transform transition-transform duration-300 ease-in-out
          lg:transform-none
          ${isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"}
        `}
      >
        <div className="relative h-full p-4 bg-base-200">
          {/* Header with close button - only visible on mobile */}
          <div className="flex items-center justify-between mb-4 lg:hidden relative z-10">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Navigation Menu */}
          <nav className="space-y-1 relative z-10 mt-6">
            {menuItems.map((item) => {
              const Icon = item.Icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-base-300 text-base-content shadow-lg"
                      : "text-base-content/60 hover:bg-base-300/60 hover:text-base-content"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
