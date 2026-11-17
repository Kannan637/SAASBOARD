import React from "react";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";
import WhySash from "@/components/Home/WhySash";
import Service from "@/components/Home/Service";
import Business from "@/components/Home/Business";
import Faq from "@/components/Home/Faq";
import Contactus from "@/components/Home/Contactus";
import Speed from "@/components/Home/Speed";
import Aboutus from "@/components/Home/Aboutus";
import Testimonial from "@/components/Home/Testimonial";

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
