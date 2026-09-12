import heroCouple from "@/assets/hero-couple.jpg";
import haldi from "@/assets/haldi.jpg";
import haldiMornings from "@/assets/haldi-mornings.jpg.asset.json";
import sangeet from "@/assets/sangeet.jpg";
import mandap from "@/assets/mandap.jpg";
import mehendi from "@/assets/mehendi.jpg";
import venueTemple from "@/assets/venue-temple.jpg";
import goldenHourCouple from "@/assets/golden-hour-couple.jpeg.asset.json";

/**
 * Single source of truth for the entire invitation.
 * Change values here — never hardcode copy inside components.
 */

export type WeddingEvent = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  date: string; // human readable
  isoDate: string; // yyyy-mm-dd
  time: string;
  dressCode: string;
  venue: string;
  image: string;
};

export type FamilyMember = {
  name: string;
  relation: string;
  side: "bride" | "groom";
  note?: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const weddingConfig = {
  couple: {
    bride: { firstName: "Khushi", lastName: "Jain", fullName: "Khushi Jain" },
    groom: { firstName: "Anuj", lastName: "Patni", fullName: "Anuj Patni" },
    monogram: "AK",
    hashtag: "#ANUSHI",
    subtitle: "Two families, one celebration — and a lifetime that begins in Chandkheri.",
    weddingDate: "21st November 2026",
    weddingIsoDate: "2026-11-21T10:00:00+05:30",
    heroImage: heroCouple,
    heroImageAlt: "Khushi and Anuj in golden-hour wedding attire",
  },

  seo: {
    title: "Khushi & Anuj — 21 November 2026 | #ANUSHI",
    description:
      "Join Khushi Jain and Anuj Patni for Haldi, Sangeet and the wedding ceremony at Chandkheri Digambar Jain Mandir, 20–21 November 2026.",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "Celebrations", href: "#celebrations" },
    { label: "Family", href: "#family" },
    { label: "Venue", href: "#venue" },
    { label: "Gallery", href: "#gallery" },
  ],

  story: {
    eyebrow: "Our Celebrations",
    title: "Two days of light, colour and laughter",
    intro:
      "Every ritual carries a little of our story. We would love for you to be part of each one.",
  },

  events: [
    {
      id: "haldi",
      name: "Haldi Carnival",
      tagline: "Marigolds, turmeric and mischief",
      description:
        "A sun-drenched morning of turmeric, dhol beats and open-air feasting. Wear something you don't mind staining in gold.",
      date: "20th November 2026",
      isoDate: "2026-11-20",
      time: "10:00 AM onwards",
      dressCode: "Colourful",
      venue: "Chandkheri Jain Mandir Grounds",
      image: haldi,
    },
    {
      id: "sangeet",
      name: "Sangeet Night",
      tagline: "Fairy lights and full-hearted dancing",
      description:
        "An evening of performances by both families, live music and a dance floor that refuses to close early.",
      date: "20th November 2026",
      isoDate: "2026-11-20",
      time: "7:30 PM onwards",
      dressCode: "Indian festive glam",
      venue: "Chandkheri Jain Mandir Banquet Lawn",
      image: sangeet,
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      tagline: "Saat Phere — seven vows, one promise",
      description:
        "The ceremony that ties it all together, under a floral mandap in the courtyard of the temple, followed by lunch.",
      date: "21st November 2026",
      isoDate: "2026-11-21",
      time: "08:00 AM onwards",
      dressCode: "Traditional finery",
      venue: "Chandkheri Digambar Jain Mandir",
      image: mandap,
    },
  ] satisfies WeddingEvent[],

  family: {
    eyebrow: "With Blessings From",
    title: "Our families",
    intro: "The people who raised us, teased us and are now marrying us off with great joy.",
    members: [
      { name: "Smt.Anupama & Shri Amit Jain", relation: "Parents of the Bride", side: "bride", note: "" },
      { name: "Smt. Manju& Shri Vinod Patni", relation: "Parents of the Groom", side: "groom", note: "" },
      { name: "VISHWA PARIWAR JHANSI-RAIPUR", relation: "Regards", side: "bride", note: "" },
    ] satisfies FamilyMember[],
  },

  venue: {
    eyebrow: "The Setting",
    name: "Chandkheri Digambar Jain Mandir",
    shortName: "Chandkheri Jain Mandir",
    address: "Chandkheri, Khanpur, Jhalawar District, Rajasthan, India",
    note: "A centuries-old temple complex, at its most beautiful in the November light.",
    image: venueTemple,
    imageAlt: "Pink sandstone facade of Chandkheri Digambar Jain Mandir with carved arches",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Chandkheri+Digambar+Jain+Mandir+Khanpur+Jhalawar",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Chandkheri%20Digambar%20Jain%20Mandir%20Khanpur%20Jhalawar&output=embed",
  },

  gallery: {
    eyebrow: "Moments",
    title: "A glimpse of what's coming",
    items: [
      { src: goldenHourCouple.url, alt: "Khushi and Anuj in traditional attire with a floral backdrop", caption: "Golden hour" },
      { src: haldiMornings.url, alt: "Colourful Haldi morning tent decor with marigolds and woven lanterns", caption: "Haldi mornings" },
      { src: mehendi, alt: "Bridal mehendi on hands with gold bangles", caption: "Mehendi detail" },
      { src: sangeet, alt: "Sangeet night with fairy lights", caption: "Sangeet nights" },
      { src: mandap, alt: "Floral mandap with candles", caption: "The mandap" },
      { src: venueTemple.url, alt: "Pink sandstone facade of Chandkheri Digambar Jain Mandir", caption: "Chandkheri" },
    ] satisfies GalleryItem[],
  },

  backgroundMusic: {
    enabled: true,
    title: "Mehmaan",
    src: "/__l5e/assets-v1/0638031e-b6eb-4343-aadd-10781987fe46/Mehmaan.mp3",
    volume: 0.35,
  },

  footer: {
    note: "Made with love for Khushi & Anuj",
  },
};

export type WeddingConfig = typeof weddingConfig;
