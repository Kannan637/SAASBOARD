import type { MetadataRoute } from "next";

const SITE_URL = "https://www.sashbroadband.com";

interface RouteConfig {
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

const SEO_ROUTES: RouteConfig[] = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "/broadband-services", changeFrequency: "weekly", priority: 0.95 },
  { path: "/lease-line", changeFrequency: "weekly", priority: 0.95 },
  { path: "/sme-internet", changeFrequency: "weekly", priority: 0.9 },
  { path: "/intranet", changeFrequency: "weekly", priority: 0.85 },
  { path: "/cctv", changeFrequency: "weekly", priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.5 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SEO_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
