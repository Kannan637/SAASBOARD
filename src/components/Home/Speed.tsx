"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { MapPin, Wifi, Signal, Plus, BatteryFull } from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=85",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=85",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=85",
  "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=85",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=85",
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=85",
];

/**
 * 3D Perspective Wave-Tilted Image Card matching shared_img:
 * Alternating 3D skewY(±8deg) + rotateY(∓16deg) along the ribbon wave,
 * borderless rounded corners, and zero text/details inside the image.
 */
function WavePerspectiveCard({
  src,
  index,
}: {
  src: string;
  index: number;
}) {
  const isUpSlope = index % 2 === 1;

  return (
    <div
      style={{
        transform: isUpSlope
          ? "perspective(900px) rotateY(16deg) skewY(-8deg) translateY(-8px)"
          : "perspective(900px) rotateY(-16deg) skewY(8deg) translateY(10px)",
        transformStyle: "preserve-3d",
      }}
      className="relative h-[240px] w-[225px] sm:h-[285px] sm:w-[265px] shrink-0 overflow-hidden rounded-[24px] bg-neutral-100 select-none will-change-transform"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 225px, 265px"
        className="h-full w-full object-cover pointer-events-none scale-110"
        loading="lazy"
      />
    </div>
  );
}

/**
 * Single middle carousel that scrolls horizontally ONLY while the user scrolls the page
 */
