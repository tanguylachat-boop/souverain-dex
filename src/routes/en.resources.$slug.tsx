import { createFileRoute, notFound } from "@tanstack/react-router";
import { ResourcePage, resourceHead } from "@/components/ia/pages";
import { resourceBySlug } from "@/content/ia/en/ressources";

export const Route = createFileRoute("/en/resources/$slug")({
  loader: ({ params }) => {
    const resource = resourceBySlug(params.slug);
    // An unknown slug answers 404, not an empty page in 200.
    if (!resource) throw notFound();
    return resource;
  },
  head: ({ loaderData }) => (loaderData ? resourceHead("en", loaderData) : {}),
  component: Article,
});

function Article() {
  const r = Route.useLoaderData();
  return <ResourcePage r={r} />;
}
