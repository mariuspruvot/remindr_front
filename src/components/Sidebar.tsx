import { LayoutDashboard, Bell, Radio, Settings, Plus, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChannel: () => void;
  onNewReminder: () => void;
}

function Sidebar({
  isOpen,
  onClose,
  onAddChannel,
  onNewReminder,
}: SidebarProps) {
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
          border-b lg:border-b-0 lg:border-r border-base-300 bg-base-100
          p-4
          transform transition-transform duration-300 ease-in-out
          lg:transform-none
          ${isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"}
        `}
      >
        {/* Header with close button - only visible on mobile */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col gap-2 mb-6">
          {/* New Reminder - Desktop only (mobile has FAB) */}
          <button
            onClick={() => {
              onNewReminder();
              onClose(); // Close sidebar after click
            }}
            className="hidden lg:flex btn btn-sm w-full gap-2 bg-base-content text-base-100 hover:bg-base-content/90 border-none"
          >
            <Plus className="w-4 h-4" />
            New Reminder
          </button>
          {/* Add Channel - Available on all screens */}
          <button
            onClick={() => {
              onAddChannel();
              onClose(); // Close sidebar after click on mobile
            }}
            className="btn btn-sm btn-outline w-full gap-2"
          >
            <Radio className="w-4 h-4" />
            Add Channel
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.Icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-base-200 text-base-content"
                    : "text-base-content/60 hover:bg-base-200/50 hover:text-base-content"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
