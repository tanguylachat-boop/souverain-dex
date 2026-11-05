import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/components/ia/pages";

/** Page d'accueil en français. Le corps et les balises sont dans components/ia/pages.tsx. */
export const Route = createFileRoute("/")({
  head: () => homeHead("fr"),
  component: HomePage,
});
