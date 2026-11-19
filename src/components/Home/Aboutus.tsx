"use client";

import React from "react";
import { AppleReveal } from "@/components/ui/apple-scroll";

export default function Aboutus() {
    return (
        <section
            id="about"
            data-apple-manual="true"
            aria-labelledby="about-heading"
            className="bg-white text-brand-navy section-padding overflow-hidden"
        >
            <div className="container-sash">
                <AppleReveal className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-10 lg:col-start-2 flex flex-col items-center text-center">
                        <p className="eyebrow-label text-brand-red mb-3.5">
                            About Us
                        </p>
                        <h2
                            id="about-heading"
                            className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-4"
                        >
                            About{" "}
                            <span className="text-brand-red">SASH Broadband</span>
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
        </section>
    );
}
