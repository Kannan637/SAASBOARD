'use client';

import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import { motion, type Variants } from 'motion/react';

interface NavLink {
  label: string;
  href: string;
}

interface Hero17Props {
  brandName?: string;
  navLinks?: NavLink[];
  showNav?: boolean;
  headingId?: string;
  eyebrow?: string;
  headingLine1Prefix?: string;
  headingHighlight?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  loginLabel?: string;
  loginHref?: string;
  signupLabel?: string;
  signupHref?: string;
  scrollLabel?: string;
  scrollHref?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

const navLinksDefault: NavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Resources', href: '#' },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const driftUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 10, stiffness: 45 },
  },
};

const navDrop: Variants = {
  hidden: { opacity: 0, y: -10, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 12, stiffness: 50 },
  },
};

const staggerWords: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15, filter: 'blur(15px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 25, stiffness: 30 },
  },
};



export default function Hero17({
  brandName = 'SASH Broadband',
  navLinks = navLinksDefault,
  showNav = true,
  headingId,
  eyebrow = "TAMIL NADU'S FTTH FIBRE NETWORK",
  headingLine1Prefix = 'Faster Fibre',
  headingHighlight = 'Broadband',
  headingLine2 = 'Up To 1 Gbps Speed',
  description = 'Unlimited home fibre starting at ₹650/month, 1:1 enterprise leased lines, SME internet, and HD CCTV across Thiruvallur & Tamil Nadu.',
  primaryCtaLabel = 'Explore Plans',
  primaryCtaHref = '/#plans',
  secondaryCtaLabel = 'Check Availability',
  secondaryCtaHref = '/#contact',
  loginLabel = 'Support',
  loginHref = '/#contact',
  signupLabel = 'Get Started',
  signupHref = '/#plans',
  scrollLabel = 'Scroll for Plans',
  scrollHref,
  backgroundImage = '/Hero/hero-17-sash-bg.webp',
  backgroundAlt = '',
}: Hero17Props) {
  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate min-h-screen overflow-hidden font-sans text-brand-navy antialiased"
    >
      <motion.div
        className="relative flex h-full min-h-screen w-full flex-col overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.38 }}
        variants={sectionVariants}
      >
        <motion.img
          variants={imageVariants}
          src={backgroundImage}
          alt={backgroundAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {showNav && (
          <motion.nav
            variants={navDrop}
            className="relative z-10 mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-10 lg:px-16"
          >
            <a
              href="#"
              className="inline-flex min-h-10 items-center text-xl font-medium tracking-[-0.03em] text-brand-navy transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96]"
            >
              {brandName}
            </a>

            <div className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-sm font-medium text-navy-80 transition-[color,transform] duration-200 ease-out hover:text-brand-navy active:scale-[0.96]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <a
                href={loginHref}
                className="text-navy-80 hidden min-h-10 items-center text-sm font-normal transition-[color,transform] duration-200 ease-out hover:text-brand-navy active:scale-[0.96] sm:inline-flex"
              >
                {loginLabel}
              </a>
              <a
                href={signupHref}
                className="group/primary inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-linear-to-b from-brand-red to-brand-red-hover px-3 text-sm font-normal text-white outline-2 -outline-offset-2 outline-white/20 transition-[background-color,transform,box-shadow] duration-200 ease-out hover:from-brand-red-hover hover:to-brand-red-hover hover:bg-brand-red-hover active:scale-[0.96]"
              >
                {signupLabel}
              </a>
            </div>
          </motion.nav>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[74rem] flex-1 flex-col items-center px-6 pt-20 pb-10 text-center sm:px-10 sm:pt-12 lg:px-16">
          <motion.div
            variants={driftUp}
            className="inline-flex min-h-7 items-center justify-center gap-2 rounded-sm bg-white/30 px-3 text-xs leading-none font-medium font-mono text-brand-navy shadow-[0_1px_1px_rgba(1,13,59,0.06),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md"
          >
            {eyebrow}
          </motion.div>

          <motion.h1
            id={headingId}
            variants={staggerWords}
            className="mt-5 max-w-5xl text-[clamp(3.1rem,4.1vw,5.25rem)] leading-[1.03] font-normal tracking-tight text-balance text-brand-navy"
          >
            <span className="block">
              {headingLine1Prefix.split(' ').map((word, i) => (
                <motion.span key={i} variants={driftUp} className="inline-block mr-[0.22em]">
                  {word}
                </motion.span>
              ))}
              <motion.span variants={driftUp} className="inline-block font-normal text-brand-red">
                {headingHighlight}
              </motion.span>
            </span>
            <span className="block mt-1">
              {headingLine2.split(' ').map((word, i) => (
                <motion.span key={i} variants={driftUp} className="inline-block mr-[0.22em]">
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            variants={driftUp}
            className="mt-5 max-w-md text-sm leading-5 font-normal text-pretty text-neutral-600"
          >
            {description}
          </motion.p>

          <motion.div
            variants={driftUp}
            className="mt-7 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={primaryCtaHref}
              className="group/primary inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-linear-to-b from-brand-red to-brand-red-hover px-6 text-sm font-normal text-white shadow-[0_6px_20px_var(--color-red-10)] outline-2 -outline-offset-2 outline-white/20 transition-[background-color,transform,box-shadow] duration-200 ease-out hover:from-brand-red-hover hover:to-brand-red-hover hover:bg-brand-red-hover active:scale-[0.96]"
            >
              {primaryCtaLabel}
              <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/primary:translate-x-0.5" />
            </a>
            <a
              href={secondaryCtaHref}
              className="group/process inline-flex min-h-12 items-center justify-center gap-2 px-2 text-sm font-normal text-brand-navy transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96]"
            >
              {secondaryCtaLabel}
              <Play className="size-3 fill-current transition-transform duration-200 ease-out group-hover/process:scale-110" />
            </a>
          </motion.div>

          {scrollHref ? (
            <motion.a
              href={scrollHref}
              variants={driftUp}
              className="mt-auto flex flex-col items-center gap-3 pb-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-opacity hover:opacity-85"
            >
              <ArrowDown className="size-5" />
              <span className="text-base font-semibold">{scrollLabel}</span>
            </motion.a>
          ) : (
            <motion.div
              variants={driftUp}
              className="mt-auto flex flex-col items-center gap-3 pb-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              <ArrowDown className="size-5" />
              <span className="text-base font-semibold">{scrollLabel}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
