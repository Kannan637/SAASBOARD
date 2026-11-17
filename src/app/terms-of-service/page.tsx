import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | SASH Broadband",
  description:
    "Terms of Service for SASH Broadband Private Limited internet, leased line, intranet, and CCTV installations in Tamil Nadu.",
  alternates: {
    canonical: "/terms-of-service",
    languages: { "en-IN": "/terms-of-service" },
  },
};

export default function TermsOfServicePage() {
  return (
    <section className="bg-white text-brand-navy section-padding">
      <div className="container-sash max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-600 mb-4">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:underline text-brand-navy">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-brand-red font-medium">
              Terms of Service
            </li>
          </ol>
        </nav>

        <span className="inline-block px-3.5 py-1 rounded-full bg-red-10 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
          Legal Document Framework (For Client Legal Review)
        </span>
        <h1 className="text-brand-navy font-semibold tracking-tight text-3xl sm:text-4xl mb-6">Terms of Service</h1>

        <div className="space-y-8 text-neutral-600 text-base font-normal leading-relaxed">
          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              1. Service Availability &amp; Feasibility
            </h2>
            <p>
              All broadband, leased line, intranet, and CCTV services offered by
              SASH Broadband Private Limited are subject to technical and line
              feasibility at the subscriber&apos;s installation address in
              Thiruvallur and Tamil Nadu.
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              2. Tariffs, Billing &amp; Price Lock
            </h2>
            <p>
              Published monthly plan prices (Personal Pack ₹650/month, Family
              Pack ₹799/month, Corporate Pack ₹1,499/month) are in INR and
              subject to applicable GST. Price-lock duration applies to the base
              monthly plan tariff as specified at the time of onboarding.
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              3. Customer Premises Equipment (CPE) &amp; Installation
            </h2>
            <p>
              [Client Legal Team to complete specific router/ONU ownership,
              relocation, and return policy terms.]
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              4. Acceptable Use Policy
            </h2>
            <p>
              Subscribers must use internet services in compliance with Indian
              cyber laws, Department of Telecommunications (DoT), and TRAI
              guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              5. Registered Office &amp; Support Contact
            </h2>
            <p>
              SASH Broadband Private Limited, 184/12B, Jaya Nagar Main Road, Jaya
              Nagar, Thiruvallur, 602001, Tamil Nadu. Phone:{" "}
              <a
                href="tel:+919003009353"
                className="font-medium text-brand-navy underline"
              >
                +91 90030 09353
              </a>{" "}
              | Email:{" "}
              <a
                href="mailto:sashbroadband@gmail.com"
                className="font-medium text-brand-navy underline"
              >
                sashbroadband@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

