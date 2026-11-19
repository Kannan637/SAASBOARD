"use client";

import React, { useEffect, useRef } from "react";

export type CardPatternType =
  | "glyph"
  | "halftone"
  | "glass"
  | "stripes"
  | "optical-mesh";

export interface CardCanvasPatternProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pattern: CardPatternType;
  seed?: number;
}

// Seeded PRNG (Mulberry32) for deterministic rendering across page reloads
function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Linear color interpolation
function interpolateColor(
  c1: [number, number, number],
  c2: [number, number, number],
  factor: number
): [number, number, number] {
  const f = Math.max(0, Math.min(1, factor));
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * f),
    Math.round(c1[1] + (c2[1] - c1[1]) * f),
    Math.round(c1[2] + (c2[2] - c1[2]) * f),
  ];
}

/**
 * Pattern 1: Glyph glow
 * Vertical gradient from near-black navy (#00030d) at top to bright blue (#2a7be0)
 * to pale blue (#bfe3ff) at bottom. Overlay a grid of small "↗" arrow glyphs (~18px spacing)
 * in light blue, strongest at left/right edges and fading out toward center and bottom.
 */
export function drawGlyphPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 42
) {
  const rng = createSeededRandom(seed);

  // Vertical gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, "#00030d");
  bgGrad.addColorStop(0.55, "#2a7be0");
  bgGrad.addColorStop(1, "#bfe3ff");

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Grid of "↗" arrow glyphs
  const step = 18;
  ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let y = step / 2; y < height; y += step) {
    const ny = y / height;
    // Fades toward bottom
    const vertFade = Math.max(0, 1 - ny * 0.88);

    for (let x = step / 2; x < width; x += step) {
      const nx = x / width;
      // Strongest at left and right edges, fading toward center
      const distFromCenter = Math.abs(nx - 0.5) * 2;
      const edgeStrength = Math.pow(distFromCenter, 1.4);

      const baseAlpha = edgeStrength * vertFade * 0.85;

      if (baseAlpha > 0.02) {
        const jitter = (rng() - 0.5) * 0.08;
        const alpha = Math.min(Math.max(baseAlpha + jitter, 0), 1);
        ctx.fillStyle = `rgba(191, 227, 255, ${alpha.toFixed(3)})`;
        ctx.fillText("↗", x, y);
      }
    }
  }
}

/**
 * Pattern 2: Pink halftone
 * Dark navy base (#001021). Hot pink (#ff0a7d) halftone dots (~7px grid).
 * Dot size grows from nothing at top to solid pink at bottom, with a soft wave-shaped
 * edge that rises on the left side.
 */
