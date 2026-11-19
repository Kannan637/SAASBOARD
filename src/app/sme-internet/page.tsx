import type { Metadata } from "next";
import Contactus from "@/components/Home/Contactus";
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
    description:
      "Optimised optical routing ensures uninterrupted POS billing, cloud ERP sync, and crystal-clear multi-seat video conferencing.",
  },
  {
    title: "Unlimited Price Lock Protection",
    tag: "Fixed Tariff",
    description:
      "Shield your monthly IT budget with our Corporate Pack unlimited price lock starting at ₹1,499/month with GST billing.",
  },
  {
    title: "24/7 Commercial Field Dispatch",
    tag: "Priority Support",
    description:
      "Dedicated commercial desk and local field splicers in Thiruvallur District for faster mean time to repair.",
  },
  {
    title: "Static IP & NVR Port Forwarding",
    tag: "Ready for CCTV/VPN",
    description:
      "Pre-configured support for remote CCTV monitoring, branch VPN tunnels, and hosted accounting servers.",
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
        className="bg-neutral-100 text-brand-navy section-padding"
      >
        <div className="container-sash">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <AppleReveal className="lg:col-span-4">
              <p className="eyebrow-label text-brand-red mb-2.5">
                Home vs SME Plans
              </p>
              <h2 className="text-brand-navy !text-lg sm:!text-xl font-normal tracking-tight mb-2.5">
                How SME Broadband compares with Home Plans
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                Upgrade from residential broadband to dedicated business
                stability, priority fault dispatch, and GST-compliant billing.
              </p>
            </AppleReveal>

            <div className="lg:col-span-8">
              <div className="overflow-x-auto card-sash bg-white border border-brand-navy/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-navy text-white text-xs sm:text-sm">
                      <th className="p-4 sm:p-5 font-medium">Feature</th>
                      <th className="p-4 sm:p-5 font-medium">Home Broadband</th>
                      <th className="p-4 sm:p-5 font-medium">SME Business Plans</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-xs sm:text-sm">
                    <tr className="bg-white">
                      <td className="p-4 sm:p-5 font-medium text-brand-navy">
                        Monthly Data &amp; Bandwidth
                      </td>
                      <td className="p-4 sm:p-5 text-neutral-600">Unlimited</td>
                      <td className="p-4 sm:p-5 font-normal text-brand-navy">
                        Unlimited with business traffic priority
                      </td>
                    </tr>
                    <tr className="bg-neutral-100/50">
                      <td className="p-4 sm:p-5 font-medium text-brand-navy">
                        Price Lock Protection
                      </td>
                      <td className="p-4 sm:p-5 text-neutral-600">1 to 2 Years</td>
                      <td className="p-4 sm:p-5 font-normal text-brand-navy">
                        Unlimited Price Lock (Corporate Pack ₹1,499/mo)
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-4 sm:p-5 font-medium text-brand-navy">
                        Support Response
                      </td>
                      <td className="p-4 sm:p-5 text-neutral-600">
                        24/7 Customer Support
                      </td>
                      <td className="p-4 sm:p-5 font-normal text-brand-navy">
                        24/7 Priority Commercial Field Dispatch
                      </td>
                    </tr>
                    <tr className="bg-neutral-100/50">
                      <td className="p-4 sm:p-5 font-medium text-brand-navy">
                        Static IP &amp; CCTV Port Forwarding
                      </td>
                      <td className="p-4 sm:p-5 text-neutral-600">Optional Add-on</td>
                      <td className="p-4 sm:p-5 font-normal text-brand-navy">
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

      <Contactus
        defaultInterest="Business or SME"
        defaultPlan="SME Business Internet"
      />
    </>
  );
}

