"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpDown,
  Cable,
  Camera,
  CheckCircle2,
  ChevronRight,
  HardDrive,
  Headphones,
  Infinity,
  Layers,
  Lock,
  MapPin,
  Network,
  RotateCcw,
  Router,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import CardCanvasPattern, {
  CardPatternType,
} from "@/components/ui/card-canvas-pattern";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";
import {
  AppleReveal,
  AppleStagger,
  AppleStaggerItem,
} from "@/components/ui/apple-scroll";

const TOTAL_CLIENT_LOGOS = 34;

const CLIENT_LOGOS = Array.from({ length: TOTAL_CLIENT_LOGOS }, (_, index) => {
  const num = index + 1;
  return {
    id: `service-client-logo-${num}`,
    src: `/Marquee/${num}.jpg`,
    alt: `SASH Broadband client & partner ${num}`,
  };
});

export interface ServiceHeroProps {
  breadcrumbLabel: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  iconSrc?: string;
  iconAlt?: string;
  badgeLabel?: string;
  specPills?: string[];
  pattern?: CardPatternType;
  cardGradient?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  ratingScore?: string;
  ratingLabel?: string;
}

export interface ServiceDeliverableItem {
  title: string;
  description: string;
  tag?: string;
  points?: string[];
  iconName?: string;
}

interface ServiceHeroConfig {
  pattern: CardPatternType;
  cardGradient: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  ratingScore: string;
  ratingLabel: string;
}

const SERVICE_CONFIG_BY_LABEL: Record<string, ServiceHeroConfig> = {
  "Broadband Services": {
    pattern: "glyph",
    cardGradient:
      "linear-gradient(180deg, #E6CBF8 0%, #C1ABDA 15%, #9287B8 32%, #686193 50%, #444374 68%, #242859 84%, #081141 100%)",
    imageSrc: "/Hero/Hand Holding Broadband Dashboard Smartphone.png",
    imageAlt: "SASH Broadband ultra-speed network dashboard on smartphone",
    imageWidth: 1247,
    imageHeight: 1261,
    ratingScore: "4.6",
    ratingLabel: "rating in google",
  },
  "Leased Line": {
    pattern: "blue-arcs",
    cardGradient:
      "linear-gradient(180deg, #D4EBFC 0%, #B3D7F7 15%, #7CAFE0 32%, #4F83BE 50%, #2E5C9A 68%, #14376E 84%, #06183B 100%)",
    imageSrc: "/Hero/1to1.png",
    imageAlt: "1:1 Enterprise Dedicated Optical Leased Line infrastructure",
    imageWidth: 1856,
    imageHeight: 2304,
    ratingScore: "4.9",
    ratingLabel: "enterprise rating",
  },
  "SME Internet": {
    pattern: "glass",
    cardGradient:
      "linear-gradient(180deg, #D5F6EC 0%, #B2EAD8 15%, #7BCBBA 32%, #4DA59A 50%, #2E7976 68%, #144C51 84%, #06242B 100%)",
    imageSrc: "/Hero/Business.png",
    imageAlt: "High-speed SME business optical fibre internet setup",
    imageWidth: 1792,
    imageHeight: 2106,
    ratingScore: "4.8",
    ratingLabel: "business rating",
  },
  "CCTV Surveillance": {
    pattern: "stripes",
    cardGradient:
      "linear-gradient(180deg, #FCE0DC 0%, #F6C5BF 15%, #DF9893 32%, #B56B6D 50%, #89464F 68%, #572533 84%, #260C17 100%)",
    imageSrc: "/Hero/cctv.png",
    imageAlt: "24/7 Smart HD IP CCTV premises surveillance monitoring",
    imageWidth: 1792,
    imageHeight: 2070,
    ratingScore: "4.7",
    ratingLabel: "security rating",
  },
  "Intranet Solutions": {
    pattern: "purple-grid",
    cardGradient:
      "linear-gradient(180deg, #E6CBF8 0%, #C1ABDA 15%, #9287B8 32%, #686193 50%, #444374 68%, #242859 84%, #081141 100%)",
    imageSrc: "/Hero/intranet.png",
    imageAlt: "Secure Multi-Site Optical Intranet and Private WAN",
    imageWidth: 1840,
    imageHeight: 1842,
    ratingScore: "4.9",
    ratingLabel: "enterprise LAN rating",
  },
};

