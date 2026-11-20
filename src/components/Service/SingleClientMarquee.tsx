"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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

export interface SingleClientMarqueeProps {
  heading?: string;
  className?: string;
  variant?: "cards" | "minimal";
  speedSeconds?: number;
}

/**
 * Single-Row Client Logo Marquee with butter-smooth infinite GSAP scroll,
 * pause-on-hover, and accessible reduced-motion support.
 */
export function SingleClientMarquee({
  heading = "Trusted by Leading Domestic & Corporate Clients Across Tamil Nadu",
  className,
  variant = "cards",
  speedSeconds = 55,
}: SingleClientMarqueeProps) {
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
  }, [speedSeconds]);

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
      data-apple-manual="true"
      aria-label="Trusted clients and enterprise partners"
      className={cn(
        "bg-white border-b border-neutral-100 py-7 sm:py-9 overflow-hidden select-none",
        className
      )}
    >
      {heading && (
        <div className="container-sash mb-4 sm:mb-5">
          <p className="text-center text-xs uppercase tracking-wider text-neutral-600 font-semibold">
            {heading}
          </p>
        </div>
      )}

      <div className="relative mx-auto max-w-[1440px]">
        {/* Soft edge gradient masks */}
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
