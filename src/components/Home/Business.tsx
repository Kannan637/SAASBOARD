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

export interface ShowcaseSlide {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BusinessShowcaseProps {
  slides?: ShowcaseSlide[];
  /** Scroll distance per slide in vh units (default: 100) */
  scrollDistancePerSlide?: number;
  /** Fraction of each slide's scroll window spent holding at rest (0 to 0.9, default: 0.6) */
  holdAmount?: number;
}

const PINSTRIPE_SECTION_BG =
  "bg-white";

const FRAME_GRADIENT =
  "bg-[linear-gradient(145deg,#FFFFFF_0%,#F5F7FB_40%,#ECEFF7_100%)] border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.04)]";

export const DEFAULT_BUSINESS_SLIDES: ShowcaseSlide[] = [
  {
    id: "secure-comms",
    eyebrow: "ENTERPRISE LEASED LINE",
    title: "Uninterrupted secure communications",
    description:
      "Dedicated 1:1 symmetrical fibre with 99.9% SLA-backed uptime, sub-5ms latency, and dual-ring automatic failover to keep banking, ERP, and mission-critical operations online 24/7.",
    imageSrc: "/Business/enterprise-leased-line.png",
    imageAlt:
      "Enterprise Leased Line high-speed secure optical connectivity shield",
  },
  {
    id: "scalable-sme",
    eyebrow: "SME BROADBAND",
    title: "Scalable SME plans",
    description:
      "High-bandwidth business fibre packages engineered for retail counters, clinics, and growing offices. Scale bandwidth on demand with priority Cloud QoS and a 2-year price lock.",
    imageSrc: "/Business/sme-business-fibre.png",
    imageAlt:
      "Scalable SME business plans and high-bandwidth fibre packages",
  },
  {
    id: "private-intranet",
    eyebrow: "MULTI-SITE WAN",
    title: "Private intranet",
    description:
      "Direct branch-to-branch optical WAN connectivity across Tamil Nadu with zero public internet exposure. Link headquarters, factories, and warehouses over hardware-encrypted VLAN tunnels.",
    imageSrc: "/Business/private-intranet-wan.png",
    imageAlt:
      "Protected private intranet multi-site network on laptop display",
  },
  {
    id: "cctv-premises",
    eyebrow: "PREMISES SURVEILLANCE",
    title: "CCTV for premises",
    description:
      "Commercial 4K & HD IP camera surveillance with 24/7 dual NVR and 30-day encrypted cloud retention, AI human/vehicle motion alerts, and live mobile monitoring.",
    imageSrc: "/Business/cctv-surveillance.png",
    imageAlt:
      "High-tech commercial premises CCTV security and surveillance monitoring console",
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

  return (
    <section
      id="business"
      data-apple-manual="true"
      aria-labelledby="business-heading"
      className={`${PINSTRIPE_SECTION_BG} text-brand-navy relative`}
    >
      {/* Section Heading */}
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center pt-16 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-0">
        <p className="eyebrow-label text-brand-red mb-3.5">
          For Enterprises &amp; SMEs
        </p>
        <h2
          id="business-heading"
          className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5"
        >
          Enterprise-grade connectivity for{" "}
          <span className="text-brand-red">Tamil Nadu businesses.</span>
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          Keep your billing, cloud ERP, and operations online with custom fibre
          solutions engineered for Tamil Nadu businesses.
        </p>
      </div>

      {prefersReducedMotion ? (
        /* Accessibility: Reduced motion fallback renders a clean static stacked list */
        <div ref={wrapperRef} className="container-sash py-12 space-y-16">
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
                <div
                  className={`relative w-full h-72 sm:h-96 rounded-[32px] overflow-hidden ${FRAME_GRADIENT}`}
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Tall Scroll Wrapper: height = (numSlides × scrollDistancePerSlide vh) */
        <div
          ref={wrapperRef}
          style={{ height: `${numSlides * scrollDistancePerSlide}vh` }}
          className="relative w-full"
        >
          {/* Sticky Full-Screen Section Container */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <div className="container-sash w-full h-[78vh] sm:h-[74vh] min-h-[500px] max-h-[680px] border-0 shadow-none overflow-hidden flex flex-col-reverse lg:grid lg:grid-cols-12 lg:grid-rows-1 gap-6 lg:gap-12 xl:gap-16 items-stretch relative select-none">
              {/* Left Column (Desktop) / Bottom (Mobile): Clipped by the section container */}
              <div className="w-full h-[42%] lg:h-full lg:col-span-5 overflow-hidden relative">
                <motion.div
                  style={{ y: textStripY }}
                  className="w-full h-full flex flex-col will-change-transform"
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

              {/* Right Column (Desktop) / Top (Mobile): Fixed Rounded Image Frame */}
              <div className="w-full h-[58%] lg:h-full lg:col-span-7 flex items-center justify-center">
                {/* Fixed Rounded Overflow-Hidden Box */}
                <div
                  className={`relative w-full h-full min-h-[240px] lg:min-h-[420px] rounded-[32px] overflow-hidden ${FRAME_GRADIENT}`}
                >
                  {/* Vertical Strip of All Slide Images Sliding Upward */}
                  <motion.div
                    style={{ y: imageStripY }}
                    className="w-full h-full flex flex-col will-change-transform"
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
                          priority
                          sizes="(max-width: 1024px) 90vw, 55vw"
                          className="object-cover object-center"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
