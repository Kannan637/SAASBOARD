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
    points: [
      "Full 1080p, 2K, and 4K ultra-high definition optics",
      "IP67 weatherproof casing built for extreme sun & rain",
      "Smart IR and Full-Color night vision up to 30 meters",
      "Wide-angle panoramic field of view with zero distortion",
    ],
  },
  {
    title: "NVR Storage & Cloud Backup",
    tag: "24/7 Recording",
    description:
      "Multi-week continuous and motion-triggered recording on high-reliability Network Video Recorders (NVRs).",
    points: [
      "High-reliability surveillance-grade WD Purple / SkyHawk drives",
      "Continuous 24/7 recording and smart motion-detection triggers",
      "15 to 60+ days of historical video storage before FIFO loop",
      "H.265+ high-efficiency compression saves 50% storage space",
    ],
  },
  {
    title: "Live Smartphone Monitoring",
    tag: "iOS & Android",
    description:
      "Paired with your SASH Broadband fibre line for smooth, zero-lag live viewing on Android and iOS devices from anywhere.",
    points: [
      "Secure iOS and Android smartphone viewing application",
      "Zero-lag live video streaming paired with SASH fibre",
      "Instant motion alert push notifications to your mobile",
      "Remote playback and video clipping directly to phone gallery",
    ],
  },
  {
    title: "Clean Cabling & Local AMC Support",
    tag: "PoE & Maintenance",
    description:
      "Neat conduit routing, PoE switch setup, and ongoing maintenance by our Thiruvallur technical team.",
    points: [
      "Structured concealed PVC conduit and Cat6 cabling runs",
      "Power over Ethernet (PoE) setup eliminating power adapters",
      "Annual Maintenance Contracts (AMC) with periodic lens audits",
      "Local Thiruvallur field engineers on call for rapid fixes",
    ],
  },
];

const CCTV_FAQS = [
  {
    question: "Can I monitor CCTV camera feeds live on my smartphone?",
    answer:
      "Yes. Our engineers configure secure mobile viewing applications on your Android and iOS devices, enabling crystal-clear live streaming, remote pan/zoom (PTZ), and playback from anywhere in the world.",
  },
  {
    question: "Do the cameras capture clear footage at night and in rainy weather?",
    answer:
      "Yes. We deploy IP67 weatherproof outdoor bullet and dome cameras equipped with infrared (IR) night vision and smart LEDs that capture high-definition color video even in total darkness or heavy monsoon rain.",
  },
  {
    question: "How many days of video recordings are stored?",
    answer:
      "Depending on surveillance hard drive capacity and camera count, our Network Video Recorders (NVR) store 15 to 60+ days of continuous or motion-triggered HD video footage with automatic FIFO cycling.",
  },
  {
    question: "Is installation and neat cabling included?",
    answer:
      "Yes. We deliver complete turnkey surveillance installations including rigid PVC conduit piping, Cat6 network drops, PoE power switches, camera angle calibration, and NVR configuration.",
  },
  {
    question: "Do you offer Annual Maintenance Contracts (AMC) for existing setups?",
    answer:
      "Yes. We provide flexible AMC packages covering regular lens cleaning, camera health audits, firmware security patches, and rapid on-site troubleshooting across Thiruvallur and Tamil Nadu.",
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

      <Testimonial />

      <Faq
        items={CCTV_FAQS}
        eyebrow="CCTV FAQs"
        heading="Smart CCTV Security Questions"
        description="Everything you need to know about IP camera hardware, night-vision clarity, smartphone app setup, and NVR storage."
      />

      <Contactus
        defaultInterest="CCTV"
        defaultPlan="HD IP CCTV Surveillance"
      />
    </>
  );
}

