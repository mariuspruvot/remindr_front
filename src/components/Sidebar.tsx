/**
 * Sidebar - Professional navigation using shadcn styles
 * Responsive sidebar with mobile overlay
 */

import {
  LayoutDashboard,
  Bell,
  Calendar,
  Radio,
  Settings,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      Icon: LayoutDashboard,
      path: "/dashboard",
    },
    { id: "reminders", label: "Reminders", Icon: Bell, path: "/reminders" },
    { id: "calendar", label: "Calendar", Icon: Calendar, path: "/calendar" },
    { id: "channels", label: "Channels", Icon: Radio, path: "/channels" },
    { id: "settings", label: "Settings", Icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Backdrop - mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky inset-x-0 top-16 lg:top-16 z-40",
          "w-full lg:w-64 max-h-[80vh] lg:max-h-[calc(100vh-4rem)]",
          "overflow-y-auto border-b lg:border-b-0 lg:border-r",
          "bg-background transform transition-transform duration-300 ease-in-out",
          "lg:transform-none",
          isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"
        )}
      >
        <div className="relative h-full p-4 bg-muted/30">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <span className="text-lg font-semibold">Menu</span>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mt-6">
            {menuItems.map((item) => {
              const Icon = item.Icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-secondary text-secondary-foreground shadow"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
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
