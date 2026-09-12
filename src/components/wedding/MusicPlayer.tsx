import { useCallback, useEffect, useRef, useState } from "react";
import { Disc3, Pause, Play } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { weddingConfig } from "@/config/weddingConfig";

const STORAGE_KEY = "wedding_music_preference";
const FADE_MS = 1500;

type Preference = "playing" | "muted";

function readPreference(): Preference | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "playing" || v === "muted" ? v : null;
  } catch {
    return null;
  }
}

function writePreference(value: Preference) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable — preference simply won't persist */
  }
}

function isTouchLikeDevice() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const mobileUa = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(ua);
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  return mobileUa || coarse || navigator.maxTouchPoints > 0;
}

export function MusicPlayer() {
  const config = weddingConfig.backgroundMusic;
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  /* ---------- volume fading ---------- */
  const fadeTo = useCallback(
    (target: number, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (fadeRef.current) window.clearInterval(fadeRef.current);

      const start = audio.volume;
      const startedAt = performance.now();
      fadeRef.current = window.setInterval(() => {
        const t = Math.min(1, (performance.now() - startedAt) / FADE_MS);
        audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
        if (t >= 1) {
          if (fadeRef.current) window.clearInterval(fadeRef.current);
          fadeRef.current = null;
          onDone?.();
        }
      }, 40);
    },
    [],
  );

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    audio.muted = false;
    audio.volume = 0;
    try {
      await audio.play();
      fadeTo(config.volume);
      setPlaying(true);
      writePreference("playing");
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  }, [config.volume, fadeTo]);

  const stopPlayback = useCallback(
    (persist = true) => {
      const audio = audioRef.current;
      if (!audio) return;
      setPlaying(false);
      if (persist) writePreference("muted");
      fadeTo(0, () => audio.pause());
    },
    [fadeTo],
  );

  /* ---------- first visit / returning visitor ---------- */
  useEffect(() => {
    setMounted(true);
    if (!config.enabled) return;

    const preference = readPreference();

    if (preference === null && isTouchLikeDevice()) {
      setShowWelcome(true);
      return;
    }

    if (preference === "playing") {
      // Browsers may still block this: fall back to unlocking on first gesture.
      void startPlayback().then((ok) => {
        if (!ok) armGestureUnlock();
      });
    }

    function armGestureUnlock() {
      const unlock = () => {
        void startPlayback();
        removeListeners();
      };
      const removeListeners = () => {
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("touchstart", unlock);
      };
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
      window.addEventListener("touchstart", unlock, { once: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.enabled]);

  useEffect(() => {
    return () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
  }, []);

  if (!config.enabled) return null;

  const couple = weddingConfig.couple;

  return (
    <>
      {/* Always starts muted; audio is only unmuted after a user gesture. */}
      <audio ref={audioRef} src={config.src} loop preload="none" muted playsInline />

      <AnimatePresence>
        {mounted && showWelcome ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-primary/85 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm rounded-3xl border border-accent/40 bg-background/95 p-9 text-center"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-accent/50 font-serif text-lg tracking-[0.18em] text-accent">
                {couple.monogram}
              </span>
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.36em] text-accent">Welcome</p>
              <h2 id="welcome-title" className="mt-3 font-serif text-2xl leading-snug text-primary">
                Welcome to {couple.bride.firstName} &amp; {couple.groom.firstName}&rsquo;s Wedding
                Celebration
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/65">
                This invitation is best experienced with music.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowWelcome(false);
                  void startPlayback();
                }}
                className="mt-8 w-full rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground"
              >
                Enter with music
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowWelcome(false);
                  writePreference("muted");
                }}
                className="mt-4 text-xs uppercase tracking-[0.24em] text-foreground/50 underline underline-offset-4 transition-colors hover:text-accent"
              >
                Continue muted
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3">
        <AnimatePresence>
          {showTooltip ? (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="hidden rounded-full border border-accent/30 bg-background/80 px-4 py-2 text-xs tracking-wide text-primary backdrop-blur-md sm:block"
            >
              {playing ? `Now playing · ${config.title}` : `Play ${config.title}`}
            </motion.span>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => (playing ? stopPlayback() : void startPlayback())}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-pressed={playing}
          aria-label={playing ? `Pause background music: ${config.title}` : `Play background music: ${config.title}`}
          title={config.title}
          className="group relative grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-background/60 text-primary shadow-lg shadow-primary/15 backdrop-blur-xl transition-transform duration-200 hover:scale-105"
        >
          <motion.span
            aria-hidden
            className="absolute inset-1.5 rounded-full border border-dashed border-accent/40"
            animate={playing && !reduce ? { rotate: 360 } : { rotate: 0 }}
            transition={
              playing && !reduce
                ? { repeat: Infinity, ease: "linear", duration: 8 }
                : { duration: 0.3 }
            }
          />
          {playing ? (
            <Pause className="h-5 w-5 text-accent" aria-hidden />
          ) : mounted ? (
            <Play className="ml-0.5 h-5 w-5 text-accent" aria-hidden />
          ) : (
            <Disc3 className="h-5 w-5 text-accent" aria-hidden />
          )}
        </button>
      </div>
    </>
  );
}
