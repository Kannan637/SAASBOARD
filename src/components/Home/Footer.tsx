import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer9 } from "@/components/ui/footer-9";
import { FloatingActions } from "@/components/ui/floating-actions";

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
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
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

      {/* Floating Quick Action Buttons: Go to Top & WhatsApp */}
      <FloatingActions />
    </>
  );
}
