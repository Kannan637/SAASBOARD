"use client"

import { GlobeStickers } from "@/components/ui/cobe-globe-stickers"

export default function GlobeStickersDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white p-8 overflow-hidden">
      <div className="w-full max-w-lg">
        <GlobeStickers />
      </div>
    </div>
  )
}
