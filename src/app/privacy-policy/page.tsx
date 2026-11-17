import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SASH Broadband",
  description:
    "Privacy Policy for SASH Broadband Private Limited, Jaya Nagar, Thiruvallur, Tamil Nadu. Learn how we handle customer enquiry and subscriber data.",
  alternates: {
    canonical: "/privacy-policy",
    languages: { "en-IN": "/privacy-policy" },
  },
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </li>
          </ol>
        </nav>

        <span className="inline-block px-3.5 py-1 rounded-full bg-red-10 text-brand-red text-xs font-semibold uppercase tracking-wider mb-4">
          Legal Document Framework (For Client Legal Review)
        </span>
        <h1 className="text-brand-navy font-semibold tracking-tight text-3xl sm:text-4xl mb-6">Privacy Policy</h1>

        <div className="space-y-8 text-neutral-600 text-base font-normal leading-relaxed">
          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              1. Controller &amp; Company Information
            </h2>
            <p>
              SASH Broadband Private Limited (&ldquo;SASH Broadband&rdquo;),
              having its registered office at 184/12B, Jaya Nagar Main Road, Jaya
              Nagar, Thiruvallur, 602001, Tamil Nadu, respects your privacy and
              protects your personal information in accordance with applicable
              Indian telecommunications and data protection regulations.
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              2. Information We Collect
            </h2>
            <p>
              When you submit an availability check or callback request on our
              website, we collect your full name, mobile number, optional email
              address, street/pincode, service interest, and explicit consent
              timestamp. We do not store personal form data in your browser
              beyond your active session.
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              3. How We Use Your Information
            </h2>
            <p>
              We use your contact details solely to check network feasibility at
              your address, provide broadband or enterprise quotations, schedule
              installation, and deliver customer support.
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              4. Regulatory &amp; Subscriber KYC Compliance
            </h2>
            <p>
              [Client Legal Team to complete specific DoT / TRAI subscriber
              verification retention clauses and grievance officer details.]
            </p>
          </div>

          <div>
            <h2 className="text-brand-navy text-xl sm:text-2xl font-semibold tracking-normal mb-2">
              5. Contact for Privacy Enquiries
            </h2>
            <p>
              For questions or data requests, contact SASH Broadband Private
              Limited at{" "}
              <a
                href="mailto:sashbroadband@gmail.com"
                className="font-medium text-brand-navy underline"
              >
                sashbroadband@gmail.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919003009353"
                className="font-medium text-brand-navy underline"
              >
                +91 90030 09353
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

