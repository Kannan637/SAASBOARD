"use client";

import React, { useEffect, useRef } from "react";

export type CardPatternType =
  | "glyph"
  | "halftone"
  | "glass"
  | "stripes"
  | "optical-mesh"
  | "orange-grid";

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

/**
 * Pattern 6: Orange Grid ("Stay Focused" wallpaper)
 * - Base: Burnt orange-red satin folds running top-left to bottom-right (dark rust #8f1a05,
 *   bright orange #e0602a, mid tones #c63d12)
 * - Plus-sign grid: Small white "+" marks (~10px across, 1px strokes, 85% opacity) on 66px grid (48px on mobile <600px)
 * - Faint grid lines: ~6% opacity white lines running through centers and fading between them
 * - Diagonal hairlines: 3-4 thin 1px white lines from bottom-left toward upper-right (1 main ~90%, others ~15%)
 * - Grain: Light film grain (~4% noise) for a printed tactile texture
 */
export function drawOrangeGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 777
) {
  // 1. Base Satin Folds: Layered blurred diagonal gradient strips from top-left to bottom-right
  // Dark rust (#8f1a05), bright orange (#e0602a), mid tones (#c63d12)
  ctx.save();

  // Multi-stop base diagonal gradient
  const baseGrad = ctx.createLinearGradient(0, 0, width, height);
  baseGrad.addColorStop(0, "#8f1a05"); // dark rust
  baseGrad.addColorStop(0.22, "#c63d12"); // mid tone
  baseGrad.addColorStop(0.48, "#e0602a"); // bright orange highlight band
  baseGrad.addColorStop(0.72, "#8f1a05"); // dark rust shadow band
  baseGrad.addColorStop(0.90, "#c63d12"); // mid tone
  baseGrad.addColorStop(1, "#e0602a"); // subtle highlight
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // Additional soft blurred satin fold strips
  try {
    ctx.filter = "blur(60px)";
  } catch {
    // Graceful fallback if filter unsupported
  }

  // Shadow band
  const shadowGrad1 = ctx.createLinearGradient(0, 0, width * 0.9, height * 0.9);
  shadowGrad1.addColorStop(0, "rgba(143, 26, 5, 0.75)");
  shadowGrad1.addColorStop(0.5, "rgba(143, 26, 5, 0)");
  shadowGrad1.addColorStop(1, "rgba(143, 26, 5, 0.65)");
  ctx.fillStyle = shadowGrad1;
  ctx.fillRect(-40, -40, width + 80, height + 80);

  // Highlight band (bright orange #e0602a)
  const hlGrad = ctx.createLinearGradient(width * 0.2, 0, width * 0.8, height);
  hlGrad.addColorStop(0, "rgba(224, 96, 42, 0)");
  hlGrad.addColorStop(0.45, "rgba(224, 96, 42, 0.6)");
  hlGrad.addColorStop(0.65, "rgba(224, 96, 42, 0)");
  ctx.fillStyle = hlGrad;
  ctx.fillRect(-40, -40, width + 80, height + 80);

  ctx.restore(); // resets filter

  // 2. Plus-sign grid and Faint grid lines
  // Responsive spacing: 48px on screens < 600px, 66px on larger screens
  const spacing = width < 600 ? 48 : 66;
  const startX = (width % spacing) / 2;
  const startY = (height % spacing) / 2;

  // 3. Faint grid lines: ~6% opacity white lines through centers of "+" marks, fading out between them
  for (let y = startY; y < height; y += spacing) {
    for (let x = startX; x < width - spacing; x += spacing) {
      const segGrad = ctx.createLinearGradient(x, y, x + spacing, y);
      segGrad.addColorStop(0, "rgba(255, 255, 255, 0.06)");
      segGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.01)");
      segGrad.addColorStop(1, "rgba(255, 255, 255, 0.06)");
      ctx.strokeStyle = segGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 5, y + 0.5);
      ctx.lineTo(x + spacing - 5, y + 0.5);
      ctx.stroke();
    }
  }

  for (let x = startX; x < width; x += spacing) {
    for (let y = startY; y < height - spacing; y += spacing) {
      const segGrad = ctx.createLinearGradient(x, y, x, y + spacing);
      segGrad.addColorStop(0, "rgba(255, 255, 255, 0.06)");
      segGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.01)");
      segGrad.addColorStop(1, "rgba(255, 255, 255, 0.06)");
      ctx.strokeStyle = segGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 0.5, y + 5);
      ctx.lineTo(x + 0.5, y + spacing - 5);
      ctx.stroke();
    }
  }

  // Plus-sign marks (10px across, 1px stroke, 85% opacity)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let y = startY; y < height; y += spacing) {
    for (let x = startX; x < width; x += spacing) {
      // Horizontal arm (10px across)
      ctx.moveTo(x - 5, y + 0.5);
      ctx.lineTo(x + 5, y + 0.5);
      // Vertical arm (10px across)
      ctx.moveTo(x + 0.5, y - 5);
      ctx.lineTo(x + 0.5, y + 5);
    }
  }
  ctx.stroke();

  // 4. Diagonal hairlines: 3 to 4 thin white lines (1px) running from bottom-left toward upper-right
  // One main line is brighter (~90% opacity), others are faint (~15%)
  // Main hairline (~90% opacity)
  const mainHairGrad = ctx.createLinearGradient(
    width * 0.06,
    height * 0.96,
    width * 0.88,
    height * 0.04
  );
  mainHairGrad.addColorStop(0, "rgba(255, 255, 255, 0.25)");
  mainHairGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.90)");
  mainHairGrad.addColorStop(1, "rgba(255, 255, 255, 0.35)");

  ctx.strokeStyle = mainHairGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width * 0.06, height * 0.96);
  ctx.lineTo(width * 0.88, height * 0.04);
  ctx.stroke();

  // Faint hairlines (~15% opacity)
  const faintLines = [
    { x1: 0, y1: height * 0.74, x2: width * 0.68, y2: 0, alpha: 0.16 },
    { x1: width * 0.26, y1: height, x2: width * 0.98, y2: height * 0.16, alpha: 0.15 },
    { x1: width * 0.14, y1: height * 0.84, x2: width * 0.78, y2: height * 0.10, alpha: 0.13 },
  ];

  faintLines.forEach((line) => {
    ctx.strokeStyle = `rgba(255, 255, 255, ${line.alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
  });

  // 5. Light film grain (~4% noise)
  const noiseSize = 128;
  const noiseCanvas = document.createElement("canvas");
  noiseCanvas.width = noiseSize;
  noiseCanvas.height = noiseSize;
  const nCtx = noiseCanvas.getContext("2d");
  if (nCtx) {
    const imgData = nCtx.createImageData(noiseSize, noiseSize);
    const data = imgData.data;
    const noiseRng = createSeededRandom(seed + 99);
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(noiseRng() * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = Math.floor(noiseRng() * 11); // ~4% noise (max 10/255)
    }
    nCtx.putImageData(imgData, 0, 0);
    const pattern = ctx.createPattern(noiseCanvas, "repeat");
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    }
  }
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
  halftone: drawOrangeGridPattern,
  glass: drawGlassTilesPattern,
  stripes: drawStripesPattern,
  "optical-mesh": drawOpticalMeshPattern,
  "orange-grid": drawOrangeGridPattern,
};

const DEFAULT_SEEDS: Record<CardPatternType, number> = {
  glyph: 42,
  halftone: 777,
  glass: 202,
  stripes: 303,
  "optical-mesh": 505,
  "orange-grid": 777,
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
