"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICE_LINKS = [
  {
    name: "Broadband",
    href: "/broadband-services",
    desc: "Unlimited home fibre up to 1 Gbps",
    icon: "/Service/BroadBand.webp",
  },
  {
    name: "Leased Line",
    href: "/lease-line",
    desc: "Dedicated 1:1 enterprise connectivity",
    icon: "/Service/Leased Line.webp",
  },
  {
    name: "SME Internet",
    href: "/sme-internet",
    desc: "High-uptime plans for growing businesses",
    icon: "/Service/SME Internet.webp",
  },
  {
    name: "CCTV Surveillance",
    href: "/cctv",
    desc: "HD IP cameras & remote premise monitoring",
    icon: "/Service/CCTV.webp",
  },
  {
    name: "Intranet Solutions",
    href: "/intranet",
    desc: "Private multi-branch LAN & MPLS networks",
    icon: "/Service/Intranet.webp",
  },
];

export default function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const isServicePage = SERVICE_LINKS.some((item) => item.href === pathname);

  // Close menus on route change
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setServicesOpen(false);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  // Elevation shadow on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Homepage scroll spy for responsive active link indicators
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") {
      return;
    }

    const sections = [
      { id: "contact", name: "contact" },
      { id: "faq", name: "faq" },
      { id: "plans", name: "plans" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 260) {
          setActiveSection("home");
          return;
        }

        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleTopScroll = () => {
      if (window.scrollY < 260) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleTopScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, [pathname]);

  // Prevent background scroll when mobile menu is open & auto-close on desktop resize
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  // Outside click & escape key handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileMenuOpen(false);
      setServicesOpen(false);

      if (href.startsWith("/#") && pathname === "/") {
        const hash = href.slice(2);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [pathname]
  );

  return (
    <>
      {/* Skip to content link for WCAG 2.1 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[10px] focus:bg-brand-red focus:px-6 focus:py-3 focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      {/* Top Utility Bar (Contact desk & office hours) */}
      <div
        role="region"
        aria-label="Contact and office hours information"
        className="bg-brand-navy text-white border-b border-navy-80 text-xs sm:text-sm"
      >
        <div className="container-sash py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-6">
          {/* Left: Phone + Email */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <a
              href="tel:+919003009353"
              className="inline-flex items-center gap-1.5 sm:gap-2 font-medium text-white hover:underline py-0.5 shrink-0"
              aria-label="Call SASH Broadband at +91 90030 09353"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-brand-red"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="truncate">+91 90030 09353</span>
            </a>

            <span
              className="hidden md:inline-block h-3.5 w-px bg-white/20"
              aria-hidden="true"
            />

            <a
              href="mailto:sashbroadband@gmail.com"
              className="hidden md:inline-flex items-center gap-2 font-medium text-white/90 hover:text-white hover:underline py-0.5 truncate"
              aria-label="Email SASH Broadband at sashbroadband@gmail.com"
            >
              <svg
                className="w-4 h-4 shrink-0 text-white/80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>sashbroadband@gmail.com</span>
            </a>
          </div>

          {/* Right: Office Hours */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-white/90 font-medium shrink-0">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-brand-red"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="sm:hidden">Mon–Sat, 9AM–6PM</span>
            <span className="hidden sm:inline">Mon–Sat, 9:00 AM–6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Responsive Sticky Navbar with Scroll Elevation */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-[box-shadow,border-color,background-color] duration-200 ${
          isScrolled
            ? "border-b border-brand-navy/10 shadow-[0_4px_20px_rgba(1,13,59,0.06)]"
            : "border-b border-neutral-100"
        }`}
      >
        <div className="container-sash h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => handleNavClick("/")}
            className="inline-flex items-center py-1.5 shrink-0 transition-opacity hover:opacity-90"
            aria-label="SASH Broadband Private Limited - Home"
          >
            <Image
              src="/Logo/sashbroadband.png"
              alt="SASH Broadband - High Speed Networks"
              width={150}
              height={68}
              priority
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {/* Home */}
            <Link
              href="/"
              onClick={() => handleNavClick("/")}
              className={`px-3.5 py-2 rounded-sm text-sm sm:text-base font-normal transition-colors min-h-[40px] inline-flex items-center ${
                pathname === "/" && activeSection === "home"
                  ? "text-brand-red font-medium"
                  : "text-brand-navy hover:text-brand-red"
              }`}
            >
              Home
            </Link>

            {/* Plans */}
            <Link
              href="/#plans"
              onClick={() => handleNavClick("/#plans")}
              className={`px-3.5 py-2 rounded-sm text-sm sm:text-base font-normal transition-colors min-h-[40px] inline-flex items-center ${
                pathname === "/" && activeSection === "plans"
                  ? "text-brand-red font-medium"
                  : "text-brand-navy hover:text-brand-red"
              }`}
            >
              Plans
            </Link>

            {/* Services Dropdown (Hover + Click) */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
                className={`px-3.5 py-2 rounded-sm text-sm sm:text-base font-normal transition-colors min-h-[40px] inline-flex items-center gap-1.5 cursor-pointer ${
                  servicesOpen || isServicePage
                    ? "text-brand-red font-medium"
                    : "text-brand-navy hover:text-brand-red"
                }`}
              >
                <span>Services</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-brand-red" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Animated Desktop Dropdown Panel */}
              <div
                role="menu"
                aria-label="SASH Broadband Services"
                className={`absolute left-0 mt-1.5 w-88 rounded-[16px] bg-white border border-brand-navy/10 p-2 shadow-[0_18px_40px_rgba(1,13,59,0.12)] z-50 transition-all duration-200 origin-top-left ${
                  servicesOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                }`}
              >
                {SERVICE_LINKS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center gap-3.5 p-3 rounded-[10px] transition-colors group ${
                        isActive
                          ? "bg-red-10/70 border border-brand-red/30"
                          : "hover:bg-neutral-100"
                      }`}
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-sm sm:text-base font-medium truncate ${
                            isActive
                              ? "text-brand-red"
                              : "text-brand-navy group-hover:text-brand-red"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-xs text-neutral-600 truncate">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* About */}
            <Link
              href="/about"
              onClick={() => handleNavClick("/about")}
              className={`px-3.5 py-2 rounded-sm text-sm sm:text-base font-normal transition-colors min-h-[40px] inline-flex items-center ${
                pathname === "/about"
                  ? "text-brand-red font-medium"
                  : "text-brand-navy hover:text-brand-red"
              }`}
            >
              About
            </Link>

            {/* FAQ */}
            <Link
              href="/#faq"
              onClick={() => handleNavClick("/#faq")}
              className={`px-3.5 py-2 rounded-sm text-sm sm:text-base font-normal transition-colors min-h-[40px] inline-flex items-center ${
                pathname === "/" && activeSection === "faq"
                  ? "text-brand-red font-medium"
                  : "text-brand-navy hover:text-brand-red"
              }`}
            >
              FAQ
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={() => handleNavClick("/contact")}
              className={`px-3.5 py-2 rounded-sm text-sm sm:text-base font-normal transition-colors min-h-[40px] inline-flex items-center ${
                pathname === "/contact" ||
                (pathname === "/" && activeSection === "contact")
                  ? "text-brand-red font-medium"
                  : "text-brand-navy hover:text-brand-red"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/#contact"
              onClick={() => handleNavClick("/#contact")}
              className="group/cta btn-pill btn-primary-red text-sm font-normal"
            >
              <span>Check availability</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile Actions: Quick Call Button + Menu Toggle (lg:hidden) */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:+919003009353"
              aria-label="Call SASH Broadband"
              className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-red-10 text-brand-red hover:bg-brand-red hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
              className="inline-flex items-center justify-center w-11 h-11 rounded-sm border border-brand-navy/15 text-brand-navy hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 top-[104px] sm:top-[120px] bg-brand-navy/40 backdrop-blur-xs z-40 transition-opacity"
          />
        )}

        {/* Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="lg:hidden absolute top-full inset-x-0 max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] bg-white z-50 overflow-y-auto border-t border-brand-navy/10 shadow-[0_20px_40px_rgba(1,13,59,0.18)] flex flex-col justify-between px-5 pt-4 pb-8"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {/* Home */}
              <Link
                href="/"
                onClick={() => handleNavClick("/")}
                className={`px-4 py-3 rounded-sm text-base font-normal min-h-[46px] flex items-center justify-between transition-colors ${
                  pathname === "/" && activeSection === "home"
                    ? "bg-red-10 text-brand-red font-medium"
                    : "text-brand-navy hover:bg-neutral-100"
                }`}
              >
                <span>Home</span>
              </Link>

              {/* Plans */}
              <Link
                href="/#plans"
                onClick={() => handleNavClick("/#plans")}
                className={`px-4 py-3 rounded-sm text-base font-normal min-h-[46px] flex items-center justify-between transition-colors ${
                  pathname === "/" && activeSection === "plans"
                    ? "bg-red-10 text-brand-red font-medium"
                    : "text-brand-navy hover:bg-neutral-100"
                }`}
              >
                <span>Plans &amp; Pricing</span>
              </Link>

              {/* Mobile Services Accordion */}
              <div className="rounded-[14px] bg-neutral-100/80 border border-brand-navy/8 p-2 my-1">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  aria-expanded={mobileServicesOpen}
                  className="w-full px-2.5 py-2 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-medium text-brand-navy cursor-pointer"
                >
                  <span className={isServicePage ? "text-brand-red font-semibold" : ""}>
                    Our Services
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180 text-brand-red" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {mobileServicesOpen && (
                  <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {SERVICE_LINKS.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className={`p-2.5 rounded-sm bg-white border min-h-[48px] flex items-center gap-3 transition-colors ${
                            isActive
                              ? "border-brand-red bg-red-10/40"
                              : "border-neutral-100 hover:border-brand-red/30"
                          }`}
                        >
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm truncate font-normal ${
                                isActive ? "text-brand-red font-medium" : "text-brand-navy"
                              }`}
                            >
                              {item.name}
                            </p>
                            <p className="text-xs text-neutral-600 truncate">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* About */}
              <Link
                href="/about"
                onClick={() => handleNavClick("/about")}
                className={`px-4 py-3 rounded-sm text-base font-normal min-h-[46px] flex items-center justify-between transition-colors ${
                  pathname === "/about"
                    ? "bg-red-10 text-brand-red font-medium"
                    : "text-brand-navy hover:bg-neutral-100"
                }`}
              >
                <span>About Us</span>
              </Link>

              {/* FAQ */}
              <Link
                href="/#faq"
                onClick={() => handleNavClick("/#faq")}
                className={`px-4 py-3 rounded-sm text-base font-normal min-h-[46px] flex items-center justify-between transition-colors ${
                  pathname === "/" && activeSection === "faq"
                    ? "bg-red-10 text-brand-red font-medium"
                    : "text-brand-navy hover:bg-neutral-100"
                }`}
              >
                <span>FAQ</span>
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => handleNavClick("/contact")}
                className={`px-4 py-3 rounded-sm text-base font-normal min-h-[46px] flex items-center justify-between transition-colors ${
                  pathname === "/contact" ||
                  (pathname === "/" && activeSection === "contact")
                    ? "bg-red-10 text-brand-red font-medium"
                    : "text-brand-navy hover:bg-neutral-100"
                }`}
              >
                <span>Contact</span>
              </Link>
            </nav>

            {/* Mobile Drawer Footer CTAs & Contact Details */}
            <div className="mt-6 pt-5 border-t border-brand-navy/10 flex flex-col gap-3">
              <Link
                href="/#contact"
                onClick={() => handleNavClick("/#contact")}
                className="btn-pill btn-primary-red w-full text-center text-sm sm:text-base font-normal"
              >
                Check availability
              </Link>
              <a
                href="tel:+919003009353"
                className="btn-pill btn-ghost-white w-full text-center text-sm sm:text-base font-normal"
              >
                <svg
                  className="w-4 h-4 text-brand-red"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call +91 90030 09353</span>
              </a>

              <div className="pt-2 flex flex-col items-center gap-1 text-xs text-neutral-600 text-center">
                <a
                  href="mailto:sashbroadband@gmail.com"
                  className="font-medium text-brand-navy hover:underline"
                >
                  sashbroadband@gmail.com
                </a>
                <span>Mon–Sat, 9:00 AM–6:00 PM • Thiruvallur, TN</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
