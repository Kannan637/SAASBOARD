"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { APPLE_EASE } from "@/components/ui/apple-scroll";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";

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
  cardGradient: string;
  ratingScore: string;
  ratingLabel: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
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
    ctaText: "Check Availability",
    ctaHref: "/broadband-services",
    secondaryCtaText: "View All Plans",
    secondaryCtaHref: "/#plans",
    cardGradient:
      "linear-gradient(180deg, #E6CBF8 0%, #C1ABDA 15%, #9287B8 32%, #686193 50%, #444374 68%, #242859 84%, #081141 100%)",
    ratingScore: "4.6",
    ratingLabel: "rating in google",
    imageSrc: "/Hero/Hand Holding Broadband Dashboard Smartphone.png",
    imageAlt: "SASH Broadband ultra-speed network dashboard on smartphone",
    imageWidth: 1247,
    imageHeight: 1261,
  },
  {
    id: "leased-line",
    serviceLabel: "1:1 Internet Leased Line",
    eyebrow: "DEDICATED ENTERPRISE CONNECTIVITY",
    headlinePrefix: "1:1 Dedicated",
    headlineHighlight: "Leased Lines.",
    subtitle:
      "That's the Enterprise advantage — uncontended symmetrical fibre with SLA-backed 99.99% uptime and static IP routing.",
    ctaText: "Get Leased Line Quote",
    ctaHref: "/lease-line",
    secondaryCtaText: "Check Feasibility",
    secondaryCtaHref: "/#contact",
    cardGradient:
      "linear-gradient(180deg, #D4EBFC 0%, #B3D7F7 15%, #7CAFE0 32%, #4F83BE 50%, #2E5C9A 68%, #14376E 84%, #06183B 100%)",
    ratingScore: "4.9",
    ratingLabel: "enterprise rating",
    imageSrc: "/Hero/1to1.png",
    imageAlt: "1:1 Enterprise Dedicated Optical Leased Line infrastructure",
    imageWidth: 1856,
    imageHeight: 2304,
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
    cardGradient:
      "linear-gradient(180deg, #D5F6EC 0%, #B2EAD8 15%, #7BCBBA 32%, #4DA59A 50%, #2E7976 68%, #144C51 84%, #06242B 100%)",
    ratingScore: "4.8",
    ratingLabel: "business rating",
    imageSrc: "/Hero/Business.png",
    imageAlt: "High-speed SME business optical fibre internet setup",
    imageWidth: 1792,
    imageHeight: 2106,
  },
  {
    id: "cctv",
    serviceLabel: "HD IP CCTV Surveillance",
    eyebrow: "SMART PREMISES SURVEILLANCE",
    headlinePrefix: "24/7 Smart",
    headlineHighlight: "CCTV Security.",
    subtitle:
      "That's the SASH Surveillance advantage — live HD mobile viewing and end-to-end IP camera installation.",
    ctaText: "Book Free Site Survey",
    ctaHref: "/cctv",
    secondaryCtaText: "Talk to Engineer",
    secondaryCtaHref: "/#contact",
    cardGradient:
      "linear-gradient(180deg, #FCE0DC 0%, #F6C5BF 15%, #DF9893 32%, #B56B6D 50%, #89464F 68%, #572533 84%, #260C17 100%)",
    ratingScore: "4.7",
    ratingLabel: "security rating",
    imageSrc: "/Hero/cctv.png",
    imageAlt: "24/7 Smart HD IP CCTV premises surveillance monitoring",
    imageWidth: 1792,
    imageHeight: 2070,
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

  // Auto-scroll every 3 seconds (3000ms), paused when user hovers
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

  const goToSlide = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

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
      {/* 1. Hero Section with Increased Width and 4 Distinct Pastel Gradient Backgrounds */}
      <section
        data-apple-manual="true"
        aria-labelledby="hero-heading"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full bg-white py-2 sm:py-3 lg:py-4 font-sans antialiased"
      >
        {/* Increased Width Container (Max 1440px / 1520px on 2xl screens) */}
        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Floating Deep-Rounded Banner Card */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-black/[0.06]">
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

            <div className="w-full min-h-[450px] sm:min-h-[490px] lg:min-h-[520px] grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
              {/* Left Content Column (7 of 12 columns on desktop) */}
              <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-8 lg:p-10 xl:p-12 z-20">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide.id}
                    custom={direction}
                    variants={textSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: APPLE_EASE }}
                    className="my-auto max-w-2xl"
                  >
                    {/* Eyebrow Badge: Solid Red Pill with White Text matching reference */}
                    <div className="inline-flex min-h-6 items-center justify-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1 text-xs leading-none font-medium text-white tracking-wide">
                      {currentSlide.eyebrow}
                    </div>

                    {/* Headline: Clean, Crisp White Typography in a Single Line */}
                    <h1
                      id="hero-heading"
                      className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] lg:leading-[50px] font-medium tracking-[-0.05px] text-white sm:whitespace-nowrap"
                    >
                      <span>{currentSlide.headlinePrefix} </span>
                      <span>{currentSlide.headlineHighlight}</span>
                    </h1>

                    {/* Subtitle Description: Formatted in 2 lines */}
                    <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-snug sm:leading-relaxed font-normal text-white/85 tracking-[-0.05px] line-clamp-2">
                      {currentSlide.subtitle}
                    </p>

                    {/* Action Buttons: Compact Refined Size (40px Height, 14px Font Size) */}
                    <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                      <Link
                        href={currentSlide.ctaHref}
                        className="inline-flex h-10 min-h-[40px] items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-hover px-5 sm:px-6 text-sm font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-all duration-150 ease-out active:scale-[0.97]"
                      >
                        <span>{currentSlide.ctaText}</span>
                        <ChevronRight className="size-3.5 stroke-[2.5]" />
                      </Link>

                      <Link
                        href={currentSlide.secondaryCtaHref}
                        className="group/sec inline-flex h-10 min-h-[40px] items-center justify-center gap-1.5 text-sm font-medium text-white hover:text-white/80 transition-colors"
                      >
                        <span>{currentSlide.secondaryCtaText}</span>
                        <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/sec:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Social Proof Rating Row matching reference using shadcn Avatar */}
                    <div className="mt-7 sm:mt-8 flex items-center gap-3">
                      <AvatarGroup className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white/70">
                        <Avatar size="sm" className="size-7 ring-2 ring-white/70">
                          <AvatarImage
                            src="/avatars/avatar-1.png"
                            alt="Satisfied SASH broadband customer 1"
                          />
                          <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                            U1
                          </AvatarFallback>
                        </Avatar>
                        <Avatar size="sm" className="size-7 ring-2 ring-white/70">
                          <AvatarImage
                            src="/avatars/avatar-2.png"
                            alt="Satisfied SASH broadband customer 2"
                          />
                          <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                            U2
                          </AvatarFallback>
                        </Avatar>
                        <Avatar size="sm" className="size-7 ring-2 ring-white/70">
                          <AvatarImage
                            src="/avatars/avatar-3.png"
                            alt="Satisfied SASH broadband customer 3"
                          />
                          <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                            U3
                          </AvatarFallback>
                        </Avatar>
                      </AvatarGroup>
                      <div className="flex items-center gap-1.5 text-sm font-normal text-white/90">
                        <Star className="size-4 text-amber-400 fill-amber-400" />
                        <span>
                          {currentSlide.ratingScore} {currentSlide.ratingLabel}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls: Previous/Next Navigation Buttons + Slide Indicators + Counter */}
                <div
                  className="flex items-center gap-3 pt-5 sm:pt-7"
                  aria-label="Hero carousel controls"
                >
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="size-7 sm:size-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  {/* 4 Slides Carousel Indicators */}
                  <div className="flex items-center gap-1.5" aria-label="Slide indicators">
                    {HERO_SERVICE_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}: ${slide.serviceLabel}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          idx === activeIndex
                            ? "w-6 sm:w-7 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="size-7 sm:size-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                  >
                    <ChevronRight className="size-4" />
                  </button>

                  {/* Slide Counter */}
                  <span className="text-xs font-mono font-medium text-white/70 tabular-nums ml-1 select-none">
                    0{activeIndex + 1} / 0{HERO_SERVICE_SLIDES.length}
                  </span>
                </div>
              </div>

              {/* Right Side Column (5 of 12 columns on desktop): Dedicated Service Image without animation or shadows (moved 10% left, height reduced 10%) */}
              <div className="lg:col-span-5 relative w-full h-[310px] sm:h-[380px] lg:h-full min-h-[310px] lg:min-h-[470px] flex items-end justify-center lg:justify-end overflow-hidden p-2 sm:p-4 lg:p-0">
                <div className="relative w-full max-w-[360px] sm:max-w-[430px] lg:max-w-[500px] h-full flex items-end justify-center lg:justify-end pointer-events-none select-none -translate-x-[10%]">
                  <Image
                    src={currentSlide.imageSrc}
                    alt={currentSlide.imageAlt}
                    width={currentSlide.imageWidth}
                    height={currentSlide.imageHeight}
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="w-full h-auto max-h-[470px] sm:max-h-[495px] lg:max-h-[515px] object-contain object-bottom-right"
                  />
                </div>
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
