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
                    className="h-20 w-40 sm:h-22 sm:w-44 shrink-0 rounded-2xl bg-white border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-4 py-3 flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
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

export default function Aboutus() {
    return (
        <section
            id="about"
            data-apple-manual="true"
            aria-labelledby="partner-marquee-heading"
            className="bg-white text-brand-navy py-20 md:py-28 lg:py-32 overflow-hidden"
        >
            <div className="container-sash mb-14 sm:mb-16 lg:mb-20">
                <AppleReveal className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-10 lg:col-start-2 flex flex-col items-center text-center">
                        <p className="eyebrow-label text-brand-red mb-3.5">
                            About Us &amp; Our Clients
                        </p>
                        <h2
                            id="partner-marquee-heading"
                            className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5"
                        >
                            About{" "}
                            <span className="text-brand-red">SASH Broadband</span>{" "}
                            &amp; Our Clients
                        </h2>

                        <p className="text-neutral-600 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-3xl mx-auto">
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
                    </div>
                </AppleReveal>
            </div>

            {/* Full-width two-row counter-scrolling marquee stage with soft side fades */}
            <div className="relative mx-auto max-w-[1440px] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="space-y-5 sm:space-y-6 lg:space-y-7">
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
