"use client";

interface CalendarEmbedProps {
  calendarUrl: string;
}

export function CalendarEmbed({ calendarUrl }: CalendarEmbedProps) {
  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <iframe
        src={calendarUrl}
        className="h-full w-full border-0"
        title="Booking calendar"
        loading="lazy"
      />
    </div>
  );
}





