import { createFileRoute } from "@tanstack/react-router";
import { MetierPage, metierHead } from "@/components/ia/MetierPage";
import { metierBySlug } from "@/content/ia/metiers";

const metier = metierBySlug("fiduciaires");
if (!metier) throw new Error("Contenu manquant : fiduciaires");

export const Route = createFileRoute("/fiduciaires")({
  head: () => metierHead(metier),
  component: () => <MetierPage metier={metier} />,
});
