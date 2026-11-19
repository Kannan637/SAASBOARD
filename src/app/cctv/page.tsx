import type { Metadata } from "next";
import Contactus from "@/components/Home/Contactus";
import {
  ServiceDeliverablesSection,
  ServiceHero,
  SingleClientMarquee,
  type ServiceDeliverableItem,
} from "@/components/Service/ServicePageTemplate";

export const metadata: Metadata = {
  title: "CCTV Installation & Surveillance in Tamil Nadu",
  description:
    "Professional HD IP CCTV camera installation and remote mobile monitoring for homes, apartments, shops & warehouses in Thiruvallur and Tamil Nadu.",
  alternates: {
    canonical: "/cctv",
    languages: { "en-IN": "/cctv" },
  },
};

const CAMERA_SOLUTIONS: ServiceDeliverableItem[] = [
  {
    title: "Indoor & Outdoor HD IP Cameras",
    tag: "IP67 Weatherproof",
    description:
      "Weatherproof (IP67) bullet and dome cameras with infrared night vision for clear 24-hour perimeter security.",
  },
  {
    title: "NVR Storage & Cloud Backup",
    tag: "24/7 Recording",
    description:
      "Multi-week continuous and motion-triggered recording on high-reliability Network Video Recorders (NVRs).",
  },
  {
    title: "Live Smartphone Monitoring",
    tag: "iOS & Android",
    description:
      "Paired with your SASH Broadband fibre line for smooth, zero-lag live viewing on Android and iOS devices from anywhere.",
  },
  {
    title: "Clean Cabling & Local AMC Support",
    tag: "PoE & Maintenance",
    description:
      "Neat conduit routing, PoE switch setup, and ongoing maintenance by our Thiruvallur technical team.",
  },
];

export default function CctvPage() {
  return (
    <>
      <ServiceHero
        breadcrumbLabel="CCTV Surveillance"
        eyebrow="SMART PREMISES SURVEILLANCE"
        titlePrefix="24/7 Smart"
        titleHighlight="CCTV Security."
        description="That's the SASH Surveillance advantage — live HD mobile viewing and end-to-end IP camera installation."
        ctaText="Book Free Site Survey"
        ctaHref="#contact"
        secondaryCtaText="Talk to Engineer"
        secondaryCtaHref="#contact"
        imageSrc="/Hero/cctv.png"
        imageAlt="24/7 Smart HD IP CCTV premises surveillance monitoring"
        pattern="stripes"
      />

      {/* Single-Row Client Logo Marquee */}
      <SingleClientMarquee />

      <ServiceDeliverablesSection
        eyebrow="What We Deliver"
        heading="End-to-end CCTV hardware, cabling, and network setup"
        subtitle="Turnkey surveillance installations engineered and maintained by our local team."
        items={CAMERA_SOLUTIONS}
      />

      <Contactus
        defaultInterest="CCTV"
        defaultPlan="HD IP CCTV Surveillance"
      />
    </>
  );
}

