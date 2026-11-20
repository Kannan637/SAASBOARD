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
    points: [
      "Direct Layer-2 optical interconnect between facilities",
      "Zero exposure to the public internet or external gateways",
      "Hub-and-spoke and mesh topologies across Tamil Nadu",
      "Connects factories, warehouses, headquarters & branches",
    ],
  },
  {
    title: "Isolated VLAN & Security",
    tag: "Layer-2 / Layer-3",
    description:
      "Dedicated Layer-2 / Layer-3 network segmentation keeps sensitive ERP, billing, and patient records isolated and protected.",
    points: [
      "Dedicated hardware-level VLAN isolation and encryption",
      "Guaranteed security for sensitive medical and financial data",
      "Complete immunity to public DDoS attacks and internet spoofing",
      "Full compliance with enterprise security and audit standards",
    ],
  },
  {
    title: "High-Speed Local File & Voice Sharing",
    tag: "Sub-ms Latency",
    description:
      "Run IP PBXs, shared NAS storage, and centralised CCTV feeds across multiple locations with sub-millisecond local latency.",
    points: [
      "Sub-millisecond optical latency between connected sites",
      "Centralized NAS storage access feels like local office LAN",
      "High-definition VoIP and inter-office intercom extensions",
      "Zero buffering for heavy CAD files and multi-site database sync",
    ],
  },
  {
    title: "Managed by Local Network Engineers",
    tag: "24/7 NOC Monitoring",
    description:
      "Proactive link monitoring and rapid field support from our Thiruvallur network operations desk.",
    points: [
      "Continuous 24/7/365 proactive NOC circuit monitoring",
      "Real-time latency, packet integrity, and link status telemetry",
      "Rapid optical restoration by Thiruvallur emergency teams",
      "Single accountability point for end-to-end network health",
    ],
  },
];

const INTRANET_FAQS = [
  {
    question: "What is a private optical intranet connection?",
    answer:
      "A private optical intranet (Layer-2 / Layer-3 point-to-point or multipoint link) securely connects your separate offices, factories, hospitals, and warehouses over a dedicated optical fiber circuit without traversing the public internet.",
  },
  {
    question: "How secure is data transmission between our branch offices?",
    answer:
      "Because your traffic travels strictly across dedicated optical wavelengths and private VLAN tunnels, sensitive financial records, ERP transactions, and patient databases are 100% isolated from public internet exposure and DDoS vectors.",
  },
  {
    question: "What is the typical latency between connected branch locations?",
    answer:
      "Our direct optical metro routing achieves sub-millisecond local latency. Centralized ERP access, VoIP calls, and large CAD/CAM file transfers operate seamlessly as if all offices were connected to the same physical room LAN.",
  },
  {
    question: "Can we connect multiple branch offices back to our central headquarters?",
    answer:
      "Yes. We support hub-and-spoke and full-mesh topologies connecting multiple branch sites, retail outlets, or manufacturing plants back to your central datacenter or head office.",
  },
  {
    question: "How is the private intranet link monitored and serviced?",
    answer:
      "Our 24/7 Network Operations Center (NOC) proactively monitors link health, optical signal loss, and latency metrics. In the rare event of an optical fiber cut, local Thiruvallur field splicers are immediately dispatched.",
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
        backgroundImageSrc="/Hero/intranet-bg.jpg"
        imageSrc="/Hero/intranet.png"
        imageAlt="SASH Private Multi-Site Intranet infrastructure"
        imageWidth={1840}
        imageHeight={1842}
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

      <Faq
        items={INTRANET_FAQS}
        eyebrow="Intranet FAQs"
        heading="Private Intranet Network Questions"
        description="Clear answers about Layer-2 optical interconnects, VLAN isolation, sub-millisecond branch latency, and NOC maintenance."
      />

      <Contactus
        defaultInterest="Intranet"
        defaultPlan="Private Multi-Site Intranet"
      />
    </>
  );
}

