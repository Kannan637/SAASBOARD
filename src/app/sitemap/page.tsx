import type { Metadata } from "next";
import Link from "next/link";
import {
  FiWifi,
  FiServer,
  FiBriefcase,
  FiVideo,
  FiShare2,
  FiInfo,
  FiPhoneCall,
  FiShield,
  FiFileText,
  FiMapPin,
  FiExternalLink,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const SITE_URL = "https://www.sashbroadband.com";

export const metadata: Metadata = {
  title: "Sitemap & SEO Directory | SASH Broadband Tamil Nadu",
  description:
    "Complete sitemap and directory of SASH Broadband services, FTTH fibre plans, enterprise 1:1 leased line solutions, SME internet, CCTV networks, and regional coverage across Tamil Nadu.",
  alternates: {
    canonical: "/sitemap",
    languages: { "en-IN": "/sitemap" },
  },
  openGraph: {
    title: "Sitemap & SEO Directory | SASH Broadband Tamil Nadu",
    description:
      "Explore all residential fibre broadband plans, enterprise 1:1 leased line solutions, SME connectivity, surveillance networks, and coverage regions across Tamil Nadu.",
    url: `${SITE_URL}/sitemap`,
    type: "website",
  },
};

const sitemapBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Sitemap",
      item: `${SITE_URL}/sitemap`,
    },
  ],
};

const sitemapCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SASH Broadband Sitemap & SEO Directory",
  description:
    "Complete directory of all indexable pages, services, enterprise solutions, and coverage locations offered by SASH Broadband Private Limited in Tamil Nadu.",
  url: `${SITE_URL}/sitemap`,
  hasPart: [
    {
      "@type": "WebPage",
      name: "Home - Fast Optical Broadband in Tamil Nadu",
      url: `${SITE_URL}/`,
    },
    {
      "@type": "WebPage",
      name: "Unlimited Fibre Broadband Services",
      url: `${SITE_URL}/broadband-services`,
    },
    {
      "@type": "WebPage",
      name: "Dedicated Internet Leased Line (ILL)",
      url: `${SITE_URL}/lease-line`,
    },
    {
      "@type": "WebPage",
      name: "SME & Commercial Internet Solutions",
      url: `${SITE_URL}/sme-internet`,
    },
    {
      "@type": "WebPage",
      name: "Enterprise CCTV & Surveillance Networks",
      url: `${SITE_URL}/cctv`,
    },
    {
      "@type": "WebPage",
      name: "Multi-Site Private Optical Intranet",
      url: `${SITE_URL}/intranet`,
    },
    {
      "@type": "WebPage",
      name: "About SASH Broadband (Class-B ISP)",
      url: `${SITE_URL}/about`,
    },
    {
      "@type": "WebPage",
      name: "Contact & Local Technical NOC",
      url: `${SITE_URL}/contact`,
    },
    {
      "@type": "WebPage",
      name: "Privacy Policy",
      url: `${SITE_URL}/privacy-policy`,
    },
    {
      "@type": "WebPage",
      name: "Terms of Service & SLA Conditions",
      url: `${SITE_URL}/terms-of-service`,
    },
  ],
};

interface DirectorySection {
  id: string;
  category: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  pages: {
    title: string;
    href: string;
    description: string;
    keywords: string[];
    isExternal?: boolean;
    isPrimary?: boolean;
  }[];
}

