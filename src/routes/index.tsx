import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { DifferenceSection } from "@/components/landing/DifferenceSection";
import { RoiSection } from "@/components/landing/RoiSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { SwissPremiumSection } from "@/components/landing/SwissPremiumSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050507", color: "#f0f0f2" }}>
      <SiteHeader />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <DifferenceSection />
      <RoiSection />
      <SwissPremiumSection />
      <SocialProofSection />
      <AudienceSection />
      <DemoSection />
      <SiteFooter />
    </main>
  );
}
