"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AppleReveal } from "@/components/ui/apple-scroll";

export interface TestimonialItem {
  id: number | string;
  serviceTag: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  logoSrc: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    serviceTag: "FINTECH & PAYMENTS",
    quote:
      "SASH Broadband has always been a reliable partner to our enterprise operations. Their commitment to high uptime, dedicated 1:1 leased line bandwidth, and rapid local technical escalation has been a key factor in advancing our digital payment initiatives across Tamil Nadu effectively.",
    author: "Ajay Jain",
    role: "Product Lead",
    company: "Amazon Pay Partner Network",
    logoSrc: "/Marquee/1.jpg",
  },
  {
    id: 2,
    serviceTag: "RETAIL & ERP",
    quote:
      "Connecting our multiple billing counters and warehouse depots across Thiruvallur over SASH's optical intranet made daily stock reconciliation and cloud ERP access instant, with zero mid-day transaction timeouts or packet loss.",
    author: "Karthik Sundaram",
    role: "Technical Director",
    company: "Sundaram Retail Networks",
    logoSrc: "/Marquee/3.jpg",
  },
  {
    id: 3,
    serviceTag: "HEALTHCARE",
    quote:
      "Unlike national telecom providers where support tickets sit for days, SASH's local Thiruvallur engineers resolve queries within hours. Diagnostic imaging transfers, hospital PACS, and telemedicine consultations run without a single glitch.",
    author: "Dr. Priya Narayanan",
    role: "Clinic Administrator",
    company: "Aravind Speciality Clinic",
    logoSrc: "/Marquee/5.jpg",
  },
  {
    id: 4,
    serviceTag: "MANUFACTURING",
    quote:
      "Our manufacturing plant required uncontended symmetrical upload speeds for automated CAD and cloud backups. SASH's dedicated fibre leased line has delivered 99.9% uptime strictly matching our industrial SLA.",
    author: "Senthil Kumar R.",
    role: "IT Infrastructure Manager",
    company: "Ambattur Precision Components",
    logoSrc: "/Marquee/7.jpg",
  },
  {
    id: 5,
    serviceTag: "EDUCATION",
    quote:
      "Our technical campus labs host 300+ students streaming high-definition course materials simultaneously. SASH's FTTH network and free ONT dual-band hardware handle our peak evening loads effortlessly.",
    author: "Meenakshi Sundaram",
    role: "Dean of Technology",
    company: "Thiruvallur Academy of Sciences",
    logoSrc: "/Marquee/12.jpg",
  },
  {
    id: 6,
    serviceTag: "SURVEILLANCE & SECURITY",
    quote:
      "SASH installed our 16-channel HD IP CCTV premises network and linked live feeds directly to our mobile devices over fibre. Crystal-clear video playback is accessible from anywhere with zero buffering.",
    author: "Murali Krishnan",
    role: "Managing Director",
    company: "Krishnan Warehousing Hub",
    logoSrc: "/Marquee/18.jpg",
  },
];

// Blurred background partner tiles (reproducing the enterprise mosaic wall from the reference)
const BACKGROUND_TILES = [
  { src: "/Marquee/2.jpg" },
  { src: "/Marquee/4.jpg" },
  { src: "/Marquee/6.jpg" },
  { src: "/Marquee/8.jpg" },
  { src: "/Marquee/9.jpg" },
  { src: "/Marquee/10.jpg" },
  { src: "/Marquee/11.jpg" },
  { src: "/Marquee/13.jpg" },
  { src: "/Marquee/14.jpg" },
  { src: "/Marquee/15.jpg" },
  { src: "/Marquee/16.jpg" },
  { src: "/Marquee/17.jpg" },
  { src: "/Marquee/19.jpg" },
  { src: "/Marquee/20.jpg" },
];

export interface Testimonials1Props {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items?: TestimonialItem[];
}

