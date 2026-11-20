import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Cpu,
  Clock,
  Sparkles,
  Radio,
  Award,
  CheckCircle2,
  ChevronRight,
  Wifi,
  Server,
  Zap,
} from "lucide-react";
import Contactus from "@/components/Home/Contactus";
import Testimonial from "@/components/Home/Testimonial";
import Faq, { type FaqItem } from "@/components/Home/Faq";
import Aboutus from "@/components/Home/Aboutus";
import {
  ServiceHero,
  SingleClientMarquee,
} from "@/components/Service/ServicePageTemplate";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
} from "@/components/ui/apple-scroll";

export const metadata: Metadata = {
  title: "About SASH Broadband | Licensed Class–B ISP in Tamil Nadu",
  description:
    "Learn about SASH Broadband Private Limited, a licensed Class–B internet service provider based in Thiruvallur delivering pure FTTH optical fibre, dedicated leased lines, and 24/7 engineering support across Tamil Nadu.",
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

const ABOUT_FAQS: FaqItem[] = [
  {
    question: "What is SASH Broadband's licensing status?",
    answer:
      "SASH Broadband Private Limited is an authorised Class–B Internet Service Provider (ISP) licensed to operate optical telecommunication and internet services across Tamil Nadu.",
  },
  {
    question: "Where is SASH Broadband headquartered?",
    answer:
      "Our main headquarters and walk-in customer experience counter are located in Jaya Nagar, Thiruvallur, Tamil Nadu. Our Network Operations Centre (NOC) and optical engineers operate directly from here.",
  },
  {
    question: "How does pure FTTH differ from legacy cable broadband?",
    answer:
      "Unlike legacy cable internet that relies on copper coaxial cables for the last mile, SASH Broadband runs 100% single-mode glass optical fibre directly into your premise. This delivers lower latency, zero electromagnetic interference, and true symmetrical gigabit speeds.",
  },
  {
    question: "What areas do you currently cover in Tamil Nadu?",
    answer:
      "We provide comprehensive optical coverage across Thiruvallur district and expanding service corridors throughout Tamil Nadu for both residential FTTH and corporate leased lines.",
  },
  {
    question: "Do you offer dedicated lines for businesses?",
    answer:
      "Yes. In addition to residential FTTH broadband, we provide 1:1 dedicated Internet Leased Lines (ILL), SME internet packs, secure multi-branch private intranets, and enterprise CCTV surveillance.",
  },
  {
    question: "How quickly can a new connection be activated?",
    answer:
      "Once route feasibility is confirmed (typically within 2 to 4 hours of enquiry), our local fusion splicing technicians can complete installation and live activation within 24 to 48 hours.",
  },
];

const COMPANY_STATS = [
  {
    value: "10,000+",
    label: "Connected Premises",
    subtext: "Across Thiruvallur & Tamil Nadu",
  },
  {
    value: "99.9%",
    label: "Core Network Uptime SLA",
    subtext: "Guaranteed business continuity",
  },
  {
    value: "1 Gbps",
    label: "Core Ring Throughput",
    subtext: "High-capacity optical backbone",
  },
  {
    value: "24/7",
    label: "Local Engineering Desk",
    subtext: "Under 2-hour on-site dispatch",
  },
];

const COMPANY_PILLARS = [
  {
    icon: Wifi,
    title: "100% Pure Optical FTTH",
    description:
      "Single-mode glass fibre drops directly from our local OLT to your optical network terminal, guaranteeing zero signal loss.",
  },
  {
    icon: Zap,
    title: "1:1 Symmetrical Speeds",
    description:
      "Matching ultra-fast download and upload bandwidth engineered for uninterrupted video calls, cloud computing, and streaming.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Peak-Time Throttling",
    description:
      "Truly unlimited data with genuine high throughput 24 hours a day. No arbitrary fair-usage policy speed downgrades.",
  },
  {
    icon: Clock,
    title: "Local Thiruvallur Care Desk",
    description:
      "Real human support located at our Jaya Nagar office, backed by rapid doorstep field technician dispatch within hours.",
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

      {/* 1. Page Hero: Matching Landing Page Hero Style */}
      <ServiceHero
        breadcrumbLabel="About Us"
        eyebrow="LICENSED CLASS–B TAMIL NADU ISP"
        titlePrefix="Connecting Tamil Nadu with "
        titleHighlight="pure optical fibre."
        description="Headquartered in Jaya Nagar, Thiruvallur, SASH Broadband Private Limited builds and operates resilient optical networks designed for everyday speed, honest pricing, and local engineering support."
        ctaText="Schedule Feasibility Call"
        ctaHref="#contact"
        secondaryCtaText="View Broadband Plans"
        secondaryCtaHref="/#plans"
        pattern="blue-arcs"
        imageSrc="/Hero/Business.png"
        imageAlt="SASH Broadband licensed Class-B ISP operations across Tamil Nadu"
        ratingScore="4.9"
        ratingLabel="verified ISP rating"
      />

      {/* 2. Client & Partner Logo Marquee */}
      <SingleClientMarquee />

      {/* 3. Key Infrastructure Stats Grid */}
      <section
        data-apple-manual="true"
        aria-label="Infrastructure statistics"
        className="w-full bg-white py-12 sm:py-16 border-y border-black/[0.06]"
      >
        <div className="container-sash">
          <AppleStagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {COMPANY_STATS.map((stat) => (
              <AppleStaggerItem key={stat.label}>
                <div className="flex flex-col items-start p-5 sm:p-6 rounded-[22px] bg-neutral-50/60 border border-black/[0.05] transition-colors hover:border-brand-red/30">
                  <span className="font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-brand-navy mt-2">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
                    {stat.subtext}
                  </span>
                </div>
              </AppleStaggerItem>
            ))}
          </AppleStagger>
        </div>
      </section>

      {/* 4. Story & Mission Bento Grid */}
      <section
        data-apple-manual="true"
        aria-labelledby="about-mission-heading"
        className="bg-white text-brand-navy section-padding"
      >
        <div className="container-sash">
          <AppleReveal className="max-w-3xl mb-12 sm:mb-16">
            <span className="eyebrow-label text-brand-red mb-3.5 inline-block">
              OUR MISSION & ARCHITECTURE
            </span>
            <h2
              id="about-mission-heading"
              className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-4"
            >
              Engineered for speed, continuity, and lasting trust
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed">
              We started SASH Broadband with a clear conviction: internet
              connectivity in Tamil Nadu should be blisteringly fast, transparently
              priced, and backed by accountable local engineers.
            </p>
          </AppleReveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
            {/* Bento Card 1 (7 cols): Class-B Licensed Network */}
            <div className="lg:col-span-7 rounded-[28px] bg-white border border-black/[0.08] p-7 sm:p-9 flex flex-col justify-between hover:border-black/20 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Licensing & Compliance</span>
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-400">
                    DOT CERTIFIED
                  </span>
                </div>
                <h3 className="text-brand-navy font-semibold text-xl sm:text-2xl mb-3 tracking-normal">
                  Authorised Class–B Internet Service Provider
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed mb-6">
                  SASH Broadband Private Limited operates under an official
                  Class–B ISP authorisation from the Department of
                  Telecommunications (DoT), Government of India. We manage our own
                  optical infrastructure and direct Tier-1 peering points rather
                  than reselling unstable third-party bandwidth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    DoT Regulatory Compliant
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    Direct Tier-1 Peering
                  </span>
                </div>
              </div>
            </div>

            {/* Bento Card 2 (5 cols): Local NOC in Thiruvallur */}
            <div className="lg:col-span-5 rounded-[28px] bg-neutral-50/70 border border-black/[0.08] p-7 sm:p-9 flex flex-col justify-between hover:border-black/20 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-semibold uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Local Engineering</span>
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-400">
                    THIRUVALLUR NOC
                  </span>
                </div>
                <h3 className="text-brand-navy font-semibold text-xl sm:text-2xl mb-3 tracking-normal">
                  Headquartered at Jaya Nagar
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed mb-6">
                  Our network operations centre (NOC), fiber splicing
                  workstation, and direct customer service counter are based right
                  here in Thiruvallur, ensuring issues are solved by local
                  technicians on the ground within 2 hours.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200/80">
                <p className="text-xs text-neutral-500 font-normal">
                  Office counter open Mon–Sat, 9:00 AM – 6:00 PM. Technical support
                  available 24/7.
                </p>
              </div>
            </div>

            {/* Bento Card 3 (5 cols): 100% Single-Mode Glass FTTH */}
            <div className="lg:col-span-5 rounded-[28px] bg-neutral-50/70 border border-black/[0.08] p-7 sm:p-9 flex flex-col justify-between hover:border-black/20 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                    <Radio className="w-3.5 h-3.5" />
                    <span>Pure Optics</span>
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-400">
                    ZERO COPPER
                  </span>
                </div>
                <h3 className="text-brand-navy font-semibold text-xl sm:text-2xl mb-3 tracking-normal">
                  End-to-End Single-Mode Glass
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
                  Every premise is connected with armored optical fibre spliced
                  with precision fusion machines. This eliminates weather
                  interference, signal attenuation, and electrical surge hazards.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200/80">
                <span className="font-mono text-xs font-semibold text-brand-red">
                  &lt; 0.02 dB Splicing Insertion Loss
                </span>
              </div>
            </div>

            {/* Bento Card 4 (7 cols): Tariff Price Lock & No Secrets */}
            <div className="lg:col-span-7 rounded-[28px] bg-white border border-black/[0.08] p-7 sm:p-9 flex flex-col justify-between hover:border-black/20 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Transparent Pricing</span>
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-400">
                    ZERO SURPRISES
                  </span>
                </div>
                <h3 className="text-brand-navy font-semibold text-xl sm:text-2xl mb-3 tracking-normal">
                  Guaranteed Tariff Lock for Up to 2 Full Years
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed mb-6">
                  We guarantee no arbitrary mid-contract tariff increases. What you
                  sign up for is what you pay—with complimentary Wi-Fi router
                  hardware, free installation on annual commitments, and truly
                  unlimited bandwidth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    1 to 2 Year Price Protection
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                    No Security Deposit or Hidden Fees
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Regional Coverage & Network Map (Using Home Aboutus Component) */}
      <Aboutus />

      {/* 6. Company Pillars Grid */}
      <section
        data-apple-manual="true"
        aria-labelledby="about-pillars-heading"
        className="bg-neutral-50/50 text-brand-navy py-16 sm:py-20 lg:py-24 border-y border-black/[0.06]"
      >
        <div className="container-sash">
          <AppleReveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="eyebrow-label text-brand-red mb-3.5 inline-block">
              THE SASH COMMITMENT
            </span>
            <h2
              id="about-pillars-heading"
              className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[42px] tracking-normal leading-[1.15] mb-3.5"
            >
              Four pillars behind every connection
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
              Every home and enterprise connection is governed by strict
              engineering standards designed to keep you online without friction.
            </p>
          </AppleReveal>

          <AppleStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <AppleStaggerItem key={pillar.title}>
                  <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-[24px] bg-white border border-black/[0.08] transition-colors hover:border-brand-red/35">
                    <div>
                      <div className="w-12 h-12 rounded-[14px] bg-brand-red/10 text-brand-red flex items-center justify-center mb-5">
                        <IconComp className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h3 className="font-semibold text-lg text-brand-navy mb-2 tracking-normal">
                        {pillar.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed font-normal">
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

      {/* 7. Verified Customer Testimonials */}
      <Testimonial />

      {/* 8. Frequently Asked Questions (2-Column Sticky Layout) */}
      <Faq
        items={ABOUT_FAQS}
        eyebrow="ABOUT SASH BROADBAND"
        heading="Frequently asked company questions"
        description="Everything you need to know about our ISP licensing, optical network architecture, and service coverage in Tamil Nadu."
      />

      {/* 9. Direct Contact & Walk-In Desk */}
      <Contactus
        defaultInterest="About SASH Broadband"
        defaultPlan="General enquiry"
      />
    </>
  );
}
