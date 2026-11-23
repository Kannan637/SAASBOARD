"use client";

import React from "react";
import {
  Camera,
  HardDrive,
  Smartphone,
  ShieldCheck,
  Wifi,
  CheckCircle2,
  Activity,
  Lock,
  Sparkles,
  Bell,
  Video,
  Cable,
} from "lucide-react";

export type CardColorTheme = "peach" | "sky" | "purple";

export interface DeliverableRowItem {
  id: string;
  label: string;
  sublabel: string;
  status: string;
  statusTone: "green" | "blue" | "orange";
}

export interface DeliverableCardData {
  id: string;
  theme: CardColorTheme;
  title: string;
  description: string;
  mediaType: "status-list" | "metric-chart" | "chat-feed";
  focalBadgeText?: string;
  // For Card 1: "status-list"
  rows?: DeliverableRowItem[];
  // For Card 2: "metric-chart"
  metricValue?: string;
  metricDelta?: string;
  metricSubtitle?: string;
  // For Card 3: "chat-feed"
  brandMessage?: string;
  brandTimestamp?: string;
  replyMessage?: string;
  replyAuthor?: string;
}

export const CCTV_DELIVERABLE_CARDS: DeliverableCardData[] = [
  {
    id: "hardware-cabling",
    theme: "peach",
    title: "Indoor & Outdoor HD IP Cameras & Cabling",
    description:
      "Weatherproof IP67 bullet and dome cameras with 30m IR night vision, structured Cat6 conduit routing, and PoE switch setup.",
    mediaType: "status-list",
    focalBadgeText: "IP67 4K Optics",
    rows: [
      {
        id: "cam-01",
        label: "Main Gate • 4K Bullet",
        sublabel: "PoE Port 01 • Color Night",
        status: "Listed",
        statusTone: "green",
      },
      {
        id: "cam-02",
        label: "Warehouse • IR Dome",
        sublabel: "PoE Port 02 • 30m Smart IR",
        status: "In Progress",
        statusTone: "blue",
      },
      {
        id: "cam-03",
        label: "Perimeter • Cat6 Trunk",
        sublabel: "Concealed PVC Conduit",
        status: "Verified",
        statusTone: "orange",
      },
    ],
  },
  {
    id: "nvr-storage",
    theme: "sky",
    title: "NVR Storage & H.265+ Cloud Backup",
    description:
      "15 to 60+ days of continuous and motion-triggered HD recording on surveillance-grade drives with 50% bandwidth savings.",
    mediaType: "metric-chart",
    metricValue: "60+ Days",
    metricDelta: "+50% vs standard H.264",
    metricSubtitle: "Continuous 24/7 NVR retention",
  },
  {
    id: "live-monitoring-amc",
    theme: "purple",
    title: "Live Smartphone Monitoring & Local AMC",
    description:
      "Zero-lag live viewing on iOS and Android paired with SASH fibre, instant motion alerts, and rapid Thiruvallur field engineer support.",
    mediaType: "chat-feed",
    brandMessage: "Motion detected at Entrance Cam 01 • HD clip saved to NVR.",
    brandTimestamp: "SASH Smart Alert • Just now",
    replyMessage: "Live 4K feed opened on mobile • 0ms lag!",
    replyAuthor: "KC",
  },
];

const THEME_CONFIG: Record<
  CardColorTheme,
  {
    baseBg: string;
    blob1: string;
    blob2: string;
    blob3: string;
    focalGlow: string;
    focalIconColor: string;
    ringBorder: string;
    chipBg: string;
    chipText: string;
  }
