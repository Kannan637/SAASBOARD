import type { Metadata } from "next";
import Contactus from "@/components/Home/Contactus";
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
  },
  {
    title: "Static IP Pool Included",
    tag: "IPv4 / IPv6",
    description:
      "Host on-premise servers, VPN gateways, cloud ERPs, and remote branches with dedicated public IPv4/IPv6 addressing.",
  },
  {
    title: "Proactive SLA & Fast MTTR",
    tag: "99.5%+ Uptime SLA",
    description:
      "Backed by an enterprise Service Level Agreement and local Thiruvallur field engineers for rapid fault restoration.",
  },
  {
    title: "Scalable up to 1 Gbps+",
    tag: "Enterprise Scale",
    description:
      "Upgrade your committed information rate (CIR) seamlessly as your factory, campus, or corporate office expands.",
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
        description="That's the Enterprise advantage — uncontended symmetrical fibre with SLA-backed uptime and static IP routing."
        ctaText="Get Leased Line Quote"
        ctaHref="#contact"
        secondaryCtaText="Check Feasibility"
        secondaryCtaHref="#contact"
        iconSrc="/Service/Leased Line.webp"
        iconAlt="SASH 1:1 Dedicated Internet Leased Line icon"
      />

      {/* Single-Row Client Logo Marquee */}
      <SingleClientMarquee />

      <ServiceDeliverablesSection
        eyebrow="Enterprise SLA Architecture"
        heading="Why organisations choose SASH Leased Lines"
        subtitle="Engineered for factories, IT parks, hospitals, schools, and multi-branch enterprises."
        items={SLA_HIGHLIGHTS}
      />

      <Contactus
        defaultInterest="Leased line"
        defaultPlan="1:1 Dedicated Internet Leased Line"
      />
    </>
  );
}

