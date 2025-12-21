import { Hero } from "../components/sections/Hero";
import { ServiceCards } from "../components/sections/ServiceCards";
import { FeaturedExperiments } from "../components/sections/FeaturedExperiments";
import { LatestArticles } from "../components/sections/LatestArticles";
import { ExperienceSnapshot } from "../components/sections/ExperienceSnapshot";

export default function HomePage() {
  // Empty arrays until we set up proper data sources
  const experiments: any[] = [];
  const articles: any[] = [];

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



