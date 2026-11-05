import { createFileRoute } from "@tanstack/react-router";
import { SecuritePage, securiteHead } from "@/components/ia/pages";

export const Route = createFileRoute("/securite")({
  head: () => securiteHead("fr"),
  component: SecuritePage,
});
