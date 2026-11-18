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
  BatteryFull,
  Headphones,
  MessageSquare,
  PhoneCall,
  Router,
  Signal,
  Wifi,
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
  "bg-[radial-gradient(circle_at_50%_40%,#FFFFFF_0%,#F5F8FC_45%,#E7EDF6_75%,#DBE4F0_100%)]";

const CARD_BOTTOM_BLEND =
  "pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.5)_45%,#FFFFFF_100%)]";

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

export interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  ariaLabel: string;
}

/**
 * Reusable Motion + shadcn/ui Card wrapper for Bento cells
 */
export function FeatureCard({
  children,
  className = "",
  cardClassName = "",
  ariaLabel,
}: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={cardItemVariants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
            y: -6,
            transition: { duration: 0.28, ease: "easeOut" },
          }
      }
      aria-label={ariaLabel}
      className={`group/bento flex flex-col h-full ${className}`}
    >
      <Card
        className={`relative w-full h-full flex flex-col justify-between bg-white text-brand-navy border border-black/[0.06] rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden py-0 gap-0 ring-0 transition-all duration-300 ${cardClassName}`}
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
    <FeatureCard
      ariaLabel="100% Optical Fibre — Up to 1 Gbps"
      className="md:col-span-8 lg:col-span-8"
      cardClassName="flex flex-col justify-between p-0 overflow-hidden"
    >
      <CardContent
        ref={gaugeRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 p-0 flex-1 flex flex-col justify-between overflow-hidden"
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

        {/* Below Chart: Title & Description */}
        <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto w-full">
          <CardTitle className="text-brand-navy !text-xl min-[360px]:!text-2xl sm:!text-3xl font-semibold tracking-normal mb-1.5">
            Up to 1 Gbps
          </CardTitle>
          <CardDescription className="text-neutral-600 text-xs min-[360px]:text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
            End-to-end FTTH optical infrastructure delivers consistent upload
            and download speeds, even during peak evening hours.
          </CardDescription>
        </div>
      </CardContent>
    </FeatureCard>
  );
}

/**
 * Card 02 — Free Router & Setup (Top-Right Tall Bento: 4 of 12 columns on desktop)
 */
export function RouterSetupCard() {
  return (
    <FeatureCard
      ariaLabel="Free router and setup — ₹0 Setup Cost"
      className="md:col-span-4 lg:col-span-4"
      cardClassName="flex flex-col justify-between p-0 overflow-hidden"
    >
      <CardContent className="p-0 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Top Visual Stage with Gradient Background (Edge-to-Edge) */}
        <div
          className={`relative w-full h-[220px] min-[360px]:h-[252px] sm:h-[293px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/router`}
        >
          {/* Smooth Blend into Bottom White Section */}
          <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

          {/* Top Badges Bar: ₹0 Setup Cost */}
          <div className="relative z-20 w-full flex items-center justify-between gap-2">
            <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-red px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs">
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

        {/* Bottom Title & Description */}
        <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto flex flex-col justify-end">
          <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal mb-1.5">
            Free router and setup
          </CardTitle>
          <CardDescription className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
            Zero upfront installation charges and a pre-configured dual-band
            Wi-Fi router on eligible home plans.
          </CardDescription>
        </div>
      </CardContent>
    </FeatureCard>
  );
}

const TAMIL_NADU_ONLY_MARKER: StickerMarker[] = [
  {
    id: "tamilnadu",
    location: [13.0827, 80.2707],
    size: 0.12,
    sticker: (
      <div className="flex flex-col items-center pointer-events-none select-none">
        <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(222,3,2,0.8)]">
          📍
        </span>
        <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-brand-red px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white uppercase tracking-wider shadow-lg border border-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          Tamil Nadu
        </span>
      </div>
    ),
  },
];

/**
 * Card 03 — Licensed ISP (Bottom-Left: 4 of 12 columns on desktop)
 * Top features a dramatic 45% close-up 3D Cobe Globe highlighting Tamil Nadu alone.
 */