export function drawHalftonePattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _seed = 101
) {
  // Dark navy base
  ctx.fillStyle = "#001021";
  ctx.fillRect(0, 0, width, height);

  // Hot pink halftone dots
  const step = 7;
  const maxRadius = step * 0.74; // Overlaps adjacent dots at bottom for solid pink

  ctx.fillStyle = "#ff0a7d";
  ctx.beginPath();

  for (let y = 0; y < height + step; y += step) {
    const ny = y / height;

    for (let x = 0; x < width + step; x += step) {
      const nx = x / width;

      // Soft wave-shaped edge that rises on the left side
      const waveY =
        0.28 +
        0.44 * nx +
        0.05 * Math.sin(nx * Math.PI * 2.2) +
        0.02 * Math.sin(nx * Math.PI * 4.4);

      if (ny > waveY) {
        const progress = Math.min(
          1,
          Math.max(0, (ny - waveY) / (1 - waveY + 0.001))
        );
        const radius = Math.pow(progress, 1.1) * maxRadius;

        if (radius > 0.3) {
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
    }
  }

  ctx.fill();
}

/**
 * Pattern 3: Glass tiles
 * Diagonal gradient from light lilac (#f3e9ff) to purple (#a56cf2), with a deeper
 * purple radial glow at bottom-left. Overlay a grid of square tiles with random white
 * transparency and thin white borders (frosted glass), clearer at top, quieter at bottom.
 */
export function drawGlassTilesPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 202
) {
  const rng = createSeededRandom(seed);

  // Diagonal gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#f3e9ff");
  bgGrad.addColorStop(1, "#a56cf2");

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Deeper purple radial glow at bottom-left
  const radialGlow = ctx.createRadialGradient(
    0,
    height,
    0,
    0,
    height,
    Math.hypot(width, height) * 0.65
  );
  radialGlow.addColorStop(0, "rgba(92, 33, 168, 0.85)");
  radialGlow.addColorStop(0.45, "rgba(126, 52, 214, 0.45)");
  radialGlow.addColorStop(1, "rgba(165, 108, 242, 0)");

  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // Frosted glass square tiles
  const tileSize = 28;
  const gap = 1;

  for (let y = 0; y < height; y += tileSize + gap) {
    const ny = y / height;
    // Clearer at the top and quieter at the bottom
    const verticalClarity = Math.max(0.12, 1 - ny * 0.82);

    for (let x = 0; x < width; x += tileSize + gap) {
      const r = rng();
      const fillAlpha = (0.06 + r * 0.26) * verticalClarity;
      const borderAlpha = (0.15 + r * 0.35) * verticalClarity;

      ctx.fillStyle = `rgba(255, 255, 255, ${fillAlpha.toFixed(3)})`;
      ctx.fillRect(x, y, tileSize, tileSize);

      ctx.strokeStyle = `rgba(255, 255, 255, ${borderAlpha.toFixed(3)})`;
      ctx.lineWidth = 0.75;
      ctx.strokeRect(x + 0.375, y + 0.375, tileSize - 0.75, tileSize - 0.75);
    }
  }
}

/**
 * Pattern 4: Blue stripes
 * Vertical stripes ~6px wide with 1.5px gap. Moves left-to-right: deep blue (#002678)
 * to mid blue (#287de6) to light blue (#8ccdff) to near-white (#f3f5f8).
 * Slight random brightness variation per stripe and soft white haze across the middle.
 */
export function drawStripesPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 303
) {
  const rng = createSeededRandom(seed);

  // Base background fill (deep navy)
  ctx.fillStyle = "#001b54";
  ctx.fillRect(0, 0, width, height);

  const stripeWidth = 6;
  const gap = 1.5;
  const step = stripeWidth + gap;

  const c0: [number, number, number] = [0, 38, 120]; // #002678
  const c1: [number, number, number] = [40, 125, 230]; // #287de6
  const c2: [number, number, number] = [140, 205, 255]; // #8ccdff
  const c3: [number, number, number] = [243, 245, 248]; // #f3f5f8

  for (let x = 0; x < width; x += step) {
    const t = x / Math.max(1, width - stripeWidth);
    let rgb: [number, number, number];

    if (t <= 0.33) {
      rgb = interpolateColor(c0, c1, t / 0.33);
    } else if (t <= 0.66) {
      rgb = interpolateColor(c1, c2, (t - 0.33) / 0.33);
    } else {
      rgb = interpolateColor(c2, c3, (t - 0.66) / 0.34);
    }

    // Slight random brightness variation per stripe
    const jitter = Math.round((rng() - 0.5) * 32);
    const r = Math.min(255, Math.max(0, rgb[0] + jitter));
    const g = Math.min(255, Math.max(0, rgb[1] + jitter));
    const b = Math.min(255, Math.max(0, rgb[2] + jitter));

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, 0, stripeWidth, height);
  }

  // Soft white haze across the middle
  const haze = ctx.createLinearGradient(0, 0, 0, height);
  haze.addColorStop(0, "rgba(255, 255, 255, 0)");
  haze.addColorStop(0.35, "rgba(255, 255, 255, 0.08)");
  haze.addColorStop(0.5, "rgba(255, 255, 255, 0.28)");
  haze.addColorStop(0.65, "rgba(255, 255, 255, 0.08)");
  haze.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Pattern 5: Optical Mesh (Dedicated Enterprise Connectivity for 1:1 Leased Lines)
 * Deep royal sapphire to dark midnight navy gradient, high-tech optical telecom grid,
 * luminous 1:1 dedicated optical fiber waves, glowing data nodes, and an ambient cyan back-glow.
 */
