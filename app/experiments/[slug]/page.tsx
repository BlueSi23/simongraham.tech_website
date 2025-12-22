import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { getExperimentBySlug, getRelatedExperiments } from "../../../lib/experiments-server";

interface ExperimentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function ExperimentDetailPage(props: ExperimentDetailPageProps) {
  const params = await props.params;
  const experiment = getExperimentBySlug(params.slug);

  if (!experiment) {
    notFound();
  }

  // Calculate related experiments
  const related = getRelatedExperiments(experiment.slug, experiment.tags);

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
          {experiment.description && (
            <p className="max-w-2xl text-sm text-zinc-400">
              {experiment.description}
            </p>
          )}
        </header>

        <article className="prose prose-invert max-w-none prose-headings:tracking-tight prose-p:text-sm prose-p:text-zinc-300 prose-a:text-zinc-100 space-y-8">
          {experiment.layout && experiment.layout.length > 0 ? (
            experiment.layout.map((block) => (
              <div key={block.id}>
                {block.type === "text" && (
                  <p className="whitespace-pre-line leading-loose text-base text-zinc-300">
                    {block.content}
                  </p>
                )}
                {block.type === "image" && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-800 my-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={block.content}
                      alt="Process detail"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-base text-zinc-300 whitespace-pre-line">
              {experiment.longDescription}
            </p>
          )}
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
                    <p className="mb-3 line-clamp-3">{exp.description}</p>
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





