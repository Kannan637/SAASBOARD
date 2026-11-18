"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

export interface StickerMarker {
  id: string
  location: [number, number]
  sticker?: React.ReactNode
  size?: number
}

export interface GlobeStickersProps {
  markers?: StickerMarker[]
  className?: string
  speed?: number
  baseColor?: [number, number, number]
  markerColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  initialPhi?: number
  initialTheta?: number
  scale?: number
}

export const defaultMarkers: StickerMarker[] = [
  { id: "paris", location: [48.86, 2.35], sticker: "🥐" },
  { id: "tokyo", location: [35.68, 139.65], sticker: "🗼" },
  { id: "nyc", location: [40.71, -74.01], sticker: "🍎" },
  { id: "rio", location: [-22.91, -43.17], sticker: "🎭" },
  { id: "sydney", location: [-33.87, 151.21], sticker: "🐨" },
  { id: "cairo", location: [30.04, 31.24], sticker: "🐪" },
  { id: "rome", location: [41.9, 12.5], sticker: "🍕" },
  { id: "mexico", location: [19.43, -99.13], sticker: "🌮" },
  { id: "india", location: [28.61, 77.21], sticker: "🐘" },
  { id: "iceland", location: [64.15, -21.94], sticker: "🧊" },
  { id: "london", location: [51.51, -0.13], sticker: "☕" },
  { id: "hawaii", location: [21.31, -157.86], sticker: "🏄" },
  { id: "amsterdam", location: [52.37, 4.9], sticker: "🚲" },
  { id: "beijing", location: [39.9, 116.4], sticker: "🐉" },
  { id: "moscow", location: [55.75, 37.62], sticker: "🪆" },
  { id: "seoul", location: [37.57, 126.98], sticker: "🎮" },
]

export function projectPoint(
  [lat, lng]: [number, number],
  phi: number,
  theta: number,
  scale: number = 1
) {
  const PI = Math.PI
  const r = (lat * PI) / 180
  const a = (lng * PI) / 180 - PI
  const o = Math.cos(r)
  const t = [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)]

  const cosTheta = Math.cos(theta)
  const cosPhi = Math.cos(phi)
  const sinTheta = Math.sin(theta)
  const sinPhi = Math.sin(phi)

  const c = cosPhi * t[0] + sinPhi * t[2]
  const s = sinPhi * sinTheta * t[0] + cosTheta * t[1] - cosPhi * sinTheta * t[2]
  const z = -sinPhi * cosTheta * t[0] + sinTheta * t[1] + cosPhi * cosTheta * t[2]

  const visible = z >= 0
  const x = ((c * scale + 1) / 2) * 100
  const y = ((-s * scale + 1) / 2) * 100

  return { x, y, visible }
}

export function GlobeStickers({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
  baseColor = [0.004, 0.051, 0.231],
  markerColor = [0.871, 0.012, 0.008],
  glowColor = [0.871, 0.012, 0.008],
  dark = 0,
  mapBrightness = 8,
  initialPhi = 0,
  initialTheta = 0.2,
  scale = 1,
}: GlobeStickersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const markerEls = useRef<Record<string, HTMLDivElement | null>>({})
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = initialPhi

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: initialPhi,
        theta: initialTheta,
        dark,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation: 0,
        markers: markers.map((m) => ({
          location: m.location,
          size: m.size ?? 0.03,
          id: m.id,
        })),
        arcs: [],
        arcColor: [0.9, 0.4, 0.7],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
        scale,
      })
      function animate() {
        if (!isPausedRef.current) phi += speed
        const currentPhi = phi + phiOffsetRef.current + dragOffset.current.phi
        const currentTheta = initialTheta + thetaOffsetRef.current + dragOffset.current.theta
        globe!.update({
          phi: currentPhi,
          theta: currentTheta,
        })
        markers.forEach((m) => {
          const el = markerEls.current[m.id]
          if (el) {
            const proj = projectPoint(m.location, currentPhi, currentTheta, scale)
            el.style.left = `${proj.x}%`
            el.style.top = `${proj.y}%`
            el.style.opacity = proj.visible ? "1" : "0"
          }
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [
    markers,
    speed,
    baseColor,
    markerColor,
    glowColor,
    dark,
    mapBrightness,
    initialPhi,
    initialTheta,
    scale,
  ])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="sticker-outline">
            <feMorphology in="SourceAlpha" result="Dilated" operator="dilate" radius="2" />
            <feFlood floodColor="#ffffff" result="OutlineColor" />
            <feComposite in="OutlineColor" in2="Dilated" operator="in" result="Outline" />
            <feMerge>
              <feMergeNode in="Outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {markers.map((m, i) => {
        const initialProj = projectPoint(m.location, initialPhi, initialTheta, scale)
        return (
          <div
            key={m.id}
            ref={(node) => {
              if (node) markerEls.current[m.id] = node
              else delete markerEls.current[m.id]
            }}
            style={
              {
                position: "absolute",
                positionAnchor: `--cobe-${m.id}`,
                bottom: "anchor(top)",
                left: `${initialProj.x}%`,
                top: `${initialProj.y}%`,
                translate: "-50% -100%",
                fontSize: "1.75rem",
                lineHeight: 1,
                transform:
                  markers.length > 1
                    ? `rotate(${[-8, 6, -4, 10][i % 4]}deg)`
                    : undefined,
                filter:
                  typeof m.sticker === "string"
                    ? "url(#sticker-outline) drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
                    : "drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
                pointerEvents: "none",
                opacity: initialProj.visible ? 1 : 0,
                transition: "opacity 0.2s, filter 0.2s",
              } as React.CSSProperties
            }
          >
            {m.sticker}
          </div>
        )
      })}
    </div>
  )
}
export default GlobeStickers
