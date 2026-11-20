# Audit sitemap et robots.txt : lxstudio.ch

Date de l'audit : 05.11.2026. Périmètre : `https://lxstudio.ch/sitemap.xml`, `https://lxstudio.ch/robots.txt`, les 15 URL déclarées, le crawl des liens internes depuis l'accueil, et la source du site (`~/souverain-dex`, `origin/main` à `60339d4`, fusion de la PR #17 le 26.10.2026 à 23:52).

Méthode : `xmllint` (syntaxe et schéma sitemap 0.9), requête HTTP sans suivi de redirection sur chaque URL (statut, `Location`, `X-Robots-Tag`), analyse du HTML servi (canonical, meta robots, hreflang, `lang`), crawl en largeur de tous les `<a href>` internes, diff git entre la refonte du 24.10 (`6037a7c`) et `origin/main`, marqueurs de contenu contrôlés en production.

## 1. Score : 84/100

| Critère | Poids | Note | Justification |
|---|---|---|---|
| Validité XML, schéma, encodage, taille | 15 | 15 | Bien formé, valide contre `sitemap.xsd`, UTF-8 sans BOM, 15 URL, 2 864 octets, très loin des limites (50 000 URL, 50 Mo) |
| Accessibilité et déclaration | 10 | 10 | HTTP 200, `Content-Type: application/xml`, déclaré dans robots.txt en URL absolue sur le bon hôte |
| Qualité des URL | 25 | 25 | 15 sur 15 en 200, canonical identique à `<loc>`, aucune meta robots ni `X-Robots-Tag`, aucune redirection |
| Couverture | 20 | 20 | Crawl : 17 pages HTML = 15 du sitemap + 2 pages légales en `noindex, follow` voulues. 0 page manquante, 0 URL en trop |
| Exactitude des lastmod | 20 | 8 | 9 pages sur 15 ont changé en production le 26.10 et restent datées du 24.10 ; le fichier est écrit à la main, rien n'empêche la prochaine dérive |
| Hygiène | 10 | 6 | `priority` et `changefreq` inutiles, www en 302, slash final en 307, casse des URL non stricte |

Le fichier est structurellement irréprochable et la couverture est exacte. Les points perdus viennent uniquement des dates et de l'absence de mécanisme pour les tenir à jour.

## 2. Validation du fichier

| Contrôle | Sévérité | Résultat |
|---|---|---|
| XML bien formé (`xmllint --noout`) | Critique | Passe |
| Conforme au schéma `http://www.sitemaps.org/schemas/sitemap/0.9` | Critique | Passe (`sitemap.xml validates`) |
| Encodage UTF-8, déclaration XML, pas de BOM | Critique | Passe (`3c3f786d6c` = `<?xml`) |
| Nombre d'URL : 15 (limite 50 000) | Critique | Passe, aucun index de sitemaps nécessaire |
| Taille : 2 864 octets (limite 50 Mo) | Critique | Passe |
| `<loc>` absolus, https, même hôte, sans paramètre ni fragment | Haute | Passe |
| URL en non-200 | Haute | Aucune |
| URL en noindex | Haute | Aucune |
| URL redirigée | Moyenne | Aucune |
| Format des `lastmod` (W3C `AAAA-MM-JJ`) | Moyenne | Passe |
| Tous les `lastmod` identiques | Faible | Non : 10 au 2026-10-24, 5 au 2026-09-23 |
| Exactitude des `lastmod` | Moyenne | Échoue sur 9 URL (section 5) |
| `priority` / `changefreq` | Info | Présents partout, ignorés par Google, à retirer |
| En-tête `Content-Type` | Faible | `application/xml`, correct |
| Déclaration dans robots.txt | Haute | Passe : `Sitemap: https://lxstudio.ch/sitemap.xml` |

## 3. Tableau des URL

Toutes les pages sont servies en `lang="fr-CH"`, sans meta robots, sans `X-Robots-Tag`, avec deux alternates déjà émis dans le HTML (`hreflang="fr-CH"` et `hreflang="x-default"`, auto-référents).

| URL | Statut | Canonical | lastmod déclaré | Verdict |
|---|---|---|---|---|
| https://lxstudio.ch/ | 200 | identique | 2026-10-24 | En retard : contenu modifié le 26.10 (lien de réservation cal.com sur chaque bouton de diagnostic, textes d'accueil, adresse). Passer à 2026-10-26 |
| https://lxstudio.ch/fiduciaires | 200 | identique | 2026-10-24 | En retard : `metiers.ts` modifié le 26.10 (passages légaux vérifiés sur fedlex). Passer à 2026-10-26 |
| https://lxstudio.ch/administrations | 200 | identique | 2026-10-24 | En retard : idem, 3 blocs modifiés le 26.10. Passer à 2026-10-26 |
| https://lxstudio.ch/pme | 200 | identique | 2026-10-24 | En retard : idem, 1 bloc modifié le 26.10. Passer à 2026-10-26 |
| https://lxstudio.ch/securite | 200 | identique | 2026-10-24 | En retard : `securite.ts` modifié le 26.10 (matériel, mesures, 51 lignes). Passer à 2026-10-26 |
| https://lxstudio.ch/ressources | 200 | identique | 2026-10-24 | Juste : titres et résumés inchangés depuis le 24.10, seuls le pied de page et le bouton ont changé (boilerplate) |
| https://lxstudio.ch/ressources/ia-locale-entreprise-suisse | 200 | identique | 2026-10-24 | En retard : section « Quel matériel il faut vraiment » réécrite le 26.10, « Mac mini Apple avec 64 Go » présent en prod. Passer à 2026-10-26 |
| https://lxstudio.ch/ressources/chatgpt-nlpd-entreprise | 200 | identique | 2026-10-24 | En retard : 3 blocs modifiés le 26.10. Passer à 2026-10-26 |
| https://lxstudio.ch/ressources/secret-professionnel-ia | 200 | identique | 2026-10-24 | En retard : 1 bloc modifié le 26.10. Passer à 2026-10-26 |
| https://lxstudio.ch/ressources/fiduciaire-automatiser-saisie-pieces-ia | 200 | identique | 2026-10-24 | En retard : 4 blocs modifiés le 26.10. Passer à 2026-10-26 |
| https://lxstudio.ch/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment | 200 | identique | 2026-09-23 | Juste : contenu gardé tel quel à la refonte, cohérent avec `datePublished` et `dateModified` du JSON-LD |
| https://lxstudio.ch/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia | 200 | identique | 2026-09-23 | Juste (seul le titre a été reformaté sur deux lignes dans la source) |
| https://lxstudio.ch/ressources/combien-coute-une-automatisation-ia-pme-suisse | 200 | identique | 2026-09-23 | Juste |
| https://lxstudio.ch/ressources/chatgpt-copilot-ou-agent-sur-mesure | 200 | identique | 2026-09-23 | Juste |
| https://lxstudio.ch/ressources/plateforme-automatisation-ou-code | 200 | identique | 2026-09-23 | Juste |

Pages atteintes par le crawl et volontairement hors sitemap :

| URL | Statut | Canonical | Robots | Verdict |
|---|---|---|---|---|
| https://lxstudio.ch/mentions-legales | 200 | identique | `noindex, follow` | Exclue à juste titre |
| https://lxstudio.ch/politique-de-confidentialite | 200 | identique | `noindex, follow` | Exclue à juste titre |

## 4. Couverture : crawl contre sitemap

- Crawl en largeur depuis `https://lxstudio.ch/`, liens internes `<a href>` uniquement : 17 URL HTML atteintes, toutes en 200. Ce sont les 15 URL du sitemap plus les deux pages légales ci-dessus. Aucune autre page HTML n'est liée nulle part.
- Pages indexables absentes du sitemap : aucune.
- URL en trop (404, redirigée, noindex) : aucune.
- Anciennes adresses : `/fiduciaire`, `/mentia`, `/athlit`, `/blog`, `/blog/*` répondent 301 (routes serveur `src/routes/{fiduciaire,mentia,athlit,blog.*}.tsx`, doublées dans `public/_redirects`). Elles sont absentes du sitemap, ce qui est correct. Le sitemap d'avant la refonte (main au 06.10) les listait encore avec les deux pages légales ; le nettoyage du 24.10 est complet.
- `llms.txt` liste exactement les 15 mêmes URL : cohérent avec le sitemap.
- Fichiers non HTML servis : `/dossier-securite-lx-studio.pdf` (200, lié depuis aucune page, voulu non indexé, voir section 8) et `/demo/demo-lx-studio.mp4` (200, vidéo intégrée à l'accueil). Ni l'un ni l'autre n'a sa place dans le sitemap.
- Absents et attendus : `sitemap-index.xml`, `sitemap_index.xml`, `rss.xml`, `feed.xml` en 404 ; `/en` et `/en/` en 404 (pas encore de version anglaise).

## 5. lastmod : plausibilité et mise à jour

Ce qui va : format W3C valide, deux valeurs distinctes (pas de « tout à la même date »), et pour les 9 articles la date du sitemap est identique à `datePublished` et `dateModified` du JSON-LD servi.

Ce qui ne va pas : la production a changé après le 24.10 et le sitemap ne l'a pas suivi.

- Preuve côté source : les commits `8224b5b` (« no draft marks left, legal passages checked on fedlex ») et `daf6a9a` (« identity, booking link and hardware facts filled ») du 26.10, fusionnés dans `main` le 26.10 à 23:52, modifient `home.ts`, `metiers.ts` (hunks dans les trois métiers), `securite.ts`, `ressources.ts` (hunks dans les quatre articles de 2026) et `site.ts`. Les lignes `summary` des articles ne sont pas touchées, donc l'index `/ressources` n'a pas changé.
- Preuve côté production, le 05.11 : le lien `https://cal.com/lx-studio/30min` figure sur les 15 pages (`bookingHref` était vide avant `daf6a9a`), `/mentions-legales` contient « CHE-325.224.095 » et « Rue des Romains », `/ressources/ia-locale-entreprise-suisse` contient « Mac mini Apple avec 64 Go » là où le texte du 24.10 parlait d'une « carte graphique de milieu de gamme ».
- Nature des changements : passages légaux vérifiés, faits matériels, adresse, lien de réservation. Ce sont des modifications de fond, pas du boilerplate : 9 `lastmod` doivent passer au 2026-10-26 (date de fusion ; si la publication Lovable a eu lieu le 27.10, prendre 2026-10-27).
- Anciens articles : `src/content/articles.ts` n'a bougé à la refonte que pour retirer l'article « pourquoi-chatgpt-cite-votre-concurrent » et reformater un titre (commentaire du fichier : « gardés tels quels »). 2026-09-23 reste juste, même si l'URL est passée de `/blog/` à `/ressources/` le 24.10.
- Cause racine : `public/sitemap.xml` est un fichier statique écrit à la main (7 commits depuis mai 2026), aucun champ `updated` n'existe dans `ressources.ts`, `articles.ts` ou `metiers.ts`, et `articleSchema` force `dateModified = published`. Chaque retouche de contenu refera dériver les dates. Google ne tient compte du `lastmod` que s'il est constamment fiable ; un fichier qui se trompe sur 9 URL sur 15 finit ignoré.
- Incohérence voisine, hors sitemap : `/mentions-legales` affiche « Dernière mise à jour : 24.10.2026 » alors que l'IDE et la rue ont été ajoutés le 26.10.

## 6. robots.txt

- HTTP 200, `text/plain; charset=utf-8`, 691 octets, identique à `public/robots.txt` sur `origin/main`.
- `User-agent: *` puis `Allow: /`, aucun `Disallow` : tout est explorable, y compris les deux pages légales. C'est correct : un `noindex` n'est lu que si le robot peut charger la page, il ne faut donc pas les bloquer.
- `Sitemap: https://lxstudio.ch/sitemap.xml` : URL absolue, bon hôte, bon protocole. Passe.
- Groupes explicites `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot-Extended`, `meta-externalagent`, `Bytespider` : tous en `Allow: /`, donc redondants avec `*`, sans effet négatif. Deux précisions : le commentaire affirme que certains robots ne lisent un site que s'ils y trouvent leur nom, ce qui est inexact (un robot sans groupe dédié applique le groupe `*`) ; `anthropic-ai` et `Claude-Web` sont des jetons anciens, les jetons courants sont `ClaudeBot`, `Claude-SearchBot` et `Claude-User` ; `Google-Extended` et `Applebot-Extended` sont des jetons de contrôle d'entraînement, pas des robots d'exploration. Rien à corriger pour le sitemap ; nettoyage optionnel.
- Pas de `Crawl-delay`, pas de `Host`. Bien.

## 7. Hygiène des URL

| Variante | Réponse | Verdict |
|---|---|---|
| `http://lxstudio.ch/` | 301 vers `https://lxstudio.ch/` (Cloudflare) | Passe |
| `https://www.lxstudio.ch/` | 302 vers `https://lxstudio.ch/` (Cloudflare) | Faible : préférer 301, signal permanent |
| `https://lxstudio.ch/fiduciaires/` | 307 vers `/fiduciaires` (serveur applicatif) | Faible : 308 ou 301 préférable ; le canonical compense |
| `https://lxstudio.ch/Fiduciaires` | 200, canonical `/fiduciaires` | Faible : doublon potentiel neutralisé par le canonical ; un 404 ou une 301 serait plus propre (routeur TanStack non sensible à la casse) |
| `https://lxstudio.ch/index.html` | 404 | Passe |
| `/ressources/slug-inconnu` | 404 réel, pas de soft 404 | Passe |
| `/sitemap.xml/` | 307 vers `/sitemap.xml` | Passe |
| `priority` et `changefreq` | présents sur les 15 entrées | Info : ignorés par Google, à retirer pour alléger |

## 8. Hors sitemap mais lié à l'indexabilité : `public/_headers` n'est pas appliqué

`public/_headers` prévoit `X-Robots-Tag: noindex, nofollow` sur le PDF du dossier sécurité, plus `X-Frame-Options`, `Permissions-Policy`, HSTS deux ans avec `preload` et du `Cache-Control` sur `/fonts` et `/og`. En production le 05.11 : PDF sans `X-Robots-Tag`, accueil sans `X-Frame-Options` ni `Permissions-Policy`, HSTS à un an sans `preload`, `/og/accueil.jpg` sans `Cache-Control`. Le déploiement Lovable (Cloudflare Workers) ignore ce fichier, qui est une convention Cloudflare Pages.

Conséquence : le dossier sécurité est indexable dès qu'un lien externe le pointe. Pistes : le servir par une route qui ajoute l'en-tête, ou le retirer de `public/` et l'envoyer par mail après le formulaire (le site dit déjà « sur demande »). `VERIF.md` ligne 23 affirme que l'en-tête est en place : à corriger, la vérification a été faite sur un autre environnement que la prod.

## 9. Sitemap proposé pour la version anglaise sous /en

Règles appliquées :

- Chaque URL, française comme anglaise, porte les trois alternates (`fr-CH`, `en`, `x-default`), y compris vers elle-même. Réciprocité vérifiée par script : 30 URL, 0 erreur.
- `x-default` pointe sur la version française, marché principal.
- Accueil anglais en `https://lxstudio.ch/en` sans slash final : le serveur redirige déjà `/en/` vers `/en` en 307, et le canonical de la page devra être identique à `<loc>`.
- Mêmes slugs sous `/en/` par défaut. Si les slugs anglais sont traduits (`/en/accountants`, `/en/security`, `/en/resources/...`), remplacer tous les `href` `en` : le cluster doit pointer vers les URL réelles, à la lettre près.
- `lastmod` des entrées françaises corrigés. `lastmod` des entrées anglaises volontairement absent (optionnel dans le standard) : à renseigner avec la vraie date de mise en ligne de chaque page, jamais une date inventée.
- `priority` et `changefreq` retirés.
- Ne pas publier ce fichier tant que les pages `/en` ne répondent pas 200 : des alternates vers des 404 sont des erreurs hreflang. D'ici là, publier la moitié française avec les `lastmod` corrigés et sans alternate `en`.
- Validation : bien formé (`xmllint --noout`). La validation contre `sitemap.xsd` s'arrête sur `xhtml:link` parce que le schéma déclare les extensions en `processContents="strict"` et que le schéma XHTML n'est pas chargé ; le format est celui documenté par Google.
- Code à modifier en même temps : `src/lib/seo.ts` (`pageMeta` doit émettre `rel="alternate" hrefLang="en"` et garder `x-default` sur la FR ; `webPage`, `WEBSITE` et `articleSchema` portent `inLanguage: "fr-CH"` en dur), `src/routes/__root.tsx` (`<html lang="fr-CH">` codé en dur, à rendre dynamique par locale), `og:locale`, `public/llms.txt` (section anglaise), et le générateur de sitemap de la recommandation 2.

Fichier validé : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/sitemap-propose-fr-en.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Pages en français (version d'origine, cible Suisse romande) -->
  <url>
    <loc>https://lxstudio.ch/</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/fiduciaires</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/fiduciaires"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/fiduciaires"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/fiduciaires"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/administrations</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/administrations"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/administrations"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/administrations"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/pme</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/pme"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/pme"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/pme"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/securite</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/securite"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/securite"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/securite"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources</loc>
    <lastmod>2026-10-24</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/ia-locale-entreprise-suisse</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/ia-locale-entreprise-suisse"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/ia-locale-entreprise-suisse"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/ia-locale-entreprise-suisse"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/chatgpt-nlpd-entreprise</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/chatgpt-nlpd-entreprise"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/chatgpt-nlpd-entreprise"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/chatgpt-nlpd-entreprise"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/secret-professionnel-ia</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/secret-professionnel-ia"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/secret-professionnel-ia"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/secret-professionnel-ia"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/fiduciaire-automatiser-saisie-pieces-ia</loc>
    <lastmod>2026-10-26</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/fiduciaire-automatiser-saisie-pieces-ia"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/fiduciaire-automatiser-saisie-pieces-ia"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/fiduciaire-automatiser-saisie-pieces-ia"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment</loc>
    <lastmod>2026-09-23</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia</loc>
    <lastmod>2026-09-23</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/combien-coute-une-automatisation-ia-pme-suisse</loc>
    <lastmod>2026-09-23</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/combien-coute-une-automatisation-ia-pme-suisse"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/combien-coute-une-automatisation-ia-pme-suisse"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/combien-coute-une-automatisation-ia-pme-suisse"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/chatgpt-copilot-ou-agent-sur-mesure</loc>
    <lastmod>2026-09-23</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/chatgpt-copilot-ou-agent-sur-mesure"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/chatgpt-copilot-ou-agent-sur-mesure"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/chatgpt-copilot-ou-agent-sur-mesure"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/ressources/plateforme-automatisation-ou-code</loc>
    <lastmod>2026-09-23</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/plateforme-automatisation-ou-code"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/plateforme-automatisation-ou-code"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/plateforme-automatisation-ou-code"/>
  </url>

  <!-- Pages en anglais sous /en/. lastmod à renseigner avec la date de mise en ligne de chaque page anglaise, jamais une date inventée. -->
  <url>
    <loc>https://lxstudio.ch/en</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/fiduciaires</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/fiduciaires"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/fiduciaires"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/fiduciaires"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/administrations</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/administrations"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/administrations"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/administrations"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/pme</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/pme"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/pme"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/pme"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/securite</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/securite"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/securite"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/securite"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/ia-locale-entreprise-suisse</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/ia-locale-entreprise-suisse"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/ia-locale-entreprise-suisse"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/ia-locale-entreprise-suisse"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/chatgpt-nlpd-entreprise</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/chatgpt-nlpd-entreprise"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/chatgpt-nlpd-entreprise"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/chatgpt-nlpd-entreprise"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/secret-professionnel-ia</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/secret-professionnel-ia"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/secret-professionnel-ia"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/secret-professionnel-ia"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/fiduciaire-automatiser-saisie-pieces-ia</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/fiduciaire-automatiser-saisie-pieces-ia"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/fiduciaire-automatiser-saisie-pieces-ia"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/fiduciaire-automatiser-saisie-pieces-ia"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/combien-coute-une-automatisation-ia-pme-suisse</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/combien-coute-une-automatisation-ia-pme-suisse"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/combien-coute-une-automatisation-ia-pme-suisse"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/combien-coute-une-automatisation-ia-pme-suisse"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/chatgpt-copilot-ou-agent-sur-mesure</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/chatgpt-copilot-ou-agent-sur-mesure"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/chatgpt-copilot-ou-agent-sur-mesure"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/chatgpt-copilot-ou-agent-sur-mesure"/>
  </url>
  <url>
    <loc>https://lxstudio.ch/en/ressources/plateforme-automatisation-ou-code</loc>
    <!-- lastmod : date de mise en ligne de la version anglaise -->
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://lxstudio.ch/ressources/plateforme-automatisation-ou-code"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://lxstudio.ch/en/ressources/plateforme-automatisation-ou-code"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://lxstudio.ch/ressources/plateforme-automatisation-ou-code"/>
  </url>
</urlset>
```

## 10. Recommandations par priorité

1. Moyenne, 10 minutes : dans `public/sitemap.xml`, passer les 9 `lastmod` listés en section 3 au `2026-10-26` et retirer `priority` et `changefreq`. Republier.
2. Moyenne, une heure : générer `public/sitemap.xml` et `public/llms.txt` au build depuis `RESOURCES`, `ARTICLES` et `METIERS`, avec un champ `updated` par entrée (script `scripts/sitemap.ts` lancé en `prebuild`, sur le modèle de `scripts/og.ts`), et faire pointer `articleSchema.dateModified` sur `updated`. Plus aucune dérive possible entre contenu, JSON-LD et sitemap.
3. Faible : `www` en 301 (règle Cloudflare), slash final en 308, `caseSensitive: true` sur le routeur TanStack.
4. Faible : appliquer réellement le `noindex` du PDF (section 8) et corriger `VERIF.md`.
5. Info : robots.txt, jetons `Claude-SearchBot` et `Claude-User`, commentaire inexact.
6. Avant la version anglaise : trancher les slugs, rendre `pageMeta` et `__root.tsx` bilingues, puis publier le sitemap FR/EN de la section 9.

## 11. Ce qui n'a pas été testé

- Search Console : statut de soumission du sitemap, pages « Explorée, actuellement non indexée », couverture réelle. Pas d'accès.
- Date exacte de la publication Lovable (aucune capture Wayback entre le 20.10 et le 05.11) : le 26.10 retenu est la date de fusion dans `main`.
- Bing et autres moteurs.
- Le contenu des deux pages légales n'a été vérifié que pour le `noindex` et le canonical.

## Fichiers

- Rapport : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/sitemap.md`
- XML proposé, validé : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/sitemap-propose-fr-en.xml`
- Sitemap et robots.txt tels que servis le 05.11 : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/sitemap.xml` et `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/robots.txt`
- Données brutes : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/raw/sitemap_urls.json` (statut, en-têtes, canonical, hreflang par URL) et `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/raw/crawl.json` (17 pages, liens entrants et sortants)
- Scripts : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/scripts/check_urls.py`, `crawl.py`, `gen_sitemap.py`
- Sources dans le repo du site : `/Users/tanguylachat/souverain-dex/public/sitemap.xml`, `public/robots.txt`, `public/_headers`, `public/_redirects`, `src/lib/seo.ts`, `src/routes/__root.tsx`, `src/content/ia/ressources.ts`, `src/content/ia/metiers.ts`, `src/content/ia/securite.ts`, `src/content/ia/home.ts`, `src/content/ia/site.ts`, `src/content/articles.ts`
