import { createFileRoute, redirect } from "@tanstack/react-router";

/** L'ancien journal vit désormais sous /ressources. */
export const Route = createFileRoute("/blog/")({
  beforeLoad: () => {
    throw redirect({ to: "/ressources", statusCode: 301 });
  },
});
