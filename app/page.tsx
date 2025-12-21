import { Hero } from "../components/sections/Hero";
import { ServiceCards } from "../components/sections/ServiceCards";
import { FeaturedExperiments } from "../components/sections/FeaturedExperiments";
import { LatestArticles } from "../components/sections/LatestArticles";
import { ExperienceSnapshot } from "../components/sections/ExperienceSnapshot";
import { getFeaturedExperiments, getLatestArticles } from "../lib/firestore";

export const revalidate = 60;

export default async function HomePage() {
  const [experiments, articles] = await Promise.all([
    getFeaturedExperiments(3),
    getLatestArticles(3),
  ]);

  return (
    <>
      <Hero />
      <ServiceCards />
      <FeaturedExperiments experiments={experiments} />
      <LatestArticles articles={articles} />
      <ExperienceSnapshot />
    </>
  );
}