const EASE_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Testimonials1({
  eyebrow = "TRUSTED BY",
  heading = "100+ Tamil Nadu Enterprises",
  description = "Empowering factories, clinics, retail chains, and IT offices across Tamil Nadu with dedicated 1:1 fibre leased lines and guaranteed SLA uptime.",
  items = DEFAULT_TESTIMONIALS,
}: Testimonials1Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartXRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const total = items.length;
  const current = items[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir > 0 ? 28 : -28,
      scale: 0.985,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.38,
        ease: EASE_CUBIC,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir > 0 ? -28 : 28,
      scale: 0.985,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.25,
        ease: EASE_CUBIC,
      },
    }),
  };

  return (
    <section
      id="testimonials"
      data-apple-manual="true"
      aria-labelledby="testimonials-heading"
      className="bg-white text-brand-navy w-full section-padding relative overflow-hidden select-none"
    >
      <div className="container-sash">
        {/* Centered Section Header */}
        <AppleReveal className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow Pill Tag matching Juspay reference */}
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EFF4FE] text-[#2563EB] mb-3.5">
            {eyebrow}
          </span>

          {/* Heading */}
          <h2
            id="testimonials-heading"
            className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15]"
          >
            {heading}
          </h2>

          {description && (
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mt-3.5">
              {description}
            </p>
          )}
        </AppleReveal>

        {/* The Carousel Stage with Increased Height */}
        <div
          className="relative max-w-5xl mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[560px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 1. Blurred Background Mosaic Grid with smooth horizontal edge fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden opacity-30 blur-[12px] scale-95 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          >
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-5 w-[1040px] lg:w-[1320px] shrink-0">
              {BACKGROUND_TILES.map((tile, idx) => (
                <div
                  key={idx}
                  className="aspect-4/3 rounded-xl bg-neutral-100/90 border border-border p-4 flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={tile.src}
                    alt=""
                    width={120}
                    height={60}
                    className="object-contain max-h-11 w-auto opacity-75"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Left Arrow Navigation Button (Sleek black circle matching screenshot) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-1 sm:left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center shadow-md transition-all duration-150 active:scale-90 cursor-pointer"
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          {/* 3. The Active Testimonial Elevated Card */}
          <div className="relative z-20 w-full max-w-[760px] lg:max-w-[820px] mx-auto px-1 sm:px-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                aria-label={`Testimonial from ${current.author}`}
                className="rounded-[24px] sm:rounded-[28px] bg-white border border-border/80 shadow-[0_20px_50px_rgba(1,13,59,0.08),0_1px_3px_rgba(1,13,59,0.04)] p-6 sm:p-8 md:p-10 transition-shadow duration-300 min-h-[380px] sm:min-h-[420px] md:min-h-[460px] flex flex-col justify-center"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-stretch">
                  {/* Left Column: Footer-style gradient backdrop behind company logo */}
                  <div className="md:col-span-5 flex">
                    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[360px] rounded-[20px] sm:rounded-[22px] overflow-hidden flex items-center justify-center p-6 sm:p-8 border border-brand-navy/20 shadow-inner">
                      {/* 1. Base Deep Navy to Obsidian Foundation (exact Footer-9 gradient) */}
                      <div className="absolute inset-0 bg-linear-to-b from-[#000000] via-[#010D3B] to-[#010722]" />

                      {/* 2. SASH Optical SVG Arch Background (from footer-9) */}
                      <div className="pointer-events-none absolute inset-0 select-none opacity-85">
                        <Image
                          src="/Footer/footer-9-sash-bg.svg"
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover select-none"
                        />
                      </div>

                      {/* 3. Sapphire & Electric Navy Dome Glow */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 w-[340px] h-[180px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(43,63,140,0.65)_0%,rgba(26,37,82,0.45)_50%,transparent_75%)] blur-2xl"
                      />

                      {/* 4. SASH Brand Red Corona & Core Flare */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[280px] h-[140px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(222,3,2,0.85)_0%,rgba(255,59,58,0.5)_40%,transparent_75%)] blur-xl"
                      />

                      {/* 5. Ambient Ruby Glow centered behind the logo */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(222,3,2,0.35)_0%,rgba(1,13,59,0.2)_50%,transparent_70%)] blur-lg" />
                      </div>

                      {/* 6. White Squircle Card housing the Company Logo */}
                      <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-[22px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.15)] border border-white/30 p-5 sm:p-6 flex items-center justify-center backdrop-blur-xs">
                        <Image
                          src={current.logoSrc}
                          alt={current.company}
                          width={150}
                          height={75}
                          className="max-h-20 max-w-full object-contain select-none pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Industry Pill + Quote + Author */}
                  <div className="md:col-span-7 flex flex-col justify-between py-2 sm:py-3">
                    <div>
                      {/* Industry Pill Badge (matching reference screenshot) */}
                      <div className="mb-4 sm:mb-5">
                        <span className="inline-block px-3 py-1.5 rounded-md bg-[#00875A] text-white text-xs font-semibold uppercase tracking-wider">
                          {current.serviceTag}
                        </span>
                      </div>

                      {/* Testimonial Quote in Urbanist regular */}
                      <p className="text-neutral-700 font-normal text-sm sm:text-base lg:text-[17px] leading-relaxed mb-6 sm:mb-8">
                        {current.quote}
                      </p>
                    </div>

                    {/* Author & Designation (matching reference screenshot) */}
                    <div>
                      <h4 className="text-brand-navy font-semibold text-base sm:text-lg tracking-normal">
                        {current.author}
                      </h4>
                      <p className="text-neutral-500 font-normal text-xs sm:text-sm mt-1">
                        {current.role} | {current.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* 4. Right Arrow Navigation Button (Sleek black circle matching screenshot) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-1 sm:right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center shadow-md transition-all duration-150 active:scale-90 cursor-pointer"
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 5. Pagination Indicator Dots using brand-red & border */}
        <div
          className="mt-10 sm:mt-12 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonials pagination"
        >
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={currentIndex === idx}
              aria-label={`Go to testimonial ${idx + 1}`}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-brand-red shadow-[0_2px_8px_var(--color-red-10)]"
                  : "w-2 bg-neutral-100 border border-border hover:bg-neutral-600/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
