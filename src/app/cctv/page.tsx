import type { Metadata } from "next";
import Link from "next/link";
import Contactus from "@/components/Home/Contactus";

export const metadata: Metadata = {
  title: "CCTV Installation & Surveillance in Tamil Nadu",
  description:
    "Professional HD IP CCTV camera installation and remote mobile monitoring for homes, apartments, shops & warehouses in Thiruvallur and Tamil Nadu.",
  alternates: {
    canonical: "/cctv",
    languages: { "en-IN": "/cctv" },
  },
};

const CAMERA_SOLUTIONS = [
  {
    title: "Indoor & Outdoor HD IP Cameras",
    description:
      "Weatherproof (IP67) bullet and dome cameras with infrared night vision for clear 24-hour perimeter security.",
  },
  {
    title: "NVR Storage & Cloud Backup",
    description:
      "Multi-week continuous and motion-triggered recording on high-reliability Network Video Recorders (NVRs).",
  },
  {
    title: "Live Smartphone Monitoring",
    description:
      "Paired with your SASH Broadband fibre line for smooth, zero-lag live viewing on Android and iOS devices from anywhere.",
  },
  {
    title: "Clean Cabling & Local AMC Support",
    description:
      "Neat conduit routing, PoE switch setup, and ongoing maintenance by our Thiruvallur technical team.",
  },
];

export default function CctvPage() {
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
                CCTV Surveillance
              </li>
            </ol>
          </nav>
          <p className="eyebrow-label text-white/80 mb-3">
            Premises Security &amp; IP Monitoring
          </p>
          <h1 className="text-white mb-6">
            CCTV surveillance installation for homes and commercial properties
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
            Protect your home, apartment complex, retail shop, or warehouse in
            Tamil Nadu with professional HD IP camera installation and real-time
            mobile viewing.
          </p>
          <Link href="#contact" className="btn-pill btn-primary-red">
            Book a free site survey
          </Link>
        </div>
      </section>

      <section className="bg-white text-brand-navy section-padding">
        <div className="container-sash">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow-label text-brand-red mb-3">
              What We Deliver
            </p>
            <h2 className="text-brand-navy mb-4">
              End-to-end CCTV hardware, cabling, and network setup
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAMERA_SOLUTIONS.map((item) => (
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
        defaultInterest="CCTV"
        defaultPlan="CCTV Site Survey & Surveillance Quotation"
      />
    </>
  );
}

