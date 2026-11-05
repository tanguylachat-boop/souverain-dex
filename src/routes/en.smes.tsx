import { createFileRoute } from "@tanstack/react-router";
import { MetierPage, metierHead } from "@/components/ia/MetierPage";
import { metierBySlug } from "@/content/ia/en/metiers";

const metier = metierBySlug("smes");
if (!metier) throw new Error("Missing content : smes");

export const Route = createFileRoute("/en/smes")({
  head: () => metierHead(metier),
  component: () => <MetierPage metier={metier} />,
});
