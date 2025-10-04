import { Bell, User, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
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
          <a href="/" className="text-xl font-semibold text-base-content">
            Remindr
          </a>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          <button className="btn btn-ghost btn-sm btn-circle">
            <Bell className="w-5 h-5" />
          </button>
          <button className="btn btn-ghost btn-sm btn-circle">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
