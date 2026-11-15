"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppleStagger,
  AppleStaggerItem,
  APPLE_EASE,
} from "@/components/ui/apple-scroll";

interface ServiceHeroSlide {
  id: string;
  serviceLabel: string;
  serviceIcon: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageSrc: string;
  imageAlt: string;
  maskShape: "crescent" | "chevron" | "arch" | "shield" | "double-wave";
  imagePosition?: string;
  backdropColor?: string;
}

const HERO_SERVICE_SLIDES: ServiceHeroSlide[] = [
  {
    id: "broadband",
    serviceLabel: "Home Fibre Broadband",
    serviceIcon: "/Service/BroadBand.webp",
    eyebrow: "TAMIL NADU'S FTTH FIBRE NETWORK",
    headlinePrefix: "Faster speeds.",
    headlineHighlight: "Just for you.",
    subtitle:
      "That's the SASH Fibre Broadband advantage — unlimited data, free installation, and speeds up to 1 Gbps across Thiruvallur & Tamil Nadu.",
    ctaText: "Upgrade at ₹650",
    ctaHref: "/broadband-services",
    secondaryCtaText: "View Plans",
    secondaryCtaHref: "/#plans",
    imageSrc: "/Hero/hero-broadband.jpg",
    imageAlt:
      "Young man using laptop with glowing red speedometer dial and high-speed fibre light trails",
    maskShape: "crescent",
    imagePosition: "object-center",
    backdropColor: "#050001",
  },
  {
    id: "leased-line",
    serviceLabel: "1:1 Internet Leased Line",
    serviceIcon: "/Service/Leased Line.webp",
    eyebrow: "DEDICATED ENTERPRISE CONNECTIVITY",
    headlinePrefix: "1:1 Dedicated",
    headlineHighlight: "Leased Lines.",
    subtitle:
      "That's the Enterprise advantage — uncontended symmetrical fibre with SLA-backed uptime and static IP routing.",
    ctaText: "Get Leased Line Quote",
    ctaHref: "/lease-line",
    secondaryCtaText: "Check Feasibility",
    secondaryCtaHref: "/#contact",
    imageSrc: "/Hero/hero-leased-line.jpg",
    imageAlt:
      "Enterprise server racks in a high-tech data corridor connected with high-speed glowing red optical fibre lines for dedicated 1:1 leased line",
    maskShape: "chevron",
    imagePosition: "object-center",
    backdropColor: "#05070E",
  },
  {
    id: "sme-internet",
    serviceLabel: "SME Business Internet",
    serviceIcon: "/Service/SME Internet.webp",
    eyebrow: "HIGH-UPTIME BUSINESS BROADBAND",
    headlinePrefix: "Built for growing",
    headlineHighlight: "businesses.",
    subtitle:
      "That's the SME Internet advantage — priority routing, symmetrical bandwidth, and price lock for offices & retail.",
    ctaText: "Explore SME Plans",
    ctaHref: "/sme-internet",
    secondaryCtaText: "Request Callback",
    secondaryCtaHref: "/#contact",
    imageSrc: "/Hero/hero-sme.jpg",
    imageAlt:
      "Indian business professional holding laptop with glowing red growth chart and upward arrow in front of modern corporate towers",
    maskShape: "arch",
    imagePosition: "object-center",
    backdropColor: "#080710",
  },
  {
    id: "cctv",
    serviceLabel: "HD IP CCTV Surveillance",
    serviceIcon: "/Service/CCTV.webp",
    eyebrow: "SMART PREMISES SURVEILLANCE",
    headlinePrefix: "24/7 Smart",
    headlineHighlight: "CCTV Security.",
    subtitle:
      "That's the SASH Surveillance advantage — live HD mobile viewing and end-to-end IP camera installation.",
    ctaText: "Book Free Site Survey",
    ctaHref: "/cctv",
    secondaryCtaText: "Talk to Engineer",
    secondaryCtaHref: "/#contact",
    imageSrc: "/Hero/hero-cctv.jpg",
    imageAlt:
      "High-definition architectural dome CCTV security camera with glowing red surveillance scanning halo mounted on modern commercial premises",
    maskShape: "shield",
    imagePosition: "object-center",
    backdropColor: "#0B0C12",
  },
  {
    id: "intranet",
    serviceLabel: "Private Multi-Site Intranet",
    serviceIcon: "/Service/Intranet.webp",
    eyebrow: "MULTI-BRANCH OPTICAL LAN & WAN",
    headlinePrefix: "Secure Multi-Site",
    headlineHighlight: "Intranet.",
    subtitle:
      "That's the Private Network advantage — secure optical LAN interconnecting offices, warehouses, and campuses.",
    ctaText: "Request Consultation",
    ctaHref: "/intranet",
    secondaryCtaText: "Check Coverage",
    secondaryCtaHref: "/#contact",
    imageSrc: "/Hero/hero-intranet.jpg",
    imageAlt:
      "Modern corporate campus interconnected with glowing red optical paths and secure red padlock dome for private multi-site intranet",
    maskShape: "double-wave",
    imagePosition: "object-center",
    backdropColor: "#060A14",
  },
];

