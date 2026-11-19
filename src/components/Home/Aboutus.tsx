"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Globe,
  Headphones,
  Network,
  Radio,
  ShieldCheck,
  Zap,
} from "lucide-react";

/**
 * 397 dot coordinates generating a clean Eastern hemisphere dot-matrix map
 * in a 560x360 coordinate viewport (matches the reference image map).
 */
const MAP_DOTS: [number, number][] = [
  [86, 63], [100, 63], [114, 63], [128, 63], [142, 63], [156, 63], [170, 63], [184, 63], [198, 63],
  [296, 63], [310, 63], [324, 63], [338, 63], [352, 63], [366, 63], [380, 63], [394, 63], [408, 63],
  [422, 63], [436, 63], [450, 63], [464, 63], [86, 77], [100, 77], [114, 77], [128, 77], [142, 77],
  [156, 77], [170, 77], [184, 77], [198, 77], [296, 77], [310, 77], [324, 77], [338, 77], [352, 77],
  [366, 77], [380, 77], [394, 77], [408, 77], [422, 77], [436, 77], [450, 77], [464, 77], [58, 91],
  [72, 91], [86, 91], [100, 91], [114, 91], [128, 91], [142, 91], [156, 91], [170, 91], [184, 91],
  [198, 91], [296, 91], [310, 91], [324, 91], [338, 91], [352, 91], [366, 91], [380, 91], [394, 91],
  [408, 91], [422, 91], [436, 91], [450, 91], [464, 91], [58, 105], [72, 105], [86, 105], [100, 105],
  [114, 105], [128, 105], [142, 105], [156, 105], [170, 105], [184, 105], [198, 105], [296, 105],
  [310, 105], [324, 105], [338, 105], [352, 105], [366, 105], [380, 105], [394, 105], [408, 105],
  [422, 105], [436, 105], [450, 105], [464, 105], [58, 119], [72, 119], [86, 119], [100, 119],
  [114, 119], [128, 119], [142, 119], [156, 119], [170, 119], [184, 119], [198, 119], [212, 119],
  [226, 119], [240, 119], [254, 119], [268, 119], [296, 119], [310, 119], [324, 119], [338, 119],
  [352, 119], [366, 119], [380, 119], [394, 119], [408, 119], [422, 119], [436, 119], [450, 119],
  [464, 119], [58, 133], [72, 133], [86, 133], [100, 133], [114, 133], [128, 133], [142, 133],
  [156, 133], [170, 133], [184, 133], [198, 133], [212, 133], [226, 133], [240, 133], [254, 133],
  [268, 133], [282, 133], [296, 133], [310, 133], [324, 133], [338, 133], [352, 133], [366, 133],
  [380, 133], [394, 133], [408, 133], [422, 133], [436, 133], [450, 133], [464, 133], [58, 147],
  [72, 147], [86, 147], [100, 147], [114, 147], [128, 147], [142, 147], [156, 147], [170, 147],
  [198, 147], [212, 147], [226, 147], [240, 147], [254, 147], [268, 147], [282, 147], [296, 147],
  [310, 147], [324, 147], [338, 147], [352, 147], [366, 147], [380, 147], [394, 147], [408, 147],
  [422, 147], [436, 147], [450, 147], [464, 147], [58, 161], [72, 161], [86, 161], [100, 161],
  [114, 161], [128, 161], [142, 161], [156, 161], [170, 161], [198, 161], [212, 161], [226, 161],
  [240, 161], [254, 161], [268, 161], [282, 161], [296, 161], [310, 161], [324, 161], [338, 161],
  [352, 161], [366, 161], [380, 161], [394, 161], [408, 161], [422, 161], [436, 161], [450, 161],
  [464, 161], [58, 175], [72, 175], [86, 175], [100, 175], [114, 175], [128, 175], [142, 175],
  [156, 175], [198, 175], [212, 175], [226, 175], [240, 175], [254, 175], [268, 175], [282, 175],
  [296, 175], [310, 175], [324, 175], [338, 175], [352, 175], [366, 175], [380, 175], [394, 175],
  [408, 175], [422, 175], [436, 175], [450, 175], [464, 175], [58, 189], [72, 189], [86, 189],
  [100, 189], [114, 189], [128, 189], [142, 189], [156, 189], [268, 189], [282, 189], [296, 189],
  [310, 189], [324, 189], [338, 189], [352, 189], [380, 189], [394, 189], [422, 189], [436, 189],
  [464, 189], [478, 189], [506, 189], [58, 203], [72, 203], [86, 203], [100, 203], [114, 203],
  [128, 203], [142, 203], [156, 203], [268, 203], [282, 203], [296, 203], [310, 203], [324, 203],
  [338, 203], [366, 203], [380, 203], [408, 203], [422, 203], [450, 203], [464, 203], [492, 203],
  [506, 203], [58, 217], [72, 217], [86, 217], [100, 217], [114, 217], [128, 217], [142, 217],
  [268, 217], [282, 217], [296, 217], [310, 217], [324, 217], [352, 217], [366, 217], [394, 217],
  [408, 217], [436, 217], [450, 217], [478, 217], [492, 217], [58, 231], [72, 231], [86, 231],
  [100, 231], [114, 231], [128, 231], [142, 231], [282, 231], [296, 231], [310, 231], [324, 231],
  [352, 231], [380, 231], [394, 231], [422, 231], [436, 231], [464, 231], [478, 231], [506, 231],
  [58, 245], [72, 245], [86, 245], [100, 245], [114, 245], [128, 245], [282, 245], [296, 245],
  [310, 245], [366, 245], [380, 245], [408, 245], [422, 245], [450, 245], [464, 245], [492, 245],
  [506, 245], [58, 259], [72, 259], [86, 259], [100, 259], [114, 259], [128, 259], [282, 259],
  [296, 259], [310, 259], [352, 259], [366, 259], [394, 259], [408, 259], [436, 259], [450, 259],
  [478, 259], [492, 259], [58, 273], [72, 273], [86, 273], [100, 273], [114, 273], [128, 273],
  [282, 273], [296, 273], [310, 273], [352, 273], [380, 273], [394, 273], [422, 273], [436, 273],
  [464, 273], [478, 273], [506, 273], [58, 287], [72, 287], [86, 287], [100, 287], [114, 287],
  [366, 287], [380, 287], [408, 287], [422, 287], [450, 287], [464, 287], [492, 287], [506, 287],
  [58, 301], [72, 301], [86, 301], [100, 301], [114, 301], [352, 301], [366, 301], [394, 301],
  [408, 301], [436, 301], [450, 301], [478, 301], [492, 301]
];

