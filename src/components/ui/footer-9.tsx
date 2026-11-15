'use client';

import { type ReactNode, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

export interface Footer9SocialLink {
  label: string;
  href: string;
}

export interface Footer9NavLink {
  label: string;
  href: string;
}

export interface Footer9LegalLink {
  label: string;
  href: string;
}

export interface Footer9Props {
  /** Large CTA heading text (multi-line supported) */
  heading?: string;
  /** Contact email displayed below the heading */
  email?: string;
  /** Href for the email link (e.g. mailto:) */
  emailHref?: string;
  /** Custom icon for email link */
  emailIcon?: ReactNode;
  /** Background image URL for the hero area */
  backgroundImage?: string;
  /** Social media links displayed on the right */
  socialLinks?: Footer9SocialLink[];
  /** Brand logo or name element */
  brandLogo?: ReactNode;
  /** Navigation links shown in the bottom bar */
  navLinks?: Footer9NavLink[];
  /** Copyright text */
  copyright?: string;
  /** Legal/policy links shown at the very bottom */
  legalLinks?: Footer9LegalLink[];
  /** Enable dynamic scroll-reactive background gradient (defaults to true) */
  enableScrollGradient?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const lineSeparatorVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0, originX: 0.5 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { type: 'spring', duration: 0.9, bounce: 0 },
  },
};

/**
 * Dynamic React Scroll-Driven Background Gradient
 * Responds fluidly to the user scrolling into the footer:
 * - Parallax backdrop depth
 * - Rising & expanding electric navy & sapphire aurora dome
 * - Blooming SASH brand red horizon arc & ruby core flare
 * - Radiant horizontal light beam stretching across the crest
 * - Interactive cursor-following glow on hover
 */
function FooterScrollGradient({
  scrollProgress,
  backgroundImage,
  mousePos,
}: {
  scrollProgress: MotionValue<number>;
  backgroundImage?: string;
  mousePos: { x: number; y: number; active: boolean };
}) {
  const shouldReduceMotion = useReducedMotion();

  // 1. Parallax backdrop shift
  const bgTranslateY = useTransform(scrollProgress, [0, 1], ["-4%", "4%"]);
  const bgScale = useTransform(scrollProgress, [0, 1], [1.02, 1.1]);
  const bgOpacity = useTransform(scrollProgress, [0, 0.4, 1], [0.65, 0.85, 1]);

  // 2. Rising Luminous Dome (Electric Navy + Sapphire Glow)
  const domeScale = useTransform(scrollProgress, [0, 1], [0.85, 1.18]);
  const domeY = useTransform(scrollProgress, [0, 1], ["70px", "-30px"]);
  const domeOpacity = useTransform(
    scrollProgress,
    [0, 0.35, 1],
    [0.35, 0.7, 0.95]
  );

  // 3. Rising & Expanding SASH Brand Red Arc / Horizon Bloom
  const redCoreScaleX = useTransform(scrollProgress, [0, 1], [0.65, 1.25]);
  const redCoreScaleY = useTransform(scrollProgress, [0, 1], [0.7, 1.2]);
  const redCoreY = useTransform(scrollProgress, [0, 1], ["80px", "-10px"]);
  const redCoreOpacity = useTransform(
    scrollProgress,
    [0, 0.4, 1],
    [0.3, 0.7, 0.95]
  );

  // 4. Horizon Light Flare Beam
  const beamWidth = useTransform(scrollProgress, [0, 1], ["30%", "95%"]);
  const beamOpacity = useTransform(scrollProgress, [0, 0.35, 1], [0, 0.65, 1]);
  const beamY = useTransform(scrollProgress, [0, 1], ["40px", "-15px"]);

  // 5. Secondary Ruby Flare Pulse
  const rubyFlareScale = useTransform(scrollProgress, [0, 1], [0.75, 1.3]);
  const rubyFlareOpacity = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0.25, 0.6, 0.9]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* 1. Base Deep Navy to Midnight Obsidian Foundation */}
      <div className="absolute inset-0 bg-linear-to-b from-[#000000] via-[#010D3B] to-[#010722]" />

      {/* 2. Parallax SVG Arch Background from footer-9-sash-bg.svg */}
      {backgroundImage && (
        <motion.div
          style={{ y: bgTranslateY, scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover select-none"
          />
        </motion.div>
      )}

      {/* 3. Dynamic Reactive Electric Navy & Sapphire Dome Glow */}
      <motion.div
        style={{
          y: domeY,
          scale: domeScale,
          opacity: domeOpacity,
        }}
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[1250px] max-w-[150vw] h-[520px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(43,63,140,0.6)_0%,rgba(26,37,82,0.4)_45%,transparent_75%)] blur-3xl will-change-transform"
      />

      {/* 4. Dynamic Reactive SASH Brand Red Corona & Core Wave */}
      <motion.div
        style={{
          y: redCoreY,
          scaleX: redCoreScaleX,
          scaleY: redCoreScaleY,
          opacity: redCoreOpacity,
        }}
        className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[1100px] max-w-[130vw] h-[380px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(222,3,2,0.85)_0%,rgba(255,59,58,0.55)_35%,rgba(184,2,1,0.25)_60%,transparent_75%)] blur-2xl will-change-transform"
      />

      {/* 5. Central High-Intensity Ruby Flare (Deep bottom center anchor) */}
      <motion.div
        style={{
          scale: rubyFlareScale,
          opacity: rubyFlareOpacity,
        }}
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] max-w-[90vw] h-[200px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,90,90,0.9)_0%,rgba(222,3,2,0.75)_40%,transparent_70%)] blur-xl will-change-transform"
      />

      {/* 6. Reactive Horizon Crest Light Beam (Stretches across the horizon on scroll) */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
        <motion.div
          style={{
            width: beamWidth,
            opacity: beamOpacity,
            y: beamY,
          }}
          className="h-[3px] bg-linear-to-r from-transparent via-white to-transparent shadow-[0_0_28px_8px_rgba(255,80,80,0.95)] will-change-transform"
        />
      </div>

      {/* 7. Interactive Pointer Glow on Hover (Desktop) */}
      {mousePos.active && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-3xl opacity-25 transition-opacity duration-300"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            background:
              "radial-gradient(circle, rgba(255,59,58,0.5) 0%, rgba(43,63,140,0.25) 50%, transparent 70%)",
          }}
        />
      )}

      {/* 8. Ambient Top Vignette (Smooth transition from preceding section) */}
      <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/85 via-black/35 to-transparent pointer-events-none" />
    </div>
  );
}

