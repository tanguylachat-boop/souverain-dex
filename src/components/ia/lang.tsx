import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { langOf, type Lang } from "@/content/ia/lang";
import { content, type Pack } from "@/content/ia/bundle";

/** La langue de la page affichée, déduite de son chemin (/en et /en/... en anglais). */
export function useLang(): Lang {
  return langOf(useRouterState({ select: (s) => s.location.pathname }));
}

/** Le contenu de la langue affichée, module par module, `ui` déjà déplié. */
export function useContent(): Pack {
  return content(useLang());
}

/**
 * Un lien interne dont la cible vient du contenu (donc typée `string`), au
 * lieu de l'union des routes que `Link` attend. La navigation côté client
 * reste celle du routeur.
 */
export function L({
  to,
  hash,
  children,
  ...rest
}: { to: string; hash?: string; children?: ReactNode } & Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
>) {
  const props = { ...rest, to, hash, children } as unknown as ComponentProps<typeof Link>;
  return <Link {...props} />;
}

/** Une date ISO (aaaa-mm-jj) au format suisse jj.mm.aaaa, identique dans les deux langues. */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
}
