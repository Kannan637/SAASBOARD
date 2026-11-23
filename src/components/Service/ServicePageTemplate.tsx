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

export interface ServiceDeliverableItem {
  title: string;
  description: string;
  tag?: string;
  points?: string[];
  iconName?: string;
  imageSrc?: string;
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

function getDeliverableCardImage(title: string, explicitImageSrc?: string): string {
  if (explicitImageSrc) return explicitImageSrc;
  const t = title.toLowerCase();

  // 1. Broadband Services (/broadband-services)
  if (t.includes("address") || t.includes("feasibility")) {
    return "/Cards/Address Feasibility Check.png";
  }
  if (t.includes("select") || t.includes("fibre plan")) {
    return "/Cards/Select Your Fibre Plan.png";
  }
  if (t.includes("fibre drop") || t.includes("router setup")) {
    return "/Cards/Free Fibre Drop & Router Setup.png";
  }
  if (t.includes("instant activation") || t.includes("speed test")) {
    return "/Cards/Instant Activation & Speed Test.png";
  }

  // 2. Leased Line (/lease-line)
  if (t.includes("1:1") || t.includes("uncontended")) {
    return "/Cards/1.1 Uncontended Bandwidth.png";
  }
  if (t.includes("static ip pool")) {
    return "/Cards/Static IP pool Included.png";
  }
  if (t.includes("proactive sla") || t.includes("mttr")) {
    return "/Cards/Proactive sla & fast mttr.png";
  }
  if (t.includes("scalable") || t.includes("1 gbps")) {
    return "/Cards/Scalable up to 1 Gbps.png";
  }

  // 3. SME Business Internet (/sme-internet)
  if (t.includes("priority routing") || t.includes("business traffic")) {
    return "/Cards/Business Traffic priority Routing.png";
  }
  if (t.includes("price lock") || t.includes("unlimited price")) {
    return "/Cards/Unlimited price look Protection.png";
  }
  if (t.includes("field dispatch") || t.includes("commercial field")) {
    return "/Cards/24 7 commerical Field Dispatch.png";
  }
  if (t.includes("port forwarding") || t.includes("static ip & nvr")) {
    return "/Cards/Static IP & NVR port Forwading.png";
  }

  // 4. HD IP CCTV Surveillance (/cctv)
  if (t.includes("indoor & outdoor") || t.includes("hd ip cameras")) {
    return "/Cards/Minimalist Icy-Blue CCTV Camera.png";
  }
  if (t.includes("nvr storage") || t.includes("cloud backup")) {
    return "/Cards/Cloud-Connected Storage System.png";
  }
  if (t.includes("live smartphone") || t.includes("smartphone monitoring")) {
    return "/Cards/Live Security Camera App.png";
  }
  if (t.includes("clean cabling") || t.includes("amc")) {
    return "/Cards/Clean NVR with Organized Blue Cabling.png";
  }

  // 5. Intranet Solutions (/intranet)
  if (t.includes("multi-branch") || t.includes("point-to-point")) {
    return "/Cards/Connected Branch Network.png";
  }
  if (t.includes("isolated vlan") || t.includes("vlan & security")) {
    return "/Cards/Secure Network Shield and Isolated Devices.png";
  }
  if (t.includes("file & voice") || t.includes("file and voice")) {
    return "/Cards/High-Speed File and Voice Hub.png";
  }
  if (t.includes("local network engineers") || t.includes("managed by local")) {
    return "/Cards/Glossy Network Support Engineer Illustration.png";
  }

  return "/Cards/Address Feasibility Check.png";
}

interface CardPastelInnerShadowTheme {
  solidPastelBg: string;
  borderColor: string;
  cardShadow: string;
  mediaVignette: string;
  mediaInnerShadow: string;
  bottomBridgeGradient: string;
  titleAreaGradient: string;
  titleAreaInnerShadow: string;
  tagPillStyle: string;
  eyebrowColor: string;
}

const CARD_PASTEL_THEMES: CardPastelInnerShadowTheme[] = [
  // Card 1: Minimal Pastel Rose-Pink + Soft Crimson Inner Shadow
  {
    solidPastelBg: "#FFF0F3",
    borderColor: "rgba(225, 29, 72, 0.10)",
    cardShadow:
      "inset 0 0 18px rgba(225, 29, 72, 0.04), 0 8px 24px rgba(15, 27, 61, 0.04)",
    mediaVignette:
      "radial-gradient(ellipse 70% 65% at 50% 48%, rgba(255,255,255,0) 48%, rgba(255,241,243,0.45) 78%, rgba(255,228,233,0.72) 100%)",
    mediaInnerShadow:
      "inset 0 0 32px rgba(225, 29, 72, 0.10), inset 0 6px 16px rgba(251, 113, 133, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
    bottomBridgeGradient:
      "linear-gradient(180deg, rgba(255,228,233,0) 0%, rgba(255,228,233,0.45) 55%, #FFF2F4 100%)",
    titleAreaGradient:
      "linear-gradient(180deg, #FFF2F4 0%, #FFF9FA 45%, #FFFFFF 100%)",
    titleAreaInnerShadow:
      "inset 0 -8px 18px rgba(225, 29, 72, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    tagPillStyle:
      "bg-white/90 text-rose-700 border-rose-200/60 shadow-[0_2px_8px_rgba(225,29,72,0.06)]",
    eyebrowColor: "text-rose-600",
  },
  // Card 2: Minimal Pastel Sky-Blue + Soft Cobalt Inner Shadow
  {
    solidPastelBg: "#F0F9FF",
    borderColor: "rgba(2, 132, 199, 0.10)",
    cardShadow:
      "inset 0 0 18px rgba(2, 132, 199, 0.04), 0 8px 24px rgba(15, 27, 61, 0.04)",
    mediaVignette:
      "radial-gradient(ellipse 70% 65% at 50% 48%, rgba(255,255,255,0) 48%, rgba(240,249,255,0.45) 78%, rgba(224,242,254,0.72) 100%)",
    mediaInnerShadow:
      "inset 0 0 32px rgba(2, 132, 199, 0.10), inset 0 6px 16px rgba(56, 189, 248, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
    bottomBridgeGradient:
      "linear-gradient(180deg, rgba(224,242,254,0) 0%, rgba(224,242,254,0.45) 55%, #EDF8FF 100%)",
    titleAreaGradient:
      "linear-gradient(180deg, #EDF8FF 0%, #F7FCFF 45%, #FFFFFF 100%)",
    titleAreaInnerShadow:
      "inset 0 -8px 18px rgba(2, 132, 199, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    tagPillStyle:
      "bg-white/90 text-sky-700 border-sky-200/60 shadow-[0_2px_8px_rgba(2,132,199,0.06)]",
    eyebrowColor: "text-sky-600",
  },
  // Card 3: Minimal Pastel Lavender-Violet + Soft Amethyst Inner Shadow
  {
    solidPastelBg: "#FAF5FF",
    borderColor: "rgba(124, 58, 237, 0.10)",
    cardShadow:
      "inset 0 0 18px rgba(124, 58, 237, 0.04), 0 8px 24px rgba(15, 27, 61, 0.04)",
    mediaVignette:
      "radial-gradient(ellipse 70% 65% at 50% 48%, rgba(255,255,255,0) 48%, rgba(250,245,255,0.45) 78%, rgba(243,232,255,0.72) 100%)",
    mediaInnerShadow:
      "inset 0 0 32px rgba(124, 58, 237, 0.10), inset 0 6px 16px rgba(168, 85, 247, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
    bottomBridgeGradient:
      "linear-gradient(180deg, rgba(243,232,255,0) 0%, rgba(243,232,255,0.45) 55%, #F6EEFF 100%)",
    titleAreaGradient:
      "linear-gradient(180deg, #F6EEFF 0%, #FBF8FF 45%, #FFFFFF 100%)",
    titleAreaInnerShadow:
      "inset 0 -8px 18px rgba(124, 58, 237, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    tagPillStyle:
      "bg-white/90 text-purple-700 border-purple-200/60 shadow-[0_2px_8px_rgba(124,58,237,0.06)]",
    eyebrowColor: "text-purple-600",
  },
  // Card 4: Minimal Pastel Peach-Amber + Soft Tangerine Inner Shadow
  {
    solidPastelBg: "#FFF7ED",
    borderColor: "rgba(234, 88, 12, 0.10)",
    cardShadow:
      "inset 0 0 18px rgba(234, 88, 12, 0.04), 0 8px 24px rgba(15, 27, 61, 0.04)",
    mediaVignette:
      "radial-gradient(ellipse 70% 65% at 50% 48%, rgba(255,255,255,0) 48%, rgba(255,247,237,0.45) 78%, rgba(255,237,213,0.72) 100%)",
    mediaInnerShadow:
      "inset 0 0 32px rgba(234, 88, 12, 0.10), inset 0 6px 16px rgba(251, 146, 60, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
    bottomBridgeGradient:
      "linear-gradient(180deg, rgba(255,237,213,0) 0%, rgba(255,237,213,0.45) 55%, #FFF1E2 100%)",
    titleAreaGradient:
      "linear-gradient(180deg, #FFF1E2 0%, #FFF9F3 45%, #FFFFFF 100%)",
    titleAreaInnerShadow:
      "inset 0 -8px 18px rgba(234, 88, 12, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    tagPillStyle:
      "bg-white/90 text-orange-700 border-orange-200/60 shadow-[0_2px_8px_rgba(234,88,12,0.06)]",
    eyebrowColor: "text-orange-600",
  },
];

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
  const cardImageSrc = getDeliverableCardImage(item.title, item.imageSrc);
  const pastelTheme = CARD_PASTEL_THEMES[idx % CARD_PASTEL_THEMES.length];

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
        {/* Front Face: 3D Card Illustration Media Stage + Pastel Inner Shadow & Title Area */}
        <div
          className="w-full h-full flex flex-col justify-between bg-white text-brand-navy border rounded-[28px] overflow-hidden"
          style={{
            borderColor: pastelTheme.borderColor,
            boxShadow: pastelTheme.cardShadow,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="relative z-10 p-0 flex-1 flex flex-col justify-between overflow-hidden h-full">
            {/* Top Media Stage with Custom 3D Card Artwork + Pastel Radial Inner Shadow */}
            <div className="relative w-full flex-1 min-h-[260px] min-[360px]:min-h-[285px] sm:min-h-[320px] overflow-hidden bg-white flex flex-col justify-between p-4 sm:p-5 select-none group/stage">
              {/* Top Badges Bar: Step number + Tag */}
              <div className="relative z-30 w-full flex items-center justify-between gap-2">
                <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full bg-brand-navy px-2.5 font-mono text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider text-white shadow-xs border border-white/25">
                  <span>0{idx + 1}</span>
                </span>

                {item.tag && (
                  <span
                    className={`inline-flex min-h-6 items-center rounded-full backdrop-blur-xs px-2.5 text-[10px] min-[360px]:text-[11px] font-semibold uppercase tracking-wider border ${pastelTheme.tagPillStyle}`}
                  >
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Custom 3D Card Illustration */}
              <div className="absolute inset-0 z-10 flex items-center justify-center p-2 sm:p-3">
                <Image
                  src={cardImageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center select-none transition-transform duration-500 ease-out group-hover/stage:scale-[1.04]"
                />
              </div>

              {/* Pastel Radial Vignette & Colored Inner Shadow Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background: pastelTheme.mediaVignette,
                  boxShadow: pastelTheme.mediaInnerShadow,
                }}
              />

              {/* Smooth Pastel Gradient Bridge into Bottom Title Area */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 z-20"
                style={{
                  background: pastelTheme.bottomBridgeGradient,
                }}
              />
            </div>

            {/* Front Bottom: Title Area with Matching Pastel Gradient & Inner Shadow */}
            <div
              className="relative z-20 px-5 min-[360px]:px-6 sm:px-7 pt-3.5 pb-5 sm:pb-6 mt-auto w-full flex items-center justify-between"
              style={{
                background: pastelTheme.titleAreaGradient,
                boxShadow: pastelTheme.titleAreaInnerShadow,
              }}
            >
              <div className="pr-2">
                <p
                  className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${pastelTheme.eyebrowColor}`}
                >
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

        {/* Back Face: Solid Pastel Surface matching front */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between text-brand-navy border rounded-[28px] shadow-none overflow-hidden p-7 sm:p-8 lg:p-9 z-20 cursor-pointer"
          style={{
            backgroundColor: pastelTheme.solidPastelBg,
            borderColor: pastelTheme.borderColor,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6 sm:mb-7">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/90 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 shadow-xs">
                  <IconComponent className="size-6 sm:size-7" />
                </div>
                <span className="text-neutral-500 hover:text-brand-navy text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white border border-black/5 transition-colors">
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
