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

  return (
    <div
      style={
        {
          "--bg1": config.bg1,
          "--bg2": config.bg2,
          "--acc": config.acc,
          background: "linear-gradient(160deg, var(--bg1) 0%, var(--bg2) 100%)",
        } as React.CSSProperties
      }
      className="relative w-full flex-1 min-h-[345px] min-[360px]:min-h-[360px] sm:min-h-[380px] overflow-hidden select-none flex flex-col items-center justify-between pt-7 pb-5 px-5 sm:px-8"
    >
      {/* Embedded Keyframe Animations + Reduced Motion Override */}
      <style>{`
        @keyframes cctvScanLine {
          0% { top: 6%; opacity: 0.2; }
          50% { opacity: 0.9; }
          100% { top: 90%; opacity: 0.2; }
        }
        @keyframes cctvPersonWalk {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(175px); }
        }
        @keyframes cctvRecBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes nvrBlockFill {
          0%, 10% { background-color: rgba(2, 132, 199, 0.12); transform: scale(0.96); }
          24%, 84% { background-color: var(--acc); transform: scale(1); }
          95%, 100% { background-color: rgba(2, 132, 199, 0.12); transform: scale(0.96); }
        }
        @keyframes phonePushSlide {
          0%, 8% { transform: translateY(-32px); opacity: 0; }
          16%, 84% { transform: translateY(0px); opacity: 1; }
          94%, 100% { transform: translateY(-8px); opacity: 0; }
        }
        @keyframes phoneLivePop {
          0%, 22% { transform: scale(0.94) translateY(8px); opacity: 0; }
          32%, 84% { transform: scale(1) translateY(0px); opacity: 1; }
          94%, 100% { transform: scale(0.97) translateY(4px); opacity: 0; }
        }
        @keyframes poeCableDraw {
          0%, 10% { stroke-dashoffset: 220; }
          45%, 85% { stroke-dashoffset: 0; }
          96%, 100% { stroke-dashoffset: 220; }
        }
        @keyframes poeCameraFade {
          0%, 34% { opacity: 0.3; transform: scale(0.94); }
          48%, 85% { opacity: 1; transform: scale(1); }
          96%, 100% { opacity: 0.3; transform: scale(0.94); }
        }
        @keyframes pillMsgEnter {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-cctv-scan,
          .anim-cctv-walk,
          .anim-cctv-rec,
          .anim-nvr-block,
          .anim-phone-push,
          .anim-phone-live,
          .anim-poe-cable,
          .anim-poe-cam,
          .anim-pill-msg,
          .anim-pulse-dot {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Subtle Halftone Dot Matrix Backdrop (Reference Card Style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(1, 13, 59, 0.14) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(circle at 50% 42%, black 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 42%, black 25%, transparent 78%)",
        }}
      />

      {/* Large Blurred Blob in Top-Right Corner (blur 60px, opacity 0.6) */}
      <div
        aria-hidden="true"
        style={{ backgroundColor: "var(--acc)" }}
        className="pointer-events-none absolute -top-14 -right-14 w-64 h-64 rounded-full opacity-55 blur-[60px]"
      />

      {/* Bottom 70px Smooth Fade into White (No empty gap between media and title) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70px] z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.72)_50%,#FFFFFF_100%)]"
      />

      {/* ANIMATED SUBJECT STAGE BUILT WITH SHADCN UI COMPONENTS */}
      <div className="relative z-10 w-full max-w-[470px] flex-1 flex items-center justify-center my-auto">
        {/* CARD 1: Indoor & Outdoor HD IP Cameras */}
        {config.variant === "cctv-camera" && (
          <Card
            size="sm"
            className="w-full rounded-[20px] bg-white/95 backdrop-blur-md ring-1 ring-[#010D3B]/[0.07] shadow-[0_16px_40px_-10px_rgba(234,88,12,0.16),0_4px_12px_rgba(1,13,59,0.05)] p-0 gap-0 overflow-hidden"
          >
            {/* Clean Top Bar */}
            <CardHeader className="px-4 py-3 border-b border-[#010D3B]/[0.06] flex flex-row items-center justify-between gap-2 bg-white">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <Camera className="size-3.5" />
                </span>
                <div>
                  <CardTitle className="text-[13.5px] font-medium text-[#010D3B] leading-none">
                    Main Gate · Cam 01
                  </CardTitle>
                  <p className="text-[11px] text-[#4A4F63] mt-1 leading-none">
                    IP67 Outdoor Bullet · 30m IR
                  </p>
                </div>
              </div>
              <CardAction className="m-0 self-center">
                <Badge
                  variant="warning"
                  className="bg-orange-500/12 text-orange-700 border-orange-500/25 px-2.5 py-1 text-[11px] font-medium"
                >
                  <span
                    className="anim-cctv-rec size-1.5 rounded-full bg-orange-600"
                    style={{
                      animation: shouldReduceMotion
                        ? "none"
                        : "cctvRecBlink 1.2s ease-in-out infinite",
                    }}
                  />
                  REC · 4K HDR
                </Badge>
              </CardAction>
            </CardHeader>

            {/* Camera Optical Viewfinder Frame */}
            <CardContent className="p-3 bg-white">
              <div className="relative w-full h-[148px] sm:h-[156px] rounded-[14px] bg-[#0F172A] overflow-hidden ring-1 ring-black/10 flex flex-col justify-between p-3">
                {/* Architectural Grid Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Smooth Optical Scan Line */}
                <div
                  aria-hidden="true"
                  className="anim-cctv-scan pointer-events-none absolute inset-x-0 h-[1.5px] bg-linear-to-r from-transparent via-emerald-400/90 to-transparent shadow-[0_0_12px_#34D399]"
                  style={{
                    animation: shouldReduceMotion
                      ? "none"
                      : "cctvScanLine 3.8s ease-in-out infinite alternate",
                  }}
                />

                {/* Viewfinder Top Telemetry */}
                <div className="relative z-10 flex items-center justify-between text-[10.5px] font-mono text-white/75">
                  <span>3840 × 2160 · 60 FPS</span>
                  <span className="text-emerald-400">AI Smart Detection</span>
                </div>

                {/* Walking Person Silhouette + Following Green Detection Box */}
                <div className="relative z-10 flex-1 flex items-end pb-0.5 pl-4">
                  <div
                    className="anim-cctv-walk relative flex flex-col items-start"
                    style={{
                      animation: shouldReduceMotion
                        ? "none"
                        : "cctvPersonWalk 5.4s ease-in-out infinite",
                    }}
                  >
                    <span className="mb-1 inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-0.5 text-[10px] font-medium text-slate-950 shadow-xs">
                      Person · 99%
                    </span>
                    <div className="relative w-12 h-15 rounded-[8px] border-2 border-emerald-400 bg-emerald-400/12 shadow-[0_0_20px_rgba(52,211,153,0.28)] flex items-center justify-center">
                      <span className="absolute -top-0.5 -left-0.5 size-2 border-t-2 border-l-2 border-white" />
                      <span className="absolute -top-0.5 -right-0.5 size-2 border-t-2 border-r-2 border-white" />
                      <span className="absolute -bottom-0.5 -left-0.5 size-2 border-b-2 border-l-2 border-white" />
                      <span className="absolute -bottom-0.5 -right-0.5 size-2 border-b-2 border-r-2 border-white" />
                      <svg
                        viewBox="0 0 36 52"
                        className="w-7 h-11 text-white/95 fill-current"
                        aria-hidden="true"
                      >
                        <circle cx="18" cy="10" r="5.5" />
                        <path d="M12 20 C12 17.5, 24 17.5, 24 20 L26 33 L23 33 L21.5 24 L20.5 34 L24 48 L20 48 L17.5 37 L15 48 L11 48 L14.5 34 L13.5 24 L12 33 L9 33 Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CARD 2: NVR Storage & Cloud Backup */}
        {config.variant === "nvr-blocks" && (
          <Card
            size="sm"
            className="w-full rounded-[20px] bg-white/95 backdrop-blur-md ring-1 ring-[#010D3B]/[0.07] shadow-[0_16px_40px_-10px_rgba(2,132,199,0.16),0_4px_12px_rgba(1,13,59,0.05)] p-5 gap-4"
          >
            <CardHeader className="p-0 flex flex-row items-start justify-between gap-3">
              <div>
                <CardTitle className="text-[28px] sm:text-[32px] font-medium text-[#010D3B] leading-none">
                  60+ days
                </CardTitle>
                <CardDescription className="text-[13px] text-[#4A4F63] mt-1.5 leading-snug">
                  Continuous 24/7 recording
                </CardDescription>
              </div>
              <CardAction className="m-0">
                <Badge
                  variant="info"
                  className="bg-sky-500/12 text-sky-700 border-sky-500/25 px-3 py-1 text-[11.5px] font-medium"
                >
                  H.265+ · 50% less storage
                </Badge>
              </CardAction>
            </CardHeader>

            <Separator className="bg-[#010D3B]/[0.06]" />

            {/* 30 Small Blocks (10 x 3 Grid) that fill sequentially one by one and loop */}
            <CardContent className="p-0">
              <div className="flex items-center justify-between text-[12px] text-[#4A4F63] mb-2.5">
                <span className="font-medium text-[#010D3B]">
                  Recorded Days (30-Block Cycle)
                </span>
                <span className="font-mono text-[11px] text-sky-700">
                  WD Purple · RAID Healthy
                </span>
              </div>
              <div
                className="grid grid-cols-10 gap-1.5 sm:gap-2"
                role="img"
                aria-label="30-day NVR storage block timeline filling sequentially"
              >
                {Array.from({ length: 30 }).map((_, bIdx) => (
                  <span
                    key={bIdx}
                    className="anim-nvr-block h-5 sm:h-5.5 rounded-[6px]"
                    style={{
                      backgroundColor: shouldReduceMotion
                        ? "var(--acc)"
                        : "rgba(2, 132, 199, 0.12)",
                      animation: shouldReduceMotion
                        ? "none"
                        : `nvrBlockFill 6s ease-in-out infinite`,
                      animationDelay: `${bIdx * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CARD 3: Live Smartphone Monitoring (Proper iPhone Frame Image + Clean iOS Light App Surface) */}
        {config.variant === "phone-live" && (
          <div className="relative w-[272px] sm:w-[292px] h-[244px] sm:h-[258px] translate-y-2 overflow-hidden select-none flex justify-center">
            {/* Aspect-Ratio Matched Container for the Top Half of the iPhone (484 : 877 full phone ratio) */}
            <div className="relative w-[264px] sm:w-[282px] h-[478px] sm:h-[511px] shrink-0">
              {/* Inner iPhone Screen Surface (Light iOS App Theme so Dynamic Island in Iphone Frame.png is crisp with zero white halo) */}
              <div className="absolute left-[4.2%] right-[4.6%] top-[2.1%] h-[236px] sm:h-[250px] rounded-t-[36px] bg-[#F8FAFC] pt-[36px] sm:pt-[40px] px-3 pb-3 flex flex-col gap-2.5 overflow-hidden z-10">
                {/* Native iOS Status Bar flanking the Dynamic Island */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 inset-x-5 flex items-center justify-between text-[10px] font-medium text-[#010D3B]"
                >
                  <span>9:41</span>
                  <span>5G · 100%</span>
                </div>

                {/* Sliding Push Notification built with Shadcn Card + Avatar */}
                <Card
                  size="sm"
                  className="anim-phone-push rounded-2xl bg-white py-2.5 px-3 shadow-[0_8px_20px_rgba(1,13,59,0.08)] ring-1 ring-[#010D3B]/[0.07] flex flex-row items-center gap-2.5"
                  style={{
                    animation: shouldReduceMotion
                      ? "none"
                      : "phonePushSlide 5.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                  }}
                >
                  <Avatar size="sm" className="size-7 bg-purple-600 text-white shrink-0">
                    <AvatarFallback className="bg-purple-600 text-white text-[10px] font-medium">
                      S
                    </AvatarFallback>
                    <AvatarBadge className="bg-emerald-500" />
                  </Avatar>
                  <div className="min-w-0 flex-1 leading-tight">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[11.5px] font-medium text-[#010D3B] truncate">
                        Motion at Entrance Cam 01
                      </p>
                      <span className="text-[9.5px] text-purple-600 shrink-0">
                        now
                      </span>
                    </div>
                    <p className="text-[10.5px] text-[#4A4F63] truncate mt-0.5">
                      Clip saved to NVR · Tap to view
                    </p>
                  </div>
                </Card>

                {/* Popping LIVE 4K Video Preview Card */}
                <Card
                  size="sm"
                  className="anim-phone-live relative flex-1 rounded-2xl bg-[#0F172A] ring-1 ring-[#010D3B]/15 p-3 flex flex-col justify-between overflow-hidden shadow-[0_10px_24px_rgba(124,58,237,0.18)]"
                  style={{
                    animation: shouldReduceMotion
                      ? "none"
                      : "phoneLivePop 5.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                  }}
                >
                  <CardHeader className="relative z-10 p-0 flex flex-row items-center justify-between">
                    <Badge
                      variant="live"
                      className="rounded-md px-2 py-0.5 text-[9.5px] font-medium uppercase"
                    >
                      <span className="size-1.5 rounded-full bg-white animate-pulse" />
                      LIVE 4K
                    </Badge>
                    <CardAction className="m-0">
                      <span className="font-mono text-[10px] text-purple-200">
                        0 ms Fibre
                      </span>
                    </CardAction>
                  </CardHeader>

                  <CardContent className="relative z-10 p-0 my-auto flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-purple-500/25 text-purple-200">
                        <Video className="size-3.5" />
                      </span>
                      <span className="text-[11px] font-medium text-white">
                        Entrance Cam 01
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">
                      60 FPS
                    </span>
                  </CardContent>
                </Card>
              </div>

              {/* Real iPhone Frame Overlay (/Frame/Iphone Frame.png) */}
              <Image
                src="/Frame/Iphone Frame.png"
                alt="iPhone frame showing SASH live 4K CCTV monitoring app"
                width={1706}
                height={922}
                sizes="340px"
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[3.08%] w-[352.48%] max-w-none h-[105.13%] z-20 select-none drop-shadow-[0_16px_32px_rgba(1,13,59,0.16)]"
              />
            </div>
          </div>
        )}

        {/* CARD 4: Clean Cabling & Local AMC Support */}
        {config.variant === "poe-cabling" && (
          <Card
            size="sm"
            className="w-full rounded-[20px] bg-white/95 backdrop-blur-md ring-1 ring-[#010D3B]/[0.07] shadow-[0_16px_40px_-10px_rgba(5,150,105,0.16),0_4px_12px_rgba(1,13,59,0.05)] p-4 sm:p-5 gap-3"
          >
            <CardHeader className="p-0 flex flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                  <Cable className="size-3.5" />
                </span>
                <div>
                  <CardTitle className="text-[13.5px] font-medium text-[#010D3B] leading-none">
                    PoE+ Switch &amp; Cat6 Topology
                  </CardTitle>
                  <p className="text-[11px] text-[#4A4F63] mt-1 leading-none">
                    Concealed PVC Conduit · Single-Cable Power
                  </p>
                </div>
              </div>
              <CardAction className="m-0 self-center">
                <Badge
                  variant="success"
                  className="bg-emerald-500/12 text-emerald-700 border-emerald-500/25 px-2.5 py-1 text-[11px] font-medium"
                >
                  48V Active
                </Badge>
              </CardAction>
            </CardHeader>

            <Separator className="bg-[#010D3B]/[0.06]" />

            <CardContent className="p-0 pt-1 flex items-center justify-center">
              <svg
                viewBox="0 0 380 132"
                className="w-full h-[132px] overflow-visible"
                role="img"
                aria-label="PoE switch routing structured right-angle cables with data pulses to 3 IP cameras"
              >
                {/* Left Hardware Module: PoE+ Switch */}
                <g transform="translate(4, 20)">
                  <rect
                    x="0"
                    y="0"
                    width="88"
                    height="92"
                    rx="14"
                    fill="#010D3B"
                  />
                  <text
                    x="44"
                    y="26"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10.5"
                    fontWeight="500"
                  >
                    PoE+ Switch
                  </text>
                  <text
                    x="44"
                    y="41"
                    textAnchor="middle"
                    fill="#6EE7B7"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    8-PORT · 48V
                  </text>
                  {/* 3 Blinking Emerald Port LEDs */}
                  {[0, 1, 2].map((led) => (
                    <g key={led} transform={`translate(${18 + led * 20}, 56)`}>
                      <rect
                        x="0"
                        y="0"
                        width="12"
                        height="12"
                        rx="3"
                        fill="#1A2552"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <circle
                        cx="6"
                        cy="6"
                        r="3"
                        fill="#10B981"
                        className="anim-cctv-rec"
                        style={{
                          animation: shouldReduceMotion
                            ? "none"
                            : `cctvRecBlink ${1.1 + led * 0.25}s ease-in-out infinite`,
                        }}
                      />
                    </g>
                  ))}
                </g>

                {/* 3 Parallel Right-Angle Conduit Runs + Data Pulses + 3 Camera Endpoints */}
                {[
                  {
                    id: "poe-path-1",
                    d: "M 92 46 L 175 46 L 175 20 L 274 20",
                    camY: 4,
                    label: "Gate Cam 01",
                    delay: "0s",
                  },
                  {
                    id: "poe-path-2",
                    d: "M 92 66 L 274 66",
                    camY: 50,
                    label: "Lobby Cam 02",
                    delay: "0.35s",
                  },
                  {
                    id: "poe-path-3",
                    d: "M 92 86 L 175 86 L 175 112 L 274 112",
                    camY: 96,
                    label: "Yard Cam 03",
                    delay: "0.7s",
                  },
                ].map((cable) => (
                  <g key={cable.id}>
                    <path
                      d={cable.d}
                      fill="none"
                      stroke="#E2F8EE"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id={cable.id}
                      d={cable.d}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="220"
                      className="anim-poe-cable"
                      style={{
                        animation: shouldReduceMotion
                          ? "none"
                          : `poeCableDraw 4.8s ease-in-out infinite`,
                        animationDelay: cable.delay,
                      }}
                    />
                    {!shouldReduceMotion && (
                      <circle r="3.5" fill="#10B981">
                        <animateMotion
                          dur="2.4s"
                          begin={cable.delay}
                          repeatCount="indefinite"
                          path={cable.d}
                        />
                      </circle>
                    )}

                    {/* Camera Node Pill on Right */}
                    <g
                      transform={`translate(276, ${cable.camY})`}
                      className="anim-poe-cam"
                      style={{
                        transformOrigin: "320px 66px",
                        animation: shouldReduceMotion
                          ? "none"
                          : `poeCameraFade 4.8s ease-in-out infinite`,
                        animationDelay: cable.delay,
                      }}
                    >
                      <rect
                        x="0"
                        y="0"
                        width="98"
                        height="32"
                        rx="10"
                        fill="#F2FDF8"
                        stroke="#A7F3D0"
                        strokeWidth="1.25"
                      />
                      <circle cx="16" cy="16" r="6" fill="#059669" />
                      <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
                      <text
                        x="28"
                        y="19.5"
                        fill="#010D3B"
                        fontSize="10.5"
                        fontWeight="500"
                      >
                        {cable.label}
                      </text>
                    </g>
                  </g>
                ))}
              </svg>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Frosted-Glass Pill built with Shadcn Badge + Pulsing Dot & 3 Cycling Messages */}
      <Badge
        variant="outline"
        className="relative z-20 mt-3 gap-2.5 rounded-full bg-white/92 backdrop-blur-md px-4 py-1.5 shadow-[0_6px_20px_rgba(1,13,59,0.07)] ring-1 ring-[#010D3B]/[0.07] border-white font-medium text-[#010D3B]"
      >
        <span className="relative flex size-2 shrink-0">
          <span
            style={{ backgroundColor: "var(--acc)" }}
            className="anim-pulse-dot absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          />
          <span
            style={{ backgroundColor: "var(--acc)" }}
            className="relative inline-flex size-2 rounded-full"
          />
        </span>
        <span
          key={msgIndex}
          className="anim-pill-msg text-[12.5px] font-medium text-[#010D3B] whitespace-nowrap"
          style={{
            animation: shouldReduceMotion
              ? "none"
              : "pillMsgEnter 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {config.pillMessages[msgIndex]}
        </span>
      </Badge>
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
          className="w-full h-full flex flex-col justify-between bg-white text-[#0f1b3d] border border-[rgba(15,27,61,0.07)] rounded-[28px] shadow-[0_8px_30px_rgba(20,20,50,0.06)] overflow-hidden"
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

            {/* Front Bottom: Small Red Eyebrow (12px) + 22px Medium Dark Navy Title + Black Rounded "+" Button */}
            <div className="relative z-20 bg-white px-5 min-[360px]:px-6 sm:px-7 pt-4 pb-5 sm:pb-6 mt-auto w-full flex items-center justify-between">
              <div className="pr-3">
                <p className="text-[12px] font-semibold text-brand-red uppercase tracking-wider mb-1">
                  {item.tag || `Feature 0${idx + 1}`}
                </p>
                <h3 className="text-[#0f1b3d] !text-lg min-[360px]:!text-xl sm:!text-[22px] font-medium tracking-tight leading-snug">
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
