"use client";

import React, { useEffect, useRef } from "react";

export type CardPatternType =
  | "glyph"
  | "halftone"
  | "glass"
  | "stripes"
  | "optical-mesh"
  | "blue-arcs"
  | "white-pixels"
  | "orange-grid"
  | "blue-grid"
  | "yellow-grid"
  | "purple-grid";

export interface WhitePixelsOptions {
  color?: string;
  opacity?: number;
  showGrid?: boolean;
  gridOpacity?: number;
  seed?: number;
}

export interface CardCanvasPatternProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pattern: CardPatternType;
  seed?: number;
  options?: WhitePixelsOptions;
  patternOpacity?: number;
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
 * Pattern 6: Blue Arcs (Blue curved glowing bands)
 * A set of 7 to 9 wide curved concentric bands sweeping from bottom-left toward upper-right.
 * Top-left corner is near-black navy (#020817), brightening toward bottom-left through deep blue
 * (#0a3fb0), royal blue (#1f6fe0), sky blue (#6fb4ff) into a pale pink-white glow (#ffe6f2).
 * Thin glowing edge along each band's outer rim (rgba(160,210,255,0.6)), layered glowing glass,
 * and ambient pink-white spill from bottom-left.
 */
export function drawBlueArcsPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _seed = 606
) {
  // Center off-canvas at bottom-left (x = -10% width, y = 110% height)
  const cx = -0.10 * width;
  const cy = 1.10 * height;
  const maxR = Math.hypot(width - cx, 0 - cy) * 1.05;

  const numBands = 8;
  const bandWidth = maxR / numBands;

  // 1. Base Fill: Top-left near-black navy (#020817)
  ctx.fillStyle = "#020817";
  ctx.fillRect(0, 0, width, height);

  // Band color pairs: [innerColor, outerColor] from innermost (0) to outermost (7)
  // Inner bands are brighter and transition toward pink-white, outer bands fade into deep navy
  const bandColors: [string, string][] = [
    ["#ffe6f2", "#6fb4ff"], // Band 0: Pale pink-white glow to sky blue
    ["#6fb4ff", "#1f6fe0"], // Band 1: Sky blue to royal blue
    ["#1f6fe0", "#1858c2"], // Band 2: Royal blue to bright cobalt
    ["#1858c2", "#0a3fb0"], // Band 3: Cobalt to deep blue
    ["#0a3fb0", "#0a2f86"], // Band 4: Deep blue to rich navy
    ["#0a2f86", "#07205e"], // Band 5: Rich navy to midnight navy
    ["#07205e", "#041138"], // Band 6: Midnight navy to deep obsidian
    ["#041138", "#020817"], // Band 7: Deep obsidian to near-black navy
  ];

  // 2. Draw Concentric Rings from Outside In
  for (let i = numBands - 1; i >= 0; i--) {
    const rOuter = (i + 1) * bandWidth;
    const rInner = i * bandWidth;

    const [innerCol, outerCol] = bandColors[i];

    const ringGrad = ctx.createRadialGradient(cx, cy, rInner, cx, cy, rOuter);
    ringGrad.addColorStop(0, innerCol);
    ringGrad.addColorStop(1, outerCol);

    ctx.fillStyle = ringGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, -Math.PI * 0.55, 0.05);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fill();
  }

  // 3. Right Side Mid-to-Deep Blue Blend (#1c64d8 fading to #0a3a9c at the far edge)
  const rightGrad = ctx.createLinearGradient(width * 0.42, 0, width, 0);
  rightGrad.addColorStop(0, "rgba(28, 100, 216, 0)");
  rightGrad.addColorStop(0.65, "rgba(28, 100, 216, 0.32)");
  rightGrad.addColorStop(1, "rgba(10, 58, 156, 0.55)");

  ctx.fillStyle = rightGrad;
  ctx.fillRect(0, 0, width, height);

  // 4. Glowing Edge on Outer Side of Each Band
  ctx.save();
  ctx.shadowColor = "rgba(160, 210, 255, 0.85)";
  ctx.shadowBlur = 4;
  ctx.strokeStyle = "rgba(160, 210, 255, 0.65)";
  ctx.lineWidth = 2;

  for (let i = 0; i < numBands; i++) {
    const rOuter = (i + 1) * bandWidth;
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, -Math.PI * 0.55, 0.05);
    ctx.stroke();
  }
  ctx.restore();

  // 5. Ambient Bottom-Left Pink-White Glow Spilling onto the first 3 bands
  const glowR = bandWidth * 3.4;
  const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
  glowGrad.addColorStop(0, "rgba(255, 230, 242, 0.90)");
  glowGrad.addColorStop(0.28, "rgba(255, 230, 242, 0.55)");
  glowGrad.addColorStop(0.62, "rgba(111, 180, 255, 0.25)");
  glowGrad.addColorStop(1, "rgba(111, 180, 255, 0)");

  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, -Math.PI * 0.55, 0.05);
  ctx.lineTo(cx, cy);
  ctx.closePath();
  ctx.fill();
}

