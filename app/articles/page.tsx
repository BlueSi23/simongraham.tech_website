import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { getAllArticles } from "../../lib/firestore";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <header className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Articles
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Notes from the in-between space.
          </h1>
          <p className="max-w-2xl text-sm text-zinc-400">
            Essays, process write-ups, and working notes on creative technology,
            production, and how teams actually ship ambitious work.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 line-clamp-3">{article.excerpt}</p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {article.tags?.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {article.publishedAt && (
                  <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    {article.publishedAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </p>
                )}
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-xs font-medium text-zinc-200 hover:text-white"
                >
                  Read article →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}





