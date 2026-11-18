"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Zap, Wifi, Network, ShieldCheck } from "lucide-react";
import { AppleReveal } from "@/components/ui/apple-scroll";

interface MapLogoPin {
  id: string;
  logoSrc: string;
  alt: string;
  left: string;
  top: string;
  sizeClass: string;
  imgSize: number;
}

const MAP_LOGO_PINS: MapLogoPin[] = [
  {
    id: "pin-chennai-thiruvallur",
    logoSrc: "/Marquee/1.jpg",
    alt: "Enterprise Partner Hub Thiruvallur & Chennai",
    left: "76%",
    top: "14%",
    sizeClass: "w-7 h-7 sm:w-8 sm:h-8",
    imgSize: 26,
  },
  {
    id: "pin-vellore",
    logoSrc: "/Marquee/3.jpg",
    alt: "Enterprise Partner Hub Vellore",
    left: "54%",
    top: "22%",
    sizeClass: "w-6 h-6 sm:w-7 sm:h-7",
    imgSize: 22,
  },
  {
    id: "pin-salem",
    logoSrc: "/Marquee/5.jpg",
    alt: "Enterprise Partner Hub Salem",
    left: "42%",
    top: "38%",
    sizeClass: "w-5 h-5 sm:w-6 sm:h-6",
    imgSize: 20,
  },
  {
    id: "pin-coimbatore",
    logoSrc: "/Marquee/7.jpg",
    alt: "Enterprise Partner Hub Coimbatore",
    left: "26%",
    top: "52%",
    sizeClass: "w-6 h-6 sm:w-7 sm:h-7",
    imgSize: 22,
  },
  {
    id: "pin-trichy",
    logoSrc: "/Marquee/12.jpg",
    alt: "Enterprise Partner Hub Tiruchirappalli",
    left: "58%",
    top: "48%",
    sizeClass: "w-6 h-6 sm:w-7 sm:h-7",
    imgSize: 22,
  },
  {
    id: "pin-madurai",
    logoSrc: "/Marquee/18.jpg",
    alt: "Enterprise Partner Hub Madurai",
    left: "46%",
    top: "68%",
    sizeClass: "w-7 h-7 sm:w-8 sm:h-8",
    imgSize: 24,
  },
  {
    id: "pin-tirunelveli",
    logoSrc: "/Marquee/24.jpg",
    alt: "Enterprise Partner Hub Tirunelveli",
    left: "38%",
    top: "84%",
    sizeClass: "w-6 h-6 sm:w-7 sm:h-7",
    imgSize: 20,
  },
];

interface BusinessService {
  id: string;
  step: string;
  eyebrow: string;
  title: string;
  description: string;
}

const BUSINESS_SERVICES: BusinessService[] = [
  {
    id: "leased-line",
    step: "01",
    eyebrow: "ENTERPRISE LEASED LINE",
    title: "Uninterrupted secure communications",
    description:
      "Dedicated uncontended 1:1 symmetrical fibre with 99.9% SLA-backed uptime, sub-5ms low latency, and dual-ring failover to keep your banking transactions, ERP syncing, and mission-critical operations online 24/7.",
  },
  {
    id: "sme-plans",
    step: "02",
    eyebrow: "SME BROADBAND",
    title: "Scalable SME plans",
    description:
      "High-bandwidth business fibre packages engineered for retail stores, multi-counter clinics, corporate branches, and growing teams. Scale bandwidth seamlessly on demand without disruption or tariff surprises.",
  },
  {
    id: "private-intranet",
    step: "03",
    eyebrow: "MULTI-SITE WAN",
    title: "Private intranet",
    description:
      "Direct branch-to-branch secure intranet connectivity across Tamil Nadu without public internet traversal. Link your headquarters, factories, warehouses, and branch offices over an isolated optical circuit.",
  },
  {
    id: "cctv-surveillance",
    step: "04",
    eyebrow: "PREMISES SURVEILLANCE",
    title: "CCTV for premises",
    description:
      "Commercial HD IP CCTV surveillance with 24/7 centralized cloud and NVR storage, AI motion & intrusion detection, night vision clarity, and real-time remote mobile live feeds.",
  },
];

