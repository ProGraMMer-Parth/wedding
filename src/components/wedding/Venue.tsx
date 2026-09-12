import { MapPin, Navigation } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { Reveal, SectionHeading } from "./Reveal";

export function Venue() {
  const { venue } = weddingConfig;

  return (
    <section id="venue" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={venue.eyebrow} title={venue.name} intro={venue.note} />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-accent/20">
              <img
                src={venue.image}
                alt={venue.imageAlt}
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-accent/20 bg-card p-8">
              <div>
                <h3 className="font-serif text-2xl text-primary">{venue.shortName}</h3>
                <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-foreground/75">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{venue.address}</span>
                </p>
                <a
                  href={venue.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm uppercase tracking-[0.18em] text-primary-foreground transition-transform duration-200 hover:scale-105"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  Get directions
                </a>
              </div>

              <div className="overflow-hidden rounded-2xl border border-accent/20">
                <iframe
                  title={`Map showing ${venue.name}`}
                  src={venue.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
