"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AppleReveal } from "@/components/ui/apple-scroll";

const TOTAL_LOGOS = 34;

const ALL_MARQUEE_LOGOS = Array.from({ length: TOTAL_LOGOS }, (_, index) => {
    const num = index + 1;
    return {
        id: `partner-logo-${num}`,
        src: `/Marquee/${num}.jpg`,
        alt: `SASH Broadband enterprise & institutional partner ${num}`,
    };
});

// Split logos cleanly across the two opposing marquee rows
const TOP_ROW_LOGOS = ALL_MARQUEE_LOGOS.slice(0, 17);
const BOTTOM_ROW_LOGOS = ALL_MARQUEE_LOGOS.slice(17);

interface LogoRowProps {
    logos: typeof ALL_MARQUEE_LOGOS;
    direction: "rtl" | "ltr";
    durationSeconds?: number;
    label: string;
}

function MarqueeLogoTrack({
    logos,
    direction,
    durationSeconds = 40,
    label,
}: LogoRowProps) {
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
            const fromX = direction === "rtl" ? 0 : -50;
            const toX = direction === "rtl" ? -50 : 0;

            tweenRef.current = gsap.fromTo(
                trackEl,
                { xPercent: fromX },
                {
                    xPercent: toX,
                    duration: durationSeconds,
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
    }, [direction, durationSeconds]);

    const handleMouseEnter = () => {
        if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.4, ease: "power2.out" });
        }
    };

    const handleMouseLeave = () => {
        if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4, ease: "power2.out" });
        }
    };

    const renderGroup = (isDuplicate: boolean) => (
        <div
            aria-hidden={isDuplicate ? "true" : undefined}
            className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5"
        >
            {logos.map((logo) => (
                <div
                    key={`${isDuplicate ? "dup" : "orig"}-${logo.id}`}
                    className="h-20 w-40 sm:h-22 sm:w-44 shrink-0 rounded-[14px] bg-white  px-4 py-3 flex items-center justify-center transition-[border-color,transform] duration-200 hover:border-brand-red/35 hover:-translate-y-0.5"
                >
                    <Image
                        src={logo.src}
                        alt={isDuplicate ? "" : logo.alt}
                        width={160}
                        height={64}
                        sizes="176px"
                        className="max-h-12 sm:max-h-14 w-auto max-w-full object-contain select-none pointer-events-none"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div
            role="region"
            aria-label={label}
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
    );
}

export default function Marquee() {
    return (
        <section
            id="about"
            data-apple-manual="true"
            aria-labelledby="partner-marquee-heading"
            className="bg-white text-brand-navy py-16 md:py-24 overflow-hidden"
        >
            <div className="container-sash mb-14 md:mb-16">
                <AppleReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column (5 of 12 cols): Eyebrow, Heading & ISP Credential */}
                    <div className="lg:col-span-5">
                        <p className="eyebrow-label text-brand-red mb-3">
                            About Us &amp; Our Clients
                        </p>
                        <h2
                            id="partner-marquee-heading"
                            className="text-brand-navy text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.08] font-normal tracking-tight mb-5"
                        >
                            About{" "}
                            <span className="text-brand-red">SASH Broadband</span>{" "}
                            &amp; Our Clients
                        </h2>

                        <div className="inline-flex items-center gap-2.5 rounded-[12px] bg-neutral-100 px-4 py-2.5 text-xs sm:text-sm font-medium text-brand-navy">
                            <span
                                className="h-2 w-2 rounded-full bg-brand-red shrink-0"
                                aria-hidden="true"
                            />
                            <span>Licensed Class–B ISP • Tamil Nadu</span>
                        </div>
                    </div>

                    {/* Right Column (7 of 12 cols): Condensed About Us Copy & 3-Pillar Grid */}
                    <div className="lg:col-span-7 space-y-6">
                        <p className="text-neutral-600 text-sm sm:text-base md:text-[17px] leading-relaxed">
                            <strong className="font-semibold text-brand-navy">
                                SASH Broadband Private Limited
                            </strong>{" "}
                            is a licensed{" "}
                            <strong className="font-semibold text-brand-navy">
                                Class–B Internet Service Provider (ISP) in Tamil Nadu
                            </strong>
                            , driven by a young, dynamic team dedicated to quality internet
                            service. We deliver next-generation internet, telecom, and optical
                            solutions for both domestic households and corporate
                            enterprises—complete with end-to-end connectivity and last-mile
                            patching via direct fiber and wireless links to ensure business
                            productivity, continuity, and lasting customer trust.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                            <div className="sm:col-span-4 rounded-[14px] bg-neutral-100/80 p-4">
                                <p className="text-xs font-mono uppercase tracking-wider text-brand-red mb-1">
                                    01 / Licenced ISP
                                </p>
                                <h3 className="text-sm font-semibold text-brand-navy mb-1">
                                    Class–B Tamil Nadu
                                </h3>
                                <p className="text-xs text-neutral-600 leading-relaxed">
                                    Young, dynamic team built around customer time and trust.
                                </p>
                            </div>

                            <div className="sm:col-span-4 rounded-[14px] bg-neutral-100/80 p-4">
                                <p className="text-xs font-mono uppercase tracking-wider text-brand-red mb-1">
                                    02 / Last-Mile
                                </p>
                                <h3 className="text-sm font-semibold text-brand-navy mb-1">
                                    Fiber &amp; Wireless
                                </h3>
                                <p className="text-xs text-neutral-600 leading-relaxed">
                                    End-to-end connectivity with direct fiber and wireless links.
                                </p>
                            </div>

                            <div className="sm:col-span-4 rounded-[14px] bg-neutral-100/80 p-4">
                                <p className="text-xs font-mono uppercase tracking-wider text-brand-red mb-1">
                                    03 / Coverage
                                </p>
                                <h3 className="text-sm font-semibold text-brand-navy mb-1">
                                    Domestic &amp; Corporate
                                </h3>
                                <p className="text-xs text-neutral-600 leading-relaxed">
                                    Reliable internet &amp; telecom powering business continuity.
                                </p>
                            </div>
                        </div>
                    </div>
                </AppleReveal>
            </div>

            {/* Full-width two-row counter-scrolling marquee stage with soft side fades */}
            <div className="relative mx-auto max-w-[1440px]">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-white via-white/85 to-transparent"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-white via-white/85 to-transparent"
                />

                <div className="space-y-4 sm:space-y-5">
                    {/* Top Marquee Row: Right to Left */}
                    <MarqueeLogoTrack
                        logos={TOP_ROW_LOGOS}
                        direction="rtl"
                        durationSeconds={42}
                        label="Partner and client logos scrolling right to left"
                    />

                    {/* Bottom Marquee Row: Left to Right */}
                    <MarqueeLogoTrack
                        logos={BOTTOM_ROW_LOGOS}
                        direction="ltr"
                        durationSeconds={46}
                        label="Partner and client logos scrolling left to right"
                    />
                </div>
            </div>
        </section>
    );
}
