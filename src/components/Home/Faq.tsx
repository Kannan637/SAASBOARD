"use client";

import React, { useState } from "react";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
} from "@/components/ui/apple-scroll";

export interface FaqItem {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: "Is installation free?",
    answer:
      "Yes. Standard FTTH fibre installation and setup are completely free on your first SASH Broadband connection across our serviceable areas in Thiruvallur and Tamil Nadu.",
  },
  {
    question: "What speeds are available?",
    answer:
      "Our home broadband plans start at 50 Mbps (Personal Pack) and 100 Mbps (Family Pack), with high-speed fibre tiers scaling up to 1 Gbps depending on your requirements and location feasibility.",
  },
  {
    question: "Is the data unlimited?",
    answer:
      "Yes. All SASH Broadband home and business plans come with truly unlimited monthly data and unlimited bandwidth—so you never have to worry about sudden speed throttling mid-month.",
  },
  {
    question: "Do you offer 24/7 support?",
    answer:
      "Yes. While our Jaya Nagar, Thiruvallur office counter is open Monday to Saturday from 9:00 AM to 6:00 PM, existing SASH Broadband customers receive 24/7 technical support for line and network assistance.",
  },
  {
    question: "How does the price lock work?",
    answer:
      "Your monthly plan tariff stays protected from price hikes for the duration of your plan's price-lock period: 1 year on the Personal Pack (₹650/month), 2 years on the Family Pack (₹799/month), and an unlimited price lock on the Corporate Pack (₹1,499/month).",
  },
  {
    question: "Do you provide leased lines?",
    answer:
      "Yes. We provide dedicated 1:1 symmetrical Internet Leased Lines (ILL), SME broadband, private multi-branch intranet solutions, and commercial CCTV surveillance for businesses across Tamil Nadu.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      data-apple-manual="true"
      aria-labelledby="faq-heading"
      className="bg-transparent text-brand-navy section-padding"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-sash max-w-4xl">
        <AppleReveal className="text-center max-w-2xl mx-auto flex flex-col items-center mb-12 sm:mb-16 lg:mb-20">
          <p className="eyebrow-label text-brand-red mb-3.5">
            Common Questions
          </p>
          <h2 id="faq-heading" className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5">
            Frequently asked questions
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
            Everything you need to know about SASH Broadband plans, installation,
            and enterprise services in Tamil Nadu.
          </p>
        </AppleReveal>

        <AppleStagger className="space-y-4 sm:space-y-4.5">
          {HOMEPAGE_FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <AppleStaggerItem key={item.question}>
                <div
                  className={`rounded-[22px] bg-white border overflow-hidden transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
                    isOpen ? "border-brand-red/35" : "border-black/[0.06]"
                  }`}
                >
                  <button
                    type="button"
                    id={`faq-question-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    onClick={() => handleToggle(idx)}
                    className={`w-full text-left cursor-pointer px-6 sm:px-7 py-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base tracking-normal transition-colors min-h-[56px] ${
                      isOpen
                        ? "text-brand-red"
                        : "text-brand-navy hover:text-brand-red"
                    }`}
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-brand-red text-white"
                          : "bg-neutral-100 text-brand-navy"
                      }`}
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-7 pb-6 pt-2 text-neutral-600 text-sm font-normal leading-relaxed border-t border-neutral-100/80">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AppleStaggerItem>
            );
          })}
        </AppleStagger>
      </div>
    </section>
  );
}

