import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer9 } from "@/components/ui/footer-9";

const FOOTER_SOCIAL_LINKS = [
  { label: "+91 90030 09353", href: "tel:+919003009353" },
  {
    label: "WhatsApp Support",
    href: "https://wa.me/919003009353?text=Hello%20SASH%20Broadband%2C%20I%20would%20like%20to%20enquire%20about%20a%20fibre%20internet%20connection.",
  },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Thiruvallur, TN - 602001", href: "/contact" },
];

const FOOTER_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/#plans" },
  { label: "Broadband", href: "/broadband-services" },
  { label: "Leased Line", href: "/lease-line" },
  { label: "SME Internet", href: "/sme-internet" },
  { label: "CCTV", href: "/cctv" },
  { label: "Intranet", href: "/intranet" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Sitemap", href: "/sitemap" },
];

const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "HTML Sitemap", href: "/sitemap" },
  { label: "XML Sitemap", href: "/sitemap.xml" },
];

export default function Footer() {
  return (
    <>
      <Footer9
        heading={"Ready for Faster\nFibre Connectivity?"}
        email="sashbroadband@gmail.com"
        emailHref="mailto:sashbroadband@gmail.com"
        socialLinks={FOOTER_SOCIAL_LINKS}
        brandLogo={
          <Link
            href="/"
            className="inline-flex items-center bg-white rounded-sm px-3.5 py-2"
            aria-label="SASH Broadband Private Limited - Home"
          >
            <Image
              src="/Logo/sashbroadband.png"
              alt="SASH Broadband - High Speed Networks"
              width={140}
              height={64}
              className="h-10 w-auto object-contain"
            />
          </Link>
        }
        navLinks={FOOTER_NAV_LINKS}
        copyright="© 2026 SASH Broadband Private Limited. All rights reserved"
        legalLinks={FOOTER_LEGAL_LINKS}
      />

      {/* Floating WhatsApp Icon Button (Bottom Right, Official WhatsApp Color, No Text, Large Icon) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/919003009353?text=Hello%20SASH%20Broadband%2C%20I%20would%20like%20to%20enquire%20about%20a%20fibre%20internet%20connection."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with SASH Broadband on WhatsApp"
          className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white transition-transform duration-200 hover:scale-105"
        >
          <svg
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.004 3.2c-7.068 0-12.8 5.732-12.8 12.8 0 2.257.589 4.46 1.708 6.404L3.092 28.8l6.556-1.72c1.883 1.028 4.004 1.57 6.356 1.57h.006c7.066 0 12.796-5.732 12.796-12.8 0-3.42-1.332-6.636-3.75-9.054C22.638 4.532 19.422 3.2 16.004 3.2zm0 23.29h-.005c-1.994 0-3.95-.536-5.656-1.548l-.406-.24-4.212 1.105 1.124-4.106-.264-.42c-1.112-1.768-1.7-3.812-1.7-5.914 0-5.876 4.782-10.658 10.664-10.658 2.848 0 5.524 1.11 7.538 3.124 2.012 2.014 3.12 4.692 3.12 7.54 0 5.878-4.782 10.66-10.203 10.66zm5.848-7.984c-.32-.16-1.896-.936-2.19-1.042-.294-.108-.508-.16-.722.16-.214.32-.828 1.042-1.016 1.256-.186.214-.374.24-.694.08-.32-.16-1.352-.498-2.576-1.59-.952-.848-1.594-1.898-1.782-2.218-.186-.32-.02-.494.14-.654.144-.144.32-.374.48-.562.16-.186.214-.32.32-.534.108-.214.054-.4-.026-.56-.08-.16-.722-1.738-.988-2.38-.26-.624-.526-.54-.722-.55-.186-.008-.4-.01-.614-.01-.214 0-.562.08-.856.4-.294.32-1.122 1.096-1.122 2.674s1.15 3.102 1.31 3.316c.16.214 2.262 3.454 5.48 4.844.766.33 1.364.528 1.83.676.768.244 1.468.21 2.02.128.616-.092 1.896-.776 2.164-1.524.268-.748.268-1.39.188-1.524-.08-.134-.294-.214-.614-.374z" />
          </svg>
        </a>
      </div>
    </>
  );
}
