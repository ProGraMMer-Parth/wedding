import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { weddingConfig } from "@/config/weddingConfig";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const { couple } = weddingConfig;

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={couple.heroImage}
          alt={couple.heroImageAlt}
          width={1280}
          height={1920}
          className="h-[115%] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute inset-0 bg-background/25" />

      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 py-28 text-center">
        <motion.div {...fade(0.1)}>
          <span className="grid h-20 w-20 place-items-center rounded-full border border-accent/60 bg-background/40 font-serif text-2xl tracking-[0.2em] text-accent backdrop-blur-sm">
            {couple.monogram}
          </span>
        </motion.div>

        <motion.p
          {...fade(0.25)}
          className="mt-8 text-[0.7rem] uppercase tracking-[0.42em] text-accent-foreground/75"
        >
          Together with our families
        </motion.p>

        <motion.h1
          {...fade(0.35)}
          className="mt-6 font-serif text-[2.75rem] leading-[1.05] text-primary sm:text-6xl md:text-7xl"
        >
          {couple.bride.firstName}
          <span className="mx-3 text-accent">&amp;</span>
          {couple.groom.firstName}
        </motion.h1>

        <motion.p
          {...fade(0.45)}
          className="mt-6 max-w-md text-balance text-sm leading-relaxed text-foreground/75 sm:text-base"
        >
          {couple.subtitle}
        </motion.p>

        <motion.div {...fade(0.55)} className="mt-8 flex items-center gap-4">
          <span className="h-px w-10 bg-accent/60" />
          <p className="font-serif text-lg tracking-[0.12em] text-primary sm:text-xl">
            {couple.weddingDate}
          </p>
          <span className="h-px w-10 bg-accent/60" />
        </motion.div>

        <motion.div {...fade(0.65)} className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#celebrations"
            className="rounded-full bg-primary px-9 py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-105"
          >
            View Celebrations
          </a>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{couple.hashtag}</p>
        </motion.div>
      </div>
    </section>
  );
}
