import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-xs uppercase tracking-[0.38em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl leading-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      {intro ? <p className="mt-5 text-base leading-relaxed text-foreground/70">{intro}</p> : null}
    </Reveal>
  );
}
