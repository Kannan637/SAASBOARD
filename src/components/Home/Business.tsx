"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface ShowcaseSlide {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc: string;
  imageAlt: string;
  bgColor: string;
  accentColor: string;
}

export interface BusinessShowcaseProps {
  slides?: ShowcaseSlide[];
  /** Scroll distance per slide in vh units (default: 100) */
  scrollDistancePerSlide?: number;
  /** Fraction of each slide's scroll window spent holding at rest (0 to 0.9, default: 0.6) */
  holdAmount?: number;
}

export const DEFAULT_BUSINESS_SLIDES: ShowcaseSlide[] = [
  {
    id: "secure-comms",
    eyebrow: "ENTERPRISE LEASED LINE",
    title: "Uninterrupted secure communications",
    description:
      "Dedicated 1:1 symmetrical fibre with 99.9% SLA-backed uptime, sub-5ms latency, and dual-ring automatic failover to keep banking, ERP, and mission-critical operations online 24/7.",
    buttonText: "Learn more",
    buttonHref: "/lease-line",
    imageSrc: "/dashboards/leased-line-dashboard.svg",
    imageAlt:
      "SASH Enterprise ILL Telemetry dashboard showing 1 Gbps symmetrical traffic and 99.98% SLA uptime",
    bgColor: "#EAF2FF",
    accentColor: "#2563EB",
  },
  {
    id: "scalable-sme",
    eyebrow: "SME BROADBAND",
    title: "Scalable SME plans",
    description:
      "High-bandwidth business fibre packages engineered for retail counters, clinics, and growing offices. Scale bandwidth on demand with priority Cloud QoS and a 2-year price lock.",
    buttonText: "Learn more",
    buttonHref: "/sme-internet",
    imageSrc: "/dashboards/sme-dashboard.svg",
    imageAlt:
      "SME Bandwidth and Cloud QoS Console showing 342 Mbps utilization and priority traffic shaping",
    bgColor: "#E6F7F0",
    accentColor: "#059669",
  },
  {
    id: "private-intranet",
    eyebrow: "MULTI-SITE WAN",
    title: "Private intranet",
    description:
      "Direct branch-to-branch optical WAN connectivity across Tamil Nadu with zero public internet exposure. Link headquarters, factories, and warehouses over hardware-encrypted VLAN tunnels.",
    buttonText: "Learn more",
    buttonHref: "/intranet",
    imageSrc: "/dashboards/intranet-dashboard.svg",
    imageAlt:
      "Tamil Nadu Multi-Site Private WAN Topology dashboard connecting 7 active regional hubs",
    bgColor: "#F1ECFF",
    accentColor: "#7C3AED",
  },
  {
    id: "cctv-premises",
    eyebrow: "PREMISES SURVEILLANCE",
    title: "CCTV for premises",
    description:
      "Commercial 4K & HD IP camera surveillance with 24/7 dual NVR and 30-day encrypted cloud retention, AI human/vehicle motion alerts, and live mobile monitoring.",
    buttonText: "Learn more",
    buttonHref: "/cctv",
    imageSrc: "/dashboards/cctv-dashboard.svg",
    imageAlt:
      "Premises HD IP CCTV Command Center showing 16 live camera feeds and 30-day cloud retention",
    bgColor: "#FFEBEB",
    accentColor: "#DE0302",
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

  // N holds of weight `hold` + (N - 1) transitions of weight `trans`
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

  // Smooth color interpolation for card pastel background and button accent
  const indexStops = slides.map((_, idx) => idx);
  const bgColors = slides.map((s) => s.bgColor);
  const accentColors = slides.map((s) => s.accentColor);

  const animatedCardBg = useTransform(imageSpring, indexStops, bgColors);
  const animatedAccentBg = useTransform(
    imageSpring,
    indexStops,
    accentColors
  );

  // Accessibility: Reduced motion fallback renders a clean static stacked list
  if (prefersReducedMotion) {
    return (
      <section
        id="business"
        aria-labelledby="business-heading"
        className="bg-white text-brand-navy py-20"
      >
        <div className="container-sash max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="eyebrow-label text-brand-red mb-3">
              For Enterprises &amp; SMEs
            </p>
            <h2
              id="business-heading"
              className="text-brand-navy font-bold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.15] mb-3.5"
            >
              Enterprise-grade connectivity for Tamil Nadu businesses
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Keep your billing systems, cloud ERP, multi-branch operations, and
              IP surveillance online without interruption.
            </p>
          </div>

          <div className="space-y-8">
            {slides.map((slide) => (
              <div
                key={slide.id}
                style={{ backgroundColor: slide.bgColor }}
                className="rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(1,13,59,0.1)] flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 flex flex-col justify-center">
                  {slide.eyebrow && (
                    <span
                      style={{ color: slide.accentColor }}
                      className="text-xs font-semibold uppercase tracking-wider mb-2.5 block"
                    >
                      {slide.eyebrow}
                    </span>
                  )}
                  <h3 className="text-brand-navy font-bold text-2xl sm:text-3xl tracking-tight leading-tight mb-3.5">
                    {slide.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {slide.description}
                  </p>
                  <div>
                    <Link
                      href={slide.buttonHref || "#contact"}
                      style={{ backgroundColor: slide.accentColor }}
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
                    >
                      <span>{slide.buttonText || "Learn more"}</span>
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 w-full">
                  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-white shadow-sm border border-black/5">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 55vw"
                      className="object-contain p-3"
                    />
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
      <div className="container-sash pt-16 sm:pt-24 pb-4 text-center max-w-3xl mx-auto px-4">
        <p className="eyebrow-label text-brand-red mb-3">
          For Enterprises &amp; SMEs
        </p>
        <h2
          id="business-heading"
          className="text-brand-navy font-bold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.15] mb-3.5"
        >
          Enterprise-grade connectivity for Tamil Nadu businesses
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
          Keep your billing systems, cloud ERP, multi-branch operations, and IP
          surveillance online without interruption.
        </p>
      </div>

      {/* Tall Scroll Wrapper: height = (numSlides × scrollDistancePerSlide vh) */}
      <div
        ref={wrapperRef}
        style={{ height: `${numSlides * scrollDistancePerSlide}vh` }}
        className="relative w-full"
      >
        {/* Sticky Full-Screen Container pinning the centered rounded-3xl card */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ backgroundColor: animatedCardBg }}
            className="w-full max-w-5xl h-[74vh] sm:h-[70vh] min-h-[480px] max-h-[660px] rounded-3xl shadow-[0_24px_64px_-12px_rgba(1,13,59,0.12)] border border-black/[0.06] overflow-hidden flex flex-col-reverse lg:grid lg:grid-cols-12 relative select-none"
          >
            {/* Left Column (Desktop) / Bottom (Mobile): Clipped by the card */}
            <div className="w-full h-[48%] lg:h-full lg:col-span-5 overflow-hidden relative">
              <motion.div
                style={{ y: textStripY }}
                className="w-full h-full will-change-transform"
              >
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="w-full h-full shrink-0 flex flex-col justify-center px-6 sm:px-8 lg:pl-10 lg:pr-4"
                  >
                    {slide.eyebrow && (
                      <motion.span
                        style={{ color: animatedAccentBg }}
                        className="text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3 block"
                      >
                        {slide.eyebrow}
                      </motion.span>
                    )}

                    <h3 className="text-brand-navy font-bold text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-[1.15] mb-3 sm:mb-4">
                      {slide.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed mb-5 sm:mb-7 max-w-md">
                      {slide.description}
                    </p>

                    <div>
                      <motion.div
                        style={{ backgroundColor: animatedAccentBg }}
                        className="inline-flex rounded-full shadow-sm"
                      >
                        <Link
                          href={slide.buttonHref || "#contact"}
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
                        >
                          <span>{slide.buttonText || "Learn more"}</span>
                          <ArrowUpRight
                            className="size-4"
                            aria-hidden="true"
                          />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column (Desktop) / Top (Mobile): Fixed Image Frame */}
            <div className="w-full h-[52%] lg:h-full lg:col-span-7 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
              {/* Fixed Rounded Overflow-Hidden Image Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(1,13,59,0.08)] border border-black/[0.06]">
                {/* Vertical Strip of All Slide Images Sliding Upward */}
                <motion.div
                  style={{ y: imageStripY }}
                  className="w-full h-full will-change-transform"
                >
                  {slides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className="relative w-full h-full shrink-0"
                    >
                      <Image
                        src={slide.imageSrc}
                        alt={slide.imageAlt}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 90vw, 55vw"
                        className="object-contain p-2 sm:p-4"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
