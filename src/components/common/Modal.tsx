/**
 * Reusable Modal component
 * Provides consistent modal behavior and styling
 */

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { modalBackdrop, modalContent } from "../../constants/animations";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          variants={modalBackdrop}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Content */}
        <motion.div
          variants={modalContent}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`relative bg-base-100 rounded-xl shadow-xl ${maxWidthClasses[maxWidth]} w-full max-h-[90vh] overflow-y-auto`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-base-300 sticky top-0 bg-base-100 z-10">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
