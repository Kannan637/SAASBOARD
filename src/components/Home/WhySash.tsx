"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  BatteryFull,
  CheckCircle2,
  ChevronRight,
  Globe,
  Headphones,
  MessageSquare,
  PhoneCall,
  RotateCcw,
  Router,
  ShieldCheck,
  Signal,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Gauge } from "@/components/charts/gauge";
import {
  GlobeStickers,
  type StickerMarker,
} from "@/components/ui/cobe-globe-stickers";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CARD_BG_GRADIENT =
  "bg-[linear-gradient(145deg,#FDEBEB_0%,#DE0302_52%,#B80201_100%)]";

const CARD_BOTTOM_BLEND =
  "pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.45)_40%,rgba(255,255,255,0.85)_75%,#FFFFFF_100%)]";

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export interface FlippableFeatureCardProps {
  className?: string;
  ariaLabel: string;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

/**
 * 3D Flippable Feature Card:
 * Flips 180deg on desktop hover or mobile tap to reveal full description and feature points.
 * Front face shows visual stage + title only.
 */
export function FlippableFeatureCard({
  className = "",
  ariaLabel,
  frontContent,
  backContent,
}: FlippableFeatureCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={cardItemVariants}
      className={`group/flip relative h-full min-h-[440px] min-[360px]:min-h-[460px] sm:min-h-[480px] [perspective:1200px] select-none ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped && !shouldReduceMotion ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Face: Visual Stage + Title Only */}
        <div
          className="w-full h-full flex flex-col justify-between bg-white text-brand-navy border border-black/[0.08] rounded-[28px] shadow-none overflow-hidden cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {frontContent}
        </div>

        {/* Back Face: Description, Bullet Points, and Action */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between bg-white text-brand-navy border border-black/[0.08] rounded-[28px] shadow-none overflow-hidden p-7 sm:p-8 lg:p-9 z-20 cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {backContent}
        </div>
      </div>
    </motion.article>
  );
}

export function FeatureCard({
  className = "",
  cardClassName = "",
  ariaLabel,
  children,
}: {
  className?: string;
  cardClassName?: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      variants={cardItemVariants}
      className={`group relative h-full ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      <Card
        className={`relative h-full border border-black/[0.08] bg-white text-brand-navy rounded-[28px] shadow-none ${cardClassName}`}
      >
        {children}
      </Card>
    </motion.article>
  );
}

const SPEED_ANIMATION_STEPS = [
  { value: 75, mbps: 780 },
  { value: 90, mbps: 940 },
  { value: 100, mbps: 1000 },
  { value: 82, mbps: 860 },
  { value: 95, mbps: 990 },
] as const;

/**
 * Card 01 — 100% Optical Fibre (Top-Left Wide Hero Bento: 8 of 12 columns on desktop)
 * Top: 45% Visible iPhone on Gradient Background with Animated Bklit Studio Gauge
 * Below: Title & Description
 */
export function FibreSpeedCard() {
  const gaugeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gaugeRef, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setStepIndex((prev) => (prev + 1) % SPEED_ANIMATION_STEPS.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [isInView, shouldReduceMotion]);

  const activeStep = SPEED_ANIMATION_STEPS[stepIndex];
  const gaugeValue = !isInView ? 0 : isHovered ? 100 : activeStep.value;
  const gaugeCenterValue = !isInView ? 0 : isHovered ? 1000 : activeStep.mbps;

  return (
    <FlippableFeatureCard
      ariaLabel="100% Optical Fibre — Up to 1 Gbps"
      className="col-span-12 md:col-span-6"
      frontContent={
        <CardContent
          ref={gaugeRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-10 p-0 flex-1 flex flex-col justify-between overflow-hidden h-full"
        >
          {/* Top iPhone Section with Card Gradient Background (Edge-to-Edge) */}
          <div
            className={`relative w-full overflow-hidden ${CARD_BG_GRADIENT} pt-3 min-[360px]:pt-4 sm:pt-6 px-3 flex justify-center`}
          >
            {/* Smooth Blend into Bottom White Section */}
            <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-20`} />

            {/* iPhone Hardware Mockup (Top-Center Aligned Speed Meter) */}
            <div className="relative z-10 mx-auto w-[270px] min-[360px]:w-[300px] sm:w-[340px] shrink-0">
              {/* Visible Viewport Window */}
              <div className="relative h-[240px] min-[360px]:h-[265px] sm:h-[295px] w-full overflow-hidden">
                {/* Full iPhone Container */}
                <div className="relative h-[530px] min-[360px]:h-[590px] sm:h-[665px] w-full">
                  {/* Inner iOS Screen — Remains White */}
                  <div className="absolute left-[2.9%] right-[2.9%] top-[1.4%] bottom-[1.4%] z-10 overflow-hidden rounded-[38px] min-[360px]:rounded-[46px] sm:rounded-[52px] bg-white flex flex-col items-center">
                    {/* iOS Status Bar */}
                    <div className="w-full shrink-0 flex h-[34px] min-[360px]:h-[38px] sm:h-[44px] items-center justify-between px-5 min-[360px]:px-7 sm:px-8 pt-1.5 min-[360px]:pt-2">
                      <span className="text-[11px] min-[360px]:text-[12px] sm:text-[13px] font-medium text-brand-navy">
                        9:41
                      </span>
                      <div className="flex items-center gap-1.5 text-brand-navy">
                        <Signal size={13} />
                        <Wifi size={13} />
                        <BatteryFull size={15} />
                      </div>
                    </div>

                    {/* Bklit Studio Gauge Chart Aligned in Top Center of Phone Screen */}
                    <div className="w-full flex items-center justify-center pt-0.5 sm:pt-1 px-3 min-[360px]:px-4 sm:px-6">
                      <div className="w-full max-w-[205px] min-[360px]:max-w-[230px] sm:max-w-[270px] mx-auto flex items-center justify-center">
                        <Gauge
                          value={gaugeValue}
                          centerValue={gaugeCenterValue}
                          defaultLabel="Peak FTTH Speed"
                          suffix=" Mbps"
                          startAngle={135}
                          endAngle={405}
                          totalNotches={40}
                          spacing={25}
                          notchCornerRadius={0}
                          notchLengthPercent={100}
                          useGradient={false}
                          inactiveFillOpacity={0.4}
                          activeFillOpacity={1}
                          enterTransition={{
                            type: "tween",
                            duration: 1.1,
                            ease: [0.85, 0, 0.15, 1],
                          }}
                          enterStaggerScale={1.0}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hardware iPhone Frame Overlay (/Frame/Iphone Frame.png) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Frame/Iphone%20Frame.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute left-[-126.45%] top-[-3.2%] w-[352.48%] h-[105.25%] max-w-none z-20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Front Bottom: Title Only */}
          <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto w-full flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wider mb-1">
                100% Optical Fibre
              </p>
              <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal">
                Up to 1 Gbps
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 group-hover/flip:text-brand-red transition-colors shrink-0">
              <span className="hidden sm:inline">Details</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/flip:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      }
      backContent={
        <div className="flex flex-col justify-between h-full bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-6 sm:mb-7">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EBF2FE] text-[#1A73E8] flex items-center justify-center shrink-0">
                <Zap className="size-6 sm:size-7" />
              </div>
              <span className="text-neutral-400 hover:text-brand-navy text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 transition-colors">
                <RotateCcw className="size-3" />
                <span className="hidden min-[400px]:inline">Flip back</span>
              </span>
            </div>

            <h3 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-tight leading-[1.28] mb-5 sm:mb-6">
              Up to 1 Gbps Ultra-Speed FTTH Pure Optical Fibre
            </h3>

            <ul className="space-y-3 sm:space-y-3.5 mb-6">
              {[
                "Symmetrical 1:1 upload & download bandwidth up to 1000 Mbps",
                "Ultra-low latency (<5ms) engineered for 4K streaming and pro gaming",
                "Dedicated GPON optical fiber directly routed to your premise",
                "True unlimited data with zero peak-time speed throttling",
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-[15px] leading-relaxed">
                  <span className="size-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-black/[0.06] mt-auto flex items-center justify-between">
            <Link
              href="/broadband-services"
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-red hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Explore Broadband Plans</span>
              <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      }
    />
  );
}

/**
 * Card 02 — Free Router & Setup (Top-Right: 6 of 12 columns on desktop)
 */
export function RouterSetupCard() {
  return (
    <FlippableFeatureCard
      ariaLabel="Free router and setup — ₹0 Setup Cost"
      className="col-span-12 md:col-span-6"
      frontContent={
        <CardContent className="relative z-10 p-0 flex-1 flex flex-col justify-between overflow-hidden h-full">
          {/* Top Visual Stage with Gradient Background (Edge-to-Edge) */}
          <div
            className={`relative w-full h-[240px] min-[360px]:h-[265px] sm:h-[295px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/router`}
          >
            {/* Smooth Blend into Bottom White Section */}
            <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

            {/* Top Badges Bar: ₹0 Setup Cost */}
            <div className="relative z-20 w-full flex items-center justify-between gap-2">
              <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-navy px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs border border-white/20">
                <Router className="w-3.5 h-3.5" aria-hidden="true" />
                <span>₹0 Setup Cost</span>
              </span>
            </div>

            {/* Centered Router Product Visual */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto py-1">
              <div className="relative w-36 h-36 min-[360px]:w-44 min-[360px]:h-44 sm:w-52 sm:h-52 flex items-center justify-center drop-shadow-[0_16px_32px_rgba(1,13,59,0.26)] transition-transform duration-300 ease-out group-hover/router:scale-[1.06]">
                <Image
                  src="/Service/BroadBand.webp"
                  alt="Pre-configured dual-band Wi-Fi router"
                  width={220}
                  height={220}
                  priority
                  className="w-full h-full object-contain select-none"
                />
              </div>
            </div>
          </div>

          {/* Front Bottom: Title Only */}
          <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto w-full flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wider mb-1">
                Hardware & Setup
              </p>
              <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal">
                Free router and setup
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 group-hover/flip:text-brand-red transition-colors shrink-0">
              <span className="hidden sm:inline">Details</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/flip:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      }
      backContent={
        <div className="flex flex-col justify-between h-full bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-6 sm:mb-7">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EBF2FE] text-[#1A73E8] flex items-center justify-center shrink-0">
                <Router className="size-6 sm:size-7" />
              </div>
              <span className="text-neutral-400 hover:text-brand-navy text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 transition-colors">
                <RotateCcw className="size-3" />
                <span className="hidden min-[400px]:inline">Flip back</span>
              </span>
            </div>

            <h3 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-tight leading-[1.28] mb-5 sm:mb-6">
              Free Dual-Band Gigabit Wi-Fi Router & Setup
            </h3>

            <ul className="space-y-3 sm:space-y-3.5 mb-6">
              {[
                "Complimentary Gigabit dual-band (2.4 GHz + 5 GHz) Wi-Fi router",
                "Free doorstep professional optical fiber cabling & termination",
                "Fast same-day or 24-48h activation with on-site technician test",
                "Pre-configured WPA3 security with instant plug-and-play setup",
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-[15px] leading-relaxed">
                  <span className="size-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-black/[0.06] mt-auto flex items-center justify-between">
            <Link
              href="/#contact"
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-red hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Check Feasibility at Your Address</span>
              <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      }
    />
  );
}

const TAMIL_NADU_ONLY_MARKER: StickerMarker[] = [
  {
    id: "tamilnadu",
    location: [13.0827, 80.2707],
    size: 0.12,
    sticker: (
      <div className="flex flex-col items-center pointer-events-none select-none">
        <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(1,13,59,0.6)]">
          📍
        </span>
        <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-brand-navy px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white uppercase tracking-wider shadow-lg border border-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
          Tamil Nadu
        </span>
      </div>
    ),
  },
];

/**
 * Card 03 — Licensed ISP (Bottom-Left: 6 of 12 columns on desktop)
 * Top features a dramatic 45% close-up 3D Cobe Globe highlighting Tamil Nadu alone.
 */
export function LicensedISPCARD() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <FlippableFeatureCard
      ariaLabel="Licensed ISP serving Tamil Nadu"
      className="col-span-12 md:col-span-6"
      frontContent={
        <CardContent className="relative z-10 p-0 flex-1 flex flex-col justify-between overflow-hidden h-full">
          {/* Top Globe Visual Stage: Tamil Nadu Clearly Visible on Card Gradient (Edge-to-Edge) */}
          <div
            className={`relative w-full h-[240px] min-[360px]:h-[265px] sm:h-[295px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/globe`}
          >
            {/* Smooth Blend at the Meeting Point */}
            <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

            {/* Top Badges Bar: Tamil Nadu Circle */}
            <div className="relative z-30 w-full flex items-center justify-between gap-2 pointer-events-none">
              <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-navy px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span>Tamil Nadu Circle</span>
              </span>
            </div>

            {/* 3D Cobe Globe: Rotating Light-Theme Globe Matched to Card Gradient */}
            <div className="pointer-events-auto absolute -bottom-[80px] min-[360px]:-bottom-[90px] sm:-bottom-[100px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] min-[360px]:w-[380px] min-[360px]:h-[380px] sm:w-[410px] sm:h-[410px] flex items-center justify-center">
              <GlobeStickers
                markers={TAMIL_NADU_ONLY_MARKER}
                initialPhi={3.36}
                initialTheta={0.05}
                speed={shouldReduceMotion ? 0 : 0.0022}
                dark={0}
                baseColor={[0.94, 0.96, 1]}
                markerColor={[0.871, 0.012, 0.008]}
                glowColor={[1, 1, 1]}
                diffuse={1.2}
                mapBrightness={6}
                scale={1.04}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Front Bottom: Title Only */}
          <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto w-full flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wider mb-1">
                Telecom Compliance
              </p>
              <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal">
                Licensed ISP serving Tamil Nadu
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 group-hover/flip:text-brand-red transition-colors shrink-0">
              <span className="hidden sm:inline">Details</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/flip:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      }
      backContent={
        <div className="flex flex-col justify-between h-full bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-6 sm:mb-7">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EBF2FE] text-[#1A73E8] flex items-center justify-center shrink-0">
                <Globe className="size-6 sm:size-7" />
              </div>
              <span className="text-neutral-400 hover:text-brand-navy text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 transition-colors">
                <RotateCcw className="size-3" />
                <span className="hidden min-[400px]:inline">Flip back</span>
              </span>
            </div>

            <h3 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-tight leading-[1.28] mb-5 sm:mb-6">
              Licensed Class-B ISP Serving Tamil Nadu
            </h3>

            <ul className="space-y-3 sm:space-y-3.5 mb-6">
              {[
                "DoT & TRAI licensed Class-B ISP with full regulatory compliance",
                "Tier-1 BGP upstream peering for low-ping global and domestic routing",
                "Multi-ring redundant optical path ensuring uninterrupted uptime",
                "Trusted by 10,000+ homes and enterprises across Tamil Nadu",
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-[15px] leading-relaxed">
                  <span className="size-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-black/[0.06] mt-auto flex items-center justify-between">
            <Link
              href="/about"
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-red hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Learn About Our Network</span>
              <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      }
    />
  );
}

function ClickCursorIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* 3 Radiating Click Sparks at top-left in vibrant Indigo matching reference */}
      <line x1="6" y1="2.5" x2="6" y2="5" stroke="#5551FF" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="2.5" y1="6" x2="5" y2="6" stroke="#5551FF" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="3.5" y1="3.5" x2="5.5" y2="5.5" stroke="#5551FF" strokeWidth="2.2" strokeLinecap="round" />
      {/* Pointer Cursor Arrow */}
      <path
        d="M6 7.5L16.5 15.5L12 16.5L14 21L11.5 22L9.5 17.5L6 20V7.5Z"
        fill="#5551FF"
        stroke="#5551FF"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportHeadsetIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Headset Arc */}
      <path
        d="M4.5 12C4.5 7.86 7.86 4.5 12 4.5C16.14 4.5 19.5 7.86 19.5 12"
        stroke="#5551FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Ear Cushions */}
      <rect x="2.5" y="11" width="3.2" height="6" rx="1.6" fill="#5551FF" />
      <rect x="18.3" y="11" width="3.2" height="6" rx="1.6" fill="#5551FF" />
      {/* Speech Chat Bubble */}
      <path
        d="M8.5 10H15.5C16.33 10 17 10.67 17 11.5V14.5C17 15.33 16.33 16 15.5 16H12L9 18.5V16H8.5C7.67 16 7 15.33 7 14.5V11.5C7 10.67 7.67 10 8.5 10Z"
        fill="#5551FF"
      />
      {/* 3 White Dots in Chat Bubble */}
      <circle cx="10" cy="13" r="0.85" fill="white" />
      <circle cx="12" cy="13" r="0.85" fill="white" />
      <circle cx="14" cy="13" r="0.85" fill="white" />
    </svg>
  );
}

function HelpQuestionBadge() {
  return (
    <div className="w-5.5 h-5.5 rounded-full bg-[#5551FF] flex items-center justify-center text-white font-semibold text-[12px] leading-none shadow-xs select-none">
      ?
    </div>
  );
}

function CenterAvatarIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Head */}
      <circle cx="12" cy="7.5" r="3.75" fill="white" />
      {/* Shoulders */}
      <path
        d="M5.5 19.5C5.5 15.91 8.41 13 12 13C15.59 13 18.5 15.91 18.5 19.5V20.5H5.5V19.5Z"
        fill="white"
      />
    </svg>
  );
}

/**
 * Card 04 — 24/7 Local Support (Bottom-Right: 6 of 12 columns on desktop)
 * Features concentric radar ripple rings, a vibrant 3D central avatar sphere,
 * and 3 floating satellite badges (One-Click Pointer, Headset, Help Desk) matching the shared visual.
 */
export function SupportCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <FlippableFeatureCard
      ariaLabel="Always connected to local support — 24/7 NOC & Field Desk"
      className="col-span-12 md:col-span-6"
      frontContent={
        <CardContent className="relative z-10 p-0 flex-1 flex flex-col justify-between overflow-hidden h-full">
          {/* Top Status Stage with Concentric Radar Waves (Edge-to-Edge) */}
          <div
            className={`relative w-full h-[240px] min-[360px]:h-[265px] sm:h-[295px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/support`}
          >
            {/* Smooth Blend at the Meeting Point */}
            <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

            {/* Top Badges Bar: 24/7 Local Support Desk */}
            <div className="relative z-30 w-full flex items-center justify-between gap-2 pointer-events-none">
              <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-navy px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs border border-white/20">
                <Headphones className="w-3.5 h-3.5" aria-hidden="true" />
                <span>24/7 Local Support</span>
              </span>
            </div>

            {/* Concentric Radar Waves & Satellite Stage centered precisely */}
            <div className="pointer-events-auto absolute z-20 top-[135px] min-[360px]:top-[145px] sm:top-[160px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] min-[360px]:w-[300px] min-[360px]:h-[300px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
              {/* Concentric Static Ripple Rings matching the shared image */}
              <div className="pointer-events-none absolute w-[108px] h-[108px] rounded-full border border-white/35 bg-white/[0.08]" />
              <div className="pointer-events-none absolute w-[168px] h-[168px] rounded-full border border-white/28 bg-white/[0.05]" />
              <div className="pointer-events-none absolute w-[228px] h-[228px] rounded-full border border-white/20 bg-white/[0.03]" />
              <div className="pointer-events-none absolute w-[288px] h-[288px] rounded-full border border-white/14 bg-white/[0.02]" />
              <div className="pointer-events-none absolute w-[348px] h-[348px] rounded-full border border-white/10 bg-white/[0.01]" />

              {/* Continuous Staggered Radar Ripple Waves propagating outwards */}
              {!shouldReduceMotion &&
                [0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    aria-hidden="true"
                    className="pointer-events-none absolute rounded-full border border-white/65"
                    initial={{ width: 72, height: 72, opacity: 0.8 }}
                    animate={{
                      width: [72, 300],
                      height: [72, 300],
                      opacity: [0.75, 0],
                    }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      delay: i * 1.2,
                      ease: "easeOut",
                    }}
                  />
                ))}

              {/* 3 Floating Satellite Badges positioned exactly as in shared image */}
              {/* 1. Pointer Click Satellite (Top-Left ~10:30 position) */}
              <motion.div
                aria-label="One-Click Instant Help"
                title="One-Click Instant Help"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [-4, 3, -4],
                        x: [-1, 2, -1],
                      }
                }
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[14%] left-[18%] -translate-x-1/2 -translate-y-1/2 z-30 w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] border border-white/95 flex items-center justify-center cursor-pointer transition-transform duration-200"
              >
                <ClickCursorIcon className="w-5 h-5" />
              </motion.div>

              {/* 2. Support Headset Satellite (Right ~3:15 position) */}
              <motion.div
                aria-label="Dedicated Support Agent"
                title="Dedicated Support Agent"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [3, -4, 3],
                        x: [1, -2, 1],
                      }
                }
                transition={{
                  duration: 3.8,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[52%] left-[84%] -translate-x-1/2 -translate-y-1/2 z-30 w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] border border-white/95 flex items-center justify-center cursor-pointer transition-transform duration-200"
              >
                <SupportHeadsetIcon className="w-5 h-5" />
              </motion.div>

              {/* 3. Help Question Satellite (Bottom-Left ~7:30 position) */}
              <motion.div
                aria-label="24/7 Help Desk"
                title="24/7 Help Desk"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [-3, 4, -3],
                        x: [-2, 1, -2],
                      }
                }
                transition={{
                  duration: 3.6,
                  delay: 1.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[76%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-30 w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] border border-white/95 flex items-center justify-center cursor-pointer transition-transform duration-200"
              >
                <HelpQuestionBadge />
              </motion.div>

              {/* Center Glossy 3D Avatar Sphere matching shared image */}
              <div className="relative z-30 flex items-center justify-center">
                {/* Soft ambient shadow underneath sphere */}
                <div className="pointer-events-none absolute -bottom-3 w-16 h-4 rounded-full bg-black/35 blur-md" />

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.04, 1],
                        }
                  }
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-17 h-17 sm:w-19 sm:h-19 rounded-full bg-[radial-gradient(circle_at_35%_25%,#A5B4FC_0%,#6366F1_35%,#4F46E5_65%,#3730A3_90%,#1E1B4B_100%)] shadow-[0_16px_36px_rgba(0,0,0,0.35),0_0_24px_rgba(99,102,241,0.5),inset_0_3px_5px_rgba(255,255,255,0.75),inset_0_-4px_8px_rgba(15,10,60,0.45)] flex items-center justify-center p-3 select-none"
                >
                  {/* Specular gloss highlight crescent */}
                  <div className="pointer-events-none absolute top-1.5 left-2 w-7 h-4 rounded-full bg-gradient-to-b from-white/60 to-transparent blur-[1px]" />
                  <CenterAvatarIcon className="relative z-10 w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Front Bottom: Title Only */}
          <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto w-full flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wider mb-1">
                Local Care Desk
              </p>
              <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal">
                Always connected to local support
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 group-hover/flip:text-brand-red transition-colors shrink-0">
              <span className="hidden sm:inline">Details</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/flip:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      }
      backContent={
        <div className="flex flex-col justify-between h-full bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-6 sm:mb-7">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EBF2FE] text-[#1A73E8] flex items-center justify-center shrink-0">
                <Headphones className="size-6 sm:size-7" />
              </div>
              <span className="text-neutral-400 hover:text-brand-navy text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 transition-colors">
                <RotateCcw className="size-3" />
                <span className="hidden min-[400px]:inline">Flip back</span>
              </span>
            </div>

            <h3 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-tight leading-[1.28] mb-5 sm:mb-6">
              24/7 Local NOC & Dedicated Field Desk
            </h3>

            <ul className="space-y-3 sm:space-y-3.5 mb-6">
              {[
                "24/7/365 NOC monitoring with <15 min average ticket response",
                "Local Thiruvallur field engineers dispatched for fast on-site visits",
                "Direct WhatsApp, direct phone, and customer desk access — no robotic IVR",
                "Proactive optical line signal monitoring to prevent dropouts",
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-[15px] leading-relaxed">
                  <span className="size-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-black/[0.06] mt-auto flex items-center justify-between">
            <Link
              href="/contact"
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-red hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Contact Local Support Desk</span>
              <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      }
    />
  );
}

const CAROUSEL_SERVICES = [
  {
    label: "Home Broadband",
    href: "/broadband-services",
    icon: "/Service/BroadBand.webp",
  },
  {
    label: "SME Internet",
    href: "/sme-internet",
    icon: "/Service/SME Internet.webp",
  },
  {
    label: "1:1 Leased Line",
    href: "/lease-line",
    icon: "/Service/Leased Line.webp",
  },
  {
    label: "HD CCTV",
    href: "/cctv",
    icon: "/Service/CCTV.webp",
  },
  {
    label: "Intranet Solutions",
    href: "/intranet",
    icon: "/Service/Intranet.webp",
  },
] as const;

/**
 * Card 05 — Price Lock & Services (Bottom-Right: 4 of 12 columns on desktop)
 * Features an auto-scrolling carousel cycling through all 5 service icons centered
 * on the card gradient background.
 */
export function PriceLockCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || isHovered || shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_SERVICES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isInView, isHovered, shouldReduceMotion]);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeService = CAROUSEL_SERVICES[activeIndex];

  return (
    <FeatureCard
      ariaLabel="One local partner for every connection — 1 to 2 Year Price Lock"
      className="md:col-span-12 lg:col-span-4"
      cardClassName="flex flex-col justify-between p-0 overflow-hidden"
    >
      <CardContent className="p-0 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Top Section: Gradient Background with Carousel Animation (Edge-to-Edge) */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full h-[200px] min-[360px]:h-[215px] sm:h-[230px] ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/carousel overflow-hidden`}
        >
          {/* Smooth Blend at the Meeting Point */}
          <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

          {/* Carousel Top Header: ₹650/mo Price */}
          <div className="relative z-20 w-full flex items-center justify-end">
            <span className="inline-flex min-h-6 items-center rounded-full bg-brand-navy px-2.5 text-xs sm:text-sm font-semibold text-white tabular-nums shadow-xs border border-white/20">
              ₹650
              <span className="text-[10px] font-normal text-white/80 ml-0.5">
                /mo
              </span>
            </span>
          </div>

          {/* Centered Service Icon with Smooth Carousel Motion */}
          <div className="relative z-20 flex-1 w-full flex items-center justify-center my-auto py-0.5">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeService.label}
                custom={direction}
                variants={
                  shouldReduceMotion
                    ? {
                      enter: { opacity: 0 },
                      center: { opacity: 1, transition: { duration: 0.3 } },
                      exit: { opacity: 0, transition: { duration: 0.2 } },
                    }
                    : {
                      enter: (dir: number) => ({
                        x: dir >= 0 ? 80 : -80,
                        opacity: 0,
                        scale: 0.88,
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        transition: {
                          x: { type: "spring", stiffness: 320, damping: 30 },
                          opacity: { duration: 0.28 },
                          scale: { duration: 0.28 },
                        },
                      },
                      exit: (dir: number) => ({
                        x: dir >= 0 ? -80 : 80,
                        opacity: 0,
                        scale: 0.88,
                        transition: {
                          x: { type: "spring", stiffness: 320, damping: 30 },
                          opacity: { duration: 0.22 },
                          scale: { duration: 0.22 },
                        },
                      }),
                    }
                }
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center justify-center text-center select-none"
              >
                <Link
                  href={activeService.href}
                  className="group/service flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="relative w-24 h-24 min-[360px]:w-28 min-[360px]:h-28 sm:w-32 sm:h-32 flex items-center justify-center drop-shadow-[0_12px_24px_rgba(1,13,59,0.28)]">
                    <Image
                      src={activeService.icon}
                      alt={activeService.label}
                      width={136}
                      height={136}
                      priority
                      className="w-full h-full object-contain select-none transition-transform duration-300 ease-out group-hover/service:scale-105"
                    />
                  </div>

                  <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/85 hover:bg-white backdrop-blur-md px-2.5 py-0.5 border border-brand-navy/15 text-brand-navy shadow-xs transition-colors">
                    <span className="text-[10px] min-[360px]:text-[11px] font-semibold tracking-tight">
                      {activeService.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicator Dots */}
          <div className="relative z-20 flex items-center justify-center gap-1.5 pt-0.5 pb-0.5">
            {CAROUSEL_SERVICES.map((service, idx) => (
              <button
                key={service.label}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`View ${service.label}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex
                    ? "w-4 bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Pure White with Title & Description */}
        <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto flex flex-col justify-end">
          <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal mb-1.5">
            One local partner for every connection
          </CardTitle>
          <CardDescription className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
            Protected monthly tariffs starting at ₹650/month with unlimited
            data and dedicated local technicians in Thiruvallur.
          </CardDescription>
        </div>
      </CardContent>
    </FeatureCard>
  );
}

/**
 * Main Broadband Features Bento Grid Section (8+4 Top Row / 4+4+4 Bottom Row)
 */
export function BroadbandFeatures() {
  return (
    <section
      data-apple-manual="true"
      aria-labelledby="why-sash-heading"
      className="bg-white text-brand-navy section-padding"
    >
      <div className="container-sash">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16 lg:mb-20 px-2 sm:px-0">
          <p className="eyebrow-label text-brand-red mb-3.5">
            Broadband Infrastructure
          </p>

          <h2
            id="why-sash-heading"
            className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5"
          >
            Internet built for{" "}
            <span className="text-brand-red">everything you do.</span>
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            Experience reliable fibre connectivity, transparent pricing, and
            dedicated local support.
          </p>
        </div>

        {/* 12-Column Grid Structure: 4 Cards, each 6 cols in size (2x2 grid) */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 items-stretch"
        >
          {/* Row 1 Left: 6 of 12 cols */}
          <FibreSpeedCard />

          {/* Row 1 Right: 6 of 12 cols */}
          <RouterSetupCard />

          {/* Row 2 Left: 6 of 12 cols */}
          <LicensedISPCARD />

          {/* Row 2 Right: 6 of 12 cols */}
          <SupportCard />
        </motion.div>
      </div>
    </section>
  );
}

export default BroadbandFeatures;