export default function Aboutus() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      data-apple-manual="true"
      aria-labelledby="about-heading"
      className="bg-transparent text-brand-navy section-padding overflow-hidden"
    >
      <div className="container-sash">
        {/* Giant Rounded Bento Showcase Card matching reference image style */}
        <div className="relative w-full rounded-[32px] sm:rounded-[36px] lg:rounded-[44px] bg-white border border-black/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.03)] p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Typographic & Conversion Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
              {/* Category Eyebrow Pill */}
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#FDEBEB] text-brand-red text-[11px] font-semibold uppercase tracking-wider mb-4 sm:mb-5">
                Licensed Class-B ISP
              </span>

              {/* Dual-Tone Headline */}
              <h2
                id="about-heading"
                className="text-brand-navy font-bold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.12] mb-4 sm:mb-5 text-left"
              >
                Connecting <span className="text-brand-red">Tamil Nadu</span> to high-speed fiber
              </h2>

              {/* Selective-Bold Paragraph */}
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 text-left max-w-xl">
                <strong className="font-semibold text-brand-navy">SASH Broadband Private Limited</strong> is an authorized{" "}
                <strong className="font-semibold text-brand-navy">Class–B Internet Service Provider</strong> operating resilient, high-availability optical ring infrastructure across Tamil Nadu. Delivering next-generation optical telecom, direct Tier-1 peering, and last-mile patching with dedicated 24/7 local engineering support.
              </p>

              {/* KPI Metrics Counter Grid */}
              <div className="grid grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-10 w-full max-w-md">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">10,000+</p>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">Connected premises</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">99.9%</p>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">Core uptime SLA</p>
                </div>
              </div>

              {/* Pill Button CTA */}
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy text-white px-7 py-3.5 text-sm font-medium hover:bg-navy-80 transition-all shadow-[0_4px_16px_rgba(1,13,59,0.18)] group"
              >
                <span>Schedule a feasibility call</span>
                <span aria-hidden="true" className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">›</span>
              </Link>
            </div>

            {/* Right Column: Dot-Matrix Coverage Map & Floating Network Nodes */}
            <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[420px] lg:h-[460px] flex items-center justify-center select-none overflow-hidden">
              {/* Dot-Matrix Map SVG Layer */}
              <svg
                viewBox="0 0 560 360"
                className="w-full h-full object-contain pointer-events-none select-none opacity-85"
                aria-hidden="true"
              >
                {/* Dotted Matrix Points */}
                {MAP_DOTS.map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={2.4}
                    className="fill-neutral-300 transition-colors"
                  />
                ))}

                {/* Delicate Curved Optical Backbones */}
                <path
                  d="M130,160 Q280,140 400,210"
                  fill="none"
                  stroke="rgba(222,3,2,0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M240,120 Q340,160 410,240"
                  fill="none"
                  stroke="rgba(1,13,59,0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>

              {/* Floating Node Chips (Positioned strategically over map nodes) */}

              {/* 1. Thiruvallur Core NOC Hub (Primary Central Anchor) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [-3, 3, -3],
                      }
                }
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[48%] left-[44%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.12)] px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red" />
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] sm:text-xs font-semibold text-brand-navy leading-tight">
                      Thiruvallur Core NOC
                    </span>
                    <span className="text-[9px] text-neutral-500 font-medium">24/7 Live Desk</span>
                  </div>
                </div>
              </motion.div>

              {/* 2. Global Tier-1 BGP Peering (Top-Right East Asia / Subsea node) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [3, -4, 3],
                      }
                }
                transition={{
                  duration: 4.2,
                  delay: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[28%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.08)] px-3 py-1.5 sm:px-3.5 sm:py-1.5 flex items-center gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <div className="w-5 h-5 rounded-full bg-[#EBF3FE] flex items-center justify-center text-[#1D63ED]">
                    <Network className="w-3 h-3 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-brand-navy">
                    Tier-1 BGP Peering
                  </span>
                </div>
              </motion.div>

              {/* 3. Subsea Optical Landing (Top-Left / Europe / Global route) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [-4, 3, -4],
                      }
                }
                transition={{
                  duration: 3.8,
                  delay: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[22%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.08)] p-2 sm:p-2.5 flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer" title="Subsea Optical Landing Cable">
                  <div className="w-6 h-6 rounded-full bg-brand-navy flex items-center justify-center text-white">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>

              {/* 4. 1 Gbps FTTH Speed (Center-Left) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [2, -3, 2],
                      }
                }
                transition={{
                  duration: 3.4,
                  delay: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[36%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.08)] px-2.5 py-1 sm:px-3 sm:py-1.5 flex items-center gap-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] sm:text-[11px] font-semibold text-brand-navy">
                    1 Gbps FTTH
                  </span>
                </div>
              </motion.div>

              {/* 5. DoT Class-B Compliance (Bottom-Right) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [-3, 4, -3],
                      }
                }
                transition={{
                  duration: 4.0,
                  delay: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[68%] left-[74%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.08)] px-3 py-1.5 sm:px-3.5 sm:py-1.5 flex items-center gap-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] sm:text-[11px] font-semibold text-brand-navy">
                    DoT Licensed
                  </span>
                </div>
              </motion.div>

              {/* 6. 99.9% Uptime Ring (Bottom-Center) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [3, -2, 3],
                      }
                }
                transition={{
                  duration: 3.7,
                  delay: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[75%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.08)] px-3 py-1 sm:px-3.5 sm:py-1.5 flex items-center gap-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
                  <span className="text-[10px] sm:text-[11px] font-semibold text-brand-navy">
                    99.9% Ring SLA
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