/**
 * Pattern 7: White Pixels Grid Pattern
 * Transparent canvas with pure white pixels (#ffffff @ 85% opacity) over the existing gradient.
 * - Cell size: 8px (desktop) / 6px (< 600px mobile), 3px gap, 5px dot (3px on mobile).
 * - Vertical density: Top 35% dense (35-50% checkerboard/diagonal dither), Middle 35-65% sparse (3-8% isolated dots),
 *   Bottom 35% mixed sparse with heavy dense blocks (60-100%).
 * - 25 to 40 random overlapping horizontal regions (widths 4-20 cells, heights 2-8 cells).
 * - 3 to 5 bloom clusters (X / diamond diagonal dither inside 10x8 cells) in middle area.
 * - Optional faint 1px white grid lines (off by default).
 * - Off cells are transparent so underlying card gradient shows through.
 */
export function drawWhitePixelsPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 707,
  options?: WhitePixelsOptions
) {
  const rng = createSeededRandom(seed);

  const color = options?.color ?? "#ffffff";
  const opacity = options?.opacity ?? 0.85;
  const showGrid = options?.showGrid ?? false;
  const gridOpacity = options?.gridOpacity ?? 0.03;

  // 1. Grid geometry: 8px on desktop, 6px under 600px width
  const cellSize = width < 600 ? 6 : 8;
  const gap = 3;
  const dotSize = Math.max(1, cellSize - gap); // 5px desktop, 3px mobile

  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);

  // 2. Clear canvas to 100% transparent (NEVER draw black fillRect)
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = false;

  // 3. Optional faint grid lines (3% opacity, 1px)
  if (showGrid) {
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = Math.floor(c * cellSize) + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let r = 0; r <= rows; r++) {
      const y = Math.floor(r * cellSize) + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // 4. Cell state buffer: 1 = ON, 0 = OFF (transparent)
  const grid = new Uint8Array(cols * rows);

  // --- Step A: Vertical Density Map ---
  for (let r = 0; r < rows; r++) {
    const ny = (r * cellSize) / height;

    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const isChecker = (c + r) % 2 === 0;
      const isDiag = (c + r) % 3 === 0;

      if (ny < 0.35) {
        // Top 35%: Dense (35% to 50% on) with checkerboard and diagonal dither feel
        // Soften slightly on left edge to keep headline text crystal clear
        const isTextZone = c < cols * 0.45;
        const checkerWeight = isTextZone ? 0.55 : 0.68;
        const diagWeight = isTextZone ? 0.30 : 0.38;

        if (isChecker && rng() < checkerWeight) {
          grid[idx] = 1;
        } else if (isDiag && rng() < diagWeight) {
          grid[idx] = 1;
        } else if (rng() < 0.07) {
          grid[idx] = 1;
        }
      } else if (ny < 0.65) {
        // Middle 35% to 65%: Sparse (3% to 8% on), mostly isolated single dots
        if (rng() < 0.05) {
          grid[idx] = 1;
        }
      } else {
        // Bottom 35%: Mostly sparse base (heavy blocks added in next pass)
        if (rng() < 0.06) {
          grid[idx] = 1;
        }
      }
    }
  }

  // --- Step B: 25 to 40 Random Overlapping Horizontal Regions ---
  const numRegions = Math.floor(25 + rng() * 16); // 25 to 40
  for (let i = 0; i < numRegions; i++) {
    const w = Math.floor(4 + rng() * 17); // 4 to 20 cells
    const h = Math.floor(2 + rng() * 7);  // 2 to 8 cells
    const startCol = Math.floor(rng() * Math.max(1, cols - w));
    const startRow = Math.floor(rng() * Math.max(1, rows - h));
    const midY = (startRow + h / 2) / rows;

    let style: "checkerboard" | "diagonal" | "sparse" | "solid";
    const roll = rng();

    if (midY < 0.35) {
      style = roll < 0.45 ? "checkerboard" : roll < 0.75 ? "diagonal" : roll < 0.9 ? "sparse" : "solid";
    } else if (midY < 0.65) {
      style = roll < 0.65 ? "sparse" : "diagonal";
    } else {
      style = roll < 0.4 ? "solid" : roll < 0.75 ? "checkerboard" : "sparse";
    }

    const regionDensity = 0.15 + rng() * 0.35;

    for (let r = startRow; r < Math.min(rows, startRow + h); r++) {
      for (let c = startCol; c < Math.min(cols, startCol + w); c++) {
        let on = false;
        if (style === "checkerboard") {
          on = (c + r) % 2 === 0;
        } else if (style === "diagonal") {
          on = (c + r) % 3 === 0;
        } else if (style === "solid") {
          on = true;
        } else {
          on = rng() < regionDensity;
        }

        if (on) {
          grid[r * cols + c] = 1;
        }
      }
    }
  }

  // --- Step C: Bottom 35% Heavy Blocks (reaching 60% to 100% density) ---
  const numHeavyBlocks = Math.floor(3 + rng() * 4); // 3 to 6 heavy blocks
  for (let b = 0; b < numHeavyBlocks; b++) {
    const bw = Math.floor(6 + rng() * 15); // 6 to 20 cells
    const bh = Math.floor(2 + rng() * 6);  // 2 to 7 cells
    const minR = Math.floor(rows * 0.66);
    const maxR = Math.max(minR, rows - bh);
    const bRow = Math.floor(minR + rng() * (maxR - minR + 1));
    const bCol = Math.floor(rng() * Math.max(1, cols - bw));
    const isSolid = rng() < 0.55;

    for (let r = bRow; r < Math.min(rows, bRow + bh); r++) {
      for (let c = bCol; c < Math.min(cols, bCol + bw); c++) {
        if (isSolid) {
          grid[r * cols + c] = 1;
        } else {
          // 65% to 85% density
          if ((c + r) % 2 === 0 || rng() < 0.45) {
            grid[r * cols + c] = 1;
          }
        }
      }
    }
  }

  // --- Step D: 3 to 5 Bloom Clusters in Middle Area (10x8 area, X or diamond) ---
  const numClusters = Math.floor(3 + rng() * 3); // 3 to 5
  for (let k = 0; k < numClusters; k++) {
    const clusterW = 10;
    const clusterH = 8;
    const minR = Math.floor(rows * 0.36);
    const maxR = Math.max(minR, Math.floor(rows * 0.62) - clusterH);
    const cRow = Math.floor(minR + rng() * (maxR - minR + 1));
    const cCol = Math.floor(rng() * Math.max(1, cols - clusterW));
    const isDiamond = rng() < 0.5;

    for (let dr = 0; dr < clusterH; dr++) {
      for (let dc = 0; dc < clusterW; dc++) {
        const r = cRow + dr;
        const c = cCol + dc;
        if (r >= rows || c >= cols) continue;

        const normX = Math.abs(dc - 4.5) / 4.5;
        const normY = Math.abs(dr - 3.5) / 3.5;

        if (isDiamond) {
          if (normX + normY <= 1.1) {
            if ((c + r) % 2 === 0 || rng() < 0.3) {
              grid[r * cols + c] = 1;
            }
          }
        } else {
          // X-shape diagonal dither
          const isArm1 = Math.abs(normX - normY) < 0.32;
          const isArm2 = Math.abs((1 - normX) - normY) < 0.32;
          if (isArm1 || isArm2) {
            if ((c + r) % 2 === 0 || rng() < 0.35) {
              grid[r * cols + c] = 1;
            }
          }
        }
      }
    }
  }

  // --- Step E: Render "ON" Cells as Sharp White Rectangles ---
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;

  for (let r = 0; r < rows; r++) {
    const py = Math.floor(r * cellSize);
    for (let c = 0; c < cols; c++) {
      if (grid[r * cols + c] === 1) {
        const px = Math.floor(c * cellSize);
        ctx.fillRect(px, py, dotSize, dotSize);
      }
    }
  }
  ctx.restore();
}

