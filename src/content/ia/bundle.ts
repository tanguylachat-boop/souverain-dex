/**
 * Tout le contenu, par langue. Le français est la langue de base (fichiers
 * à la racine de content/ia), l'anglais vit dans content/ia/en avec la même
 * forme, garantie par les types de shape.ts. Les imports portent l'extension
 * .ts : les scripts (og, dossier:pdf, sitemap) chargent ce fichier avec Node
 * directement, sans bundler.
 */
import type { Lang } from "./lang.ts";
import type { Content, UiContent } from "./shape.ts";
import * as frSite from "./site.ts";
import * as frHome from "./home.ts";
import * as frSecurite from "./securite.ts";
import * as frMetiers from "./metiers.ts";
import * as frRessources from "./ressources.ts";
import * as frUi from "./ui.ts";
import * as enSite from "./en/site.ts";
import * as enHome from "./en/home.ts";
import * as enSecurite from "./en/securite.ts";
import * as enMetiers from "./en/metiers.ts";
import * as enRessources from "./en/ressources.ts";
import * as enUi from "./en/ui.ts";

export type { Content };

export const CONTENT: Record<Lang, Content> = {
  fr: {
    site: frSite,
    home: frHome,
    securite: frSecurite,
    metiers: frMetiers,
    ressources: frRessources,
    ui: frUi,
  },
  en: {
    site: enSite,
    home: enHome,
    securite: enSecurite,
    metiers: enMetiers,
    ressources: enRessources,
    ui: enUi,
  },
};

/** Le contenu d'une langue, avec `ui` déjà déplié et la langue elle-même. */
export type Pack = Omit<Content, "ui"> & { ui: UiContent["UI"]; lang: Lang };

export function content(lang: Lang): Pack {
  const c = CONTENT[lang];
  return {
    site: c.site,
    home: c.home,
    securite: c.securite,
    metiers: c.metiers,
    ressources: c.ressources,
    ui: c.ui.UI,
    lang,
  };
}
