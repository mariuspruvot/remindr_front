/**
 * Landing page - Single view with subtle animations
 * Clean, minimal, elegant
 */

import { motion } from "framer-motion";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { ArrowRight, Bell, Zap, Shield, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../components/theme-provider";
import { useEffect } from "react";
import { LoadingSpinner } from "../components/common";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

// Subtle animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center relative">
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
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-medium mb-6"
            >
              <span className="text-foreground/70">
                Multi-Channel Intelligence
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight tracking-tight"
            >
              Never{" "}
              <span className="relative inline-block italic">
                forget
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                />
              </span>{" "}
              again
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Smart, multi-channel reminders that ensure you never miss what
              matters
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {isSignedIn ? (
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button size="lg" className="shadow-lg">
                    Get Started
                  </Button>
                </SignUpButton>
              )}
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Bell,
                title: "Multi-channel",
                description:
                  "Deliver to email, WhatsApp, Telegram, or webhooks. Your choice.",
                iconColor: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                icon: Zap,
                title: "Lightning fast",
                description:
                  "Set up in seconds. No configuration headaches. Just works.",
                iconColor: "text-orange-500",
                bgColor: "bg-orange-500/10",
              },
              {
                icon: Shield,
                title: "Secure & private",
                description:
                  "End-to-end encrypted. Zero tracking. Your data stays yours.",
                iconColor: "text-emerald-500",
                bgColor: "bg-emerald-500/10",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-border/80 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`inline-flex p-2.5 rounded-lg ${feature.bgColor} mb-4`}
                >
                  <feature.icon
                    className={`w-5 h-5 ${feature.iconColor}`}
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
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
