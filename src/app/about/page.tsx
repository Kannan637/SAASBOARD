import type { Metadata } from "next";
import Link from "next/link";
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

      {/* 1. Page Header */}
      <section
        data-apple-manual="true"
        aria-labelledby="about-heading"
        className="w-full bg-white pt-10 sm:pt-14 lg:pt-18 pb-12 sm:pb-16 border-b border-black/[0.06]"
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-neutral-500 mb-4 sm:mb-5">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-brand-red transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="text-brand-navy font-medium">
                  About Us
                </li>
              </ol>
            </nav>

            <span className="eyebrow-label text-brand-red mb-3.5 sm:mb-4 inline-block">
              ABOUT SASH BROADBAND
            </span>

            <h1
              id="about-heading"
              className="text-brand-navy font-bold text-3xl sm:text-4xl lg:text-[48px] tracking-tight leading-[1.12] mb-5 sm:mb-6"
            >
              Building Thiruvallur&apos;s optical network from the{" "}
              <span className="text-brand-red">ground up.</span>
            </h1>

            <p className="text-neutral-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
              SASH Broadband Private Limited was founded to solve a persistent
              problem: frequent disconnections, hidden billing surprises, and
              unreachable customer support. Today, we operate an authorised
              Class–B optical network powering thousands of homes, educational
              institutions, and businesses across Tamil Nadu.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                href="#contact"
                className="group/btn btn-pill btn-primary-red font-medium text-sm sm:text-base px-6 sm:px-8"
              >
                <span>Check coverage</span>
                <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-150 group-hover/btn:translate-x-0.5" />
              </Link>
              <Link
                href="/#plans"
                className="group/btn2 btn-pill btn-secondary-navy font-medium text-sm sm:text-base px-6 sm:px-8"
              >
                <span>View broadband plans</span>
                <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-150 group-hover/btn2:translate-x-0.5" />
              </Link>
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
