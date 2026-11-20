"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
  columns?: number;
  cardClassName?: string;
  imageClassName?: string;
  stageClassName?: string;
}

export const ThreeDMarquee = ({
  images,
  className,
  columns = 3,
  cardClassName,
  imageClassName,
  stageClassName,
}: ThreeDMarqueeProps) => {
  const shouldReduceMotion = useReducedMotion();

  // Split the images array into equal chunks based on columns count (defaults to 3 visible marquee columns)
  const numCols = Math.max(1, columns);
  const chunkSize = Math.ceil(images.length / numCols);
  const chunks = Array.from({ length: numCols }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block h-full w-full overflow-hidden select-none",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div
          className={cn(
            "relative shrink-0 flex items-center justify-center",
            stageClassName || "w-[480px] sm:w-[540px] md:w-[600px] h-[520px] sm:h-[580px] md:h-[640px]",
          )}
        >
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d",
            }}
            className={cn(
              "grid origin-center gap-3 sm:gap-3.5 md:gap-4 transform-3d",
              numCols === 3
                ? "grid-cols-3"
                : numCols === 4
                ? "grid-cols-4"
                : `grid-cols-${numCols}`,
            )}
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={
                  shouldReduceMotion
                    ? { y: 0 }
                    : { y: colIndex % 2 === 0 ? 40 : -40 }
                }
                transition={{
                  duration: colIndex % 2 === 0 ? 11 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-center gap-3 sm:gap-3.5 md:gap-4"
              >
                <GridLineVertical className="-left-2" offset="40px" />
                {subarray.map((image, imageIndex) => (
                  <div
                    key={imageIndex + image}
                    className={cn(
                      "relative flex items-center justify-center rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3 aspect-[4/3] w-20 sm:w-24 md:w-28 shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-black/[0.04] transition-transform hover:scale-105",
                      cardClassName,
                    )}
                  >
                    <GridLineHorizontal className="-top-2" offset="20px" />
                    <motion.img
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                      src={image}
                      alt={`Brand logo ${imageIndex + 1}`}
                      className={cn(
                        "h-auto w-auto max-h-[64%] max-w-[74%] object-contain select-none pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
                        imageClassName,
                      )}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(255, 255, 255, 0.25)",
          "--height": "1px",
          "--width": "4px",
          "--fade-stop": "90%",
          "--offset": offset || "100px",
          "--color-dark": "rgba(255, 255, 255, 0.25)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30 pointer-events-none",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(255, 255, 255, 0.25)",
          "--height": "4px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "100px",
          "--color-dark": "rgba(255, 255, 255, 0.25)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30 pointer-events-none",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  );
};