/**
 * Pattern 8: "Stay Focused" Orange Wallpaper Pattern
 * - Base: Burnt orange-red, with soft diagonal bands of light and shadow running from top-left
 *   to bottom-right (blurred satin / fabric folds). Dark rust (#8f1a05) in shadow bands,
 *   bright orange (#e0602a) in highlight bands, mid tones (#c63d12) in between.
 * - Plus-sign grid: Small white "+" marks (10px across, 1px strokes) arranged on an even grid
 *   with ~66px spacing (responsive down to ~48px on screens < 600px), ~85% opacity.
 * - Faint grid lines: Very subtle white lines (about 6% opacity, 1px) through centers of "+" marks.
 * - Diagonal hairlines: 3 to 4 thin white 1px lines crossing surface (bottom-left to top-right),
 *   one main brighter line (~90% opacity) and 2-3 faint crease lines (~15% opacity).
 * - Grain: Very light film grain (about 4% noise) across entire canvas.
 */
export function drawOrangeGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 808
) {
  const rng = createSeededRandom(seed);

  // 1. Base Multi-Stop Diagonal Gradient Fill (Top-Left to Bottom-Right)
  const baseGrad = ctx.createLinearGradient(0, 0, width, height);
  baseGrad.addColorStop(0, "#731404");
  baseGrad.addColorStop(0.22, "#8f1a05");
  baseGrad.addColorStop(0.45, "#c63d12");
  baseGrad.addColorStop(0.70, "#e0602a");
  baseGrad.addColorStop(0.88, "#c63d12");
  baseGrad.addColorStop(1, "#8f1a05");

  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Satin Fabric Folds: 5 large diagonal gradient strips with blur
  ctx.save();
  try {
    ctx.filter = "blur(60px)";
  } catch {
    // Filter fallback
  }

  const diagonalAngle = Math.atan2(height, width);
  const diagLength = Math.hypot(width, height);
  const bands = [
    { offsetRatio: 0.15, widthRatio: 0.28, color: "rgba(224, 96, 42, 0.65)" }, // Bright orange highlight
    { offsetRatio: 0.38, widthRatio: 0.22, color: "rgba(115, 20, 4, 0.85)" },  // Dark rust shadow
    { offsetRatio: 0.58, widthRatio: 0.32, color: "rgba(240, 114, 58, 0.75)" }, // Peak orange highlight
    { offsetRatio: 0.80, widthRatio: 0.24, color: "rgba(143, 26, 5, 0.80)" },  // Rust shadow
    { offsetRatio: 0.95, widthRatio: 0.30, color: "rgba(198, 61, 18, 0.60)" }, // Mid tone
  ];

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(diagonalAngle * 0.85);

  bands.forEach((b) => {
    const yCenter = (b.offsetRatio - 0.5) * diagLength;
    const bHeight = b.widthRatio * diagLength;

    const bandGrad = ctx.createLinearGradient(0, yCenter - bHeight / 2, 0, yCenter + bHeight / 2);
    bandGrad.addColorStop(0, "rgba(198, 61, 18, 0)");
    bandGrad.addColorStop(0.5, b.color);
    bandGrad.addColorStop(1, "rgba(198, 61, 18, 0)");

    ctx.fillStyle = bandGrad;
    ctx.fillRect(-diagLength, yCenter - bHeight / 2, diagLength * 2, bHeight);
  });
  ctx.restore();
  ctx.restore(); // Restores from blur filter

  // 3. Film Grain (~4% noise) using an offscreen canvas pattern
  try {
    if (typeof document !== "undefined") {
      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 128;
      noiseCanvas.height = 128;
      const noiseCtx = noiseCanvas.getContext("2d");
      if (noiseCtx) {
        const imgData = noiseCtx.createImageData(128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(rng() * 255);
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = Math.floor(rng() * 11); // ~4% noise alpha
        }
        noiseCtx.putImageData(imgData, 0, 0);
        const noisePattern = ctx.createPattern(noiseCanvas, "repeat");
        if (noisePattern) {
          ctx.save();
          ctx.fillStyle = noisePattern;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }
    }
  } catch {
    // Grain canvas fallback
  }

  // 4. Grid Geometry: Spacing ~66px on desktop, ~48px on screens < 600px
  const spacing = width < 600 ? 48 : 66;

  // 5. Faint Grid Lines: Subtle white lines (~6% opacity, 1px) through centers of '+' marks
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = spacing / 2; x <= width + spacing; x += spacing) {
    const px = Math.floor(x) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
  }
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    const py = Math.floor(y) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
  }
  ctx.stroke();
  ctx.restore();

  // 6. Plus-Sign Grid: Small white '+' marks (10px across, 1px stroke, 85% opacity)
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const arm = 5; // 10px across total
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    for (let x = spacing / 2; x <= width + spacing; x += spacing) {
      const cx = Math.floor(x) + 0.5;
      const cy = Math.floor(y) + 0.5;
      // Horizontal bar
      ctx.moveTo(cx - arm, cy);
      ctx.lineTo(cx + arm, cy);
      // Vertical bar
      ctx.moveTo(cx, cy - arm);
      ctx.lineTo(cx, cy + arm);
    }
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Pattern 9: Blue Satin Grid Pattern
 * - Base: Deep sapphire to royal and bright azure blue satin gradient.
 *   Dark midnight navy (#030d22, #071b42) in shadow bands, vibrant azure (#1d5fd1)
 *   and sky blue (#38bdf8) in highlight bands, mid cobalt (#0f3b8c) in between.
 * - Satin Fabric Folds: 5 large blurred diagonal gradient strips (blur 60px) for smooth folds.
 * - Grain: Very light film grain (~4% noise) across entire canvas.
 * - Plus-sign grid: Small white "+" marks (10px across, 1px strokes, ~85% opacity),
 *   arranged on an even grid with ~66px spacing (responsive down to ~48px on screens < 600px).
 * - Faint grid lines: Very subtle white lines (~6% opacity, 1px) through centers of "+" marks.
 * - Center lines / scratch hairlines: OMITTED per user specification.
 */
export function drawBlueGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 909
) {
  const rng = createSeededRandom(seed);

  // 1. Base Multi-Stop Diagonal Gradient Fill (Top-Left to Bottom-Right)
  const baseGrad = ctx.createLinearGradient(0, 0, width, height);
  baseGrad.addColorStop(0, "#030d22");
  baseGrad.addColorStop(0.22, "#071b42");
  baseGrad.addColorStop(0.45, "#0f3b8c");
  baseGrad.addColorStop(0.70, "#1d5fd1");
  baseGrad.addColorStop(0.88, "#0e347d");
  baseGrad.addColorStop(1, "#051636");

  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Satin Fabric Folds: 5 large diagonal gradient strips with blur
  ctx.save();
  try {
    ctx.filter = "blur(60px)";
  } catch {
    // Filter fallback
  }

  const diagonalAngle = Math.atan2(height, width);
  const diagLength = Math.hypot(width, height);
  const bands = [
    { offsetRatio: 0.15, widthRatio: 0.28, color: "rgba(29, 95, 209, 0.65)" }, // Bright azure highlight
    { offsetRatio: 0.38, widthRatio: 0.22, color: "rgba(3, 13, 34, 0.85)" },  // Deep midnight shadow
    { offsetRatio: 0.58, widthRatio: 0.32, color: "rgba(56, 189, 248, 0.70)" }, // Sky blue highlight
    { offsetRatio: 0.80, widthRatio: 0.24, color: "rgba(7, 27, 66, 0.80)" },  // Deep navy shadow
    { offsetRatio: 0.95, widthRatio: 0.30, color: "rgba(15, 59, 140, 0.60)" }, // Mid cobalt tone
  ];

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(diagonalAngle * 0.85);

  bands.forEach((b) => {
    const yCenter = (b.offsetRatio - 0.5) * diagLength;
    const bHeight = b.widthRatio * diagLength;

    const bandGrad = ctx.createLinearGradient(0, yCenter - bHeight / 2, 0, yCenter + bHeight / 2);
    bandGrad.addColorStop(0, "rgba(15, 59, 140, 0)");
    bandGrad.addColorStop(0.5, b.color);
    bandGrad.addColorStop(1, "rgba(15, 59, 140, 0)");

    ctx.fillStyle = bandGrad;
    ctx.fillRect(-diagLength, yCenter - bHeight / 2, diagLength * 2, bHeight);
  });
  ctx.restore();
  ctx.restore();

  // 3. Film Grain (~4% noise) using an offscreen canvas pattern
  try {
    if (typeof document !== "undefined") {
      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 128;
      noiseCanvas.height = 128;
      const noiseCtx = noiseCanvas.getContext("2d");
      if (noiseCtx) {
        const imgData = noiseCtx.createImageData(128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(rng() * 255);
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = Math.floor(rng() * 11);
        }
        noiseCtx.putImageData(imgData, 0, 0);
        const noisePattern = ctx.createPattern(noiseCanvas, "repeat");
        if (noisePattern) {
          ctx.save();
          ctx.fillStyle = noisePattern;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }
    }
  } catch {
    // Grain canvas fallback
  }

  // 4. Grid Geometry: Spacing ~66px on desktop, ~48px on screens < 600px
  const spacing = width < 600 ? 48 : 66;

  // 5. Faint Grid Lines: Subtle white lines (~6% opacity, 1px) through centers of '+' marks
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = spacing / 2; x <= width + spacing; x += spacing) {
    const px = Math.floor(x) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
  }
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    const py = Math.floor(y) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
  }
  ctx.stroke();
  ctx.restore();

  // 6. Plus-Sign Grid: Small white '+' marks (10px across, 1px stroke, 85% opacity)
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const arm = 5;
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    for (let x = spacing / 2; x <= width + spacing; x += spacing) {
      const cx = Math.floor(x) + 0.5;
      const cy = Math.floor(y) + 0.5;
      ctx.moveTo(cx - arm, cy);
      ctx.lineTo(cx + arm, cy);
      ctx.moveTo(cx, cy - arm);
      ctx.lineTo(cx, cy + arm);
    }
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Pattern 10: Yellow Satin Grid Pattern (CCTV-style 180deg vertical gradient)
 * - Base: Vertical multi-stop gradient (180deg) matching the CCTV hero section style:
 *   Light soft pastel yellow at top (#FEF7CD) transitioning through bright yellow (#FDE68A),
 *   rich golden yellow (#EAB308), amber bronze (#B45309), deep golden bronze (#78350F),
 *   dark espresso amber (#451A03), to deep obsidian dark brown at bottom (#1C0B02).
 * - Satin Fabric Folds: 5 large blurred diagonal gradient strips (blur 60px) in golden amber & bronze.
 * - Grain: Very light film grain (~4% noise) across entire canvas.
 * - Plus-sign grid: Small white "+" marks (10px across, 1px stroke, 75% opacity per specification),
 *   arranged on an even grid with ~66px spacing (responsive down to ~48px on screens < 600px).
 * - Faint grid lines: Very subtle white lines (~6% opacity, 1px) through centers of "+" marks.
 * - Center lines / scratch hairlines: OMITTED per user specification.
 */
export function drawYellowGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 1010
) {
  const rng = createSeededRandom(seed);

  // 1. Base Multi-Stop 180deg Vertical Gradient Fill (matching CCTV hero section style)
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, "#FEF7CD");     // Light pastel yellow at top
  baseGrad.addColorStop(0.15, "#FDE68A");  // Soft bright yellow
  baseGrad.addColorStop(0.32, "#EAB308");  // Rich golden amber
  baseGrad.addColorStop(0.50, "#B45309");  // Warm bronze amber
  baseGrad.addColorStop(0.68, "#78350F");  // Deep bronze
  baseGrad.addColorStop(0.84, "#451A03");  // Dark espresso bronze
  baseGrad.addColorStop(1, "#1C0B02");     // Deep obsidian amber-brown at bottom

  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Satin Fabric Folds: 5 large diagonal gradient strips with blur
  ctx.save();
  try {
    ctx.filter = "blur(60px)";
  } catch {
    // Filter fallback
  }

  const diagonalAngle = Math.atan2(height, width);
  const diagLength = Math.hypot(width, height);
  const bands = [
    { offsetRatio: 0.15, widthRatio: 0.28, color: "rgba(253, 230, 138, 0.65)" }, // Soft yellow highlight
    { offsetRatio: 0.38, widthRatio: 0.22, color: "rgba(69, 26, 3, 0.85)" },     // Deep bronze shadow
    { offsetRatio: 0.58, widthRatio: 0.32, color: "rgba(250, 204, 21, 0.70)" },  // Rich golden highlight
    { offsetRatio: 0.80, widthRatio: 0.24, color: "rgba(120, 53, 15, 0.80)" },   // Dark amber shadow
    { offsetRatio: 0.95, widthRatio: 0.30, color: "rgba(180, 83, 9, 0.60)" },    // Mid amber bronze
  ];

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(diagonalAngle * 0.85);

  bands.forEach((b) => {
    const yCenter = (b.offsetRatio - 0.5) * diagLength;
    const bHeight = b.widthRatio * diagLength;

    const bandGrad = ctx.createLinearGradient(0, yCenter - bHeight / 2, 0, yCenter + bHeight / 2);
    bandGrad.addColorStop(0, "rgba(180, 83, 9, 0)");
    bandGrad.addColorStop(0.5, b.color);
    bandGrad.addColorStop(1, "rgba(180, 83, 9, 0)");

    ctx.fillStyle = bandGrad;
    ctx.fillRect(-diagLength, yCenter - bHeight / 2, diagLength * 2, bHeight);
  });
  ctx.restore();
  ctx.restore();

  // 3. Film Grain (~4% noise) using an offscreen canvas pattern
  try {
    if (typeof document !== "undefined") {
      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 128;
      noiseCanvas.height = 128;
      const noiseCtx = noiseCanvas.getContext("2d");
      if (noiseCtx) {
        const imgData = noiseCtx.createImageData(128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(rng() * 255);
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = Math.floor(rng() * 11);
        }
        noiseCtx.putImageData(imgData, 0, 0);
        const noisePattern = ctx.createPattern(noiseCanvas, "repeat");
        if (noisePattern) {
          ctx.save();
          ctx.fillStyle = noisePattern;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }
    }
  } catch {
    // Grain canvas fallback
  }

  // 4. Grid Geometry: Spacing ~66px on desktop, ~48px on screens < 600px
  const spacing = width < 600 ? 48 : 66;

  // 5. Faint Grid Lines: Subtle white lines (~6% opacity, 1px) through centers of '+' marks
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = spacing / 2; x <= width + spacing; x += spacing) {
    const px = Math.floor(x) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
  }
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    const py = Math.floor(y) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
  }
  ctx.stroke();
  ctx.restore();

  // 6. Plus-Sign Grid: Small white '+' marks (10px across, 1px stroke, 75% opacity)
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const arm = 5;
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    for (let x = spacing / 2; x <= width + spacing; x += spacing) {
      const cx = Math.floor(x) + 0.5;
      const cy = Math.floor(y) + 0.5;
      ctx.moveTo(cx - arm, cy);
      ctx.lineTo(cx + arm, cy);
      ctx.moveTo(cx, cy - arm);
      ctx.lineTo(cx, cy + arm);
    }
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Pattern 11: Lavender-Purple Satin Grid Pattern (matches "Faster speeds. Just for you." gradient)
 * - Base: 180deg vertical multi-stop gradient from pale lavender (#E6CBF8) through soft lilac (#C1ABDA),
 *   dusty purple (#9287B8), slate violet (#686193), deep violet-navy (#444374), midnight navy (#242859),
 *   down to deep obsidian indigo (#081141).
 * - Satin Fabric Folds: 5 large blurred diagonal gradient strips (blur 60px) in lavender and midnight tones.
 * - Grain: Very light film grain (~4% noise) across entire canvas.
 * - Plus-sign grid: Small white "+" marks (10px across, 1px stroke, 75% opacity),
 *   arranged on an even grid with ~66px spacing (responsive down to ~48px on screens < 600px).
 * - Faint grid lines: Very subtle white lines (~6% opacity, 1px) through centers of "+" marks.
 * - Center lines / scratch hairlines: OMITTED.
 */
export function drawPurpleGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed = 1111
) {
  const rng = createSeededRandom(seed);

  // 1. Base Multi-Stop 180deg Vertical Gradient Fill (matching "Faster speeds. Just for you.")
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, "#E6CBF8");
  baseGrad.addColorStop(0.15, "#C1ABDA");
  baseGrad.addColorStop(0.32, "#9287B8");
  baseGrad.addColorStop(0.50, "#686193");
  baseGrad.addColorStop(0.68, "#444374");
  baseGrad.addColorStop(0.84, "#242859");
  baseGrad.addColorStop(1, "#081141");

  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Satin Fabric Folds: 5 large diagonal gradient strips with blur
  ctx.save();
  try {
    ctx.filter = "blur(60px)";
  } catch {
    // Filter fallback
  }

  const diagonalAngle = Math.atan2(height, width);
  const diagLength = Math.hypot(width, height);
  const bands = [
    { offsetRatio: 0.15, widthRatio: 0.28, color: "rgba(230, 203, 248, 0.65)" }, // Soft lavender highlight
    { offsetRatio: 0.38, widthRatio: 0.22, color: "rgba(8, 17, 65, 0.85)" },     // Deep midnight indigo shadow
    { offsetRatio: 0.58, widthRatio: 0.32, color: "rgba(193, 171, 218, 0.70)" },  // Lilac highlight
    { offsetRatio: 0.80, widthRatio: 0.24, color: "rgba(36, 40, 89, 0.80)" },    // Midnight navy shadow
    { offsetRatio: 0.95, widthRatio: 0.30, color: "rgba(104, 97, 147, 0.60)" },  // Mid slate-violet
  ];

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(diagonalAngle * 0.85);

  bands.forEach((b) => {
    const yCenter = (b.offsetRatio - 0.5) * diagLength;
    const bHeight = b.widthRatio * diagLength;

    const bandGrad = ctx.createLinearGradient(0, yCenter - bHeight / 2, 0, yCenter + bHeight / 2);
    bandGrad.addColorStop(0, "rgba(104, 97, 147, 0)");
    bandGrad.addColorStop(0.5, b.color);
    bandGrad.addColorStop(1, "rgba(104, 97, 147, 0)");

    ctx.fillStyle = bandGrad;
    ctx.fillRect(-diagLength, yCenter - bHeight / 2, diagLength * 2, bHeight);
  });
  ctx.restore();
  ctx.restore();

  // 3. Film Grain (~4% noise) using an offscreen canvas pattern
  try {
    if (typeof document !== "undefined") {
      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 128;
      noiseCanvas.height = 128;
      const noiseCtx = noiseCanvas.getContext("2d");
      if (noiseCtx) {
        const imgData = noiseCtx.createImageData(128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(rng() * 255);
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = Math.floor(rng() * 11);
        }
        noiseCtx.putImageData(imgData, 0, 0);
        const noisePattern = ctx.createPattern(noiseCanvas, "repeat");
        if (noisePattern) {
          ctx.save();
          ctx.fillStyle = noisePattern;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }
    }
  } catch {
    // Grain fallback
  }

  // 4. Grid Geometry: Spacing ~66px on desktop, ~48px on screens < 600px
  const spacing = width < 600 ? 48 : 66;

  // 5. Faint Grid Lines: Subtle white lines (~6% opacity, 1px) through centers of '+' marks
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = spacing / 2; x <= width + spacing; x += spacing) {
    const px = Math.floor(x) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
  }
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    const py = Math.floor(y) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
  }
  ctx.stroke();
  ctx.restore();

  // 6. Plus-Sign Grid: Small white '+' marks (10px across, 1px stroke, 75% opacity)
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const arm = 5;
  for (let y = spacing / 2; y <= height + spacing; y += spacing) {
    for (let x = spacing / 2; x <= width + spacing; x += spacing) {
      const cx = Math.floor(x) + 0.5;
      const cy = Math.floor(y) + 0.5;
      ctx.moveTo(cx - arm, cy);
      ctx.lineTo(cx + arm, cy);
      ctx.moveTo(cx, cy - arm);
      ctx.lineTo(cx, cy + arm);
    }
  }
  ctx.stroke();
  ctx.restore();
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
  halftone: drawBlueArcsPattern,
  glass: drawGlassTilesPattern,
  stripes: drawStripesPattern,
  "optical-mesh": drawOpticalMeshPattern,
  "blue-arcs": drawBlueArcsPattern,
  "white-pixels": (ctx, width, height, seed) =>
    drawWhitePixelsPattern(ctx, width, height, seed),
  "orange-grid": (ctx, width, height, seed) =>
    drawOrangeGridPattern(ctx, width, height, seed),
  "blue-grid": (ctx, width, height, seed) =>
    drawBlueGridPattern(ctx, width, height, seed),
  "yellow-grid": (ctx, width, height, seed) =>
    drawYellowGridPattern(ctx, width, height, seed),
  "purple-grid": (ctx, width, height, seed) =>
    drawPurpleGridPattern(ctx, width, height, seed),
};

const DEFAULT_SEEDS: Record<CardPatternType, number> = {
  glyph: 42,
  halftone: 606,
  glass: 202,
  stripes: 303,
  "optical-mesh": 505,
  "blue-arcs": 606,
  "white-pixels": 707,
  "orange-grid": 808,
  "blue-grid": 909,
  "yellow-grid": 1010,
  "purple-grid": 1111,
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
  options,
  patternOpacity,
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

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      ctx.save();
      ctx.scale(dpr, dpr);

      if (pattern === "white-pixels") {
        drawWhitePixelsPattern(ctx, width, height, patternSeed, options);
      } else {
        const drawFn = PATTERN_DRAW_MAP[pattern] || PATTERN_DRAW_MAP.glyph;
        drawFn(ctx, width, height, patternSeed);
      }

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
  }, [pattern, patternSeed, options]);

  const computedStyle: React.CSSProperties = {
    ...style,
    ...(patternOpacity !== undefined ? { opacity: patternOpacity } : {}),
  };

  return (
    <div
      ref={containerRef}
      data-pattern={pattern}
      aria-hidden="true"
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={computedStyle}
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
