"use client";

import React from "react";
import { EyeOff, Lock, ShieldCheck, CheckCircle2, Activity, Wifi } from "lucide-react";

export interface DeliverableMediaConfig {
  variant: "pipeline-lens" | "dual-panel-pills";
  // Variant A: Pipeline + Magnifying Lens
  leftNodeTheme?: "red" | "navy";
  rightNodeTheme?: "red" | "navy";
  leftNodeGraphic?: "cylinders" | "router" | "camera" | "switch" | "noc";
  rightNodeGraphic?: "bars" | "router" | "cylinders" | "shield";
  topPillText?: string;
  bottomPillText?: string;
  // Variant B: Dual-Panel Tactile Pills
  ctaButtonText?: string;
  ctaTheme?: "red" | "navy";
  brandHeading?: string;
  brandSubheading?: string;
  pills?: {
    label: string;
    value?: string;
    masked?: boolean;
    theme?: "red" | "navy";
    icon?: "eye-off" | "lock" | "shield" | "check" | "activity" | "wifi";
  }[];
}

/**
 * Maps each of the 20 deliverable card titles across all 5 service pages
 * to a bespoke media design matching the two reference card architectures
 * and strictly using globals.css brand color tokens.
 */
export function getDeliverableMediaConfig(title: string): DeliverableMediaConfig {
  const t = title.toLowerCase();

  // ============================================================================
  // 1. BROADBAND SERVICES — "How our 4-step free installation works"
  // ============================================================================
  if (t.includes("address feasibility")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Verify Address",
      ctaTheme: "red",
      brandHeading: "SASH GPON",
      brandSubheading: "Route Feasibility",
      pills: [
        { label: "Pincode Zone", value: "602001 • READY", theme: "navy", icon: "check" },
        { label: "Nearest OLT Port", value: "0.4 KM • ACTIVE", theme: "red", icon: "wifi" },
        { label: "Optical Signal", value: "-17.4 dBm • OK", theme: "navy", icon: "activity" },
      ],
    };
  }

  if (t.includes("select your fibre plan")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Select Plan",
      ctaTheme: "red",
      brandHeading: "1 Gbps FTTH",
      brandSubheading: "Zero Data Caps",
      pills: [
        { label: "Family Pack 100M", value: "₹999 • UNLIMITED", theme: "red", icon: "check" },
        { label: "Personal Pack 50M", value: "₹650 • NO FUP", theme: "navy", icon: "wifi" },
        { label: "Price Protection", masked: true, theme: "navy", icon: "lock" },
      ],
    };
  }

  if (t.includes("free fibre drop") || t.includes("router setup")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "navy",
      rightNodeTheme: "red",
      leftNodeGraphic: "cylinders",
      rightNodeGraphic: "router",
      topPillText: "Splicing 0.02dB...",
      bottomPillText: "Wi-Fi 6 Ready...",
    };
  }

  if (t.includes("instant activation") || t.includes("speed test")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "red",
      rightNodeTheme: "navy",
      leftNodeGraphic: "router",
      rightNodeGraphic: "bars",
      topPillText: "Activating 1G...",
      bottomPillText: "990 Mbps Live...",
    };
  }

  // ============================================================================
  // 2. LEASED LINE — "Why organisations choose SASH Leased Lines"
  // ============================================================================
  if (t.includes("1:1 uncontended")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "navy",
      rightNodeTheme: "red",
      leftNodeGraphic: "cylinders",
      rightNodeGraphic: "bars",
      topPillText: "1:1 Upload...",
      bottomPillText: "1:1 Download...",
    };
  }

  if (t.includes("static ip pool")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Assign Subnet",
      ctaTheme: "navy",
      brandHeading: "Static IPv4/v6",
      brandSubheading: "Dedicated Pool",
      pills: [
        { label: "Primary WAN Gateway", masked: true, theme: "red", icon: "eye-off" },
        { label: "ERP / Mail DMZ Host", masked: true, theme: "navy", icon: "eye-off" },
        { label: "BGP /29 Subnet Mask", masked: true, theme: "red", icon: "lock" },
      ],
    };
  }

  if (t.includes("proactive sla") || t.includes("mttr")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "red",
      rightNodeTheme: "navy",
      leftNodeGraphic: "noc",
      rightNodeGraphic: "bars",
      topPillText: "SLA 99.99%...",
      bottomPillText: "MTTR < 2.4 Hrs...",
    };
  }

  if (t.includes("scalable up to")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Scale Bandwidth",
      ctaTheme: "red",
      brandHeading: "10G SFP+ Core",
      brandSubheading: "Instant CIR Upgrade",
      pills: [
        { label: "Committed CIR Rate", value: "1 Gbps • ACTIVE", theme: "red", icon: "activity" },
        { label: "Burst Capacity", value: "2.5 Gbps • READY", theme: "navy", icon: "check" },
        { label: "Physical Recabling", value: "ZERO DOWNTIME", theme: "navy", icon: "shield" },
      ],
    };
  }

  // ============================================================================
  // 3. SME INTERNET — "Commercial connectivity engineered for SMEs"
  // ============================================================================
  if (t.includes("priority routing")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "navy",
      rightNodeTheme: "red",
      leftNodeGraphic: "switch",
      rightNodeGraphic: "bars",
      topPillText: "QoS Priority #1...",
      bottomPillText: "Routing ERP...",
    };
  }

  if (t.includes("price lock")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Lock Tariff",
      ctaTheme: "red",
      brandHeading: "Price Shield",
      brandSubheading: "Corporate GST Plan",
      pills: [
        { label: "Fixed Monthly Tariff", masked: true, theme: "red", icon: "lock" },
        { label: "FUP Speed Throttling", value: "0% • UNLIMITED", theme: "navy", icon: "check" },
        { label: "Protected Contract", masked: true, theme: "navy", icon: "eye-off" },
      ],
    };
  }

  if (t.includes("commercial field dispatch")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "red",
      rightNodeTheme: "navy",
      leftNodeGraphic: "noc",
      rightNodeGraphic: "router",
      topPillText: "NOC Alerting...",
      bottomPillText: "Dispatching Team...",
    };
  }

  if (t.includes("nvr port forwarding")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Forward Port",
      ctaTheme: "navy",
      brandHeading: "Static IP NAT",
      brandSubheading: "CCTV & POS Gateway",
      pills: [
        { label: "RTSP NVR Stream :554", masked: true, theme: "red", icon: "eye-off" },
        { label: "Tally / ERP Sync :9000", masked: true, theme: "navy", icon: "lock" },
        { label: "Biometric VPN Tunnel", masked: true, theme: "red", icon: "shield" },
      ],
    };
  }

  // ============================================================================
  // 4. CCTV SURVEILLANCE — "End-to-end CCTV hardware, cabling, and network setup"
  // ============================================================================
  if (t.includes("hd ip cameras")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "navy",
      rightNodeTheme: "red",
      leftNodeGraphic: "camera",
      rightNodeGraphic: "bars",
      topPillText: "4K Optics Live...",
      bottomPillText: "IP67 Night IR...",
    };
  }

  if (t.includes("nvr storage") || t.includes("cloud backup")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "red",
      rightNodeTheme: "navy",
      leftNodeGraphic: "cylinders",
      rightNodeGraphic: "bars",
      topPillText: "H.265+ Saving...",
      bottomPillText: "60-Day Retention...",
    };
  }

  if (t.includes("live smartphone monitoring")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Connect App",
      ctaTheme: "red",
      brandHeading: "SASH View",
      brandSubheading: "iOS & Android Live",
      pills: [
        { label: "Encrypted RTSP Feed", masked: true, theme: "navy", icon: "eye-off" },
        { label: "Perimeter Motion Alert", value: "LIVE • 60 FPS", theme: "red", icon: "activity" },
        { label: "Private Cloud Access", masked: true, theme: "red", icon: "eye-off" },
      ],
    };
  }

  if (t.includes("clean cabling") || t.includes("amc support")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "navy",
      rightNodeTheme: "red",
      leftNodeGraphic: "switch",
      rightNodeGraphic: "shield",
      topPillText: "48V PoE Active...",
      bottomPillText: "AMC Verified...",
    };
  }

  // ============================================================================
  // 5. INTRANET SOLUTIONS — "Built for secure inter-office communication"
  // ============================================================================
  if (t.includes("multi-branch") || t.includes("point-to-point")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "navy",
      rightNodeTheme: "red",
      leftNodeGraphic: "cylinders",
      rightNodeGraphic: "cylinders",
      topPillText: "Linking HQ ↔ Plant...",
      bottomPillText: "Layer-2 Optical...",
    };
  }

  if (t.includes("isolated vlan") || t.includes("security")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Connect VLAN",
      ctaTheme: "red",
      brandHeading: "Private WAN",
      brandSubheading: "Layer-2/3 Isolation",
      pills: [
        { label: "ERP Financial Ledger", masked: true, theme: "navy", icon: "eye-off" },
        { label: "Patient & HR Records", masked: true, theme: "red", icon: "eye-off" },
        { label: "Inter-Branch Trunk", masked: true, theme: "navy", icon: "eye-off" },
      ],
    };
  }

  if (t.includes("file & voice sharing") || t.includes("local file")) {
    return {
      variant: "pipeline-lens",
      leftNodeTheme: "red",
      rightNodeTheme: "navy",
      leftNodeGraphic: "cylinders",
      rightNodeGraphic: "bars",
      topPillText: "Syncing NAS...",
      bottomPillText: "0.4ms VoIP SIP...",
    };
  }

  if (t.includes("managed by local") || t.includes("network engineers")) {
    return {
      variant: "dual-panel-pills",
      ctaButtonText: "Connect NOC",
      ctaTheme: "navy",
      brandHeading: "SASH NOC",
      brandSubheading: "24/7 Link Telemetry",
      pills: [
        { label: "Optical Core Health", value: "99.99% • ONLINE", theme: "red", icon: "activity" },
        { label: "Private VLAN Key", masked: true, theme: "navy", icon: "eye-off" },
        { label: "Thiruvallur Dispatch", value: "24/7 STANDBY", theme: "red", icon: "check" },
      ],
    };
  }

  // Default fallback
  return {
    variant: "pipeline-lens",
    leftNodeTheme: "navy",
    rightNodeTheme: "red",
    leftNodeGraphic: "cylinders",
    rightNodeGraphic: "bars",
    topPillText: "Loading...",
    bottomPillText: "Transforming...",
  };
}

