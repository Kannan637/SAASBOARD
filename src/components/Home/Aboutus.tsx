"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ClientMapIcon {
  id: string;
  src: string;
  alt: string;
  className: string;
  shape: "circle" | "pill" | "large-circle";
}

const CLIENT_MAP_ICONS: ClientMapIcon[] = [
  {
    id: "client-1",
    src: "/Marquee/1.jpg",
    alt: "Client Partner 1",
    className: "top-[16%] right-[8%] sm:right-[14%]",
    shape: "pill",
  },
  {
    id: "client-2",
    src: "/Marquee/2.jpg",
    alt: "Client Partner 2",
    className: "top-[22%] left-[44%] sm:left-[46%]",
    shape: "circle",
  },
  {
    id: "client-3",
    src: "/Marquee/3.jpg",
    alt: "Client Partner 3",
    className: "top-[38%] left-[14%] sm:left-[18%]",
    shape: "large-circle",
  },
  {
    id: "client-4",
    src: "/Marquee/4.jpg",
    alt: "Client Partner 4",
    className: "top-[46%] left-[42%]",
    shape: "pill",
  },
  {
    id: "client-5",
    src: "/Marquee/5.jpg",
    alt: "Client Partner 5",
    className: "top-[48%] right-[10%] sm:right-[16%]",
    shape: "circle",
  },
  {
    id: "client-6",
    src: "/Marquee/6.jpg",
    alt: "Client Partner 6",
    className: "top-[64%] left-[46%]",
    shape: "pill",
  },
  {
    id: "client-7",
    src: "/Marquee/7.jpg",
    alt: "Client Partner 7",
    className: "top-[70%] left-[24%] sm:left-[28%]",
    shape: "circle",
  },
  {
    id: "client-8",
    src: "/Marquee/8.jpg",
    alt: "Client Partner 8",
    className: "top-[82%] left-[42%] sm:left-[46%]",
    shape: "pill",
  },
];

export default function Aboutus() {
  return (
    <section
      id="about"
      data-apple-manual="true"
      aria-labelledby="about-heading"
      className="bg-white text-brand-navy section-padding overflow-hidden"
    >
      {/* Increased Width Container (Max 1440px / 1520px on 2xl screens) matching Hero section */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Center Container Card with Visible Rounded Border and Generous Breathing Space */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white border border-neutral-200 px-6 sm:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
            {/* Left Column (6 of 12 grid): Typographic & Value Proposition Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10 py-4 lg:py-8">
              {/* Eyebrow Badge: ABOUT US */}
              <span className="eyebrow-label mb-5 sm:mb-6">
                ABOUT US
              </span>

              {/* Headline */}
              <h2
                id="about-heading"
                className="text-brand-navy font-bold text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] tracking-tight leading-[1.12] mb-5 sm:mb-6 text-left"
              >
                Connecting <span className="text-brand-red">Tamil Nadu</span> to high-speed fiber
              </h2>

              {/* Description */}
              <p className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 text-left max-w-xl">
                <strong className="font-semibold text-brand-navy">SASH Broadband Private Limited</strong> is an authorized{" "}
                <strong className="font-semibold text-brand-navy">Class–B Internet Service Provider</strong> operating resilient, high-availability optical ring infrastructure across Tamil Nadu. Delivering next-generation optical telecom, direct Tier-1 peering, and last-mile patching with dedicated 24/7 local engineering support.
              </p>

              {/* KPI Metrics Grid */}
              <div className="grid grid-cols-2 gap-8 sm:gap-12 mb-9 sm:mb-12 w-full max-w-md">
                <div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">100+</p>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1.5">Clients</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">99%</p>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1.5">Success rate</p>
                </div>
              </div>

              {/* CTA Button: Official SASH Brand Red Pill Button */}
              <Link
                href="/#contact"
                className="inline-flex h-11 min-h-[44px] sm:h-12 sm:min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-hover px-6 sm:px-8 text-sm sm:text-base font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-all duration-150 ease-out active:scale-[0.97] group"
              >
                <span>Schedule a feasibility call</span>
                <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right Column (6 of 12 grid): Tamil Nadu Halftone Silhouette Map with Static Client Icons */}
            <div className="lg:col-span-6 relative w-full h-[420px] sm:h-[500px] lg:h-[580px] xl:h-[640px] flex items-center justify-center select-none overflow-hidden">
              {/* Tamil Nadu Halftone Map Background Image */}
              <div className="relative w-full h-full max-w-[480px] max-h-[480px] sm:max-w-[520px] sm:max-h-[520px] lg:max-w-[580px] lg:max-h-[580px] xl:max-w-[620px] xl:max-h-[620px] flex items-center justify-center">
                <Image
                  src="/map/Tamil Nadu Halftone Silhouette.png"
                  alt="Tamil Nadu Halftone Optical Network Coverage Map"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center pointer-events-none select-none opacity-90"
                  priority
                />
              </div>

              {/* Static Client Icons positioned across Tamil Nadu */}
              {CLIENT_MAP_ICONS.map((client) => (
                <div
                  key={client.id}
                  className={`absolute ${client.className} -translate-x-1/2 -translate-y-1/2 z-20`}
                >
                  {client.shape === "pill" ? (
                    <div className="rounded-full bg-white border border-neutral-200 px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer">
                      <div className="relative w-14 sm:w-16 h-6 sm:h-7 flex items-center justify-center">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : client.shape === "large-circle" ? (
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border border-neutral-200 p-2 flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer">
                      <div className="relative w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-neutral-200 p-1.5 flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer">
                      <div className="relative w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