> = {
  peach: {
    baseBg: "bg-[#FFF6EE]",
    blob1: "bg-[#FDBA74]",
    blob2: "bg-[#FB923C]",
    blob3: "bg-[#FECDD3]",
    focalGlow: "from-orange-400/55 via-amber-300/40 to-transparent",
    focalIconColor: "text-orange-600",
    ringBorder: "border-orange-400/20",
    chipBg: "bg-orange-500/10 border-orange-500/20",
    chipText: "text-orange-700",
  },
  sky: {
    baseBg: "bg-[#EFF8FF]",
    blob1: "bg-[#7DD3FC]",
    blob2: "bg-[#38BDF8]",
    blob3: "bg-[#BFDBFE]",
    focalGlow: "from-sky-400/55 via-cyan-300/40 to-transparent",
    focalIconColor: "text-sky-600",
    ringBorder: "border-sky-400/20",
    chipBg: "bg-sky-500/10 border-sky-500/20",
    chipText: "text-sky-700",
  },
  purple: {
    baseBg: "bg-[#FAF2FF]",
    blob1: "bg-[#D8B4FE]",
    blob2: "bg-[#F472B6]",
    blob3: "bg-[#C4B5FD]",
    focalGlow: "from-purple-400/55 via-pink-300/40 to-transparent",
    focalIconColor: "text-purple-600",
    ringBorder: "border-purple-400/20",
    chipBg: "bg-purple-500/10 border-purple-500/20",
    chipText: "text-purple-700",
  },
};

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "blue" | "orange";
}) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    blue: "bg-sky-50 text-sky-700 border-sky-200/80",
    orange: "bg-orange-50 text-orange-700 border-orange-200/80",
  }[tone];

  const dotColor = {
    green: "bg-emerald-500",
    blue: "bg-sky-500",
    orange: "bg-orange-500",
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none shrink-0 ${styles}`}
    >
      <span className={`size-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}

