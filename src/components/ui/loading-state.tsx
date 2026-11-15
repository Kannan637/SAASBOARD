"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────────────────────
 * LOADING STATE — pixel-grid loader for long-running work
 *
 * Variants:
 *   Drive  — square cells, chevron wavefront driving right;
 *            the 650ms cycle is shorter than the sweep, so
 *            two fronts are always in flight
 *   Dots   — same wavefront, circular cells
 *   Orbit  — a comet lapping the grid perimeter
 *   Surfer — the Drive loader paired with a meme video below
 *
 * Paired with a shimmering label and a live elapsed timer
 * in mono tabular figures. Reduced motion freezes the grid
 * to its dim state; the timer still ticks.
 * ───────────────────────────────────────────────────────── */

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3),
    c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const orbit = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_ORDER.indexOf(i);
  return k === -1 ? null : k * 110;
});

const PATTERNS: Record<
  string,
  { delays: (number | null)[]; dur: number; round: boolean }
> = {
  Drive: { delays: chevron, dur: 650, round: false },
  Dots: { delays: chevron, dur: 650, round: true },
  Orbit: { delays: orbit, dur: 950, round: false },
};

function LoaderGrid({
  delays,
  dur,
  round,
}: {
  delays: (number | null)[];
  dur: number;
  round: boolean;
}) {
  return (
    <span
      aria-hidden
      className="grid shrink-0 grid-cols-[repeat(3,4px)] gap-[1.5px]"
    >
      {delays.map((delay, index) => (
        <span
          key={index}
          className={`size-[4px] bg-ink ${round ? "rounded-full" : "rounded-[1px]"}`}
          style={{
            opacity: delay === null ? 0.07 : 0.15,
            animation:
              delay === null
                ? "none"
                : `pixel-on ${dur}ms ease-in-out ${delay}ms infinite`,
          }}
        />
      ))}
    </span>
  );
}

export default function LoadingState({
  label,
  variant = "Drive",
  /** the meme feed for the Surfer variant; hosted on Vercel Blob so it plays in
   *  production (the local /public/subway-surfers.mp4 stays gitignored).
   *  Heavily compressed (288px, 20fps, no audio → ~265 KB, from 1.1 MB) to keep
   *  Blob data transfer down. */
  videoSrc = "https://95dnc2a95qgwt9ff.public.blob.vercel-storage.com/subway-surfers-min.mp4",
}: {
  label?: string;
  variant?: string;
  videoSrc?: string;
}) {
  const surfer = variant === "Surfer";
  const resolvedLabel = label ?? (surfer ? "Subway surfing" : "Churning");
  const [videoOk, setVideoOk] = useState(true);
  const { delays, dur, round } = PATTERNS[variant] ?? PATTERNS.Drive;

  const labelEl = (
    <span
      className="bg-clip-text text-[13px] font-medium text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%)",
        backgroundSize: "200% 100%",
        animation: "shimmer-text 1.4s linear infinite",
      }}
    >
      {resolvedLabel}
    </span>
  );

  if (surfer) {
    return (
      <div role="status" className="flex w-fit flex-col items-start">
        <div className="flex items-center gap-2.5">
          <LoaderGrid {...PATTERNS.Drive} />
          {labelEl}
        </div>

        {/* the context card follows the status text it is illustrating */}
        <div
          className="mt-2 w-56 overflow-hidden rounded-[10px] shadow-overlay"
          style={{
            animation: "pop-in 200ms cubic-bezier(0.16,1,0.3,1) both",
            transformOrigin: "top left",
          }}
        >
          <div
            className="relative aspect-video w-full"
            style={{ background: "var(--tooltip-bg)" }}
          >
            {videoOk ? (
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoOk(false)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
                <LoaderGrid {...PATTERNS.Drive} />
                <span
                  className="px-3 text-center font-mono text-[10px]"
                  style={{ color: "var(--tooltip-muted)" }}
                >
                  Video unavailable
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div role="status" className="flex w-fit items-center gap-2.5">
      <LoaderGrid delays={delays} dur={dur} round={round} />
      {labelEl}
    </div>
  );
}

/**
 * Global slow-load & slow-navigation indicator.
 * Stays hidden on fast loads and only mounts <LoadingState /> when initial
 * hydration/assets take >450ms or route navigation takes >300ms.
 */
export function SlowConnectionLoader() {
  const pathname = usePathname();
  const [slowReason, setSlowReason] = useState<string | null>(null);

  // Detect slow initial document / subresource load (>450ms)
  useEffect(() => {
    if (typeof window === "undefined" || document.readyState === "complete") {
      return;
    }

    const showTimer = window.setTimeout(() => {
      setSlowReason("Loading SASH Broadband");
    }, 450);

    const verySlowTimer = window.setTimeout(() => {
      setSlowReason("Still loading — slow connection");
    }, 3500);

    const handleLoaded = () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(verySlowTimer);
      setSlowReason(null);
    };

    window.addEventListener("load", handleLoaded, { once: true });

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(verySlowTimer);
      window.removeEventListener("load", handleLoaded);
    };
  }, []);

  // Detect slow client-side Next.js route transitions (>300ms)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let navShowTimer: number | null = null;
    let navVerySlowTimer: number | null = null;

    const clearNavTimers = () => {
      if (navShowTimer !== null) {
        window.clearTimeout(navShowTimer);
        navShowTimer = null;
      }
      if (navVerySlowTimer !== null) {
        window.clearTimeout(navVerySlowTimer);
        navVerySlowTimer = null;
      }
    };

    // Route finished resolving when pathname updates
    const settleRaf = window.requestAnimationFrame(() => {
      clearNavTimers();
      setSlowReason((prev) =>
        prev === "Loading page..." || prev === "Still loading — slow connection"
          ? null
          : prev
      );
    });

    const handleLinkClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor =
        e.target instanceof Element ? e.target.closest("a") : null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.origin !== window.location.origin) return;
        if (targetUrl.pathname === pathname) return;
      } catch {
        return;
      }

      clearNavTimers();
      navShowTimer = window.setTimeout(() => {
        setSlowReason("Loading page...");
      }, 300);
      navVerySlowTimer = window.setTimeout(() => {
        setSlowReason("Still loading — slow connection");
      }, 3500);
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.cancelAnimationFrame(settleRaf);
      clearNavTimers();
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  if (!slowReason) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
    >
      <div
        className="pointer-events-auto"
        style={{
          animation: "pop-in 200ms cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <LoadingState variant="Drive" label={slowReason} />
      </div>
    </div>
  );
}

