"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  ChevronRight,
  Network,
  Server,
  Video,
  Wifi,
} from "lucide-react";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
  AppleScrollScale,
} from "@/components/ui/apple-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const BRAND_LOGOS = [
  "/brand-logos/netflix-logo-icon.svg",
  "/brand-logos/youtube-icon-8.svg",
  "/brand-logos/amazon-prime-video-1.svg",
  "/brand-logos/spotify-logo.svg",
  "/brand-logos/google-g-2015.svg",
  "/brand-logos/whatsapp-glyph-black.svg",
  "/brand-logos/instagram-2016-5.svg",
  "/brand-logos/gta-grand-theft-auto.svg",
  "/brand-logos/rockstar-games.svg",
  "/brand-logos/claude-logo.svg",
  "/brand-logos/deepseek-2.svg",
  "/brand-logos/adobe-photoshop-2.svg",
  "/brand-logos/linkedin-icon-2.svg",
  "/brand-logos/myntra-2.svg",
];

// Tripled to 42 items (exactly 14 items per column) for a continuous, unbroken 3-column marquee
const UPGRADE_MARQUEE_LOGOS = [
  ...BRAND_LOGOS,
  ...BRAND_LOGOS,
  ...BRAND_LOGOS,
];

const SERVICES_LIST = [
  {
    title: "Broadband",
    description:
      "High-speed FTTH home internet up to 1 Gbps with unlimited monthly data and free router setup.",
    href: "/broadband-services",
    icon: Wifi,
  },
  {
    title: "Leased Line",
    description:
      "Uncontended 1:1 dedicated enterprise bandwidth with guaranteed SLA uptime and static IP routing.",
    href: "/lease-line",
    icon: Network,
  },
  {
    title: "SME Internet",
    description:
      "Scalable business broadband designed for retail stores, clinics, offices, and cloud workflows.",
    href: "/sme-internet",
    icon: Briefcase,
  },
  {
    title: "CCTV Surveillance",
    description:
      "End-to-end HD IP camera installation with mobile live-view monitoring for homes and commercial buildings.",
    href: "/cctv",
    icon: Video,
  },
  {
    title: "Intranet Solutions",
    description:
      "Secure private LAN/WAN interconnections linking multiple offices, warehouses, and campuses.",
    href: "/intranet",
    icon: Server,
  },
];

const CONNECTION_USE_CASES = [
  {
    label: "Home",
    title: "4K Streaming & Smart Homes",
    description:
      "Connect TVs, phones, tablets, and smart appliances simultaneously with zero evening slowdowns.",
  },
  {
    label: "Work",
    title: "Crystal-Clear Video Calls",
    description:
      "Symmetrical upload speeds keep Zoom, Teams, VPNs, and large cloud file transfers effortless.",
  },
  {
    label: "Gaming",
    title: "Ultra-Low Ping & Fast Downloads",
    description:
      "Direct optical routing reduces packet loss and jitter for competitive multiplayer gaming.",
  },
  {
    label: "Security",
    title: "24/7 Cloud CCTV Access",
    description:
      "View live HD camera feeds from your home, shop, or warehouse anywhere on your smartphone.",
  },
];

function UseCaseCard({
  item,
}: {
  item: (typeof CONNECTION_USE_CASES)[number];
}) {
  return (
    <article
      data-apple-manual="true"
      className="h-full w-full rounded-[28px] bg-navy-80/75 backdrop-blur-md border border-white/15 p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
    >
      <div>
        {/* Red label with white text (passes WCAG AA contrast) */}
        <span className="inline-block px-3 py-0.5 rounded-full bg-brand-red text-white text-xs font-semibold uppercase tracking-wider mb-4">
          {item.label}
        </span>
        <h3 className="text-white font-semibold text-lg sm:text-xl mb-2 tracking-normal">
          {item.title}
        </h3>
        <p className="text-white/85 text-sm font-normal leading-relaxed">
          {item.description}
        </p>
      </div>
    </article>
  );
}

