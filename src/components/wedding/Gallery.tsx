import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { weddingConfig } from "@/config/weddingConfig";
import { Reveal, SectionHeading } from "./Reveal";

export function Gallery() {
  const { gallery } = weddingConfig;
  const items = gallery.items;
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <section id="gallery" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.src + i} delay={(i % 3) * 0.06}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Open image: ${item.caption}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-accent/20"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/70 to-transparent p-3 text-left text-xs uppercase tracking-[0.2em] text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30 text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30 text-primary-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30 text-primary-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85svh] max-w-3xl"
            >
              <img
                src={items[index]?.src}
                alt={items[index]?.alt ?? ""}
                className="max-h-[75svh] w-auto rounded-2xl object-contain"
              />
              <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.28em] text-primary-foreground/80">
                {items[index]?.caption}
              </figcaption>

            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
