import type { Metadata } from "next";
import React from "react";
import BlogListingClient from "@/components/Blog/BlogListingClient";
import Contactus from "@/components/Home/Contactus";
import { BLOG_POSTS } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog & Network Guides | SASH Broadband Tamil Nadu",
  description:
    "Read technical guides and practical insights on FTTH fibre broadband, 1:1 enterprise leased lines, dual-band Wi-Fi optimization, and IP CCTV security from SASH Broadband engineers.",
  alternates: {
    canonical: "/blog",
    languages: { "en-IN": "/blog" },
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
          name: "Blog",
          item: "https://www.sashbroadband.com/blog",
        },
      ],
    },
    {
      "@type": "Blog",
      name: "SASH Broadband Engineering & Connectivity Blog",
      url: "https://www.sashbroadband.com/blog",
      publisher: {
        "@type": "Organization",
        name: "SASH Broadband Private Limited",
      },
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogListingClient posts={BLOG_POSTS} />
      <Contactus />
    </>
  );
}