const PROMISE_ITEMS = [
  {
    title: "Free setup on your first connection",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Up to 1 Gbps download speed",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "24/7 customer support",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    title: "Price lock for 1 to 2 years on home plans",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

function LeftEdgeCutoutMask() {
  return (
    <svg
      className="hidden lg:block absolute -left-px top-0 h-full w-[135px] xl:w-[165px] z-10 pointer-events-none"
      viewBox="0 0 180 600"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 0H156C174 85 162 195 96 300C45 385 18 505 41 600H0V0Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const currentSlide = HERO_SERVICE_SLIDES[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) =>
        prev === HERO_SERVICE_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? HERO_SERVICE_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) =>
      prev === HERO_SERVICE_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  const textSlideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 48 : -48,
      filter: "blur(6px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -48 : 48,
      filter: "blur(6px)",
    }),
  };

  const imageSlideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? "14%" : "-14%",
    }),
    center: {
      opacity: 1,
      x: "0%",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? "-14%" : "14%",
    }),
  };

  return (
    <>
      {/* 1. Carousel Hero Section with Hero-17 Typography & Button Design System */}
      <section
        data-apple-manual="true"
        aria-labelledby="hero-heading"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full lg:h-[64vh] lg:min-h-[520px] lg:max-h-[620px] bg-white text-brand-navy relative overflow-hidden font-sans antialiased"
      >
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Content Column (7 of 12 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between px-5 sm:px-10 lg:pl-[max(20px,calc((100vw-1180px)/2+20px))] lg:pr-8 py-10 sm:py-12 lg:py-12 z-20 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={textSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: APPLE_EASE }}
                className="my-auto max-w-xl"
              >
                {/* Hero-17 Eyebrow Badge */}
                <div className="inline-flex min-h-7 items-center justify-center gap-2 rounded-sm bg-red-10/80 px-3 text-xs leading-none font-medium font-mono text-brand-navy shadow-[0_1px_1px_rgba(1,13,59,0.06),inset_0_1px_0_rgba(255,255,255,0.55)]">
                  {currentSlide.eyebrow}
                </div>

                {/* Hero-17 Heading Style */}
                <h1
                  id="hero-heading"
                  className="mt-5 text-[clamp(2.4rem,3.6vw,4.1rem)] leading-[1.03] font-normal tracking-tight text-balance text-brand-navy"
                >
                  <span className="inline-block mr-[0.22em]">
                    {currentSlide.headlinePrefix}
                  </span>
                  <span className="inline-block font-normal text-brand-red">
                    {currentSlide.headlineHighlight}
                  </span>
                </h1>

                {/* Hero-17 Description Style */}
                <p className="mt-5 max-w-md text-sm sm:text-base leading-6 font-normal text-pretty text-neutral-600">
                  {currentSlide.subtitle}
                </p>

                {/* Hero-17 Primary & Secondary CTA Buttons with SASH Brand Colors */}
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    href={currentSlide.ctaHref}
                    className="group/primary inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-linear-to-b from-brand-red to-brand-red-hover px-6 text-sm font-normal text-white shadow-[0_6px_20px_var(--color-red-10)] outline-2 -outline-offset-2 outline-white/20 transition-[background-color,transform,box-shadow] duration-200 ease-out hover:from-brand-red-hover hover:to-brand-red-hover hover:bg-brand-red-hover active:scale-[0.96]"
                  >
                    {currentSlide.ctaText}
                    <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/primary:translate-x-0.5" />
                  </Link>

                  <Link
                    href={currentSlide.secondaryCtaHref}
                    className="group/process inline-flex min-h-10 items-center justify-center gap-2 px-2 text-sm font-normal text-brand-navy transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96]"
                  >
                    {currentSlide.secondaryCtaText}
                    <Play className="size-3 fill-current transition-transform duration-200 ease-out group-hover/process:scale-110" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom-Left Slide Navigation Controls (← 1/5 →) */}
            <div
              className="flex items-center gap-5 pt-8 lg:pt-4"
              aria-label="Hero slide controls"
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-sm border border-brand-navy/20 text-brand-navy/80 hover:border-brand-navy hover:text-brand-navy flex items-center justify-center transition-[color,border-color,transform] duration-200 ease-out active:scale-[0.96] cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
              </button>

              <span
                className="text-xs sm:text-sm font-mono font-medium text-brand-navy tabular-nums"
                aria-live="polite"
              >
                {activeIndex + 1}/{HERO_SERVICE_SLIDES.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="w-9 h-9 rounded-sm bg-linear-to-b from-brand-red to-brand-red-hover text-white shadow-[0_4px_14px_var(--color-red-10)] outline-2 -outline-offset-2 outline-white/20 hover:from-brand-red-hover hover:to-brand-red-hover hover:bg-brand-red-hover flex items-center justify-center transition-[background-color,transform,box-shadow] duration-200 ease-out active:scale-[0.96] cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Image Column (5 of 12 columns on desktop) */}
          <div
            style={{ backgroundColor: currentSlide.backdropColor || "#090001" }}
            className="lg:col-span-5 relative w-full h-[360px] sm:h-[420px] lg:h-full overflow-hidden transition-colors duration-500"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={imageSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: APPLE_EASE }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentSlide.imageSrc}
                  alt={currentSlide.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={`object-cover ${currentSlide.imagePosition || "object-center"}`}
                />
              </motion.div>
            </AnimatePresence>

            {/* Signature Organic Left-Edge SVG Cutout Mask from shared_img */}
            <LeftEdgeCutoutMask />

            {/* Floating Service Icon Badge on Right Photo */}
            <div className="absolute bottom-5 right-5 z-20 rounded-sm bg-white/95 border border-neutral-100 px-3.5 py-2 flex items-center gap-2.5 shadow-[0_4px_14px_rgba(1,13,59,0.08)]">
              <Image
                src={currentSlide.serviceIcon}
                alt={currentSlide.serviceLabel}
                width={26}
                height={26}
                className="w-6.5 h-6.5 object-contain shrink-0"
              />
              <span className="text-xs font-mono font-medium text-brand-navy">
                {currentSlide.serviceLabel}
              </span>
            </div>

            {/* Mobile Top Cutout Mask */}
            <svg
              className="lg:hidden absolute -top-px left-0 w-full h-10 z-10 pointer-events-none"
              viewBox="0 0 600 60"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0 0H600V25C420 65 180 65 0 25V0Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. Promise Strip (Red background, White text, 4 columns on desktop) */}
      <section
        data-apple-manual="true"
        aria-label="SASH Broadband Customer Promises"
        className="bg-brand-red text-white py-8"
      >
        <div className="container-sash">
          <AppleStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROMISE_ITEMS.map((item) => (
              <AppleStaggerItem
                key={item.title}
                className="flex items-center gap-3.5 bg-[#B80201] rounded-[14px] px-5 py-4 border border-white/25"
              >
                <div className="w-11 h-11 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span className="font-normal text-sm sm:text-base leading-snug text-white">
                  {item.title}
                </span>
              </AppleStaggerItem>
            ))}
          </AppleStagger>
        </div>
      </section>
    </>
  );
}
