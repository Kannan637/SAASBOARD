"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const SASH_PHONE_NUMBER = "+91 90030 09353";
export const SASH_PHONE_TEL = "tel:+919003009353";
export const SASH_SUPPORT_EMAIL = "sashbroadband@gmail.com";
export const SASH_SUPPORT_MAILTO = "mailto:sashbroadband@gmail.com";
export const SASH_WHATSAPP_URL =
  "https://wa.me/919003009353?text=Hello%20SASH%20Broadband%2C%20I%20would%20like%20to%20enquire%20about%20a%20fibre%20internet%20connection.";

/**
 * Floating Sidebar Collapse/Expand Toggle on Right Side Center
 * Appears when user scrolls down past 160px.
 * Provides instant Phone, Mail, and WhatsApp connect options.
 */
export function FloatingContactSidebar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal widget when user scrolls down past 160px
      if (window.scrollY > 160) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <aside
      aria-label="Floating quick contact sidebar"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 select-none"
    >
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="flex items-center"
          >
            {/* COLLAPSED STATE TRIGGER TAB */}
            {!isExpanded && (
              <motion.button
                type="button"
                onClick={() => setIsExpanded(true)}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.96 }}
                aria-expanded={false}
                aria-label="Expand quick contact sidebar (Phone and Mail options)"
                title="Quick Connect — Phone & Email"
                className="group relative flex flex-col items-center gap-2.5 rounded-l-2xl bg-gradient-to-b from-brand-navy via-brand-navy to-[#06183B] p-2.5 sm:p-3 text-white shadow-[0_8px_32px_rgba(1,13,59,0.32)] border-y border-l border-white/20 backdrop-blur-md cursor-pointer transition-colors hover:from-brand-red hover:to-[#B30201]"
              >
                {/* Active indicator dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>

                {/* Expand chevron icon */}
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <ChevronLeft className="h-4 w-4 stroke-[2.5] text-white transition-transform group-hover:-translate-x-0.5" />
                </div>

                {/* Icons Stack */}
                <div className="flex flex-col items-center gap-2 pt-1 border-t border-white/15">
                  <div
                    title="Phone"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/90 group-hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 stroke-[2.2]" />
                  </div>
                  <div
                    title="Email"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/90 group-hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 stroke-[2.2]" />
                  </div>
                </div>

                {/* Vertical text label */}
                <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/90 uppercase py-1">
                  Connect
                </span>
              </motion.button>
            )}

            {/* EXPANDED STATE SIDEBAR CARD */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 120, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 120, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="relative mr-2 sm:mr-3 w-[min(320px,calc(100vw-20px))] rounded-3xl bg-white text-brand-navy shadow-[0_16px_50px_rgba(1,13,59,0.22)] border border-brand-navy/10 overflow-hidden backdrop-blur-xl"
              >
                {/* Header Strip */}
                <div className="relative bg-gradient-to-r from-brand-navy to-[#06183B] p-4 text-white">
                  {/* Soft background glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-red/30 blur-xl"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                        <Sparkles className="h-4 w-4 text-brand-red" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white tracking-normal leading-tight">
                          Quick Connect
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[10px] font-medium text-emerald-300">
                            Engineers Online
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Collapse Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      aria-label="Collapse quick contact sidebar"
                      title="Collapse sidebar"
                      className="group/close flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-brand-red text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover/close:translate-x-0.5" />
                    </button>
                  </div>
                </div>

                {/* Content Body: Phone & Mail Options */}
                <div className="p-3.5 sm:p-4 flex flex-col gap-2.5">
                  {/* 1. Phone Option */}
                  <a
                    href={SASH_PHONE_TEL}
                    className="group/call flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-50 hover:bg-red-50/70 border border-neutral-200/80 hover:border-brand-red/30 transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white shadow-[0_4px_12px_rgba(222,3,2,0.25)] transition-transform duration-200 group-hover/call:scale-105">
                      <Phone className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 group-hover/call:text-brand-red">
                          Call Us Directly
                        </span>
                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          Toll-Free
                        </span>
                      </div>
                      <p className="text-sm font-bold text-brand-navy truncate mt-0.5 tracking-tight group-hover/call:text-brand-red">
                        {SASH_PHONE_NUMBER}
                      </p>
                      <p className="text-[10.5px] text-neutral-500 truncate mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        Mon – Sat • 9:00 AM – 6:00 PM
                      </p>
                    </div>
                  </a>

                  {/* 2. Mail Option */}
                  <a
                    href={SASH_SUPPORT_MAILTO}
                    className="group/mail flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-50 hover:bg-blue-50/70 border border-neutral-200/80 hover:border-brand-navy/30 transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white shadow-[0_4px_12px_rgba(1,13,59,0.2)] transition-transform duration-200 group-hover/mail:scale-105">
                      <Mail className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 group-hover/mail:text-brand-navy">
                          Email Support
                        </span>
                        <span className="text-[10px] font-medium text-brand-navy bg-navy-10 px-1.5 py-0.5 rounded-full">
                          24/7 Desk
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] font-bold text-brand-navy truncate mt-0.5 tracking-tight group-hover/mail:text-brand-navy">
                        {SASH_SUPPORT_EMAIL}
                      </p>
                      <p className="text-[10.5px] text-neutral-500 truncate mt-0.5">
                        Guaranteed response in &lt; 2 hrs
                      </p>
                    </div>
                  </a>

                  {/* 3. WhatsApp Quick Message Option */}
                  <a
                    href={SASH_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/wa flex items-center gap-3.5 p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] transition-transform duration-200 group-hover/wa:scale-105">
                      <MessageCircle className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#128C7E]">
                          WhatsApp Chat
                        </span>
                        <span className="text-[10px] font-medium text-[#128C7E] bg-white px-1.5 py-0.5 rounded-full">
                          Instant
                        </span>
                      </div>
                      <p className="text-sm font-bold text-brand-navy truncate mt-0.5 tracking-tight">
                        Chat on WhatsApp
                      </p>
                      <p className="text-[10.5px] text-neutral-600 truncate mt-0.5">
                        Ask feasibility & plan offers
                      </p>
                    </div>
                  </a>
                </div>

                {/* Footer Note */}
                <div className="bg-neutral-100/70 border-t border-neutral-200/70 px-4 py-2 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>SASH Broadband NOC</span>
                  <span className="font-medium text-brand-navy">Tiruvallur, TN</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

export default FloatingContactSidebar;
