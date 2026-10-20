import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { site } from "@/data/site";

const base = site.siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/properties`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/areas`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/calculator`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/list-your-property`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];

  const listings: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${base}/properties/${property.id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: property.featured ? 0.9 : 0.7,
  }));

  return [...statics, ...listings];
}
