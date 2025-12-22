import fs from "fs";
import path from "path";
import { Experiment } from "./experiments-data";

const dataFilePath = path.join(process.cwd(), "data", "experiments.json");

export function getExperiments(): Experiment[] {
    try {
        if (!fs.existsSync(dataFilePath)) return [];
        const fileContents = fs.readFileSync(dataFilePath, "utf8");
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Failed to read experiments data:", error);
        return [];
    }
}

export function getExperimentBySlug(slug: string): Experiment | undefined {
    const experiments = getExperiments();
    return experiments.find((e) => e.slug === slug);
}

export function getFeaturedExperiments(limit: number = 3): Experiment[] {
    const experiments = getExperiments();
    return experiments.filter((e) => e.featured).slice(0, limit);
}

export function getRelatedExperiments(slug: string, tags: string[] = [], limit: number = 3): Experiment[] {
    const experiments = getExperiments();
    return experiments
        .filter(e => e.slug !== slug && e.tags?.some(t => tags.includes(t)))
        .slice(0, limit);
}

export function saveExperiments(experiments: Experiment[]): boolean {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(experiments, null, 2), "utf8");
        return true;
    } catch (error) {
        console.error("Failed to save experiments:", error);
        return false;
    }
}
