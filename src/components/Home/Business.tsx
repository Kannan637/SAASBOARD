"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Activity,
  Network,
  ShieldCheck,
  Wifi,
  Zap,
  Lock,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export interface ShowcaseSlide {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  visual?: React.ReactNode;
}

export interface BusinessShowcaseProps {
  slides?: ShowcaseSlide[];
  /** Scroll distance per slide in vh units (default: 100) */
  scrollDistancePerSlide?: number;
  /** Fraction of each slide's scroll window spent holding at rest (0 to 0.9, default: 0.6) */
  holdAmount?: number;
}

const MAP_HUB_PINS = [
  {
    id: "chennai",
    logo: "/Marquee/1.jpg",
    name: "HQ Thiruvallur",
    left: "76%",
    top: "18%",
  },
  {
    id: "vellore",
    logo: "/Marquee/3.jpg",
    name: "Vellore Hub",
    left: "54%",
    top: "24%",
  },
  {
    id: "salem",
    logo: "/Marquee/5.jpg",
    name: "Salem Hub",
    left: "42%",
    top: "40%",
  },
  {
    id: "coimbatore",
    logo: "/Marquee/7.jpg",
    name: "Coimbatore Hub",
    left: "26%",
    top: "54%",
  },
  {
    id: "trichy",
    logo: "/Marquee/12.jpg",
    name: "Trichy Hub",
    left: "58%",
    top: "50%",
  },
  {
    id: "madurai",
    logo: "/Marquee/18.jpg",
    name: "Madurai Hub",
    left: "46%",
    top: "72%",
  },
];

/* ========================================================================= */
/* SHADCN UI DASHBOARD CARD 1: Uninterrupted Secure Communications (ILL)     */
/* ========================================================================= */
function LeasedLineShadcnCard() {
  return (
    <Card className="h-full w-full justify-between bg-card text-card-foreground border border-border shadow-none">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-lg bg-red-10 text-brand-red flex items-center justify-center shrink-0">
            <Zap className="size-4" />
          </span>
          <div>
            <CardTitle className="text-brand-navy text-sm sm:text-base">
              SASH Enterprise ILL Telemetry
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              1:1 Uncontended Optical Leased Line
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <span className="eyebrow-label text-brand-red font-semibold">
            <span className="size-1.5 rounded-full bg-brand-red animate-pulse" />
            99.98% SLA
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3 my-auto">
        <div className="grid grid-cols-2 gap-3">
          <Card size="sm" className="bg-neutral-100/70 ring-border">
            <CardContent className="space-y-1">
              <span className="text-[11px] font-medium text-neutral-600 uppercase">
                Download Speed
              </span>
              <div className="text-lg sm:text-2xl font-semibold text-brand-navy">
                1,000 Mbps
              </div>
              <span className="text-xs text-brand-red font-medium">
                1:1 Symmetrical Fibre
              </span>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-neutral-100/70 ring-border">
            <CardContent className="space-y-1">
              <span className="text-[11px] font-medium text-neutral-600 uppercase">
                Core Latency
              </span>
              <div className="text-lg sm:text-2xl font-semibold text-brand-navy">
                3.8 ms
              </div>
              <span className="text-xs text-neutral-600 font-medium">
                0.00% Packet Loss
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Real-Time Throughput Chart inside shadcn Card */}
        <Card size="sm" className="bg-neutral-100/50 ring-border">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-brand-navy">
                Real-Time Symmetrical Throughput
              </span>
              <span className="text-neutral-600 font-mono text-[11px]">
                24h Live Feed
              </span>
            </div>
            <div className="h-20 sm:h-24 w-full">
              <svg
                className="w-full h-full"
                viewBox="0 0 320 80"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="sashRedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--brand-red)"
                      stopOpacity="0.22"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--brand-red)"
                      stopOpacity="0.0"
                    />
                  </linearGradient>
                </defs>
                <line
                  x1="0"
                  y1="20"
                  x2="320"
                  y2="20"
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />
                <line
                  x1="0"
                  y1="50"
                  x2="320"
                  y2="50"
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />
                <path
                  d="M0,62 C45,56 80,38 130,44 C175,50 210,28 255,34 C285,18 305,22 320,14 L320,80 L0,80 Z"
                  fill="url(#sashRedGrad)"
                />
                <path
                  d="M0,62 C45,56 80,38 130,44 C175,50 210,28 255,34 C285,18 305,22 320,14"
                  fill="none"
                  stroke="var(--brand-red)"
                  strokeWidth="2.2"
                />
                <path
                  d="M0,70 C50,65 95,48 145,54 C195,36 235,42 275,26 C298,32 310,26 320,20"
                  fill="none"
                  stroke="var(--brand-navy)"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </CardContent>

      <CardFooter className="justify-between text-xs text-neutral-600 bg-neutral-100/70">
        <span className="inline-flex items-center gap-1.5 font-medium text-brand-navy">
          <CheckCircle2 className="size-3.5 text-brand-red" />
          Dual-Ring Auto-Failover Active
        </span>
        <span className="font-mono text-[11px]">Static IPv4 / IPv6</span>
      </CardFooter>
    </Card>
  );
}

