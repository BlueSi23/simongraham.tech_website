import { Article } from "./types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
    const allArticles = await getAllArticles();
    return allArticles.slice(0, limit);
}
