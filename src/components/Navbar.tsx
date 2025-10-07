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
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-200 shadow-xl">
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
            className="text-2xl font-bold  text-base-content"
          >
            Remindr
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 lg:gap-3">
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
