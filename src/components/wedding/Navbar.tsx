import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { weddingConfig } from "@/config/weddingConfig";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-accent/20 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4"
      >
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/50 font-serif text-sm tracking-[0.15em] text-accent">
            {weddingConfig.couple.monogram}
          </span>
          <span className="truncate font-serif text-base text-primary sm:text-lg">
            {weddingConfig.couple.bride.firstName} &amp; {weddingConfig.couple.groom.firstName}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {weddingConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/40 text-primary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-accent/20 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
              {weddingConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-accent/10 py-4 font-serif text-lg text-primary last:border-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
