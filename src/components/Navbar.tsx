/**
 * Navbar - Professional header using shadcn styles
 * Sticky header with branding and user menu
 */

import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Remindr
          </Link>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center gap-2 lg:gap-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
