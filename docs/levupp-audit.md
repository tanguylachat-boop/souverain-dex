# Audit de levupp.com et transposition pour LX Studio

Date : 06.10.2026. Relevé sur https://levupp.com/ à 1440×900 et 375×812 (Chromium), HTML, CSS (65 Ko, quatre feuilles) et scripts (douze chunks Next.js) téléchargés et lus. Les mesures sont celles de la page le soir du 06.10.2026.

## 1. Architecture

Site Next.js (Turbopack), sans GSAP ni Lenis : tout le mouvement est fait en CSS (keyframes, transitions) piloté par un petit script maison (IntersectionObserver pour les apparitions, un seul `requestAnimationFrame` sur le défilement pour la parallaxe, la bascule de thème et le pied de page).

Racine `.lv-v2` qui porte les jetons : encre `--ink #f2f2f0`, fonds `--b0` (mélange de `#0b0b0d` et `#f2f2ef` selon `--tone`), `--b1 #101013`, `--b2 #16161a`, accent `--lime #cbff00` (et `#d9ff3c`), halo bleuté `--glow #7a91c6`, largeur `--wrap 1240px`, marge `--pad 28px` (20 px sur téléphone). Police Roobert (500 pour les titres, interlettrage négatif) et Geist Mono pour les libellés (10,5 à 11 px, capitales, interlettrage .12 à .14 em).

Fond fixe `.lv-bg` : grille de points (42 px) plus un halo radial qui suit la souris (`--mx`, `--my`) et un « spot » qui révèle la grille autour du curseur.

Ordre des sections (hauteurs à 1440×900) :

