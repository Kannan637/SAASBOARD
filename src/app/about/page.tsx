import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Radio,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Contactus from "@/components/Home/Contactus";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
} from "@/components/ui/apple-scroll";

export const metadata: Metadata = {
  title: "About SASH Broadband | Licensed Class–B ISP in Tamil Nadu",
  description:
    "Learn about SASH Broadband Private Limited, an authorized Class–B internet service provider based in Thiruvallur delivering pure FTTH optical fibre, dedicated leased lines, and 24/7 engineering support across Tamil Nadu.",
  alternates: {
    canonical: "/about",
    languages: { "en-IN": "/about" },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.sashbroadband.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: "https://www.sashbroadband.com/about",
    },
  ],
};

const companyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SASH Broadband Private Limited",
  url: "https://www.sashbroadband.com/about",
  logo: "https://www.sashbroadband.com/Logo/sash.png",
  description:
    "Licensed Class–B Internet Service Provider operating resilient optical fibre networks across Tamil Nadu with headquarters in Thiruvallur.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jaya Nagar",
    addressLocality: "Thiruvallur",
    addressRegion: "Tamil Nadu",
    postalCode: "602001",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9003009353",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "ta"],
  },
};

const PILLARS = [
  {
    icon: Radio,
    tag: "INFRASTRUCTURE",
    title: "100% Pure Optical FTTH",
    description:
      "We run dedicated single-mode glass optical fibre directly into your premise. No copper drops, no coaxial compression, and zero electromagnetic weather degradation.",
  },
  {
    icon: ShieldCheck,
    tag: "BILLING ETHICS",
    title: "Guaranteed Tariff Price-Lock",
    description:
      "Protected fixed monthly tariffs for 1 to 2 full years. Enjoy genuinely unlimited data with zero speed throttling, zero security deposits, and no hidden hardware charges.",
  },
  {
    icon: Clock,
    tag: "LOCAL TEAM",
    title: "Local NOC & 2-Hour Dispatch",
    description:
      "Our Network Operations Centre and optical fusion technicians operate directly out of Jaya Nagar, Thiruvallur—ensuring rapid doorstep resolution within hours, not days.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companyJsonLd) }}
      />

      {/* 1. Page Hero: Full Width Section with Left Content + Right Image */}
      <section
        data-apple-manual="true"
        aria-labelledby="about-heading"
        className="relative w-full overflow-hidden select-none border-b border-black/[0.06]"
        style={{
          background:
            "linear-gradient(180deg, #00030D 0%, #1754AB 45%, #2A7BE0 70%, #BFE3FF 100%)",
        }}
      >
        {/* Subtle Content Contrast Scrim for Text Readability without altering the gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/15 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/45 lg:via-black/20 lg:to-transparent"
        />

        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full min-h-auto lg:min-h-[540px] grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
            {/* Left Content Column (7 of 12 columns on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-12 sm:py-16 lg:py-20 pr-0 lg:pr-8 z-20">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="text-xs sm:text-sm text-white/70 mb-4 flex items-center justify-center lg:justify-start"
              >
                <ol className="flex items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors underline-offset-4 hover:underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-white/40">
                    /
                  </li>
                  <li aria-current="page" className="text-white font-medium">
                    About Us
                  </li>
                </ol>
              </nav>

              {/* Eyebrow Badge: Solid Red Pill with White Text matching Landing Page Hero Card 1 */}
              <div className="mb-4">
                <span className="inline-flex min-h-6 items-center justify-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1 text-xs leading-none font-medium text-white tracking-wide uppercase">
                  ABOUT SASH BROADBAND
                </span>
              </div>

              {/* Headline: Clean, Crisp White Typography */}
              <h1
                id="about-heading"
                className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-[46px] lg:leading-[54px] tracking-tight mb-4 max-w-2xl"
              >
                Building Tamil Nadu&apos;s optical network from the{" "}
                <span className="text-brand-red">ground up.</span>
              </h1>

              {/* Description */}
              <p className="text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl">
                SASH Broadband Private Limited is an authorised Class–B Internet
                Service Provider headquartered in Jaya Nagar, Thiruvallur. We build
                and operate high-availability optical fibre rings delivering speed,
                continuity, and accountable local support.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                <Link
                  href="#contact"
                  className="group/btn btn-pill bg-brand-red hover:bg-brand-red-hover text-white font-medium text-sm sm:text-base px-6 sm:px-7"
                >
                  <span>Check availability</span>
                  <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-150 group-hover/btn:translate-x-0.5" />
                </Link>
                <Link
                  href="/#plans"
                  className="group/btn2 btn-pill bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-medium text-sm sm:text-base px-6 sm:px-7"
                >
                  <span>View broadband plans</span>
                  <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-150 group-hover/btn2:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Side Column (5 of 12 columns on desktop): Image */}
            <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[360px] lg:h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[500px] flex items-end justify-center lg:justify-end overflow-hidden pt-4 pb-0">
              <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-none h-full flex items-end justify-center lg:justify-end pointer-events-none select-none">
                <Image
                  src="/About Us/Gemini_Generated_Image_ow53egow53egow53.png"
                  alt="SASH Broadband high-availability optical network infrastructure in Tamil Nadu"
                  width={2730}
                  height={1536}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 650px"
                  className="w-full h-auto max-h-[280px] sm:max-h-[360px] lg:max-h-[520px] object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Commitments (3 Distinct, Non-Repeating Pillar Cards) */}
      <section
        data-apple-manual="true"
        aria-labelledby="commitments-heading"
        className="w-full bg-white py-14 sm:py-20 border-b border-black/[0.06]"
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <AppleReveal className="max-w-2xl mb-10 sm:mb-14">
            <span className="eyebrow-label text-brand-red mb-3 inline-block">
              OUR COMMITMENT
            </span>
            <h2
              id="commitments-heading"
              className="text-brand-navy font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.18] mb-3"
            >
              How we do internet differently
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
              We own and manage our optical rings, direct peering, and last-mile
              splicing—giving our customers complete reliability without intermediaries.
            </p>
          </AppleReveal>

          <AppleStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <AppleStaggerItem key={pillar.title}>
                  <div className="h-full flex flex-col justify-between p-7 sm:p-8 rounded-[24px] bg-neutral-50/60 border border-black/[0.06] transition-colors hover:border-brand-red/35">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-[12px] bg-brand-red/10 text-brand-red flex items-center justify-center">
                          <IconComp className="w-5 h-5 stroke-[2.25]" />
                        </div>
                        <span className="font-mono text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                          {pillar.tag}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg sm:text-xl text-brand-navy mb-2.5 tracking-normal">
                        {pillar.title}
                      </h3>
                      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </AppleStaggerItem>
              );
            })}
          </AppleStagger>
        </div>
      </section>

      {/* 3. Authorised Operations & Walk-In Desk */}
      <section
        data-apple-manual="true"
        aria-labelledby="operations-heading"
        className="w-full bg-white py-14 sm:py-20 border-b border-black/[0.06]"
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Card: Class-B Licensing */}
            <div className="lg:col-span-7 rounded-[26px] bg-white border border-black/[0.08] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider mb-5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Regulatory Compliance</span>
                </span>
                <h3
                  id="operations-heading"
                  className="text-brand-navy font-bold text-xl sm:text-2xl lg:text-[26px] mb-3 tracking-normal"
                >
                  Department of Telecommunications (DoT) Authorised
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  SASH Broadband Private Limited holds an authorised Class–B ISP
                  license for Tamil Nadu. Rather than operating as an unverified
                  cable reseller, we maintain direct Tier-1 peering exchanges,
                  redundant optical ring failovers, and certified fusion splicing
                  standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    DoT Regulatory Certified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    Direct Tier-1 Peering
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    End-to-End Glass Drops
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    24/7 Optical Line Monitoring
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: Thiruvallur Experience Centre */}
            <div className="lg:col-span-5 rounded-[26px] bg-neutral-50/70 border border-black/[0.08] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-semibold uppercase tracking-wider mb-5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Headquarters</span>
                </span>
                <h3 className="text-brand-navy font-bold text-xl sm:text-2xl mb-3 tracking-normal">
                  Jaya Nagar, Thiruvallur
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  Visit our local walk-in counter to test live optical speeds,
                  request a doorstep feasibility check, or speak directly with our
                  network engineering desk.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-neutral-200/80">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium">
                  <Clock className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Counter: Mon – Sat, 9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium">
                  <Phone className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Support: +91 90030 09353 (24/7 Helpline)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium">
                  <Mail className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Email: support@sashbroadband.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Single Contact Form for New Inquiries */}
      <Contactus
        defaultInterest="About SASH Broadband"
        defaultPlan="Feasibility enquiry"
      />
    </>
  );
}
