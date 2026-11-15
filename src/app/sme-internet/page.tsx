import type { Metadata } from "next";
import Link from "next/link";
import Contactus from "@/components/Home/Contactus";

export const metadata: Metadata = {
  title: "SME Business Internet Plans in Tamil Nadu",
  description:
    "High-uptime SME fibre broadband for offices, retail stores, clinics & warehouses in Thiruvallur and Tamil Nadu. Free setup, unlimited data & priority support.",
  alternates: {
    canonical: "/sme-internet",
    languages: { "en-IN": "/sme-internet" },
  },
};

export default function SmeInternetPage() {
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
                SME Internet
              </li>
            </ol>
          </nav>
          <p className="eyebrow-label text-white/80 mb-3">
            Small &amp; Medium Enterprise Broadband
          </p>
          <h1 className="text-white mb-6">
            Reliable business internet that grows with your team
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
            Purpose-built for retail outlets, clinics, accounting firms, and
            growing offices that need priority routing, GST invoicing, and rapid
            field support.
          </p>
          <Link href="#contact" className="btn-pill btn-primary-red">
            Get an SME business quote
          </Link>
        </div>
      </section>

      <section className="bg-white text-brand-navy section-padding">
        <div className="container-sash">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow-label text-brand-red mb-3">
              Home vs SME Plans
            </p>
            <h2 className="text-brand-navy mb-4">
              How SME Broadband compares with Home Plans
            </h2>
          </div>

          <div className="overflow-x-auto card-sash border border-neutral-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="p-5 font-extrabold">Feature</th>
                  <th className="p-5 font-extrabold">Home Broadband</th>
                  <th className="p-5 font-extrabold">SME Business Plans</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-base">
                <tr className="bg-white">
                  <td className="p-5 font-bold">Monthly Data &amp; Bandwidth</td>
                  <td className="p-5 text-neutral-600">Unlimited</td>
                  <td className="p-5 font-semibold text-brand-navy">
                    Unlimited with business traffic priority
                  </td>
                </tr>
                <tr className="bg-neutral-100/50">
                  <td className="p-5 font-bold">Price Lock Protection</td>
                  <td className="p-5 text-neutral-600">1 to 2 Years</td>
                  <td className="p-5 font-semibold text-brand-navy">
                    Unlimited Price Lock (Corporate Pack ₹1,499/mo)
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-5 font-bold">Support Response</td>
                  <td className="p-5 text-neutral-600">24/7 Customer Support</td>
                  <td className="p-5 font-semibold text-brand-navy">
                    24/7 Priority Commercial Field Dispatch
                  </td>
                </tr>
                <tr className="bg-neutral-100/50">
                  <td className="p-5 font-bold">Static IP &amp; CCTV Port Forwarding</td>
                  <td className="p-5 text-neutral-600">Optional Add-on</td>
                  <td className="p-5 font-semibold text-brand-navy">
                    Supported for POS, NVR/CCTV &amp; VPN
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Contactus
        defaultInterest="Business or SME"
        defaultPlan="SME Business Internet / Corporate Pack (₹1,499/mo)"
      />
    </>
  );
}