const DIRECTORY_SECTIONS: DirectorySection[] = [
  {
    id: "residential-broadband",
    category: "Residential & FTTH Broadband",
    badge: "Core Service",
    icon: FiWifi,
    description:
      "High-speed optical fibre connectivity for homes, families, and remote professionals across Tamil Nadu.",
    pages: [
      {
        title: "Unlimited Fibre Broadband Plans",
        href: "/broadband-services",
        description:
          "SASH Broadband FTTH home internet plans up to 1 Gbps with unlimited data, zero setup fee, and price lock guarantee.",
        keywords: [
          "Fibre Broadband Tamil Nadu",
          "Thiruvallur Broadband",
          "1 Gbps FTTH",
          "Free ONT Router",
          "Unlimited Internet",
        ],
        isPrimary: true,
      },
      {
        title: "Personal Pack (50 Mbps)",
        href: "/#plans",
        description:
          "Ideal for solo browsing, online classes, and daily video calling with symmetrical download/upload speeds.",
        keywords: ["50 Mbps Plan", "Budget Broadband", "Student Internet"],
      },
      {
        title: "Family Pack (100 Mbps)",
        href: "/#plans",
        description:
          "Engineered for multi-device households streaming simultaneous 4K content, smart TVs, and console gaming.",
        keywords: ["100 Mbps Plan", "Family Broadband", "4K Streaming"],
      },
      {
        title: "Ultra Gigabit Packs (200 Mbps - 1 Gbps)",
        href: "/#plans",
        description:
          "Extreme throughput for tech enthusiasts, content creators, and large smart villas with zero mid-day congestion.",
        keywords: ["1 Gbps Fibre", "Low Ping Gaming", "Gigabit Internet"],
      },
    ],
  },
  {
    id: "enterprise-connectivity",
    category: "Enterprise Leased Line & SME Internet",
    badge: "Enterprise",
    icon: FiServer,
    description:
      "Mission-critical connectivity backed by strict SLAs, 1:1 uncontended bandwidth, and dedicated 24/7 technical escalation.",
    pages: [
      {
        title: "Dedicated Internet Leased Line (ILL)",
        href: "/lease-line",
        description:
          "1:1 symmetrical uncontended bandwidth, 99.9% uptime SLA, static IPv4/IPv6 routing, and proactive NOC monitoring.",
        keywords: [
          "Internet Leased Line Tamil Nadu",
          "1:1 Symmetrical Bandwidth",
          "99.9% SLA",
          "Static IP Block",
          "Corporate Internet",
        ],
        isPrimary: true,
      },
      {
        title: "SME Business Broadband",
        href: "/sme-internet",
        description:
          "High-uptime broadband designed for commercial clinics, retail chains, IT branches, and corporate billing counters.",
        keywords: [
          "SME Internet Tamil Nadu",
          "Commercial Broadband",
          "Office Wi-Fi",
          "ERP Cloud Sync",
        ],
        isPrimary: true,
      },
      {
        title: "Enterprise Optical Ring Topology",
        href: "/about#network",
        description:
          "Redundant fibre ring architecture ensuring seamless failover without transaction interruption or packet drop.",
        keywords: ["Optical Ring Network", "Carrier-Grade Redundancy", "Dual Homing"],
      },
    ],
  },
  {
    id: "infrastructure-security",
    category: "Intranet & Premises Security",
    badge: "Infrastructure",
    icon: FiShare2,
    description:
      "Private multi-site interconnectivity and premise surveillance over isolated optical fibre backbones.",
    pages: [
      {
        title: "Multi-Site Private Optical Intranet",
        href: "/intranet",
        description:
          "Direct point-to-point and point-to-multipoint LAN extension interconnecting corporate headquarters, depots, and factories.",
        keywords: [
          "Multi-Site Intranet",
          "LAN-to-LAN Extension",
          "Private Leased Circuit",
          "Secure Branch Link",
        ],
        isPrimary: true,
      },
      {
        title: "Enterprise HD IP CCTV Surveillance",
        href: "/cctv",
        description:
          "Comprehensive security camera networks with 24/7 remote mobile viewing, high-resolution NVR storage, and fibre backhaul.",
        keywords: [
          "CCTV Installation Tamil Nadu",
          "IP Camera Surveillance",
          "Warehouse Security",
          "24/7 Mobile Live Feed",
        ],
        isPrimary: true,
      },
    ],
  },
  {
    id: "coverage-locations",
    category: "Tamil Nadu Regional Coverage & Nodes",
    badge: "Coverage",
    icon: FiMapPin,
    description:
      "Licensed Class-B ISP network footprint with localized optical nodes across key districts and industrial hubs.",
    pages: [
      {
        title: "Thiruvallur Headquarters & Metro Nodes",
        href: "/contact#locations",
        description:
          "Primary optical distribution node serving Jaya Nagar, Kakalur SIDCO, and greater Thiruvallur urban belt.",
        keywords: ["Thiruvallur Fibre", "Kakalur Industrial Area", "Local NOC"],
      },
      {
        title: "Ambattur & Avadi Industrial Corridors",
        href: "/contact#locations",
        description:
          "High-capacity enterprise lines serving manufacturing plants, engineering workshops, and logistics hubs.",
        keywords: ["Ambattur Leased Line", "Avadi Broadband", "Industrial Internet"],
      },
      {
        title: "Poonamallee & Sriperumbudur Belts",
        href: "/contact#locations",
        description:
          "Dedicated optical circuits for automobile giants, electronics assemblers, and SEZ manufacturing facilities.",
        keywords: ["Sriperumbudur Leased Line", "Poonamallee Internet", "SEZ Connectivity"],
      },
      {
        title: "Gummidipoondi & North Chennai Outer Nodes",
        href: "/contact#locations",
        description:
          "Extensive optical reach covering industrial corridors and commercial supply chain facilities.",
        keywords: ["Gummidipoondi Fibre", "North Chennai ISP", "Warehouse Network"],
      },
    ],
  },
  {
    id: "company-support",
    category: "Company, Support & Helpdesk",
    badge: "Company",
    icon: FiInfo,
    description:
      "Corporate background, licensed Class-B ISP credentials, direct helplines, and local technical assistance.",
    pages: [
      {
        title: "About SASH Broadband Private Limited",
        href: "/about",
        description:
          "Learn about our mission, dynamic telecom engineering team, and Department of Telecommunications (DoT) license in Tamil Nadu.",
        keywords: ["Class-B ISP", "DoT Licensee", "About SASH Broadband", "Network Engineers"],
        isPrimary: true,
      },
      {
        title: "Contact Us & Regional Helpdesk",
        href: "/contact",
        description:
          "Speak with local engineers, raise feasibility queries, or visit our headquarters at Jaya Nagar, Thiruvallur.",
        keywords: ["Broadband Helpline", "Thiruvallur Office", "Customer Support", "Feasibility Check"],
        isPrimary: true,
      },
      {
        title: "Enterprise 24/7 Priority Support",
        href: "tel:+919003009353",
        description:
          "Direct enterprise NOC escalation line for commercial leased line and SME broadband subscribers (+91 90030 09353).",
        keywords: ["24/7 NOC", "Emergency Helpline", "Enterprise Assistance"],
        isExternal: true,
      },
      {
        title: "WhatsApp Instant Feasibility Desk",
        href: "https://wa.me/919003009353?text=Hello%20SASH%20Broadband%2C%20I%20would%20like%20to%20enquire%20about%20a%20fibre%20internet%20connection.",
        description:
          "Message our technical dispatch team on WhatsApp for immediate address and pincode feasibility verification.",
        keywords: ["WhatsApp Support", "Instant Pincode Check", "Chat with SASH"],
        isExternal: true,
      },
    ],
  },
  {
    id: "legal-compliance",
    category: "Legal, Compliance & Machine-Readable Feeds",
    badge: "Governance",
    icon: FiShield,
    description:
      "Subscriber privacy protections, contractual terms of service, and official search engine indexing endpoints.",
    pages: [
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
        description:
          "Subscriber data handling protocols, encryption measures, and customer privacy rights under Indian law.",
        keywords: ["Privacy Policy", "Data Protection", "Customer Information"],
        isPrimary: true,
      },
      {
        title: "Terms of Service & SLA Conditions",
        href: "/terms-of-service",
        description:
          "Fair usage policies, uptime SLA commitments, billing intervals, and service level regulations.",
        keywords: ["Terms of Service", "SLA Agreement", "Fair Usage Policy"],
        isPrimary: true,
      },
      {
        title: "XML Sitemap Feed (sitemap.xml)",
        href: "/sitemap.xml",
        description:
          "Official machine-readable XML feed consumed by Googlebot, Bingbot, and search engine crawlers.",
        keywords: ["XML Sitemap", "Googlebot Feed", "Search Engine Index"],
        isExternal: true,
      },
      {
        title: "Robots Directive (robots.txt)",
        href: "/robots.txt",
        description:
          "Robots exclusion standard file defining crawler permissions and sitemap discovery pointers.",
        keywords: ["Robots.txt", "Crawler Directives", "Search Engine Protocol"],
        isExternal: true,
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapBreadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapCollectionJsonLd) }}
      />

      {/* Hero Header Section */}
      <section className="bg-brand-navy text-white pt-24 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(222,3,2,0.18)_0%,rgba(1,13,59,0)_70%)] blur-3xl"
        />

        <div className="container-sash max-w-5xl relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/75 mb-6">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/40">/</li>
              <li className="text-white font-medium">Sitemap</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Index &amp; SEO Architecture
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] mb-4">
            Sitemap &amp; SEO Directory
          </h1>

          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-normal">
            A comprehensive, structured architectural index of all public web pages, residential FTTH broadband packages, enterprise leased line solutions, optical intranet backbones, and regional Tamil Nadu coverage nodes provided by SASH Broadband Private Limited.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-white/15">
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <span className="text-xl sm:text-2xl font-semibold text-white block">
                10+
              </span>
              <span className="text-xs text-white/70">Indexable Pages</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <span className="text-xl sm:text-2xl font-semibold text-brand-red block">
                1 Gbps
              </span>
              <span className="text-xs text-white/70">Peak Optical Speed</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <span className="text-xl sm:text-2xl font-semibold text-white block">
                99.9%
              </span>
              <span className="text-xs text-white/70">Enterprise SLA</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <span className="text-xl sm:text-2xl font-semibold text-white block">
                Class–B
              </span>
              <span className="text-xs text-white/70">Licensed DoT ISP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Body */}
      <section className="bg-white text-brand-navy py-14 sm:py-20">
        <div className="container-sash max-w-5xl">
          {/* Quick Category Jump Navigation */}
          <div className="mb-12">
            <h2 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-3">
              Quick Directory Navigation
            </h2>
            <div className="flex flex-wrap gap-2">
              {DIRECTORY_SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-red-10 hover:text-brand-red text-brand-navy text-xs font-medium transition-colors border border-border/70"
                >
                  <sec.icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{sec.category}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Directory Sections */}
          <div className="space-y-12 sm:space-y-16">
            {DIRECTORY_SECTIONS.map((section, secIdx) => {
              const SectionIcon = section.icon;

              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 pt-6 border-t border-border/80 first:border-t-0 first:pt-0"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center shrink-0 shadow-xs">
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-brand-red uppercase tracking-wider">
                            Section 0{secIdx + 1}
                          </span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-[11px] font-medium text-neutral-600">
                            {section.badge}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-brand-navy tracking-tight">
                          {section.category}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 max-w-3xl">
                    {section.description}
                  </p>

                  {/* Section Grid Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {section.pages.map((page, pageIdx) => (
                      <div
                        key={pageIdx}
                        className={`rounded-xl border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between ${
                          page.isPrimary
                            ? "bg-white border-brand-navy/15 shadow-xs hover:border-brand-red/40 hover:shadow-md"
                            : "bg-neutral-100/60 border-border/80 hover:bg-white hover:border-brand-navy/20"
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Link
                              href={page.href}
                              target={page.isExternal ? "_blank" : undefined}
                              rel={page.isExternal ? "noopener noreferrer" : undefined}
                              className="group inline-flex items-center gap-1.5 text-base sm:text-[17px] font-semibold text-brand-navy hover:text-brand-red transition-colors"
                            >
                              <span>{page.title}</span>
                              {page.isExternal ? (
                                <FiExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-brand-red transition-colors shrink-0" />
                              ) : (
                                <FiArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0" />
                              )}
                            </Link>

                            {page.isPrimary && (
                              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-brand-red bg-red-10 px-2 py-0.5 rounded-md border border-brand-red/15 shrink-0">
                                <FiCheckCircle className="w-2.5 h-2.5" />
                                Primary Page
                              </span>
                            )}
                          </div>

                          <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-4">
                            {page.description}
                          </p>
                        </div>

                        {/* Keyword & Target Tags */}
                        <div className="pt-3 border-t border-border/60">
                          <span className="text-[10px] font-semibold uppercase text-neutral-600 block mb-1.5">
                            Target Topics &amp; Search Queries:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {page.keywords.map((kw, kwIdx) => (
                              <span
                                key={kwIdx}
                                className="inline-block px-2 py-0.5 rounded-sm bg-white border border-border text-[11px] text-brand-navy font-normal"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Feeds & Crawlers Notice */}
          <div className="mt-14 sm:mt-20 p-6 sm:p-8 rounded-2xl bg-neutral-100 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red uppercase tracking-wider mb-1">
                <FiFileText className="w-3.5 h-3.5" />
                For Search Engines &amp; Bots
              </span>
              <h4 className="text-lg sm:text-xl font-semibold text-brand-navy">
                Looking for machine-readable endpoints?
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-xl">
                We maintain active XML sitemaps and crawler directive files adhering to the Sitemaps.org protocol and Google Search Console standards.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-navy text-white text-xs font-semibold hover:bg-navy-80 transition-colors shadow-xs"
              >
                <span>View sitemap.xml</span>
                <FiExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/robots.txt"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-border text-brand-navy text-xs font-semibold hover:border-brand-navy/30 transition-colors"
              >
                <span>View robots.txt</span>
                <FiExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Direct CTA Box */}
          <div className="mt-10 p-8 sm:p-10 rounded-2xl bg-brand-navy text-white relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(222,3,2,0.3)_0%,transparent_70%)] blur-2xl"
            />
            <div className="relative z-10 max-w-xl">
              <h4 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Need enterprise connectivity or home fibre in Tamil Nadu?
              </h4>
              <p className="text-white/80 text-sm mt-2 leading-relaxed font-normal">
                Speak directly with our local engineers in Thiruvallur for immediate feasibility checks, leased line quotes, or same-day broadband installations.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-brand-red text-white text-sm font-semibold hover:bg-brand-red-hover transition-colors shadow-md"
              >
                <span>Contact Engineering</span>
              </Link>
              <a
                href="https://wa.me/919003009353?text=Hello%20SASH%20Broadband%2C%20I%20would%20like%20to%20enquire%20about%20a%20fibre%20internet%20connection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-colors"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
