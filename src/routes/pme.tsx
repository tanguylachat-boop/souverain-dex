import { createFileRoute } from "@tanstack/react-router";
import { MetierPage, metierHead } from "@/components/ia/MetierPage";
import { metierBySlug } from "@/content/ia/metiers";

const metier = metierBySlug("pme");
if (!metier) throw new Error("Contenu manquant : pme");

export const Route = createFileRoute("/pme")({
  head: () => metierHead(metier),
  component: () => <MetierPage metier={metier} />,
});
