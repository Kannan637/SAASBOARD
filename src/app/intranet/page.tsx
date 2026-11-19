import type { Metadata } from "next";
import Contactus from "@/components/Home/Contactus";
import Testimonial from "@/components/Home/Testimonial";
import {
  ServiceDeliverablesSection,
  ServiceHero,
  SingleClientMarquee,
  type ServiceDeliverableItem,
} from "@/components/Service/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Private Intranet & Multi-Branch LAN in Tamil Nadu",
  description:
    "Secure point-to-point fibre intranet and VLAN solutions connecting offices, factories, campuses & warehouses across Thiruvallur and Tamil Nadu.",
  alternates: {
    canonical: "/intranet",
    languages: { "en-IN": "/intranet" },
  },
};

const INTRANET_FEATURES: ServiceDeliverableItem[] = [
  {
    title: "Multi-Branch Point-to-Point Links",
    tag: "Private Optical WAN",
    description:
      "Connect your head office, manufacturing plant, and retail branches over a private optical layer without traversing the public internet.",
  },
  {
    title: "Isolated VLAN & Security",
    tag: "Layer-2 / Layer-3",
    description:
      "Dedicated Layer-2 / Layer-3 network segmentation keeps sensitive ERP, billing, and patient records isolated and protected.",
  },
  {
    title: "High-Speed Local File & Voice Sharing",
    tag: "Sub-ms Latency",
    description:
      "Run IP PBXs, shared NAS storage, and centralised CCTV feeds across multiple locations with sub-millisecond local latency.",
  },
  {
    title: "Managed by Local Network Engineers",
    tag: "24/7 NOC Monitoring",
    description:
      "Proactive link monitoring and rapid field support from our Thiruvallur network operations desk.",
  },
];

export default function IntranetPage() {
  return (
    <>
      <ServiceHero
        breadcrumbLabel="Intranet Solutions"
        eyebrow="MULTI-BRANCH OPTICAL LAN & WAN"
        titlePrefix="Secure Multi-Site"
        titleHighlight="Intranet."
        description="That's the Private Network advantage — secure optical LAN interconnecting offices, warehouses, and campuses."
        ctaText="Request Consultation"
        ctaHref="#contact"
        secondaryCtaText="Check Coverage"
        secondaryCtaHref="#contact"
        imageSrc="/Hero/intranet.png"
        imageAlt="SASH Private Multi-Site Intranet infrastructure"
        imageWidth={1840}
        imageHeight={1842}
        pattern="purple-grid"
      />

      {/* Single-Row Client Logo Marquee */}
      <SingleClientMarquee />

      <ServiceDeliverablesSection
        eyebrow="Private Optical Interconnect"
        heading="Built for secure inter-office communication"
        subtitle="Interconnect offices, warehouses, hospitals, and campuses across Tamil Nadu with zero public-internet exposure."
        items={INTRANET_FEATURES}
      />

      <Testimonial />

      <Contactus
        defaultInterest="Intranet"
        defaultPlan="Private Multi-Site Intranet"
      />
    </>
  );
}

