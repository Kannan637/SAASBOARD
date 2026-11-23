"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpDown,
  BatteryFull,
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
  Signal,
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
  AvatarBadge,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

export type DeliverableAnimatedVariant =
  | "cctv-camera"
  | "nvr-blocks"
  | "phone-live"
  | "poe-cabling";

export interface DeliverableMediaConfig {
  variant: DeliverableAnimatedVariant;
  bg1: string;
  bg2: string;
  acc: string;
  pillMessages: [string, string, string];
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

function AnimatedDeliverableMediaStage({
  config,
  shouldReduceMotion,
}: {
  config: DeliverableMediaConfig;
  shouldReduceMotion: boolean;
}) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % config.pillMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.pillMessages.length, shouldReduceMotion]);

  // CARD 3: Live Smartphone Monitoring — Uses exact WhySash FibreSpeedCard iPhone hardware mockup geometry
  if (config.variant === "phone-live") {
    return (
      <div
        className={`relative w-full h-[240px] min-[360px]:h-[265px] sm:h-[295px] overflow-hidden ${CARD_BG_GRADIENT} pt-3 min-[360px]:pt-4 sm:pt-6 px-3 flex justify-center select-none`}
      >
        <style>{`
          @keyframes sashPhonePush {
            0%, 8% { transform: translateY(-18px); opacity: 0; }
            16%, 84% { transform: translateY(0px); opacity: 1; }
            94%, 100% { transform: translateY(-6px); opacity: 0; }
          }
          @keyframes sashPhoneLive {
            0%, 20% { transform: scale(0.95) translateY(8px); opacity: 0; }
            30%, 84% { transform: scale(1) translateY(0px); opacity: 1; }
            94%, 100% { transform: scale(0.97) translateY(4px); opacity: 0; }
          }
          @keyframes sashWaveBar {
            0%, 100% { transform: scaleY(0.35); }
            50% { transform: scaleY(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .anim-sash-push, .anim-sash-live, .anim-sash-wave {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Smooth Blend into Bottom White Section */}
        <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-20`} />

        {/* iPhone Hardware Mockup (Matched 1:1 to WhySash FibreSpeedCard) */}
        <div className="relative z-10 mx-auto w-[270px] min-[360px]:w-[300px] sm:w-[340px] shrink-0">
          {/* Visible Viewport Window */}
          <div className="relative h-[228px] min-[360px]:h-[249px] sm:h-[271px] w-full overflow-hidden">
            {/* Full iPhone Container */}
            <div className="relative h-[530px] min-[360px]:h-[590px] sm:h-[665px] w-full">
              {/* Inner iOS Screen */}
              <div className="absolute left-[2.9%] right-[2.9%] top-[1.4%] bottom-[1.4%] z-10 overflow-hidden rounded-[38px] min-[360px]:rounded-[46px] sm:rounded-[52px] bg-[#F8F9FC] flex flex-col items-center">
                {/* iOS Status Bar */}
                <div className="w-full shrink-0 flex h-[34px] min-[360px]:h-[38px] sm:h-[44px] items-center justify-between px-5 min-[360px]:px-7 sm:px-8 pt-1.5 min-[360px]:pt-2">
                  <span className="text-[11px] min-[360px]:text-[12px] sm:text-[13px] font-medium text-brand-navy">
                    9:41
                  </span>
                  <div className="flex items-center gap-1.5 text-brand-navy">
                    <Signal size={13} />
                    <Wifi size={13} />
                    <BatteryFull size={15} />
                  </div>
                </div>

                {/* iOS App Viewport Content */}
                <div className="w-full px-3.5 min-[360px]:px-4 sm:px-5 pt-1.5 sm:pt-2 flex flex-col gap-2 sm:gap-2.5">
                  {/* 1. Sliding Push Notification Card */}
                  <div
                    className="anim-sash-push rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_8px_20px_rgba(1,13,59,0.08)] border border-[#E2E5EE] flex items-center gap-2.5"
                    style={{
                      animation:
                        "sashPhonePush 5.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                    }}
                  >
                    <Avatar size="sm" className="size-7 sm:size-8 rounded-xl bg-brand-red text-white shrink-0 after:hidden">
                      <AvatarFallback className="rounded-xl bg-brand-red text-white text-[10px] font-semibold">
                        <Camera className="size-3.5 sm:size-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[11px] sm:text-[12px] font-medium text-brand-navy truncate">
                          Motion · Entrance Cam 01
                        </p>
                        <span className="text-[9.5px] font-mono text-neutral-600 shrink-0">
                          now
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-neutral-600 truncate mt-0.5">
                        HD clip saved to NVR storage
                      </p>
                    </div>
                  </div>

                  {/* 2. Popping Live 4K Stream Card */}
                  <div
                    className="anim-sash-live rounded-2xl bg-brand-navy text-white p-3 sm:p-3.5 shadow-[0_12px_26px_rgba(1,13,59,0.18)] flex flex-col justify-between h-[104px] min-[360px]:h-[114px] sm:h-[124px] relative overflow-hidden"
                    style={{
                      animation:
                        "sashPhoneLive 5.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                    }}
                  >
                    {/* Subtle optical grid inside stream */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                        backgroundSize: "12px 12px",
                      }}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <Badge
                        variant="live"
                        className="bg-brand-red text-white border-transparent px-2 py-0.5 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider"
                      >
                        <span className="size-1.5 rounded-full bg-white animate-pulse" />
                        LIVE 4K
                      </Badge>
                      <span className="font-mono text-[9.5px] sm:text-[10px] text-white/85 bg-white/12 px-2 py-0.5 rounded-full border border-white/15">
                        0 ms Fibre
                      </span>
                    </div>

                    {/* Bottom Stream Telemetry Bar */}
                    <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-white/12">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Video className="size-3.5 text-red-300 shrink-0" />
                        <span className="text-[10.5px] sm:text-[11.5px] font-medium text-white truncate">
                          {config.pillMessages[msgIndex]}
                        </span>
                      </div>
                      {/* Animated Live Bitrate Bars */}
                      <div className="flex items-end gap-0.5 h-3 shrink-0" aria-hidden="true">
                        {[0.45, 0.9, 0.65, 1, 0.55].map((h, bIdx) => (
                          <span
                            key={bIdx}
                            className="anim-sash-wave w-0.5 bg-emerald-400 rounded-full origin-bottom"
                            style={{
                              height: `${h * 12}px`,
                              animation: `sashWaveBar ${0.8 + bIdx * 0.15}s ease-in-out infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware iPhone Frame Overlay (/Frame/Iphone Frame.png) */}
              <Image
                src="/Frame/Iphone%20Frame.png"
                alt="iPhone Frame"
                aria-hidden="true"
                width={484}
                height={876}
                priority
                className="pointer-events-none select-none absolute left-[-126.45%] top-[-3.2%] w-[352.48%] h-[105.25%] max-w-none z-20"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-[240px] min-[360px]:h-[265px] sm:h-[295px] overflow-hidden ${CARD_BG_GRADIENT} flex flex-col justify-between p-3.5 min-[360px]:p-4 sm:p-5 select-none group/stage`}
    >
      {/* Embedded Keyframe Animations + Reduced Motion Override */}
      <style>{`
        @keyframes sashScanSweep {
          0% { top: 6%; opacity: 0.25; }
          50% { opacity: 0.9; }
          100% { top: 88%; opacity: 0.25; }
        }
        @keyframes sashTargetTrack {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(88px); }
        }
        @keyframes sashLedPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes sashNvrCell {
          0%, 10% { background-color: #F3F4F7; border-color: #E2E5EE; }
          25%, 85% { background-color: #010D3B; border-color: #010D3B; }
          96%, 100% { background-color: #F3F4F7; border-color: #E2E5EE; }
        }
        @keyframes sashPoePulse {
          0% { stroke-dashoffset: 220; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes sashPillSlide {
          0% { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-sash-scan,
          .anim-sash-track,
          .anim-sash-led,
          .anim-sash-cell,
          .anim-sash-poe,
          .anim-sash-pill {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Smooth Blend into Bottom White Section (Exact match to WhySash) */}
      <div aria-hidden="true" className={`${CARD_BOTTOM_BLEND} z-10`} />

      {/* Top Header Bar: Brand Navy Step/Feature Pill + Cycling Status Pill */}
      <div className="relative z-20 w-full flex items-center justify-between gap-2">
        <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-navy px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs border border-white/20">
          {config.variant === "cctv-camera" && <Camera className="w-3.5 h-3.5" />}
          {config.variant === "nvr-blocks" && <HardDrive className="w-3.5 h-3.5" />}
          {config.variant === "poe-cabling" && <Wrench className="w-3.5 h-3.5" />}
          <span>
            {config.variant === "cctv-camera" && "4K IP67 Optics"}
            {config.variant === "nvr-blocks" && "24/7 NVR Retention"}
            {config.variant === "poe-cabling" && "PoE+ & Local AMC"}
          </span>
        </span>

        {/* Frosted Cycling Status Badge */}
        <Badge
          variant="outline"
          className="min-h-6 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] min-[360px]:text-[11px] font-medium text-brand-navy shadow-xs border border-white/60 gap-1.5"
        >
          <span className="size-1.5 rounded-full bg-brand-red animate-pulse shrink-0" />
          <span
            key={msgIndex}
            className="anim-sash-pill truncate max-w-[160px] sm:max-w-[210px]"
            style={{
              animation:
                "sashPillSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {config.pillMessages[msgIndex]}
          </span>
        </Badge>
      </div>

      {/* CENTER ANIMATED PRODUCT SUBJECT MODULE */}
      <div className="relative z-20 flex-1 w-full flex items-center justify-center my-auto pt-2 pb-1">
        {/* CARD 1: Indoor & Outdoor HD IP Cameras */}
        {config.variant === "cctv-camera" && (
          <Card className="w-full max-w-[360px] p-0 gap-0 rounded-[20px] bg-white/95 backdrop-blur-md border border-white ring-1 ring-brand-navy/[0.06] shadow-[0_14px_34px_rgba(1,13,59,0.12)] overflow-hidden">
            {/* Top Bar inside Camera Card */}
            <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 border-b border-[#E2E5EE] bg-white">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-10 text-brand-red">
                  <Video className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] sm:text-[13px] font-medium text-brand-navy truncate leading-tight">
                    Main Gate · Cam 01
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge
                  variant="live"
                  className="bg-brand-red text-white border-transparent px-2 py-0.5 text-[9.5px] font-mono uppercase"
                >
                  <span
                    className="anim-sash-led size-1.5 rounded-full bg-white"
                    style={{
                      animation: "sashLedPulse 1.2s ease-in-out infinite",
                    }}
                  />
                  REC 4K
                </Badge>
              </div>
            </div>

            {/* Optical Viewfinder Area */}
            <div className="relative h-[108px] sm:h-[122px] w-full bg-[#F8F9FC] px-4 py-2.5 flex items-center justify-between overflow-hidden">
              {/* Halftone dot matrix backdrop */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(1, 13, 59, 0.12) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Smooth Vertical Scan Sweep */}
              <div
                aria-hidden="true"
                className="anim-sash-scan pointer-events-none absolute inset-x-0 h-[1.5px] bg-linear-to-r from-transparent via-[#5551FF] to-transparent shadow-[0_0_8px_#5551FF]"
                style={{
                  animation:
                    "sashScanSweep 3.4s ease-in-out infinite alternate",
                }}
              />

              {/* Animated AI Detection Bounding Box */}
              <div
                className="anim-sash-track relative z-10 flex flex-col items-start"
                style={{
                  animation: "sashTargetTrack 5s ease-in-out infinite",
                }}
              >
                <span className="mb-1 inline-flex items-center gap-1 rounded-md bg-[#5551FF] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white shadow-2xs">
                  Person · 99%
                </span>
                <div className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-xl border-2 border-[#5551FF] bg-white/85 backdrop-blur-2xs shadow-[0_6px_16px_rgba(85,81,255,0.18)] flex items-center justify-center">
                  <span className="absolute -top-0.5 -left-0.5 size-2 border-t-2 border-l-2 border-brand-navy" />
                  <span className="absolute -top-0.5 -right-0.5 size-2 border-t-2 border-r-2 border-brand-navy" />
                  <span className="absolute -bottom-0.5 -left-0.5 size-2 border-b-2 border-l-2 border-brand-navy" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2 border-b-2 border-r-2 border-brand-navy" />
                  <Users className="size-6 text-brand-navy" />
                </div>
              </div>

              {/* Right Hardware Telemetry Pills */}
              <div className="relative z-10 flex flex-col items-end gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-[10px] font-mono font-medium text-brand-navy border border-[#E2E5EE] shadow-2xs">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  IP67 Weatherproof
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-[10px] font-mono font-medium text-neutral-600 border border-[#E2E5EE] shadow-2xs">
                  <ShieldCheck className="size-3 text-[#5551FF]" />
                  30m Smart IR Night
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* CARD 2: NVR Storage & Cloud Backup */}
        {config.variant === "nvr-blocks" && (
          <Card className="w-full max-w-[360px] p-0 gap-0 rounded-[20px] bg-white/95 backdrop-blur-md border border-white ring-1 ring-brand-navy/[0.06] shadow-[0_14px_34px_rgba(1,13,59,0.12)] overflow-hidden">
            {/* Top Metric Row */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E5EE] bg-white">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-semibold text-brand-navy tracking-tight leading-none">
                    60+ Days
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 font-medium">
                    24/7 Loop
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-0.5">
                  Surveillance-grade NVR retention
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-[#F3F4F7] text-brand-navy border-[#E2E5EE] font-mono text-[10px] px-2.5 py-1"
              >
                H.265+ · -50% Size
              </Badge>
            </div>

            {/* 30-Day Sequential Storage Block Matrix */}
            <div className="px-4 py-3 bg-[#F8F9FC]">
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 mb-2">
                <span>30-DAY BLOCK TIMELINE</span>
                <span className="text-brand-navy font-medium">FIFO Healthy</span>
              </div>
              <div
                className="grid grid-cols-10 gap-1.5"
                role="img"
                aria-label="30-day NVR storage block timeline filling sequentially"
              >
                {Array.from({ length: 30 }).map((_, bIdx) => (
                  <span
                    key={bIdx}
                    className="anim-sash-cell h-3.5 sm:h-4 rounded-[4px] border border-[#E2E5EE] bg-[#F3F4F7]"
                    style={{
                      animation: "sashNvrCell 6s ease-in-out infinite",
                      animationDelay: `${bIdx * 0.11}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* CARD 4: Clean Cabling & Local AMC Support */}
        {config.variant === "poe-cabling" && (
          <Card className="w-full max-w-[360px] p-0 gap-0 rounded-[20px] bg-white/95 backdrop-blur-md border border-white ring-1 ring-brand-navy/[0.06] shadow-[0_14px_34px_rgba(1,13,59,0.12)] overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E2E5EE] bg-white">
              <div className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-10 text-brand-red">
                  <Cable className="size-3.5" />
                </span>
                <span className="text-[12px] sm:text-[13px] font-medium text-brand-navy">
                  Cat6 PoE+ Conduit Topology
                </span>
              </div>
              <Badge
                variant="success"
                className="bg-emerald-500/12 text-emerald-700 border-emerald-500/25 font-mono text-[10px] px-2 py-0.5"
              >
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                48V Active
              </Badge>
            </div>

            {/* Pipeline Diagram (Inspired by IntegrationsSection ConnectorLines) */}
            <div className="px-3.5 py-2.5 bg-[#F8F9FC] flex items-center justify-center">
              <svg
                viewBox="0 0 310 98"
                className="w-full h-[94px] sm:h-[104px] overflow-visible"
                role="img"
                aria-label="PoE switch routing structured Cat6 cables to 3 IP cameras"
              >
                <defs>
                  <linearGradient id="sashPoeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5551FF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#5551FF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#DE0302" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Left Hardware Tile: PoE+ Switch */}
                <g transform="translate(4, 13)">
                  <rect
                    x="0"
                    y="0"
                    width="78"
                    height="72"
                    rx="14"
                    fill="#010D3B"
                  />
                  <text
                    x="39"
                    y="24"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="var(--font-mono), monospace"
                  >
                    PoE+ RACK
                  </text>
                  <text
                    x="39"
                    y="36"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.65)"
                    fontSize="8"
                    fontFamily="var(--font-mono), monospace"
                  >
                    GIGABIT CAT6
                  </text>
                  {[0, 1, 2].map((led) => (
                    <g key={led} transform={`translate(${17 + led * 17}, 47)`}>
                      <rect
                        x="0"
                        y="0"
                        width="10"
                        height="10"
                        rx="3"
                        fill="#1A2552"
                      />
                      <circle
                        cx="5"
                        cy="5"
                        r="2.5"
                        fill="#10B981"
                        className="anim-sash-led"
                        style={{
                          animation: `sashLedPulse ${1.1 + led * 0.25}s ease-in-out infinite`,
                        }}
                      />
                    </g>
                  ))}
                </g>

                {/* 3 Structured Right-Angle Conduit Paths + Animated Pulses */}
                {[
                  {
                    id: "sash-poe-1",
                    d: "M 82 35 L 138 35 Q 146 35 146 27 L 146 23 Q 146 15 154 15 L 204 15",
                    camY: 3,
                    label: "Gate · 4K",
                    delay: "0s",
                  },
                  {
                    id: "sash-poe-2",
                    d: "M 82 49 L 204 49",
                    camY: 37,
                    label: "Lobby · IR",
                    delay: "0.4s",
                  },
                  {
                    id: "sash-poe-3",
                    d: "M 82 63 L 138 63 Q 146 63 146 71 L 146 75 Q 146 83 154 83 L 204 83",
                    camY: 71,
                    label: "Yard · IP67",
                    delay: "0.8s",
                  },
                ].map((route) => (
                  <g key={route.id}>
                    {/* Base Conduit Line */}
                    <path
                      d={route.d}
                      fill="none"
                      stroke="#E2E5EE"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Animated Pulse Stream */}
                    <path
                      d={route.d}
                      fill="none"
                      stroke="url(#sashPoeGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="38 182"
                      className="anim-sash-poe"
                      style={{
                        animation: "sashPoePulse 2.4s linear infinite",
                        animationDelay: route.delay,
                      }}
                    />

                    {/* Right Camera Endpoint Pill */}
                    <g transform={`translate(204, ${route.camY})`}>
                      <rect
                        x="0"
                        y="0"
                        width="102"
                        height="24"
                        rx="8"
                        fill="#FFFFFF"
                        stroke="#E2E5EE"
                        strokeWidth="1.25"
                      />
                      <circle cx="13" cy="12" r="3.5" fill="#10B981" />
                      <text
                        x="24"
                        y="15.5"
                        fill="#010D3B"
                        fontSize="10"
                        fontWeight="500"
                        fontFamily="var(--font-sans), sans-serif"
                      >
                        {route.label}
                      </text>
                    </g>
                  </g>
                ))}
              </svg>
            </div>
          </Card>
        )}
      </div>
    </div>
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
        {/* Front Face: Animated Media Stage + Title Area */}
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
              <AnimatedDeliverableMediaStage
                config={item.mediaConfig}
                shouldReduceMotion={!!shouldReduceMotion}
              />
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
