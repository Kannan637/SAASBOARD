import type { Metadata } from "next";
import Contactus from "@/components/Home/Contactus";
import Testimonial from "@/components/Home/Testimonial";
import Faq from "@/components/Home/Faq";
import {
  ServiceHero,
  SingleClientMarquee,
} from "@/components/Service/ServicePageTemplate";
import CctvDeliverablesCards from "@/components/Service/CctvDeliverablesCards";

export const metadata: Metadata = {
  title: "CCTV Installation & Surveillance in Tamil Nadu",
  description:
    "Professional HD IP CCTV camera installation and remote mobile monitoring for homes, apartments, shops & warehouses in Thiruvallur and Tamil Nadu.",
  alternates: {
    canonical: "/cctv",
    languages: { "en-IN": "/cctv" },
  },
};

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

      <CctvDeliverablesCards
        eyebrow="What We Deliver"
        heading="End-to-end CCTV hardware, cabling, and network setup"
        subtitle="Turnkey surveillance installations engineered and maintained by our local team."
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

