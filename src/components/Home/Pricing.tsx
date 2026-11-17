"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
} from "@/components/ui/apple-scroll";

export interface BroadbandPlan {
  id: string;
  name: string;
  speed: string;
  speedNote?: string;
  price: string;
  period: string;
  featured: boolean;
  badge?: string;
  interestValue: string;
  description: string;
  features: string[];
}

export const BROADBAND_PLANS: BroadbandPlan[] = [
  {
    id: "personal-pack",
    name: "Personal Pack",
    speed: "50 Mbps",
    price: "₹650",
    period: "per month",
    featured: false,
    interestValue: "Home broadband",
    description:
      "Ideal for everyday browsing, HD streaming, online classes, and working from home.",
    features: [
      "50 Mbps symmetrical fibre speed",
      "Free installation",
      "Unlimited data",
      "Unlimited bandwidth",
      "1-year price lock",
    ],
  },
  {
    id: "family-pack",
    name: "Family Pack",
    speed: "100 Mbps",
    price: "₹799",
    period: "per month",
    featured: true,
    badge: "Most popular",
    interestValue: "Home broadband",
    description:
      "Built for multi-device households with 4K TV streaming, video calls, and low-latency gaming.",
    features: [
      "100 Mbps symmetrical fibre speed",
      "Free installation",
      "Unlimited data",
      "Unlimited bandwidth",
      "2-year price lock",
    ],
  },
  {
    id: "corporate-pack",
    name: "Corporate Pack",
    speed: "Speed: To be confirmed",
    speedNote: "Bandwidth tier confirmed upon technical feasibility check",
    price: "₹1,499",
    period: "per month",
    featured: false,
    interestValue: "Business or SME",
    description:
      "Priority routing and dedicated stability for offices, retail outlets, and commercial teams.",
    features: [
      "Speed tier to be confirmed by SASH engineering",
      "Free installation",
      "Unlimited data",
      "Unlimited bandwidth",
      "Unlimited price lock",
    ],
  },
];

export default function Pricing() {
  const router = useRouter();

  const handleSelectPlan = (plan: BroadbandPlan) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sash:select-plan", {
          detail: {
            planName: plan.name,
            price: plan.price,
            speed: plan.speed,
            interest: plan.interestValue,
          },
        })
      );
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(
          `/contact?plan=${encodeURIComponent(plan.name)}&interest=${encodeURIComponent(plan.interestValue)}`
        );
      }
    }
  };

  return (
    <section
      id="plans"
      data-apple-manual="true"
      aria-labelledby="pricing-heading"
      className="bg-white text-brand-navy section-padding"
    >
      <div className="container-sash">
        {/* Section Header */}
        <AppleReveal className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <p className="eyebrow-label text-brand-red mb-3">
            Transparent Fibre Tariffs
          </p>
          <h2 id="pricing-heading" className="text-brand-navy mb-3 font-semibold text-2xl sm:text-3xl lg:text-[32px] tracking-normal leading-[1.2]">
            Choose your broadband plan
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
            Simple monthly pricing with zero data caps, free setup, and guaranteed
            price protection across Thiruvallur and Tamil Nadu.
          </p>
        </AppleReveal>

        {/* Three Cards in a Row on Desktop, Stacked on Mobile */}
        <AppleStagger className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {BROADBAND_PLANS.map((plan) => (
            <AppleStaggerItem
              key={plan.id}
              className="flex"
            >
              <article
                data-apple-manual="true"
                aria-label={`${plan.name} - ${plan.price} ${plan.period}`}
                className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between relative w-full transition-transform duration-300 hover:-translate-y-1.5 shadow-[0px_2px_3px_0px_rgba(5,5,6,0.05)] hover:shadow-[0px_8px_24px_rgba(5,5,6,0.08)] ${
                  plan.featured
                    ? "bg-brand-navy text-white border-2 border-brand-red/80 shadow-[0_18px_45px_rgba(1,13,59,0.22)]"
                    : "bg-white text-brand-navy border border-neutral-100"
                }`}
              >
                {plan.featured && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
                  >
                    <Image
                      src="/Footer/footer-9-sash-bg.svg"
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-brand-navy/55 to-black/25" />
                  </div>
                )}

                {plan.featured && plan.badge && (
                  <div className="absolute -top-3 left-6 z-20">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-brand-red text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Plan Title & Speed Pill */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3
                      className={`font-semibold text-xl sm:text-2xl tracking-normal ${
                        plan.featured ? "text-white" : "text-brand-navy"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                        plan.featured
                          ? "bg-white/15 text-white border border-white/25 backdrop-blur-xs"
                          : "bg-neutral-100 text-brand-navy"
                      }`}
                    >
                      {plan.speed}
                    </span>
                  </div>

                  <p
                    className={`text-sm mb-5 min-h-[40px] font-normal leading-relaxed ${
                      plan.featured ? "text-white/85" : "text-neutral-600"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div
                    className={`pb-5 mb-5 border-b ${
                      plan.featured ? "border-white/20" : "border-neutral-100"
                    }`}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-3xl sm:text-4xl font-semibold tracking-tight ${
                          plan.featured ? "text-white" : "text-brand-navy"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`font-normal text-sm sm:text-base ${
                          plan.featured ? "text-white/80" : "text-neutral-600"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                    {plan.speedNote && (
                      <p
                        className={`text-xs font-medium mt-2 px-2.5 py-1 rounded-lg ${
                          plan.featured
                            ? "text-white bg-white/15"
                            : "text-brand-red bg-red-10"
                        }`}
                      >
                        Note: {plan.speedNote}
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-6" aria-label={`${plan.name} features`}>
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 text-sm font-normal ${
                          plan.featured ? "text-white" : "text-brand-navy"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.featured ? "text-white" : "text-brand-red"
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  className={`relative z-10 btn-pill btn-primary-red w-full h-10 text-sm font-medium cursor-pointer ${
                    plan.featured
                      ? "shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/25"
                      : ""
                  }`}
                >
                  <span>Order this plan</span>
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
              </article>
            </AppleStaggerItem>
          ))}
        </AppleStagger>

        {/* Required Pricing Footnote */}
        <AppleReveal delay={0.15}>
          <p className="text-center text-sm text-neutral-600 mt-8 font-normal">
            Prices in INR per month, taxes applicable, availability depends on
            address.
          </p>
        </AppleReveal>
      </div>
    </section>
  );
}

