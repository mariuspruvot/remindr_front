import { Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useTheme } from "../hooks/useTheme";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      {/* Background pattern - matches Landing/MainLayout */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, currentColor 20%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "hsl(var(--bc))",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          filter: "url(#noise)",
        }}
      />

      <div className="flex items-center justify-between px-4 lg:px-6 py-4 relative z-10">
        {/* Left side: Hamburger (mobile only) + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger button - visible only on mobile/tablet */}
          <button
            onClick={onMenuClick}
            className="btn btn-ghost btn-sm btn-circle lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-xl font-semibold text-base-content"
          >
            Remindr
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Clerk User Button with profile menu */}
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

export default Navbar;
