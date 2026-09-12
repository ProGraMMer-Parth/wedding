import { CalendarDays, Clock, MapPin, Shirt } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { Reveal, SectionHeading } from "./Reveal";

export function Celebrations() {
  const { story, events } = weddingConfig;

  return (
    <section id="celebrations" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={story.eyebrow} title={story.title} intro={story.intro} />

        <ol className="relative mt-16 space-y-14 md:space-y-20">
          <span
            aria-hidden
            className="absolute left-[1.15rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent md:block"
          />
          {events.map((event, i) => (
            <li key={event.id}>
              <Reveal delay={i * 0.05}>
                <article className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
                  <div className="hidden pt-6 md:block">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-accent/50 bg-background font-serif text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-3xl border border-accent/20 bg-card shadow-[0_24px_60px_-40px_rgba(141,91,76,0.6)]">
                    <div className="grid md:grid-cols-2">
                      <img
                        src={event.image}
                        alt={event.name}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="h-60 w-full object-cover md:h-full"
                      />
                      <div className="p-7 sm:p-9">
                        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-accent">
                          {event.tagline}
                        </p>
                        <h3 className="mt-3 font-serif text-2xl text-primary sm:text-3xl">
                          {event.name}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                          {event.description}
                        </p>
                        <dl className="mt-6 space-y-3 text-sm text-foreground/80">
                          <Detail icon={<CalendarDays className="h-4 w-4" />} label="Date">
                            <time dateTime={event.isoDate}>{event.date}</time>
                          </Detail>
                          <Detail icon={<Clock className="h-4 w-4" />} label="Time">
                            {event.time}
                          </Detail>
                          <Detail icon={<MapPin className="h-4 w-4" />} label="Venue">
                            {event.venue}
                          </Detail>
                          <Detail icon={<Shirt className="h-4 w-4" />} label="Dress code">
                            {event.dressCode}
                          </Detail>
                        </dl>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="sr-only">{label}</dt>
        <dd className="min-w-0">{children}</dd>
      </div>
    </div>
  );
}
