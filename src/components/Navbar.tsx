/**
 * Navbar - Just theme toggle and user menu
 * Minimal header items
 */

import { UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
          },
        }}
      />
    </div>
  );
}