export default function CctvDeliverablesCards({
  eyebrow = "What We Deliver",
  heading = "End-to-end CCTV hardware, cabling, and network setup",
  subtitle = "Turnkey surveillance installations engineered and maintained by our local team.",
  cards = CCTV_DELIVERABLE_CARDS,
}: {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  cards?: DeliverableCardData[];
}) {
  return (
    <section
      aria-labelledby="cctv-deliverables-heading"
      className="w-full bg-[#f7f5f3] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 font-sans antialiased"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-red mb-3">
            {eyebrow}
          </p>
          <h2
            id="cctv-deliverables-heading"
            className="text-neutral-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] tracking-tight leading-[1.18] mb-3.5"
          >
            {heading}
          </h2>
          {subtitle && (
            <p className="text-neutral-500 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* 3 Cards in a Row on Desktop, 1 Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {cards.map((card) => {
            const theme = THEME_CONFIG[card.theme];

            return (
              <article
                key={card.id}
                className="group relative flex flex-col bg-white rounded-[24px] border border-[rgba(0,0,0,0.05)] shadow-[0_8px_30px_rgba(20,20,50,0.06)] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(20,20,50,0.10)]"
              >
                {/* TOP MEDIA AREA (Height 240px) */}
                <div
                  role="img"
                  aria-label={`${card.title} interactive illustration`}
                  className={`relative w-full h-[240px] overflow-hidden select-none ${theme.baseBg}`}
                >
                  {/* LAYER 1: Mesh Gradient Background (2-3 blurred radial-gradient blobs) */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-10 -left-10 w-44 h-44 rounded-full ${theme.blob1} opacity-60 blur-[55px]`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-12 -right-8 w-48 h-48 rounded-full ${theme.blob2} opacity-60 blur-[60px]`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-10 left-1/3 w-40 h-40 rounded-full ${theme.blob3} opacity-60 blur-[50px]`}
                  />

                  {/* LAYER 3 (Backdrop decorative details): Faint dot grid & concentric rings */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(15, 23, 42, 0.16) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                      maskImage:
                        "radial-gradient(circle at 50% 45%, black 30%, transparent 80%)",
                      WebkitMaskImage:
                        "radial-gradient(circle at 50% 45%, black 30%, transparent 80%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border ${theme.ringBorder}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border ${theme.ringBorder} opacity-60`}
                  />

                  {/* Decorative Floating Micro-Icons with slight rotation & drop shadow */}
                  {card.theme === "peach" && (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute top-3.5 left-4 z-20 -rotate-6 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(234,88,12,0.14)] border border-white transition-transform duration-300 group-hover:-translate-y-0.5"
                      >
                        <Cable className="size-3.5 text-orange-500" />
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute top-4 right-4 z-20 rotate-6 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(234,88,12,0.14)] border border-white transition-transform duration-300 group-hover:translate-y-0.5"
                      >
                        <ShieldCheck className="size-3.5 text-emerald-600" />
                      </div>
                    </>
                  )}

                  {card.theme === "sky" && (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute top-3.5 left-4 z-20 -rotate-6 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(2,132,199,0.14)] border border-white transition-transform duration-300 group-hover:-translate-y-0.5"
                      >
                        <HardDrive className="size-3.5 text-sky-600" />
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute top-4 right-4 z-20 rotate-12 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(2,132,199,0.14)] border border-white transition-transform duration-300 group-hover:translate-y-0.5"
                      >
                        <Activity className="size-3.5 text-sky-500" />
                      </div>
                    </>
                  )}

                  {card.theme === "purple" && (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute top-3.5 left-4 z-20 -rotate-12 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(147,51,234,0.14)] border border-white transition-transform duration-300 group-hover:-translate-y-0.5"
                      >
                        <Bell className="size-3.5 text-purple-600" />
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute top-4 right-4 z-20 rotate-6 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(236,72,153,0.14)] border border-white transition-transform duration-300 group-hover:translate-y-0.5"
                      >
                        <Wifi className="size-3.5 text-pink-500" />
                      </div>
                    </>
                  )}

                  {/* LAYER 4: Glowing Focal Element at Top-Center */}
                  <div className="relative z-20 flex justify-center pt-3.5">
                    <div className="relative flex items-center justify-center">
                      {/* Stronger gradient glow behind focal element */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -inset-3 rounded-full bg-radial ${theme.focalGlow} blur-md`}
                      />
                      <div className="relative flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_8px_20px_rgba(15,23,42,0.10)] border border-white">
                        <span
                          className={`flex size-5 items-center justify-center rounded-full ${theme.chipBg}`}
                        >
                          {card.theme === "peach" && (
                            <Camera className={`size-3 ${theme.focalIconColor}`} />
                          )}
                          {card.theme === "sky" && (
                            <Lock className={`size-3 ${theme.focalIconColor}`} />
                          )}
                          {card.theme === "purple" && (
                            <Smartphone className={`size-3 ${theme.focalIconColor}`} />
                          )}
                        </span>
                        <span className="text-[11px] font-semibold tracking-tight text-neutral-800">
                          {card.focalBadgeText ||
                            (card.theme === "sky"
                              ? "H.265+ Smart NVR"
                              : "iOS & Android Live")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* LAYER 2: Floating Frosted-Glass UI Mockup (Real HTML, centered & bottom-faded) */}
                  <div
                    className="absolute inset-x-3.5 top-[54px] bottom-[-14px] z-10 rounded-[16px] bg-white/85 backdrop-blur-[14px] border border-white/90 shadow-[0_12px_32px_rgba(20,20,50,0.08)] p-3.5 flex flex-col justify-between"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, #000 58%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, #000 58%, transparent 100%)",
                    }}
                  >
                    {/* CARD 1 CONTENT: List of 3 rows with icon, label & status pill (last row blurred) */}
                    {card.mediaType === "status-list" && card.rows && (
                      <div className="space-y-2">
                        {card.rows.map((row, rIdx) => {
                          const isLast = rIdx === card.rows!.length - 1;
                          return (
                            <div
                              key={row.id}
                              className={`flex items-center justify-between gap-2 rounded-xl bg-white/90 px-2.5 py-2 border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                                isLast ? "blur-[1.5px] opacity-75" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                                  <Video className="size-3.5" />
                                </span>
                                <div className="min-w-0">
                                  <p className="text-[11.5px] font-medium text-neutral-800 truncate leading-tight">
                                    {row.label}
                                  </p>
                                  <p className="text-[10px] text-neutral-400 truncate leading-tight mt-0.5">
                                    {row.sublabel}
                                  </p>
                                </div>
                              </div>
                              <StatusPill
                                label={row.status}
                                tone={row.statusTone}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* CARD 2 CONTENT: Big number + delta badge + smooth SVG curve line on blue gradient */}
                    {card.mediaType === "metric-chart" && (
                      <div className="flex flex-col h-full justify-between">
                        <div className="flex items-start justify-between gap-2 px-1">
                          <div>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                              {card.metricSubtitle}
                            </p>
                            <div className="text-[24px] font-bold tracking-tight text-neutral-900 leading-tight mt-0.5">
                              {card.metricValue}
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200/70 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                            <Sparkles className="size-2.5 text-sky-500" />
                            {card.metricDelta}
                          </span>
                        </div>

                        {/* Smooth SVG Curve Line on Blue Gradient */}
                        <div className="relative w-full h-[96px] mt-1">
                          <svg
                            viewBox="0 0 260 90"
                            className="w-full h-full overflow-visible"
                            aria-hidden="true"
                          >
                            <defs>
                              <linearGradient
                                id="skyChartArea"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#0284C7"
                                  stopOpacity="0.28"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#38BDF8"
                                  stopOpacity="0.0"
                                />
                              </linearGradient>
                              <linearGradient
                                id="skyChartLine"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                              >
                                <stop offset="0%" stopColor="#38BDF8" />
                                <stop offset="50%" stopColor="#0284C7" />
                                <stop offset="100%" stopColor="#0369A1" />
                              </linearGradient>
                            </defs>
                            {/* Subtle horizontal reference grid lines */}
                            <line
                              x1="0"
                              y1="22"
                              x2="260"
                              y2="22"
                              stroke="rgba(15,23,42,0.05)"
                              strokeDasharray="3 3"
                            />
                            <line
                              x1="0"
                              y1="52"
                              x2="260"
                              y2="52"
                              stroke="rgba(15,23,42,0.05)"
                              strokeDasharray="3 3"
                            />
                            {/* Filled area under smooth cubic bezier curve */}
                            <path
                              d="M 0 68 C 40 62, 65 38, 105 42 C 145 46, 170 18, 215 22 C 235 24, 248 12, 260 10 L 260 90 L 0 90 Z"
                              fill="url(#skyChartArea)"
                            />
                            {/* Smooth curve stroke */}
                            <path
                              d="M 0 68 C 40 62, 65 38, 105 42 C 145 46, 170 18, 215 22 C 235 24, 248 12, 260 10"
                              fill="none"
                              stroke="url(#skyChartLine)"
                              strokeWidth="2.75"
                              strokeLinecap="round"
                            />
                            {/* Glowing active data point */}
                            <circle
                              cx="215"
                              cy="22"
                              r="6"
                              fill="#0284C7"
                              fillOpacity="0.2"
                            />
                            <circle
                              cx="215"
                              cy="22"
                              r="3.5"
                              fill="#FFFFFF"
                              stroke="#0284C7"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* CARD 3 CONTENT: Chat bubble from brand + rounded warm/orange reply bubble with avatar */}
                    {card.mediaType === "chat-feed" && (
                      <div className="flex flex-col gap-2.5 pt-0.5">
                        {/* Brand Alert Bubble */}
                        <div className="flex items-start gap-2">
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-[10px] font-bold shadow-xs">
                            S
                          </div>
                          <div className="rounded-2xl rounded-tl-xs bg-white px-3 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-purple-100 max-w-[85%]">
                            <p className="text-[11px] font-medium text-neutral-800 leading-snug">
                              {card.brandMessage}
                            </p>
                            <span className="block text-[9.5px] text-purple-500 font-medium mt-0.5">
                              {card.brandTimestamp}
                            </span>
                          </div>
                        </div>

                        {/* Rounded Orange/Warm Reply Bubble with Avatar */}
                        <div className="flex items-end justify-end gap-2">
                          <div className="rounded-2xl rounded-br-xs bg-linear-to-r from-orange-500 to-pink-500 text-white px-3 py-2 shadow-[0_6px_16px_rgba(249,115,22,0.25)] max-w-[82%]">
                            <p className="text-[11px] font-medium leading-snug">
                              {card.replyMessage}
                            </p>
                          </div>
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 border border-white text-[10px] font-bold shadow-xs">
                            {card.replyAuthor}
                          </div>
                        </div>

                        {/* Faint bottom row fading into mask */}
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-purple-50/70 border border-purple-100/60 text-[10px] text-purple-700">
                          <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                          <span className="truncate">
                            Thiruvallur AMC Engineer on standby • 24/7
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTTOM TEXT AREA (Padding 20px, 16px medium title, 13px gray description) */}
                <div className="p-[20px] bg-white flex-1 flex flex-col justify-start">
                  <h3 className="text-[16px] font-medium text-neutral-900 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] font-normal text-neutral-500 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
