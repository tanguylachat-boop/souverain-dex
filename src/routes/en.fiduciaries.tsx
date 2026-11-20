import { createFileRoute } from "@tanstack/react-router";
import { MetierPage, metierHead } from "@/components/ia/MetierPage";
import { metierBySlug } from "@/content/ia/en/metiers";

const metier = metierBySlug("fiduciaries");
if (!metier) throw new Error("Missing content : fiduciaries");

export const Route = createFileRoute("/en/fiduciaries")({
  head: () => metierHead(metier),
  component: () => <MetierPage metier={metier} />,
});
