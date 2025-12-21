import { notFound } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { CalendarEmbed } from "../../../components/embeds/CalendarEmbed";
import { getAvailabilityTokenByToken } from "../../../lib/firestore";

interface AvailabilityPageProps {
  params: Promise<{ token: string }>;
}

export const revalidate = 0;

export default async function AvailabilityPage(props: AvailabilityPageProps) {
  const params = await props.params;
  const record = await getAvailabilityTokenByToken(params.token);

  if (!record) {
    return InvalidToken();
  }

  const now = new Date();
  if (!record.isActive || record.expiresAt <= now) {
    return InvalidToken();
  }

  if (!record.calendarUrl) {
    notFound();
  }

  return (
    <div className="py-10 sm:py-14">
      <Container className="space-y-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Private Availability
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Book time directly into my calendar.
          </h1>
          <p className="max-w-xl text-sm text-zinc-400">
            This link is shared for a specific conversation. Please don&apos;t
            forward it widely—if someone else should have access, I&apos;m happy
            to generate a fresh link.
          </p>
        </header>

        <CalendarEmbed calendarUrl={record.calendarUrl} />
      </Container>
    </div>
  );
}

function InvalidToken() {
  return (
    <div className="py-10 sm:py-14">
      <Container className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          This link has expired.
        </h1>
        <p className="max-w-xl text-sm text-zinc-400">
          The availability link you&apos;re using is no longer valid. Please
          reach out directly and I&apos;ll happily share a fresh booking link.
        </p>
      </Container>
    </div>
  );
}