export function drawOpticalMeshPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 505
) {
  const rng = createSeededRandom(seed);

  // 1. Base Gradient: Rich Royal Sapphire to Deep Midnight Navy
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#081b45");
  bgGrad.addColorStop(0.35, "#0f3277");
  bgGrad.addColorStop(0.7, "#092052");
  bgGrad.addColorStop(1, "#030c22");

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Ambient Cyan/Electric Blue Optical Back-Glow (centered around engineer on right)
  const gx = width * 0.72;
  const gy = height * 0.55;
  const maxGlowR = Math.min(width, height) * 0.95;
  const glowGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, maxGlowR);
  glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.28)");
  glowGrad.addColorStop(0.45, "rgba(14, 165, 233, 0.12)");
  glowGrad.addColorStop(1, "rgba(3, 12, 34, 0)");

  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. High-Tech Optical Telecom Grid
  const gridStep = 26;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(186, 230, 253, 0.08)";
  ctx.beginPath();

  for (let x = 0; x <= width; x += gridStep) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
  }
  for (let y = 0; y <= height; y += gridStep) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
  }
  ctx.stroke();

  // 4. Subtle Interconnection Crosshairs and Glowing Data Nodes
  for (let y = gridStep; y < height; y += gridStep * 2) {
    for (let x = gridStep; x < width; x += gridStep * 2) {
      const rVal = rng();
      if (rVal > 0.45) {
        // Crosshair
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.moveTo(x - 2.5, y + 0.5);
        ctx.lineTo(x + 3.5, y + 0.5);
        ctx.moveTo(x + 0.5, y - 2.5);
        ctx.lineTo(x + 0.5, y + 3.5);
        ctx.stroke();

        // Glowing data node on selected intersections
        if (rVal > 0.72) {
          ctx.fillStyle = "rgba(56, 189, 248, 0.65)";
          ctx.beginPath();
          ctx.arc(x + 0.5, y + 0.5, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // 5. Luminous 1:1 Dedicated Symmetrical Optical Fiber Waves
  const ribbons = [
    { baseY: 0.46, offset: -16, color: "rgba(56, 189, 248, 0.55)", stroke: 1.5 },
    { baseY: 0.50, offset: 0, color: "rgba(186, 230, 253, 0.85)", stroke: 2.5 },
    { baseY: 0.53, offset: 16, color: "rgba(37, 99, 235, 0.5)", stroke: 1.5 },
    { baseY: 0.56, offset: 32, color: "rgba(14, 165, 233, 0.6)", stroke: 1.5 },
  ];

  ribbons.forEach((ribbon) => {
    ctx.strokeStyle = ribbon.color;
    ctx.lineWidth = ribbon.stroke;
    ctx.beginPath();

    let started = false;
    for (let x = 0; x <= width + 8; x += 6) {
      const nx = x / Math.max(1, width);
      const wave =
        Math.sin(nx * Math.PI * 2.4 - 0.4) * 32 +
        Math.cos(nx * Math.PI * 1.2) * 16;
      const y = height * ribbon.baseY + ribbon.offset + wave;

      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  });

  // 6. Optical Light Pulse Beads along the central fiber conduit
  const pulsePositions = [0.18, 0.38, 0.62, 0.82];
  pulsePositions.forEach((nx) => {
    const px = width * nx;
    const wave =
      Math.sin(nx * Math.PI * 2.4 - 0.4) * 32 +
      Math.cos(nx * Math.PI * 1.2) * 16;
    const py = height * 0.5 + wave;

    // Outer glow
    const beadGlow = ctx.createRadialGradient(px, py, 0, px, py, 14);
    beadGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    beadGlow.addColorStop(0.35, "rgba(186, 230, 253, 0.7)");
    beadGlow.addColorStop(1, "rgba(56, 189, 248, 0)");

    ctx.fillStyle = beadGlow;
    ctx.beginPath();
    ctx.arc(px, py, 14, 0, Math.PI * 2);
    ctx.fill();
  });
}

const PATTERN_DRAW_MAP: Record<
  CardPatternType,
  (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    seed: number
  ) => void
> = {
  glyph: drawGlyphPattern,
  halftone: drawOpticalMeshPattern, // default halftone to high-tech optical mesh for leased lines
  glass: drawGlassTilesPattern,
  stripes: drawStripesPattern,
  "optical-mesh": drawOpticalMeshPattern,
};

const DEFAULT_SEEDS: Record<CardPatternType, number> = {
  glyph: 42,
  halftone: 505,
  glass: 202,
  stripes: 303,
  "optical-mesh": 505,
};

/**
 * Reusable CardCanvasPattern Component:
 * - Positioned absolutely behind card content (inset: 0, z-index: 0, pointer-events: none)
 * - Uses ResizeObserver to resize and redraw once per size change (no animation loop)
 * - Scaled with devicePixelRatio (capped at 2) for crisp rendering
 * - Seeded random function ensures deterministic visual consistency
 * - aria-hidden="true" for accessibility
 */
export default function CardCanvasPattern({
  pattern,
  seed,
  className = "",
  style,
  ...rest
}: CardCanvasPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const patternSeed = seed ?? DEFAULT_SEEDS[pattern] ?? 42;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number | null = null;

    const render = (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      ctx.save();
      ctx.scale(dpr, dpr);

      const drawFn = PATTERN_DRAW_MAP[pattern] || PATTERN_DRAW_MAP.glyph;
      drawFn(ctx, width, height, patternSeed);

      ctx.restore();
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
          // Batch execution to single animation frame on resize (no continuous loop)
          animationFrameId = requestAnimationFrame(() => {
            render(width, height);
            animationFrameId = null;
          });
        }
      }
    });

    ro.observe(container);

    // Initial draw
    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      render(rect.width, rect.height);
    }

    return () => {
      ro.disconnect();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [pattern, patternSeed]);

  return (
    <div
      ref={containerRef}
      data-pattern={pattern}
      aria-hidden="true"
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={style}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block w-full h-full pointer-events-none select-none"
      />
    </div>
  );
}