| Section | Hauteur | Contenu |
| --- | --- | --- |
| Nav fixe | 52 px, à 18 px du haut | Pastille centrée de 340 px : logo + bouton « MENU » (icône quatre points qui tourne). Classe `solid` après défilement. Le menu s'ouvre dans la pastille (fond clair, liens avec apparition lettre par lettre, sous-liens, bouton « Parlons-en »), voile flouté derrière, Échap ferme. |
| Hero | 900 (100 vh) | Vidéo plein écran en boucle (grotte qui s'ouvre sur des nuages, logo 3D), parallaxe `--hp = 0,13 × min(scrollY, vh)`, fondu noir sur 46 % du bas, arc lumineux en haut. En bas : H1 avec un mot qui tourne toutes les 3,4 s (lettres qui entrent floutées), deux boutons, phrase d'intro à droite avec un soulignement animé (5,2 s en boucle) sous « sur-mesure ». |
| Chiffres | 137 | Quatre chiffres (2019, 100+, 5,0, 90) avec un compteur (1150 ms) et une icône animée chacun : calendrier qui feuillette, mur de tuiles qui défile, étoile qui se remplit, jauge circulaire. |
| Réalisations | 1359 | En-tête centré (pastille, H2 révélé lettre par lettre, intro). Carrousel à trois projets : texte à gauche (année, type, titre, description, deux repères, lien), capture à droite (révélation par `clip-path` 1,7 s, téléphone flottant), onglets 01/02/03 avec barre de progression 7 s, flèches, glissement au doigt, pause au survol. « Voir tous les projets ». |
| Avis | 1338 | En-tête, pastille « 5,0 ★★★★★ NOTE GOOGLE », mur de trois colonnes d'avis qui défilent verticalement en continu (6,5 s par carte, colonne centrale en sens inverse, masque haut et bas). Sur téléphone : liste statique. |
| Pourquoi | 1043 | Tableau comparatif cinq lignes × quatre prestataires, colonne Levupp surlignée en vert avec halo, note « – signifie variable ». |
| Méthode | 1540 | Trois cartes avec une illustration animée (noyau et satellites avec impulsions, règle à jalons qui glisse, points qui pulsent après la mise en ligne), décalées de 34/62/90 px à l'apparition. Puis un bento : carte 3D de Marseille, deux rangées de logos d'outils en défilement opposé, photo de l'équipe avec deux badges à compteur. |
| Inclus | 1041 | Deux colonnes : texte à gauche avec bouton « Voir les tarifs », feuille inclinée en perspective à droite (douze lignes cochées qui entrent une à une, 42 ms d'écart, « UN SEUL PRIX. »), se redresse au survol. |
| Seuil | 648 | Phrase de récapitulation puis « Reste le prix. » en 76 px. C'est ici que `--tone` passe de 0 à 1 : le fond vire au clair (`#f2f2ef`) et les sections marquées `data-ink` passent en encre sombre, accent `#5f7a00`. |
| Tarifs | 1161 | Deux cartes en perspective (rotateY ±7°, à plat au survol), la première teintée, prix, liste cochée, bouton. |
| Questions | 954 | Colonne gauche collante (pastille, H2, intro), sept questions en accordéon (grid-template-rows 0fr→1fr, icône + qui devient –). |
| Parlons-en | 1080 | Section claire, titre centré, bouton sombre, puis un paysage (vallée) avec parallaxe `--cp = (progression − 0,5) × 14 %` et deux dégradés qui fondent le clair du haut vers le sombre du pied de page. |
| Pied de page | 599, fixé | Révélé par le défilement (le contenu passe au-dessus) : carte vitrée en trois colonnes (contact, marque et réseaux, « UN PROJET ? » avec bouton et lien vers l'appel), ligne de lettre d'information, mentions, et le logo gravé en grand dans le fond. |

Mouvement réduit : toutes les animations sont coupées, les apparitions sont immédiates.

Téléphone (< 760 px) : nav pleine largeur, hero empilé (titre, intro, deux boutons pleine largeur), chiffres en 2×2, carrousel avec la capture au-dessus du texte, avis en liste, cartes empilées, feuille à plat, tarifs empilés, pied de page empilé.

## 2. Ce que la page promet, section par section

1. « Votre [application / site web / logiciel métier], en mieux. » : un mot qui tourne pour couvrir trois offres.
2. Sept ans, cent projets, cinq étoiles, score Lighthouse 90 : la preuve en chiffres avant le premier défilement.
3. Trois projets qu'on reconnaît : chaque projet nommé, daté, avec son périmètre.
4. Cinq étoiles à chaque fois : vingt avis Google datés et signés.
5. Ce qui change d'un prestataire à l'autre : cinq critères où le studio se dit fort, et l'aveu qu'un freelance ou un modèle suffisent pour un besoin simple.
6. Toujours les mêmes personnes en face : interlocuteur unique, points réguliers, présence après la mise en ligne.
7. Tout est compris : douze lignes, un seul prix.
8. Le budget avant le premier rendez-vous : à partir de 5 000 € HT pour un site, sur devis pour une application.
9. Sept questions avec des réponses qui donnent des délais et des conditions.
10. Un échange de trente minutes, sans engagement ni argumentaire.

## 3. Transposition pour LX Studio

Même structure, même rythme, mêmes mécaniques de mouvement, avec les textes validés de `src/content/home.ts` et aucun chiffre inventé.

| Levupp | LX Studio |
| --- | --- |
| Logo + MENU, liens Réalisations / Méthode / Offre / Tarifs / Blog, « Parlons-en » | LX Studio + MENU, liens Résultats / Méthode / Offre / Tarifs / Journal, sous-liens contact, LinkedIn, Instagram, agent fiduciaire, bouton « Réserver 15 minutes » |
| Vidéo grotte et logo 3D | Vidéo provisoire fabriquée par zoom lent sur la photo provisoire de l'atelier (voir VERIF), mêmes couches de fondu, même parallaxe |
| « Votre [x], en mieux. » | « Les [devis / relances / mails / factures] se font sans vous. » |
| « Démarrer un projet » / « Voir nos réalisations » | « Réserver 15 minutes » / « Voir les résultats » |
| 2019, 100+, 5,0, 90 | 4 clients au quotidien, 1 seul interlocuteur, 48 h pour un devis ferme, 15 min pour le premier appel (tous tirés du texte validé) |
| Trois projets | Trois clients : Oasis Drink Distribution, Richoz Sanitaire, Taxi d'Andrea, en problème / installé / résultat (« mesure en cours » quand elle manque) |
| Mur d'avis Google | Mur de faits : ce qui tourne chez chaque client, signé du nom et du lieu. Aucun avis inventé |
| Levupp / agence / freelance / template | LX Studio / agence classique / freelance / logiciel en abonnement, cinq critères |
| Interlocuteur unique, points réguliers, après la mise en ligne | Les mêmes trois promesses, avec les jalons de la méthode (mesure, devis, installation, en service) |
| Carte de Marseille, outils, photo d'équipe | Outils (WhatsApp, Gmail, Agenda, Sheets, Claude, Anthropic, Supabase, Vercel, Next.js, cal.com, Bexio en texte), photo de Tanguy, badges « Claude Certified Developer » et « 4 clients » |
| Douze lignes, un seul prix | Douze lignes de ce qui est compris, « un seul devis » |
| « Reste le prix. » | « Reste le prix. » |
| À partir de 5 000 € HT / sur devis | « Devis ferme en 48 h, après la demi-journée » / « Sur devis ». Aucun montant : la règle de la maison est un prix par offre, validé par Tanguy |
| Sept questions | Les six questions validées plus « Faut-il être dans le Jura ? » |
| Paysage de vallée | Photo de paysage provisoire (voir VERIF) |
| Lettre d'information | Lien vers le journal : aucun formulaire sans serveur derrière |

Ce qui n'est pas copié : les textes de Levupp, leurs vidéos, leurs captures, leurs avis, leur police (Roobert, commerciale) remplacée par Geist et Geist Mono (licence OFL, fichiers dans `public/fonts/`).
