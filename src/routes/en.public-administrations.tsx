import { createFileRoute } from "@tanstack/react-router";
import { MetierPage, metierHead } from "@/components/ia/MetierPage";
import { metierBySlug } from "@/content/ia/en/metiers";

const metier = metierBySlug("public-administrations");
if (!metier) throw new Error("Missing content : public-administrations");

export const Route = createFileRoute("/en/public-administrations")({
  head: () => metierHead(metier),
  component: () => <MetierPage metier={metier} />,
});
