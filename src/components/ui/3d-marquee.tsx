"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ThreeDMarqueeProps {
  images?: string[];
  columnsData?: string[][];
  className?: string;
  columns?: number;
  cardClassName?: string;
  imageClassName?: string;
  stageClassName?: string;
}

export const ThreeDMarquee = ({
  images = [],
  columnsData,
  className,
  columns = 3,
  cardClassName,
  imageClassName,
  stageClassName,
}: ThreeDMarqueeProps) => {
  const shouldReduceMotion = useReducedMotion();

  // Use provided columnsData (for custom randomized placement) or chunk the images array
  const numCols = columnsData ? columnsData.length : Math.max(1, columns);
  const chunks: string[][] =
    columnsData ||
    (() => {
      const chunkSize = Math.ceil(images.length / numCols);
      return Array.from({ length: numCols }, (_, colIndex) => {
        const start = colIndex * chunkSize;
        return images.slice(start, start + chunkSize);
      });
    })();

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
            stageClassName || "size-[800px] sm:size-[900px] lg:size-[1000px]",
          )}
        >
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d",
            }}
            className={cn(
              "grid origin-center gap-3.5 sm:gap-4 md:gap-5 transform-3d",
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
                    : { y: colIndex % 2 === 0 ? 60 : -60 }
                }
                transition={{
                  duration: colIndex === 1 ? 17 : colIndex === 2 ? 13 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-center gap-3.5 sm:gap-4 md:gap-5"
              >
                <GridLineVertical className="-left-2 sm:-left-2.5" offset="60px" />
                {subarray.map((image, imageIndex) => (
                  <div
                    key={imageIndex + image}
                    className={cn(
                      "relative flex items-center justify-center rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3.5 aspect-[4/3] w-24 sm:w-28 md:w-32 lg:w-36 shadow-[0_6px_20px_rgba(0,0,0,0.13)] border border-black/[0.04] transition-transform hover:scale-105",
                      cardClassName,
                    )}
                  >
                    <GridLineHorizontal className="-top-2 sm:-top-2.5" offset="40px" />
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
          "--color": "rgba(255, 255, 255, 0.2)",
          "--height": "1px",
          "--width": "4px",
          "--fade-stop": "90%",
          "--offset": offset || "100px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
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
          "--color": "rgba(255, 255, 255, 0.2)",
          "--height": "4px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "100px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
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
