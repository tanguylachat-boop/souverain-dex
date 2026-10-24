import { createFileRoute, redirect } from "@tanstack/react-router";

/** Ancienne adresse de la page fiduciaire : redirection permanente. */
export const Route = createFileRoute("/fiduciaire")({
  beforeLoad: () => {
    throw redirect({ to: "/fiduciaires", statusCode: 301 });
  },
});