export function ServiceHero({
  breadcrumbLabel,
  eyebrow,
  titlePrefix,
  titleHighlight,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  iconSrc,
  iconAlt,
  pattern: explicitPattern,
  cardGradient: explicitCardGradient,
  imageSrc: explicitImageSrc,
  imageAlt: explicitImageAlt,
  imageWidth: explicitImageWidth,
  imageHeight: explicitImageHeight,
  ratingScore: explicitRatingScore,
  ratingLabel: explicitRatingLabel,
}: ServiceHeroProps) {
  const config =
    SERVICE_CONFIG_BY_LABEL[breadcrumbLabel] ||
    SERVICE_CONFIG_BY_LABEL["Broadband Services"];

  const currentPattern = explicitPattern || config.pattern;
  const resolvedCardGradient =
    explicitCardGradient ||
    config.cardGradient ||
    "linear-gradient(180deg, #E6CBF8 0%, #C1ABDA 15%, #9287B8 32%, #686193 50%, #444374 68%, #242859 84%, #081141 100%)";
  const resolvedImageSrc =
    explicitImageSrc ||
    config.imageSrc ||
    iconSrc ||
    "/Hero/Hand Holding Broadband Dashboard Smartphone.png";
  const resolvedImageAlt =
    explicitImageAlt || config.imageAlt || iconAlt || "SASH Service Showcase";
  const resolvedImageWidth = explicitImageWidth || config.imageWidth || 1792;
  const resolvedImageHeight = explicitImageHeight || config.imageHeight || 2070;
  const rating = explicitRatingScore || config.ratingScore || "4.8";
  const rLabel = explicitRatingLabel || config.ratingLabel || "rating in google";

  return (
    <section
      data-apple-manual="true"
      aria-labelledby="service-hero-heading"
      className="w-full bg-white py-2 sm:py-3 lg:py-4 font-sans antialiased"
    >
      {/* Increased Width Container (Max 1440px / 1520px on 2xl screens) matching Landing Page Hero */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Floating Deep-Rounded Banner Card matching Landing Page Hero */}
        <div
          className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-black/[0.06]"
          data-pattern={currentPattern}
          style={{ background: resolvedCardGradient }}
        >
          {/* Canvas Background Pattern Layer matching Landing Page Hero */}
          <div
            aria-hidden="true"
            data-pattern={currentPattern}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <CardCanvasPattern
              pattern={currentPattern}
              patternOpacity={
                currentPattern === "purple-grid" || currentPattern === "yellow-grid"
                  ? 0.75
                  : undefined
              }
            />
            {/* Subtle Content Contrast Scrim for Text Readability without altering the canvas pattern */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/15 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/45 lg:via-black/20 lg:to-transparent pointer-events-none"
            />
          </div>

          <div className="w-full min-h-auto lg:min-h-[520px] grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
            {/* Left Content Column (7 of 12 columns on desktop): Centered on mobile, left-aligned on desktop */}
            <div className="lg:col-span-7 flex flex-col justify-between items-center lg:items-start text-center lg:text-left p-6 sm:p-8 lg:p-10 xl:p-12 z-20">
              <div className="my-auto max-w-2xl w-full flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Eyebrow Badge: Solid Red Pill with White Text matching Landing Page Hero */}
                <div className="inline-flex min-h-6 items-center justify-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1 text-xs leading-none font-medium text-white tracking-wide">
                  {eyebrow}
                </div>

                {/* Headline: Clean, Crisp White Typography matching Landing Page Hero */}
                <h1
                  id="service-hero-heading"
                  className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] lg:leading-[50px] font-medium tracking-[-0.05px] text-white text-center lg:text-left text-balance lg:whitespace-nowrap"
                >
                  <span>{titlePrefix} </span>
                  <span>{titleHighlight}</span>
                </h1>

                {/* Subtitle Description */}
                <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-snug sm:leading-relaxed font-normal text-white/85 tracking-[-0.05px] text-center lg:text-left line-clamp-3 sm:line-clamp-2">
                  {description}
                </p>

                {/* Action Buttons: Centered on mobile, start-aligned on desktop */}
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  <Link
                    href={ctaHref}
                    className="inline-flex h-10 min-h-[40px] items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-hover px-5 sm:px-6 text-sm font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-all duration-150 ease-out active:scale-[0.97]"
                  >
                    <span>{ctaText}</span>
                    <ChevronRight className="size-3.5 stroke-[2.5]" />
                  </Link>

                  {secondaryCtaText && secondaryCtaHref && (
                    <Link
                      href={secondaryCtaHref}
                      className="group/sec inline-flex h-10 min-h-[40px] items-center justify-center gap-1.5 text-sm font-medium text-white hover:text-white/80 transition-colors"
                    >
                      <span>{secondaryCtaText}</span>
                      <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/sec:translate-x-0.5" />
                    </Link>
                  )}
                </div>

                {/* Social Proof Rating Row matching Landing Page Hero */}
                <div className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-3 w-full">
                  <AvatarGroup className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white/80">
                    <Avatar size="sm" className="size-7 ring-2 ring-white/80 overflow-hidden shadow-xs">
                      <AvatarImage
                        src="/avatars/avatar-1.png"
                        alt="Satisfied SASH broadband customer 1"
                      />
                      <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                        U1
                      </AvatarFallback>
                    </Avatar>
                    <Avatar size="sm" className="size-7 ring-2 ring-white/80 overflow-hidden shadow-xs">
                      <AvatarImage
                        src="/avatars/avatar-2.png"
                        alt="Satisfied SASH broadband customer 2"
                      />
                      <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                        U2
                      </AvatarFallback>
                    </Avatar>
                    <Avatar size="sm" className="size-7 ring-2 ring-white/80 overflow-hidden shadow-xs">
                      <AvatarImage
                        src="/avatars/avatar-3.png"
                        alt="Satisfied SASH broadband customer 3"
                      />
                      <AvatarFallback className="bg-red-10 text-brand-red text-[10px] font-medium">
                        U3
                      </AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                  <div className="flex items-center gap-1.5 text-sm font-normal text-white/90">
                    <Star className="size-4 text-amber-400 fill-amber-400" />
                    <span>
                      {rating} {rLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Column (5 of 12 columns on desktop): Centered on mobile, shifted on desktop */}
            <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[350px] lg:h-full min-h-[280px] sm:min-h-[350px] lg:min-h-[470px] flex items-end justify-center lg:justify-end overflow-hidden px-4 pt-2 pb-0 sm:p-4 lg:p-0">
              <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] h-full flex items-end justify-center lg:justify-end pointer-events-none select-none translate-x-0 lg:-translate-x-[20%]">
                <Image
                  src={resolvedImageSrc}
                  alt={resolvedImageAlt}
                  width={resolvedImageWidth}
                  height={resolvedImageHeight}
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 45vw"
                  className="w-full h-auto max-h-[260px] sm:max-h-[330px] lg:max-h-[515px] object-contain object-bottom mx-auto lg:mx-0 lg:object-bottom-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Single-Row Client Marquee placed directly below the Service Hero section
 */
export function SingleClientMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.fromTo(
        trackEl,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 55,
          ease: "none",
          repeat: -1,
          force3D: true,
        }
      );
    }, trackRef);

    return () => {
      tweenRef.current = null;
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0.25,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const renderGroup = (isDuplicate: boolean) => (
    <div
      aria-hidden={isDuplicate ? "true" : undefined}
      className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5"
    >
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={`${isDuplicate ? "dup" : "orig"}-${logo.id}`}
          className="h-18 w-36 sm:h-20 sm:w-42 shrink-0 rounded-xl bg-white px-4 py-2.5 flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Image
            src={logo.src}
            alt={isDuplicate ? "" : logo.alt}
            width={150}
            height={58}
            sizes="168px"
            className="max-h-11 sm:max-h-13 w-auto max-w-full object-contain select-none pointer-events-none"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      data-apple-manual="true"
      aria-label="Trusted clients and enterprise partners"
      className="bg-white border-b border-neutral-100 py-7 sm:py-9 overflow-hidden"
    >
      <div className="container-sash mb-4">
        <p className="text-center text-xs uppercase tracking-wider text-neutral-600 font-semibold">
          Trusted by Leading Domestic &amp; Corporate Clients Across Tamil Nadu
        </p>
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-white via-white/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-white via-white/85 to-transparent"
        />

        <div
          role="region"
          aria-label="Client logos scrolling marquee"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full overflow-hidden py-1"
        >
          <div
            ref={trackRef}
            className="flex w-max items-center will-change-transform"
          >
            {renderGroup(false)}
            {renderGroup(true)}
          </div>
        </div>
      </div>
    </section>
  );
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CARD_BG_GRADIENT =
  "bg-[linear-gradient(145deg,#FDEBEB_0%,#DE0302_52%,#B80201_100%)]";

const CARD_BOTTOM_BLEND =
  "pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.45)_40%,rgba(255,255,255,0.85)_75%,#FFFFFF_100%)]";

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

function getDeliverableIcon(title: string, iconName?: string) {
  const t = (iconName || title).toLowerCase();
  if (t.includes("address") || t.includes("map") || t.includes("feasibility") || t.includes("plan") || t.includes("select")) return MapPin;
  if (t.includes("splice") || t.includes("splicing") || t.includes("cable") || t.includes("drop")) return Cable;
  if (t.includes("router") || t.includes("ont") || t.includes("wifi")) return Router;
  if (t.includes("speed") || t.includes("activation") || t.includes("gauge") || t.includes("fast")) return Zap;
  if (t.includes("bandwidth") || t.includes("symmetrical") || t.includes("uncontended")) return ArrowUpDown;
  if (t.includes("static ip") || t.includes("pool") || t.includes("ipv4") || t.includes("server")) return Server;
  if (t.includes("sla") || t.includes("mttr") || t.includes("uptime") || t.includes("security") || t.includes("vlan") || t.includes("isolate")) return ShieldCheck;
  if (t.includes("scalable") || t.includes("scale") || t.includes("expand") || t.includes("grow")) return TrendingUp;
  if (t.includes("priority") || t.includes("qos") || t.includes("traffic") || t.includes("routing")) return Layers;
  if (t.includes("unlimited") || t.includes("fup") || t.includes("infinity")) return Infinity;
  if (t.includes("support") || t.includes("desk") || t.includes("commercial support")) return Headphones;
  if (t.includes("camera") || t.includes("cctv") || t.includes("surveillance")) return Camera;
  if (t.includes("nvr") || t.includes("storage") || t.includes("hard drive") || t.includes("record")) return HardDrive;
  if (t.includes("smartphone") || t.includes("mobile") || t.includes("ios") || t.includes("phone")) return Smartphone;
  if (t.includes("cabling") || t.includes("amc") || t.includes("maintenance") || t.includes("poe")) return Wrench;
  if (t.includes("branch") || t.includes("network") || t.includes("point-to-point") || t.includes("p2p") || t.includes("wan")) return Network;
  if (t.includes("lock") || t.includes("private")) return Lock;
  if (t.includes("file") || t.includes("voice") || t.includes("sharing") || t.includes("latency")) return Zap;
  if (t.includes("engineer") || t.includes("team") || t.includes("noc")) return Users;
  return Sparkles;
}

export function FlippableDeliverableCard({
  item,
  idx,
}: {
  item: ServiceDeliverableItem;
  idx: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = getDeliverableIcon(item.title, item.iconName);

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click originated from an interactive link or CTA inside, let it navigate
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button:not([data-flip-trigger])")) {
      return;
    }
    setIsFlipped((prev) => !prev);
  };

  return (
    <motion.article
      variants={cardItemVariants}
      className="group/flip relative h-full min-h-[440px] min-[360px]:min-h-[460px] sm:min-h-[480px] [perspective:1200px] select-none col-span-12 md:col-span-6 cursor-pointer"
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
      aria-label={item.title}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped && !shouldReduceMotion ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Face: Visual Stage + Title Only */}
        <div
          className="w-full h-full flex flex-col justify-between bg-white text-brand-navy border border-black/[0.08] rounded-[28px] shadow-none overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="relative z-10 p-0 flex-1 flex flex-col justify-between overflow-hidden h-full">
            {/* Top Stage with SASH Red Gradient Background (Edge-to-Edge) */}
            <div
              className={`relative w-full h-[240px] min-[360px]:h-[265px] sm:h-[295px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3.5 min-[360px]:p-4 sm:p-5 select-none group/stage`}
            >
              {/* Smooth Blend into Bottom White Section */}
              <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

              {/* Top Badges Bar: Step number + Tag */}
              <div className="relative z-20 w-full flex items-center justify-between gap-2">
                <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-navy px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs border border-white/20">
                  <span>0{idx + 1}</span>
                </span>

                {item.tag && (
                  <span className="inline-flex min-h-6 items-center rounded-full bg-white/90 backdrop-blur-xs px-2.5 text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-brand-navy shadow-xs border border-white/40">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Centered Visual Element: Glossy 3D Orb with Concentric Rings */}
              <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto py-1">
                {/* Subtle concentric rings */}
                <div className="absolute w-36 h-36 rounded-full border border-white/20 pointer-events-none" />
                <div className="absolute w-48 h-48 rounded-full border border-white/10 pointer-events-none" />

                {/* Glossy orb */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[radial-gradient(circle_at_35%_25%,#FFFFFF_0%,#FDEBEB_30%,#FCA5A5_60%,#DE0302_90%,#991B1B_100%)] shadow-[0_16px_36px_rgba(0,0,0,0.3),0_0_24px_rgba(222,3,2,0.4),inset_0_3px_5px_rgba(255,255,255,0.75),inset_0_-4px_8px_rgba(153,27,27,0.45)] flex items-center justify-center p-3 select-none transition-transform duration-300 ease-out group-hover/stage:scale-110">
                  {/* Specular gloss highlight crescent */}
                  <div className="pointer-events-none absolute top-1.5 left-2 w-7 h-4 rounded-full bg-gradient-to-b from-white/60 to-transparent blur-[1px]" />
                  <IconComponent className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
                </div>
              </div>
            </div>

            {/* Front Bottom: Title Only */}
            <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto w-full flex items-center justify-between">
              <div className="pr-2">
                <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wider mb-1">
                  {item.tag || `Feature 0${idx + 1}`}
                </p>
                <h3 className="text-brand-navy !text-lg min-[360px]:!text-xl sm:!text-2xl font-semibold tracking-normal">
                  {item.title}
                </h3>
              </div>
              <svg
                data-flip-trigger="true"
                aria-label="View card details"
                className="size-9 sm:size-10 shrink-0 cursor-pointer select-none"
                viewBox="0 0 40 40"
                fill="none"
              >
                <mask id={`plus-mask-service-${idx}`}>
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
                  mask={`url(#plus-mask-service-${idx})`}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Back Face: Description, Bullet Points, and Action */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between bg-white text-brand-navy border border-black/[0.08] rounded-[28px] shadow-none overflow-hidden p-7 sm:p-8 lg:p-9 z-20 cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col justify-between h-full bg-white">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6 sm:mb-7">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-red-10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <IconComponent className="size-6 sm:size-7" />
                </div>
                <span className="text-neutral-400 hover:text-brand-navy text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 transition-colors">
                  <RotateCcw className="size-3" />
                  <span className="hidden min-[400px]:inline">Flip back</span>
                </span>
              </div>

              <h3 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-tight leading-[1.28] mb-5 sm:mb-6">
                {item.title}
              </h3>

              {item.points && item.points.length > 0 && (
                <ul className="space-y-3 sm:space-y-3.5">
                  {item.points.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-neutral-800 text-sm sm:text-[15px] leading-relaxed"
                    >
                      <span className="size-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Bento Grid Deliverables Section for Service Pages matching 'Internet built for everything you do'
 */
export function ServiceDeliverablesSection({
  eyebrow,
  heading,
  subtitle,
  items,
}: {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  items: ServiceDeliverableItem[];
}) {
  return (
    <section
      data-apple-manual="true"
      className="bg-white text-brand-navy section-padding"
    >
      <div className="container-sash">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16 lg:mb-20 px-2 sm:px-0">
          <p className="eyebrow-label text-brand-red mb-3.5">{eyebrow}</p>
          <h2 className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-neutral-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* 12-Column Grid with 6-col flippable bento cards */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 items-stretch"
        >
          {items.map((item, idx) => (
            <FlippableDeliverableCard
              key={item.title}
              item={item}
              idx={idx}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