/* ========================================================================= */
/* SHADCN UI DASHBOARD CARD 2: Scalable SME Plans                            */
/* ========================================================================= */
function SmePlansShadcnCard() {
  return (
    <Card className="h-full w-full justify-between bg-card text-card-foreground border border-border shadow-none">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-lg bg-red-10 text-brand-red flex items-center justify-center shrink-0">
            <Wifi className="size-4" />
          </span>
          <div>
            <CardTitle className="text-brand-navy text-sm sm:text-base">
              SME Bandwidth &amp; Cloud QoS
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              On-Demand Commercial Fibre Scaling
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <span className="eyebrow-label text-brand-navy font-semibold">
            2-Yr Price Lock
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3 my-auto">
        <Card size="sm" className="bg-neutral-100/70 ring-border">
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-medium text-neutral-600 uppercase block">
                  Workday Peak Load
                </span>
                <span className="text-xl sm:text-2xl font-semibold text-brand-navy">
                  342 Mbps
                </span>
              </div>
              <span className="text-xs font-semibold text-brand-red">
                500 Mbps Burst Tier
              </span>
            </div>

            <div className="flex items-end justify-between gap-1.5 h-11 pt-1">
              {[45, 60, 75, 88, 96, 85, 78, 68, 55, 82].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-xs ${
                    i === 4 || i === 9 ? "bg-brand-red" : "bg-brand-navy"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-neutral-100/50 ring-border">
          <CardContent className="space-y-2.5">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-brand-navy">
                  1. POS Billing &amp; Payment Gateways
                </span>
                <span className="font-semibold text-brand-red">Critical QoS</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                <div className="h-full w-[94%] rounded-full bg-brand-red" />
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-brand-navy">
                  2. Cloud ERP, Tally &amp; Inventory Sync
                </span>
                <span className="font-semibold text-brand-navy">99.85% QoS</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                <div className="h-full w-[86%] rounded-full bg-brand-navy" />
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>

      <CardFooter className="justify-between text-xs text-neutral-600 bg-neutral-100/70">
        <div className="flex items-center gap-2">
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarImage src="/Marquee/1.jpg" alt="Branch 1" />
              <AvatarFallback>B1</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="/Marquee/3.jpg" alt="Branch 2" />
              <AvatarFallback>B2</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="/Marquee/5.jpg" alt="Branch 3" />
              <AvatarFallback>B3</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <span className="font-medium text-brand-navy">48 Active Devices</span>
        </div>
        <span className="font-semibold text-brand-red">Zero FUP Limit</span>
      </CardFooter>
    </Card>
  );
}

/* ========================================================================= */
/* SHADCN UI DASHBOARD CARD 3: Private Intranet (Multi-Site WAN)             */
/* ========================================================================= */
function PrivateIntranetShadcnCard() {
  return (
    <Card className="h-full w-full justify-between bg-card text-card-foreground border border-border shadow-none">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-lg bg-red-10 text-brand-red flex items-center justify-center shrink-0">
            <Network className="size-4" />
          </span>
          <div>
            <CardTitle className="text-brand-navy text-sm sm:text-base">
              Tamil Nadu Multi-Site Optical WAN
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              Isolated Layer-2/3 Branch Interconnect
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <span className="eyebrow-label text-brand-navy font-semibold">
            <Lock className="size-3 text-brand-red" />
            AES-256 VLAN
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="grid grid-cols-12 gap-3 my-auto items-center">
        {/* Map Box */}
        <div className="col-span-7 relative h-44 sm:h-52 rounded-xl bg-neutral-100 border border-border flex items-center justify-center overflow-hidden p-2">
          <div className="relative w-full h-full max-w-[200px]">
            <Image
              src="/map/Tamil Nadu Halftone Silhouette.png"
              alt="Tamil Nadu Private WAN Map"
              fill
              sizes="220px"
              className="object-contain opacity-90 select-none pointer-events-none"
            />
            {MAP_HUB_PINS.map((pin) => (
              <div
                key={pin.id}
                style={{ left: pin.left, top: pin.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <Avatar
                  size="sm"
                  className="bg-white ring-2 ring-brand-red shadow-xs"
                >
                  <AvatarImage src={pin.logo} alt={pin.name} />
                  <AvatarFallback className="text-[9px] font-bold">
                    HQ
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>

        {/* Right Telemetry Stack */}
        <div className="col-span-5 space-y-2.5">
          <Card size="sm" className="bg-neutral-100/70 ring-border">
            <CardContent className="space-y-0.5">
              <span className="text-[10px] font-medium text-neutral-600 uppercase">
                HQ ↔ Plant Latency
              </span>
              <div className="text-lg sm:text-xl font-semibold text-brand-navy">
                2.1 ms
              </div>
              <span className="text-[11px] text-brand-red font-medium">
                Direct Optical Hop
              </span>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-neutral-100/70 ring-border">
            <CardContent className="space-y-0.5">
              <span className="text-[10px] font-medium text-neutral-600 uppercase">
                Connected Branches
              </span>
              <div className="text-lg sm:text-xl font-semibold text-brand-navy">
                7 Hubs
              </div>
              <span className="text-[11px] text-neutral-600 font-medium">
                100% ERP Synced
              </span>
            </CardContent>
          </Card>
        </div>
      </CardContent>

      <CardFooter className="justify-between text-xs text-neutral-600 bg-neutral-100/70">
        <span className="font-medium text-brand-navy">
          0.00% Public Internet Exposure
        </span>
        <span className="font-semibold text-brand-red">24/7 Route Guard</span>
      </CardFooter>
    </Card>
  );
}

/* ========================================================================= */
/* SHADCN UI DASHBOARD CARD 4: CCTV for Premises                             */
/* ========================================================================= */
function CctvPremisesShadcnCard() {
  const feeds = [
    { id: "CAM 01", zone: "Main Warehouse Gate", res: "4K 60FPS" },
    { id: "CAM 02", zone: "Server Room Corridor", res: "1080P HD" },
    { id: "CAM 03", zone: "Loading Bay Dock", res: "4K SMART IR" },
    { id: "CAM 04", zone: "Admin Reception", res: "1080P AUDIO" },
  ];

  return (
    <Card className="h-full w-full justify-between bg-card text-card-foreground border border-border shadow-none">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-lg bg-red-10 text-brand-red flex items-center justify-center shrink-0">
            <ShieldCheck className="size-4" />
          </span>
          <div>
            <CardTitle className="text-brand-navy text-sm sm:text-base">
              Premises HD IP CCTV Matrix
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              24/7 Cloud &amp; Dual-NVR Surveillance
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <span className="eyebrow-label text-brand-red font-semibold">
            <span className="size-1.5 rounded-full bg-brand-red animate-ping" />
            16 / 16 LIVE
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3 my-auto">
        <div className="grid grid-cols-2 gap-2.5">
          {feeds.map((cam) => (
            <Card
              key={cam.id}
              size="sm"
              className="bg-brand-navy text-white ring-navy-80"
            >
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-white">{cam.id}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-red px-2 py-0.5 text-[9px] font-semibold text-white">
                    REC
                  </span>
                </div>
                <p className="text-xs text-white/85 truncate font-medium">
                  {cam.zone}
                </p>
                <div className="flex items-center justify-between text-[10px] text-white/60 font-mono">
                  <span>{cam.res}</span>
                  <span className="text-white">● ONLINE</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card size="sm" className="bg-neutral-100/70 ring-border">
          <CardContent className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-brand-red" />
              <span className="font-semibold text-brand-navy">
                30-Day Encrypted Cloud Retention
              </span>
            </div>
            <span className="font-semibold text-brand-red">99.9% AI Alert</span>
          </CardContent>
        </Card>
      </CardContent>

      <CardFooter className="justify-between text-xs text-neutral-600 bg-neutral-100/70">
        <span className="font-medium text-brand-navy">
          Smart IR Night Vision Active
        </span>
        <span className="font-semibold text-brand-navy">
          iOS &amp; Android Live View
        </span>
      </CardFooter>
    </Card>
  );
}

export const DEFAULT_BUSINESS_SLIDES: ShowcaseSlide[] = [
  {
    id: "secure-comms",
    eyebrow: "Enterprise Leased Line",
    title: "Uninterrupted secure communications",
    description:
      "Dedicated 1:1 symmetrical fibre with 99.9% SLA-backed uptime, sub-5ms latency, and dual-ring automatic failover to keep banking, ERP, and mission-critical operations online 24/7.",
    visual: <LeasedLineShadcnCard />,
  },
  {
    id: "scalable-sme",
    eyebrow: "SME Broadband",
    title: "Scalable SME plans",
    description:
      "High-bandwidth business fibre packages engineered for retail counters, clinics, and growing offices. Scale bandwidth on demand with priority Cloud QoS and a 2-year price lock.",
    visual: <SmePlansShadcnCard />,
  },
  {
    id: "private-intranet",
    eyebrow: "Multi-Site WAN",
    title: "Private intranet",
    description:
      "Direct branch-to-branch optical WAN connectivity across Tamil Nadu with zero public internet exposure. Link headquarters, factories, and warehouses over hardware-encrypted VLAN tunnels.",
    visual: <PrivateIntranetShadcnCard />,
  },
  {
    id: "cctv-premises",
    eyebrow: "Premises Surveillance",
    title: "CCTV for premises",
    description:
      "Commercial 4K & HD IP camera surveillance with 24/7 dual NVR and 30-day encrypted cloud retention, AI human/vehicle motion alerts, and live mobile monitoring.",
    visual: <CctvPremisesShadcnCard />,
  },
];

/**
 * Cubic ease-in-out curve for smooth transitions between resting plateaus
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Maps raw scroll progress [0..1] to stepped slide index [0..N-1].
 * Each slide holds for `holdAmount` (default 60%) of its cycle and transitions
 * over the remaining (1 - holdAmount) with an ease-in-out curve.
 */
function computeSteppedSlideIndex(
  progress: number,
  numSlides: number,
  holdAmount: number
): number {
  if (numSlides <= 1) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  const hold = Math.min(0.9, Math.max(0, holdAmount));
  const trans = 1 - hold;

  const totalWeight = numSlides * hold + (numSlides - 1) * trans;
  const holdSpan = hold / totalWeight;
  const transSpan = trans / totalWeight;
  const stepCycle = holdSpan + transSpan;

  for (let i = 0; i < numSlides - 1; i++) {
    const cycleStart = i * stepCycle;
    const holdEnd = cycleStart + holdSpan;
    const cycleEnd = holdEnd + transSpan;

    if (clamped <= holdEnd) {
      return i;
    }
    if (clamped <= cycleEnd) {
      const localT =
        transSpan > 0 ? (clamped - holdEnd) / transSpan : 1;
      return i + easeInOutCubic(Math.min(1, Math.max(0, localT)));
    }
  }

  return numSlides - 1;
}

export default function Business({
  slides = DEFAULT_BUSINESS_SLIDES,
  scrollDistancePerSlide = 100,
  holdAmount = 0.6,
}: BusinessShowcaseProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const numSlides = slides.length;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Stepped & eased slide progress [0 .. numSlides - 1]
  const steppedProgress = useTransform(scrollYProgress, (p) =>
    computeSteppedSlideIndex(p, numSlides, holdAmount)
  );

  // Image uses a responsive spring; text uses a softer spring so it trails slightly
  const imageSpring = useSpring(steppedProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.45,
  });

  const textSpring = useSpring(steppedProgress, {
    stiffness: 90,
    damping: 21,
    mass: 0.8,
  });

  // Vertical strip translations ("0%" -> "-300%" for 4 slides)
  const imageStripY = useTransform(
    imageSpring,
    (val) => `-${val * 100}%`
  );
  const textStripY = useTransform(
    textSpring,
    (val) => `-${val * 100}%`
  );

  // Accessibility: Reduced motion fallback renders a clean static stacked list
  if (prefersReducedMotion) {
    return (
      <section
        id="business"
        aria-labelledby="business-heading"
        className="bg-background text-foreground section-padding"
      >
        <div className="container-sash">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
            <p className="eyebrow-label text-brand-red mb-3.5">
              For Enterprises &amp; SMEs
            </p>
            <h2
              id="business-heading"
              className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5"
            >
              Enterprise-grade connectivity for Tamil Nadu businesses
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Keep your billing systems, cloud ERP, multi-branch operations, and
              IP surveillance online without interruption.
            </p>
          </div>

          <div className="space-y-16">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                <div className="lg:col-span-5 flex flex-col justify-center">
                  {slide.eyebrow && (
                    <span className="eyebrow-label text-brand-red self-start mb-3.5">
                      {slide.eyebrow}
                    </span>
                  )}
                  <h3 className="text-brand-navy font-semibold text-2xl sm:text-3xl lg:text-[38px] tracking-normal leading-[1.15] mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                <div className="lg:col-span-7 w-full">
                  <div className="relative w-full rounded-[24px] overflow-hidden bg-neutral-100 p-4 sm:p-6">
                    {slide.visual}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="business"
      data-apple-manual="true"
      aria-labelledby="business-heading"
      className="bg-background text-foreground section-padding relative"
    >
      {/* Section Heading using globals.css classes */}
      <div className="container-sash mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
        <p className="eyebrow-label text-brand-red mb-3.5">
          For Enterprises &amp; SMEs
        </p>
        <h2
          id="business-heading"
          className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5"
        >
          Enterprise-grade connectivity for Tamil Nadu businesses
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
          Keep your billing systems, cloud ERP, multi-branch operations, and IP
          surveillance online without interruption. We design custom fibre
          solutions for offices, factories, schools, clinics, and retail chains.
        </p>
      </div>

      {/* Tall Scroll Wrapper: height = (numSlides × scrollDistancePerSlide vh) */}
      <div
        ref={wrapperRef}
        style={{ height: `${numSlides * scrollDistancePerSlide}vh` }}
        className="relative w-full bg-background"
      >
        {/* Sticky Full-Screen Section Container */}
        <div className="sticky top-0 h-screen w-full bg-background flex items-center justify-center">
          <div className="container-sash w-full h-[78vh] sm:h-[72vh] min-h-[500px] max-h-[680px] bg-background border-0 shadow-none overflow-hidden flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center relative select-none">
            {/* Left Column (Desktop) / Bottom (Mobile): Clipped by the section container */}
            <div className="w-full h-[38%] lg:h-full lg:col-span-5 overflow-hidden relative">
              <motion.div
                style={{ y: textStripY }}
                className="w-full h-full will-change-transform"
              >
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="w-full h-full shrink-0 flex flex-col justify-center pr-2 lg:pr-4"
                  >
                    {slide.eyebrow && (
                      <span className="eyebrow-label text-brand-red self-start mb-3.5">
                        {slide.eyebrow}
                      </span>
                    )}

                    <h3 className="text-brand-navy font-semibold text-2xl sm:text-3xl lg:text-[40px] tracking-normal leading-[1.15] mb-3.5 sm:mb-5">
                      {slide.title}
                    </h3>

                    <p className="text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-md font-normal">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column (Desktop) / Top (Mobile): Fixed Rounded Frame containing shadcn/ui Cards */}
            <div className="w-full h-[62%] lg:h-full lg:col-span-7 flex items-center justify-center">
              {/* Fixed Rounded Overflow-Hidden Frame styled with globals.css tokens */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-neutral-100">
                {/* Vertical Strip of All Shadcn Dashboard Cards Sliding Upward */}
                <motion.div
                  style={{ y: imageStripY }}
                  className="w-full h-full will-change-transform"
                >
                  {slides.map((slide) => (
                    <div
                      key={slide.id}
                      className="relative w-full h-full shrink-0 p-3 sm:p-5 lg:p-6 flex items-center justify-center"
                    >
                      {slide.visual}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
