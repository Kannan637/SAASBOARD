import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
} from "@/components/ui/apple-scroll";

const WHY_SASH_PILLS = [
  "Free router & setup",
  "100% FTTH fibre network",
  "24/7 local engineer support",
  "Licensed ISP in Tamil Nadu",
];

export default function WhySash() {
  return (
    <section
      data-apple-manual="true"
      aria-labelledby="why-sash-heading"
      className="bg-brand-navy text-white section-padding"
    >
      <div className="container-sash">
        {/* Top Section: Center-Aligned Content */}
        <AppleReveal className="max-w-3xl mx-auto text-center flex flex-col items-center mb-14">
          <p className="eyebrow-label mb-5">Why Choose SASH</p>

          <h2 id="why-sash-heading" className="text-white mb-4">
            Built for dependable everyday connectivity
          </h2>

          <p className="text-white/85 text-base md:text-lg max-w-2xl mb-8">
            We own and maintain our local fibre last-mile network across
            Thiruvallur and Tamil Nadu, giving your home or office faster
            installation, symmetrical speeds, and proactive fault resolution.
          </p>

          {/* Centered Quick Highlight Pills */}
          <ul
            aria-label="Core SASH Broadband advantages"
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {WHY_SASH_PILLS.map((pill) => (
              <li
                key={pill}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-navy-80 border border-white/15 text-xs sm:text-sm font-medium text-white"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0"
                  aria-hidden="true"
                />
                <span>{pill}</span>
              </li>
            ))}
          </ul>
        </AppleReveal>

        {/* Bottom Section: Asymmetric Bento Image Collage with Rounded Image Cards */}
        <AppleStagger className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 auto-rows-auto">
          {/* Bento Card 1: Large Tall Feature Image Card (7 cols, 2 rows on desktop) */}
          <AppleStaggerItem className="md:col-span-7 md:row-span-2 flex">
            <article
              data-apple-manual="true"
              className="relative w-full rounded-[24px] overflow-hidden border border-white/15 min-h-[360px] sm:min-h-[420px] lg:min-h-[470px] flex flex-col justify-between p-7 sm:p-9 group"
            >
              <Image
                src="/hero-speed.jpg"
                alt="100% FTTH optical fibre high-speed network in Tamil Nadu"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Navy Readability Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/20"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="inline-block px-3.5 py-1.5 rounded-[10px] bg-brand-red text-white text-xs font-medium uppercase tracking-wider">
                  100% Optical Fibre
                </span>
                <span className="px-3.5 py-1.5 rounded-[10px] bg-brand-navy border border-navy-80 text-white text-xs font-medium">
                  Up to 1 Gbps
                </span>
              </div>

              <div className="relative z-10 max-w-xl mt-auto pt-12">
                <h3 className="text-white text-2xl sm:text-3xl font-medium mb-2.5">
                  100% fibre network
                </h3>
                <p className="text-white/90 text-base leading-relaxed">
                  End-to-end Fibre-to-the-Home (FTTH) optical infrastructure
                  delivers consistent upload and download speeds even during peak
                  evening hours—with zero copper bottlenecks.
                </p>
              </div>
            </article>
          </AppleStaggerItem>

          {/* Bento Card 2: Top-Right Rounded Image Card (5 cols) */}
          <AppleStaggerItem className="md:col-span-5 flex">
            <article
              data-apple-manual="true"
              className="relative w-full rounded-[24px] overflow-hidden bg-navy-80 border border-white/15 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 min-h-[220px]"
            >
              <div className="relative z-10 flex-1">
                <span className="inline-block px-3 py-1 rounded-[8px] bg-brand-red text-white text-xs font-medium uppercase tracking-wider mb-3">
                  ₹0 Setup Cost
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-medium mb-2">
                  Free router and setup
                </h3>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                  Zero upfront installation charges and a pre-configured dual-band
                  Wi-Fi router on eligible home plans.
                </p>
              </div>

              <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center self-end sm:self-center">
                <Image
                  src="/Service/BroadBand.webp"
                  alt="High-speed dual-band Wi-Fi router"
                  width={112}
                  height={112}
                  className="w-full h-full object-contain"
                />
              </div>
            </article>
          </AppleStaggerItem>

          {/* Bento Card 3: Middle-Right Rounded Image Card (5 cols) */}
          <AppleStaggerItem className="md:col-span-5 flex">
            <article
              data-apple-manual="true"
              className="relative w-full rounded-[24px] overflow-hidden border border-white/15 min-h-[225px] p-7 flex flex-col justify-end group"
            >
              <Image
                src="/hero-leased-line.jpg"
                alt="Licensed ISP optical data centre and enterprise infrastructure"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-brand-navy/25"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-[8px] bg-navy-80 border border-white/25 text-white text-xs font-medium uppercase tracking-wider mb-2.5">
                  Tamil Nadu Circle
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-medium mb-1.5">
                  Licensed ISP serving Tamil Nadu
                </h3>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                  Authorised Internet Service Provider operating compliant,
                  high-availability optical ring infrastructure.
                </p>
              </div>
            </article>
          </AppleStaggerItem>

          {/* Bento Card 4: Bottom-Left Rounded Image Card (5 cols) */}
          <AppleStaggerItem className="md:col-span-5 flex">
            <article
              data-apple-manual="true"
              className="relative w-full rounded-[24px] overflow-hidden border border-white/15 min-h-[250px] p-7 flex flex-col justify-end group"
            >
              <Image
                src="/hero-sme.jpg"
                alt="Local Thiruvallur customer support and field engineering team"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-[8px] bg-brand-red text-white text-xs font-medium uppercase tracking-wider mb-2.5">
                  24/7 NOC &amp; Field Desk
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-medium mb-1.5">
                  24/7 support
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  Direct access to our local Thiruvallur network operations team
                  round the clock—no endless automated menus.
                </p>
              </div>
            </article>
          </AppleStaggerItem>

          {/* Bento Card 5: Bottom-Right Wide Service Collage Card (7 cols) */}
          <AppleStaggerItem className="md:col-span-7 flex">
            <article
              data-apple-manual="true"
              className="w-full rounded-[24px] bg-navy-80 border border-white/15 p-7 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="max-w-md">
                <span className="inline-block px-3 py-1 rounded-[8px] bg-brand-navy border border-white/25 text-white text-xs font-medium uppercase tracking-wider mb-3">
                  1 to 2 Year Price Lock
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-medium mb-2">
                  One local partner for Home, SME, Leased Line &amp; CCTV
                </h3>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-5">
                  Protected monthly tariffs starting at ₹650/month with unlimited
                  data and dedicated local technicians in Thiruvallur.
                </p>
                <Link href="#contact" className="btn-pill btn-primary-red">
                  <span>Check Availability</span>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Mini Rounded Image Collage of SASH Services */}
              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto shrink-0">
                <div className="rounded-[16px] bg-brand-navy border border-white/10 p-3.5 flex flex-col items-center justify-center w-full sm:w-28 h-24">
                  <Image
                    src="/Service/Leased Line.webp"
                    alt="Leased Line"
                    width={44}
                    height={44}
                    className="w-11 h-11 object-contain mb-1.5"
                  />
                  <span className="text-[11px] font-medium text-white/90">
                    Leased Line
                  </span>
                </div>
                <div className="rounded-[16px] bg-brand-navy border border-white/10 p-3.5 flex flex-col items-center justify-center w-full sm:w-28 h-24">
                  <Image
                    src="/Service/SME Internet.webp"
                    alt="SME Internet"
                    width={44}
                    height={44}
                    className="w-11 h-11 object-contain mb-1.5"
                  />
                  <span className="text-[11px] font-medium text-white/90">
                    SME Fibre
                  </span>
                </div>
                <div className="rounded-[16px] bg-brand-navy border border-white/10 p-3.5 flex flex-col items-center justify-center w-full sm:w-28 h-24">
                  <Image
                    src="/Service/CCTV.webp"
                    alt="CCTV Surveillance"
                    width={44}
                    height={44}
                    className="w-11 h-11 object-contain mb-1.5"
                  />
                  <span className="text-[11px] font-medium text-white/90">
                    HD CCTV
                  </span>
                </div>
                <div className="rounded-[16px] bg-brand-navy border border-white/10 p-3.5 flex flex-col items-center justify-center w-full sm:w-28 h-24">
                  <Image
                    src="/Service/Intranet.webp"
                    alt="Intranet Solutions"
                    width={44}
                    height={44}
                    className="w-11 h-11 object-contain mb-1.5"
                  />
                  <span className="text-[11px] font-medium text-white/90">
                    Intranet
                  </span>
                </div>
              </div>
            </article>
          </AppleStaggerItem>
        </AppleStagger>
      </div>
    </section>
  );
}
