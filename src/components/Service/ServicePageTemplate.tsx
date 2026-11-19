"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ChevronRight, Star } from "lucide-react";
import CardCanvasPattern, {
  CardPatternType,
} from "@/components/ui/card-canvas-pattern";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
} from "@/components/ui/apple-scroll";

const TOTAL_CLIENT_LOGOS = 34;

const CLIENT_LOGOS = Array.from({ length: TOTAL_CLIENT_LOGOS }, (_, index) => {
  const num = index + 1;
  return {
    id: `service-client-logo-${num}`,
    src: `/Marquee/${num}.jpg`,
    alt: `SASH Broadband client & partner ${num}`,
  };
});

export interface ServiceHeroProps {
  breadcrumbLabel: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  iconSrc?: string;
  iconAlt?: string;
  badgeLabel?: string;
  specPills?: string[];
  pattern?: CardPatternType;
  cardGradient?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  ratingScore?: string;
  ratingLabel?: string;
}

export interface ServiceDeliverableItem {
  title: string;
  description: string;
  tag?: string;
}

interface ServiceHeroConfig {
  pattern: CardPatternType;
  cardGradient: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  ratingScore: string;
  ratingLabel: string;
}

const SERVICE_CONFIG_BY_LABEL: Record<string, ServiceHeroConfig> = {
  "Broadband Services": {
    pattern: "glyph",
    cardGradient:
      "linear-gradient(180deg, #E6CBF8 0%, #C1ABDA 15%, #9287B8 32%, #686193 50%, #444374 68%, #242859 84%, #081141 100%)",
    imageSrc: "/Hero/Hand Holding Broadband Dashboard Smartphone.png",
    imageAlt: "SASH Broadband ultra-speed network dashboard on smartphone",
    imageWidth: 1247,
    imageHeight: 1261,
    ratingScore: "4.6",
    ratingLabel: "rating in google",
  },
  "Leased Line": {
    pattern: "blue-arcs",
    cardGradient:
      "linear-gradient(180deg, #D4EBFC 0%, #B3D7F7 15%, #7CAFE0 32%, #4F83BE 50%, #2E5C9A 68%, #14376E 84%, #06183B 100%)",
    imageSrc: "/Hero/1to1.png",
    imageAlt: "1:1 Enterprise Dedicated Optical Leased Line infrastructure",
    imageWidth: 1856,
    imageHeight: 2304,
    ratingScore: "4.9",
    ratingLabel: "enterprise rating",
  },
  "SME Internet": {
    pattern: "glass",
    cardGradient:
      "linear-gradient(180deg, #D5F6EC 0%, #B2EAD8 15%, #7BCBBA 32%, #4DA59A 50%, #2E7976 68%, #144C51 84%, #06242B 100%)",
    imageSrc: "/Hero/Business.png",
    imageAlt: "High-speed SME business optical fibre internet setup",
    imageWidth: 1792,
    imageHeight: 2106,
    ratingScore: "4.8",
    ratingLabel: "business rating",
  },
  "CCTV Surveillance": {
    pattern: "stripes",
    cardGradient:
      "linear-gradient(180deg, #FCE0DC 0%, #F6C5BF 15%, #DF9893 32%, #B56B6D 50%, #89464F 68%, #572533 84%, #260C17 100%)",
    imageSrc: "/Hero/cctv.png",
    imageAlt: "24/7 Smart HD IP CCTV premises surveillance monitoring",
    imageWidth: 1792,
    imageHeight: 2070,
    ratingScore: "4.7",
    ratingLabel: "security rating",
  },
  "Intranet Solutions": {
    pattern: "blue-grid",
    cardGradient:
      "linear-gradient(135deg, #030d22 0%, #071b42 25%, #0f3b8c 55%, #1d5fd1 75%, #051636 100%)",
    imageSrc: "/Hero/intranet.png",
    imageAlt: "Secure Multi-Site Optical Intranet and Private WAN",
    imageWidth: 1840,
    imageHeight: 1842,
    ratingScore: "4.9",
    ratingLabel: "enterprise LAN rating",
  },
};

