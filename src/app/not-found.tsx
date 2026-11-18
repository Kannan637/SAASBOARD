import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-brand-navy text-white section-padding min-h-[70vh] flex items-center">
      <div className="container-sash max-w-2xl text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-red text-white text-xs font-semibold uppercase tracking-wider mb-6">
          Error 404 • Page Not Found
        </span>
        <h1 className="text-white mb-4">
          We couldn&apos;t find the page you were looking for.
        </h1>
        <p className="text-white/85 text-lg mb-8">
          The link may have moved or the URL might be mistyped. Our fibre network
          is online and ready—head back home or contact our Thiruvallur support
          team.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-pill btn-primary-red">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-pill btn-secondary-navy">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}

