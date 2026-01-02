import { Article, ContactSubmission, AvailabilityToken } from "./types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import * as admin from "firebase-admin";

// --- Firebase Admin Setup ---
let db: admin.firestore.Firestore | null = null;
let initError: string | null = null;

if (!admin.apps.length) {
    try {
        let credential;
        const envKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

        console.log("Firestore Init: Checking credentials. Env Key present?", !!envKey);

        if (envKey) {
            try {
                // Parse the JSON string
                const serviceAccount = JSON.parse(envKey);
                credential = admin.credential.cert(serviceAccount);
                console.log("Firestore Init: Successfully parsed service account.");
            } catch (e: any) {
                console.error("Firestore Init: Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY", e);
                throw new Error(`Invalid FIREBASE_SERVICE_ACCOUNT_KEY JSON: ${e.message}`);
            }
        } else {
            // Local Development or Missing Config
            if (process.env.NODE_ENV === 'production') {
                console.warn("Firestore Init: FIREBASE_SERVICE_ACCOUNT_KEY is missing in production!");
            }
            // Fallback to applicationDefault (works locally with GOOGLE_APPLICATION_CREDENTIALS)
            credential = admin.credential.applicationDefault();
        }

        admin.initializeApp({
            credential,
        });

        db = admin.firestore();
        console.log("Firestore: Admin initialized successfully");

    } catch (error: any) {
        console.error("Firestore: Admin initialization failed.", error);
        initError = error.message || String(error);
        db = null;
    }
} else {
    try {
        db = admin.firestore();
    } catch (error: any) {
        console.warn("Firestore: Failed to get existing Firestore instance", error);
        initError = error.message;
        db = null;
    }
}

export function getFirestoreStatus() {
    return {
        initialized: !!db,
        apps: admin.apps.length,
        initError,
        envKeyLength: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0
    };
}

// --- Articles (FileSystem Implementation) ---
const articlesDirectory = path.join(process.cwd(), "content/articles");

export async function getAllArticles(): Promise<Article[]> {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticles = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(articlesDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return {
                id: slug,
                slug,
                title: data.title,
                excerpt: data.excerpt,
                tags: data.tags || [],
                thumbnail: data.thumbnail,
                publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
            } as Article;
        });

    // Sort articles by date
    return allArticles.sort((a, b) => {
        if (a.publishedAt && b.publishedAt) {
            return a.publishedAt < b.publishedAt ? 1 : -1;
        }
        return 0;
    });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            id: slug,
            slug,
            title: data.title,
            excerpt: data.excerpt,
            tags: data.tags || [],
            thumbnail: data.thumbnail,
            publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
        } as Article;
    } catch (error) {
        return null;
    }
}

export async function getRelatedArticles(
    tags: string[],
    currentSlug: string,
    limit: number = 3
): Promise<Article[]> {
    const allArticles = await getAllArticles();

    return allArticles
        .filter((article) => article.slug !== currentSlug) // Exclude current
        .map((article) => {
            // Calculate intersection of tags
            const intersection = article.tags.filter((tag) => tags.includes(tag));
            return {
                article,
                relevance: intersection.length,
            };
        })
        .filter((item) => item.relevance > 0) // Must share at least one tag
        .sort((a, b) => b.relevance - a.relevance) // Sort by relevance
        .slice(0, limit)
        .map((item) => item.article);
}

// --- Contact (Firestore Implementation) ---
export async function createContactSubmission(
    submission: Omit<ContactSubmission, "id" | "submittedAt" | "read">
): Promise<string> {
    if (!db) {
        console.warn("Firestore not initialized. Skipping contact submission storage.");
        return "mock-id";
    }

    try {
        const res = await db.collection("contact-submissions").add({
            ...submission,
            submittedAt: admin.firestore.FieldValue.serverTimestamp(),
            read: false,
        });
        return res.id;
    } catch (error) {
        console.warn("Failed to save contact submission to Firestore:", error);
        return "mock-id";
    }
}

