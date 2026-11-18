"use client";

import React from "react";
import { LineChart, BadgeCheck, ScanSearch } from "lucide-react";

const LEFT_INTEGRATIONS = [
  {
    id: "openai-agents",
    name: "OpenAI Agents SDK",
    ariaLabel: "OpenAI Agents SDK integration",
    renderLogo: () => (
      <div className="flex items-center gap-2.5 text-[#111322]">
        <svg
          className="w-6 h-6 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <path d="M12 3a4.5 4.5 0 0 0-3.89 2.25L4.5 11.5a4.5 4.5 0 0 0 0 4.5l3.61 6.25a4.5 4.5 0 0 0 7.78 0l3.61-6.25a4.5 4.5 0 0 0 0-4.5L15.89 5.25A4.5 4.5 0 0 0 12 3Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
        <div className="flex flex-col text-left leading-tight">
          <span className="font-bold text-[15px] tracking-tight">OpenAI</span>
          <span className="text-[11px] font-medium text-[#656882]">
            Agents SDK
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "autogen",
    name: "AutoGen",
    ariaLabel: "Microsoft AutoGen integration",
    renderLogo: () => (
      <div className="flex items-center gap-2.5 text-[#111322]">
        <svg
          className="w-6 h-6 shrink-0 text-[#5B4FE9]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="12,2 21,7 21,17 12,22 3,17 3,7"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        </svg>
        <span className="font-bold text-[17px] tracking-tight">AutoGen</span>
      </div>
    ),
  },
  {
    id: "camel-ai",
    name: "CAMEL-AI",
    ariaLabel: "CAMEL-AI framework integration",
    renderLogo: () => (
      <div className="flex items-center gap-2.5 text-[#111322]">
        <svg
          className="w-6 h-6 shrink-0 text-[#6C5CE7]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 17c2-6 5-9 8-4s6 2 8-5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="7" cy="9" r="2" fill="currentColor" />
          <circle cx="17" cy="8" r="2" fill="currentColor" />
        </svg>
        <span className="font-extrabold text-[16px] tracking-wider">
          CAMEL-AI
        </span>
      </div>
    ),
  },
];

const RIGHT_INTEGRATIONS = [
  {
    id: "crewai",
    name: "CrewAI",
    ariaLabel: "CrewAI framework integration",
    renderLogo: () => (
      <div className="flex items-center gap-2 text-[#111322]">
        <svg
          className="w-6 h-6 shrink-0 text-[#E8503A]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 1 0 9 9h-3a6 6 0 1 1-6-6V3Z" />
          <circle cx="16.5" cy="7.5" r="2.5" />
        </svg>
        <span className="font-bold text-[18px] tracking-tight">crewAI</span>
      </div>
    ),
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    ariaLabel: "LlamaIndex framework integration",
    renderLogo: () => (
      <div className="flex items-center gap-2.5 text-[#111322]">
        <svg
          className="w-6 h-6 shrink-0 text-[#7C3AED]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="7" height="7" rx="2" />
          <rect x="13" y="4" width="7" height="7" rx="2" />
          <rect x="4" y="13" width="7" height="7" rx="2" />
          <circle cx="16.5" cy="16.5" r="3.5" />
        </svg>
        <span className="font-bold text-[16px] tracking-tight">
          LlamaIndex
        </span>
      </div>
    ),
  },
  {
    id: "langchain",
    name: "LangChain",
    ariaLabel: "LangChain framework integration",
    renderLogo: () => (
      <div className="flex items-center gap-2 text-[#111322]">
        <svg
          className="w-6 h-6 shrink-0 text-[#1C3C3C]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          aria-hidden="true"
        >
          <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            strokeLinecap="round"
          />
          <path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-bold text-[16px] tracking-tight">LangChain</span>
      </div>
    ),
  },
];

const CAPABILITY_ITEMS = [
  {
    id: "analytics",
    label: "Analytics",
    Icon: LineChart,
  },
  {
    id: "evals",
    label: "Evals",
    Icon: BadgeCheck,
  },
  {
    id: "monitoring",
    label: "Monitoring",
    Icon: ScanSearch,
  },
];

/**
 * IntegrationCard: Raised white pill-style card (~225x105px) with soft lavender shadow and bottom edge
 */
export function IntegrationCard({ item }) {
  return (
    <div
      role="listitem"
      aria-label={item.ariaLabel}
      className="group relative z-10 flex h-[105px] w-full md:w-[225px] items-center justify-center rounded-2xl bg-white px-6 border border-[#ECEAF8] border-b-[4px] border-b-[#DDD9F2] shadow-[0_10px_25px_rgba(120,110,200,0.15)] transition-all duration-200 ease-out hover:-translate-y-1 select-none"
    >
      {item.renderLogo()}
    </div>
  );
}

/**
 * HubChip: Center rounded-square (~140px) dotted pad containing a dark navy gradient tile with white logo mark
 */
export function HubChip() {
  return (
    <div
      aria-label="Central SDK Integration Hub"
      className="relative z-20 flex h-[140px] w-[140px] items-center justify-center rounded-[32px] border border-[#E2E0F5] bg-white/90 p-3 shadow-[0_16px_40px_rgba(108,92,231,0.18),0_2px_6px_rgba(108,92,231,0.08)]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(120, 110, 180, 0.22) 1px, transparent 1px)",
        backgroundSize: "8px 8px",
      }}
    >
      {/* Inner Dark Navy Gradient Tile */}
      <div className="flex h-[94px] w-[94px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#1F2242] via-[#111328] to-[#080916] shadow-[0_10px_24px_rgba(12,14,32,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)]">
        {/* White Geometric SDK Mark */}
        <svg
          className="h-10 w-10 text-white drop-shadow-[0_2px_8px_rgba(160,150,255,0.5)]"
          viewBox="0 0 36 36"
          fill="none"
          role="img"
          aria-label="Core SDK Logo"
        >
          <path
            d="M18 4L30 11V25L18 32L6 25V11L18 4Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M18 11L24 14.5V21.5L18 25L12 21.5V14.5L18 11Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * ConnectorLines: Layered SVG behind cards with 1px #D9D8EE paths and animated #6C5CE7 pulses
 */
export function ConnectorLines() {
  // Left paths: from right edge of left cards (x=225) to left edge of hub (x=430)
  const leftPaths = [
    "M 225 52 C 325 52, 330 192, 430 192", // Top-left elbow curve
    "M 225 210 L 430 210", // Middle-left straight horizontal
    "M 225 368 C 325 368, 330 228, 430 228", // Bottom-left elbow curve
  ];

  // Right paths: from left edge of right cards (x=775) to right edge of hub (x=570)
  const rightPaths = [
    "M 775 52 C 675 52, 670 192, 570 192", // Top-right elbow curve
    "M 775 210 L 570 210", // Middle-right straight horizontal
    "M 775 368 C 675 368, 670 228, 570 228", // Bottom-right elbow curve
  ];

  // Bottom branches: from bottom of hub (x=500, y=280) splitting to Analytics (390), Evals (500), Monitoring (610)
  const bottomPaths = [
    "M 500 280 L 500 335 Q 500 355 480 355 L 410 355 Q 390 355 390 375 L 390 422",
    "M 500 280 L 500 422",
    "M 500 280 L 500 335 Q 500 355 520 355 L 590 355 Q 610 355 610 375 L 610 422",
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 520"
      fill="none"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block z-0"
    >
      <defs>
        {/* Left-to-Hub Purple Pulse Gradient */}
        <linearGradient id="pulseGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0" />
          <stop offset="50%" stopColor="#6C5CE7" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#A29BFE" stopOpacity="0" />
        </linearGradient>

        {/* Right-to-Hub Purple Pulse Gradient */}
        <linearGradient id="pulseGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0" />
          <stop offset="50%" stopColor="#6C5CE7" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#A29BFE" stopOpacity="0" />
        </linearGradient>

        {/* Hub-to-Bottom Vertical Pulse Gradient */}
        <linearGradient id="pulseGradDown" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0" />
          <stop offset="60%" stopColor="#6C5CE7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A29BFE" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base Static Connector Lines (1px #D9D8EE) */}
      {[...leftPaths, ...rightPaths, ...bottomPaths].map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          stroke="#D9D8EE"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      ))}

      {/* Animated Left Pulses Traveling Toward Hub */}
      {leftPaths.map((d, i) => (
        <path
          key={`pulse-l-${i}`}
          d={d}
          stroke="url(#pulseGradLeft)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="56 260"
          style={{
            animation: `sdkPulseToHub 3s linear infinite`,
            animationDelay: `${i * 0.45}s`,
          }}
        />
      ))}

      {/* Animated Right Pulses Traveling Toward Hub */}
      {rightPaths.map((d, i) => (
        <path
          key={`pulse-r-${i}`}
          d={d}
          stroke="url(#pulseGradRight)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="56 260"
          style={{
            animation: `sdkPulseToHub 3s linear infinite`,
            animationDelay: `${i * 0.45 + 0.2}s`,
          }}
        />
      ))}

      {/* Animated Bottom Pulses Traveling Down to Analytics, Evals, Monitoring */}
      {bottomPaths.map((d, i) => (
        <path
          key={`pulse-b-${i}`}
          d={d}
          stroke="url(#pulseGradDown)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="40 220"
          style={{
            animation: `sdkPulseToHub 3s linear infinite`,
            animationDelay: `${i * 0.35 + 0.6}s`,
          }}
        />
      ))}
    </svg>
  );
}

