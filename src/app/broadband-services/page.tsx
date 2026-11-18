import type { Metadata } from "next";
import Link from "next/link";
import Pricing from "@/components/Home/Pricing";
import Faq from "@/components/Home/Faq";
import Contactus from "@/components/Home/Contactus";
import {
  ServiceDeliverablesSection,
  ServiceHero,
  SingleClientMarquee,
  type ServiceDeliverableItem,
} from "@/components/Service/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Unlimited Fibre Broadband Plans in Tamil Nadu",
  description:
    "Compare SASH Broadband FTTH home internet plans starting at ₹650/month. Speeds up to 1 Gbps, unlimited data, free installation, and price lock in Tamil Nadu.",
  alternates: {
    canonical: "/broadband-services",
    languages: { "en-IN": "/broadband-services" },
  },
};

const INSTALLATION_STEPS: ServiceDeliverableItem[] = [
  {
    title: "Address Feasibility Check",
    tag: "Step 01",
    description:
      "Share your street address or pincode in Thiruvallur or Tamil Nadu via our enquiry form or WhatsApp.",
  },
  {
    title: "Select Your Fibre Plan",
    tag: "Step 02",
    description:
      "Choose between our Personal Pack (50 Mbps), Family Pack (100 Mbps), or custom high-speed tiers up to 1 Gbps.",
  },
  {
    title: "Free Fibre Drop & Router Setup",
    tag: "Step 03",
    description:
      "Our local technicians run an optical fibre cable to your home and configure your Wi-Fi router at zero setup cost.",
  },
  {
    title: "Instant Activation & Speed Test",
    tag: "Step 04",
    description:
      "We verify signal strength and speed across your devices before handing over your active connection.",
  },
];

export default function BroadbandServicesPage() {
  return (
    <>
      {/* Dedicated Service Hero: Left Content + Right Icon Showcase */}
      <ServiceHero
        breadcrumbLabel="Broadband Services"
        eyebrow="TAMIL NADU'S FTTH FIBRE NETWORK"
        titlePrefix="Faster speeds."
        titleHighlight="Just for you."
        description="That's the SASH Fibre Broadband advantage — unlimited data, free installation, and speeds up to 1 Gbps across Thiruvallur & Tamil Nadu."
        ctaText="Upgrade at ₹650"
        ctaHref="#contact"
        secondaryCtaText="View Plans"
        secondaryCtaHref="#plans"
        iconSrc="/Service/BroadBand.webp"
        iconAlt="SASH Fibre Broadband service icon"
      />

      {/* Single-Row Client Logo Marquee */}
      <SingleClientMarquee />

      {/* Plans & Pricing */}
      <Pricing />

      {/* 4-Step Installation Process */}
      <ServiceDeliverablesSection
        eyebrow="Simple Onboarding"
        heading="How our 4-step free installation works"
        subtitle="Fast, clean optical fibre installation by our local Tiruvallur engineering team."
        items={INSTALLATION_STEPS}
      />

      {/* OTT and IPTV Anchor Section */}
      <section
        id="ott-iptv"
        data-apple-manual="true"
        className="bg-white pb-16 md:pb-24"
      >
        <div className="container-sash">
          <div className="rounded-2xl bg-brand-navy text-white border border-brand-navy/15 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0px_2px_3px_0px_rgba(5,5,6,0.05)]">
            <div className="max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-semibold uppercase tracking-wider mb-2.5">
                OTT &amp; IPTV Ready
              </span>
              <h3 className="text-white !text-lg sm:!text-xl font-semibold mb-1.5 tracking-normal">
                Ready for 4K Smart TVs, OTT Apps, and Digital IPTV
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                Our low-latency optical network supports high-bitrate 4K
                streaming and IPTV set-top boxes without frame drops. Ask our
                team about available entertainment bundles in your area.
              </p>
            </div>
            <Link href="#contact" className="btn-pill btn-primary-red shrink-0 rounded-lg font-medium">
              Enquire about OTT &amp; IPTV
            </Link>
          </div>
        </div>
      </section>

      <Faq />
      <Contactus defaultInterest="Home broadband" />
    </>
  );
}

