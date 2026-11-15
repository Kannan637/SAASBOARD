import type { Metadata } from "next";
import Link from "next/link";
import Contactus from "@/components/Home/Contactus";

export const metadata: Metadata = {
  title: "Dedicated Internet Leased Line in Tamil Nadu",
  description:
    "1:1 symmetrical Internet Leased Line (ILL) connectivity in Thiruvallur and Tamil Nadu. SLA-backed uptime, static IP routing & 24/7 enterprise NOC support.",
  alternates: {
    canonical: "/lease-line",
    languages: { "en-IN": "/lease-line" },
  },
};

const SLA_HIGHLIGHTS = [
  {
    title: "1:1 Uncontended Bandwidth",
    description:
      "Dedicated fibre circuit with zero bandwidth sharing—your subscribed upload and download speeds remain identical 24/7.",
  },
  {
    title: "Static IP Pool Included",
    description:
      "Host on-premise servers, VPN gateways, cloud ERPs, and remote branches with dedicated public IPv4/IPv6 addressing.",
  },
  {
    title: "Proactive SLA & Fast MTTR",
    description:
      "Backed by an enterprise Service Level Agreement and local Thiruvallur field engineers for rapid fault restoration.",
  },
  {
    title: "Scalable up to 1 Gbps+",
    description:
      "Upgrade your committed information rate (CIR) seamlessly as your factory, campus, or corporate office expands.",
  },
];

export default function LeasedLinePage() {
  return (
    <>
      <section className="bg-brand-navy text-white section-padding">
        <div className="container-sash max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-white/75 mb-4">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:underline text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white font-bold">
                Leased Line
              </li>
            </ol>
          </nav>
          <p className="eyebrow-label text-white/80 mb-3">
            Enterprise 1:1 Connectivity
          </p>
          <h1 className="text-white mb-6">
            Dedicated Internet Leased Lines for mission-critical operations
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
            When your business cannot afford congestion or downtime, our 1:1
            symmetrical optical leased lines deliver guaranteed throughput with
            24/7 local NOC monitoring in Tamil Nadu.
          </p>
          <Link href="#contact" className="btn-pill btn-primary-red">
            Request leased line feasibility
          </Link>
        </div>
      </section>

      <section className="bg-white text-brand-navy section-padding">
        <div className="container-sash">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow-label text-brand-red mb-3">
              Enterprise SLA Architecture
            </p>
            <h2 className="text-brand-navy mb-4">
              Why organisations choose SASH Leased Lines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SLA_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="card-sash bg-neutral-100 p-8 border border-neutral-100"
              >
                <h3 className="text-brand-navy font-extrabold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contactus
        defaultInterest="Leased line"
        defaultPlan="Dedicated 1:1 Internet Leased Line Enquiry"
      />
    </>
  );
}

