import { Container } from "../../components/layout/Container";
import Parser from "rss-parser";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

interface FeedItem {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet?: string;
    isoDate?: string;
}

async function getFeed() {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL("https://simongraham924015.substack.com/feed");
        return feed.items as FeedItem[];
    } catch (error) {
        console.error("Error fetching Substack feed:", error);
        return [];
    }
}

function formatDate(dateString?: string) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export default async function WritingPage() {
    const posts = await getFeed();

    return (
        <Container className="pt-32 pb-20 min-h-screen">
            <div className="flex flex-col lg:flex-row-reverse lg:justify-between gap-12 lg:gap-24">
                {/* RIGHT COLUMN: Headline */}
                <div className="lg:w-1/3 text-right sticky top-32 self-start">
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
                        Writing
                    </h1>
                </div>

                {/* LEFT COLUMN: Content (Feed) */}
                <div className="lg:w-2/3">
                    <div className="mb-12">
                        <h2 className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                            Notes from the in-between space. Essays, process write-ups, and working notes on creative technology, production, and how teams actually ship ambitious work. From <span className="text-white border-b border-zinc-700">Substack</span>.
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <Link
                                    key={index}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block border-t border-zinc-800 pt-8"
                                >
                                    <article className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 min-h-[100px] transition-all duration-300 group-hover:pl-4">
                                        <div className="md:w-32 flex-shrink-0">
                                            <time className="text-sm font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                {formatDate(post.isoDate || post.pubDate)}
                                            </time>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3 className="text-2xl font-light text-zinc-100 group-hover:text-white transition-colors leading-tight mb-2">
                                                    {post.title}
                                                </h3>
                                                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300" />
                                            </div>

                                            {post.contentSnippet && (
                                                <p className="text-zinc-500 line-clamp-2 md:line-clamp-3 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                                    {post.contentSnippet}
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                </Link>
                            ))
                        ) : (
                            <div className="py-12 border-t border-zinc-800 text-zinc-500">
                                <p>No posts found. Please check back later or visit the Substack directly.</p>
                                <a
                                    href="https://simongraham924015.substack.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-white hover:underline"
                                >
                                    Visit Substack &rarr;
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