/**
 * 3D Hardware Node Relief Graphics inside the edge-docked blocks
 */
function NodeInnerGraphic({
  type,
  theme,
}: {
  type: "cylinders" | "bars" | "router" | "camera" | "switch" | "noc" | "shield";
  theme: "red" | "navy";
}) {
  const topTint = theme === "red" ? "#FFFFFF" : "#FDEBEB";
  const bodyTint = theme === "red" ? "rgba(253, 235, 235, 0.88)" : "rgba(255, 255, 255, 0.85)";
  const sideShadow = theme === "red" ? "rgba(184, 2, 1, 0.45)" : "rgba(1, 13, 59, 0.45)";

  if (type === "cylinders") {
    return (
      <div className="flex flex-col gap-1.5 w-16 sm:w-20 items-center justify-center py-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative w-full h-4 sm:h-4.5 rounded-[7px]"
            style={{
              background: `linear-gradient(90deg, ${topTint} 0%, ${bodyTint} 65%, ${sideShadow} 100%)`,
              boxShadow:
                "inset 0 1.5px 2px rgba(255,255,255,0.9), 0 3px 6px rgba(0,0,0,0.22)",
            }}
          >
            <div
              className="absolute inset-x-1 top-0.5 h-1 rounded-full opacity-70"
              style={{ background: "#FFFFFF" }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === "bars") {
    return (
      <div className="flex items-end gap-1.5 sm:gap-2 h-14 sm:h-16 px-1 pt-2">
        {[
          { h: "h-6 sm:h-7", w: "w-3.5 sm:w-4" },
          { h: "h-11 sm:h-12", w: "w-3.5 sm:w-4" },
          { h: "h-8 sm:h-9", w: "w-3.5 sm:w-4" },
        ].map((bar, idx) => (
          <div
            key={idx}
            className={`${bar.w} ${bar.h} rounded-t-[5px] rounded-b-[2px] relative`}
            style={{
              background: `linear-gradient(180deg, ${topTint} 0%, ${bodyTint} 75%, ${sideShadow} 100%)`,
              boxShadow:
                "inset 0 1.5px 2px rgba(255,255,255,0.95), 2px 3px 6px rgba(0,0,0,0.22)",
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "camera") {
    return (
      <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${topTint}, ${bodyTint} 65%, ${sideShadow})`,
            boxShadow: "inset 0 2px 3px rgba(255,255,255,0.9), 0 4px 10px rgba(0,0,0,0.28)",
          }}
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-navy border-2 border-white/80 flex items-center justify-center shadow-inner">
            <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "switch" || type === "noc" || type === "router" || type === "shield") {
    return (
      <div className="flex flex-col gap-2 w-16 sm:w-20 items-center justify-center">
        <div
          className="w-full h-7 sm:h-8 rounded-[8px] p-1.5 flex items-center justify-between gap-1"
          style={{
            background: `linear-gradient(180deg, ${topTint} 0%, ${bodyTint} 100%)`,
            boxShadow: "inset 0 1.5px 2px rgba(255,255,255,0.95), 0 3px 6px rgba(0,0,0,0.22)",
          }}
        >
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2, 3, 4, 5].map((p) => (
              <div
                key={p}
                className={`w-1.5 h-1.5 rounded-[2px] ${
                  p % 2 === 0 ? "bg-brand-red" : "bg-brand-navy"
                }`}
              />
            ))}
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-red/20 border border-brand-red flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-brand-red" />
          </div>
        </div>
        <div
          className="w-full h-4 sm:h-4.5 rounded-[6px] flex items-center px-2 gap-1"
          style={{
            background: `linear-gradient(90deg, ${topTint} 0%, ${bodyTint} 80%)`,
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.9), 0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <div className="h-1 flex-1 rounded-full bg-brand-navy/30 overflow-hidden">
            <div className="h-full w-3/4 bg-brand-red rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Reference Card 1 Architecture:
 * Halftone Dot Matrix + Left/Right Edge-Bleeding 3D Nodes + S-Curve Optical Conduit
 * + Central Magnifying Glass with Multi-Strand Core + 2 Leader-Line Callout Pills
 */
function PipelineLensMedia({
  config,
  idx,
}: {
  config: DeliverableMediaConfig;
  idx: number;
}) {
  const leftTheme = config.leftNodeTheme || "navy";
  const rightTheme = config.rightNodeTheme || "red";

  const leftBg =
    leftTheme === "red"
      ? "linear-gradient(145deg, #DE0302 0%, #B80201 100%)"
      : "linear-gradient(145deg, #1A2552 0%, #010D3B 100%)";

  const rightBg =
    rightTheme === "red"
      ? "linear-gradient(145deg, #DE0302 0%, #B80201 100%)"
      : "linear-gradient(145deg, #1A2552 0%, #010D3B 100%)";

  const leftSocketBg = leftTheme === "red" ? "#B80201" : "#1A2552";
  const rightSocketBg = rightTheme === "red" ? "#B80201" : "#1A2552";

  const clipId = `lens-clip-${idx}-${(config.topPillText || "x").replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F4F7_52%,#FDEBEB_100%)] flex items-center justify-center select-none">
      {/* Top & Bottom Radial Halftone Dot Matrix Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-14 sm:h-16 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--brand-navy) 1.6px, transparent 1.7px)",
          backgroundSize: "10px 10px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--brand-navy) 1.6px, transparent 1.7px)",
          backgroundSize: "10px 10px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 15%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 15%, transparent 100%)",
        }}
      />

      {/* Left Edge-Bleeding 3D Hardware Module */}
      <div
        className="absolute -left-5 sm:-left-4 top-[18%] z-20 w-24 min-[360px]:w-27 sm:w-32 h-24 min-[360px]:h-26 sm:h-28 rounded-r-[22px] pl-6 pr-3 py-3 flex flex-col justify-between transition-transform duration-500 ease-out group-hover/stage:translate-x-1"
        style={{
          background: leftBg,
          boxShadow:
            "0 14px 28px rgba(1,13,59,0.22), inset 0 2px 4px rgba(255,255,255,0.42), inset -2px -4px 8px rgba(0,0,0,0.32)",
        }}
      >
        {/* Top-Right Status LEDs */}
        <div className="flex items-center justify-end gap-1.5 pr-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
          <span className="w-1.5 h-1.5 rounded-full bg-red-10/90 shadow-[0_0_6px_#FDEBEB]" />
        </div>

        {/* 3D Inner Hardware Relief */}
        <div className="my-auto flex items-center justify-center">
          <NodeInnerGraphic
            type={config.leftNodeGraphic || "cylinders"}
            theme={leftTheme}
          />
        </div>

        {/* Right Cable Socket Connector */}
        <div
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-3.5 rounded-r-[5px] flex items-center justify-center gap-0.5 px-0.5"
          style={{
            background: leftSocketBg,
            boxShadow:
              "inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 6px rgba(1,13,59,0.25)",
          }}
        >
          <span className="w-0.5 h-0.5 rounded-full bg-white/80" />
          <span className="w-0.5 h-0.5 rounded-full bg-white/80" />
          <span className="w-0.5 h-0.5 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Right Edge-Bleeding 3D Hardware Module */}
      <div
        className="absolute -right-5 sm:-right-4 bottom-[16%] z-20 w-24 min-[360px]:w-27 sm:w-32 h-24 min-[360px]:h-26 sm:h-28 rounded-l-[22px] pr-6 pl-3 py-3 flex flex-col justify-between transition-transform duration-500 ease-out group-hover/stage:-translate-x-1"
        style={{
          background: rightBg,
          boxShadow:
            "0 14px 28px rgba(1,13,59,0.22), inset 0 2px 4px rgba(255,255,255,0.42), inset 2px -4px 8px rgba(0,0,0,0.32)",
        }}
      >
        {/* 3D Inner Hardware Relief */}
        <div className="my-auto flex items-center justify-center">
          <NodeInnerGraphic
            type={config.rightNodeGraphic || "bars"}
            theme={rightTheme}
          />
        </div>

        {/* Bottom-Left Status LEDs */}
        <div className="flex items-center justify-start gap-1.5 pl-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
          <span className="w-1.5 h-1.5 rounded-full bg-red-10/90 shadow-[0_0_6px_#FDEBEB]" />
        </div>

        {/* Left Cable Socket Connector */}
        <div
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-4 h-3.5 rounded-l-[5px] flex items-center justify-center gap-0.5 px-0.5"
          style={{
            background: rightSocketBg,
            boxShadow:
              "inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 6px rgba(1,13,59,0.25)",
          }}
        >
          <span className="w-0.5 h-0.5 rounded-full bg-white/80" />
          <span className="w-0.5 h-0.5 rounded-full bg-white/80" />
          <span className="w-0.5 h-0.5 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Central Conduit, Magnifying Glass & Leader-Line Callout System */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full max-w-[440px] overflow-visible"
          fill="none"
        >
          <defs>
            <clipPath id={clipId}>
              <circle cx="200" cy="118" r="56" />
            </clipPath>
            <linearGradient id={`cable-grad-${clipId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--brand-navy)" />
              <stop offset="50%" stopColor="var(--navy-80)" />
              <stop offset="100%" stopColor="var(--brand-red)" />
            </linearGradient>
            <linearGradient id={`handle-grad-${clipId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--brand-red)" />
              <stop offset="100%" stopColor="var(--brand-red-hover)" />
            </linearGradient>
          </defs>

          {/* Outer Main Conduit Cable (Outside Magnifying Lens) */}
          <path
            d="M 55 98 C 145 98, 255 142, 345 142"
            stroke="rgba(1,13,59,0.14)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 55 94 C 145 94, 255 138, 345 138"
            stroke={`url(#cable-grad-${clipId})`}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Specular cable highlight */}
          <path
            d="M 55 92.5 C 145 92.5, 255 136.5, 345 136.5"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Magnifying Lens Drop Shadow */}
          <circle
            cx="200"
            cy="124"
            r="57"
            fill="none"
            stroke="rgba(1,13,59,0.16)"
            strokeWidth="8"
          />

          {/* Magnifying Lens Glass Interior & Multi-Strand Optical Fibres */}
          <g clipPath={`url(#${clipId})`}>
            {/* Glass background */}
            <circle cx="200" cy="118" r="56" fill="#FFFFFF" />
            <circle
              cx="200"
              cy="118"
              r="56"
              fill="url(#lens-glare)"
              opacity="0.6"
            />

            {/* 5 Magnified Parallel Optical Strands inside Lens */}
            {[-7, -3.5, 0, 3.5, 7].map((offset, sIdx) => (
              <path
                key={sIdx}
                d={`M 130 ${94 + offset} C 165 ${96 + offset}, 235 ${136 + offset}, 270 ${138 + offset}`}
                stroke={sIdx % 2 === 0 ? "var(--brand-red)" : "var(--brand-navy)"}
                strokeWidth={sIdx === 2 ? "2.6" : "2"}
                strokeOpacity={sIdx === 2 ? "1" : "0.82"}
              />
            ))}

            {/* Diagonal Glass Specular Glare */}
            <path
              d="M 145 85 L 185 55 L 205 65 L 155 105 Z"
              fill="rgba(253,235,235,0.55)"
            />
          </g>

          {/* Magnifying Glass Handle Connector Stem */}
          <line
            x1="241"
            y1="159"
            x2="256"
            y2="174"
            stroke="var(--brand-navy)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* 3D Tactile Capsule Handle */}
          <g transform="translate(248, 166) rotate(43)">
            <rect
              x="0"
              y="-8"
              width="44"
              height="16"
              rx="8"
              fill={`url(#handle-grad-${clipId})`}
            />
            <rect
              x="3"
              y="-5.5"
              width="36"
              height="4"
              rx="2"
              fill="rgba(255,255,255,0.4)"
            />
          </g>

          {/* Magnifying Glass Metallic Outer Rim */}
          <circle
            cx="200"
            cy="118"
            r="56"
            stroke="var(--brand-navy)"
            strokeWidth="7"
          />
          <circle
            cx="200"
            cy="118"
            r="56"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
          />

          {/* Orthogonal Leader Line 1: Top-Right Callout -> Strand inside lens */}
          <polyline
            points="222,122 222,74 232,74"
            fill="none"
            stroke="var(--brand-navy)"
            strokeWidth="1.3"
            strokeOpacity="0.45"
          />
          <circle cx="222" cy="122" r="2.5" fill="var(--brand-red)" />

          {/* Orthogonal Leader Line 2: Bottom-Left Callout -> Strand inside lens */}
          <polyline
            points="188,113 188,162 178,162"
            fill="none"
            stroke="var(--brand-navy)"
            strokeWidth="1.3"
            strokeOpacity="0.45"
          />
          <circle cx="188" cy="113" r="2.5" fill="var(--brand-navy)" />
        </svg>

        {/* Floating Callout Pill 1 (Top-Right of Lens) */}
        <div
          className="absolute top-[19%] right-[13%] min-[360px]:right-[15%] sm:right-[18%] z-30 inline-flex items-center gap-1.5 sm:gap-2 rounded-[10px] bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 border border-border transition-transform duration-300 group-hover/stage:-translate-y-0.5"
          style={{
            boxShadow: "0 8px 20px rgba(1,13,59,0.10)",
          }}
        >
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-[2.5px] border-brand-red shrink-0" />
          <span className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-medium text-brand-navy whitespace-nowrap">
            {config.topPillText || "Loading..."}
          </span>
        </div>

        {/* Floating Callout Pill 2 (Bottom-Left of Lens) */}
        <div
          className="absolute bottom-[21%] left-[11%] min-[360px]:left-[13%] sm:left-[16%] z-30 inline-flex items-center gap-1.5 sm:gap-2 rounded-[10px] bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 border border-border transition-transform duration-300 group-hover/stage:translate-y-0.5"
          style={{
            boxShadow: "0 8px 20px rgba(1,13,59,0.10)",
          }}
        >
          <span className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-medium text-brand-navy whitespace-nowrap">
            {config.bottomPillText || "Transforming..."}
          </span>
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-[2.5px] border-brand-navy shrink-0" />
        </div>
      </div>
    </div>
  );
}

/**
 * Reference Card 2 Architecture:
 * Dual-Panel Split Container with Concentric Ripple Waves,
 * 3D Tactile Action Pill + 3D White Cursor on Left,
 * and Staggered Edge-Bleeding 3D Security / Telemetry Pills on Right
 */
function DualPanelPillsMedia({
  config,
}: {
  config: DeliverableMediaConfig;
}) {
  const ctaIsRed = (config.ctaTheme || "red") === "red";
  const ctaGradient = ctaIsRed
    ? "linear-gradient(180deg, #DE0302 0%, #B80201 100%)"
    : "linear-gradient(180deg, #1A2552 0%, #010D3B 100%)";
  const ctaShadow = ctaIsRed
    ? "0 10px 20px rgba(222,3,2,0.32), inset 0 2px 3px rgba(255,255,255,0.5), inset 0 -3px 5px rgba(0,0,0,0.28)"
    : "0 10px 20px rgba(1,13,59,0.32), inset 0 2px 3px rgba(255,255,255,0.45), inset 0 -3px 5px rgba(0,0,0,0.35)";

  const pills = config.pills || [];
  const topPill = pills[0] || { label: "Primary Metric", masked: true, theme: "red" };
  const bottomLeftPill = pills[1] || { label: "Page impressions", masked: true, theme: "navy" };
  const bottomRightPill = pills[2] || { label: "Product Conversions", masked: true, theme: "red" };

  const renderPillIcon = (iconType?: string) => {
    switch (iconType) {
      case "lock":
        return <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 shrink-0" />;
      case "shield":
        return <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 shrink-0" />;
      case "check":
        return <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 shrink-0" />;
      case "activity":
        return <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 shrink-0" />;
      case "wifi":
        return <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 shrink-0" />;
      default:
        return <EyeOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 shrink-0" />;
    }
  };

  const getPillStyle = (theme?: "red" | "navy") => {
    const isRed = theme === "red";
    return {
      background: isRed
        ? "linear-gradient(180deg, #DE0302 0%, #B80201 100%)"
        : "linear-gradient(180deg, #1A2552 0%, #010D3B 100%)",
      boxShadow: isRed
        ? "0 8px 16px rgba(222,3,2,0.25), inset 0 2px 3px rgba(255,255,255,0.48), inset 0 -3px 5px rgba(0,0,0,0.26)"
        : "0 8px 16px rgba(1,13,59,0.24), inset 0 2px 3px rgba(255,255,255,0.42), inset 0 -3px 5px rgba(0,0,0,0.32)",
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[linear-gradient(135deg,#FDEBEB_0%,#F3F4F7_50%,#E2E5EE_100%)] p-2.5 min-[360px]:p-3 sm:p-4 pb-8 sm:pb-10 grid grid-cols-12 gap-2.5 sm:gap-3 select-none">
      {/* Left Sub-Card: Concentric Ripple Waves + Tactile 3D Button + Cursor + Brand Label */}
      <div className="col-span-5 relative rounded-[18px] sm:rounded-[20px] bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8F8_60%,#FDEBEB_100%)] border border-white shadow-[0_6px_18px_rgba(1,13,59,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col items-center justify-center p-2.5 sm:p-3">
        {/* Concentric Ripple Waves Behind Action Pill */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-14 sm:w-32 sm:h-16 rounded-full border border-brand-red/[0.12] bg-brand-red/[0.02]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-20 sm:w-42 sm:h-24 rounded-full border border-brand-red/[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-28 sm:w-52 sm:h-32 rounded-full border border-brand-navy/[0.04]"
        />

        {/* Tactile 3D Pill Button with 3D Pointer Cursor */}
        <div className="relative z-10 mt-1 mb-3 sm:mb-4">
          <div
            className="px-3 min-[360px]:px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-[10px] min-[360px]:text-[11px] sm:text-xs font-medium tracking-tight whitespace-nowrap transition-transform duration-300 group-hover/stage:scale-105"
            style={{
              background: ctaGradient,
              boxShadow: ctaShadow,
            }}
          >
            {config.ctaButtonText || "Connect with"}
          </div>

          {/* 3D White Pointer Cursor Overlapping Bottom-Right */}
          <svg
            viewBox="0 0 28 28"
            className="w-5 h-5 sm:w-6 sm:h-6 absolute -bottom-2.5 -right-2 drop-shadow-[0_4px_6px_rgba(1,13,59,0.28)] transition-transform duration-300 group-hover/stage:translate-x-0.5 group-hover/stage:-translate-y-0.5"
            fill="none"
          >
            <path
              d="M6 3L23 11.5L15.2 14.3L18.5 22L15.2 23.5L11.8 15.8L6 20.5V3Z"
              fill="#FFFFFF"
              stroke="var(--brand-navy)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Clean Brand / Feature Typography Below */}
        <div className="relative z-10 text-center">
          <p className="text-brand-navy font-semibold text-sm min-[360px]:text-base sm:text-lg leading-tight tracking-tight">
            {config.brandHeading || "SASH Core"}
          </p>
          <p className="text-neutral-600 text-[9.5px] min-[360px]:text-[10.5px] sm:text-xs font-medium leading-tight mt-0.5">
            {config.brandSubheading || "Optical Network"}
          </p>
        </div>
      </div>

      {/* Right Sub-Card: Two Rows of Horizontally Staggered Edge-Bleeding 3D Pills */}
      <div className="col-span-7 relative rounded-[18px] sm:rounded-[20px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F4F7_55%,#FDEBEB_100%)] border border-white shadow-[0_6px_18px_rgba(1,13,59,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col justify-center gap-2.5 sm:gap-3.5 py-2.5">
        {/* Faint concentric ripple arc in top-right background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full border border-brand-navy/[0.05]"
        />

        {/* Row 1: Left edge-bleeding pill + Centered Primary Pill + Right edge-bleeding pill */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-medium text-brand-navy mb-1 tracking-tight">
            {topPill.label}
          </span>

          <div className="w-full flex items-center justify-center gap-2 sm:gap-2.5">
            {/* Left Partial Bleeding Pill */}
            <div
              className="-ml-10 sm:-ml-12 w-14 sm:w-16 h-7 sm:h-8 rounded-full flex items-center justify-end pr-2.5 shrink-0 opacity-90"
              style={getPillStyle(topPill.theme === "red" ? "navy" : "red")}
            >
              <EyeOff className="w-3 h-3 text-white/85" />
            </div>

            {/* Center Full Tactile 3D Pill */}
            <div
              className="h-7 sm:h-8 px-3 sm:px-4 rounded-full flex items-center justify-center gap-1.5 sm:gap-2 text-white shrink-0 transition-transform duration-300 group-hover/stage:scale-[1.03]"
              style={getPillStyle(topPill.theme)}
            >
              {topPill.masked ? (
                <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-white/95 pt-0.5">
                  ******
                </span>
              ) : (
                <span className="font-mono text-[9.5px] sm:text-[10.5px] font-semibold tracking-wider text-white">
                  {topPill.value}
                </span>
              )}
              {renderPillIcon(topPill.icon)}
            </div>

            {/* Right Partial Bleeding Pill */}
            <div
              className="-mr-10 sm:-mr-12 w-14 sm:w-16 h-7 sm:h-8 rounded-full flex items-center justify-start pl-2.5 shrink-0 opacity-90"
              style={getPillStyle(topPill.theme === "red" ? "navy" : "red")}
            >
              <span className="font-mono text-[11px] text-white/85">**</span>
            </div>
          </div>
        </div>

        {/* Row 2: Two Staggered Edge-Bleeding Pills with Individual Labels */}
        <div className="relative z-10 w-full grid grid-cols-2 gap-2 sm:gap-2.5 items-end">
          {/* Bottom-Left Bleeding Pill */}
          <div className="flex flex-col items-start -ml-3 sm:-ml-4">
            <span className="text-[8.5px] min-[360px]:text-[9.5px] sm:text-[10.5px] font-medium text-brand-navy mb-1 pl-4 sm:pl-5 truncate max-w-full">
              {bottomLeftPill.label}
            </span>
            <div
              className="w-full h-7 sm:h-8 pl-4 pr-2.5 sm:pr-3 rounded-r-full flex items-center justify-end gap-1.5 text-white"
              style={getPillStyle(bottomLeftPill.theme)}
            >
              {bottomLeftPill.masked ? (
                <span className="font-mono text-[10.5px] sm:text-xs tracking-[0.18em] text-white/95 pt-0.5">
                  *****
                </span>
              ) : (
                <span className="font-mono text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider text-white truncate">
                  {bottomLeftPill.value}
                </span>
              )}
              {renderPillIcon(bottomLeftPill.icon)}
            </div>
          </div>

          {/* Bottom-Right Bleeding Pill */}
          <div className="flex flex-col items-end -mr-3 sm:-mr-4">
            <span className="text-[8.5px] min-[360px]:text-[9.5px] sm:text-[10.5px] font-medium text-brand-navy mb-1 pr-4 sm:pr-5 truncate max-w-full">
              {bottomRightPill.label}
            </span>
            <div
              className="w-full h-7 sm:h-8 pl-2.5 sm:pl-3 pr-4 rounded-l-full flex items-center justify-start gap-1.5 text-white"
              style={getPillStyle(bottomRightPill.theme)}
            >
              {renderPillIcon(bottomRightPill.icon)}
              {bottomRightPill.masked ? (
                <span className="font-mono text-[10.5px] sm:text-xs tracking-[0.18em] text-white/95 pt-0.5">
                  *****
                </span>
              ) : (
                <span className="font-mono text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider text-white truncate">
                  {bottomRightPill.value}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Deliverable Media Stage Component rendered in the top media section of FlippableDeliverableCard
 */
export function ServiceDeliverableMediaStage({
  title,
  idx,
}: {
  title: string;
  idx: number;
}) {
  const config = getDeliverableMediaConfig(title);

  if (config.variant === "dual-panel-pills") {
    return <DualPanelPillsMedia config={config} />;
  }

  return <PipelineLensMedia config={config} idx={idx} />;
}
