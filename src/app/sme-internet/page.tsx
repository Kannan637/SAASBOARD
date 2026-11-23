import type { Metadata } from "next";
import Image from "next/image";
import Contactus from "@/components/Home/Contactus";
import Testimonial from "@/components/Home/Testimonial";
import Faq from "@/components/Home/Faq";
import {
  ServiceDeliverablesSection,
  ServiceHero,
  SingleClientMarquee,
  type ServiceDeliverableItem,
} from "@/components/Service/ServicePageTemplate";
import { AppleReveal } from "@/components/ui/apple-scroll";

export const metadata: Metadata = {
  title: "SME Business Internet Plans in Tamil Nadu",
  description:
    "High-uptime SME fibre broadband for offices, retail stores, clinics & warehouses in Thiruvallur and Tamil Nadu. Free setup, unlimited data & priority support.",
  alternates: {
    canonical: "/sme-internet",
    languages: { "en-IN": "/sme-internet" },
  },
};

const SME_CAPABILITIES: ServiceDeliverableItem[] = [
  {
    title: "Business Traffic Priority Routing",
    tag: "Low Latency",
    imageSrc: "/Cards/Business Traffic priority Routing.png",
    description:
      "Optimised optical routing ensures uninterrupted POS billing, cloud ERP sync, and crystal-clear multi-seat video conferencing.",
    points: [
      "Commercial QoS priority queues over residential traffic",
      "Low packet jitter optimized for Teams, Zoom & VoIP calls",
      "Direct Tier-1 BGP transit to major SaaS and cloud providers",
      "Dedicated enterprise-grade Optical Network Terminal (ONT)",
    ],
  },
  {
    title: "Unlimited Price Lock Protection",
    tag: "Fixed Tariff",
    imageSrc: "/Cards/Unlimited price look Protection.png",
    description:
      "Shield your monthly IT budget with our Corporate Pack unlimited price lock starting at ₹1,499/month with GST billing.",
    points: [
      "No monthly data consumption caps or bandwidth ceilings",
      "Zero Fair Usage Policy (FUP) post-data speed reductions",
      "Smooth continuous cloud sync, POS billing, and ERP operations",
      "Transparent flat-rate monthly billing with price lock",
    ],
  },
  {
    title: "24/7 Commercial Field Dispatch",
    tag: "Priority Support",
    imageSrc: "/Cards/24 7 commerical Field Dispatch.png",
    description:
      "Dedicated commercial desk and local field splicers in Thiruvallur District for faster mean time to repair.",
    points: [
      "Direct telephone desk line to local commercial technicians",
      "Priority field engineer dispatch stationed in Thiruvallur",
      "Proactive link alerts before staff notices downtime",
      "Quarterly optical signal health and connector checkups",
    ],
  },
  {
    title: "Static IP & NVR Port Forwarding",
    tag: "Ready for CCTV/VPN",
    imageSrc: "/Cards/Static IP & NVR port Forwading.png",
    description:
      "Pre-configured support for remote CCTV monitoring, branch VPN tunnels, and hosted accounting servers.",
    points: [
      "Static public IP option for POS, Tally, and ERP remote access",
      "Port forwarding configured for multi-channel NVR/CCTV feeds",
      "Seamless biometric attendance sync across branch locations",
      "Pre-configured hardware firewall and port security",
    ],
  },
];

const SME_FAQS = [
  {
    question: "How is SME Business Internet different from residential broadband?",
    answer:
      "SME Business Internet delivers business-traffic priority routing over optical gateways, enterprise-grade optical network terminals (ONT), optional static IP addressing for POS and biometric machines, and rapid commercial field dispatch.",
  },
  {
    question: "Can we get static IPs for office biometric systems and CCTV?",
    answer:
      "Yes. Dedicated public static IPs are available on SASH SME plans, enabling seamless port forwarding for CCTV NVRs, remote desktop access, biometric attendance systems, and on-premises tally or accounting servers.",
  },
  {
    question: "Is data truly unlimited for multi-user offices?",
    answer:
      "Yes. Every SME plan features unlimited data bandwidth without any Fair Usage Policy (FUP) throttling or speed caps, ensuring your team can conduct Zoom calls, upload heavy files, and access cloud apps without interruption.",
  },
  {
    question: "What is the commercial installation timeframe?",
    answer:
      "Most commercial sites in Thiruvallur, commercial hubs, and nearby industrial pockets are connected within 24 to 48 hours following document verification and optical drop provisioning.",
  },
  {
    question: "Do you offer priority support during business operating hours?",
    answer:
      "Yes. SASH SME accounts receive commercial SLA dispatch with dedicated local support engineers stationed in Thiruvallur for immediate resolution of link or hardware queries.",
  },
];

