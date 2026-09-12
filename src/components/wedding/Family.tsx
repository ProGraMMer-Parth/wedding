import { Heart, Users } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { Reveal, SectionHeading } from "./Reveal";

export function Family() {
  const { family } = weddingConfig;
  const parents = family.members.filter((m) => m.relation.includes("Parents"));
  const featured = family.members.find((m) => !m.relation.includes("Parents"));

  return (
    <section id="family" className="relative px-5 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-secondary/50 via-background to-background"
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={family.eyebrow} title={family.title} intro={family.intro} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {parents.map((member, i) => (
            <Reveal key={member.name + member.relation} delay={i * 0.06}>
              <article className="group h-full rounded-3xl border border-accent/20 bg-card/80 p-7 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1.5">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-accent">
                  <Heart className="h-6 w-6" aria-hidden />
                </span>
                <p className="mt-5 text-xs uppercase tracking-[0.22em] text-accent">
                  {member.relation}
                </p>
                <h3 className="mt-2 font-serif text-xl text-primary">{member.name}</h3>
                {member.note ? (
                  <p className="mt-4 text-sm italic text-foreground/60">{member.note}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        {featured ? (
          <Reveal delay={0.18}>
            <article className="mx-auto mt-6 max-w-md rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 via-secondary/60 to-card/80 p-8 text-center shadow-lg shadow-accent/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1.5">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/30">
                <Users className="h-7 w-7" aria-hidden />
              </span>
              <p className="mt-5 text-xs uppercase tracking-[0.22em] text-accent">
                {featured.relation}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight text-primary">
                {featured.name}
              </h3>
              {featured.note ? (
                <p className="mt-4 text-sm italic text-foreground/60">{featured.note}</p>
              ) : null}
            </article>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
