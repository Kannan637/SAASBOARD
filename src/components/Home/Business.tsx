"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppleReveal } from "@/components/ui/apple-scroll";

const BUSINESS_CHECKLIST = [
  "Uninterrupted secure communications",
  "Scalable SME plans",
  "Private intranet",
  "CCTV for premises",
];

interface MapLogoPin {
  id: string;
  logoSrc: string;
  alt: string;
  left: string;
  top: string;
  sizeClass: string;
  imgSize: number;
}

const MAP_LOGO_PINS: MapLogoPin[] = [
  {
    id: "pin-chennai-thiruvallur",
    logoSrc: "/Marquee/1.jpg",
    alt: "Enterprise Partner Hub Thiruvallur & Chennai",
    left: "76%",
    top: "14%",
    sizeClass: "w-16 h-16 sm:w-18 sm:h-18",
    imgSize: 52,
  },
  {
    id: "pin-vellore",
    logoSrc: "/Marquee/3.jpg",
    alt: "Enterprise Partner Hub Vellore",
    left: "54%",
    top: "22%",
    sizeClass: "w-11 h-11 sm:w-12 sm:h-12",
    imgSize: 34,
  },
  {
    id: "pin-salem",
    logoSrc: "/Marquee/5.jpg",
    alt: "Enterprise Partner Hub Salem",
    left: "42%",
    top: "38%",
    sizeClass: "w-10 h-10 sm:w-11 sm:h-11",
    imgSize: 28,
  },
  {
    id: "pin-coimbatore",
    logoSrc: "/Marquee/7.jpg",
    alt: "Enterprise Partner Hub Coimbatore",
    left: "26%",
    top: "52%",
    sizeClass: "w-13 h-13 sm:w-15 sm:h-15",
    imgSize: 42,
  },
  {
    id: "pin-trichy",
    logoSrc: "/Marquee/12.jpg",
    alt: "Enterprise Partner Hub Tiruchirappalli",
    left: "58%",
    top: "48%",
    sizeClass: "w-12 h-12 sm:w-13 sm:h-13",
    imgSize: 36,
  },
  {
    id: "pin-madurai",
    logoSrc: "/Marquee/18.jpg",
    alt: "Enterprise Partner Hub Madurai",
    left: "46%",
    top: "68%",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16",
    imgSize: 44,
  },
  {
    id: "pin-tirunelveli",
    logoSrc: "/Marquee/24.jpg",
    alt: "Enterprise Partner Hub Tirunelveli",
    left: "38%",
    top: "84%",
    sizeClass: "w-11 h-11 sm:w-12 sm:h-12",
    imgSize: 32,
  },
];

export default function Business() {
  const router = useRouter();

  const handleBusinessQuote = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sash:select-plan", {
          detail: {
            planName: "Business / Enterprise Quote",
            price: "Custom",
            speed: "Custom SME / Leased Line",
            interest: "Business or SME",
          },
        })
      );
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/contact?interest=Business%20or%20SME");
      }
    }
  };

  return (
    <section
      data-apple-manual="true"
      aria-labelledby="business-heading"
      className="bg-white text-brand-navy section-padding overflow-hidden"
    >
      <div className="container-sash">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text & Checklist */}
          <AppleReveal className="lg:col-span-6 flex flex-col justify-center">
            <p className="eyebrow-label text-brand-red mb-3">
              For Enterprises &amp; SMEs
            </p>
            <h2
              id="business-heading"
              className="text-brand-navy mb-4 font-semibold text-2xl sm:text-3xl lg:text-[32px] tracking-normal leading-[1.2]"
            >
              Enterprise-grade connectivity for Tamil Nadu businesses
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mb-6 font-normal leading-relaxed">
              Keep your billing systems, cloud ERP, multi-branch operations, and
              IP surveillance online without interruption. We design custom fibre
              solutions for offices, factories, schools, clinics, and retail
              chains.
            </p>

            <ul
              className="space-y-3 mb-8"
              aria-label="Business connectivity capabilities"
            >
              {BUSINESS_CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-brand-navy font-medium text-sm sm:text-base"
                >
                  <span className="w-6 h-6 rounded-full bg-red-10 text-brand-red flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <button
                type="button"
                onClick={handleBusinessQuote}
                className="btn-pill btn-primary-red h-10 text-sm font-medium cursor-pointer rounded-lg inline-flex items-center gap-2"
              >
                <span>Get a business quote</span>
                <svg
                  className="w-4 h-4"
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
              </button>
            </div>
          </AppleReveal>

          {/* Right Column: Tamil Nadu Halftone Silhouette Map with 7 Static Logo Circles */}
          <AppleReveal className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-square flex items-center justify-center select-none">
              {/* Soft Radial Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(222,3,2,0.06)_0%,rgba(1,13,59,0.03)_50%,transparent_75%)] blur-2xl"
              />

              {/* Tamil Nadu Halftone Silhouette Map */}
              <div className="relative w-full h-full">
                <Image
                  src="/map/Tamil Nadu Halftone Silhouette.png"
                  alt="Tamil Nadu Halftone Silhouette Map showing SASH Broadband network reach"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain select-none pointer-events-none drop-shadow-[0px_4px_12px_rgba(0,0,0,0.05)]"
                  priority
                />

                {/* 7 Static Client/Partner Logo Circles in Different Sizes */}
                {MAP_LOGO_PINS.map((pin) => (
                  <div
                    key={pin.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: pin.left, top: pin.top }}
                  >
                    <div
                      className={`relative rounded-full bg-white border border-brand-navy/10 shadow-[0px_4px_16px_rgba(1,13,59,0.12)] p-1.5 sm:p-2 flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:shadow-[0px_8px_24px_rgba(222,3,2,0.18)] hover:border-brand-red/40 ${pin.sizeClass}`}
                    >
                      <Image
                        src={pin.logoSrc}
                        alt={pin.alt}
                        width={pin.imgSize}
                        height={pin.imgSize}
                        className="object-contain max-h-full max-w-full rounded-full select-none pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AppleReveal>
        </div>
      </div>
    </section>
  );
}
