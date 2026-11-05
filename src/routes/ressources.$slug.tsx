import { createFileRoute, notFound } from "@tanstack/react-router";
import { ResourcePage, resourceHead } from "@/components/ia/pages";
import { resourceBySlug } from "@/content/ia/ressources";

export const Route = createFileRoute("/ressources/$slug")({
  loader: ({ params }) => {
    const resource = resourceBySlug(params.slug);
    // Un mauvais slug doit répondre 404, pas une page vide en 200.
    if (!resource) throw notFound();
    return resource;
  },
  head: ({ loaderData }) => (loaderData ? resourceHead("fr", loaderData) : {}),
  component: Article,
});

function Article() {
  const r = Route.useLoaderData();
  return <ResourcePage r={r} />;
}
