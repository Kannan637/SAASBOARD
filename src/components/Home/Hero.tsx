"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { APPLE_EASE } from "@/components/ui/apple-scroll";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";
import CardCanvasPattern, {
  CardPatternType,
} from "@/components/ui/card-canvas-pattern";
import SingleClientMarquee from "@/components/Service/SingleClientMarquee";

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
  pattern: CardPatternType;
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
    pattern: "glyph",
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
    pattern: "blue-arcs",
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
    pattern: "glass",
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
    pattern: "stripes",
    ratingScore: "4.7",
    ratingLabel: "security rating",
    imageSrc: "/Hero/cctv.png",
    imageAlt: "24/7 Smart HD IP CCTV premises surveillance monitoring",
    imageWidth: 1792,
    imageHeight: 2070,
  },
  {
    id: "intranet",
    serviceLabel: "Intranet Solutions",
    eyebrow: "MULTI-BRANCH OPTICAL LAN & WAN",
    headlinePrefix: "Secure Multi-Site",
    headlineHighlight: "Intranet.",
    subtitle:
      "That's the Private Network advantage — secure optical LAN interconnecting offices, warehouses, and campuses across Tamil Nadu.",
    ctaText: "Explore Intranet",
    ctaHref: "/intranet",
    secondaryCtaText: "Check Coverage",
    secondaryCtaHref: "/#contact",
    cardGradient:
      "linear-gradient(180deg, #E6CBF8 0%, #C1ABDA 15%, #9287B8 32%, #686193 50%, #444374 68%, #242859 84%, #081141 100%)",
    pattern: "purple-grid",
    ratingScore: "4.9",
    ratingLabel: "enterprise LAN rating",
    imageSrc: "/Hero/intranet.png",
    imageAlt: "Secure Multi-Site Optical Intranet and Private WAN infrastructure",
    imageWidth: 1840,
    imageHeight: 1842,
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const currentSlide = HERO_SERVICE_SLIDES[activeIndex];

  // Auto-scroll every 8 seconds (8000ms), paused when user hovers or drags
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) =>
        prev === HERO_SERVICE_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

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

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsPaused(false);
    const swipeThreshold = 50;
    const velocityThreshold = 250;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
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
      {/* 1. Hero Section with Increased Width and 5 Distinct Pastel Gradient Backgrounds */}
      <section
        data-apple-manual="true"
        aria-labelledby="hero-heading"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full bg-white py-2 sm:py-3 lg:py-4 font-sans antialiased"
      >
        {/* Increased Width Container (Max 1440px / 1520px on 2xl screens) */}
        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Floating Deep-Rounded Banner Card: Standard Uniform Dimensions Across All Devices & Slides */}
          <div
            className="relative w-full h-[700px] sm:h-[740px] lg:h-[520px] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-black/[0.06] select-none"
            data-pattern={currentSlide.pattern}
          >
            {/* 5 Distinct Canvas Background Pattern Layers with Smooth 700ms Cross-Fade */}
            {HERO_SERVICE_SLIDES.map((slide, idx) => (
              <div
                key={`canvas-bg-${slide.id}`}
                aria-hidden="true"
                data-pattern={slide.pattern}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${
                  idx === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <CardCanvasPattern pattern={slide.pattern} />
                {/* Subtle Content Contrast Scrim for Text Readability without altering the canvas pattern */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/15 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/45 lg:via-black/20 lg:to-transparent pointer-events-none"
                />
              </div>
            ))}

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={handleDragEnd}
              className="w-full h-full flex flex-col justify-between lg:grid lg:grid-cols-12 items-stretch relative z-10 cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* Left Content Column (7 of 12 columns on desktop): Centered on mobile, left-aligned on desktop */}
              <div className="lg:col-span-7 flex flex-col justify-between items-center lg:items-start text-center lg:text-left p-5 sm:p-8 lg:p-10 xl:p-12 z-20 flex-1 lg:flex-none min-h-0">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide.id}
                    custom={direction}
                    variants={textSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: APPLE_EASE }}
                    className="my-auto max-w-2xl w-full flex flex-col items-center lg:items-start text-center lg:text-left"
                  >
                    {/* Eyebrow Badge: Solid Red Pill with White Text matching reference */}
                    <div className="inline-flex min-h-6 items-center justify-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1 text-xs leading-none font-medium text-white tracking-wide">
                      {currentSlide.eyebrow}
                    </div>

                    {/* Headline: Clean, Crisp White Typography (wrapped & centered on mobile, single line on desktop) */}
                    <h1
                      id="hero-heading"
                      className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] lg:leading-[50px] font-medium tracking-[-0.05px] text-white text-center lg:text-left text-balance lg:whitespace-nowrap"
                    >
                      <span>{currentSlide.headlinePrefix} </span>
                      <span>{currentSlide.headlineHighlight}</span>
                    </h1>

                    {/* Subtitle Description: Centered on mobile, formatted cleanly without hiding */}
                    <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-snug sm:leading-relaxed font-normal text-white/85 tracking-[-0.05px] text-center lg:text-left line-clamp-3 sm:line-clamp-2">
                      {currentSlide.subtitle}
                    </p>

                    {/* Action Buttons: Centered on mobile, start-aligned on desktop */}
                    <div
                      onPointerDown={(e) => e.stopPropagation()}
                      className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full cursor-default"
                    >
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

                    {/* Social Proof Rating Row: Centered on mobile, start-aligned on desktop */}
                    <div className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-3 w-full">
                      <AvatarGroup className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white/80">
                        <Avatar size="sm" className="size-7 ring-2 ring-white/80 overflow-hidden shadow-xs">
                          <AvatarImage
                            src="/avatars/avatar-1.png"
                            alt="Satisfied SASH broadband customer 1"
                          />
                          <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                            U1
                          </AvatarFallback>
                        </Avatar>
                        <Avatar size="sm" className="size-7 ring-2 ring-white/80 overflow-hidden shadow-xs">
                          <AvatarImage
                            src="/avatars/avatar-2.png"
                            alt="Satisfied SASH broadband customer 2"
                          />
                          <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                            U2
                          </AvatarFallback>
                        </Avatar>
                        <Avatar size="sm" className="size-7 ring-2 ring-white/80 overflow-hidden shadow-xs">
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

                {/* Carousel Controls: Centered on mobile, start-aligned on desktop */}
                <div
                  onPointerDown={(e) => e.stopPropagation()}
                  className="flex items-center justify-center lg:justify-start gap-3 pt-6 sm:pt-7 w-full cursor-default"
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

                  {/* 5 Slides Carousel Indicators */}
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

              {/* Right Side Column (5 of 12 columns on desktop): Centered on mobile, right-aligned on desktop */}
              <div className="lg:col-span-5 relative w-full h-[260px] sm:h-[320px] lg:h-full min-h-0 flex items-end justify-center lg:justify-end px-4 pt-2 pb-0 sm:px-6 sm:pt-4 sm:pb-0 lg:p-0 shrink-0">
                <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] xl:max-w-[560px] h-full flex items-end justify-center lg:justify-end pointer-events-none select-none translate-x-0">
                  <Image
                    src={currentSlide.imageSrc}
                    alt={currentSlide.imageAlt}
                    width={currentSlide.imageWidth}
                    height={currentSlide.imageHeight}
                    priority
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 520px"
                    className="block w-full h-auto max-h-[260px] sm:max-h-[320px] lg:max-h-[525px] object-contain object-bottom align-bottom mx-auto lg:mx-0"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Trusted Company Logos Strip */}
      <SingleClientMarquee
        heading="Trusted by leading companies and institutions across Tamil Nadu"
        headingClassName="text-center text-xs sm:text-sm font-normal text-neutral-500 tracking-[-0.05px] mb-5 sm:mb-6"
        variant="minimal"
        className="border-b border-black/[0.05] py-7 sm:py-8"
      />
    </>
  );
}
