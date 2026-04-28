import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { DifferenceSection } from "@/components/landing/DifferenceSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agent IA souverain pour fiduciaires suisses" },
      {
        name: "description",
        content:
          "L'agent IA local qui scanne, classe et automatise vos documents — vos données restent dans votre cabinet. Conforme LPD et secret professionnel suisse.",
      },
      { property: "og:title", content: "Agent IA souverain pour fiduciaires suisses" },
      {
        property: "og:description",
        content:
          "Hardware dédié installé chez vous. Vos données ne sortent jamais de votre LAN. Conforme LPD.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_CH" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <DifferenceSection />
      <AudienceSection />
      <DemoSection />
      <SiteFooter />
    </main>
  );
}
