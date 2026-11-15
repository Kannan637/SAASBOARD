import type { Metadata } from "next";
import Link from "next/link";
import Contactus from "@/components/Home/Contactus";

export const metadata: Metadata = {
  title: "About SASH Broadband | Fibre ISP in Tamil Nadu",
  description:
    "Learn about SASH Broadband Private Limited, a licensed internet service provider based in Thiruvallur delivering FTTH fibre, leased lines & CCTV in Tamil Nadu.",
  alternates: {
    canonical: "/about",
    languages: { "en-IN": "/about" },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.sashbroadband.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: "https://www.sashbroadband.com/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Page Hero */}
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
                About Us
              </li>
            </ol>
          </nav>

          <p className="eyebrow-label text-white/80 mb-3">
            SASH Broadband Private Limited
          </p>
          <h1 className="text-white mb-6">
            Connecting homes and businesses across Tamil Nadu with pure fibre
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
            Headquartered in Jaya Nagar, Thiruvallur, SASH Broadband builds and
            operates reliable optical fibre networks designed for everyday speed,
            honest pricing, and local engineering support.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#contact" className="btn-pill btn-primary-red">
              Check availability
            </Link>
            <Link href="/#plans" className="btn-pill btn-secondary-navy">
              View broadband plans
            </Link>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="bg-white text-brand-navy section-padding">
        <div className="container-sash grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow-label text-brand-red mb-3">About Us</p>
            <h2 className="text-brand-navy mb-4">
              A Class–B Tamil Nadu ISP built on speed, continuity, and trust
            </h2>
            <p className="text-neutral-600 text-base mb-4">
              SASH Broadband Private Limited is a licensed Class–B Internet
              Service Provider (ISP) in Tamil Nadu, driven by a young, dynamic
              team committed to delivering high-quality connectivity. We support
              both domestic households and corporate enterprises with diverse
              communications services that power productivity and business
              continuity.
            </p>
            <p className="text-neutral-600 text-base">
              We provide next-generation internet, telecommunication, and optical
              solutions—complete with end-to-end connectivity and last-mile
              patching via direct fiber and wireless links—setting a higher
              benchmark for our customers&apos; time and trust.
            </p>
          </div>

          <div className="lg:col-span-5 card-sash bg-neutral-100 p-8 border border-neutral-100 space-y-6">
            <div>
              <h3 className="text-brand-navy font-extrabold text-xl mb-2">
                Our Mission
              </h3>
              <p className="text-neutral-600 text-base">
                To deliver reliable, high-speed internet, optical, and
                telecommunication solutions for domestic and corporate clients
                with transparent pricing and end-to-end last-mile fiber and
                wireless connectivity.
              </p>
            </div>

            <div className="pt-6 border-t border-brand-navy/10">
              <h3 className="text-brand-navy font-extrabold text-xl mb-2">
                Licensing &amp; Coverage
              </h3>
              <p className="text-neutral-600 text-base">
                SASH Broadband Private Limited operates as an authorised
                Class–B Internet Service Provider (ISP) across Tamil Nadu.
              </p>
            </div>

            <div className="pt-6 border-t border-brand-navy/10">
              <h3 className="text-brand-navy font-extrabold text-xl mb-2">
                Our Team &amp; Operations
              </h3>
              <p className="text-neutral-600 text-base">
                Our team comprises fibre splicing specialists, network operations
                centre (NOC) engineers, CCTV installation technicians, and a
                dedicated customer desk at Jaya Nagar, Thiruvallur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contactus />
    </>
  );
}

