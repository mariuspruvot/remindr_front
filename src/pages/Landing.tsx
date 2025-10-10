/**
 * Landing Page
 *
 * Public-facing landing page with award-winning animations.
 * Features:
 * - Smooth Framer Motion animations
 * - Centered navigation menu
 * - Gradient orb background effect
 * - Interactive feature cards
 *
 * @component
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { Bell, Zap, Shield, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useTheme } from "../components/theme-provider";
import { LoadingSpinner } from "../components/common";
import { EASING, DURATION, DELAY } from "../constants/animations";

function Landing() {
  const { isSignedIn, isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const navigate = useNavigate();

  // Redirect to dashboard if user is already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isLoaded, isSignedIn, navigate]);

  // Show loader while checking auth or if already signed in (redirecting)
  if (!isLoaded || isSignedIn) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col overflow-y-auto overflow-x-hidden relative bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* SVG Noise Filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Dots pattern + Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, currentColor 20%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "hsl(var(--foreground))",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          filter: "url(#noise)",
        }}
      />

      {/* Navigation - Clean, no borders */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Dots pattern in header */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in srgb, currentColor 15%, transparent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            color: "hsl(var(--foreground))",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center relative z-10">
          {/* Center Menu */}
          <Menubar className="border-0 bg-transparent shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium cursor-pointer">
                Features
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Bell className="mr-2 h-4 w-4 text-primary" />
                  <span>Multi-Channel Delivery</span>
                </MenubarItem>
                <MenubarItem>
                  <Zap className="mr-2 h-4 w-4 text-orange-500" />
                  <span>Lightning Fast Setup</span>
                </MenubarItem>
                <MenubarItem>
                  <Shield className="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Secure & Private</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium cursor-pointer">
                Pricing
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Free Plan</MenubarItem>
                <MenubarItem>Pro Plan</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Enterprise</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium cursor-pointer">
                About
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Documentation</MenubarItem>
                <MenubarItem>Support</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Contact</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {/* Right Actions */}
          <div className="absolute right-4 sm:right-6 flex items-center gap-2">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {isSignedIn ? (
              <Button asChild size="sm" className="shadow-sm">
                <Link to="/dashboard">
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">App</span>
                </Link>
              </Button>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="shadow-sm">
                    Start
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </motion.div>
      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Section - Award-winning design */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24 relative">
            {/* Gradient orb effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: DURATION.verySlow, ease: EASING.smooth }}
              className="absolute inset-0 -z-10 mx-auto h-[600px] w-[600px] rounded-full bg-primary blur-[120px]"
            />

            {/* Main heading with staggered animation */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.medium, ease: EASING.smooth }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: DELAY.short,
                  duration: DURATION.medium,
                  ease: EASING.smooth,
                }}
              >
                Never{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: DELAY.short + 0.1,
                  duration: DURATION.medium,
                  ease: EASING.smooth,
                }}
                className="relative italic text-primary"
              >
                forget
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    delay: DELAY.veryLong + 0.1,
                    duration: DURATION.medium,
                    ease: EASING.smooth,
                  }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 blur-sm"
                  style={{ originX: 0 }}
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: DELAY.medium,
                  duration: DURATION.medium,
                  ease: EASING.smooth,
                }}
              >
                {" "}
                again
              </motion.span>
            </motion.h1>

            {/* Description with fade-in */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Send reminders via email, WhatsApp, Telegram, or webhooks. Set
              once, delivered everywhere.
            </motion.p>

            {/* CTA with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              {isSignedIn ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="relative overflow-hidden group"
                  >
                    <Link to="/dashboard">
                      <span className="relative z-10">Open Dashboard</span>
                      <motion.span
                        className="absolute inset-0 bg-primary/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <>
                  <SignUpButton mode="modal">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="relative overflow-hidden group"
                      >
                        <span className="relative z-10">Start free</span>
                        <motion.span
                          className="absolute inset-0 bg-white/10"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </Button>
                    </motion.div>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="relative overflow-hidden"
                      >
                        <span className="relative z-10">Sign in</span>
                      </Button>
                    </motion.div>
                  </SignInButton>
                </>
              )}
            </motion.div>
          </div>

          {/* Features - Animated cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Bell,
                title: "Multi-channel",
                description: "Email, SMS, WhatsApp, Telegram, webhooks",
                delay: 0.9,
              },
              {
                icon: Zap,
                title: "Ready in 30s",
                description: "No setup, no config, no hassle",
                delay: 1.0,
              },
              {
                icon: Shield,
                title: "Private",
                description: "End-to-end encrypted, zero tracking",
                delay: 1.1,
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: feature.delay,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                className="group relative text-center p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/20 transition-colors duration-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />

                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon
                    className="h-6 w-6 text-primary"
                    strokeWidth={2}
                  />
                </div>

                <h3 className="mb-2 font-semibold group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Remindr. Built with care.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}

export default Landing;
