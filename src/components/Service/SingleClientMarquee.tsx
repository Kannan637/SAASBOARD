"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const TOTAL_CLIENT_LOGOS = 34;

export const CLIENT_LOGOS = Array.from(
  { length: TOTAL_CLIENT_LOGOS },
  (_, index) => {
    const num = index + 1;
    return {
      id: `service-client-logo-${num}`,
      src: `/Marquee/${num}.jpg`,
      alt: `SASH Broadband client & partner ${num}`,
    };
  }
);

export interface ClientLogoItem {
  id: string;
  src: string;
  alt: string;
}

/**
 * 12 mutually exclusive logo pools mapped to the 12-column grid
 * (`col-span-6 sm:col-span-4 lg:col-span-3` -> 4 cols × 3 rows on desktop).
 * Disjoint pools guarantee two cells never display the same logo simultaneously.
 */
export const LOGO_GRID_SLOTS: readonly (readonly ClientLogoItem[])[] = [
  [
    { id: "slot-0-kb-autosys", src: "/Marquee/14.jpg", alt: "KB Autosys" },
    { id: "slot-0-johnson-lifts", src: "/Marquee/3.jpg", alt: "Johnson Lifts & Escalators" },
    { id: "slot-0-gmb", src: "/Marquee/24.jpg", alt: "GMB" },
  ],
  [
    { id: "slot-1-sakthi-ferro", src: "/Marquee/5.jpg", alt: "Sakthi Ferro Alloys" },
    { id: "slot-1-hwaseung", src: "/Marquee/4.jpg", alt: "Hwaseung HSI Auto" },
    { id: "slot-1-aerotrans", src: "/Marquee/26.jpg", alt: "AeroTrans Global Forwarding" },
  ],
  [
    { id: "slot-2-gotec", src: "/Marquee/21.jpg", alt: "GOTEC" },
    { id: "slot-2-sanoh", src: "/Marquee/6.jpg", alt: "Sanoh" },
    { id: "slot-2-isteel", src: "/Marquee/28.jpg", alt: "iSteel XLS" },
  ],
  [
    { id: "slot-3-ubitech", src: "/Marquee/12.jpg", alt: "Ubitech Solutions" },
    { id: "slot-3-indutch", src: "/Marquee/7.jpg", alt: "Indutch Composites Technology" },
    { id: "slot-3-itpl", src: "/Marquee/32.jpg", alt: "ITPL" },
  ],
  [
    { id: "slot-4-woosu", src: "/Marquee/25.jpg", alt: "Woosu India" },
    { id: "slot-4-toprun", src: "/Marquee/8.jpg", alt: "Top Run Energy Solution" },
    { id: "slot-4-cftz", src: "/Marquee/33.jpg", alt: "Chennai Free Trade Zone" },
  ],
  [
    { id: "slot-5-enexio", src: "/Marquee/16.jpg", alt: "Enexio" },
    { id: "slot-5-sakthi-park", src: "/Marquee/9.jpg", alt: "Sakthi Industrial Park" },
    { id: "slot-5-fp", src: "/Marquee/30.jpg", alt: "FP" },
  ],
  [
    { id: "slot-6-terrahub", src: "/Marquee/27.jpg", alt: "Terrahub" },
    { id: "slot-6-kochar", src: "/Marquee/11.jpg", alt: "Kochar Homes" },
    { id: "slot-6-eap", src: "/Marquee/10.jpg", alt: "EAP" },
  ],
  [
    { id: "slot-7-vpx360", src: "/Marquee/23.jpg", alt: "VPX 360" },
    { id: "slot-7-eis", src: "/Marquee/13.jpg", alt: "EIS Engineering" },
  ],
  [
    { id: "slot-8-aventura", src: "/Marquee/34.jpg", alt: "Aventura Ventures" },
    { id: "slot-8-uplus", src: "/Marquee/15.jpg", alt: "UPLUS" },
  ],
  [
    { id: "slot-9-das", src: "/Marquee/2.jpg", alt: "DAS" },
    { id: "slot-9-shin-poong", src: "/Marquee/18.jpg", alt: "Shin Poong" },
  ],
  [
    { id: "slot-10-andritz", src: "/Marquee/19.jpg", alt: "Andritz" },
    { id: "slot-10-mktron", src: "/Marquee/20.jpg", alt: "MK Tron" },
  ],
  [
    { id: "slot-11-ets-gre", src: "/Marquee/1.jpg", alt: "ETS GRE" },
    { id: "slot-11-solflux", src: "/Marquee/22.jpg", alt: "Solflux Energy Technologies" },
  ],
];

export const FEATURED_GRID_LOGOS = LOGO_GRID_SLOTS.map((slot) => slot[0]);

const UPWARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface SingleClientMarqueeProps {
  heading?: string;
  headingClassName?: string;
  className?: string;
  variant?: "grid" | "cards" | "minimal";
  speedSeconds?: number;
  /** Interval in ms between upward logo reveal waves in grid mode (default: 2800) */
  cycleIntervalMs?: number;
}

/**
 * Trusted Enterprise & Institutional Client Logos Section.
 * Built on the 12-column CSS grid (`grid-cols-12` -> `col-span-6 sm:col-span-4 lg:col-span-3`),
 * featuring a staggered upward exit + next-logo upward reveal animation.
 */
