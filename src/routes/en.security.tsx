import { createFileRoute } from "@tanstack/react-router";
import { SecuritePage, securiteHead } from "@/components/ia/pages";

export const Route = createFileRoute("/en/security")({
  head: () => securiteHead("en"),
  component: SecuritePage,
});