export function LicensedISPCARD() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <FeatureCard
      ariaLabel="Licensed ISP serving Tamil Nadu"
      className="md:col-span-6 lg:col-span-4"
      cardClassName="flex flex-col justify-between p-0 overflow-hidden"
    >
      <CardContent className="p-0 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Top Globe Visual Stage: Tamil Nadu Clearly Visible on Card Gradient (Edge-to-Edge) */}
        <div
          className={`relative w-full h-[210px] min-[360px]:h-[225px] sm:h-[240px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/globe`}
        >
          {/* Smooth Blend at the Meeting Point */}
          <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

          {/* Top Badges Bar: Tamil Nadu Circle */}
          <div className="relative z-30 w-full flex items-center justify-between gap-2 pointer-events-none">
            <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-red px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Tamil Nadu Circle</span>
            </span>
          </div>

          {/* 3D Cobe Globe: Rotating Light-Theme Globe Matched to Card Gradient */}
          <div className="pointer-events-auto absolute -bottom-[75px] min-[360px]:-bottom-[85px] sm:-bottom-[95px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] min-[360px]:w-[380px] min-[360px]:h-[380px] sm:w-[410px] sm:h-[410px] flex items-center justify-center">
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

        {/* Bottom Section: Pure White with Title & Description */}
        <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto flex flex-col justify-end">
          <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal mb-1.5">
            Licensed ISP serving Tamil Nadu
          </CardTitle>
          <CardDescription className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
            Authorised Internet Service Provider operating compliant,
            high-availability optical ring infrastructure.
          </CardDescription>
        </div>
      </CardContent>
    </FeatureCard>
  );
}

function ClickCursorIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* 3 Radiating Click Sparks at top-left in Brand Red */}
      <line x1="5" y1="2.5" x2="5" y2="4.5" stroke="#DE0302" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="5.5" x2="3.5" y2="7" stroke="#DE0302" strokeWidth="2" strokeLinecap="round" />
      <line x1="8.5" y1="5.5" x2="7" y2="7" stroke="#DE0302" strokeWidth="2" strokeLinecap="round" />
      {/* Brand Navy cursor pointer */}
      <path
        d="M5.5 8L15 15.5L11 16.2L12.8 20.2L10.5 21.2L8.7 17.2L5.5 19.5V8Z"
        fill="#010D3B"
        stroke="#010D3B"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportHeadsetIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Headset arc */}
      <path
        d="M4 12.5C4 8.08 7.58 4.5 12 4.5C16.42 4.5 20 8.08 20 12.5"
        stroke="#010D3B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Ear cushions */}
      <rect x="2.5" y="11" width="3" height="5.5" rx="1.5" fill="#010D3B" />
      <rect x="18.5" y="11" width="3" height="5.5" rx="1.5" fill="#010D3B" />
      {/* Speech bubble in the center in Brand Red */}
      <path
        d="M8.5 9.5H15.5C16.33 9.5 17 10.17 17 11V14C17 14.83 16.33 15.5 15.5 15.5H11.5L8.5 17.5V15.5C7.67 15.5 7 14.83 7 14V11C7 10.17 7.67 9.5 8.5 9.5Z"
        fill="#DE0302"
      />
      {/* Dots inside chat bubble */}
      <circle cx="10" cy="12.5" r="0.75" fill="white" />
      <circle cx="12" cy="12.5" r="0.75" fill="white" />
      <circle cx="14" cy="12.5" r="0.75" fill="white" />
    </svg>
  );
}

function HelpQuestionBadge() {
  return (
    <div className="w-5.5 h-5.5 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[11px] leading-none shadow-xs select-none">
      ?
    </div>
  );
}

function CenterAvatarIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Head */}
      <circle cx="12" cy="7" r="4" fill="white" />
      {/* Shoulders */}
      <path
        d="M5 19.5C5 15.91 7.91 13 11.5 13H12.5C16.09 13 19 15.91 19 19.5V20.5H5V19.5Z"
        fill="white"
      />
    </svg>
  );
}

const SUPPORT_SATELLITE_ITEMS = [
  {
    id: "pointer",
    label: "One-Click Instant Help",
    icon: <ClickCursorIcon className="w-5 h-5" />,
    left: "25%",
    top: "6.7%",
  },
  {
    id: "headset",
    label: "Dedicated Support Agent",
    icon: <SupportHeadsetIcon className="w-5 h-5" />,
    left: "99.2%",
    top: "58.7%",
  },
  {
    id: "help",
    label: "24/7 Help Desk",
    icon: <HelpQuestionBadge />,
    left: "14.6%",
    top: "85.4%",
  },
] as const;

/**
 * Card 04 — 24/7 Local Support (Bottom-Center: 4 of 12 columns on desktop)
 * Features concentric radar ripple rings, a vibrant 3D central avatar sphere,
 * and 3 orbiting satellite badges (One-Click Pointer, Headset, Help Desk).
 */
