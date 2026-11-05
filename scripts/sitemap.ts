/**
 * Le plan du site, généré depuis le contenu pour que les dates et les
 * paires de langues ne dérivent jamais :
 *
 *   npm run sitemap
 *
 * Sortie : public/sitemap.xml. Chaque URL française traduite porte ses trois
 * alternates (fr-CH, en, x-default sur le français), l'URL anglaise aussi.
 * Les anciens articles, non traduits, n'ont que fr-CH et x-default. Les
 * pages légales, en noindex, n'y figurent pas. Pas de priority ni de
 * changefreq : Google les ignore.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENT } from "../src/content/ia/bundle.ts";
import { PAGE_PAIRS, alternates } from "../src/content/ia/lang.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://lxstudio.ch";
const abs = (p: string) => (p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`);

/**
 * Date du dernier changement de fond des pages fixes. À mettre à jour quand
 * un texte de l'accueil, d'une page métier ou de la page sécurité change
 * (les articles portent leur propre date `updated`).
 */
const PAGES_UPDATED = "2026-11-05";
const NOINDEX = new Set([
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/en/legal-notice",
  "/en/privacy-policy",
]);

const fr = CONTENT.fr;
const en = CONTENT.en;

/** La date d'un chemin : celle de l'article s'il en est un, sinon celle des pages fixes. */
function lastmod(path: string): string {
  const frSlug = path.startsWith("/ressources/") ? path.slice("/ressources/".length) : null;
  const enSlug = path.startsWith("/en/resources/") ? path.slice("/en/resources/".length) : null;
  const r = frSlug
    ? fr.ressources.resourceBySlug(frSlug)
    : enSlug
      ? en.ressources.resourceBySlug(enSlug)
      : undefined;
  if (frSlug || enSlug) {
    if (!r) throw new Error(`Article inconnu dans le sitemap : ${path}`);
    return r.updated ?? r.published;
  }
  return PAGES_UPDATED;
}

const paths: string[] = [];
for (const [frPath, enPath] of PAGE_PAIRS) {
  if (NOINDEX.has(frPath)) continue;
  paths.push(frPath, enPath);
}
// Les articles français sans version anglaise.
for (const r of fr.ressources.ALL_RESOURCES) {
  const p = `/ressources/${r.slug}`;
  if (!paths.includes(p)) paths.push(p);
}

const entries = paths
  .map((p) => {
    const alt = alternates(p);
    const links = [
      alt.fr ? `    <xhtml:link rel="alternate" hreflang="fr-CH" href="${abs(alt.fr)}"/>` : "",
      alt.en ? `    <xhtml:link rel="alternate" hreflang="en" href="${abs(alt.en)}"/>` : "",
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(alt.fr ?? p)}"/>`,
    ]
      .filter(Boolean)
      .join("\n");
    return `  <url>\n    <loc>${abs(p)}</loc>\n    <lastmod>${lastmod(p)}</lastmod>\n${links}\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
const target = resolve(root, "public/sitemap.xml");
writeFileSync(target, xml);
console.log(`sitemap : ${paths.length} URL écrites dans ${target}`);