// --- Availability (Firestore Implementation) ---
export async function getAvailabilityTokenByToken(
    token: string
): Promise<AvailabilityToken | null> {
    if (!db) {
        console.warn("Firestore not initialized. Returning null for availability token.");
        return null;
    }

    const snapshot = await db
        .collection("availability-tokens")
        .where("token", "==", token)
        .limit(1)
        .get();

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
        id: doc.id,
        token: data.token,
        createdAt: data.createdAt?.toDate(),
        expiresAt: data.expiresAt?.toDate(),
        calendarUrl: data.calendarUrl,
        isActive: data.isActive,
        generatedFor: data.generatedFor,
    } as AvailabilityToken;
}

// --- Experiments (Firestore Implementation) ---
import { Experiment } from "./experiments-data";

function getLocalExperiments(): Experiment[] {
    try {
        const localPath = path.join(process.cwd(), "data", "experiments.json");
        if (fs.existsSync(localPath)) {
            const fileContents = fs.readFileSync(localPath, "utf8");
            return JSON.parse(fileContents);
        }
    } catch (e) {
        console.warn("Failed to load local experiments fallback:", e);
    }
    return [];
}

export async function getExperiments(): Promise<Experiment[]> {
    let experiments: Experiment[] = [];

    // 1. Try Firestore
    if (db) {
        try {
            const snapshot = await db.collection("experiments").get();
            if (!snapshot.empty) {
                experiments = snapshot.docs.map(doc => doc.data() as Experiment);
            }
        } catch (error) {
            console.error("Error getting experiments from Firestore:", error);
        }
    }

    // 2. Fallback to local JSON if empty
    if (experiments.length === 0) {
        console.warn("Firestore experiments empty or failed. Using local fallback.");
        experiments = getLocalExperiments();
    }

    return experiments;
}

export async function getExperimentBySlug(slug: string): Promise<Experiment | null> {
    // 1. Try Firestore
    if (db) {
        try {
            const snapshot = await db.collection("experiments").where("slug", "==", slug).limit(1).get();
            if (!snapshot.empty) {
                return snapshot.docs[0].data() as Experiment;
            }
        } catch (error) {
            console.error("Error getting experiment by slug from Firestore:", error);
        }
    }

    // 2. Fallback to local JSON
    console.warn(`Firestore lookup for ${slug} failed/empty. Checking local fallback.`);
    const localExperiments = getLocalExperiments();
    return localExperiments.find(e => e.slug === slug) || null;
}

export async function getFeaturedExperiments(limit: number = 3): Promise<Experiment[]> {
    if (!db) return [];
    try {
        const snapshot = await db.collection("experiments")
            .where("featured", "==", true)
            .limit(limit)
            .get();
        return snapshot.docs.map(doc => doc.data() as Experiment);
    } catch (error) {
        console.error("Error getting featured experiments:", error);
        return [];
    }
}

export async function getRelatedExperiments(slug: string, tags: string[] = [], limit: number = 3): Promise<Experiment[]> {
    if (!db) return [];
    // Firestore array-contains-any is limited, so we fetch all and filter or use basic query
    // Simple implementation: fetch all (small dataset) and filter
    try {
        const all = await getExperiments();
        return all
            .filter(e => e.slug !== slug && e.tags?.some(t => tags.includes(t)))
            .slice(0, limit);
    } catch (error) {
        console.error("Error getting related experiments:", error);
        return [];
    }
}

export async function saveExperiment(experiment: Experiment): Promise<{ success: boolean; error?: string }> {
    if (!db) return { success: false, error: `Firestore not initialized: ${initError || "Unknown error"}` };
    try {
        await db.collection("experiments").doc(experiment.id).set(experiment);
        return { success: true };
    } catch (error: any) {
        console.error("Error saving experiment:", error);
        return { success: false, error: error.message || String(error) };
    }
}

export async function deleteExperiment(id: string): Promise<boolean> {
    if (!db) return false;
    try {
        await db.collection("experiments").doc(id).delete();
        return true;
    } catch (error) {
        console.error("Error deleting experiment:", error);
        return false;
    }
}

// For compatibility with some UI components that expect 'thumbnail' instead of 'image'
export async function getAllExperiments(): Promise<any[]> {
    const experiments = await getExperiments();
    return experiments.map(e => ({
        ...e,
        thumbnail: e.image,
        excerpt: e.description
    }));
}

export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
    const allArticles = await getAllArticles();
    return allArticles.slice(0, limit);
}
