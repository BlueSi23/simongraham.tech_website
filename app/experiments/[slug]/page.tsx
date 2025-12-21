import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "../../../components/layout/Container";
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  getExperimentBySlug,
  getRelatedExperiments,
} from "../../../lib/firestore";
import { getExperimentMdx } from "../../../lib/content";

interface ExperimentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function ExperimentDetailPage(props: ExperimentDetailPageProps) {
  const params = await props.params;
  const experiment = await getExperimentBySlug(params.slug);
  if (!experiment) {
    notFound();
  }

  const [{ source }, related] = await Promise.all([
    getExperimentMdx(params.slug),
    getRelatedExperiments(experiment.tags || [], experiment.slug, 3),
  ]);

  return (
    <div className="py-10 sm:py-14">
      <Container className="space-y-12">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Experiment
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {experiment.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {experiment.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          {experiment.excerpt && (
            <p className="max-w-2xl text-sm text-zinc-400">
              {experiment.excerpt}
            </p>
          )}
        </header>

        <article className="prose prose-invert max-w-none prose-headings:tracking-tight prose-p:text-sm prose-p:text-zinc-300 prose-a:text-zinc-100">
          <MDXRemote source={source} />
        </article>

        {related.length > 0 && (
          <section className="border-t border-zinc-800 pt-8">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Related Experiments
              </h2>
              <Link
                href="/experiments"
                className="text-xs text-zinc-400 hover:text-zinc-100"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((exp) => (
                <Card key={exp.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{exp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 line-clamp-3">{exp.excerpt}</p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {exp.tags?.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={`/experiments/${exp.slug}`}
                      className="text-xs font-medium text-zinc-200 hover:text-white"
                    >
                      View experiment →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}