/**
 * IntegrationsSection: Main component recreating "One SDK. Many integrations."
 */
export default function IntegrationsSection() {
  return (
    <section
      aria-labelledby="integrations-heading"
      className="relative w-full overflow-hidden bg-[#F1F1FA] py-[88px] md:py-[120px] px-4 sm:px-6"
    >
      {/* Font & Keyframes Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&display=swap');

        @keyframes sdkPulseToHub {
          0% {
            stroke-dashoffset: 316;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* Soft Radial Purple Glow Behind Center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(160, 150, 255, 0.18), transparent 60%)",
        }}
      />

      {/* Faint Dotted/Halftone Texture Overlay with Edge Fade Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(120, 110, 180, 0.12) 1px, transparent 1px)",
          backgroundSize: "6px 6px",
          maskImage:
            "radial-gradient(ellipse 68% 62% at 50% 55%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 62% at 50% 55%, black 30%, transparent 85%)",
        }}
      />

      {/* Subtle Blurred White Circles Under Hub Area for Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full bg-white/65 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-white/80 blur-xl"
      />

      {/* Main Content Container (max-width ~1100px) */}
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Section Header */}
        <header className="mx-auto mb-14 md:mb-16 max-w-3xl text-center">
          <h2
            id="integrations-heading"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
            className="text-3xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-[#0E1126] leading-[1.12] mb-4"
          >
            One SDK. Many integrations.
          </h2>
          <p className="text-base sm:text-[18px] text-[#686B85] font-normal">
            Native integrations with the top agent frameworks
          </p>
        </header>

        {/* DESKTOP DIAGRAM (>= 768px) */}
        <div className="relative mx-auto hidden md:block h-[520px] w-full max-w-[1000px]">
          {/* Background SVG Connector Lines */}
          <ConnectorLines />

          {/* 3-Column Diagram Grid */}
          <div className="relative z-10 grid h-full grid-cols-3 items-start">
            {/* Left Column: 3 Stacked Cards */}
            <div
              role="list"
              aria-label="Left framework integrations"
              className="flex flex-col items-start justify-between h-[420px]"
            >
              {LEFT_INTEGRATIONS.map((item) => (
                <IntegrationCard key={item.id} item={item} />
              ))}
            </div>

            {/* Center Column: Hub Chip + 3 Capability Icon Buttons Below */}
            <div className="flex flex-col items-center justify-between h-full pt-[140px] pb-2">
              <HubChip />

              {/* Three Circular Icon Buttons: Analytics, Evals, Monitoring */}
              <div
                role="group"
                aria-label="Core SDK capabilities"
                className="flex items-center justify-center gap-9"
              >
                {CAPABILITY_ITEMS.map(({ id, label, Icon }) => (
                  <div
                    key={id}
                    className="flex flex-col items-center gap-2"
                  >
                    <button
                      type="button"
                      aria-label={label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E2E0F5] bg-white text-[#232645] shadow-[0_6px_18px_rgba(120,110,200,0.16)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[#6C5CE7]"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span className="text-xs font-medium text-[#5A5D78]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 3 Stacked Cards */}
            <div
              role="list"
              aria-label="Right framework integrations"
              className="flex flex-col items-end justify-between h-[420px]"
            >
              {RIGHT_INTEGRATIONS.map((item) => (
                <IntegrationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT (< 768px): Hub on top, 2-col card grid, then 3 icon buttons */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          {/* 1. Hub on top */}
          <HubChip />

          {/* 2. Cards in a 2-column grid */}
          <div
            role="list"
            aria-label="Framework integrations"
            className="grid w-full grid-cols-2 gap-3.5"
          >
            {[...LEFT_INTEGRATIONS, ...RIGHT_INTEGRATIONS].map((item) => (
              <IntegrationCard key={item.id} item={item} />
            ))}
          </div>

          {/* 3. Three circular icon buttons in a row */}
          <div
            role="group"
            aria-label="Core SDK capabilities"
            className="flex items-center justify-center gap-8 pt-2"
          >
            {CAPABILITY_ITEMS.map(({ id, label, Icon }) => (
              <div key={id} className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E2E0F5] bg-white text-[#232645] shadow-[0_6px_18px_rgba(120,110,200,0.16)]"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="text-xs font-medium text-[#5A5D78]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
