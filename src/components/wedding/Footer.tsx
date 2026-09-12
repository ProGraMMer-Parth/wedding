import { weddingConfig } from "@/config/weddingConfig";

export function Footer() {
  const { couple, footer, venue } = weddingConfig;
  return (
    <footer className="border-t border-accent/20 px-5 py-14 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-accent/50 font-serif text-base tracking-[0.15em] text-accent">
        {couple.monogram}
      </span>
      <p className="mt-6 font-serif text-2xl text-primary">
        {couple.bride.fullName} &amp; {couple.groom.fullName}
      </p>
      <p className="mt-2 text-sm text-foreground/60">
        {couple.weddingDate} · {venue.shortName}
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent">{couple.hashtag}</p>
      <p className="mt-4 text-xs text-foreground/40">{footer.note}</p>
    </footer>
  );
}
