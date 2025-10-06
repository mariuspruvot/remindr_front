/**
 * ProtectedRoute - Wrapper for authenticated routes
 * 
 * Why this exists?
 * - Eliminates 160 lines of duplicated code in App.tsx
 * - Every protected route had identical SignedIn/SignedOut logic
 * - DRY principle: Write once, use everywhere
 * 
 * Before (40 lines per route):
 * ```tsx
 * <Route path="/dashboard" element={
 *   <>
 *     <SignedIn>
 *       <MainLayout {...props}>
 *         <Dashboard {...props} />
 *       </MainLayout>
 *     </SignedIn>
 *     <SignedOut>
 *       <RedirectToSignIn />
 *     </SignedOut>
 *   </>
 * } />
 * ```
 * 
 * After (3 lines per route):
 * ```tsx
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 * } />
 * ```
 */

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import MainLayout from "../layouts/MainLayout";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps a page component with authentication and layout
 * - Redirects to sign-in if not authenticated
 * - Wraps with MainLayout (navbar, sidebar, modals)
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <>
      <SignedIn>
        <MainLayout>{children}</MainLayout>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

