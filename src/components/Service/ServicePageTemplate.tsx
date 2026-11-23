"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
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
  Video,
  Wifi,
  Wrench,
  Zap,
  Activity,
  Bell,
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
  backgroundImageSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  ratingScore?: string;
  ratingLabel?: string;
}

export type DeliverableMediaTheme = "peach" | "sky" | "purple" | "emerald";

export interface DeliverableMediaRow {
  id: string;
  label: string;
  sublabel?: string;
  status: string;
  statusTone: "green" | "blue" | "orange";
}

export interface DeliverableMediaConfig {
  theme: DeliverableMediaTheme;
  mediaType: "status-list" | "metric-chart" | "chat-feed";
  focalBadgeText?: string;
  rows?: DeliverableMediaRow[];
  metricValue?: string;
  metricDelta?: string;
  metricSubtitle?: string;
  brandMessage?: string;
  brandTimestamp?: string;
  replyMessage?: string;
  replyAuthor?: string;
}

export interface ServiceDeliverableItem {
  title: string;
  description: string;
  tag?: string;
  points?: string[];
  iconName?: string;
  mediaConfig?: DeliverableMediaConfig;
}

interface ServiceHeroConfig {
  pattern: CardPatternType;
  cardGradient: string;
  backgroundImageSrc?: string;
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
  "About Us": {
    pattern: "blue-arcs",
    cardGradient:
      "linear-gradient(180deg, #D4EBFC 0%, #B3D7F7 15%, #7CAFE0 32%, #4F83BE 50%, #2E5C9A 68%, #14376E 84%, #06183B 100%)",
    imageSrc: "/Hero/Business.png",
    imageAlt: "SASH Broadband licensed Class-B ISP operations across Tamil Nadu",
    imageWidth: 1792,
    imageHeight: 2106,
    ratingScore: "4.9",
    ratingLabel: "verified ISP rating",
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
  backgroundImageSrc: explicitBackgroundImageSrc,
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
  const resolvedBackgroundImageSrc =
    explicitBackgroundImageSrc || config.backgroundImageSrc;
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
          className="relative w-full h-[700px] sm:h-[740px] lg:h-[520px] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-black/[0.06] select-none"
          data-pattern={currentPattern}
          style={{ background: resolvedCardGradient }}
        >
          {/* Background Layer: Custom Image or Procedural Canvas Pattern */}
          {resolvedBackgroundImageSrc ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            >
              <Image
                src={resolvedBackgroundImageSrc}
                alt=""
                fill
                priority
                sizes="(max-width: 1520px) 100vw, 1520px"
                className="object-cover object-center select-none"
              />
              {/* Subtle Content Contrast Scrim for Text Readability without altering the visual backdrop */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10 lg:from-black/50 lg:via-transparent lg:to-transparent pointer-events-none"
              />
            </div>
          ) : (
            /* Canvas Background Pattern Layer matching Landing Page Hero */
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
          )}

          <div className="w-full h-full flex flex-col justify-between lg:grid lg:grid-cols-12 items-stretch relative z-10">
            {/* Left Content Column (7 of 12 columns on desktop): Centered on mobile, left-aligned on desktop */}
            <div className="lg:col-span-7 flex flex-col justify-between items-center lg:items-start text-center lg:text-left p-5 sm:p-8 lg:p-10 xl:p-12 z-20 flex-1 lg:flex-none min-h-0">
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

            {/* Right Side Column (5 of 12 columns on desktop): Centered on mobile, right-aligned on desktop */}
            <div className="lg:col-span-5 relative w-full h-[260px] sm:h-[320px] lg:h-full min-h-0 flex items-end justify-center lg:justify-end px-4 pt-2 pb-0 sm:px-6 sm:pt-4 sm:pb-0 lg:p-0 shrink-0">
              <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] xl:max-w-[560px] h-full flex items-end justify-center lg:justify-end pointer-events-none select-none translate-x-0">
                <Image
                  src={resolvedImageSrc}
                  alt={resolvedImageAlt}
                  width={resolvedImageWidth}
                  height={resolvedImageHeight}
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 520px"
                  className="block w-full h-auto max-h-[260px] sm:max-h-[320px] lg:max-h-[525px] object-contain object-bottom align-bottom mx-auto lg:mx-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { SingleClientMarquee } from "./SingleClientMarquee";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CARD_BG_GRADIENT =
  "bg-[linear-gradient(145deg,#FFF8F8_0%,#FEEBEA_40%,#FDD7D5_75%,#FCC7C3_100%)]";

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

const MEDIA_THEME_STYLES: Record<
  DeliverableMediaTheme,
  {
    baseBg: string;
    blob1: string;
    blob2: string;
    blob3: string;
    focalGlow: string;
    focalIconColor: string;
    ringBorder: string;
    chipBg: string;
  }
> = {
  peach: {
    baseBg: "bg-[#FFF6EE]",
    blob1: "bg-[#FDBA74]",
    blob2: "bg-[#FB923C]",
    blob3: "bg-[#FECDD3]",
    focalGlow: "from-orange-400/60 via-amber-300/40 to-transparent",
    focalIconColor: "text-orange-600",
    ringBorder: "border-orange-400/20",
    chipBg: "bg-orange-500/10 border-orange-500/20",
  },
  sky: {
    baseBg: "bg-[#EFF8FF]",
    blob1: "bg-[#7DD3FC]",
    blob2: "bg-[#38BDF8]",
    blob3: "bg-[#BFDBFE]",
    focalGlow: "from-sky-400/60 via-cyan-300/40 to-transparent",
    focalIconColor: "text-sky-600",
    ringBorder: "border-sky-400/20",
    chipBg: "bg-sky-500/10 border-sky-500/20",
  },
  purple: {
    baseBg: "bg-[#FAF2FF]",
    blob1: "bg-[#D8B4FE]",
    blob2: "bg-[#F472B6]",
    blob3: "bg-[#C4B5FD]",
    focalGlow: "from-purple-400/60 via-pink-300/40 to-transparent",
    focalIconColor: "text-purple-600",
    ringBorder: "border-purple-400/20",
    chipBg: "bg-purple-500/10 border-purple-500/20",
  },
  emerald: {
    baseBg: "bg-[#ECFDF5]",
    blob1: "bg-[#6EE7B7]",
    blob2: "bg-[#34D399]",
    blob3: "bg-[#A7F3D0]",
    focalGlow: "from-emerald-400/60 via-teal-300/40 to-transparent",
    focalIconColor: "text-emerald-600",
    ringBorder: "border-emerald-400/20",
    chipBg: "bg-emerald-500/10 border-emerald-500/20",
  },
};

function MediaStatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "blue" | "orange";
}) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    blue: "bg-sky-50 text-sky-700 border-sky-200/80",
    orange: "bg-orange-50 text-orange-700 border-orange-200/80",
  }[tone];

  const dotColor = {
    green: "bg-emerald-500",
    blue: "bg-sky-500",
    orange: "bg-orange-500",
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium leading-none shrink-0 ${styles}`}
    >
      <span className={`size-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}

