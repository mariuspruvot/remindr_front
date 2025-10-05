/**
 * Landing page - Single view with subtle animations
 * Clean, minimal, elegant
 */

import { motion } from "framer-motion";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { ArrowRight, Bell, Zap, Shield, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

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
  const { isSignedIn } = useUser();
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.div
      className="min-h-screen flex flex-col overflow-y-auto overflow-x-hidden relative bg-base-100"
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
          color: "hsl(var(--bc))",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          filter: "url(#noise)",
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 border-b border-base-300/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
              strokeWidth={2.5}
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              Remindr
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {isSignedIn ? (
              <Link
                to="/dashboard"
                className="btn btn-primary btn-sm gap-1.5 sm:gap-2 shadow-sm font-medium text-xs sm:text-sm"
              >
                <span className="hidden xs:inline">Dashboard</span>
                <span className="xs:hidden">App</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-sm font-medium text-xs sm:text-sm px-2 sm:px-4">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary btn-sm shadow-sm font-medium text-xs sm:text-sm px-2 sm:px-4">
                    <span className="hidden xs:inline">Get Started</span>
                    <span className="xs:hidden">Start</span>
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </motion.nav>
      {/* Main Content - Centered */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-base-200 border border-base-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            >
              <span className="text-base-content/70">
                Multi-Channel Intelligence
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-base-content mb-4 sm:mb-5 leading-[1.1] sm:leading-[1.05] tracking-[-0.02em] px-2"
            >
              Never{" "}
              <span className="relative inline-block font-medium italic text-base-content/90">
                forget
                <motion.span
                  className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[1.5px] sm:h-[2px] bg-primary/40"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                />
              </span>{" "}
              again
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl italic text-base-content/60 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Smart, multi-channel reminders that ensure you never miss what
              matters
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              {isSignedIn ? (
                <Link to="/dashboard">
                  <button className="btn btn-primary btn-md sm:btn-lg gap-2 shadow-lg font-medium">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </Link>
              ) : (
                <SignUpButton mode="modal">
                  <button className="btn btn-primary btn-md sm:btn-lg gap-2 shadow-lg font-medium">
                    <span className="hidden xs:inline">Get Started — Free</span>
                    <span className="xs:hidden">Get Started</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </SignUpButton>
              )}
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto"
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
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="p-5 sm:p-6 lg:p-8 border border-base-300/50 rounded-xl sm:rounded-2xl bg-base-100/50 backdrop-blur-sm hover:border-base-300 transition-colors duration-300"
              >
                <div
                  className={`inline-flex p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${feature.bgColor} mb-3 sm:mb-4`}
                >
                  <feature.icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${feature.iconColor}`}
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-base-content">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 border-t border-base-300/30 py-3 sm:py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-base-content/50">
            © 2025 Remindr. Built with care.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}

export default Landing;
