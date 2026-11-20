import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/components/ia/pages";

/** English home page, at /en. The body and the tags live in components/ia/pages.tsx. */
export const Route = createFileRoute("/en/")({
  head: () => homeHead("en"),
  component: HomePage,
});
