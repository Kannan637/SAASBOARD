"use client";

import React from "react";
import { AppleReveal, AppleStagger, AppleStaggerItem } from "@/components/ui/apple-scroll";

export interface ImpactCardData {
  id: string;
  label: string;
  number: string;
  subtext?: string;
}

export const IMPACT_METRICS: ImpactCardData[] = [
  {
    id: "connections",
    label: "Homes & Enterprises Connected",
    number: "10k+",
    subtext: "Across Thiruvallur & Tamil Nadu",
  },
  {
    id: "uptime",
    label: "Guaranteed Network Uptime SLA",
    number: "99.9%",
    subtext: "Backed by enterprise NOC",
  },
  {
    id: "speed",
    label: "Peak Optical Speed Capability",
    number: "1 Gbps",
    subtext: "Symmetrical upload & download",
  },
  {
    id: "response",
    label: "Local Field MTTR Resolution",
    number: "< 15m",
    subtext: "Rapid on-site emergency dispatch",
  },
];

export default function Impact() {
  return (
    <section
      id="impact"
      data-apple-manual="true"
      aria-labelledby="impact-heading"
      className="w-full bg-white text-brand-navy pt-16 sm:pt-24 lg:pt-[175px] pb-16 sm:pb-24 lg:pb-32 font-sans antialiased overflow-hidden"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 54px font size, 500-600 weight, 65px line height, 105px bottom spacing */}
        <AppleReveal className="max-w-4xl mx-auto text-center mb-10 sm:mb-16 lg:mb-[105px]">
          <p className="eyebrow-label text-brand-red mb-3.5">
            OUR IMPACT
          </p>
          <h2
            id="impact-heading"
            className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[54px] leading-tight lg:leading-[65px] tracking-tight text-balance"
          >
            Empowering Tamil Nadu with optical performance at scale
          </h2>
        </AppleReveal>

        {/* 4 Cards Grid: 12px gap, 278px width, 417px height, 34px padding, 13px border-radius */}
        <AppleStagger className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-[12px]">
          {IMPACT_METRICS.map((card) => (
            <AppleStaggerItem
              key={card.id}
              className="w-full sm:w-[calc(50%-6px)] lg:w-[278px] lg:min-w-[278px] lg:max-w-[278px] shrink-0"
            >
              <div className="relative w-full h-[360px] sm:h-[390px] lg:h-[417px] p-6 sm:p-7 lg:p-[34px] rounded-[13px] border border-black/[0.08] bg-neutral-50/70 hover:bg-white hover:border-brand-red/35 hover:shadow-[0_16px_36px_rgba(5,5,6,0.06)] transition-all duration-300 flex flex-col justify-between select-none group">
                {/* Top: Card Label (24px font size, 400 weight, 30px line height) */}
                <div className="w-full">
                  <h3 className="text-brand-navy text-lg sm:text-xl lg:text-[24px] font-normal leading-snug lg:leading-[30px] tracking-normal">
                    {card.label}
                  </h3>
                </div>

                {/* Vertical Separation: Label-to-number vertical gap approximately 160px */}
                <div aria-hidden="true" className="flex-1 min-h-8 sm:min-h-12 lg:min-h-[160px]" />

                {/* Bottom: Statistics Number (68px font size, 600-700 weight, 78px line height) */}
                <div className="w-full mt-auto">
                  <p className="text-brand-navy group-hover:text-brand-red text-4xl sm:text-5xl lg:text-[68px] font-bold leading-none lg:leading-[78px] tracking-tight transition-colors">
                    {card.number}
                  </p>
                  {card.subtext && (
                    <p className="text-neutral-500 text-xs sm:text-[13px] font-medium mt-2 tracking-normal">
                      {card.subtext}
                    </p>
                  )}
                </div>
              </div>
            </AppleStaggerItem>
          ))}
        </AppleStagger>
      </div>
    </section>
  );
}
