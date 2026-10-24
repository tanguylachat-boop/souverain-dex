import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Les anciens articles ont gardé leur slug sous /ressources. L'article sur
 * la visibilité dans les assistants IA a été retiré : il renvoie à l'accueil.
 */
export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (params.slug === "pourquoi-chatgpt-cite-votre-concurrent") {
      throw redirect({ to: "/", statusCode: 301 });
    }
    throw redirect({ to: "/ressources/$slug", params: { slug: params.slug }, statusCode: 301 });
  },
});
