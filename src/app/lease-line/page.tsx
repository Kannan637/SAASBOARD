import type { Metadata } from "next";
import Contactus from "@/components/Home/Contactus";
import Testimonial from "@/components/Home/Testimonial";
import Faq from "@/components/Home/Faq";
import {
  ServiceDeliverablesSection,
  ServiceHero,
  SingleClientMarquee,
  type ServiceDeliverableItem,
} from "@/components/Service/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Dedicated Internet Leased Line in Tamil Nadu",
  description:
    "1:1 symmetrical Internet Leased Line (ILL) connectivity in Thiruvallur and Tamil Nadu. SLA-backed uptime, static IP routing & 24/7 enterprise NOC support.",
  alternates: {
    canonical: "/lease-line",
    languages: { "en-IN": "/lease-line" },
  },
};

const SLA_HIGHLIGHTS: ServiceDeliverableItem[] = [
  {
    title: "1:1 Uncontended Bandwidth",
    tag: "Symmetrical Speed",
    description:
      "Dedicated fibre circuit with zero bandwidth sharing—your subscribed upload and download speeds remain identical 24/7.",
    points: [
      "Pure 1:1 symmetrical Committed Information Rate (CIR)",
      "Zero bandwidth sharing with residential or neighborhood traffic",
      "Equal upload and download speeds 24 hours a day",
      "Engineered for high-volume enterprise cloud data and ERP",
    ],
  },
  {
    title: "Static IP Pool Included",
    tag: "IPv4 / IPv6",
    description:
      "Host on-premise servers, VPN gateways, cloud ERPs, and remote branches with dedicated public IPv4/IPv6 addressing.",
    points: [
      "Dedicated usable public IPv4 and IPv6 subnet assignment",
      "Clean reverse DNS (PTR) setup for enterprise mail servers",
      "Secure multi-site IPsec and SSL VPN tunnel endpoints",
      "Direct DMZ hosting for on-premises ERP, SAP, and databases",
    ],
  },
  {
    title: "Proactive SLA & Fast MTTR",
    tag: "99.5%+ Uptime SLA",
    description:
      "Backed by an enterprise Service Level Agreement and local Thiruvallur field engineers for rapid fault restoration.",
    points: [
      "Financially-backed 99.5%+ uptime Service Level Agreement",
      "24/7 proactive optical link health & loss monitoring",
      "Committed 2-to-4 hour Mean Time to Repair (MTTR)",
      "Local Thiruvallur network operations field dispatch",
    ],
  },
  {
    title: "Scalable up to 1 Gbps+",
    tag: "Enterprise Scale",
    description:
      "Upgrade your committed information rate (CIR) seamlessly as your factory, campus, or corporate office expands.",
    points: [
      "Instant software-defined bandwidth upgrades on demand",
      "Scales from 10 Mbps to 1 Gbps+ without recabling",
      "Burstable bandwidth provisions for seasonal workload spikes",
      "Multi-gigabit optical handoff (1G/10G SFP+ optical ports)",
    ],
  },
];

const LEASED_LINE_FAQS = [
  {
    question: "What is the difference between Broadband and a 1:1 Leased Line?",
    answer:
      "Unlike shared broadband where bandwidth is pooled among neighborhood subscribers, an Internet Leased Line (ILL) provides a private, 1:1 symmetrical circuit with guaranteed uncontended bandwidth, equal upload and download speeds, and zero throttling during peak hours.",
  },
  {
    question: "What SLA uptime and MTTR do you guarantee?",
    answer:
      "We provide an enterprise Service Level Agreement (SLA) guaranteeing 99.5%+ uptime, low packet jitter, and sub-millisecond local latency. SASH field network engineers stationed in Thiruvallur ensure a rapid 2-to-4 hour Mean Time to Repair (MTTR).",
  },
  {
    question: "Are static public IP addresses included?",
    answer:
      "Yes. All SASH Leased Line subscriptions include a usable pool of public IPv4 and IPv6 addresses for hosting internal web servers, ERP applications, VPN concentrators, and secure branch connectivity.",
  },
  {
    question: "What bandwidth speeds can we subscribe to?",
    answer:
      "Enterprise bandwidth ranges from 10 Mbps up to 1 Gbps+ on committed information rates (CIR). You can upgrade your throughput seamlessly via our NOC without replacing the on-premise physical optical drop.",
  },
  {
    question: "How long does feasibility verification and optical installation take?",
    answer:
      "Our optical survey team verifies physical route feasibility within 24 to 48 hours in Thiruvallur and surrounding industrial zones. Standard enterprise optical commissioning is completed within 3 to 7 business days.",
  },
];

export default function LeasedLinePage() {
  return (
    <>
      <ServiceHero
        breadcrumbLabel="Leased Line"
        eyebrow="DEDICATED ENTERPRISE CONNECTIVITY"
        titlePrefix="1:1 Dedicated"
        titleHighlight="Leased Lines."
        description="That's the Enterprise advantage — uncontended symmetrical fibre with SLA-backed 99.99% uptime and static IP routing."
        ctaText="Get Leased Line Quote"
        ctaHref="#contact"
        secondaryCtaText="Check Feasibility"
        secondaryCtaHref="#contact"
        backgroundImageSrc="/Hero/leased-line-bg.jpg"
        imageSrc="/Hero/1to1.png"
        imageAlt="1:1 Enterprise Dedicated Optical Leased Line infrastructure"
      />

      {/* Single-Row Client Logo Marquee */}
      <SingleClientMarquee />

      <ServiceDeliverablesSection
        eyebrow="Enterprise SLA Architecture"
        heading="Why organisations choose SASH Leased Lines"
        subtitle="Engineered for factories, IT parks, hospitals, schools, and multi-branch enterprises."
        items={SLA_HIGHLIGHTS}
      />

      <Testimonial />

      <Faq
        items={LEASED_LINE_FAQS}
        eyebrow="Leased Line FAQs"
        heading="Dedicated Leased Line Questions"
        description="Everything you need to know about enterprise 1:1 symmetrical circuits, SLA guarantees, and static IP allocation in Tamil Nadu."
      />

      <Contactus
        defaultInterest="Leased line"
        defaultPlan="1:1 Dedicated Internet Leased Line"
      />
    </>
  );
}

