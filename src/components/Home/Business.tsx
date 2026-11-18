"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Cpu,
  HardDrive,
  Lock,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Video,
  Wifi,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface ShowcaseSlide {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  dashboard: React.ReactNode;
}

export interface BusinessShowcaseProps {
  slides?: ShowcaseSlide[];
  /** Scroll distance per slide in vh units (default: 100) */
  scrollDistancePerSlide?: number;
  /** Fraction of each slide's scroll window spent holding at rest (0 to 0.9, default: 0.6) */
  holdAmount?: number;
}

/* ========================================================================= */
/* SHADCN UI DASHBOARD 1: Enterprise Leased Line                             */
/* ========================================================================= */
function LeasedLineShadcnDashboard() {
  return (
    <Card className="h-full w-full bg-card text-card-foreground border border-border shadow-overlay justify-between p-4 sm:p-5">
      {/* Top Header */}
      <CardHeader className="p-0 pb-3 border-b border-border flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-red-10 text-brand-red flex items-center justify-center shrink-0">
            <Zap className="size-4" />
          </div>
          <div>
            <CardTitle className="text-sm sm:text-base font-semibold text-brand-navy">
              SASH Enterprise ILL Telemetry
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              Dedicated 1:1 Uncontended Optical Fibre Circuit
            </CardDescription>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-10 px-2.5 py-1 text-[11px] font-semibold text-brand-red shrink-0">
          <span className="size-1.5 rounded-full bg-brand-red animate-pulse" />
          99.98% SLA
        </span>
      </CardHeader>

      {/* KPI Cards Grid */}
      <CardContent className="p-0 my-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-3">
        <Card size="sm" className="bg-neutral-100/70 ring-1 ring-border p-3 gap-1">
          <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
            <span>Symmetrical Speed</span>
            <Activity className="size-3.5 text-brand-red" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-brand-navy tracking-tight">
            1.00 Gbps
          </div>
          <span className="text-[11px] font-medium text-brand-red">
            1:1 Upload &amp; Download
          </span>
        </Card>

        <Card size="sm" className="bg-neutral-100/70 ring-1 ring-border p-3 gap-1">
          <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
            <span>Core Latency</span>
            <Radio className="size-3.5 text-brand-navy" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-brand-navy tracking-tight">
            3.8 ms
          </div>
          <span className="text-[11px] font-medium text-neutral-600">
            0.00% Packet Loss
          </span>
        </Card>

        <Card size="sm" className="bg-neutral-100/70 ring-1 ring-border p-3 gap-1">
          <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
            <span>Dual-Ring Failover</span>
            <ShieldCheck className="size-3.5 text-brand-red" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-brand-navy tracking-tight">
            Active
          </div>
          <span className="text-[11px] font-medium text-neutral-600">
            &lt; 50ms Auto-Switch
          </span>
        </Card>
      </CardContent>

      {/* Bottom Live Availability & Static IP Routing Card */}
      <Card size="sm" className="bg-neutral-100/50 ring-1 ring-border p-3.5 gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-navy">
            24-Hour Symmetrical Throughput &amp; Uptime Bars
          </span>
          <Button variant="outline" size="xs" className="pointer-events-none h-6 text-[10px]">
            BGP Static IPv4/v6
          </Button>
        </div>

        {/* 12 Uptime Bars built with Tailwind */}
        <div className="grid grid-cols-12 gap-1.5 items-end h-12 pt-1">
          {[92, 96, 100, 98, 100, 95, 100, 100, 97, 100, 99, 100].map(
            (val, i) => (
              <div key={i} className="h-full flex items-end">
                <div
                  style={{ height: `${val}%` }}
                  className={`w-full rounded-sm ${
                    i === 11
                      ? "bg-brand-red"
                      : i % 2 === 0
                      ? "bg-brand-navy"
                      : "bg-navy-80/70"
                  }`}
                />
              </div>
            )
          )}
        </div>

        <Separator className="my-0.5" />

        <div className="flex items-center justify-between text-[11px] text-neutral-600">
          <span className="flex items-center gap-1.5 font-medium text-brand-navy">
            <CheckCircle2 className="size-3.5 text-brand-red" />
            Primary Ring: Chennai ↔ Thiruvallur Core
          </span>
          <span className="font-mono text-[10px] text-brand-red font-semibold">
            100% SLA GUARANTEED
          </span>
        </div>
      </Card>
    </Card>
  );
}

