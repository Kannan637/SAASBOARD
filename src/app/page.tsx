import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";

const WhySash = dynamic(() => import("@/components/Home/WhySash"));
const Aboutus = dynamic(() => import("@/components/Home/Aboutus"));
const Service = dynamic(() => import("@/components/Home/Service"));
const Business = dynamic(() => import("@/components/Home/Business"));
const Testimonial = dynamic(() => import("@/components/Home/Testimonial"));
const Speed = dynamic(() => import("@/components/Home/Speed"));
const Faq = dynamic(() => import("@/components/Home/Faq"));
const Contactus = dynamic(() => import("@/components/Home/Contactus"));

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "SASH Broadband Fibre Internet Plans",
      description:
        "Unlimited FTTH fibre broadband plans with free installation in Thiruvallur and Tamil Nadu.",
      brand: {
        "@type": "Brand",
        name: "SASH Broadband",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Personal Pack (50 Mbps)",
          price: "650",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "650",
            priceCurrency: "INR",
            unitCode: "MON",
          },
        },
        {
          "@type": "Offer",
          name: "Family Pack (100 Mbps)",
          price: "799",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "799",
            priceCurrency: "INR",
            unitCode: "MON",
          },
        },
        {
          "@type": "Offer",
          name: "Corporate Pack",
          price: "1499",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1499",
            priceCurrency: "INR",
            unitCode: "MON",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <Hero />
      <Pricing />
      <WhySash />
      <Aboutus />
      <Service />
      <Business />

      <Testimonial />
      <Speed />
      <Faq />
      <Contactus />
    </>
  );
}
