"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    title: "Broadband",
    description:
      "High-speed FTTH home internet up to 1 Gbps with unlimited monthly data and free router setup.",
    href: "/broadband-services",
    iconSrc: "/Service/BroadBand.webp",
  },
  {
    title: "Leased Line",
    description:
      "Uncontended 1:1 dedicated enterprise bandwidth with guaranteed SLA uptime and static IP routing.",
    href: "/lease-line",
    iconSrc: "/Service/Leased Line.webp",
  },
  {
    title: "SME Internet",
    description:
      "Scalable business broadband designed for retail stores, clinics, offices, and cloud workflows.",
    href: "/sme-internet",
    iconSrc: "/Service/SME Internet.webp",
  },
  {
    title: "CCTV Surveillance",
    description:
      "End-to-end HD IP camera installation with mobile live-view monitoring for homes and commercial buildings.",
    href: "/cctv",
    iconSrc: "/Service/CCTV.webp",
  },
  {
    title: "Intranet Solutions",
    description:
      "Secure private LAN/WAN interconnections linking multiple offices, warehouses, and campuses.",
    href: "/intranet",
    iconSrc: "/Service/Intranet.webp",
  },
  {
    title: "OTT and IPTV",
    description:
      "Buffer-free 4K entertainment and digital television delivery over your high-speed SASH fibre line.",
    href: "/broadband-services#ott-iptv",
    iconSrc: "/Service/BroadBand.webp",
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
      className="h-full w-full rounded-xl bg-navy-80/75 backdrop-blur-md border border-white/15 p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
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
  return (
    <article
      data-apple-manual="true"
      className="rounded-xl w-full bg-white border border-neutral-100 p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-[0px_2px_3px_0px_rgba(5,5,6,0.05)] hover:shadow-[0px_8px_24px_rgba(5,5,6,0.08)]"
    >
      <div>
        <div className="w-12 h-12 flex items-center justify-center mb-4">
          <Image
            src={service.iconSrc}
            alt={service.title}
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-brand-navy font-semibold text-lg sm:text-xl mb-2 tracking-normal">
          {service.title}
        </h3>
        <p className="text-neutral-600 text-sm font-normal leading-relaxed line-clamp-2 mb-5">
          {service.description}
        </p>
      </div>

      <div>
        <Link
          href={service.href}
          className="inline-flex items-center gap-1.5 font-medium text-sm text-brand-red hover:underline py-1"
          aria-label={`Explore ${service.title}`}
        >
          <span>Explore</span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function Service() {
  const [serviceApi, setServiceApi] = useState<CarouselApi>();
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);

  const [lifestyleApi, setLifestyleApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!serviceApi) return;

    const updateActive = () => {
      setActiveServiceSlide(serviceApi.selectedScrollSnap());
    };

    const rafId = window.requestAnimationFrame(updateActive);
    serviceApi.on("select", updateActive);
    serviceApi.on("reInit", updateActive);

    return () => {
      window.cancelAnimationFrame(rafId);
      serviceApi.off("select", updateActive);
      serviceApi.off("reInit", updateActive);
    };
  }, [serviceApi]);

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
      {/* 5. Services Overview (Light Grey background) */}
      <section
        id="services"
        data-apple-manual="true"
        aria-labelledby="services-heading"
        className="bg-neutral-100 text-brand-navy section-padding"
      >
        <div className="container-sash">
          <AppleReveal className="max-w-2xl mx-auto text-center flex flex-col items-center mb-10 sm:mb-14">
            <p className="eyebrow-label text-brand-red mb-3.5">
              Complete Network Portfolio
            </p>
            <h2 id="services-heading" className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5">
              Connectivity for every need
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
              From unlimited home fibre broadband to enterprise leased lines and
              premises CCTV surveillance across Tamil Nadu.
            </p>
          </AppleReveal>

          {/* Mobile & Tablet Carousel (< md) */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setServiceApi}
              className="w-full"
            >
              <CarouselContent className="-ml-4 py-1">
                {SERVICES_LIST.map((service) => (
                  <CarouselItem
                    key={service.title}
                    className="pl-4 basis-[86%] sm:basis-[60%] flex"
                  >
                    <ServiceCard service={service} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Controls: Arrows + Dots */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CarouselPrevious className="relative inset-0 size-9 rounded-lg border border-border/80 bg-white text-brand-navy hover:border-brand-navy/30 hover:bg-neutral-100 transition-colors cursor-pointer" />
                  <CarouselNext className="relative inset-0 size-9 rounded-lg border-transparent bg-brand-red text-white shadow-[0_4px_12px_rgba(222,3,2,0.25)] hover:bg-brand-red-hover transition-all cursor-pointer" />
                </div>

                <div
                  className="flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Service carousel pagination"
                >
                  {SERVICES_LIST.map((service, idx) => (
                    <button
                      key={service.title}
                      type="button"
                      role="tab"
                      aria-selected={activeServiceSlide === idx}
                      aria-label={`Show ${service.title}`}
                      onClick={() => serviceApi?.scrollTo(idx)}
                      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        activeServiceSlide === idx
                          ? "w-6 bg-brand-red"
                          : "w-2 bg-neutral-300 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Carousel>
          </div>

          {/* Desktop Grid (>= md) */}
          <AppleStagger className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <AppleReveal className="max-w-2xl mx-auto text-center flex flex-col items-center mb-10 sm:mb-14">
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
                  <CarouselPrevious className="relative inset-0 size-10 rounded-lg border border-white/25 bg-brand-navy/70 text-white hover:border-white hover:bg-white/15 hover:text-white transition-colors cursor-pointer" />
                  <CarouselNext className="relative inset-0 size-10 rounded-lg border-transparent bg-linear-to-b from-brand-red to-brand-red-hover text-white shadow-[0_6px_20px_rgba(222,3,2,0.35)] outline-2 -outline-offset-2 outline-white/20 hover:from-brand-red-hover hover:to-brand-red-hover hover:text-white transition-all cursor-pointer" />
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
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                        activeSlide === idx
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
          <AppleStagger className="hidden lg:grid lg:grid-cols-4 gap-6">
            {CONNECTION_USE_CASES.map((item) => (
              <AppleStaggerItem key={item.label} className="flex">
                <UseCaseCard item={item} />
              </AppleStaggerItem>
            ))}
          </AppleStagger>

          {/* 7. CTA Banner (Red background, White text, 20px rounded container with Apple scroll-scale) */}
          <AppleScrollScale className="mt-16 md:mt-24">
            <div className="banner-sash rounded-2xl bg-brand-red text-white p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
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
                  className="btn-pill bg-linear-to-b from-brand-navy to-navy-80 text-white shadow-[0_6px_20px_rgba(1,13,59,0.22)] outline-2 -outline-offset-2 outline-white/20 hover:from-navy-80 hover:to-navy-80 w-full sm:w-auto rounded-lg font-medium"
                >
                  <span>Check availability</span>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/919003009353?text=Hi%20SASH%20Broadband%2C%20I%20would%20like%20to%20check%20fibre%20availability%20at%20my%20location."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill border border-white/40 bg-white/10 text-white hover:bg-white hover:text-brand-navy w-full sm:w-auto rounded-lg font-medium"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </AppleScrollScale>
        </div>
      </section>
    </>
  );
}

