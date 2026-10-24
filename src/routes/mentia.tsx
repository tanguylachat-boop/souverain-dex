import { createFileRoute, redirect } from "@tanstack/react-router";

/** Produit retiré du site : redirection permanente vers l'accueil. */
export const Route = createFileRoute("/mentia")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
