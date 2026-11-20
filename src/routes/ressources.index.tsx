import { createFileRoute } from "@tanstack/react-router";
import { ResourcesPage, resourcesHead } from "@/components/ia/pages";

export const Route = createFileRoute("/ressources/")({
  head: () => resourcesHead("fr"),
  component: ResourcesPage,
});
