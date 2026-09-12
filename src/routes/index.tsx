import { createFileRoute } from "@tanstack/react-router";
import { weddingConfig } from "@/config/weddingConfig";
import { Navbar } from "@/components/wedding/Navbar";
import { Hero } from "@/components/wedding/Hero";
import { Celebrations } from "@/components/wedding/Celebrations";
import { Family } from "@/components/wedding/Family";
import { Venue } from "@/components/wedding/Venue";
import { Gallery } from "@/components/wedding/Gallery";
import { Footer } from "@/components/wedding/Footer";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: weddingConfig.seo.title },
      { name: "description", content: weddingConfig.seo.description },
      { property: "og:title", content: weddingConfig.seo.title },
      { property: "og:description", content: weddingConfig.seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Celebrations />
        <Family />
        <Venue />
        <Gallery />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}