/* ========================================================================= */
/* SHADCN UI DASHBOARD 2: Scalable SME Plans                                 */
/* ========================================================================= */
function SmePlansShadcnDashboard() {
  return (
    <Card className="h-full w-full bg-card text-card-foreground border border-border shadow-overlay justify-between p-4 sm:p-5">
      {/* Top Header */}
      <CardHeader className="p-0 pb-3 border-b border-border flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-neutral-100 text-brand-navy flex items-center justify-center shrink-0">
            <Wifi className="size-4" />
          </div>
          <div>
            <CardTitle className="text-sm sm:text-base font-semibold text-brand-navy">
              SME Bandwidth &amp; Cloud QoS Console
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              On-Demand Scalable Fibre • Zero FUP Throttling
            </CardDescription>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-brand-navy shrink-0">
          2-Yr Price Lock
        </span>
      </CardHeader>

      {/* Middle 2-Column Shadcn Cards */}
      <CardContent className="p-0 my-auto grid grid-cols-1 sm:grid-cols-12 gap-2.5 py-3">
        <Card size="sm" className="sm:col-span-7 bg-neutral-100/70 ring-1 ring-border p-3 gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-600">
              Peak Workday Load
            </span>
            <span className="text-[11px] font-semibold text-brand-red">
              Tier: 500 Mbps
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-semibold text-brand-navy">
              342 Mbps
            </span>
            <span className="text-xs text-neutral-600">+35% Burst Ready</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white overflow-hidden mt-1 ring-1 ring-border">
            <div className="h-full w-[68%] bg-brand-red rounded-full" />
          </div>
        </Card>

        <Card size="sm" className="sm:col-span-5 bg-neutral-100/70 ring-1 ring-border p-3 gap-1.5 justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-600">
              Active Endpoints
            </span>
            <TrendingUp className="size-3.5 text-brand-red" />
          </div>
          <div className="text-lg sm:text-xl font-semibold text-brand-navy">
            48 Devices
          </div>
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarFallback className="bg-brand-navy text-white text-[9px] font-semibold">
                POS
              </AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback className="bg-brand-red text-white text-[9px] font-semibold">
                ERP
              </AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback className="bg-navy-80 text-white text-[9px] font-semibold">
                SIP
              </AvatarFallback>
            </Avatar>
            <AvatarGroupCount className="size-6 text-[10px] font-semibold">
              +45
            </AvatarGroupCount>
          </AvatarGroup>
        </Card>
      </CardContent>

      {/* Bottom Priority Traffic Shaping Card */}
      <Card size="sm" className="bg-neutral-100/50 ring-1 ring-border p-3.5 gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-navy">
            Application Traffic Priority (QoS)
          </span>
          <span className="text-[11px] font-semibold text-brand-red">
            99.85% Efficiency
          </span>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium text-brand-navy">
                1. POS Billing &amp; Payment Gateways
              </span>
              <span className="font-semibold text-brand-red">Critical</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white overflow-hidden">
              <div className="h-full w-[94%] bg-brand-red rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium text-brand-navy">
                2. Cloud ERP, Tally &amp; Inventory Sync
              </span>
              <span className="font-semibold text-brand-navy">High Priority</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white overflow-hidden">
              <div className="h-full w-[82%] bg-brand-navy rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium text-brand-navy">
                3. HD Video Calls &amp; Office Wi-Fi 6
              </span>
              <span className="font-semibold text-neutral-600"> prioritized</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white overflow-hidden">
              <div className="h-full w-[74%] bg-navy-80 rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
}

/* ========================================================================= */
/* SHADCN UI DASHBOARD 3: Private Intranet (Multi-Site WAN)                  */
/* ========================================================================= */
function IntranetWanShadcnDashboard() {
  const branches = [
    {
      route: "Thiruvallur HQ ↔ Chennai Core",
      latency: "1.4 ms",
      mode: "1 Gbps L2 VLAN",
      logo: "/Marquee/1.jpg",
    },
    {
      route: "Thiruvallur HQ ↔ Vellore Plant",
      latency: "2.1 ms",
      mode: "500 Mbps MPLS",
      logo: "/Marquee/3.jpg",
    },
    {
      route: "Thiruvallur HQ ↔ Coimbatore Hub",
      latency: "3.4 ms",
      mode: "AES-256 Tunnel",
      logo: "/Marquee/7.jpg",
    },
  ];

  return (
    <Card className="h-full w-full bg-card text-card-foreground border border-border shadow-overlay justify-between p-4 sm:p-5">
      {/* Top Header */}
      <CardHeader className="p-0 pb-3 border-b border-border flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-red-10 text-brand-red flex items-center justify-center shrink-0">
            <Network className="size-4" />
          </div>
          <div>
            <CardTitle className="text-sm sm:text-base font-semibold text-brand-navy">
              Tamil Nadu Multi-Site Private WAN
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              Isolated Point-to-Point Optical Intranet
            </CardDescription>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-red-10 px-2.5 py-1 text-[11px] font-semibold text-brand-red shrink-0">
          <Lock className="size-3" />
          AES-256
        </span>
      </CardHeader>

      {/* Top Metrics */}
      <CardContent className="p-0 my-auto grid grid-cols-2 gap-2.5 py-3">
        <Card size="sm" className="bg-neutral-100/70 ring-1 ring-border p-3 gap-1">
          <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
            <span>Connected Branches</span>
            <Server className="size-3.5 text-brand-navy" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-brand-navy">
            7 Regional Hubs
          </div>
          <span className="text-[11px] font-medium text-brand-red">
            100% Private Optical Mesh
          </span>
        </Card>

        <Card size="sm" className="bg-neutral-100/70 ring-1 ring-border p-3 gap-1">
          <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
            <span>Public Web Exposure</span>
            <ShieldCheck className="size-3.5 text-brand-red" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-brand-navy">
            0.00%
          </div>
          <span className="text-[11px] font-medium text-neutral-600">
            Hardware VLAN Isolated
          </span>
        </Card>
      </CardContent>

      {/* Branch Interconnect Table using Shadcn Card + Avatar + Separator */}
      <Card size="sm" className="bg-neutral-100/50 ring-1 ring-border p-3.5 gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-navy">
            Active Branch-to-Branch Optical Tunnels
          </span>
          <span className="text-[10px] font-mono font-semibold text-brand-red">
            LIVE SYNC
          </span>
        </div>

        <div className="space-y-2">
          {branches.map((b, idx) => (
            <React.Fragment key={b.route}>
              {idx > 0 && <Separator />}
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar size="sm">
                    <AvatarImage src={b.logo} alt={b.route} />
                    <AvatarFallback className="bg-brand-navy text-white text-[10px]">
                      HQ
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-brand-navy truncate">
                    {b.route}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-neutral-600 hidden sm:inline">
                    {b.mode}
                  </span>
                  <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-brand-red ring-1 ring-border">
                    {b.latency}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Card>
    </Card>
  );
}

/* ========================================================================= */
/* SHADCN UI DASHBOARD 4: CCTV for Premises                                  */
/* ========================================================================= */
function CctvSurveillanceShadcnDashboard() {
  const feeds = [
    {
      cam: "CAM 01 • Main Warehouse",
      spec: "4K 60fps • Smart IR",
      status: "AI Motion Clear",
    },
    {
      cam: "CAM 02 • Server Corridor",
      spec: "1080p HD • Access Lock",
      status: "Authorized Only",
    },
    {
      cam: "CAM 03 • Loading Bay",
      spec: "4K 60fps • ANPR Active",
      status: "Vehicle Verified",
    },
    {
      cam: "CAM 04 • Reception Desk",
      spec: "1080p HD • Audio Sync",
      status: "24/7 Cloud Stream",
    },
  ];

  return (
    <Card className="h-full w-full bg-card text-card-foreground border border-border shadow-overlay justify-between p-4 sm:p-5">
      {/* Top Header */}
      <CardHeader className="p-0 pb-3 border-b border-border flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-red-10 text-brand-red flex items-center justify-center shrink-0">
            <Video className="size-4" />
          </div>
          <div>
            <CardTitle className="text-sm sm:text-base font-semibold text-brand-navy">
              Premises HD IP CCTV Command Center
            </CardTitle>
            <CardDescription className="text-xs text-neutral-600">
              Dual NVR + 30-Day Encrypted Cloud Retention
            </CardDescription>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-10 px-2.5 py-1 text-[11px] font-semibold text-brand-red shrink-0">
          <span className="size-1.5 rounded-full bg-brand-red animate-ping" />
          16 / 16 LIVE
        </span>
      </CardHeader>

      {/* 2x2 Camera Feed Shadcn Cards */}
      <CardContent className="p-0 my-auto grid grid-cols-2 gap-2.5 py-3">
        {feeds.map((item) => (
          <Card
            key={item.cam}
            size="sm"
            className="bg-brand-navy text-white ring-1 ring-navy-80 p-3 gap-1.5 justify-between"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold text-white truncate">
                {item.cam}
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-brand-red px-1.5 py-0.5 text-[9px] font-semibold text-white shrink-0">
                REC
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/75 pt-2 border-t border-white/10">
              <span className="truncate">{item.spec}</span>
              <span className="text-red-10 font-medium shrink-0">
                ● {item.status}
              </span>
            </div>
          </Card>
        ))}
      </CardContent>

      {/* Bottom Storage & Remote Mobile Bar */}
      <Card size="sm" className="bg-neutral-100/60 ring-1 ring-border p-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] text-neutral-600 font-medium">
              <HardDrive className="size-3 text-brand-red" />
              <span>Cloud Backup</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-brand-navy">
              30 Days HD
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-border px-2">
            <div className="flex items-center gap-1 text-[11px] text-neutral-600 font-medium">
              <Cpu className="size-3 text-brand-navy" />
              <span>AI Detection</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-brand-navy">
              99.9% Accurate
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] text-neutral-600 font-medium">
              <Smartphone className="size-3 text-brand-red" />
              <span>Remote View</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-brand-navy">
              iOS &amp; Android
            </span>
          </div>
        </div>
      </Card>
    </Card>
  );
}

export const DEFAULT_BUSINESS_SLIDES: ShowcaseSlide[] = [
  {
    id: "secure-comms",
    eyebrow: "ENTERPRISE LEASED LINE",
    title: "Uninterrupted secure communications",
    description:
      "Dedicated 1:1 symmetrical fibre with 99.9% SLA-backed uptime, sub-5ms latency, and dual-ring automatic failover to keep banking, ERP, and mission-critical operations online 24/7.",
    dashboard: <LeasedLineShadcnDashboard />,
  },
  {
    id: "scalable-sme",
    eyebrow: "SME BROADBAND",
    title: "Scalable SME plans",
    description:
      "High-bandwidth business fibre packages engineered for retail counters, clinics, and growing offices. Scale bandwidth on demand with priority Cloud QoS and a 2-year price lock.",
    dashboard: <SmePlansShadcnDashboard />,
  },
  {
    id: "private-intranet",
    eyebrow: "MULTI-SITE WAN",
    title: "Private intranet",
    description:
      "Direct branch-to-branch optical WAN connectivity across Tamil Nadu with zero public internet exposure. Link headquarters, factories, and warehouses over hardware-encrypted VLAN tunnels.",
    dashboard: <IntranetWanShadcnDashboard />,
  },
  {
    id: "cctv-premises",
    eyebrow: "PREMISES SURVEILLANCE",
    title: "CCTV for premises",
    description:
      "Commercial 4K & HD IP camera surveillance with 24/7 dual NVR and 30-day encrypted cloud retention, AI human/vehicle motion alerts, and live mobile monitoring.",
    dashboard: <CctvSurveillanceShadcnDashboard />,
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

  // Right-side dashboard strip uses a responsive spring; left text uses a softer spring so it trails slightly
  const dashboardSpring = useSpring(steppedProgress, {
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
  const dashboardStripY = useTransform(
    dashboardSpring,
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
        className="bg-white text-brand-navy py-20"
      >
        <div className="container-sash">
          <div className="max-w-3xl mx-auto text-center mb-16">
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
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-red mb-3 block">
                      {slide.eyebrow}
                    </span>
                  )}
                  <h3 className="text-brand-navy font-semibold text-2xl sm:text-3xl lg:text-[40px] tracking-tight leading-[1.15] mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                <div className="lg:col-span-7 w-full">
                  <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-b from-red-10 via-neutral-100 to-brand-red p-4 sm:p-6">
                    {slide.dashboard}
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
      className="bg-white text-brand-navy relative"
    >
      {/* Section Heading */}
      <div className="container-sash pt-20 sm:pt-28 pb-4 text-center max-w-3xl mx-auto">
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
          Keep your billing systems, cloud ERP, multi-branch operations, and IP
          surveillance online without interruption. We design custom fibre
          solutions for offices, factories, schools, clinics, and retail chains.
        </p>
      </div>

      {/* Tall Scroll Wrapper: height = (numSlides × scrollDistancePerSlide vh) */}
      <div
        ref={wrapperRef}
        style={{ height: `${numSlides * scrollDistancePerSlide}vh` }}
        className="relative w-full bg-white"
      >
        {/* Sticky Full-Screen Section Container */}
        <div className="sticky top-0 h-screen w-full bg-white flex items-center justify-center">
          <div className="container-sash w-full h-[78vh] sm:h-[74vh] min-h-[500px] max-h-[680px] bg-white border-0 shadow-none overflow-hidden flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center relative select-none">
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
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-red mb-3 sm:mb-4 block">
                        {slide.eyebrow}
                      </span>
                    )}

                    <h3 className="text-brand-navy font-semibold text-2xl sm:text-3xl lg:text-[40px] tracking-tight leading-[1.15] mb-3.5 sm:mb-5">
                      {slide.title}
                    </h3>

                    <p className="text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-md">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column (Desktop) / Top (Mobile): Fixed Rounded Frame containing Shadcn UI Dashboards */}
            <div className="w-full h-[62%] lg:h-full lg:col-span-7 flex items-center justify-center">
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-gradient-to-b from-red-10 via-neutral-100 to-brand-red">
                {/* Vertical Strip of All Shadcn UI Dashboards Sliding Upward */}
                <motion.div
                  style={{ y: dashboardStripY }}
                  className="w-full h-full will-change-transform"
                >
                  {slides.map((slide) => (
                    <div
                      key={slide.id}
                      className="relative w-full h-full shrink-0 p-3 sm:p-5 lg:p-7 flex items-center justify-center"
                    >
                      {slide.dashboard}
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
