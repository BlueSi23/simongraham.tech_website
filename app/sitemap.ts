import { MetadataRoute } from "next";
import { getExperiments } from "../lib/experiments-server";

export default function sitemap(): MetadataRoute.Sitemap {
    const experiments = getExperiments();
    const baseUrl = "https://www.simongraham.tech";

    const staticRoutes = [
        "",
        "/experiments",
        "/writing",
        // Add other static routes here
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    const experimentRoutes = experiments.map((exp) => ({
        url: `${baseUrl}/experiments/${exp.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...experimentRoutes];
}
