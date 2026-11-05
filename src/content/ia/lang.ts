/**
 * Les langues du site. Le français de Suisse est la langue de base, à la
 * racine ; l'anglais vit sous /en. Chaque page traduite a son pendant dans
 * PAGE_PAIRS, ce qui donne les balises hreflang, le sélecteur de langue et le
 * plan du site.
 */
export type Lang = "fr" | "en";
export const LANGS: ReadonlyArray<Lang> = ["fr", "en"];
export const DEFAULT_LANG: Lang = "fr";

/** La langue d'un chemin : /en et /en/... sont en anglais, tout le reste en français. */
export function langOf(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/** Les pages qui existent dans les deux langues : chemin français, chemin anglais. */
export const PAGE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["/", "/en"],
  ["/fiduciaires", "/en/fiduciaries"],
  ["/administrations", "/en/public-administrations"],
  ["/pme", "/en/smes"],
  ["/securite", "/en/security"],
  ["/ressources", "/en/resources"],
  ["/mentions-legales", "/en/legal-notice"],
  ["/politique-de-confidentialite", "/en/privacy-policy"],
  ["/ressources/ia-locale-entreprise-suisse", "/en/resources/local-ai-switzerland"],
  ["/ressources/chatgpt-nlpd-entreprise", "/en/resources/chatgpt-swiss-data-protection-act"],
  ["/ressources/secret-professionnel-ia", "/en/resources/professional-secrecy-ai"],
  [
    "/ressources/fiduciaire-automatiser-saisie-pieces-ia",
    "/en/resources/accounting-firm-automate-bookkeeping-ai",
  ],
];

/** Le même contenu dans l'autre langue, ou null si la page n'est pas traduite. */
export function alternate(pathname: string): string | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  for (const [fr, en] of PAGE_PAIRS) {
    if (clean === fr) return en;
    if (clean === en) return fr;
  }
  return null;
}

/** Les chemins hreflang d'une page : français, anglais, et la version par défaut (français). */
export function alternates(pathname: string): { fr?: string; en?: string } {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  for (const [fr, en] of PAGE_PAIRS) {
    if (clean === fr || clean === en) return { fr, en };
  }
  return langOf(clean) === "fr" ? { fr: clean } : { en: clean };
}
