import { Article, ContactSubmission, AvailabilityToken } from "./types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import * as admin from "firebase-admin";

// --- Firebase Admin Setup ---
let db: admin.firestore.Firestore | null = null;

if (!admin.apps.length) {
    try {
        let credential;
        // Check for Env Var (Vercel Production/Preview)
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            try {
                // Parse the JSON string (handle potential escaped newlines)
                const serviceAccount = JSON.parse(
                    process.env.FIREBASE_SERVICE_ACCOUNT_KEY
                );
                credential = admin.credential.cert(serviceAccount);
            } catch (e) {
                console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY", e);
                // Fallback (might fail if this was the only method intended)
                credential = admin.credential.applicationDefault();
            }
        } else {
            // Local Development (relying on GOOGLE_APPLICATION_CREDENTIALS file path)
            credential = admin.credential.applicationDefault();
        }

        admin.initializeApp({
            credential,
        });
        db = admin.firestore();
        console.log("Firebase Admin initialized successfully");
    } catch (error) {
        console.warn("Firebase Admin failed to initialize. Dynamic features (Contact, Availability, Experiments) may not work.", error);
        db = null;
    }
} else {
    try {
        db = admin.firestore();
    } catch (error) {
        console.warn("Failed to get Firestore instance", error);
        db = null;
    }
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

export async function getExperiments(): Promise<Experiment[]> {
    if (!db) return [];
    try {
        const snapshot = await db.collection("experiments").get();
        return snapshot.docs.map(doc => doc.data() as Experiment);
    } catch (error) {
        console.error("Error getting experiments:", error);
        return [];
    }
}

export async function getExperimentBySlug(slug: string): Promise<Experiment | null> {
    if (!db) return null;
    try {
        const snapshot = await db.collection("experiments").where("slug", "==", slug).limit(1).get();
        if (snapshot.empty) return null;
        return snapshot.docs[0].data() as Experiment;
    } catch (error) {
        console.error("Error getting experiment by slug:", error);
        return null;
    }
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

export async function saveExperiment(experiment: Experiment): Promise<boolean> {
    if (!db) return false;
    try {
        await db.collection("experiments").doc(experiment.id).set(experiment);
        return true;
    } catch (error) {
        console.error("Error saving experiment:", error);
        return false;
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