export default function Business() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Track overall scroll progress through this 360vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to a step index with resting plateaus for comfortable reading:
  // 0.00-0.18: Card 0 resting | 0.18-0.28: Transition 0->1
  // 0.28-0.46: Card 1 resting | 0.46-0.56: Transition 1->2
  // 0.56-0.74: Card 2 resting | 0.74-0.84: Transition 2->3
  // 0.84-1.00: Card 3 resting
  const cardProgress = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28, 0.46, 0.56, 0.74, 0.84, 1.0],
    [0, 0, 1, 1, 2, 2, 3, 3]
  );

  // Apple-smooth spring physics on scroll progress
  const smoothProgress = useSpring(cardProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  });

  // Keep activeStep updated for the indicator dots
  useEffect(() => {
    return cardProgress.on("change", (latest) => {
      setActiveStep(Math.min(3, Math.max(0, Math.round(latest))));
    });
  }, [cardProgress]);

  // Jump smoothly to a specific card when clicking an indicator
  const jumpToStep = (idx: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const targetScroll =
      sectionTop + (idx / 3) * (sectionHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="business"
      data-apple-manual="true"
      aria-labelledby="business-heading"
      className="relative h-[360vh] w-full bg-white text-brand-navy"
    >
      {/* Sticky Viewport Stage: Locks during the 360vh scroll and drives synchronous transitions */}
      <div className="sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden py-4 sm:py-6 lg:py-8">
        <div className="container-sash w-full my-auto">
          {/* Header (compact & clean inside the viewport stage) */}
          <AppleReveal className="max-w-3xl mx-auto text-center flex flex-col items-center mb-6 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/60 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2.5">
              ENTERPRISES &amp; SMES
            </div>
            <h2
              id="business-heading"
              className="text-brand-navy font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-normal leading-[1.15] mb-2 text-balance"
            >
              Enterprise-grade connectivity for{" "}
              <span className="text-blue-600">Tamil Nadu businesses</span>
            </h2>
          </AppleReveal>

          {/* Proper 12-Column Grid: 5 cols Left (Text moves upwards), 7 cols Right (Centered Blue Shape) */}
          <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full max-w-6xl mx-auto">
            {/* Left Column (5 of 12 cols): Title & Description move UPWARDS, next comes FROM BOTTOM */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
              {/* Step indicator bar */}
              <div className="flex items-center gap-2 mb-4">
                {BUSINESS_SERVICES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jumpToStep(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === idx
                        ? "w-8 bg-blue-600"
                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Jump to ${s.title}`}
                  />
                ))}
              </div>

              {/* Text Stage Viewport (items crossfade & move upwards) */}
              <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] w-full overflow-hidden">
                {BUSINESS_SERVICES.map((service, idx) => (
                  <TextSlide
                    key={service.id}
                    index={idx}
                    smoothProgress={smoothProgress}
                    eyebrow={service.eyebrow}
                    title={service.title}
                    description={service.description}
                  />
                ))}
              </div>
            </div>

            {/* Right Column (7 of 12 cols): Persistent Blue Container Stays Centered */}
            <div className="col-span-12 lg:col-span-7 flex items-center justify-center">
              {/* The Blue Rounded Shape (Images transition STRICTLY INSIDE this shape) */}
              <div className="w-full max-w-[620px] h-[460px] sm:h-[500px] lg:h-[520px] rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#F2F8FF] via-[#DBEAFE] to-[#2563EB] shadow-[0px_20px_60px_rgba(37,99,235,0.18)] border border-blue-200/50 relative overflow-hidden select-none">
                {/* Dashboard Slides (Cards move upwards inside this shape) */}
                <DashboardSlide index={0} smoothProgress={smoothProgress}>
                  <LeasedLineDashboard />
                </DashboardSlide>

                <DashboardSlide index={1} smoothProgress={smoothProgress}>
                  <SmeDashboard />
                </DashboardSlide>

                <DashboardSlide index={2} smoothProgress={smoothProgress}>
                  <IntranetDashboard />
                </DashboardSlide>

                <DashboardSlide index={3} smoothProgress={smoothProgress}>
                  <CctvDashboard />
                </DashboardSlide>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================= */
/* TEXT SLIDE: Moves UPWARDS on scroll, next comes FROM BOTTOM               */
/* ========================================================================= */
function TextSlide({
  index,
  smoothProgress,
  eyebrow,
  title,
  description,
}: {
  index: number;
  smoothProgress: MotionValue<number>;
  eyebrow: string;
  title: string;
  description: string;
}) {
  // When smoothProgress = index: y = 0px, opacity = 1
  // When smoothProgress < index (coming from bottom): y = +100px
  // When smoothProgress > index (moving upwards): y = -100px
  const y = useTransform(
    smoothProgress,
    [index - 0.9, index - 0.4, index, index + 0.4, index + 0.9],
    [100, 35, 0, -35, -100]
  );

  const opacity = useTransform(
    smoothProgress,
    [index - 0.6, index - 0.25, index, index + 0.25, index + 0.6],
    [0, 1, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-center will-change-transform"
    >
      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2 sm:mb-3 block">
        {eyebrow}
      </span>
      <h3 className="text-brand-navy font-semibold text-2xl sm:text-3xl lg:text-[38px] leading-[1.15] tracking-normal mb-3 sm:mb-4">
        {title}
      </h3>
      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
        {description}
      </p>
    </motion.div>
  );
}

/* ========================================================================= */
/* DASHBOARD SLIDE: Moves UPWARDS inside the blue rounded shape              */
/* ========================================================================= */
function DashboardSlide({
  index,
  smoothProgress,
  children,
}: {
  index: number;
  smoothProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  // When smoothProgress = index: y = 0px, opacity = 1
  // When smoothProgress < index: comes from bottom (y = +440px)
  // When smoothProgress > index: moves upwards and exits through top (y = -440px)
  const y = useTransform(
    smoothProgress,
    [index - 0.9, index - 0.45, index, index + 0.45, index + 0.9],
    [440, 180, 0, -180, -440]
  );

  const opacity = useTransform(
    smoothProgress,
    [index - 0.7, index - 0.2, index, index + 0.2, index + 0.7],
    [0, 1, 1, 1, 0]
  );

  const scale = useTransform(
    smoothProgress,
    [index - 0.5, index, index + 0.5],
    [0.96, 1, 0.96]
  );

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="absolute inset-0 flex items-center justify-center p-3 sm:p-5 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

/* ========================================================================= */
/* DASHBOARD COMPONENT 1: Leased Line (Uninterrupted secure communications) */
/* ========================================================================= */
function LeasedLineDashboard() {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-3.5 sm:p-4.5 w-full">
      {/* Top Row: Metric Box 1 & Metric Box 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
        {/* Top-Left: Uptime SLA & Bar Chart */}
        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                <Zap className="size-3" />
              </span>
              <span className="text-xs font-semibold text-brand-navy">
                Network Uptime
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
              Live SLA: 99.98%
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight">
              99.98%
            </span>
            <span className="text-[10px] font-medium text-emerald-600">
              +0.08% over SLA
            </span>
          </div>

          {/* 10 Vertical Availability Bars */}
          <div className="flex items-end justify-between gap-1.5 h-10 pt-1.5 border-t border-neutral-200/60">
            {[94, 98, 100, 96, 100, 100, 97, 100, 100, 100].map(
              (height, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                >
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-xs transition-all duration-300 ${
                      idx === 9
                        ? "bg-brand-red"
                        : idx % 2 === 0
                        ? "bg-blue-600"
                        : "bg-blue-400"
                    }`}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Top-Right: Sparkline Metrics */}
        <div className="sm:col-span-5 flex flex-col gap-2">
          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                Download Speed
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Symmetrical
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                1,000 Mbps
              </span>
              <svg
                className="w-14 h-5 text-emerald-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 16 L12 14 L24 8 L36 11 L48 4 L60 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                Upload Speed
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-blue-50 text-blue-700">
                1:1 Contention
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                1,000 Mbps
              </span>
              <svg
                className="w-14 h-5 text-emerald-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 18 L14 12 L28 15 L40 6 L50 8 L60 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Throughput Area Graph & Insights Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-100/70 text-blue-800">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Primary ILL
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-red-10 text-brand-red">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                Dual Failover
              </span>
            </div>
            <span className="text-[9px] text-neutral-500 font-mono">
              Live 24h Feed
            </span>
          </div>

          <div className="relative h-20 w-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 320 80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="blueAreaGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="18"
                x2="320"
                y2="18"
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="44"
                x2="320"
                y2="44"
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="70"
                x2="320"
                y2="70"
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />

              <path
                d="M0,65 C40,60 70,48 110,52 C150,58 180,38 220,44 C260,18 280,26 320,12 L320,80 L0,80 Z"
                fill="url(#blueAreaGrad)"
              />
              <path
                d="M0,65 C40,60 70,48 110,52 C150,58 180,38 220,44 C260,18 280,26 320,12"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
              />
              <path
                d="M0,72 C50,70 90,56 140,62 C190,34 230,48 270,30 C295,40 310,32 320,24"
                fill="none"
                stroke="#DE0302"
                strokeWidth="1.6"
              />
            </svg>
          </div>
        </div>

        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>ILL METRICS</span>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">Latency</span>
              <span className="font-semibold text-emerald-600">4.2 ms</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">Packet Loss</span>
              <span className="font-semibold text-emerald-600">0.00%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Ring Failover</span>
              <span className="font-semibold text-blue-600">Synced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* DASHBOARD COMPONENT 2: SME Broadband (Scalable SME plans)                 */
/* ========================================================================= */
function SmeDashboard() {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-3.5 sm:p-4.5 w-full">
      {/* Top Row: Metric Box 1 & Metric Box 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center">
                <Wifi className="size-3" />
              </span>
              <span className="text-xs font-semibold text-brand-navy">
                Active Usage Load
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 font-medium">
              Tier: 500 Mbps
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight">
              342 Mbps
            </span>
            <span className="text-[10px] font-medium text-sky-700">
              Peak 420 Mbps
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-10 pt-1.5 border-t border-neutral-200/60">
            {[45, 60, 75, 88, 92, 85, 78, 65, 50, 42].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className={`w-full rounded-xs transition-all duration-300 ${
                    idx === 4 ? "bg-brand-red" : "bg-sky-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-5 flex flex-col gap-2">
          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                Active Endpoints
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Optimal
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                48 Devices
              </span>
              <svg
                className="w-14 h-5 text-emerald-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 15 L12 11 L24 14 L36 8 L48 10 L60 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                Cloud QoS Rate
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-blue-50 text-blue-700">
                High Priority
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                99.85%
              </span>
              <svg
                className="w-14 h-5 text-emerald-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 16 L15 10 L30 12 L42 6 L52 7 L60 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Multi-App Split Graph & Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-sky-100/70 text-sky-800">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                Cloud ERP &amp; POS
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-neutral-200/60 text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                Office Wi-Fi
              </span>
            </div>
            <span className="text-[9px] text-neutral-500 font-mono">
              Zero Throttling
            </span>
          </div>

          <div className="relative h-20 w-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 320 80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="skyAreaGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="18"
                x2="320"
                y2="18"
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="44"
                x2="320"
                y2="44"
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="70"
                x2="320"
                y2="70"
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />

              <path
                d="M0,60 C50,55 90,34 140,48 C190,60 230,28 270,34 C295,20 310,24 320,14 L320,80 L0,80 Z"
                fill="url(#skyAreaGrad)"
              />
              <path
                d="M0,60 C50,55 90,34 140,48 C190,60 230,28 270,34 C295,20 310,24 320,14"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2"
              />
              <path
                d="M0,70 C45,66 85,50 135,58 C185,46 225,42 265,36 C295,32 310,28 320,22"
                fill="none"
                stroke="#4A4F63"
                strokeWidth="1.4"
              />
            </svg>
          </div>
        </div>

        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>SME INSIGHTS</span>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">POS Billing</span>
              <span className="font-semibold text-emerald-600">Realtime</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">Capacity</span>
              <span className="font-semibold text-sky-700">+35% Reserve</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Price Lock</span>
              <span className="font-semibold text-brand-navy">2-Year Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* DASHBOARD COMPONENT 3: Private Intranet (Private intranet)                */
/* ========================================================================= */
function IntranetDashboard() {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-3.5 sm:p-4.5 w-full">
      {/* Top Row: Metric Box 1 & Metric Box 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Network className="size-3" />
              </span>
              <span className="text-xs font-semibold text-brand-navy">
                Tamil Nadu WAN Nodes
              </span>
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">
              100% Synced
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight">
              7 Hubs Active
            </span>
            <span className="text-[10px] font-medium text-neutral-500">
              Avg 3.4ms
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-10 pt-1.5 border-t border-neutral-200/60">
            {[100, 100, 98, 100, 96, 100, 100].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className={`w-full rounded-xs transition-all duration-300 ${
                    idx === 0 ? "bg-brand-red" : "bg-indigo-600"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-5 flex flex-col gap-2">
          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                Tunnel Security
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                AES-256
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                Encrypted
              </span>
              <svg
                className="w-14 h-5 text-indigo-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 16 L12 12 L24 8 L36 10 L48 5 L60 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                Branch Sync Rate
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                99.99%
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                Zero Loss
              </span>
              <svg
                className="w-14 h-5 text-emerald-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 18 L14 14 L28 10 L40 8 L52 4 L60 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tamil Nadu Halftone Silhouette Map with Hub Pins */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex items-center justify-center relative overflow-hidden h-32">
          <div className="relative w-full h-full max-w-[240px]">
            <Image
              src="/map/Tamil Nadu Halftone Silhouette.png"
              alt="Tamil Nadu Private Optical WAN Interconnect"
              fill
              sizes="240px"
              className="object-contain select-none pointer-events-none drop-shadow-sm opacity-90"
            />
            {MAP_LOGO_PINS.map((pin) => (
              <div
                key={pin.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: pin.left, top: pin.top }}
              >
                <div
                  className={`relative rounded-full bg-white border border-brand-navy/15 shadow-sm p-0.5 flex items-center justify-center transition-transform hover:scale-125 ${pin.sizeClass}`}
                >
                  <Image
                    src={pin.logoSrc}
                    alt={pin.alt}
                    width={pin.imgSize}
                    height={pin.imgSize}
                    className="object-contain max-h-full max-w-full rounded-full select-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            <span>WAN INSIGHTS</span>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">HQ ↔ Plants</span>
              <span className="font-semibold text-emerald-600">2.1 ms</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">Web Exposure</span>
              <span className="font-semibold text-emerald-600">0.00%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Encryption</span>
              <span className="font-semibold text-brand-navy">Hardware</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* DASHBOARD COMPONENT 4: CCTV Surveillance (CCTV for premises)              */
/* ========================================================================= */
function CctvDashboard() {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-3.5 sm:p-4.5 w-full">
      {/* Top Row: Metric Box 1 & Metric Box 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-red-10 text-brand-red flex items-center justify-center">
                <ShieldCheck className="size-3" />
              </span>
              <span className="text-xs font-semibold text-brand-navy">
                Surveillance Feeds
              </span>
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">
              100% Online
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight">
              16 / 16 Live
            </span>
            <span className="text-[10px] font-medium text-emerald-600">
              0 Offline
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-10 pt-1.5 border-t border-neutral-200/60">
            {[100, 100, 100, 100, 100, 100, 100, 100].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className="w-full rounded-xs bg-brand-red transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-5 flex flex-col gap-2">
          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                Cloud Retention
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Encrypted
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                30 Days HD
              </span>
              <svg
                className="w-14 h-5 text-emerald-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 16 L12 10 L24 14 L36 8 L48 10 L60 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">
                AI Intrusion Filter
              </span>
              <span className="text-[8px] font-semibold px-1 py-0.5 rounded-full bg-blue-50 text-blue-700">
                99.9%
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm sm:text-base font-bold text-brand-navy">
                0 False Alarms
              </span>
              <svg
                className="w-14 h-5 text-emerald-500 overflow-visible"
                viewBox="0 0 60 20"
                fill="none"
              >
                <path
                  d="M0 18 L15 12 L30 14 L42 8 L52 6 L60 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: 4-Camera Live Grid Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-brand-navy">
              Premises Live Feeds (4 of 16)
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-brand-red font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
              LIVE REC
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              {
                label: "Cam 01: Warehouse Main Gate",
                time: "1080p 60fps",
              },
              { label: "Cam 02: Server Corridor", time: "1080p 60fps" },
              { label: "Cam 03: Loading Dock", time: "1080p 60fps" },
              { label: "Cam 04: Reception Entry", time: "1080p 60fps" },
            ].map((cam, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-neutral-900 text-white p-1.5 flex flex-col justify-between h-12 relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-[8px] text-white/80">
                  <span className="truncate max-w-[90px]">{cam.label}</span>
                  <span className="text-brand-red font-bold">REC</span>
                </div>
                <div className="flex items-center justify-between text-[8px] text-white/50 font-mono">
                  <span>{cam.time}</span>
                  <span className="text-emerald-400">● LIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-navy mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>CCTV INSIGHTS</span>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">Night Vision</span>
              <span className="font-semibold text-emerald-600">Smart IR</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <span className="text-neutral-600">Storage</span>
              <span className="font-semibold text-brand-navy">NVR + Cloud</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Remote App</span>
              <span className="font-semibold text-blue-600">iOS &amp; Android</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
