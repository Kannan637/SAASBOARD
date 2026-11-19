"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Zap } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { APPLE_EASE } from "@/components/ui/apple-scroll";

interface ServiceHeroSlide {
  id: string;
  serviceLabel: string;
  serviceIcon: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageSrc: string;
  imageAlt: string;
  metricBadge: string;
  backdropColor?: string;
  cardGradient: string;
  cutoutColor: string;
}

const HERO_SERVICE_SLIDES: ServiceHeroSlide[] = [
  {
    id: "broadband",
    serviceLabel: "Home Fibre Broadband",
    serviceIcon: "/Service/BroadBand.webp",
    eyebrow: "TAMIL NADU'S FTTH FIBRE NETWORK",
    headlinePrefix: "Faster speeds.",
    headlineHighlight: "Just for you.",
    subtitle:
      "That's the SASH Fibre Broadband advantage — unlimited data, free installation, and speeds up to 1 Gbps across Thiruvallur & Tamil Nadu.",
    ctaText: "Upgrade at ₹650",
    ctaHref: "/broadband-services",
    secondaryCtaText: "View Plans",
    secondaryCtaHref: "/#plans",
    imageSrc: "/Hero/hero-broadband.jpg",
    imageAlt:
      "Young man using laptop with glowing red speedometer dial and high-speed fibre light trails",
    metricBadge: "Up to 1 Gbps Ultra-Speed",
    backdropColor: "#050001",
    cardGradient:
      "linear-gradient(135deg, #FFFFFF 0%, #FAF7FE 35%, #F2EBFC 70%, #E8DCF8 100%)",
    cutoutColor: "#F2EBFC",
  },
  {
    id: "leased-line",
    serviceLabel: "1:1 Internet Leased Line",
    serviceIcon: "/Service/Leased Line.webp",
    eyebrow: "DEDICATED ENTERPRISE CONNECTIVITY",
    headlinePrefix: "1:1 Dedicated",
    headlineHighlight: "Leased Lines.",
    subtitle:
      "That's the Enterprise advantage — uncontended symmetrical fibre with SLA-backed uptime and static IP routing.",
    ctaText: "Get Leased Line Quote",
    ctaHref: "/lease-line",
    secondaryCtaText: "Check Feasibility",
    secondaryCtaHref: "/#contact",
    imageSrc: "/Hero/hero-leased-line.jpg",
    imageAlt:
      "Enterprise server racks in a high-tech data corridor connected with high-speed glowing red optical fibre lines for dedicated 1:1 leased line",
    metricBadge: "99.99% SLA Uptime",
    backdropColor: "#05070E",
    cardGradient:
      "linear-gradient(135deg, #FFFFFF 0%, #F5F9FF 35%, #E6F1FE 70%, #D8EAFD 100%)",
    cutoutColor: "#E6F1FE",
  },
  {
    id: "sme-internet",
    serviceLabel: "SME Business Internet",
    serviceIcon: "/Service/SME Internet.webp",
    eyebrow: "HIGH-UPTIME BUSINESS BROADBAND",
    headlinePrefix: "Built for growing",
    headlineHighlight: "businesses.",
    subtitle:
      "That's the SME Internet advantage — priority routing, symmetrical bandwidth, and price lock for offices & retail.",
    ctaText: "Explore SME Plans",
    ctaHref: "/sme-internet",
    secondaryCtaText: "Request Callback",
    secondaryCtaHref: "/#contact",
    imageSrc: "/Hero/hero-sme.jpg",
    imageAlt:
      "Indian business professional holding laptop with glowing red growth chart and upward arrow in front of modern corporate towers",
    metricBadge: "Priority Business Bandwidth",
    backdropColor: "#080710",
    cardGradient:
      "linear-gradient(135deg, #FFFFFF 0%, #F5FBF8 35%, #E3F6ED 70%, #D0F0E1 100%)",
    cutoutColor: "#E3F6ED",
  },
  {
    id: "cctv",
    serviceLabel: "HD IP CCTV Surveillance",
    serviceIcon: "/Service/CCTV.webp",
    eyebrow: "SMART PREMISES SURVEILLANCE",
    headlinePrefix: "24/7 Smart",
    headlineHighlight: "CCTV Security.",
    subtitle:
      "That's the SASH Surveillance advantage — live HD mobile viewing and end-to-end IP camera installation.",
    ctaText: "Book Free Site Survey",
    ctaHref: "/cctv",
    secondaryCtaText: "Talk to Engineer",
    secondaryCtaHref: "/#contact",
    imageSrc: "/Hero/hero-cctv.jpg",
    imageAlt:
      "High-definition architectural dome CCTV security camera with glowing red surveillance scanning halo mounted on modern commercial premises",
    metricBadge: "Live HD Cloud Monitoring",
    backdropColor: "#0B0C12",
    cardGradient:
      "linear-gradient(135deg, #FFFFFF 0%, #FFF8F7 35%, #FDEEEB 70%, #FBDCD6 100%)",
    cutoutColor: "#FDEEEB",
  },
];

