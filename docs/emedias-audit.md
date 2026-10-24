# Audit e-medias.ch (relevé du 24.10.2026, Chromium 1440×900 et 390×844)

Fichiers : home.html, main.css (290 Ko), main.js (234 Ko, 5783 lignes), mesh-gradient.js (12 Ko), audit.json, audit2.json, shots/ (home-*.png, mob-*.png, service-*, contact-*, realisations-*, apropos-*).
Extraction CSS par composant : ~/.claude/projects/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/tool-results/bhy073iil.txt

## Stack
WordPress, thème maison « e-medias-group ». GSAP 3.12.5 + ScrollTrigger. Aucun Lenis, aucun jQuery. Mesh gradient WebGL maison (fragment shader : bruit simplex + cinq foyers gaussiens, grain, repli CSS) sur les sections « nuit » (`.emg-night` : chiffres, pied de page) via `canvas.emg-night-canvas` absolu. Police Manrope variable auto-hébergée (preload, crossorigin). Preload de l'image du hero (hero-glass.webp). GA4 avec Consent Mode. Loader au premier chargement (keyframes emg-loader-*). Transitions de page en fondu (#emg-main et footer opacity 0 → 1, 0,6 s, power2.out).

## Jetons (:root)
--bg #f7feff ; --bg2 #fff ; --ink #02031f ; --ink2 rgba(2,3,31,.58) ; --ink3 rgba(2,3,31,.38) ; --line rgba(2,3,31,.09) ; --accent #0a36f7 ; --accent-ink #f7feff ; --cyan #94f6ff ; --navy #00072c ; --glass rgba(255,255,255,.x) bordure encrée --glass-brd rgba(2,3,31,.12) ; --card #fff ; --shadow 0 24px 80px -32px rgba(2,3,31,.18) ; --shadow-soft 0 12px 40px -20px rgba(2,3,31,.16) ; --radius 24px ; --radius-lg 32px ; --container 1440px ; --gutter 40px (24 px sous 640) ; --nav-h 76px ; --ease-out cubic-bezier(.22,1,.36,1).
Header `.is-over` (au-dessus d'un hero sombre) redéfinit : --ink #f7feff, --ink2 65 %, --ink3 40 %, --bg #02031f, --line 15 %, --glass 10 %, --glass-brd 28 %.
Couleurs les plus présentes : #f7feff, #02031f, ink 58 %, #0a36f7, line 9 %, #061651, #94f6ff.

## Typographie
Manrope. Body 16 px ? (à vérifier), ink. H1 `clamp(40px, 4.9vw, 78px)`, 800, lh 1.1, ls -.04em, max-width 23ch, text-wrap balance (70,56 px mesuré à 1440 ; 32,76 px sur 390). H1 pages intérieures 77,76 px. Titre de section `clamp(36px, 4.6vw, 68px)`, ls -.035em, max 20ch, margin-top 22. Eyebrow 12 px 700 ls .28em uppercase ink2, précédé d'un trait (`.emg-eyebrow-line`, scaleX 0 → 1, 0,9 s power3.out, délai .25). Boutons 15 px 700, padding 16/30, radius 99px, transition transform .25s ease-out.

## Structure de l'accueil (hauteurs à 1440)
1. Header fixe 77 px, transparent (`is-over`) sur le hero, puis verre (`is-scrolled` > 60 px : bg 74 % + blur 26px saturate 1.7, bordure line, ombre). Logo + séparateur, liens (Accueil, Services (mega panneau), Réalisations, Références, L'agence (panneau)), langues FR/DE/IT/EN en pastille verre, loupe (palette de recherche), bouton « Nous contacter » blanc pilule. Mobile : logo, pastille FR, bouton burger rond, menu plein écran (`.emg-mobile-menu`, keyframe emg-menu-item).
2. Hero 900 px (min-height max(100vh, 680px)), nuit #02031f, vidéo de fond + image hero-glass.webp (logo 3D en verre, bleu), calques `[data-hero-layer]` : parallaxe scroll yPercent -3,5 → 3,5 (scrub, trigger `[data-hero-panel]` top bottom → bottom top) et parallaxe souris (quickTo x ±16 px sur l'image, chips ±13 px, pointeur fin seulement). Eyebrow « AGENCE WEB & MOBILE, JURA · SUISSE ROMANDE 🇨🇭 » avec trait, H1 révélé mot par mot (`.emg-word-inner` yPercent 115 → 0, 1,15 s, power4.out, stagger .07, délai .2, filet à 2,6 s), sous-titre et rangée de boutons (`is-revealed`), deux boutons (blanc plein « Découvrir nos services », verre « Nous contacter »), chips à droite (`[data-chip]` : +150 clients accompagnés, 5/5 avis clients avec étoiles, « Jura, Suisse : depuis 2020 ») opacity 0 y 24 → 1 s power3.out délai .3 + i×.2, puis flottement CSS. Repère de défilement (`[data-scroll-cue]` scaleY .4 ↔ 1, 1,4 s yoyo).
3. Marquee 243 px : libellé « ILS NOUS FONT CONFIANCE », logos clients en défilement continu (keyframe emg-marquee), masque dégradé 15 % de chaque côté.
4. Services 1298 px : eyebrow + titre « Tout ce que votre projet exige. » + cinq `.emg-service-row` (grille 110px | 1fr | 1.1fr | 48px : numéro, titre, description, flèche ; padding 38/12 ; bordure basse line ; survol : fond + padding + couleur). Révélation générique : opacity 0 y 34 → 0, 0,55 s, décalage min(index, 5) × .05.
5. Chiffres 677 px, nuit + mesh gradient : « Un seul interlocuteur. Toutes les expertises. », grille de nombres (compteurs), `.emg-numbers-claim`.
6. Réalisations 1245 px : eyebrow, titre « Une sélection de projets. », bouton contour, cartes `.emg-work-card` deux colonnes, image dézoom scale 1,14 → 1 (0,9 s power3.out, trigger top 96 %), tilt 3D léger au survol (desktop), zoom vers la fiche au clic (transition).
7. Citation 605 px : `.emg-quote-stage`, diapositives en fondu croisé toutes les 7 s (sortie y -14 / entrée y 14, 0,65 s power3.out), points `[data-quote-dot]` avec barre de progression (keyframe emg-quote-progress, variable --emg-quote-interval).
8. Panneau CTA 669 px : `.emg-cta-panel` navy radius 32 ombre, fond image + vidéo `[data-cta-bg]` parallaxe yPercent -6 → 6 scale 1,15 (scrub), titre « Et si on travaillait ensemble ? », texte, boutons.
9. Pied de page 1093 px, nuit + mesh : « Restez au courant. » (newsletter : email, honeypot `website`, consentement, « S'inscrire »), colonnes, mentions.
Extras : boutons magnétiques `[data-magnetic]` (quickTo x ×.18, y ×.3, 0,4 s power3), infobulle verre qui suit le curseur (`.emg-cursor-tip`, +20/+22 px, 0,3 s), barre de défilement verre personnalisée (desktop), bouton retour en haut `.emg-top`, rail de sections à gauche sur grand écran, `prefers-reduced-motion` → classe `emg-motion-off`.

## Pages intérieures
`.emg-page-hero.emg-night` (H1 77,76 px), sections `.emg-section` (padding 110 0 40), même panneau CTA et pied de page. Contact : hero 518 px, « Et ensuite ? » avec le formulaire (name, email, phone, company, type, message, honeypot website, consent, « Envoyer ma demande »). Réalisations : grille filtrable + pagination. À propos : histoire (trait vertical scaleY au scroll, jalons `is-lit`), valeurs en défilement horizontal épinglé (desktop), équipe, certifications. Page service : offres, « belt » et « tunnel » épinglés au défilement avec lecture automatique (non repris).

## Mobile (390)
Hero 726 px (H1 32,76 px), sections empilées, service rows en colonne, chiffres 1004 px, pied de page 2555 px, header 77 px avec burger. Canvas mesh présent sur les sections nuit.
