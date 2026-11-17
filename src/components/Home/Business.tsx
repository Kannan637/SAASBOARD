"use client";

import React from "react";
import Image from "next/image";
import {
  Network,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";
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

export default function Business() {
  return (
    <section
      id="business"
      data-apple-manual="true"
      aria-labelledby="business-heading"
      className="bg-white text-brand-navy section-padding overflow-hidden"
    >
      <div className="container-sash">
        {/* Centered Section Header */}
        <AppleReveal className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16 lg:mb-20">
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
            Keep your billing systems, cloud ERP, multi-branch operations, and
            IP surveillance online without interruption. We design custom fibre
            solutions for offices, factories, schools, clinics, and retail
            chains.
          </p>
        </AppleReveal>

        {/* 4 Separated Service Cards Styled after shared_img */}
        <div className="space-y-10 sm:space-y-14 lg:space-y-16">
          {/* ========================================================================= */}
          {/* CARD 1: Uninterrupted secure communications (1:1 Dedicated Leased Line)   */}
          {/* ========================================================================= */}
          <AppleReveal>
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0px_2px_8px_rgba(5,5,6,0.04)] transition-shadow duration-300 hover:shadow-[0px_12px_32px_rgba(1,13,59,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
                {/* Left Content Column (shared_img: eyebrow, title, description only) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-red mb-3 sm:mb-4 block">
                    Enterprise Leased Line
                  </span>
                  <h3 className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-[1.18] tracking-normal mb-4 sm:mb-5">
                    Uninterrupted secure communications
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-lg">
                    Dedicated uncontended 1:1 symmetrical fibre with 99.9%
                    SLA-backed uptime, sub-5ms low latency, and dual-ring failover
                    to keep your banking transactions, ERP syncing, and
                    mission-critical operations online 24/7.
                  </p>
                </div>

                {/* Right Visual Container (shared_img aesthetic) */}
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#EBF3FF] via-[#E2EEFF] to-[#D5E8FF] p-4 sm:p-6 lg:p-7 select-none border border-blue-100/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                    {/* Floating White Dashboard Card */}
                    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-4 sm:p-5.5">
                      {/* Top Row: Metric Box 1 & Metric Box 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mb-3.5">
                        {/* Top-Left: Uptime SLA & Bar Chart */}
                        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3.5 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
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

                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
                              99.98%
                            </span>
                            <span className="text-[11px] font-medium text-emerald-600">
                              +0.08% over SLA
                            </span>
                          </div>

                          {/* 10 Vertical Availability Bars */}
                          <div className="flex items-end justify-between gap-1.5 h-12 pt-2 border-t border-neutral-200/60">
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
                        <div className="sm:col-span-5 flex flex-col gap-2.5">
                          {/* Sub-card 1: Download Speed */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                Download Speed
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                Symmetrical
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                1,000 Mbps
                              </span>
                              {/* Green Sparkline */}
                              <svg
                                className="w-16 h-6 text-emerald-500 overflow-visible"
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

                          {/* Sub-card 2: Upload Speed */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                Upload Speed
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                                1:1 Contention
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                1,000 Mbps
                              </span>
                              <svg
                                className="w-16 h-6 text-emerald-500 overflow-visible"
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

                      {/* Bottom Row: Real-Time Telemetry Graph & Insights Panel */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                        {/* Bottom-Left: Throughput Area Graph (shared_img bottom graph) */}
                        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3.5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                Primary ILL
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-red-10 text-brand-red">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                                Dual Failover
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              Live 24h Feed
                            </span>
                          </div>

                          {/* Graph Canvas */}
                          <div className="relative h-24 w-full">
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 320 90"
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
                                  <stop
                                    offset="0%"
                                    stopColor="#2563EB"
                                    stopOpacity="0.25"
                                  />
                                  <stop
                                    offset="100%"
                                    stopColor="#2563EB"
                                    stopOpacity="0.0"
                                  />
                                </linearGradient>
                              </defs>
                              {/* Horizontal Grid lines */}
                              <line
                                x1="0"
                                y1="20"
                                x2="320"
                                y2="20"
                                stroke="#E5E7EB"
                                strokeDasharray="3 3"
                              />
                              <line
                                x1="0"
                                y1="50"
                                x2="320"
                                y2="50"
                                stroke="#E5E7EB"
                                strokeDasharray="3 3"
                              />
                              <line
                                x1="0"
                                y1="80"
                                x2="320"
                                y2="80"
                                stroke="#E5E7EB"
                                strokeDasharray="3 3"
                              />

                              {/* Blue Shaded Area */}
                              <path
                                d="M0,75 C40,70 70,55 110,60 C150,65 180,45 220,50 C260,20 280,30 320,15 L320,90 L0,90 Z"
                                fill="url(#blueAreaGrad)"
                              />
                              {/* Blue Line */}
                              <path
                                d="M0,75 C40,70 70,55 110,60 C150,65 180,45 220,50 C260,20 280,30 320,15"
                                fill="none"
                                stroke="#2563EB"
                                strokeWidth="2.2"
                              />
                              {/* Red Failover Trace Line */}
                              <path
                                d="M0,82 C50,80 90,65 140,70 C190,40 230,55 270,35 C295,45 310,38 320,30"
                                fill="none"
                                stroke="#DE0302"
                                strokeWidth="1.8"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Bottom-Right: Insights Panel */}
                        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                            <span>ILL METRICS</span>
                          </div>
                          <div className="space-y-2 text-[11px]">
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">Latency</span>
                              <span className="font-semibold text-emerald-600">
                                4.2 ms
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">
                                Packet Loss
                              </span>
                              <span className="font-semibold text-emerald-600">
                                0.00%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-600">
                                Ring Failover
                              </span>
                              <span className="font-semibold text-blue-600">
                                Synchronized
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AppleReveal>

          {/* ========================================================================= */}
          {/* CARD 2: Scalable SME plans (High-Bandwidth Business Internet)             */}
          {/* ========================================================================= */}
          <AppleReveal>
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0px_2px_8px_rgba(5,5,6,0.04)] transition-shadow duration-300 hover:shadow-[0px_12px_32px_rgba(1,13,59,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
                {/* Left Content Column (shared_img: eyebrow, title, description only) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3 sm:mb-4 block">
                    SME Broadband
                  </span>
                  <h3 className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-[1.18] tracking-normal mb-4 sm:mb-5">
                    Scalable SME plans
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-lg">
                    High-bandwidth business fibre packages engineered for retail
                    stores, multi-counter clinics, corporate branches, and growing
                    teams. Scale bandwidth seamlessly on demand without disruption
                    or tariff surprises.
                  </p>
                </div>

                {/* Right Visual Container (shared_img aesthetic) */}
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#EAF6FF] via-[#E0F0FE] to-[#D2E9FD] p-4 sm:p-6 lg:p-7 select-none border border-sky-100/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                    {/* Floating White Dashboard Card */}
                    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-4 sm:p-5.5">
                      {/* Top Row: Metric Box 1 & Metric Box 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mb-3.5">
                        {/* Top-Left: Allocated Bandwidth & Bars */}
                        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3.5 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
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

                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
                              342 Mbps
                            </span>
                            <span className="text-[11px] font-medium text-sky-700">
                              Peak 420 Mbps
                            </span>
                          </div>

                          {/* 10 Vertical Workday Bars */}
                          <div className="flex items-end justify-between gap-1.5 h-12 pt-2 border-t border-neutral-200/60">
                            {[45, 60, 75, 88, 92, 85, 78, 65, 50, 42].map(
                              (height, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                                >
                                  <div
                                    style={{ height: `${height}%` }}
                                    className={`w-full rounded-xs transition-all duration-300 ${
                                      idx === 4
                                        ? "bg-brand-red"
                                        : "bg-sky-500"
                                    }`}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Top-Right: Sparkline Metrics */}
                        <div className="sm:col-span-5 flex flex-col gap-2.5">
                          {/* Sub-card 1: Connected Devices */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                Active Endpoints
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                Optimal
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                48 Devices
                              </span>
                              <svg
                                className="w-16 h-6 text-emerald-500 overflow-visible"
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

                          {/* Sub-card 2: ERP & POS QoS */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                Cloud QoS Rate
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                                High Priority
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                99.85%
                              </span>
                              <svg
                                className="w-16 h-6 text-emerald-500 overflow-visible"
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
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3.5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-sky-100/70 text-sky-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                                Cloud ERP &amp; POS
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-neutral-200/60 text-neutral-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                                Office Wi-Fi
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              Zero Throttling
                            </span>
                          </div>

                          {/* Graph Canvas */}
                          <div className="relative h-24 w-full">
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 320 90"
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
                                  <stop
                                    offset="0%"
                                    stopColor="#0284C7"
                                    stopOpacity="0.25"
                                  />
                                  <stop
                                    offset="100%"
                                    stopColor="#0284C7"
                                    stopOpacity="0.0"
                                  />
                                </linearGradient>
                              </defs>
                              <line
                                x1="0"
                                y1="20"
                                x2="320"
                                y2="20"
                                stroke="#E5E7EB"
                                strokeDasharray="3 3"
                              />
                              <line
                                x1="0"
                                y1="50"
                                x2="320"
                                y2="50"
                                stroke="#E5E7EB"
                                strokeDasharray="3 3"
                              />
                              <line
                                x1="0"
                                y1="80"
                                x2="320"
                                y2="80"
                                stroke="#E5E7EB"
                                strokeDasharray="3 3"
                              />

                              <path
                                d="M0,70 C50,65 90,40 140,55 C190,70 230,35 270,40 C295,25 310,30 320,18 L320,90 L0,90 Z"
                                fill="url(#skyAreaGrad)"
                              />
                              <path
                                d="M0,70 C50,65 90,40 140,55 C190,70 230,35 270,40 C295,25 310,30 320,18"
                                fill="none"
                                stroke="#0284C7"
                                strokeWidth="2.2"
                              />
                              <path
                                d="M0,82 C45,78 85,60 135,68 C185,55 225,50 265,45 C295,40 310,35 320,28"
                                fill="none"
                                stroke="#4A4F63"
                                strokeWidth="1.6"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Bottom-Right: Insights Panel */}
                        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                            <span>SME INSIGHTS</span>
                          </div>
                          <div className="space-y-2 text-[11px]">
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">POS Billing</span>
                              <span className="font-semibold text-emerald-600">
                                Realtime Sync
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">Capacity</span>
                              <span className="font-semibold text-sky-700">
                                +35% Reserve
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-600">Price Lock</span>
                              <span className="font-semibold text-brand-navy">
                                2-Year Active
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AppleReveal>

          {/* ========================================================================= */}
          {/* CARD 3: Private intranet (Branch-to-Branch Secure WAN across Tamil Nadu)  */}
          {/* ========================================================================= */}
          <AppleReveal>
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0px_2px_8px_rgba(5,5,6,0.04)] transition-shadow duration-300 hover:shadow-[0px_12px_32px_rgba(1,13,59,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
                {/* Left Content Column (shared_img: eyebrow, title, description only) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-3 sm:mb-4 block">
                    Multi-Site Optical WAN
                  </span>
                  <h3 className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-[1.18] tracking-normal mb-4 sm:mb-5">
                    Private intranet
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-lg">
                    Direct branch-to-branch secure intranet connectivity across
                    Tamil Nadu without public internet traversal. Link your
                    headquarters, factories, warehouses, and branch offices over an
                    isolated optical circuit.
                  </p>
                </div>

                {/* Right Visual Container: Featuring Tamil Nadu Halftone Map in Dashboard */}
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#EEF2FF] via-[#E6ECFF] to-[#D8E2FE] p-4 sm:p-6 lg:p-7 select-none border border-indigo-100/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                    {/* Floating White Dashboard Card */}
                    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-4 sm:p-5.5">
                      {/* Top Row: Metric Box 1 & Metric Box 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mb-3.5">
                        {/* Top-Left: Branch Nodes Connected */}
                        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3.5 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
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

                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
                              7 Hubs Active
                            </span>
                            <span className="text-[11px] font-medium text-neutral-500">
                              Avg 3.4ms
                            </span>
                          </div>

                          {/* Branch Node Latency Bars */}
                          <div className="flex items-end justify-between gap-1.5 h-12 pt-2 border-t border-neutral-200/60">
                            {[100, 100, 98, 100, 96, 100, 100].map(
                              (height, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                                >
                                  <div
                                    style={{ height: `${height}%` }}
                                    className={`w-full rounded-xs transition-all duration-300 ${
                                      idx === 0
                                        ? "bg-brand-red"
                                        : "bg-indigo-600"
                                    }`}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Top-Right: Sparkline Metrics */}
                        <div className="sm:col-span-5 flex flex-col gap-2.5">
                          {/* Sub-card 1: WAN Tunnel Security */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                Tunnel Security
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                                AES-256
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                Encrypted
                              </span>
                              <svg
                                className="w-16 h-6 text-indigo-500 overflow-visible"
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

                          {/* Sub-card 2: Sync Success Rate */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                Branch Sync Rate
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                99.99%
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                Zero Loss
                              </span>
                              <svg
                                className="w-16 h-6 text-emerald-500 overflow-visible"
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
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex items-center justify-center relative overflow-hidden h-40">
                          {/* Tamil Nadu Map with Optical Pins */}
                          <div className="relative w-full h-full max-w-[260px]">
                            <Image
                              src="/map/Tamil Nadu Halftone Silhouette.png"
                              alt="Tamil Nadu Private Optical WAN Interconnect"
                              fill
                              sizes="260px"
                              className="object-contain select-none pointer-events-none drop-shadow-sm opacity-90"
                            />
                            {/* 7 Hub Pins */}
                            {MAP_LOGO_PINS.map((pin) => (
                              <div
                                key={pin.id}
                                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                                style={{ left: pin.left, top: pin.top }}
                              >
                                <div
                                  className={`relative rounded-full bg-white border border-brand-navy/15 shadow-sm p-1 flex items-center justify-center transition-transform hover:scale-125 ${pin.sizeClass}`}
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

                        {/* Bottom-Right: Insights Panel */}
                        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                            <span>WAN INSIGHTS</span>
                          </div>
                          <div className="space-y-2 text-[11px]">
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">HQ ↔ Plants</span>
                              <span className="font-semibold text-emerald-600">
                                2.1 ms (Direct)
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">
                                Web Exposure
                              </span>
                              <span className="font-semibold text-emerald-600">
                                0.00% (Isolated)
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-600">Encryption</span>
                              <span className="font-semibold text-brand-navy">
                                Hardware-Level
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AppleReveal>

          {/* ========================================================================= */}
          {/* CARD 4: CCTV for premises (Commercial HD IP Surveillance)                 */}
          {/* ========================================================================= */}
          <AppleReveal>
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0px_2px_8px_rgba(5,5,6,0.04)] transition-shadow duration-300 hover:shadow-[0px_12px_32px_rgba(1,13,59,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
                {/* Left Content Column (shared_img: eyebrow, title, description only) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-red mb-3 sm:mb-4 block">
                    Premises Surveillance
                  </span>
                  <h3 className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-[1.18] tracking-normal mb-4 sm:mb-5">
                    CCTV for premises
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-lg">
                    Commercial HD IP CCTV surveillance with 24/7 centralized cloud
                    and NVR storage, AI motion &amp; intrusion detection, night
                    vision clarity, and real-time remote mobile live feeds.
                  </p>
                </div>

                {/* Right Visual Container (shared_img aesthetic) */}
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#FFF1F1] via-[#FFE6E6] to-[#FEDCDC] p-4 sm:p-6 lg:p-7 select-none border border-red-100/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                    {/* Floating White Dashboard Card */}
                    <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-[0px_10px_28px_rgba(1,13,59,0.08)] p-4 sm:p-5.5">
                      {/* Top Row: Metric Box 1 & Metric Box 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mb-3.5">
                        {/* Top-Left: Cameras Online & Availability */}
                        <div className="sm:col-span-7 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3.5 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
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

                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
                              16 / 16 Live
                            </span>
                            <span className="text-[11px] font-medium text-emerald-600">
                              0 Offline
                            </span>
                          </div>

                          {/* 8 Continuous Recording Bars */}
                          <div className="flex items-end justify-between gap-1.5 h-12 pt-2 border-t border-neutral-200/60">
                            {[100, 100, 100, 100, 100, 100, 100, 100].map(
                              (height, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                                >
                                  <div
                                    style={{ height: `${height}%` }}
                                    className="w-full rounded-xs bg-brand-red transition-all duration-300"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Top-Right: Sparkline Metrics */}
                        <div className="sm:col-span-5 flex flex-col gap-2.5">
                          {/* Sub-card 1: Cloud Retention */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                Cloud Retention
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                Encrypted
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                30 Days HD
                              </span>
                              <svg
                                className="w-16 h-6 text-emerald-500 overflow-visible"
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

                          {/* Sub-card 2: AI Motion Alerts */}
                          <div className="rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-neutral-600">
                                AI Intrusion Filter
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                                99.9%
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base sm:text-lg font-bold text-brand-navy">
                                0 False Alarms
                              </span>
                              <svg
                                className="w-16 h-6 text-emerald-500 overflow-visible"
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
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                        <div className="sm:col-span-8 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-brand-navy">
                              Premises Live Feeds (4 of 16)
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-brand-red font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
                              LIVE REC
                            </span>
                          </div>

                          {/* 4-Camera Grid Layout */}
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { label: "Cam 01: Warehouse Main Gate", time: "1080p 60fps" },
                              { label: "Cam 02: Server Corridor", time: "1080p 60fps" },
                              { label: "Cam 03: Loading Dock", time: "1080p 60fps" },
                              { label: "Cam 04: Reception Entry", time: "1080p 60fps" },
                            ].map((cam, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg bg-neutral-900 text-white p-2 flex flex-col justify-between h-14 relative overflow-hidden"
                              >
                                <div className="flex items-center justify-between text-[9px] text-white/80">
                                  <span className="truncate max-w-[100px]">
                                    {cam.label}
                                  </span>
                                  <span className="text-brand-red font-bold">
                                    REC
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[8px] text-white/50 font-mono">
                                  <span>{cam.time}</span>
                                  <span className="text-emerald-400">● LIVE</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom-Right: Insights Panel */}
                        <div className="sm:col-span-4 rounded-xl border border-neutral-100 bg-[#FAFBFC] p-3 flex flex-col justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                            <span>CCTV INSIGHTS</span>
                          </div>
                          <div className="space-y-2 text-[11px]">
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">Night Vision</span>
                              <span className="font-semibold text-emerald-600">
                                Smart IR Active
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                              <span className="text-neutral-600">Storage</span>
                              <span className="font-semibold text-brand-navy">
                                NVR + Cloud
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-600">Remote App</span>
                              <span className="font-semibold text-blue-600">
                                iOS &amp; Android
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AppleReveal>
        </div>
      </div>
    </section>
  );
}
