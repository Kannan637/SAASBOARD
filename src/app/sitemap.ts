import type { MetadataRoute } from "next";

const SITE_URL = "https://www.sashbroadband.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/broadband-services",
    "/lease-line",
    "/sme-internet",
    "/cctv",
    "/intranet",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/broadband-services" ? 0.9 : 0.8,
  }));
}

