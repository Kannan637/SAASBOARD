import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Cpu,
  Radio,
  ChevronRight,
  Wifi,
  Clock,
  Zap,
} from "lucide-react";
import Contactus from "@/components/Home/Contactus";
import Aboutus from "@/components/Home/Aboutus";
import { SingleClientMarquee } from "@/components/Service/ServicePageTemplate";
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

const HIGHLIGHT_CARDS = [
  {
    icon: Building2,
    badge: "Licensing",
    title: "Class–B Licensed ISP",
    description:
      "Authorized by the Department of Telecommunications (DoT) with direct Tier-1 peering across Tamil Nadu.",
  },
  {
    icon: Radio,
    badge: "Infrastructure",
    title: "100% Pure Optical FTTH",
    description:
      "Single-mode glass fibre straight to your premise with zero copper degradation or signal attenuation.",
  },
  {
    icon: ShieldCheck,
    badge: "Pricing",
    title: "Tariff Price-Lock Protection",
    description:
      "1 to 2 year fixed monthly tariffs with truly unlimited data and zero hidden equipment fees.",
  },
  {
    icon: Clock,
    badge: "Support",
    title: "Local Thiruvallur NOC",
    description:
      "Jaya Nagar walk-in care counter and 24/7 network operations with under 2-hour field technician dispatch.",
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

      {/* 1. Clean, Spacious Page Header */}
      <section
        data-apple-manual="true"
        aria-labelledby="about-header-heading"
        className="w-full bg-white pt-8 sm:pt-12 lg:pt-16 pb-10 sm:pb-14 border-b border-black/[0.06]"
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

            {/* Eyebrow Badge */}
            <span className="eyebrow-label text-brand-red mb-3.5 sm:mb-4 inline-block">
              ABOUT SASH BROADBAND
            </span>

            {/* Headline */}
            <h1
              id="about-header-heading"
              className="text-brand-navy font-bold text-3xl sm:text-4xl lg:text-[50px] tracking-tight leading-[1.12] mb-5 sm:mb-6"
            >
              Connecting Tamil Nadu with{" "}
              <span className="text-brand-red">pure optical fibre.</span>
            </h1>

            {/* Concise Description */}
            <p className="text-neutral-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-7 sm:mb-8 max-w-2xl">
              <strong className="font-semibold text-brand-navy">SASH Broadband Private Limited</strong> is an authorised Class–B Internet Service Provider headquartered in Jaya Nagar, Thiruvallur. We build and operate resilient optical networks delivering high-speed FTTH, leased lines, and dedicated local engineering support.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                href="#contact"
                className="group/btn btn-pill btn-primary-red font-medium text-sm sm:text-base px-6 sm:px-8"
              >
                <span>Check availability</span>
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

      {/* 2. Visual Tamil Nadu Coverage Map Showcase */}
      <Aboutus />

      {/* 3. Concise 4-Pillar Highlights Grid (No Wall of Text) */}
      <section
        data-apple-manual="true"
        aria-labelledby="highlights-heading"
        className="w-full bg-white py-14 sm:py-20 border-b border-black/[0.06]"
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <AppleReveal className="max-w-2xl mb-10 sm:mb-14">
            <span className="eyebrow-label text-brand-red mb-3 inline-block">
              OUR STANDARDS
            </span>
            <h2
              id="highlights-heading"
              className="text-brand-navy font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.18] mb-3"
            >
              Why Tamil Nadu trusts SASH Broadband
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
              Every premise connection is backed by strict engineering standards, transparent pricing, and accountable local support.
            </p>
          </AppleReveal>

          <AppleStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {HIGHLIGHT_CARDS.map((card) => {
              const IconComp = card.icon;
              return (
                <AppleStaggerItem key={card.title}>
                  <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-[24px] bg-neutral-50/60 border border-black/[0.06] transition-colors hover:border-brand-red/35">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-[12px] bg-brand-red/10 text-brand-red flex items-center justify-center">
                          <IconComp className="w-5 h-5 stroke-[2.25]" />
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                          {card.badge}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-brand-navy mb-2 tracking-normal">
                        {card.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </AppleStaggerItem>
              );
            })}
          </AppleStagger>
        </div>
      </section>

      {/* 4. Single-Row Client Partner Marquee */}
      <SingleClientMarquee />

      {/* 5. Direct Contact & Office Location */}
      <Contactus
        defaultInterest="About SASH Broadband"
        defaultPlan="General enquiry"
      />
    </>
  );
}
