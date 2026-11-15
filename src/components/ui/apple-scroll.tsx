"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Cubic-bezier tuple kept for Framer Motion carousel components (e.g. Hero)
 * alongside GSAP's `expo.out` curve.
 */
export const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

let gsapPluginsRegistered = false;

function ensureGsapPlugins(): void {
  if (typeof window === "undefined" || gsapPluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsapPluginsRegistered = true;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Global GSAP Scroll & Route Section Choreographer
 * - Uses 100% native browser composited scrolling (zero blocking `wheel`
 *   hijacking so trackpads, notched mice, scrollbars, and sticky sections never snag).
 * - Smoothly scrolls same-page hash anchors via GSAP `ScrollToPlugin`.
 * - Keeps GSAP `ScrollTrigger` synced across image loads and FAQ/layout resizes.
 * - Automatically animates `<section>` and `<article>` elements on inner pages
 *   using GSAP `ScrollTrigger`.
 */
export function AppleSmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Smooth hash anchor navigation via GSAP ScrollToPlugin + layout refresh sync
  useEffect(() => {
    if (typeof window === "undefined") return;
    ensureGsapPlugins();

    let activeTween: gsap.core.Tween | null = null;
    let refreshRafId: number | null = null;

    const scheduleRefresh = () => {
      if (refreshRafId !== null) return;
      refreshRafId = window.requestAnimationFrame(() => {
        refreshRafId = null;
        ScrollTrigger.refresh();
      });
    };

    const onAnchorClick = (e: MouseEvent) => {
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

      const target = e.target instanceof Element ? e.target.closest("a") : null;
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      let hash = "";
      if (href.startsWith("#") && href.length > 1) {
        hash = href.slice(1);
      } else if (href.startsWith("/#") && pathname === "/") {
        hash = href.slice(2);
      }

      if (!hash) return;
      const hashEl = document.getElementById(hash);
      if (!hashEl) return;

      e.preventDefault();
      activeTween?.kill();

      if (prefersReducedMotion()) {
        const top =
          hashEl.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
        return;
      }

      activeTween = gsap.to(window, {
        duration: 0.85,
        scrollTo: { y: hashEl, offsetY: 88, autoKill: true },
        ease: "power3.out",
        onComplete: () => ScrollTrigger.update(),
      });
    };

    const mainEl = document.getElementById("main-content");
    const resizeObserver =
      mainEl && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => scheduleRefresh())
        : null;

    if (mainEl && resizeObserver) {
      resizeObserver.observe(mainEl);
    }

    document.addEventListener("click", onAnchorClick);
    window.addEventListener("load", scheduleRefresh);

    return () => {
      activeTween?.kill();
      if (refreshRafId !== null) window.cancelAnimationFrame(refreshRafId);
      resizeObserver?.disconnect();
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", scheduleRefresh);
    };
  }, [pathname]);

  return <>{children}</>;
}

export const GsapSmoothScrollProvider = AppleSmoothScrollProvider;

/**
 * AppleReveal: GSAP ScrollTrigger upward + scale + opacity entrance when scrolled into view
 */
export function AppleReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 32,
  scaleFrom = 0.97,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  scaleFrom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || prefersReducedMotion()) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: yOffset, scale: scaleFrom },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay,
          ease: "expo.out",
          clearProps: "willChange,transform",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, yOffset, scaleFrom]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/**
 * AppleStagger: GSAP ScrollTrigger container that staggers children cleanly
 */
export function AppleStagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || prefersReducedMotion()) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const items = Array.from(
        el.querySelectorAll<HTMLElement>('[data-gsap-stagger-item="true"]')
      ).filter((item) => item.closest('[data-gsap-stagger-root="true"]') === el);

      if (items.length === 0) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.04,
          stagger: 0.09,
          ease: "expo.out",
          clearProps: "willChange,transform",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} data-gsap-stagger-root="true" className={className}>
      {children}
    </div>
  );
}

/**
 * AppleStaggerItem: Individual card/item inside an AppleStagger grid
 */
export function AppleStaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-gsap-stagger-item="true"
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * AppleScrollScale: GSAP ScrollTrigger scrubbed scale + parallax entrance
 */
export function AppleScrollScale({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || prefersReducedMotion()) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0.95, y: 28, opacity: 0.5 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 42%",
            scrub: 0.65,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