export function ServiceHero({
  breadcrumbLabel,
  eyebrow,
  titlePrefix,
  titleHighlight,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  iconSrc,
  iconAlt,
  pattern: explicitPattern,
  cardGradient: explicitCardGradient,
  imageSrc: explicitImageSrc,
  imageAlt: explicitImageAlt,
  imageWidth: explicitImageWidth,
  imageHeight: explicitImageHeight,
  ratingScore: explicitRatingScore,
  ratingLabel: explicitRatingLabel,
}: ServiceHeroProps) {
  const config =
    SERVICE_CONFIG_BY_LABEL[breadcrumbLabel] ||
    SERVICE_CONFIG_BY_LABEL["Broadband Services"];

  const currentPattern = explicitPattern || config.pattern;
  const resolvedCardGradient =
    explicitCardGradient ||
    config.cardGradient ||
    "linear-gradient(135deg, #030d22 0%, #071b42 25%, #0f3b8c 55%, #1d5fd1 75%, #051636 100%)";
  const resolvedImageSrc =
    explicitImageSrc ||
    config.imageSrc ||
    iconSrc ||
    "/Hero/Hand Holding Broadband Dashboard Smartphone.png";
  const resolvedImageAlt =
    explicitImageAlt || config.imageAlt || iconAlt || "SASH Service Showcase";
  const resolvedImageWidth = explicitImageWidth || config.imageWidth || 1792;
  const resolvedImageHeight = explicitImageHeight || config.imageHeight || 2070;
  const rating = explicitRatingScore || config.ratingScore || "4.8";
  const rLabel = explicitRatingLabel || config.ratingLabel || "rating in google";

  return (
    <section
      data-apple-manual="true"
      aria-labelledby="service-hero-heading"
      className="w-full bg-white py-2 sm:py-3 lg:py-4 font-sans antialiased"
    >
      {/* Increased Width Container (Max 1440px / 1520px on 2xl screens) matching Landing Page Hero */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Floating Deep-Rounded Banner Card matching Landing Page Hero */}
        <div
          className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-black/[0.06]"
          data-pattern={currentPattern}
          style={{ background: resolvedCardGradient }}
        >
          {/* Canvas Background Pattern Layer matching Landing Page Hero */}
          <div
            aria-hidden="true"
            data-pattern={currentPattern}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <CardCanvasPattern pattern={currentPattern} />
            {/* Subtle Content Contrast Scrim for Text Readability without altering the canvas pattern */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/15 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/45 lg:via-black/20 lg:to-transparent pointer-events-none"
            />
          </div>

          <div className="w-full min-h-auto lg:min-h-[520px] grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
            {/* Left Content Column (7 of 12 columns on desktop): Centered on mobile, left-aligned on desktop */}
            <div className="lg:col-span-7 flex flex-col justify-between items-center lg:items-start text-center lg:text-left p-6 sm:p-8 lg:p-10 xl:p-12 z-20">
              <div className="my-auto max-w-2xl w-full flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Eyebrow Badge: Solid Red Pill with White Text matching Landing Page Hero */}
                <div className="inline-flex min-h-6 items-center justify-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1 text-xs leading-none font-medium text-white tracking-wide">
                  {eyebrow}
                </div>

                {/* Headline: Clean, Crisp White Typography matching Landing Page Hero */}
                <h1
                  id="service-hero-heading"
                  className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] lg:leading-[50px] font-medium tracking-[-0.05px] text-white text-center lg:text-left text-balance lg:whitespace-nowrap"
                >
                  <span>{titlePrefix} </span>
                  <span>{titleHighlight}</span>
                </h1>

                {/* Subtitle Description */}
                <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-snug sm:leading-relaxed font-normal text-white/85 tracking-[-0.05px] text-center lg:text-left line-clamp-3 sm:line-clamp-2">
                  {description}
                </p>

                {/* Action Buttons: Centered on mobile, start-aligned on desktop */}
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  <Link
                    href={ctaHref}
                    className="inline-flex h-10 min-h-[40px] items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-hover px-5 sm:px-6 text-sm font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-all duration-150 ease-out active:scale-[0.97]"
                  >
                    <span>{ctaText}</span>
                    <ChevronRight className="size-3.5 stroke-[2.5]" />
                  </Link>

                  {secondaryCtaText && secondaryCtaHref && (
                    <Link
                      href={secondaryCtaHref}
                      className="group/sec inline-flex h-10 min-h-[40px] items-center justify-center gap-1.5 text-sm font-medium text-white hover:text-white/80 transition-colors"
                    >
                      <span>{secondaryCtaText}</span>
                      <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/sec:translate-x-0.5" />
                    </Link>
                  )}
                </div>

                {/* Social Proof Rating Row matching Landing Page Hero */}
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
                      {rating} {rLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Column (5 of 12 columns on desktop): Centered on mobile, shifted on desktop */}
            <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[350px] lg:h-full min-h-[280px] sm:min-h-[350px] lg:min-h-[470px] flex items-end justify-center lg:justify-end overflow-hidden px-4 pt-2 pb-0 sm:p-4 lg:p-0">
              <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] h-full flex items-end justify-center lg:justify-end pointer-events-none select-none translate-x-0 lg:-translate-x-[10%]">
                <Image
                  src={resolvedImageSrc}
                  alt={resolvedImageAlt}
                  width={resolvedImageWidth}
                  height={resolvedImageHeight}
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 45vw"
                  className="w-full h-auto max-h-[260px] sm:max-h-[330px] lg:max-h-[515px] object-contain object-bottom mx-auto lg:mx-0 lg:object-bottom-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Single-Row Client Marquee placed directly below the Service Hero section
 */
export function SingleClientMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.fromTo(
        trackEl,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 55,
          ease: "none",
          repeat: -1,
          force3D: true,
        }
      );
    }, trackRef);

    return () => {
      tweenRef.current = null;
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0.25,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const renderGroup = (isDuplicate: boolean) => (
    <div
      aria-hidden={isDuplicate ? "true" : undefined}
      className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5"
    >
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={`${isDuplicate ? "dup" : "orig"}-${logo.id}`}
          className="h-18 w-36 sm:h-20 sm:w-42 shrink-0 rounded-xl bg-white px-4 py-2.5 flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Image
            src={logo.src}
            alt={isDuplicate ? "" : logo.alt}
            width={150}
            height={58}
            sizes="168px"
            className="max-h-11 sm:max-h-13 w-auto max-w-full object-contain select-none pointer-events-none"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      data-apple-manual="true"
      aria-label="Trusted clients and enterprise partners"
      className="bg-white border-b border-neutral-100 py-7 sm:py-9 overflow-hidden"
    >
      <div className="container-sash mb-4">
        <p className="text-center text-xs uppercase tracking-wider text-neutral-600 font-semibold">
          Trusted by Leading Domestic &amp; Corporate Clients Across Tamil Nadu
        </p>
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-white via-white/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-white via-white/85 to-transparent"
        />

        <div
          role="region"
          aria-label="Client logos scrolling marquee"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full overflow-hidden py-1"
        >
          <div
            ref={trackRef}
            className="flex w-max items-center will-change-transform"
          >
            {renderGroup(false)}
            {renderGroup(true)}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 12-Column Structured Deliverables / Capabilities Section for Service Pages
 */
export function ServiceDeliverablesSection({
  eyebrow,
  heading,
  subtitle,
  items,
}: {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  items: ServiceDeliverableItem[];
}) {
  return (
    <section
      data-apple-manual="true"
      className="bg-white text-brand-navy py-12 md:py-16"
    >
      <div className="container-sash">
        <AppleReveal className="max-w-xl mx-auto text-center mb-9 md:mb-11">
          <p className="eyebrow-label text-brand-red mb-2">{eyebrow}</p>
          <h2 className="text-brand-navy !text-lg sm:!text-xl lg:!text-2xl !leading-snug font-semibold tracking-normal mb-2">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </AppleReveal>

        <AppleStagger className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {items.map((item, idx) => (
            <AppleStaggerItem
              key={item.title}
              className="md:col-span-6 flex"
            >
              <div className="w-full rounded-xl bg-neutral-100/80 border border-brand-navy/8 p-5 sm:p-6 flex flex-col justify-between transition-colors duration-200 hover:border-brand-red/30 shadow-[0px_2px_3px_0px_rgba(5,5,6,0.05)]">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-red text-white text-[11px] font-semibold">
                      0{idx + 1}
                    </span>
                    {item.tag && (
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-brand-navy border border-brand-navy/10 font-semibold">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-brand-navy !text-sm sm:!text-base font-semibold mb-1.5 tracking-normal">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </AppleStaggerItem>
          ))}
        </AppleStagger>
      </div>
    </section>
  );
}
