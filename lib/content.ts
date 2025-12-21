import fs from "fs";
import path from "path";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export async function getArticleMdx(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return { source: fileContents };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    throw new Error(`Article not found: ${slug}`);
  }
}

export async function getExperimentMdx(slug: string) {
  // Placeholder - no local content for experiments yet
  return { source: "" };
}
