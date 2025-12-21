import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { getAllExperiments } from "../../lib/firestore";
import { ExperimentTag } from "../../lib/types";

export const revalidate = 60;

const FILTERS: (ExperimentTag | "All")[] = [
  "All",
  "AI",
  "Interaction",
  "IoT",
  "Data",
  "Tools",
];

interface ExperimentsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function ExperimentsPage(props: ExperimentsPageProps) {
  const searchParams = await props.searchParams;
  const experiments = await getAllExperiments();
  const activeTag = (searchParams?.tag as ExperimentTag | "All") || "All";

  const filtered =
    activeTag === "All"
      ? experiments
      : experiments.filter((exp) => exp.tags?.includes(activeTag));

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <header className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Experiments
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Shared experiments in AI, interaction, and emerging tech.
          </h1>
          <p className="max-w-2xl text-sm text-zinc-400">
            Work-in-progress prototypes and explorations. These pieces often
            sit between R&D and production—useful for sensing what&apos;s
            possible before committing to a full build.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2 text-xs">
          {FILTERS.map((filter) => {
            const isActive = activeTag === filter;
            const href =
              filter === "All"
                ? "/experiments"
                : `/experiments?tag=${encodeURIComponent(filter)}`;
            return (
              <Link key={filter} href={href}>
                <Badge
                  variant={isActive ? "default" : "outline"}
                  className={isActive ? "bg-zinc-100 text-black" : ""}
                >
                  {filter}
                </Badge>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((exp) => (
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
                  View details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}





