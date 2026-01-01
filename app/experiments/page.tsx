import ExperimentsPageClient from "./ExperimentsClient";
import { getExperiments } from "../../lib/firestore";

export const dynamic = "force-dynamic"; // Ensure fresh data on every request for CMS updates

export default async function ExperimentsPage() {
  const experiments = await getExperiments();
  return <ExperimentsPageClient experiments={experiments} />;
}