export function SupportCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <FeatureCard
      ariaLabel="Always connected to local support — 24/7 NOC & Field Desk"
      className="md:col-span-6 lg:col-span-4"
      cardClassName="flex flex-col justify-between p-0 overflow-hidden"
    >
      <CardContent className="p-0 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Top Status Stage with Concentric Radar Orbit (Edge-to-Edge) */}
        <div
          className={`relative w-full h-[220px] min-[360px]:h-[235px] sm:h-[250px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/support`}
        >
          {/* Smooth Blend at the Meeting Point */}
          <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

          {/* Top Badges Bar: 24/7 Local Support Desk */}
          <div className="relative z-30 w-full flex items-center justify-between gap-2 pointer-events-none">
            <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-red px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs">
              <Headphones className="w-3.5 h-3.5" aria-hidden="true" />
              <span>24/7 Local Support</span>
            </span>
          </div>

          {/* Concentric Radar Waves & Orbiting Satellites Stage */}
          <div className="pointer-events-auto absolute z-20 top-[125px] min-[360px]:top-[132px] sm:top-[140px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] min-[360px]:w-[290px] min-[360px]:h-[290px] sm:w-[310px] sm:h-[310px] flex items-center justify-center">
            {/* Concentric Radar Ripple Rings matching Brand Navy and Apple styling */}
            <div className="pointer-events-none absolute w-[240px] h-[240px] rounded-full border border-brand-navy/12 bg-brand-navy/[0.015]" />
            <div className="pointer-events-none absolute w-[176px] h-[176px] rounded-full border border-brand-navy/18 bg-brand-navy/[0.025]" />
            <div className="pointer-events-none absolute w-[114px] h-[114px] rounded-full border border-brand-navy/25 bg-brand-navy/[0.04]" />

            {/* Subtle Expanding Radar Pulse Wave */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{
                  scale: [1, 1.25, 1.45],
                  opacity: [0.45, 0.2, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute w-[114px] h-[114px] rounded-full border border-brand-red/35"
              />
            )}

            {/* Rotating Orbit Container with Counter-Rotating Satellite Badges */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
              className="absolute w-[176px] h-[176px] rounded-full"
            >
              {SUPPORT_SATELLITE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: item.left,
                    top: item.top,
                  }}
                >
                  {/* Counter-rotate each satellite so it remains upright at all angles */}
                  <motion.div
                    animate={shouldReduceMotion ? undefined : { rotate: -360 }}
                    transition={{
                      duration: 24,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="w-10 h-10 min-[360px]:w-10.5 min-[360px]:h-10.5 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_6px_18px_rgba(1,13,59,0.12),0_1px_3px_rgba(0,0,0,0.06)] border border-brand-navy/10 flex items-center justify-center transition-transform duration-200 hover:scale-115 cursor-pointer"
                    title={item.label}
                  >
                    {item.icon}
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Center Glossy 3D Brand Avatar Sphere */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                    scale: [1, 1.04, 1],
                  }
              }
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-30 w-16 h-16 min-[360px]:w-17 min-[360px]:h-17 sm:w-18 sm:h-18 rounded-full bg-[radial-gradient(circle_at_35%_28%,#22357A_0%,#010D3B_60%,#000720_100%)] shadow-[0_14px_30px_rgba(1,13,59,0.36),0_4px_10px_rgba(1,13,59,0.22),inset_0_2px_4px_rgba(255,255,255,0.55),inset_0_-3px_6px_rgba(0,0,0,0.3)] flex items-center justify-center p-3 select-none"
            >
              <CenterAvatarIcon className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Pure White with Title & Description */}
        <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto flex flex-col justify-end">
          <CardTitle className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal mb-1.5">
            Always connected to local support
          </CardTitle>
          <CardDescription className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
            Direct access to our local Thiruvallur network operations team
            around the clock, without endless automated menus.
          </CardDescription>
        </div>
      </CardContent>
    </FeatureCard>
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
            <span className="inline-flex min-h-6 items-center rounded-full bg-brand-navy px-2.5 text-xs sm:text-sm font-semibold text-white tabular-nums shadow-xs">
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
                    ? "w-4 bg-brand-red shadow-[0_0_8px_rgba(222,3,2,0.85)]"
                    : "w-1.5 bg-brand-navy/35 hover:bg-brand-navy/70"
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
      className="bg-transparent text-brand-navy section-padding"
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

        {/* 12-Column Asymmetric Bento Grid: Row 1 (8 + 4 cols) & Row 2 (4 + 4 + 4 cols) */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 items-stretch"
        >
          {/* Row 1 Left: 8 cols */}
          <FibreSpeedCard />

          {/* Row 1 Right: 4 cols */}
          <RouterSetupCard />

          {/* Row 2 Left: 4 cols */}
          <LicensedISPCARD />

          {/* Row 2 Center: 4 cols */}
          <SupportCard />

          {/* Row 2 Right: 4 cols */}
          <PriceLockCard />
        </motion.div>
      </div>
    </section>
  );
}

export default BroadbandFeatures;
