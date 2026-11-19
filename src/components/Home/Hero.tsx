"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { APPLE_EASE } from "@/components/ui/apple-scroll";

interface ServiceHeroSlide {
  id: string;
  serviceLabel: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

const HERO_SERVICE_SLIDES: ServiceHeroSlide[] = [
  {
    id: "broadband",
    serviceLabel: "Home Fibre Broadband",
    eyebrow: "HIGH-UPTIME BUSINESS BROADBAND",
    headlinePrefix: "Faster speeds.",
    headlineHighlight: "Just for you.",
    subtitle:
      "That's the SASH Fibre Broadband advantage — unlimited data, free installation, and speeds up to 1 Gbps across Thiruvallur & Tamil Nadu.",
    ctaText: "Check Availabilty",
    ctaHref: "/broadband-services",
    secondaryCtaText: "View All Plans",
    secondaryCtaHref: "/#plans",
  },
  {
    id: "leased-line",
    serviceLabel: "1:1 Internet Leased Line",
    eyebrow: "DEDICATED ENTERPRISE CONNECTIVITY",
    headlinePrefix: "1:1 Dedicated",
    headlineHighlight: "Leased Lines.",
    subtitle:
      "That's the Enterprise advantage — uncontended symmetrical fibre with SLA-backed uptime and static IP routing.",
    ctaText: "Get Leased Line Quote",
    ctaHref: "/lease-line",
    secondaryCtaText: "Check Feasibility",
    secondaryCtaHref: "/#contact",
  },
  {
    id: "sme-internet",
    serviceLabel: "SME Business Internet",
    eyebrow: "SME BUSINESS BROADBAND",
    headlinePrefix: "Built for growing",
    headlineHighlight: "businesses.",
    subtitle:
      "That's the SME Internet advantage — priority routing, symmetrical bandwidth, and price lock for offices & retail.",
    ctaText: "Explore SME Plans",
    ctaHref: "/sme-internet",
    secondaryCtaText: "Request Callback",
    secondaryCtaHref: "/#contact",
  },
  {
    id: "cctv",
    serviceLabel: "HD IP CCTV Surveillance",
    eyebrow: "SMART PREMISES SURVEILLANCE",
    headlinePrefix: "24/7 Smart",
    headlineHighlight: "CCTV Security.",
    subtitle:
      "That's the SASH Surveillance advantage — live HD mobile viewing and end-to-end IP camera installation.",
    ctaText: "Book Free Survey",
    ctaHref: "/cctv",
    secondaryCtaText: "Talk to Engineer",
    secondaryCtaHref: "/#contact",
  },
  {
    id: "intranet",
    serviceLabel: "Private Multi-Site Intranet",
    eyebrow: "MULTI-BRANCH OPTICAL WAN",
    headlinePrefix: "Secure Multi-Site",
    headlineHighlight: "Intranet.",
    subtitle:
      "That's the Private Network advantage — secure optical LAN interconnecting offices, warehouses, and campuses.",
    ctaText: "Request Consultation",
    ctaHref: "/intranet",
    secondaryCtaText: "Check Coverage",
    secondaryCtaHref: "/#contact",
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

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const currentSlide = HERO_SERVICE_SLIDES[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) =>
        prev === HERO_SERVICE_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 4800);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const textSlideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 32 : -32,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -32 : 32,
      filter: "blur(4px)",
    }),
  };

  return (
    <>
      {/* 1. Floating Banner Card Hero in Signature Shared Style */}
      <section
        data-apple-manual="true"
        aria-labelledby="hero-heading"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full bg-white py-3 sm:py-5 lg:py-6 font-sans antialiased"
      >
        <div className="container-sash">
          {/* Deep-Rounded Floating Banner Card */}
          <div
            className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-black/[0.06] shadow-[0_24px_64px_-16px_rgba(16,24,70,0.35),0_4px_16px_rgba(0,0,0,0.06)]"
            style={{
              background:
                "linear-gradient(180deg, #E7CAF8 0%, #C6B0DF 16%, #A092BF 33%, #7C73A2 50%, #585584 68%, #343666 84%, #101846 100%)",
            }}
          >
            <div className="w-full min-h-[520px] sm:min-h-[550px] lg:min-h-[560px] grid grid-cols-1 lg:grid-cols-12 items-stretch relative">
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
                    {/* Eyebrow Red Pill Badge */}
                    <div className="inline-flex min-h-6 items-center justify-center rounded-full bg-[#DE0302] px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white shadow-xs">
                      {currentSlide.eyebrow}
                    </div>

                    {/* Display Heading Style: Crisp White Text, Semibold */}
                    <h1
                      id="hero-heading"
                      className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-[54px] lg:leading-[1.1] font-semibold tracking-[-0.05px] text-white"
                    >
                      <span className="block">{currentSlide.headlinePrefix}</span>
                      <span className="block">{currentSlide.headlineHighlight}</span>
                    </h1>

                    {/* Description Paragraph */}
                    <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base leading-relaxed font-normal text-white/85 tracking-[-0.05px]">
                      {currentSlide.subtitle}
                    </p>

                    {/* CTAs: 48px Pill Height, 16px Font */}
                    <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                      <Link
                        href={currentSlide.ctaHref}
                        className="group/btn inline-flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#DE0302] hover:bg-[#B80201] text-white px-6 text-base font-medium shadow-[0_8px_24px_rgba(222,3,2,0.35)] outline-2 -outline-offset-2 outline-white/20 transition-all duration-150 active:scale-[0.98]"
                      >
                        <span>{currentSlide.ctaText}</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
                      </Link>

                      <Link
                        href={currentSlide.secondaryCtaHref}
                        className="group/link inline-flex h-12 min-h-[48px] items-center justify-center gap-1.5 text-white hover:text-white/80 px-2 sm:px-3 text-base font-medium transition-colors"
                      >
                        <span>{currentSlide.secondaryCtaText}</span>
                        <ChevronRight className="w-4 h-4 text-white/80 transition-transform duration-150 group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Social Proof: 3 Avatars + Star + Google Rating */}
                    <div className="mt-6 sm:mt-8 flex items-center gap-3 select-none">
                      <div className="flex -space-x-2">
                        <div className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-xs bg-neutral-300">
                          <Image
                            src="/avatars/avatar-1.png"
                            alt="Customer review"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-xs bg-neutral-400">
                          <Image
                            src="/avatars/avatar-2.png"
                            alt="Customer review"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-xs bg-neutral-500">
                          <Image
                            src="/avatars/avatar-3.png"
                            alt="Customer review"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-white/90 tracking-[-0.05px]">
                          4.6 rating in google
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom-Left Slide Indicator Dots Matching Shared Style */}
                <div
                  className="flex items-center gap-2 pt-6 sm:pt-8"
                  aria-label="Slide indicators"
                >
                  {HERO_SERVICE_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}: ${slide.serviceLabel}`}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        idx === activeIndex
                          ? "w-7 h-1.5 bg-white shadow-xs"
                          : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Hand Holding Smartphone with SASH Broadband App (5 of 12 columns on desktop) */}
              <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[320px] lg:min-h-[520px] flex items-end justify-center lg:justify-end overflow-hidden">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [-3, 3, -3],
                        }
                  }
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[520px] h-full flex items-end justify-end pointer-events-none select-none"
                >
                  <Image
                    src="/hero-phone-2x-faded.png"
                    alt="SASH Broadband high-speed mobile network app"
                    width={820}
                    height={792}
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="w-full h-auto max-h-[540px] object-contain object-bottom-right drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
                  />
                </motion.div>
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
