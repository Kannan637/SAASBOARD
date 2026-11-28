import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Pricing from "@/components/Home/Pricing";
import Testimonial from "@/components/Home/Testimonial";
import Faq from "@/components/Home/Faq";
import Contactus from "@/components/Home/Contactus";
import { AppleScrollScale } from "@/components/ui/apple-scroll";
import {
  ServiceDeliverablesSection,
  ServiceHero,
  SingleClientMarquee,
  type ServiceDeliverableItem,
} from "@/components/Service/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Unlimited Fibre Broadband Plans in Tamil Nadu",
  description:
    "Compare SASH Broadband FTTH home internet plans starting at ₹650/month. Speeds up to 1 Gbps, unlimited data, free installation, and price lock in Tamil Nadu.",
  alternates: {
    canonical: "/broadband-services",
    languages: { "en-IN": "/broadband-services" },
  },
};

const INSTALLATION_STEPS: ServiceDeliverableItem[] = [
  {
    title: "Address Feasibility Check",
    tag: "Step 01",
    description:
      "Share your street address or pincode in Thiruvallur or Tamil Nadu via our enquiry form or WhatsApp.",
    points: [
      "Doorstep GPS optical route verification across Thiruvallur",
      "Immediate FTTH port availability check on our local GPON OLT",
      "Zero-commitment enquiry with transparent pricing",
      "Fast feasibility confirmation within 2 to 4 business hours",
    ],
  },
  {
    title: "Select Your Fibre Plan",
    tag: "Step 02",
    description:
      "Choose between our Personal Pack (50 Mbps), Family Pack (100 Mbps), or custom high-speed tiers up to 1 Gbps.",
    points: [
      "Flexible tariffs starting at just ₹650/month",
      "Guaranteed price-lock protection up to 2 full years",
      "100% unlimited data with zero peak-time speed throttling",
      "Seamless upgrade options as family bandwidth needs grow",
    ],
  },
  {
    title: "Free Fibre Drop & Router Setup",
    tag: "Step 03",
    description:
      "Our local technicians run an optical fibre cable to your home and configure your Wi-Fi router at zero setup cost.",
    points: [
      "Dedicated single-mode armored optical drop to your premise",
      "Complimentary Gigabit dual-band (2.4 GHz + 5 GHz) Wi-Fi router",
      "Neat outdoor casing & precision fusion optical splicing",
      "Pre-configured WPA3 wireless encryption for maximum security",
    ],
  },
  {
    title: "Instant Activation & Speed Test",
    tag: "Step 04",
    description:
      "We verify signal strength and speed across your devices before handing over your active connection.",
    points: [
      "On-site live technician speed test on customer devices",
      "Symmetrical 1:1 gigabit download and upload performance check",
      "Zero-charge installation sign-off with customer copy",
      "Instant live high-speed internet browsing right away",
    ],
  },
];

