/**
 * Settings page - User settings and Clerk profile management
 */

import { UserProfile } from "@clerk/clerk-react";

function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto mt-6">
      {/* Clerk User Profile Component */}
      <div className="flex justify-center">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full max-w-4xl",
              card: "shadow-none border border-base-300 rounded-xl",
            },
          }}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
