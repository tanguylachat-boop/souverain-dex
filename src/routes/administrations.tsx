import { createFileRoute } from "@tanstack/react-router";
import { MetierPage, metierHead } from "@/components/ia/MetierPage";
import { metierBySlug } from "@/content/ia/metiers";

const metier = metierBySlug("administrations");
if (!metier) throw new Error("Contenu manquant : administrations");

export const Route = createFileRoute("/administrations")({
  head: () => metierHead(metier),
  component: () => <MetierPage metier={metier} />,
});