export default function BroadbandServicesPage() {
  return (
    <>
      {/* Dedicated Service Hero: Matching Landing Page Hero Style */}
      <ServiceHero
        breadcrumbLabel="Broadband Services"
        eyebrow="HIGH-UPTIME BUSINESS BROADBAND"
        titlePrefix="Faster speeds."
        titleHighlight="Just for you."
        description="That's the SASH Fibre Broadband advantage — unlimited data, free installation, and speeds up to 1 Gbps across Thiruvallur & Tamil Nadu."
        ctaText="Check Availability"
        ctaHref="#contact"
        secondaryCtaText="View All Plans"
        secondaryCtaHref="#plans"
        imageSrc="/Hero/Hand Holding Broadband Dashboard Smartphone.png"
        imageAlt="SASH Broadband ultra-speed network dashboard on smartphone"
        pattern="glyph"
      />

      {/* Single-Row Client Logo Marquee */}
      <SingleClientMarquee />

      {/* Plans & Pricing */}
      <Pricing />

      {/* 4-Step Installation Process */}
      <ServiceDeliverablesSection
        eyebrow="Simple Onboarding"
        heading="How our 4-step free installation works"
        subtitle="Fast, clean optical fibre installation by our local Tiruvallur engineering team."
        items={INSTALLATION_STEPS}
      />

      {/* OTT and IPTV Anchor Section */}
      <section
        id="ott-iptv"
        data-apple-manual="true"
        aria-label="OTT and IPTV Entertainment Ready"
        className="bg-white py-12 sm:py-16 md:py-20"
      >
        <div className="container-sash">
          <AppleScrollScale>
            <div className="banner-sash relative overflow-hidden rounded-[32px] bg-brand-red text-white p-8 sm:p-12 lg:p-14 min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 shadow-[0_16px_48px_rgba(222,3,2,0.22)]">
              {/* Subtle ambient lighting behind content & TV */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-1/4 bottom-0 w-[360px] h-[200px] rounded-full bg-black/20 blur-2xl"
              />

              {/* Left Column: Heading, description, and dual CTA buttons */}
              <div className="relative z-10 max-w-xl flex flex-col items-start gap-6">
                <div>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold uppercase tracking-wider mb-3.5">
                    OTT &amp; IPTV Ready
                  </span>
                  <h2 className="text-white mb-3 font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-normal leading-tight">
                    Ready for 4K Smart TVs, OTT Apps, and Digital IPTV
                  </h2>
                  <p className="text-white/95 text-base md:text-lg font-normal leading-relaxed">
                    Our low-latency optical fibre network powers smooth 4K HDR streaming across Netflix, Prime Video, Disney+ Hotstar, SonyLIV, Zee5, and IPTV set-top boxes with zero frame drops or buffering.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                  <Link
                    href="#contact"
                    className="group/cta btn-pill bg-linear-to-b from-brand-navy to-navy-80 text-white outline-2 -outline-offset-2 outline-white/20 hover:from-navy-80 hover:to-navy-80 w-full sm:w-auto font-medium"
                  >
                    <span>Enquire about OTT &amp; IPTV</span>
                    <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5" />
                  </Link>
                  <a
                    href="https://wa.me/919003009353?text=Hi%20SASH%20Broadband%2C%20I%20would%20like%20to%20know%20more%20about%204K%20Smart%20TV%20and%20OTT%20IPTV%20plans."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/wa btn-pill bg-white text-brand-navy hover:bg-neutral-50 border border-white w-full sm:w-auto font-semibold flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
                  >
                    <svg
                      className="w-5 h-5 text-[#25D366] fill-current shrink-0"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M16.004 3.2c-7.068 0-12.8 5.732-12.8 12.8 0 2.257.589 4.46 1.708 6.404L3.092 28.8l6.556-1.72c1.883 1.028 4.004 1.57 6.356 1.57h.006c7.066 0 12.796-5.732 12.796-12.8 0-3.42-1.332-6.636-3.75-9.054C22.638 4.532 19.422 3.2 16.004 3.2zm0 23.29h-.005c-1.994 0-3.95-.536-5.656-1.548l-.406-.24-4.212 1.105 1.124-4.106-.264-.42c-1.112-1.768-1.7-3.812-1.7-5.914 0-5.876 4.782-10.658 10.664-10.658 2.848 0 5.524 1.11 7.538 3.124 2.012 2.014 3.12 4.692 3.12 7.54 0 5.878-4.782 10.66-10.203 10.66zm5.848-7.984c-.32-.16-1.896-.936-2.19-1.042-.294-.108-.508-.16-.722.16-.214.32-.828 1.042-1.016 1.256-.186.214-.374.24-.694.08-.32-.16-1.352-.498-2.576-1.59-.952-.848-1.594-1.898-1.782-2.218-.186-.32-.02-.494.14-.654.144-.144.32-.374.48-.562.16-.186.214-.32.32-.534.108-.214.054-.4-.026-.56-.08-.16-.722-1.738-.988-2.38-.26-.624-.526-.54-.722-.55-.186-.008-.4-.01-.614-.01-.214 0-.562.08-.856.4-.294.32-1.122 1.096-1.122 2.674s1.15 3.102 1.31 3.316c.16.214 2.262 3.454 5.48 4.844.766.33 1.364.528 1.83.676.768.244 1.468.21 2.02.128.616-.092 1.896-.776 2.164-1.524.268-.748.268-1.39.188-1.524-.08-.134-.294-.214-.614-.374z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                    <ChevronRight className="size-4 stroke-[2.5] text-brand-navy/60 transition-transform duration-200 ease-out group-hover/wa:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: 4K Smart TV with OTT streaming apps & digital IPTV */}
              <div className="relative z-10 w-full lg:w-auto lg:shrink-0 flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] transition-transform duration-300 hover:scale-[1.02]">
                  <Image
                    src="/Service/smart-tv-ott.png"
                    alt="4K Smart TV displaying high-bitrate OTT streaming apps & digital IPTV"
                    width={736}
                    height={506}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 560px"
                    className="relative z-10 w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </AppleScrollScale>
        </div>
      </section>

      <Testimonial />
      <Faq />
      <Contactus defaultInterest="Home broadband" />
    </>
  );
}

