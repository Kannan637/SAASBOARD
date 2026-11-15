import type { Metadata } from "next";
import Link from "next/link";
import Pricing from "@/components/Home/Pricing";
import Faq from "@/components/Home/Faq";
import Contactus from "@/components/Home/Contactus";

export const metadata: Metadata = {
  title: "Unlimited Fibre Broadband Plans in Tamil Nadu",
  description:
    "Compare SASH Broadband FTTH home internet plans starting at ₹650/month. Speeds up to 1 Gbps, unlimited data, free installation, and price lock in Tamil Nadu.",
  alternates: {
    canonical: "/broadband-services",
    languages: { "en-IN": "/broadband-services" },
  },
};

const INSTALLATION_STEPS = [
  {
    step: "01",
    title: "Address Feasibility Check",
    description:
      "Share your street address or pincode in Thiruvallur or Tamil Nadu via our callback form or WhatsApp.",
  },
  {
    step: "02",
    title: "Select Your Fibre Plan",
    description:
      "Choose between our Personal Pack (50 Mbps), Family Pack (100 Mbps), or custom high-speed tiers up to 1 Gbps.",
  },
  {
    step: "03",
    title: "Free Fibre Drop & Router Setup",
    description:
      "Our local technicians run an optical fibre cable to your home and configure your Wi-Fi router at zero setup cost.",
  },
  {
    step: "04",
    title: "Instant Activation & Speed Test",
    description:
      "We verify signal strength and speed across your devices before handing over your active connection.",
  },
];

export default function BroadbandServicesPage() {
  return (
    <>
      {/* Hero */}
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
                Broadband Services
              </li>
            </ol>
          </nav>
          <p className="eyebrow-label text-white/80 mb-3">
            FTTH Home &amp; Office Broadband
          </p>
          <h1 className="text-white mb-6">
            Unlimited fibre broadband built for modern households
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
            Say goodbye to buffering and mid-month data caps. Get pure optical
            fibre internet delivered directly to your home with free setup and
            multi-year tariff protection.
          </p>
          <Link href="#contact" className="btn-pill btn-primary-red">
            Book free installation
          </Link>
        </div>
      </section>

      {/* Plans & Pricing */}
      <Pricing />

      {/* 4-Step Installation Process */}
      <section className="bg-brand-navy text-white section-padding">
        <div className="container-sash">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow-label text-white/80 mb-3">
              Simple Onboarding
            </p>
            <h2 className="text-white mb-4">
              How our 4-step free installation works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTALLATION_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-[14px] bg-navy-80 border border-white/15 p-7"
              >
                <span className="inline-block px-3.5 py-1 rounded-full bg-brand-red text-white text-sm font-extrabold mb-5">
                  Step {item.step}
                </span>
                <h3 className="text-white font-extrabold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-white/85 text-base">{item.description}</p>
              </div>
            ))}
          </div>

          {/* OTT and IPTV Anchor Section */}
          <div
            id="ott-iptv"
            className="mt-16 rounded-[24px] bg-navy-80 border border-white/15 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-extrabold uppercase tracking-wider mb-3">
                OTT &amp; IPTV Ready
              </span>
              <h3 className="text-white text-2xl font-extrabold mb-2">
                Ready for 4K Smart TVs, OTT Apps, and Digital IPTV
              </h3>
              <p className="text-white/85 text-base">
                Our low-latency optical network supports high-bitrate 4K streaming
                and IPTV set-top boxes without frame drops. Ask our team about
                available entertainment bundles in your area.
              </p>
            </div>
            <Link href="#contact" className="btn-pill btn-primary-red shrink-0">
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