export function Footer9({
  heading = 'Ready to Build\nSomething Great?',
  email = 'sashbroadband@gmail.com',
  emailHref = 'mailto:sashbroadband@gmail.com',
  emailIcon,
  backgroundImage = '/Footer/footer-9-sash-bg.svg',
  socialLinks = [],
  brandLogo,
  navLinks = [],
  copyright = '© 2026 SASH Broadband Private Limited. All rights reserved',
  legalLinks = [],
  enableScrollGradient = true,
}: Footer9Props) {
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999, active: false });

  // Bind scroll progress directly to the footer container in view
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Inertial spring for butter-smooth momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-brand-navy py-12 selection:bg-brand-red selection:text-white"
    >
      {/* Scroll-Reactive Gradient Background */}
      {enableScrollGradient ? (
        <FooterScrollGradient
          scrollProgress={smoothProgress}
          backgroundImage={backgroundImage}
          mousePos={mousePos}
        />
      ) : (
        backgroundImage && (
          <div className="pointer-events-none absolute inset-0 h-full w-full select-none">
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
              className="object-cover"
            />
          </div>
        )
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-10 md:px-16 lg:px-20"
      >
        <div className="flex min-h-[420px] flex-col justify-between gap-10 pt-12 pb-10 sm:min-h-[460px] sm:pt-16 md:min-h-[500px] lg:flex-row lg:items-start lg:gap-16">
          <div className="flex flex-1 flex-col justify-between gap-8">
            <h2 className="text-primary-foreground max-w-2xl text-4xl leading-tight font-normal tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {heading.split('\n').map((line, i) => (
                <motion.span variants={itemVariants} key={i} className="block">
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.a
              variants={itemVariants}
              href={emailHref}
              className="group inline-flex items-center gap-2 self-start"
            >
              <span className="text-primary-foreground/80 group-hover:text-primary-foreground text-sm font-normal tracking-wide transition-colors duration-200 sm:text-base">
                {email}
              </span>
              <span className="text-primary-foreground/80 group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                {emailIcon || (
                  <FaArrowUpRightFromSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                )}
              </span>
            </motion.a>
          </div>

          {socialLinks.length > 0 && (
            <motion.nav
              variants={fadeLeftVariants}
              aria-label="Social media links"
              className="flex flex-row flex-wrap gap-4 lg:flex-col lg:items-end lg:gap-2.5 lg:pt-2"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-normal transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          )}
        </div>

        <div className="flex flex-col gap-5 pb-6 sm:gap-6 sm:pb-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center sm:gap-8">
            {brandLogo && (
              <motion.div variants={fadeRightVariants} className="shrink-0">
                {brandLogo}
              </motion.div>
            )}

            {navLinks.length > 0 && (
              <motion.nav
                variants={fadeLeftVariants}
                aria-label="Footer navigation"
                className="flex flex-wrap items-center gap-5 sm:gap-6 md:gap-8"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-normal text-white/90 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            )}
          </div>

          <motion.div variants={lineSeparatorVariants}>
            <Separator className="bg-primary-foreground/20" />
          </motion.div>

          <motion.div
            variants={fadeVariants}
            className="mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0"
          >
            {copyright && (
              <p className="text-xs text-white sm:text-sm">{copyright}</p>
            )}

            {copyright && legalLinks.length > 0 && (
              <span className="hidden px-4 text-white/90 sm:inline">|</span>
            )}

            {legalLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 text-xs text-balance text-white/90 sm:text-sm">
                {legalLinks.map((link, index) => (
                  <span key={link.label} className="inline-flex items-center">
                    <a
                      href={link.href}
                      className="hover:text-primary-foreground/80 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className="px-1">,</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
