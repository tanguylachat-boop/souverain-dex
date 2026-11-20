import { createFileRoute } from "@tanstack/react-router";
import { ResourcesPage, resourcesHead } from "@/components/ia/pages";

export const Route = createFileRoute("/en/resources/")({
  head: () => resourcesHead("en"),
  component: ResourcesPage,
});
