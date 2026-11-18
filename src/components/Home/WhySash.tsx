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
  "bg-[linear-gradient(to_bottom_right,#F8FAFF_0%,#E5EDFF_36%,#F4DDE2_68%,#DE0302_100%)]";

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
        className={`relative w-full h-full flex flex-col justify-between bg-white text-brand-navy border border-brand-navy/10 rounded-2xl shadow-[0px_2px_3px_0px_rgba(5,5,6,0.05)] overflow-hidden py-0 gap-0 ring-0 transition-all duration-300 ${cardClassName}`}
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
        <div className="relative z-20 bg-white px-4 min-[360px]:px-5 sm:px-6 pt-3 pb-4 sm:pb-6 mt-auto w-full">
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
          {/* Top Badges Bar: ₹0 Setup Cost */}
          <div className="relative z-20 w-full flex items-center justify-between gap-2">
            <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-red px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs">
              <Router className="w-3.5 h-3.5" aria-hidden="true" />
              <span>₹0 Setup Cost</span>
            </span>
          </div>

          {/* Centered Router Product Visual */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto py-1">
            <div className="relative w-24 h-24 min-[360px]:w-28 min-[360px]:h-28 sm:w-32 sm:h-32 flex items-center justify-center drop-shadow-[0_12px_24px_rgba(1,13,59,0.28)] transition-transform duration-300 ease-out group-hover/router:scale-[1.05]">
              <Image
                src="/Service/BroadBand.webp"
                alt="Pre-configured dual-band Wi-Fi router"
                width={136}
                height={136}
                className="w-full h-full object-contain select-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Title & Description */}
        <div className="relative z-20 bg-white px-4 min-[360px]:px-5 sm:px-5 pt-3 pb-4 sm:pb-5 mt-auto flex flex-col justify-end">
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
        <div className="relative z-20 bg-white px-4 min-[360px]:px-5 sm:px-5 pt-3 pb-4 sm:pb-5 mt-auto flex flex-col justify-end">
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

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function MessengerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.89-3.259-6.56 6.963z" />
    </svg>
  );
}

const SUPPORT_ORBIT_ITEMS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <WhatsAppIcon className="w-6.5 h-6.5 min-[360px]:w-7 min-[360px]:h-7 text-[#25D366]" />
    ),
    left: "50%",
    top: "0%",
  },
  {
    id: "phone",
    label: "Direct Call",
    icon: (
      <PhoneCall className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 text-[#DE0302]" />
    ),
    left: "97.6%",
    top: "34.5%",
  },
  {
    id: "message",
    label: "Live Message",
    icon: (
      <MessageSquare className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 text-[#0084FF]" />
    ),
    left: "79.4%",
    top: "90.5%",
  },
  {
    id: "support",
    label: "24/7 NOC Desk",
    icon: (
      <Headphones className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 text-brand-navy" />
    ),
    left: "20.6%",
    top: "90.5%",
  },
  {
    id: "chat",
    label: "Helpdesk Chat",
    icon: (
      <MessageSquare className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 text-brand-red" />
    ),
    left: "2.4%",
    top: "34.5%",
  },
] as const;

/**
 * Card 04 — 24/7 Local Support (Bottom-Center: 4 of 12 columns on desktop)
 * Features rotating communication icons (WhatsApp, Phone, Message, NOC Desk, Chat)
 * prominently sized and orbiting around the central SASH brand hub.
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
        {/* Top Status Stage with Rotating Communication Orbit (Edge-to-Edge) */}
        <div
          className={`relative w-full h-[210px] min-[360px]:h-[225px] sm:h-[240px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3 min-[360px]:p-3.5 sm:p-4 select-none group/support`}
        >
          {/* Top Badges Bar: 24/7 NOC Desk */}
          <div className="relative z-30 w-full flex items-center justify-between gap-2 pointer-events-none">
            <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-red px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs">
              <Headphones className="w-3.5 h-3.5" aria-hidden="true" />
              <span>24/7 NOC Desk</span>
            </span>
          </div>

          {/* Rotating Orbit Stage with Prominently Sized Channel Icons */}
          <div className="pointer-events-auto absolute top-[118px] min-[360px]:top-[125px] sm:top-[132px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] min-[360px]:w-[290px] min-[360px]:h-[290px] sm:w-[310px] sm:h-[310px] flex items-center justify-center">
            {/* Circular Orbit Guide Track */}
            <div className="pointer-events-none absolute w-[205px] h-[205px] min-[360px]:w-[220px] min-[360px]:h-[220px] sm:w-[235px] sm:h-[235px] rounded-full border border-brand-navy/15" />

            {/* Rotating Orbit Container with Counter-Rotating Communication Icons */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
              className="absolute w-[205px] h-[205px] min-[360px]:w-[220px] min-[360px]:h-[220px] sm:w-[235px] sm:h-[235px] rounded-full"
            >
              {SUPPORT_ORBIT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: item.left,
                    top: item.top,
                  }}
                >
                  {/* Counter-rotate each icon so it stays upright at all angles */}
                  <motion.div
                    animate={shouldReduceMotion ? undefined : { rotate: -360 }}
                    transition={{
                      duration: 24,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="w-12 h-12 min-[360px]:w-13 min-[360px]:h-13 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_6px_20px_rgba(1,13,59,0.14)] border border-brand-navy/10 flex items-center justify-center transition-transform duration-200 hover:scale-115 cursor-pointer"
                    title={item.label}
                  >
                    {item.icon}
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Center SASH Hub Badge */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <div className="relative w-13 h-13 min-[360px]:w-15 min-[360px]:h-15 sm:w-16 sm:h-16 rounded-full bg-white shadow-[0_6px_20px_rgba(1,13,59,0.14)] border border-brand-navy/10 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover/support:scale-105">
                <Image
                  src="/Logo/Favicon.png"
                  alt="SASH"
                  width={48}
                  height={48}
                  priority
                  className="w-full h-full object-contain select-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Pure White with Title & Description */}
        <div className="relative z-20 bg-white px-4 min-[360px]:px-5 sm:px-5 pt-3 pb-4 sm:pb-5 mt-auto flex flex-col justify-end">
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-4 bg-brand-red shadow-[0_0_8px_rgba(222,3,2,0.85)]"
                    : "w-1.5 bg-brand-navy/35 hover:bg-brand-navy/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Pure White with Title & Description */}
        <div className="relative z-20 bg-white px-4 min-[360px]:px-5 sm:px-5 pt-3 pb-4 sm:pb-5 mt-auto flex flex-col justify-end">
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
