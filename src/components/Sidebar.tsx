import { LayoutDashboard, Bell, Radio, Settings, Plus, X } from "lucide-react";

interface SidebarProps {
  activeSection?: string;
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({
  activeSection = "dashboard",
  isOpen,
  onClose,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { id: "reminders", label: "Reminders", Icon: Bell },
    { id: "channels", label: "Channels", Icon: Radio },
    { id: "settings", label: "Settings", Icon: Settings },
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

        {/* Quick Action Button - Desktop only (mobile has FAB) */}
        <button className="hidden lg:flex btn btn-sm w-full mb-6 gap-2 bg-base-content text-base-100 hover:bg-base-content/90 border-none">
          <Plus className="w-4 h-4" />
          New Reminder
        </button>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.Icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-base-200 text-base-content"
                    : "text-base-content/60 hover:bg-base-200/50 hover:text-base-content"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
