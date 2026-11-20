import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Radio,
  Clock,
  ChevronRight,
  Compass,
  Target,
  CheckCircle2,
} from "lucide-react";
import Contactus from "@/components/Home/Contactus";
import Testimonial from "@/components/Home/Testimonial";
import Faq, { type FaqItem } from "@/components/Home/Faq";
import { SingleClientMarquee } from "@/components/Service/ServicePageTemplate";
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
    href: "/broadband-services",
    ctaText: "Explore fibre",
  },
  {
    icon: ShieldCheck,
    tag: "BILLING ETHICS",
    title: "Guaranteed Tariff Price-Lock",
    description:
      "Protected fixed monthly tariffs for 1 to 2 full years. Enjoy genuinely unlimited data with zero speed throttling, zero security deposits, and no hidden hardware charges.",
    href: "/#plans",
    ctaText: "View plans",
  },
  {
    icon: Clock,
    tag: "LOCAL TEAM",
    title: "Local NOC & 2-Hour Dispatch",
    description:
      "Our Network Operations Centre and optical fusion technicians operate directly out of Jaya Nagar, Thiruvallur—ensuring rapid doorstep resolution within hours, not days.",
    href: "#contact",
    ctaText: "Contact NOC",
  },
];

const ABOUT_FAQS: FaqItem[] = [
  {
    question: "What is SASH Broadband's licensing status?",
    answer:
      "SASH Broadband Private Limited is an authorised Class–B Internet Service Provider (ISP) licensed by the Department of Telecommunications (DoT) to build, operate, and provide optical telecommunication and internet services across Tamil Nadu.",
  },
  {
    question: "Where is SASH Broadband headquartered?",
    answer:
      "Our main headquarters and customer experience centre are located in Jaya Nagar, Thiruvallur, Tamil Nadu. Our Network Operations Centre (NOC) and optical field engineers operate directly from here.",
  },
  {
    question: "How does pure FTTH differ from legacy cable internet?",
    answer:
      "Unlike legacy cable internet that relies on copper coaxial cables for the last mile, SASH Broadband runs 100% single-mode glass optical fibre directly into your premise. This guarantees sub-5ms low latency, zero electromagnetic interference from weather, and true symmetrical gigabit speeds.",
  },
  {
    question: "What areas do you currently cover in Tamil Nadu?",
    answer:
      "We provide comprehensive optical coverage across Thiruvallur district, Perambakkam, Kadambattur, and expanding service corridors throughout Tamil Nadu for residential FTTH, SME business broadband, and corporate leased lines.",
  },
  {
    question: "Do you offer enterprise solutions for businesses?",
    answer:
      "Yes. In addition to residential FTTH broadband, we engineer 1:1 dedicated Internet Leased Lines (ILL) with 99.9% uptime SLA, SME business internet packs, secure multi-branch private intranets, and commercial CCTV surveillance.",
  },
  {
    question: "How quickly can a new connection be activated?",
    answer:
      "Once route feasibility is confirmed (typically within 2 to 4 hours of enquiry), our local fusion splicing technicians can complete doorstep optical installation and live activation within 24 to 48 hours.",
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

      {/* 2. Client & Partner Logo Marquee: Directly below Hero Section */}
      <SingleClientMarquee />

      {/* 3. Core Commitments: UI matching Complete Network Portfolio & Connectivity for every need */}
      <section
        data-apple-manual="true"
        aria-labelledby="commitments-heading"
        className="bg-white text-brand-navy section-padding border-b border-black/[0.06]"
      >
        <div className="container-sash">
          {/* Header matching Complete Network Portfolio */}
          <div className="max-w-2xl mb-10 sm:mb-14">
            <AppleReveal>
              <p className="eyebrow-label text-brand-red mb-3">
                OUR COMMITMENT
              </p>
              <h2
                id="commitments-heading"
                className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3"
              >
                How we do internet differently
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
                We own and manage our optical rings, direct peering, and last-mile
                splicing—giving our customers complete reliability without intermediaries.
              </p>
            </AppleReveal>
          </div>

          {/* ServiceCard UI matching Complete Network Portfolio */}
          <AppleStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {PILLARS.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <AppleStaggerItem key={pillar.title} className="flex">
                  <Link
                    href={pillar.href}
                    data-apple-manual="true"
                    className="group relative w-full min-h-[290px] sm:min-h-[300px] h-full rounded-[22px] bg-[#F4F3F1] border border-black/[0.04] p-5 sm:p-5.5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(222,3,2,0.18)] cursor-pointer select-none"
                  >
                    {/* SASH Brand Gradient on Hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FDEBEB_0%,#DE0302_52%,#B80201_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out z-0"
                    />

                    {/* Top: Icon in rounded badge + category tag */}
                    <div className="relative z-10 flex items-center justify-between text-brand-navy group-hover:text-white transition-colors duration-300">
                      <div className="w-9 h-9 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center shadow-xs transition-colors duration-300">
                        <IconComponent className="w-4.5 h-4.5 stroke-[2] text-brand-navy group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-neutral-400 group-hover:text-white/80 uppercase tracking-wider transition-colors duration-300">
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Bottom: Title, Description, and Read More Button */}
                    <div className="relative z-10 mt-auto flex flex-col pt-4">
                      <h3 className="text-brand-navy font-semibold text-sm min-[400px]:text-[15px] sm:text-base tracking-tight mb-1.5 group-hover:text-white transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="text-neutral-500 text-[11px] min-[400px]:text-xs sm:text-[12.5px] leading-snug line-clamp-3 mb-4 group-hover:text-white/95 transition-colors duration-300">
                        {pillar.description}
                      </p>

                      {/* Read More Button */}
                      <div className="pt-1">
                        <span className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-white text-brand-navy border border-black/[0.08] px-3.5 text-xs font-medium shadow-xs group-hover:bg-white group-hover:text-brand-red group-hover:border-transparent transition-all duration-200">
                          <span>{pillar.ctaText}</span>
                          <ChevronRight className="size-3.5 stroke-[2.5] text-brand-red transition-transform duration-200 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AppleStaggerItem>
              );
            })}
          </AppleStagger>
        </div>
      </section>

      {/* 4. Vision & Mission Cards: Backdrop matching 'Built Around Your Lifestyle' section with Center Aligned Title */}
      <section
        data-apple-manual="true"
        aria-labelledby="vision-mission-heading"
        className="relative overflow-hidden bg-brand-navy text-white section-padding"
      >
        {/* Background Image with Gradient Overlay matching 'Built Around Your Lifestyle' section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <Image
            src="/Service/lifestyle-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-brand-navy/35 to-brand-navy/75" />
        </div>

        <div className="container-sash relative z-10">
          {/* Section Header: Center Aligned */}
          <AppleReveal className="max-w-2xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16">
            <p className="eyebrow-label text-white/80 mb-3.5">
              PURPOSE &amp; VALUES
            </p>
            <h2
              id="vision-mission-heading"
              className="text-white font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5 text-center"
            >
              Our Vision &amp; Mission
            </h2>
            <p className="text-white/85 text-sm sm:text-base font-normal leading-relaxed text-center">
              Guided by a commitment to democratize gigabit optical connectivity
              across Tamil Nadu with transparent pricing and accountable local support.
            </p>
          </AppleReveal>

          {/* Vision & Mission 2-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Vision Card */}
            <div className="rounded-[28px] bg-navy-80/75 backdrop-blur-md border border-white/15 p-7 sm:p-9 lg:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 shadow-xs flex items-center justify-center text-white">
                    <Compass className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-white/70 uppercase tracking-wider">
                    OUR VISION
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl sm:text-2xl mb-3 tracking-tight">
                  Empowering Tamil Nadu with next-generation optical infrastructure
                </h3>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  To become Tamil Nadu&apos;s most reliable, community-rooted internet service
                  provider—eliminating digital bottlenecks through pure optical FTTH technology,
                  unfettered symmetrical speeds, and honest, customer-centric billing ethics.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/15">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">
                    100% Pure glass optical drops to every premise
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">
                    Zero artificial throttling and permanent price-locks
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">
                    Bridging suburban and rural communities with gigabit access
                  </span>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="rounded-[28px] bg-navy-80/75 backdrop-blur-md border border-white/15 p-7 sm:p-9 lg:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red text-white shadow-xs flex items-center justify-center">
                    <Target className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-white/70 uppercase tracking-wider">
                    OUR MISSION
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl sm:text-2xl mb-3 tracking-tight">
                  Accountable local engineering and guaranteed uptime
                </h3>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  To deliver rock-solid connectivity backed by our local Thiruvallur Network
                  Operations Centre, rapid 2-hour doorstep technician dispatch, and carrier-grade
                  peering—giving homes, schools, and enterprises the digital foundation they deserve.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/15">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">
                    Local Thiruvallur NOC with 24/7 proactive line monitoring
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">
                    Under 2-hour on-site optical technician dispatch
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">
                    SLA-backed 99.9% uptime with dual optical ring redundancy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Google Reviews & Testimonials Carousel */}
      <Testimonial />

      {/* 6. Frequently Asked Questions */}
      <Faq
        eyebrow="ABOUT SASH BROADBAND"
        heading="Frequently Asked Questions"
        description="Everything you need to know about our company, Class-B licensing, optical network infrastructure, and service coverage."
        items={ABOUT_FAQS}
      />

      {/* 7. Single Contact Form for New Inquiries */}
      <Contactus
        defaultInterest="About SASH Broadband"
        defaultPlan="Feasibility enquiry"
      />
    </>
  );
}
