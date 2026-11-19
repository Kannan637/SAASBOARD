"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const FLOATING_PARTNER_LOGOS = [
  {
    id: "partner-1",
    src: "/Marquee/1.jpg",
    alt: "Institutional & Enterprise Client Partner 1",
    className: "top-[12%] left-[14%] sm:left-[18%]",
    duration: 3.8,
    delay: 0.2,
  },
  {
    id: "partner-2",
    src: "/Marquee/2.jpg",
    alt: "Institutional & Enterprise Client Partner 2",
    className: "top-[38%] left-[8%] sm:left-[12%]",
    duration: 4.2,
    delay: 0.6,
  },
  {
    id: "partner-4",
    src: "/Marquee/4.jpg",
    alt: "Institutional & Enterprise Client Partner 4",
    className: "top-[54%] right-[8%] sm:right-[12%]",
    duration: 3.5,
    delay: 1.0,
  },
  {
    id: "partner-6",
    src: "/Marquee/6.jpg",
    alt: "Institutional & Enterprise Client Partner 6",
    className: "top-[74%] left-[18%] sm:left-[22%]",
    duration: 4.0,
    delay: 0.4,
  },
  {
    id: "partner-7",
    src: "/Marquee/7.jpg",
    alt: "Institutional & Enterprise Client Partner 7",
    className: "top-[66%] left-[52%] sm:left-[56%]",
    duration: 3.6,
    delay: 1.4,
  },
];

export default function Aboutus() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      data-apple-manual="true"
      aria-labelledby="about-heading"
      className="bg-white text-brand-navy section-padding overflow-hidden"
    >
      <div className="container-sash">
        {/* Center Container with Border and 12-Grid Structure */}
        <div className="relative w-full rounded-[32px] sm:rounded-[36px] lg:rounded-[44px] bg-white border border-black/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.03)] p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (6 of 12 grid): Typographic & Value Proposition Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
              {/* Eyebrow Badge: ABOUT US */}
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#FDEBEB] text-brand-red text-[11px] font-semibold uppercase tracking-wider mb-4 sm:mb-5">
                ABOUT US
              </span>

              {/* Headline */}
              <h2
                id="about-heading"
                className="text-brand-navy font-bold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.12] mb-4 sm:mb-5 text-left"
              >
                Connecting <span className="text-brand-red">Tamil Nadu</span> to high-speed fiber
              </h2>

              {/* Description */}
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 text-left max-w-xl">
                <strong className="font-semibold text-brand-navy">SASH Broadband Private Limited</strong> is an authorized{" "}
                <strong className="font-semibold text-brand-navy">Class–B Internet Service Provider</strong> operating resilient, high-availability optical ring infrastructure across Tamil Nadu. Delivering next-generation optical telecom, direct Tier-1 peering, and last-mile patching with dedicated 24/7 local engineering support.
              </p>

              {/* KPI Metrics Grid */}
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

              {/* CTA Button */}
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy text-white px-7 py-3.5 text-sm font-medium hover:bg-navy-80 transition-all shadow-[0_4px_16px_rgba(1,13,59,0.18)] group"
              >
                <span>Schedule a feasibility call</span>
                <span aria-hidden="true" className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">›</span>
              </Link>
            </div>

            {/* Right Column (6 of 12 grid): Tamil Nadu Halftone Silhouette Map with Floating Logos */}
            <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center select-none overflow-hidden">
              {/* Tamil Nadu Halftone Map Background Image */}
              <div className="relative w-full h-full max-w-[420px] max-h-[420px] flex items-center justify-center">
                <Image
                  src="/map/Tamil Nadu Halftone Silhouette.png"
                  alt="Tamil Nadu Halftone Optical Network Coverage Map"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center pointer-events-none select-none opacity-90 drop-shadow-[0_4px_20px_rgba(1,13,59,0.06)]"
                  priority
                />
              </div>

              {/* Floating Logos & Network Hub Chips above the Map */}

              {/* 1. Primary SASH Broadband Hub (Thiruvallur Core NOC) */}
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
                className="absolute top-[18%] right-[6%] sm:right-[12%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_10px_26px_rgba(0,0,0,0.12)] px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <div className="relative w-14 h-5 flex items-center justify-center shrink-0">
                    <Image
                      src="/Logo/sashbroadband.png"
                      alt="SASH Broadband"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="w-px h-3.5 bg-black/10" aria-hidden="true" />
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-brand-navy whitespace-nowrap">
                    Thiruvallur NOC
                  </span>
                </div>
              </motion.div>

              {/* 2. SASH Favicon Emblem Anchor (Central Hub) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [3, -3, 3],
                      }
                }
                transition={{
                  duration: 4.2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[36%] left-[44%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-black/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-1.5 flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer"
                  title="SASH Optical Backbone"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/Logo/Favicon.png"
                      alt="SASH Emblem"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* 3. Floating Enterprise & Institutional Partner Logos from Marquee */}
              {FLOATING_PARTNER_LOGOS.map((partner) => (
                <motion.div
                  key={partner.id}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [-3, 3, -3],
                        }
                  }
                  transition={{
                    duration: partner.duration,
                    delay: partner.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute ${partner.className} -translate-x-1/2 -translate-y-1/2 z-20`}
                >
                  <div className="rounded-full bg-white border border-black/[0.08] shadow-[0_8px_22px_rgba(0,0,0,0.08)] px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center justify-center transition-transform duration-200 hover:scale-108 cursor-pointer">
                    <div className="relative w-16 sm:w-18 h-7 sm:h-8 flex items-center justify-center">
                      <Image
                        src={partner.src}
                        alt={partner.alt}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