const COMPANY_LOGOS = Array.from({ length: 34 }, (_, index) => {
  const num = index + 1;
  return {
    id: `company-logo-${num}`,
    src: `/Marquee/${num}.jpg`,
    alt: `SASH Broadband enterprise & institutional client ${num}`,
  };
});

function LeftEdgeCutoutMask({ cutoutColor }: { cutoutColor: string }) {
  return (
    <svg
      className="hidden lg:block absolute -left-px top-0 h-full w-[135px] xl:w-[165px] z-10 pointer-events-none transition-colors duration-700"
      viewBox="0 0 180 600"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 0H156C174 85 162 195 96 300C45 385 18 505 41 600H0V0Z"
        fill="url(#left-cutout-gradient)"
      />
      <defs>
        <linearGradient id="left-cutout-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={cutoutColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const currentSlide = HERO_SERVICE_SLIDES[activeIndex];

  // Auto-scroll every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) =>
        prev === HERO_SERVICE_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? HERO_SERVICE_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) =>
      prev === HERO_SERVICE_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  const textSlideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 36 : -36,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -36 : 36,
      filter: "blur(4px)",
    }),
  };

  const imageSlideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? "14%" : "-14%",
    }),
    center: {
      opacity: 1,
      x: "0%",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? "-14%" : "14%",
    }),
  };

  return (
    <>
      {/* 1. Hero Section with Increased Width and 4 Dynamic Pastel Gradient Backgrounds */}
      <section
        data-apple-manual="true"
        aria-labelledby="hero-heading"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full bg-white py-3 sm:py-5 lg:py-6 font-sans antialiased"
      >
        {/* Increased Width Container (Max 1440px / 1520px on 2xl screens) */}
        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Floating Deep-Rounded Banner Card */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-black/[0.06] shadow-[0_20px_50px_-15px_rgba(1,13,59,0.08),0_2px_8px_rgba(0,0,0,0.03)]">
            {/* 4 Distinct Pastel Gradient Background Layers with Smooth 700ms Cross-Fade */}
            {HERO_SERVICE_SLIDES.map((slide, idx) => (
              <div
                key={`pastel-bg-${slide.id}`}
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${
                  idx === activeIndex ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: slide.cardGradient }}
              />
            ))}

            <div className="w-full min-h-[500px] sm:min-h-[540px] lg:min-h-[560px] grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
              {/* Left Content Column (7 of 12 columns on desktop) */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 z-20">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide.id}
                    custom={direction}
                    variants={textSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: APPLE_EASE }}
                    className="my-auto max-w-xl"
                  >
                    {/* Previous UI Eyebrow Badge Style */}
                    <div className="inline-flex min-h-6 items-center justify-center gap-1.5 rounded-full bg-red-10/85 px-3 py-1 text-xs leading-none font-medium text-brand-navy shadow-[0_1px_1px_rgba(1,13,59,0.06)]">
                      {currentSlide.eyebrow}
                    </div>

                    {/* Previous UI Title Style: Prefix in Brand Navy + Highlight in Brand Red */}
                    <h1
                      id="hero-heading"
                      className="mt-4 text-3xl sm:text-4xl lg:text-[54px] lg:leading-[62px] font-semibold tracking-[-0.05px] text-balance text-brand-navy"
                    >
                      <span className="inline-block mr-[0.2em] font-semibold">
                        {currentSlide.headlinePrefix}
                      </span>
                      <span className="inline-block font-semibold text-brand-red">
                        {currentSlide.headlineHighlight}
                      </span>
                    </h1>

                    {/* Previous UI Description Style */}
                    <p className="mt-4 max-w-md text-base leading-6 font-normal text-pretty text-neutral-600 tracking-[-0.05px]">
                      {currentSlide.subtitle}
                    </p>

                    {/* Previous UI Buttons Style: Primary Red Gradient + Secondary Play Link */}
                    <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                      <Link
                        href={currentSlide.ctaHref}
                        className="group/primary inline-flex h-12 min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-linear-to-b from-brand-red to-brand-red-hover px-6 text-base font-medium text-white shadow-[0_6px_20px_var(--color-red-10)] outline-2 -outline-offset-2 outline-white/20 transition-[background-color,transform,box-shadow] duration-150 ease-out hover:from-brand-red-hover hover:to-brand-red-hover hover:bg-brand-red-hover active:scale-[0.97]"
                      >
                        {currentSlide.ctaText}
                        <ArrowRight className="size-4 transition-transform duration-150 ease-out group-hover/primary:translate-x-0.5" />
                      </Link>

                      <Link
                        href={currentSlide.secondaryCtaHref}
                        className="group/process inline-flex h-12 min-h-[48px] items-center justify-center gap-2.5 px-5 rounded-full text-base font-medium text-brand-navy transition-[opacity,transform] duration-150 ease-out hover:opacity-75 active:scale-[0.97]"
                      >
                        {currentSlide.secondaryCtaText}
                        <Play className="size-3.5 fill-current transition-transform duration-150 ease-out group-hover/process:scale-110" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Slide Navigation Controls (Prev/Next Arrows + Numeric Counter + Indicator Dots) */}
                <div
                  className="flex items-center gap-4 pt-6 sm:pt-8"
                  aria-label="Hero slide controls"
                >
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="w-9 h-9 rounded-full border border-brand-navy/20 text-brand-navy/80 hover:border-brand-navy hover:text-brand-navy flex items-center justify-center transition-[color,border-color,transform] duration-200 ease-out active:scale-[0.96] cursor-pointer bg-white/70 shadow-xs"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M19 12H5" />
                      <path d="m12 19-7-7 7-7" />
                    </svg>
                  </button>

                  {/* 4 Slides Numeric Counter */}
                  <span
                    className="text-xs sm:text-sm font-mono font-medium text-brand-navy tabular-nums"
                    aria-live="polite"
                  >
                    {activeIndex + 1}/{HERO_SERVICE_SLIDES.length}
                  </span>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="w-9 h-9 rounded-full bg-linear-to-b from-brand-red to-brand-red-hover text-white shadow-[0_4px_14px_var(--color-red-10)] outline-2 -outline-offset-2 outline-white/20 hover:from-brand-red-hover hover:to-brand-red-hover flex items-center justify-center transition-[background-color,transform,box-shadow] duration-200 ease-out active:scale-[0.96] cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>

                  {/* Interactive Indicator Pills for all 4 Slides */}
                  <div className="flex items-center gap-1.5 ml-2" aria-label="Slide indicators">
                    {HERO_SERVICE_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          setActiveIndex(idx);
                        }}
                        aria-label={`Go to slide ${idx + 1}: ${slide.serviceLabel}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          idx === activeIndex
                            ? "w-6 h-1.5 bg-brand-red shadow-xs"
                            : "w-1.5 h-1.5 bg-brand-navy/25 hover:bg-brand-navy/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Media Column (5 of 12 columns on desktop with Proper UI Components) */}
              <div
                style={{ backgroundColor: currentSlide.backdropColor || "#050001" }}
                className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[320px] lg:min-h-[520px] overflow-hidden transition-colors duration-500"
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide.id}
                    custom={direction}
                    variants={imageSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: APPLE_EASE }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentSlide.imageSrc}
                      alt={currentSlide.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Signature Organic Left-Edge SVG Cutout Mask with Dynamic Slide Cutout Gradient */}
                <LeftEdgeCutoutMask cutoutColor={currentSlide.cutoutColor} />

                {/* Top Floating Metric Chip */}
                <div className="absolute top-5 right-5 z-20 rounded-full bg-brand-navy/85 backdrop-blur-md border border-white/20 px-3.5 py-1.5 flex items-center gap-1.5 text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
                  <Zap className="w-3.5 h-3.5 text-brand-red fill-brand-red" />
                  <span className="text-[11px] sm:text-xs font-medium tracking-tight">
                    {currentSlide.metricBadge}
                  </span>
                </div>

                {/* Floating Service Icon Pill Badge on Right Photo */}
                <div className="absolute bottom-5 right-5 z-20 rounded-full bg-white/95 backdrop-blur-sm border border-black/[0.06] px-4 py-2 flex items-center gap-2.5 shadow-[0_4px_14px_rgba(1,13,59,0.12)]">
                  <Image
                    src={currentSlide.serviceIcon}
                    alt={currentSlide.serviceLabel}
                    width={26}
                    height={26}
                    className="w-6.5 h-6.5 object-contain shrink-0"
                  />
                  <span className="text-xs font-mono font-medium text-brand-navy">
                    {currentSlide.serviceLabel}
                  </span>
                </div>

                {/* Mobile Top Cutout Mask */}
                <svg
                  className="lg:hidden absolute -top-px left-0 w-full h-10 z-10 pointer-events-none transition-colors duration-700"
                  viewBox="0 0 600 60"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0 0H600V25C420 65 180 65 0 25V0Z"
                    fill="url(#mobile-cutout-gradient)"
                  />
                  <defs>
                    <linearGradient id="mobile-cutout-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor={currentSlide.cutoutColor} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted Company Logos Strip (Logo ticker matching site design system) */}
      <section
        data-apple-manual="true"
        aria-label="Trusted by leading companies and institutions"
        className="w-full bg-white border-b border-black/[0.05] py-7 sm:py-8 overflow-hidden select-none"
      >
        <div className="container-sash">
          <p className="text-center text-xs sm:text-sm font-normal text-neutral-500 tracking-[-0.05px] mb-5 sm:mb-6">
            Trusted by leading companies and institutions across Tamil Nadu
          </p>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            {/* Gradient side-fade fallback overlays */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10"
            />

            <div className="animate-sash-logo-marquee flex items-center gap-10 sm:gap-14 py-1">
              {/* Original Track */}
              {COMPANY_LOGOS.map((logo) => (
                <div
                  key={`orig-${logo.id}`}
                  className="shrink-0 flex items-center justify-center transition-transform duration-200 hover:scale-105"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={48}
                    sizes="140px"
                    className="h-8 sm:h-9 w-auto max-w-[120px] sm:max-w-[140px] object-contain select-none pointer-events-none grayscale opacity-65 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mix-blend-multiply"
                  />
                </div>
              ))}
              {/* Duplicated Track for Seamless Infinite Loop */}
              {COMPANY_LOGOS.map((logo) => (
                <div
                  key={`dup-${logo.id}`}
                  aria-hidden="true"
                  className="shrink-0 flex items-center justify-center transition-transform duration-200 hover:scale-105"
                >
                  <Image
                    src={logo.src}
                    alt=""
                    width={140}
                    height={48}
                    sizes="140px"
                    className="h-8 sm:h-9 w-auto max-w-[120px] sm:max-w-[140px] object-contain select-none pointer-events-none grayscale opacity-65 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