function ServiceCard({ service }: { service: (typeof SERVICES_LIST)[number] }) {
  const IconComponent = service.icon;

  return (
    <Link
      href={service.href}
      data-apple-manual="true"
      className="group relative w-full min-h-[290px] sm:min-h-[300px] h-full rounded-[22px] bg-[#F4F3F1] border border-black/[0.04] p-5 sm:p-5.5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(222,3,2,0.18)] cursor-pointer select-none"
    >
      {/* SASH Brand Gradient on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FDEBEB_0%,#DE0302_52%,#B80201_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out z-0"
      />

      {/* Top: Icon in rounded badge */}
      <div className="relative z-10 text-brand-navy group-hover:text-white transition-colors duration-300">
        <div className="w-9 h-9 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center shadow-xs transition-colors duration-300">
          <IconComponent className="w-4.5 h-4.5 stroke-[2] text-brand-navy group-hover:text-white transition-colors duration-300" />
        </div>
      </div>

      {/* Bottom: Title, Description, and Read More Button */}
      <div className="relative z-10 mt-auto flex flex-col pt-4">
        <h3 className="text-brand-navy font-semibold text-sm min-[400px]:text-[15px] sm:text-base tracking-tight mb-1.5 group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-neutral-500 text-[11px] min-[400px]:text-xs sm:text-[12.5px] leading-snug line-clamp-3 mb-4 group-hover:text-white/95 transition-colors duration-300">
          {service.description}
        </p>

        {/* Read More Button */}
        <div className="pt-1">
          <span className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-white text-brand-navy border border-black/[0.08] px-3.5 text-xs font-medium shadow-xs group-hover:bg-white group-hover:text-brand-red group-hover:border-transparent transition-all duration-200">
            <span>Read more</span>
            <ChevronRight className="size-3.5 stroke-[2.5] text-brand-red transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Service() {
  const [lifestyleApi, setLifestyleApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!lifestyleApi) return;

    const updateActive = () => {
      setActiveSlide(lifestyleApi.selectedScrollSnap());
    };

    const rafId = window.requestAnimationFrame(updateActive);
    lifestyleApi.on("select", updateActive);
    lifestyleApi.on("reInit", updateActive);

    return () => {
      window.cancelAnimationFrame(rafId);
      lifestyleApi.off("select", updateActive);
      lifestyleApi.off("reInit", updateActive);
    };
  }, [lifestyleApi]);

  return (
    <>
      {/* 5. Services Overview */}
      <section
        id="services"
        data-apple-manual="true"
        aria-labelledby="services-heading"
        className="bg-white text-brand-navy section-padding"
      >
        <div className="container-sash">
          {/* Header */}
          <div className="max-w-2xl mb-10 sm:mb-14">
            <AppleReveal>
              <p className="eyebrow-label text-brand-red mb-3">
                Complete Network Portfolio
              </p>
              <h2
                id="services-heading"
                className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3"
              >
                Connectivity for every need
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
                From unlimited home fibre broadband to enterprise leased lines and
                premises CCTV surveillance across Tamil Nadu.
              </p>
            </AppleReveal>
          </div>

          {/* 5 Service Cards: Responsive Grid (5 cols on desktop, 3 on tablet, 2 on small screens, 1 on mobile) */}
          <AppleStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {SERVICES_LIST.map((service) => (
              <AppleStaggerItem key={service.title} className="flex">
                <ServiceCard service={service} />
              </AppleStaggerItem>
            ))}
          </AppleStagger>
        </div>
      </section>

      {/* 6. Get More From Your Connection (Uploaded light-trail backdrop, 4 content cards) */}
      <section
        data-apple-manual="true"
        aria-labelledby="use-cases-heading"
        className="relative overflow-hidden bg-brand-navy text-white section-padding"
      >
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
          <AppleReveal className="max-w-2xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16 lg:mb-20">
            <p className="eyebrow-label text-white/80 mb-3.5">
              Built Around Your Lifestyle
            </p>
            <h2 id="use-cases-heading" className="text-white font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5">
              Get more from your connection
            </h2>
            <p className="text-white/85 text-sm sm:text-base font-normal leading-relaxed">
              Whether your household streams in 4K or your office runs cloud POS
              systems, our fibre network adapts to every demand.
            </p>
          </AppleReveal>

          {/* Mobile & Tablet Carousel (< lg) */}
          <div className="lg:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setLifestyleApi}
              className="w-full"
            >
              <CarouselContent className="-ml-4 py-1">
                {CONNECTION_USE_CASES.map((item) => (
                  <CarouselItem
                    key={item.label}
                    className="pl-4 basis-[86%] sm:basis-1/2 flex"
                  >
                    <UseCaseCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CarouselPrevious className="relative inset-0 size-10 rounded-full border border-white/25 bg-brand-navy/70 text-white hover:border-white hover:bg-white/15 hover:text-white transition-colors cursor-pointer" />
                  <CarouselNext className="relative inset-0 size-10 rounded-full border-transparent bg-linear-to-b from-brand-red to-brand-red-hover text-white shadow-[0_6px_20px_rgba(222,3,2,0.35)] outline-2 -outline-offset-2 outline-white/20 hover:from-brand-red-hover hover:to-brand-red-hover hover:text-white transition-all cursor-pointer" />
                </div>

                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Lifestyle card slides"
                >
                  {CONNECTION_USE_CASES.map((item, idx) => (
                    <button
                      key={item.label}
                      type="button"
                      role="tab"
                      aria-selected={activeSlide === idx}
                      aria-label={`Show ${item.label}: ${item.title}`}
                      onClick={() => lifestyleApi?.scrollTo(idx)}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${activeSlide === idx
                          ? "w-6 bg-brand-red"
                          : "w-2 bg-white/35 hover:bg-white/60"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </Carousel>
          </div>

          {/* Desktop Grid (>= lg) */}
          <AppleStagger className="hidden lg:grid lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
            {CONNECTION_USE_CASES.map((item) => (
              <AppleStaggerItem key={item.label} className="flex">
                <UseCaseCard item={item} />
              </AppleStaggerItem>
            ))}
          </AppleStagger>

          {/* 7. CTA Banner (Red background, White text, 32px rounded container with 3D Marquee on the right background) */}
          <AppleScrollScale className="mt-20 md:mt-28 lg:mt-32">
            <div className="banner-sash relative overflow-hidden rounded-[32px] bg-brand-red text-white p-8 sm:p-12 lg:p-14 min-h-[360px] sm:min-h-[400px] lg:min-h-[420px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_16px_48px_rgba(222,3,2,0.22)]">
              {/* 3D Marquee: Positioned on the right of the card background (compact, 3 visible columns, pure white card background) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 sm:-right-4 md:right-0 lg:right-4 top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px] h-[360px] sm:h-[400px] lg:h-[440px] overflow-hidden select-none z-0 opacity-90 sm:opacity-95 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.2)_10%,black_35%,black_100%)]"
              >
                <ThreeDMarquee
                  images={UPGRADE_MARQUEE_LOGOS}
                  columns={3}
                  className="h-full w-full"
                />
              </div>

              {/* Gradient Scrim to ensure 100% text readability */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-red via-brand-red/95 to-transparent lg:from-brand-red lg:via-brand-red/80 lg:to-transparent z-10"
              />

              <div className="relative z-20 max-w-xl">
                <h2 className="text-white mb-3 font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-normal">
                  Ready to upgrade your connection?
                </h2>
                <p className="text-white/95 text-base md:text-lg font-normal leading-relaxed">
                  Check fibre availability in your street in Thiruvallur or anywhere
                  in Tamil Nadu and get free installation on your new plan.
                </p>
              </div>

              <div className="relative z-20 flex flex-wrap items-center gap-4 w-full lg:w-auto shrink-0">
                <Link
                  href="#contact"
                  className="group/cta btn-pill bg-linear-to-b from-brand-navy to-navy-80 text-white shadow-[0_6px_20px_rgba(1,13,59,0.22)] outline-2 -outline-offset-2 outline-white/20 hover:from-navy-80 hover:to-navy-80 w-full sm:w-auto font-medium"
                >
                  <span>Check availability</span>
                  <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5" />
                </Link>
                <a
                  href="https://wa.me/919003009353?text=Hi%20SASH%20Broadband%2C%20I%20would%20like%20to%20check%20fibre%20availability%20at%20my%20location."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/wa btn-pill border border-white/40 bg-white/10 text-white hover:bg-white hover:text-brand-navy w-full sm:w-auto font-medium"
                >
                  <span>Chat on WhatsApp</span>
                  <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-200 ease-out group-hover/wa:translate-x-0.5" />
                </a>
              </div>
            </div>
          </AppleScrollScale>
        </div>
      </section>
    </>
  );
}