export function FlippableDeliverableCard({
  item,
  idx,
  autoFlip = false,
}: {
  item: ServiceDeliverableItem;
  idx: number;
  autoFlip?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.35 });
  const [isFlipped, setIsFlipped] = useState(false);
  const hasUserInteracted = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = getDeliverableIcon(item.title, item.iconName);

  useEffect(() => {
    if (!autoFlip || hasUserInteracted.current) return;
    if (isInView) {
      const timer = setTimeout(() => {
        if (!hasUserInteracted.current) {
          setIsFlipped(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, autoFlip]);

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click originated from an interactive link or CTA inside, let it navigate
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button:not([data-flip-trigger])")) {
      return;
    }
    hasUserInteracted.current = true;
    setIsFlipped((prev) => !prev);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardItemVariants}
      className="group/flip relative h-full min-h-[440px] min-[360px]:min-h-[460px] sm:min-h-[480px] [perspective:1200px] select-none col-span-12 md:col-span-6 cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          hasUserInteracted.current = true;
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
            {/* Top Media Stage */}
            {item.mediaConfig ? (
              <div
                className={`relative w-full h-[240px] min-[360px]:h-[265px] sm:h-[295px] overflow-hidden ${
                  MEDIA_THEME_STYLES[item.mediaConfig.theme].baseBg
                } flex flex-col justify-between p-3.5 min-[360px]:p-4 sm:p-5 select-none group/stage`}
              >
                {/* LAYER 1: Mesh Gradient Background (3 blurred radial blobs) */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-10 -left-10 w-48 h-48 rounded-full ${
                    MEDIA_THEME_STYLES[item.mediaConfig.theme].blob1
                  } opacity-60 blur-[55px]`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-10 -right-10 w-52 h-52 rounded-full ${
                    MEDIA_THEME_STYLES[item.mediaConfig.theme].blob2
                  } opacity-60 blur-[60px]`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-10 left-1/3 w-44 h-44 rounded-full ${
                    MEDIA_THEME_STYLES[item.mediaConfig.theme].blob3
                  } opacity-60 blur-[50px]`}
                />

                {/* Smooth Blend into Bottom White Section */}
                <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

                {/* LAYER 3: Decorative Dot Grid & Concentric Rings */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(15, 23, 42, 0.16) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                    maskImage:
                      "radial-gradient(circle at 50% 45%, black 35%, transparent 82%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 45%, black 35%, transparent 82%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border ${
                    MEDIA_THEME_STYLES[item.mediaConfig.theme].ringBorder
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border ${
                    MEDIA_THEME_STYLES[item.mediaConfig.theme].ringBorder
                  } opacity-60`}
                />

                {/* Decorative Floating Micro-Icons with slight rotation & drop shadows */}
                <div
                  aria-hidden="true"
                  className="absolute top-13 left-4 sm:left-6 z-20 -rotate-6 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(15,23,42,0.10)] border border-white transition-transform duration-300 group-hover/stage:-translate-y-0.5"
                >
                  {item.mediaConfig.theme === "peach" && (
                    <Video className="size-3.5 text-orange-500" />
                  )}
                  {item.mediaConfig.theme === "sky" && (
                    <HardDrive className="size-3.5 text-sky-600" />
                  )}
                  {item.mediaConfig.theme === "purple" && (
                    <Bell className="size-3.5 text-purple-600" />
                  )}
                  {item.mediaConfig.theme === "emerald" && (
                    <Cable className="size-3.5 text-emerald-600" />
                  )}
                </div>
                <div
                  aria-hidden="true"
                  className="absolute top-13 right-4 sm:right-6 z-20 rotate-6 rounded-xl bg-white/90 p-2 shadow-[0_6px_16px_rgba(15,23,42,0.10)] border border-white transition-transform duration-300 group-hover/stage:translate-y-0.5"
                >
                  {item.mediaConfig.theme === "peach" && (
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                  )}
                  {item.mediaConfig.theme === "sky" && (
                    <Activity className="size-3.5 text-sky-500" />
                  )}
                  {item.mediaConfig.theme === "purple" && (
                    <Wifi className="size-3.5 text-pink-500" />
                  )}
                  {item.mediaConfig.theme === "emerald" && (
                    <Wrench className="size-3.5 text-teal-600" />
                  )}
                </div>

                {/* Top Badges Bar + LAYER 4: Glowing Focal Element */}
                <div className="relative z-20 w-full flex items-center justify-between gap-2">
                  <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-navy px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs border border-white/20">
                    <span>0{idx + 1}</span>
                  </span>

                  {/* Glowing Focal Pill */}
                  <div className="relative flex items-center justify-center">
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-2.5 rounded-full bg-radial ${
                        MEDIA_THEME_STYLES[item.mediaConfig.theme].focalGlow
                      } blur-md`}
                    />
                    <div className="relative flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-[0_8px_20px_rgba(15,23,42,0.10)] border border-white">
                      <span
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          MEDIA_THEME_STYLES[item.mediaConfig.theme].chipBg
                        }`}
                      >
                        <IconComponent
                          className={`size-3 ${
                            MEDIA_THEME_STYLES[item.mediaConfig.theme]
                              .focalIconColor
                          }`}
                        />
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-neutral-800">
                        {item.mediaConfig.focalBadgeText || item.tag}
                      </span>
                    </div>
                  </div>

                  {item.tag && (
                    <span className="hidden sm:inline-flex min-h-6 items-center rounded-full bg-white/90 backdrop-blur-xs px-2.5 text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-brand-navy shadow-xs border border-white/40">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* LAYER 2: Floating Frosted-Glass UI Mockup (Real HTML/SVG, bottom-cropped & masked) */}
                <div
                  className="absolute inset-x-4 sm:inset-x-8 top-[58px] sm:top-[64px] bottom-[-12px] z-20 rounded-[16px] bg-white/85 backdrop-blur-[14px] border border-white/90 shadow-[0_12px_32px_rgba(20,20,50,0.08)] p-3.5 sm:p-4 flex flex-col justify-between"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, #000 55%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 55%, transparent 100%)",
                  }}
                >
                  {/* Status List Mockup (Card 1 & Card 4) */}
                  {item.mediaConfig.mediaType === "status-list" &&
                    item.mediaConfig.rows && (
                      <div className="space-y-2 sm:space-y-2.5">
                        {item.mediaConfig.rows.map((row, rIdx) => {
                          const isLast =
                            rIdx === item.mediaConfig!.rows!.length - 1;
                          return (
                            <div
                              key={row.id}
                              className={`flex items-center justify-between gap-2 rounded-xl bg-white/95 px-3 py-2 sm:py-2.5 border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                                isLast ? "blur-[1.5px] opacity-75" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg border ${
                                    MEDIA_THEME_STYLES[item.mediaConfig!.theme]
                                      .chipBg
                                  }`}
                                >
                                  <IconComponent
                                    className={`size-3.5 sm:size-4 ${
                                      MEDIA_THEME_STYLES[
                                        item.mediaConfig!.theme
                                      ].focalIconColor
                                    }`}
                                  />
                                </span>
                                <div className="min-w-0">
                                  <p className="text-xs sm:text-[13px] font-medium text-neutral-800 truncate leading-tight">
                                    {row.label}
                                  </p>
                                  {row.sublabel && (
                                    <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate leading-tight mt-0.5">
                                      {row.sublabel}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <MediaStatusPill
                                label={row.status}
                                tone={row.statusTone}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}

                  {/* Metric + Smooth SVG Curve Mockup (Card 2) */}
                  {item.mediaConfig.mediaType === "metric-chart" && (
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex items-start justify-between gap-2 px-1">
                        <div>
                          <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                            {item.mediaConfig.metricSubtitle}
                          </p>
                          <div className="text-2xl sm:text-[28px] font-bold tracking-tight text-neutral-900 leading-tight mt-0.5">
                            {item.mediaConfig.metricValue}
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200/80 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-sky-700">
                          <Sparkles className="size-3 text-sky-500" />
                          {item.mediaConfig.metricDelta}
                        </span>
                      </div>

                      <div className="relative w-full h-[105px] sm:h-[125px] mt-1">
                        <svg
                          viewBox="0 0 280 95"
                          className="w-full h-full overflow-visible"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient
                              id={`skyChartArea-${idx}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#0284C7"
                                stopOpacity="0.28"
                              />
                              <stop
                                offset="100%"
                                stopColor="#38BDF8"
                                stopOpacity="0.0"
                              />
                            </linearGradient>
                            <linearGradient
                              id={`skyChartLine-${idx}`}
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="0"
                            >
                              <stop offset="0%" stopColor="#38BDF8" />
                              <stop offset="50%" stopColor="#0284C7" />
                              <stop offset="100%" stopColor="#0369A1" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="0"
                            y1="24"
                            x2="280"
                            y2="24"
                            stroke="rgba(15,23,42,0.05)"
                            strokeDasharray="3 3"
                          />
                          <line
                            x1="0"
                            y1="56"
                            x2="280"
                            y2="56"
                            stroke="rgba(15,23,42,0.05)"
                            strokeDasharray="3 3"
                          />
                          <path
                            d="M 0 72 C 45 64, 75 38, 115 44 C 155 48, 185 18, 230 22 C 250 24, 265 12, 280 10 L 280 95 L 0 95 Z"
                            fill={`url(#skyChartArea-${idx})`}
                          />
                          <path
                            d="M 0 72 C 45 64, 75 38, 115 44 C 155 48, 185 18, 230 22 C 250 24, 265 12, 280 10"
                            fill="none"
                            stroke={`url(#skyChartLine-${idx})`}
                            strokeWidth="2.75"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="230"
                            cy="22"
                            r="6.5"
                            fill="#0284C7"
                            fillOpacity="0.2"
                          />
                          <circle
                            cx="230"
                            cy="22"
                            r="3.5"
                            fill="#FFFFFF"
                            stroke="#0284C7"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Chat Bubble Feed Mockup (Card 3) */}
                  {item.mediaConfig.mediaType === "chat-feed" && (
                    <div className="flex flex-col gap-2.5 sm:gap-3 pt-0.5">
                      <div className="flex items-start gap-2.5">
                        <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-[11px] font-bold shadow-xs">
                          S
                        </div>
                        <div className="rounded-2xl rounded-tl-xs bg-white px-3.5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-purple-100 max-w-[85%]">
                          <p className="text-xs sm:text-[13px] font-medium text-neutral-800 leading-snug">
                            {item.mediaConfig.brandMessage}
                          </p>
                          <span className="block text-[10px] text-purple-500 font-medium mt-0.5">
                            {item.mediaConfig.brandTimestamp}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end justify-end gap-2.5">
                        <div className="rounded-2xl rounded-br-xs bg-linear-to-r from-orange-500 to-pink-500 text-white px-3.5 py-2.5 shadow-[0_6px_16px_rgba(249,115,22,0.25)] max-w-[82%]">
                          <p className="text-xs sm:text-[13px] font-medium leading-snug">
                            {item.mediaConfig.replyMessage}
                          </p>
                        </div>
                        <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 border border-white text-[10px] font-bold shadow-xs">
                          {item.mediaConfig.replyAuthor}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50/80 border border-purple-100/70 text-[11px] text-purple-700">
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">
                          Instant push alerts &amp; zero-lag SASH fibre playback
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Default Top Stage with SASH Red Gradient Background (Edge-to-Edge) */
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
            )}

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
              autoFlip={idx === 0}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
