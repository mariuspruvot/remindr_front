/**
 * AppSidebar - Minimal and elegant navigation
 * Clean design like Notion or Linear
 */

import { Home, Bell, Calendar, Radio, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
const navigationItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Reminders",
    url: "/reminders",
    icon: Bell,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Channels",
    url: "/channels",
    icon: Radio,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Header aligned with main header */}
      <SidebarHeader className="flex h-14 items-center justify-center border-b px-4 group-data-[collapsible=icon]:justify-center">
        {/* Icon only when collapsed */}
        <Bell className="h-5 w-5 group-data-[collapsible=icon]:block hidden" />

        {/* Full logo when expanded */}
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <Bell className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight">Remindr</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Navigation - Clean and minimal */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className="h-8 text-sm font-normal group-data-[collapsible=icon]:justify-center"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