export function SingleClientMarquee({
  heading = "Trusted by Leading Domestic & Corporate Clients Across Tamil Nadu",
  headingClassName,
  className,
  variant = "grid",
  speedSeconds = 55,
  cycleIntervalMs = 2800,
}: SingleClientMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [waveTick, setWaveTick] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Upward reveal cycle timer for the 12-column grid variant
  useEffect(() => {
    if (variant !== "grid" || !isInView || isHovered) return;
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setWaveTick((prev) => prev + 1);
    }, cycleIntervalMs);

    return () => window.clearInterval(timer);
  }, [variant, isInView, isHovered, cycleIntervalMs]);

  // Fallback GSAP horizontal marquee for legacy variants
  useEffect(() => {
    if (variant === "grid") return;
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
          duration: speedSeconds,
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
  }, [speedSeconds, variant]);

  const handleMarqueeMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0.25,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMarqueeMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  if (variant === "grid") {
    return (
      <section
        ref={sectionRef}
        data-apple-manual="true"
        aria-label="Trusted clients and enterprise partners"
        className={cn(
          "bg-white py-10 sm:py-14 lg:py-16 select-none overflow-x-clip",
          className
        )}
      >
        <div className="mx-auto w-[92%] sm:w-[85%] max-w-[1200px]">
          {heading && (
            <div className="grid grid-cols-12 mb-6 sm:mb-8">
              <div className="col-span-12 text-center">
                <p
                  className={cn(
                    "text-xs sm:text-sm font-medium text-neutral-500",
                    headingClassName
                  )}
                >
                  {heading}
                </p>
              </div>
            </div>
          )}

          {/* 12-Column CSS Grid: 2 cols mobile (col-span-6), 3 cols tablet (sm:col-span-4), 4 cols desktop (lg:col-span-3) */}
          <div
            role="list"
            aria-label="Trusted enterprise and institutional clients"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="grid grid-cols-12 gap-0 border-t border-l border-[#ECECEC] bg-white"
          >
            {LOGO_GRID_SLOTS.map((slotLogos, slotIndex) => {
              const activeLogo = slotLogos[waveTick % slotLogos.length];
              const slotTransition = {
                duration: 0.62,
                delay: slotIndex * 0.06,
                ease: UPWARD_EASE,
              };

              return (
                <div
                  key={`logo-slot-${slotIndex}`}
                  role="listitem"
                  className="col-span-6 sm:col-span-4 lg:col-span-3 group relative flex h-24 sm:h-28 lg:h-[132px] items-center justify-center border-r border-b border-[#ECECEC] bg-white px-5 sm:px-7 lg:px-9 transition-colors duration-200 hover:bg-neutral-50/50 overflow-hidden"
                >
                  {/* Clipped vertical reveal stage: current logo exits upward while next logo rises from below */}
                  <div className="relative h-14 sm:h-16 lg:h-[68px] w-full overflow-hidden flex items-center justify-center">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={activeLogo.id}
                        initial={{ y: "115%", opacity: 0 }}
                        animate={{
                          y: "0%",
                          opacity: 1,
                          transition: slotTransition,
                        }}
                        exit={{
                          y: "-115%",
                          opacity: 0,
                          transition: slotTransition,
                        }}
                        className="absolute inset-0 flex items-center justify-center will-change-transform"
                      >
                        <Image
                          src={activeLogo.src}
                          alt={activeLogo.alt}
                          width={180}
                          height={64}
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 220px"
                          className="h-auto max-h-9 sm:max-h-10 lg:max-h-11 w-auto max-w-[min(128px,100%)] sm:max-w-[min(152px,100%)] lg:max-w-[min(172px,100%)] object-contain select-none pointer-events-none mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const renderCardGroup = (isDuplicate: boolean) => (
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

  const renderMinimalGroup = (isDuplicate: boolean) => (
    <div
      aria-hidden={isDuplicate ? "true" : undefined}
      className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14"
    >
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={`${isDuplicate ? "dup" : "orig"}-${logo.id}`}
          className="shrink-0 flex items-center justify-center transition-transform duration-200 hover:scale-105"
        >
          <Image
            src={logo.src}
            alt={isDuplicate ? "" : logo.alt}
            width={140}
            height={48}
            sizes="140px"
            className="h-8 sm:h-9 w-auto max-w-[120px] sm:max-w-[140px] object-contain select-none pointer-events-none grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mix-blend-multiply"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      data-apple-manual="true"
      aria-label="Trusted clients and enterprise partners"
      className={cn(
        "bg-white border-b border-neutral-100 py-7 sm:py-9 overflow-hidden select-none",
        className
      )}
    >
      {heading && (
        <div className="container-sash mb-4 sm:mb-5">
          <p
            className={cn(
              "text-center text-xs uppercase tracking-wider text-neutral-600 font-semibold",
              headingClassName
            )}
          >
            {heading}
          </p>
        </div>
      )}

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
          onMouseEnter={handleMarqueeMouseEnter}
          onMouseLeave={handleMarqueeMouseLeave}
          className="relative w-full overflow-hidden py-1"
        >
          <div
            ref={trackRef}
            className="flex w-max items-center will-change-transform"
          >
            {variant === "cards" ? (
              <>
                {renderCardGroup(false)}
                {renderCardGroup(true)}
              </>
            ) : (
              <>
                {renderMinimalGroup(false)}
                {renderMinimalGroup(true)}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleClientMarquee;
