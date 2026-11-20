import { createFileRoute, redirect } from "@tanstack/react-router";
import { SITE } from "@/content/ia/site";

/**
 * Lien court à envoyer aux clients pour un avis : lxstudio.ch/avis ouvre le
 * formulaire d'avis de la fiche Google. Redirection temporaire (302), pour
 * pouvoir changer la cible sans qu'un navigateur garde l'ancienne en cache.
 * La même règle est dans public/_redirects.
 */
export const Route = createFileRoute("/avis")({
  beforeLoad: () => {
    throw redirect({ href: SITE.profiles.googleReview, statusCode: 302 });
  },
});
