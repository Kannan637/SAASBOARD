"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Play } from "lucide-react";
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
  iconSrc: string;
  iconAlt: string;
  badgeLabel?: string;
  specPills?: string[];
}

export interface ServiceDeliverableItem {
  title: string;
  description: string;
  tag?: string;
}

export function ServiceHero({
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
}: ServiceHeroProps) {
  return (
    <section
      data-apple-manual="true"
      className="w-full lg:h-[64vh] lg:min-h-[500px] lg:max-h-[600px] bg-white text-brand-navy border-b border-neutral-100 relative overflow-hidden font-sans antialiased"
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Content Column (7 of 12 columns on desktop — exact Landing Page Hero style) */}
        <div className="lg:col-span-7 flex flex-col justify-between px-5 sm:px-10 lg:pl-[max(20px,calc((100vw-1180px)/2+20px))] lg:pr-8 py-10 sm:py-12 lg:py-12 z-20 overflow-hidden">
          <AppleReveal className="my-auto max-w-xl">
            {/* Service Eyebrow Badge */}
            <div className="eyebrow-label">
              {eyebrow}
            </div>

            {/* Service Heading Style (Urbanist Display MD: 48px-52px, 600 semibold, line-height 1.1) */}
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[52px] leading-[1.1] font-semibold tracking-normal text-balance text-brand-navy">
              <span className="inline-block mr-[0.2em] font-semibold">{titlePrefix}</span>
              <span className="inline-block font-semibold text-brand-red">
                {titleHighlight}
              </span>
            </h1>

            {/* Service Description Style (Juspay Body LG: 16px, 400 regular, line-height 24px) */}
            <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed font-normal text-pretty text-neutral-600">
              {description}
            </p>

            {/* Juspay Buttons: h-10 px-4, 8px radius, 14px font, 500 weight */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={ctaHref}
                className="group/primary inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-linear-to-b from-brand-red to-brand-red-hover px-4 text-sm font-medium text-white shadow-[0_6px_20px_var(--color-red-10)] outline-2 -outline-offset-2 outline-white/20 transition-[background-color,transform,box-shadow] duration-150 ease-out hover:from-brand-red-hover hover:to-brand-red-hover hover:bg-brand-red-hover active:scale-[0.97]"
              >
                {ctaText}
                <ArrowRight
                  className="size-3.5 transition-transform duration-150 ease-out group-hover/primary:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="group/process inline-flex h-10 items-center justify-center gap-2 px-3 text-sm font-medium text-brand-navy transition-[opacity,transform] duration-150 ease-out hover:opacity-75 active:scale-[0.97] rounded-lg"
                >
                  {secondaryCtaText}
                  <Play
                    className="size-3 fill-current transition-transform duration-150 ease-out group-hover/process:scale-110"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </AppleReveal>
        </div>

        {/* Right Side Column (5 of 12 columns on desktop): Large Service Icon on White Background */}
        <div className="lg:col-span-5 flex items-center justify-center px-5 sm:px-10 lg:pr-[max(20px,calc((100vw-1180px)/2+20px))] py-8 lg:py-12">
          <AppleReveal className="flex items-center justify-center">
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={340}
              height={340}
              priority
              className="w-56 h-56 sm:w-68 sm:h-68 lg:w-80 lg:h-80 object-contain select-none"
            />
          </AppleReveal>
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
