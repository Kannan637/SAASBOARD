"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal the button when scrolled down past 320px
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      aria-label="Floating quick actions"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3"
    >
      {/* Go To Top Button (Positioned directly near and above WhatsApp button) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="Scroll to top of page"
            title="Go to top"
            className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white/95 hover:bg-brand-red text-brand-navy hover:text-white border border-brand-navy/15 hover:border-brand-red shadow-[0_4px_16px_rgba(1,13,59,0.14)] hover:shadow-[0_6px_20px_rgba(222,3,2,0.32)] backdrop-blur-md transition-all duration-200 hover:scale-108 active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.25]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919003009353?text=Hello%20SASH%20Broadband%2C%20I%20would%20like%20to%20enquire%20about%20a%20fibre%20internet%20connection."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SASH Broadband on WhatsApp"
        title="Chat on WhatsApp"
        className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.068 0-12.8 5.732-12.8 12.8 0 2.257.589 4.46 1.708 6.404L3.092 28.8l6.556-1.72c1.883 1.028 4.004 1.57 6.356 1.57h.006c7.066 0 12.796-5.732 12.796-12.8 0-3.42-1.332-6.636-3.75-9.054C22.638 4.532 19.422 3.2 16.004 3.2zm0 23.29h-.005c-1.994 0-3.95-.536-5.656-1.548l-.406-.24-4.212 1.105 1.124-4.106-.264-.42c-1.112-1.768-1.7-3.812-1.7-5.914 0-5.876 4.782-10.658 10.664-10.658 2.848 0 5.524 1.11 7.538 3.124 2.012 2.014 3.12 4.692 3.12 7.54 0 5.878-4.782 10.66-10.203 10.66zm5.848-7.984c-.32-.16-1.896-.936-2.19-1.042-.294-.108-.508-.16-.722.16-.214.32-.828 1.042-1.016 1.256-.186.214-.374.24-.694.08-.32-.16-1.352-.498-2.576-1.59-.952-.848-1.594-1.898-1.782-2.218-.186-.32-.02-.494.14-.654.144-.144.32-.374.48-.562.16-.186.214-.32.32-.534.108-.214.054-.4-.026-.56-.08-.16-.722-1.738-.988-2.38-.26-.624-.526-.54-.722-.55-.186-.008-.4-.01-.614-.01-.214 0-.562.08-.856.4-.294.32-1.122 1.096-1.122 2.674s1.15 3.102 1.31 3.316c.16.214 2.262 3.454 5.48 4.844.766.33 1.364.528 1.83.676.768.244 1.468.21 2.02.128.616-.092 1.896-.776 2.164-1.524.268-.748.268-1.39.188-1.524-.08-.134-.294-.214-.614-.374z" />
        </svg>
      </a>
    </aside>
  );
}

export default FloatingActions;
