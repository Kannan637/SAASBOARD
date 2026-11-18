import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Home/Topbar";
import Footer from "@/components/Home/Footer";
import { AppleSmoothScrollProvider } from "@/components/ui/apple-scroll";
import { SlowConnectionLoader } from "@/components/ui/loading-state";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://www.sashbroadband.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Internet Service Provider in Tamil Nadu | SASH Broadband",
    template: "%s | SASH Broadband",
  },
  icons: {
    icon: "/Logo/Favicon.png",
    shortcut: "/Logo/Favicon.png",
    apple: "/Logo/Favicon.png",
  },
  description:
    "Fast FTTH fibre broadband up to 1 Gbps, leased lines, SME internet & CCTV in Thiruvallur and Tamil Nadu. Unlimited data, free setup—check availability today!",
  keywords: [
    "internet service provider Tamil Nadu",
    "fibre broadband Thiruvallur",
    "unlimited broadband plans",
    "leased line Tamil Nadu",
    "CCTV installation Tamil Nadu",
    "SME internet",
    "business broadband",
    "SASH Broadband",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "SASH Broadband",
    title: "Internet Service Provider in Tamil Nadu | SASH Broadband",
    description:
      "Fast FTTH fibre broadband up to 1 Gbps, leased lines, SME internet & CCTV in Thiruvallur and Tamil Nadu. Unlimited data & free setup.",
    images: [
      {
        url: "/og-sash-broadband.svg",
        width: 1200,
        height: 630,
        alt: "SASH Broadband Private Limited - Fibre Internet up to 1 Gbps in Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Internet Service Provider in Tamil Nadu | SASH Broadband",
    description:
      "Fast FTTH fibre broadband up to 1 Gbps, leased lines, SME internet & CCTV in Thiruvallur and Tamil Nadu. Check availability today!",
    images: ["/og-sash-broadband.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "googled594c6eef5138b0f",
  },
};

const ispJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "InternetServiceProvider",
      "@id": `${SITE_URL}/#isp`,
      name: "SASH Broadband Private Limited",
      alternateName: "SASH Broadband",
      url: SITE_URL,
      logo: `${SITE_URL}/Logo/sashbroadband.png`,
      telephone: "+91-90030-09353",
      email: "sashbroadband@gmail.com",
      priceRange: "₹650 - ₹1,499+",
      address: {
        "@type": "PostalAddress",
        streetAddress: "184/12B, Jaya Nagar Main Road, Jaya Nagar",
        addressLocality: "Thiruvallur",
        postalCode: "602001",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "State",
        name: "Tamil Nadu",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "SASH Broadband",
      publisher: {
        "@id": `${SITE_URL}/#isp`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-transparent text-brand-navy font-normal relative">
        {/* Dedicated Fixed Viewport Diagonal Pinstripe Background Layer */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 pointer-events-none bg-[#F8F8FC] bg-fixed bg-[repeating-linear-gradient(135deg,rgba(37,58,123,0.045)_0px,rgba(37,58,123,0.045)_0.75px,transparent_0.75px,transparent_3.5px)]"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ispJsonLd) }}
        />
        <Topbar />
        <AppleSmoothScrollProvider>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </AppleSmoothScrollProvider>
        <Footer />
        <SlowConnectionLoader />
      </body>
    </html>
  );
}
