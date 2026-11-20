"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  ChevronRight,
  Network,
  RotateCcw,
  Server,
  Video,
  Wifi,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
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

const SERVICES_LIST = [
  {
    id: "broadband",
    title: "Broadband",
    description:
      "High-speed FTTH home internet up to 1 Gbps with unlimited monthly data and free router setup.",
    headline: "High-Speed Fibre Broadband",
    points: [
      "Symmetrical speeds up to 1 Gbps with 1:1 upload",
      "True unlimited data with zero peak-hour throttling",
      "Free Gigabit dual-band Wi-Fi router setup included",
    ],
    href: "/broadband-services",
    icon: Wifi,
  },
  {
    id: "leased-line",
    title: "Leased Line",
    description:
      "Uncontended 1:1 dedicated enterprise bandwidth with guaranteed SLA uptime and static IP routing.",
    headline: "Dedicated Enterprise Leased Line",
    points: [
      "1:1 uncontended dedicated symmetrical bandwidth",
      "99.99% enterprise SLA uptime with 2-4h MTTR",
      "Static public IP pool with 24/7 direct NOC support",
    ],
    href: "/lease-line",
    icon: Network,
  },
  {
    id: "sme-internet",
    title: "SME Internet",
    description:
      "Scalable business broadband designed for retail stores, clinics, offices, and cloud workflows.",
    headline: "High-Performance Business Fibre",
    points: [
      "Business-priority traffic routing for cloud & POS",
      "Flat-rate monthly tariffs with zero FUP speed drops",
      "Priority commercial installation & dedicated support",
    ],
    href: "/sme-internet",
    icon: Briefcase,
  },
  {
    id: "cctv",
    title: "CCTV Surveillance",
    description:
      "End-to-end HD IP camera installation with mobile live-view monitoring for homes and commercial buildings.",
    headline: "Smart HD Cloud CCTV Surveillance",
    points: [
      "Weatherproof IP67 HD & 4K cameras with night vision",
      "Continuous recording with local NVR & secure cloud",
      "Live remote smartphone viewing on iOS & Android",
    ],
    href: "/cctv",
    icon: Video,
  },
  {
    id: "intranet",
    title: "Intranet Solutions",
    description:
      "Secure private LAN/WAN interconnections linking multiple offices, warehouses, and campuses.",
    headline: "Secure Private Multi-Site Intranet",
    points: [
      "Private Layer-2/Layer-3 inter-branch optical WAN",
      "Zero public internet exposure or DDoS vulnerability",
      "Ultra-low latency for internal ERP, CRM & servers",
    ],
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
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = service.icon;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest("button:not([data-flip-trigger])") ||
      target.closest("input")
    ) {
      return;
    }
    setIsFlipped((prev) => !prev);
  };

  return (
    <article
      data-apple-manual="true"
      className="group/flip relative w-full h-full min-h-[350px] sm:min-h-[360px] [perspective:1200px] select-none cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      aria-expanded={isFlipped}
      aria-label={`${service.title} service details. Click to flip.`}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform:
            isFlipped && !shouldReduceMotion
              ? "rotateY(180deg)"
              : "rotateY(0deg)",
        }}
      >
        {/* Front Face: Service Overview + Black Knockout Plus Button */}
        <div
          className="w-full h-full flex flex-col justify-between bg-[#F4F3F1] border border-black/[0.06] rounded-[24px] p-5 sm:p-5.5 overflow-hidden transition-colors duration-300"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Top: Icon in rounded badge */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-white text-brand-navy flex items-center justify-center shadow-xs border border-black/[0.04]">
              <IconComponent className="w-5 h-5 stroke-[2] text-brand-navy" />
            </div>
          </div>

          {/* Bottom: Title, Description, and Knockout Plus Button */}
          <div className="mt-auto flex flex-col pt-4">
            <h3 className="text-brand-navy font-semibold text-base sm:text-lg tracking-tight mb-2">
              {service.title}
            </h3>
            <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-3">
              {service.description}
            </p>

            <div className="flex items-center justify-end pt-1">
              <svg
                data-flip-trigger="true"
                aria-label={`View ${service.title} details`}
                className="size-9 sm:size-10 shrink-0 cursor-pointer select-none"
                viewBox="0 0 40 40"
                fill="none"
              >
                <mask id={`plus-mask-service-${service.id}`}>
                  <rect width="40" height="40" rx="14" fill="white" />
                  <path
                    d="M20 11v18M11 20h18"
                    stroke="black"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </mask>
                <rect
                  width="40"
                  height="40"
                  rx="14"
                  fill="#000000"
                  mask={`url(#plus-mask-service-${service.id})`}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Back Face: Exact layout matching shared_imh (No CTA at bottom) */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between bg-white text-brand-navy border border-black/[0.08] rounded-[24px] p-5 sm:p-5.5 overflow-hidden z-20"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            {/* Top row: Icon badge + Flip back badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                <IconComponent className="size-5" />
              </div>
              <span className="text-neutral-400 hover:text-brand-navy text-[11px] font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 transition-colors">
                <RotateCcw className="size-3" />
                <span>Flip back</span>
              </span>
            </div>

            {/* Bold Headline */}
            <h3 className="text-brand-navy text-sm min-[400px]:text-[15px] sm:text-base font-semibold tracking-tight leading-snug mb-3.5">
              {service.headline}
            </h3>

            {/* Bullet Points with solid disc markers */}
            <ul className="space-y-2.5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[11.5px] sm:text-xs text-neutral-700 leading-snug"
                >
                  <span className="size-1.5 rounded-full bg-neutral-900 shrink-0 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
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
          <AppleStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            {SERVICES_LIST.map((service) => (
              <AppleStaggerItem key={service.title} className="h-full flex flex-col">
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

          {/* 7. CTA Banner (Red background, White text, 32px rounded container with Apple scroll-scale) */}
          <AppleScrollScale className="mt-20 md:mt-28 lg:mt-32">
            <div className="banner-sash rounded-[32px] bg-brand-red text-white p-10 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_16px_48px_rgba(222,3,2,0.22)]">
              <div className="max-w-xl">
                <h2 className="text-white mb-3 font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-normal">
                  Ready to upgrade your connection?
                </h2>
                <p className="text-white/95 text-base md:text-lg font-normal leading-relaxed">
                  Check fibre availability in your street in Thiruvallur or anywhere
                  in Tamil Nadu and get free installation on your new plan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto shrink-0">
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

