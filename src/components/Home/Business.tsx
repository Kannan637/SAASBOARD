"use client";

import React from "react";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
  AppleScrollScale,
} from "@/components/ui/apple-scroll";

const BUSINESS_CHECKLIST = [
  "Uninterrupted secure communications",
  "Scalable SME plans",
  "Private intranet",
  "CCTV for premises",
];

const ENTERPRISE_STATS = [
  {
    value: "1:1",
    label: "Dedicated Leased Line Bandwidth Option",
  },
  {
    value: "24/7",
    label: "Local Engineer Support & Network Monitoring",
  },
  {
    value: "100%",
    label: "Optical Fibre Ring Topology in Tamil Nadu",
  },
  {
    value: "₹0",
    label: "Standard Setup Fee on Business Broadband Plans",
  },
];

export default function Business() {
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
        window.location.href = "/contact?interest=Business%20or%20SME";
      }
    }
  };

  return (
    <section
      data-apple-manual="true"
      aria-labelledby="business-heading"
      className="bg-white text-brand-navy section-padding"
    >
      <div className="container-sash">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Checklist */}
          <AppleReveal className="lg:col-span-6">
            <p className="eyebrow-label text-brand-red mb-3">
              For Enterprises &amp; SMEs
            </p>
            <h2 id="business-heading" className="text-brand-navy mb-5">
              Enterprise-grade connectivity for Tamil Nadu businesses
            </h2>
            <p className="text-neutral-600 text-base md:text-lg mb-8">
              Keep your billing systems, cloud ERP, multi-branch operations, and
              IP surveillance online without interruption. We design custom fibre
              solutions for offices, factories, schools, clinics, and retail
              chains.
            </p>

            <ul
              className="space-y-4 mb-9"
              aria-label="Business connectivity capabilities"
            >
              {BUSINESS_CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3.5 text-brand-navy font-bold text-lg"
                >
                  <span className="w-7 h-7 rounded-full bg-red-10 text-brand-red flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4"
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

            <button
              type="button"
              onClick={handleBusinessQuote}
              className="btn-pill btn-primary-red text-base cursor-pointer"
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
          </AppleReveal>

          {/* Right Column: Navy Stat Panel */}
          <AppleScrollScale className="lg:col-span-6">
            <div className="banner-sash bg-brand-navy text-white p-8 sm:p-10 border border-navy-80">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-navy-80">
                <div>
                  <p className="eyebrow-label text-white/80">
                    Commercial Network Desk
                  </p>
                  <h3 className="text-white text-2xl font-extrabold mt-1">
                    Built for High Uptime
                  </h3>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider">
                  SLA Backed
                </span>
              </div>

              <AppleStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ENTERPRISE_STATS.map((stat) => (
                  <AppleStaggerItem
                    key={stat.label}
                    className="rounded-[14px] bg-navy-80 border border-white/15 p-5"
                  >
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm text-white/85 font-medium mt-2">
                      {stat.label}
                    </p>
                  </AppleStaggerItem>
                ))}
              </AppleStagger>

              <div className="mt-6 pt-5 border-t border-navy-80 flex flex-wrap items-center justify-between gap-3 text-sm text-white/90">
                <span>Direct Enterprise Helpline:</span>
                <a
                  href="tel:+919003009353"
                  className="font-extrabold text-white underline hover:no-underline"
                >
                  +91 90030 09353
                </a>
              </div>
            </div>
          </AppleScrollScale>
        </div>
      </div>
    </section>
  );
}