function ScrollDrivenWaveCarousel({
  smoothProgress,
}: {
  smoothProgress: MotionValue<number>;
}) {
  // Smooth horizontal travel linked directly to page scroll (0 -> 1)
  const xTranslate = useTransform(smoothProgress, [0, 1], ["4%", "-46%"]);

  const cards = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[52%] -translate-y-1/2 z-[5] overflow-visible py-14">
      <motion.div
        style={{ x: xTranslate }}
        className="flex w-max items-center gap-12 sm:gap-16 px-6 will-change-transform"
      >
        {cards.map((src, index) => (
          <WavePerspectiveCard
            key={`wave-card-${index}`}
            src={src}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Looping Cursive S-Curve Ribbon behind the Phone & Cards (matching shared_img geometry)
 */
function LoopingRibbonBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid meet"
        className="absolute left-1/2 top-0 h-full min-w-[1200px] w-full -translate-x-1/2"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="sashLoopRibbon"
            x1="200"
            y1="30"
            x2="1150"
            y2="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#DE0302" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#DE0302" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#FDEBEB" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="ribbonBottomFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Looping Ribbon Path: rises from bottom-left up over the top of the larger phone, loops down behind phone, and rises behind right card */}
        <path
          d="M 140 600
             C 155 430, 475 36, 690 36
             C 850 36, 635 555, 750 570
             C 865 585, 1070 250, 1160 290
             C 1240 325, 1165 515, 1125 615"
          stroke="url(#sashLoopRibbon)"
          strokeWidth="92"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Soft bottom fade on the ribbon */}
        <path
          d="M 140 600
             C 155 430, 475 36, 690 36
             C 850 36, 635 555, 750 570
             C 865 585, 1070 250, 1160 290
             C 1240 325, 1165 515, 1125 615"
          stroke="url(#ribbonBottomFade)"
          strokeWidth="94"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Apple-style Digital Speed Meter synchronized to page scroll (0 Mbps -> 100 Mbps)
 * Replaces the analog dial/needle with a crisp digital readout + 20-segment digital bar meter.
 */
function ScrollDigitalSpeedometer({
  smoothProgress,
}: {
  smoothProgress: MotionValue<number>;
}) {
  const [displayMbps, setDisplayMbps] = useState(0);
  const [displayUpload, setDisplayUpload] = useState(0);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const updateMeter = (progress: number) => {
      // Map section scroll progress [0.02 .. 0.86] -> [0 .. 1]
      const normalized = Math.max(0, Math.min(1, (progress - 0.02) / 0.84));
      const exactMbps = normalized * 100;
      const roundedMbps = Math.round(exactMbps);

      setFillPercent(Math.round(normalized * 100));
      setDisplayMbps(roundedMbps);
      setDisplayUpload(roundedMbps);
    };

    updateMeter(smoothProgress.get());
    const unsubscribe = smoothProgress.on("change", updateMeter);
    return () => unsubscribe();
  }, [smoothProgress]);

  const totalSegments = 20;
  const activeSegments = Math.round((fillPercent / 100) * totalSegments);

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center pt-3">
      {/* Large Apple-Style Digital Counter Readout */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-[56px] min-[360px]:text-[64px] sm:text-[72px] font-medium tracking-[-3px] text-brand-navy tabular-nums leading-none">
            {displayMbps.toString().padStart(2, "0")}
          </span>
          <span className="text-[20px] sm:text-[22px] font-medium tracking-[-0.5px] text-brand-red">
            Mbps
          </span>
        </div>
        <span className="mt-2 text-[9.5px] sm:text-[10px] font-medium tracking-[2px] text-[#8E8E93] uppercase">
          DIGITAL DOWNLOAD METER
        </span>
      </div>

      {/* 20-Segment Digital Bar Meter */}
      <div className="mt-4 w-full px-2">
        <div
          className="grid grid-cols-20 gap-1.5 h-8 items-end"
          aria-hidden="true"
        >
          {[...Array(totalSegments)].map((_, i) => {
            const isActive = i < activeSegments;
            const isHighSpeed = i >= 12;
            // Graduated bar heights for a sleek digital equalizer/meter profile
            const heightPct = 45 + Math.round((i / (totalSegments - 1)) * 55);

            return (
              <div
                key={i}
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-[3px] transition-colors duration-150 ${
                  isActive
                    ? isHighSpeed
                      ? "bg-brand-red"
                      : "bg-brand-navy"
                    : "bg-[#E5E5EA]"
                }`}
              />
            );
          })}
        </div>

        {/* Continuous Digital Progress Bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#E5E5EA]">
          <div
            style={{ width: `${fillPercent}%` }}
            className="h-full rounded-full bg-gradient-to-r from-brand-navy to-brand-red transition-[width] duration-75"
          />
        </div>
      </div>

      {/* Clean Apple-Style Two-Column Digital Metrics Footer */}
      <div className="w-full mt-5 pt-3.5 border-t border-[#E5E5EA] flex items-center justify-between px-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-red-10">
            <Signal size={15} className="text-brand-red" />
          </div>
          <div>
            <p className="text-[9px] font-medium tracking-wider text-[#8E8E93]">
              UPLOAD
            </p>
            <p className="text-[12.5px] font-medium text-brand-navy tabular-nums">
              {displayUpload} Mbps
            </p>
          </div>
        </div>

        <div className="h-7 w-px bg-[#E5E5EA]" />

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E8F8F0]">
            <Wifi size={15} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-[9px] font-medium tracking-wider text-[#8E8E93]">
              PING
            </p>
            <p className="text-[12.5px] font-medium text-brand-navy tabular-nums">
              {displayMbps > 0 ? 12 : 0} ms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Clean Apple-style iPhone Mockup using /Frame/Iphone Frame.png (Larger size, 75% visible, bottom 25% hidden)
 */
function PhoneMockup({
  smoothProgress,
}: {
  smoothProgress: MotionValue<number>;
}) {
  return (
    <div className="relative z-20 mx-auto w-[285px] min-[360px]:w-[340px] sm:w-[400px] max-w-[calc(100vw-24px)] shrink-0">
      {/* 75% Visible Viewport Window (386px of 515px on small, 461px of 615px on mobile, 543px of 724px on sm+) */}
      <div className="h-[386px] min-[360px]:h-[461px] sm:h-[543px] w-full overflow-hidden">
        {/* Full Phone Container (484:876 exact aspect ratio of Iphone Frame.png) */}
        <div className="relative h-[515px] min-[360px]:h-[615px] sm:h-[724px] w-full">
          {/* Inner iOS Screen */}
          <div className="absolute left-[2.9%] right-[2.9%] top-[1.4%] bottom-[1.4%] z-10 overflow-hidden rounded-[42px] min-[360px]:rounded-[50px] sm:rounded-[58px] bg-white">
            {/* iOS Status Bar */}
            <div className="flex h-[42px] min-[360px]:h-[50px] sm:h-[54px] items-center justify-between px-5 min-[360px]:px-7 sm:px-8 pt-2 min-[360px]:pt-2.5">
              <span className="text-[12px] min-[360px]:text-[13px] sm:text-[14px] font-medium text-[#1C1C1E]">
                9:41
              </span>
              <div className="flex items-center gap-1.5 text-[#1C1C1E]">
                <Signal size={14} />
                <Wifi size={14} />
                <BatteryFull size={16} />
              </div>
            </div>

            {/* Clean Apple App Header (matching shared_img) */}
            <div className="flex items-center justify-between px-5 min-[360px]:px-6 sm:px-7 pb-3 pt-1">
              <div className="text-[22px] min-[360px]:text-[24px] sm:text-[27px] font-medium tracking-[-1px] text-brand-navy">
                sash<span className="text-brand-red">.</span>
              </div>

              <span className="rounded-[9px] border border-[#D1D1D6] px-3 min-[360px]:px-3.5 py-0.5 min-[360px]:py-1 text-[10.5px] min-[360px]:text-[11px] sm:text-[12px] font-medium text-[#3A3A3C]">
                Support
              </span>
            </div>

            {/* Main iOS Screen Body */}
            <div className="px-4 min-[360px]:px-5 sm:px-6">
              <h3 className="text-[18px] min-[360px]:text-[20px] sm:text-[22px] font-medium tracking-[-0.4px] text-[#1C1C1E]">
                Internet Speed
              </h3>
              <p className="mt-0.5 text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] text-[#8E8E93]">
                Your connection at a glance
              </p>

              {/* Apple Inset Grouped Speed Card */}
              <div className="mt-3.5 min-[360px]:mt-4 rounded-[20px] min-[360px]:rounded-[24px] border border-[#F2F2F7] bg-[#F9F9FB] px-3.5 min-[360px]:px-4 pb-3.5 min-[360px]:pb-4 pt-3 min-[360px]:pt-3.5">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <span className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-medium tracking-wider text-[#636366]">
                      YOUR INTERNET
                    </span>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] min-[360px]:text-[10.5px] sm:text-[11px] font-medium text-emerald-600">
                        Connected
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-red-10 px-2.5 min-[360px]:px-3 py-0.5 min-[360px]:py-1 text-[9px] min-[360px]:text-[9.5px] font-medium tracking-wider text-brand-red">
                    LIVE TEST
                  </span>
                </div>

                <ScrollDigitalSpeedometer smoothProgress={smoothProgress} />
              </div>

              {/* iOS Region Card (Partially visible at the 75% cutoff with bottom white fade) */}
              <div className="mt-3 min-[360px]:mt-4 flex items-center justify-between rounded-[16px] min-[360px]:rounded-[18px] border border-[#F2F2F7] bg-[#F9F9FB] p-3 min-[360px]:p-3.5 sm:p-4">
                <div className="flex items-center gap-2.5 min-[360px]:gap-3">
                  <div className="flex h-8 w-8 min-[360px]:h-9 min-[360px]:w-9 items-center justify-center rounded-[10px] min-[360px]:rounded-[11px] bg-red-10">
                    <MapPin size={16} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="text-[11.5px] min-[360px]:text-[12px] sm:text-[13px] font-medium text-[#1C1C1E]">
                      Tamil Nadu
                    </p>
                    <p className="text-[9.5px] min-[360px]:text-[10px] text-[#8E8E93]">
                      Your current region
                    </p>
                  </div>
                </div>
                <Plus size={17} className="text-[#8E8E93]" />
              </div>
            </div>
          </div>

          {/* Hardware iPhone Frame Overlay (/Frame/Iphone Frame.png) */}
          <Image
            src="/Frame/Iphone%20Frame.png"
            alt="iPhone Hardware Frame"
            aria-hidden="true"
            width={484}
            height={876}
            loading="lazy"
            className="pointer-events-none select-none absolute left-[-126.45%] top-[-3.2%] w-[352.48%] h-[105.25%] max-w-none z-30"
          />
        </div>
      </div>
    </div>
  );
}

export default function TamilNaduSpeedHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track user's scroll progress through this 250vh sticky section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Apple-smooth spring physics on scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.45,
  });

  return (
    <section
      ref={sectionRef}
      data-apple-manual="true"
      aria-labelledby="speed-showcase-heading"
      className="relative h-[250vh] w-full bg-white"
    >
      {/* Sticky Viewport Stage: Pins while scrolling 0 Mbps -> 50 Mbps, then moves to next section */}
      <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden flex flex-col justify-end">
        {/* Stage Area: Looping Ribbon + 3D Wave-Skewed Carousel + Larger 75% Visible Phone */}
        <div className="relative w-full h-[540px] sm:h-[630px] flex items-end justify-center overflow-hidden">
          {/* Looping Center-Peaked Ribbon Behind Phone & Cards */}
          <LoopingRibbonBackground />

          {/* 3D Perspective Wave-Skewed Image Carousel (Scroll-Linked, No Text on Images) */}
          <ScrollDrivenWaveCarousel smoothProgress={smoothProgress} />

          {/* Center Phone Mockup (75% visible, bottom 25% hidden) */}
          <PhoneMockup smoothProgress={smoothProgress} />

          {/* Seamless White Bottom Fade (matching shared_img bottom dissolve) */}
          <div
            className="pointer-events-none absolute bottom-0 inset-x-0 z-30 h-[105px] bg-gradient-to-t from-white via-white/90 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
