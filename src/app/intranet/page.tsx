import type { Metadata } from "next";
import Link from "next/link";
import Contactus from "@/components/Home/Contactus";

export const metadata: Metadata = {
  title: "Private Intranet & Multi-Branch LAN in Tamil Nadu",
  description:
    "Secure point-to-point fibre intranet and VLAN solutions connecting offices, factories, campuses & warehouses across Thiruvallur and Tamil Nadu.",
  alternates: {
    canonical: "/intranet",
    languages: { "en-IN": "/intranet" },
  },
};

const INTRANET_FEATURES = [
  {
    title: "Multi-Branch Point-to-Point Links",
    description:
      "Connect your head office, manufacturing plant, and retail branches over a private optical layer without traversing the public internet.",
  },
  {
    title: "Isolated VLAN & Security",
    description:
      "Dedicated Layer-2 / Layer-3 network segmentation keeps sensitive ERP, billing, and patient records isolated and protected.",
  },
  {
    title: "High-Speed Local File & Voice Sharing",
    description:
      "Run IP PBXs, shared NAS storage, and centralised CCTV feeds across multiple locations with sub-millisecond local latency.",
  },
  {
    title: "Managed by Local Network Engineers",
    description:
      "Proactive link monitoring and rapid field support from our Thiruvallur network operations desk.",
  },
];

export default function IntranetPage() {
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
                Intranet Solutions
              </li>
            </ol>
          </nav>
          <p className="eyebrow-label text-white/80 mb-3">
            Private Enterprise Networking
          </p>
          <h1 className="text-white mb-6">
            Secure fibre intranet solutions for multi-site organisations
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
            Unify your branches, warehouses, and campus buildings on a private,
            high-speed optical network engineered by SASH Broadband.
          </p>
          <Link href="#contact" className="btn-pill btn-primary-red">
            Request an intranet consultation
          </Link>
        </div>
      </section>

      <section className="bg-white text-brand-navy section-padding">
        <div className="container-sash">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow-label text-brand-red mb-3">
              Private Optical Interconnect
            </p>
            <h2 className="text-brand-navy mb-4">
              Built for secure inter-office communication
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INTRANET_FEATURES.map((item) => (
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
        defaultInterest="Intranet"
        defaultPlan="Multi-Branch Private Intranet Consultation"
      />
    </>
  );
}