export default function SmeInternetPage() {
  return (
    <>
      <ServiceHero
        breadcrumbLabel="SME Internet"
        eyebrow="SME BUSINESS BROADBAND"
        titlePrefix="Built for growing"
        titleHighlight="businesses."
        description="That's the SME Internet advantage — priority routing, symmetrical bandwidth, and price lock for offices & retail."
        ctaText="Explore SME Plans"
        ctaHref="#contact"
        secondaryCtaText="Request Callback"
        secondaryCtaHref="#contact"
        imageSrc="/Hero/Business.png"
        imageAlt="High-speed SME business optical fibre internet setup"
        pattern="glass"
      />

      {/* Single-Row Client Logo Marquee */}
      <SingleClientMarquee />

      <ServiceDeliverablesSection
        eyebrow="Built for Productivity"
        heading="Commercial connectivity engineered for SMEs"
        items={SME_CAPABILITIES}
      />

      <section
        id="sme-comparison"
        data-apple-manual="true"
        aria-labelledby="comparison-heading"
        className="relative overflow-hidden bg-brand-navy text-white section-padding"
      >
        {/* Background Image with Gradient Overlay using shared corporate glass building image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <Image
            src="/Service/sme-comparison-bg.jpg"
            alt="Corporate modern glass architectural buildings representing enterprise & SME connectivity"
            fill
            sizes="100vw"
            className="object-cover object-center select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-navy/60 to-brand-navy/85" />
        </div>

        <div className="container-sash relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <AppleReveal className="lg:col-span-4">
              <p className="eyebrow-label text-white/80 mb-2.5">
                Home vs SME Plans
              </p>
              <h2
                id="comparison-heading"
                className="text-white !text-xl sm:!text-2xl lg:!text-[28px] font-semibold tracking-tight leading-snug mb-3"
              >
                How SME Broadband compares with Home Plans
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                Upgrade from residential broadband to dedicated business
                stability, priority fault dispatch, and GST-compliant billing.
              </p>
            </AppleReveal>

            <div className="lg:col-span-8">
              <div className="overflow-x-auto rounded-[22px] bg-navy-80/80 backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/10 text-white text-xs sm:text-sm border-b border-white/15">
                      <th className="p-4 sm:p-5 font-semibold">Feature</th>
                      <th className="p-4 sm:p-5 font-semibold text-white/80">Home Broadband</th>
                      <th className="p-4 sm:p-5 font-semibold text-white">SME Business Plans</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                    <tr className="hover:bg-white/[0.04] transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-white">
                        Monthly Data &amp; Bandwidth
                      </td>
                      <td className="p-4 sm:p-5 text-white/70">Unlimited</td>
                      <td className="p-4 sm:p-5 font-medium text-white">
                        Unlimited with business traffic priority
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.04] transition-colors bg-white/[0.02]">
                      <td className="p-4 sm:p-5 font-medium text-white">
                        Price Lock Protection
                      </td>
                      <td className="p-4 sm:p-5 text-white/70">1 to 2 Years</td>
                      <td className="p-4 sm:p-5 font-medium text-white">
                        Unlimited Price Lock (Corporate Pack ₹1,499/mo)
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.04] transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-white">
                        Support Response
                      </td>
                      <td className="p-4 sm:p-5 text-white/70">
                        24/7 Customer Support
                      </td>
                      <td className="p-4 sm:p-5 font-medium text-white">
                        24/7 Priority Commercial Field Dispatch
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.04] transition-colors bg-white/[0.02]">
                      <td className="p-4 sm:p-5 font-medium text-white">
                        Static IP &amp; CCTV Port Forwarding
                      </td>
                      <td className="p-4 sm:p-5 text-white/70">Optional Add-on</td>
                      <td className="p-4 sm:p-5 font-medium text-white">
                        Supported for POS, NVR/CCTV &amp; VPN
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonial />

      <Faq
        items={SME_FAQS}
        eyebrow="SME Internet FAQs"
        heading="SME Business Connectivity Questions"
        description="Clear answers about commercial broadband, static IP integration, priority dispatch, and tariff protection in Tamil Nadu."
      />

      <Contactus
        defaultInterest="Business or SME"
        defaultPlan="SME Business Internet"
      />
    </>
  );
}

