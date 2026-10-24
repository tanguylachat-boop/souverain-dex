# La démo en 2 minutes : script et storyboard

Vidéo en motion design, 1920 × 1080 à 30 images par seconde, 120 secondes, fabriquée en code
(`scripts/demo/demo.html`, rendue par `npm run demo`). Sans voix et sans musique dans cette
version : tout le propos tient dans le texte à l'écran, pour une lecture muette sur le site.
Le texte ci-dessous est celui qui s'affiche ; une version voix off, mot pour mot, suit en bas si
Tanguy veut enregistrer ou faire synthétiser.

Règles tenues : vouvoiement, phrases courtes, aucun tiret long, aucun chiffre présenté comme un
résultat client (la facture est marquée « EXEMPLE », le rapport mensuel n'affiche aucune valeur),
aucune marque de logiciel montrée comme logo (« votre logiciel comptable » ; Bexio nommé en texte
dans le schéma du réseau, comme sur le site), TVA à 8,1 %, montants au format suisse.

| Temps | Scène | À l'écran | Visuel |
| --- | --- | --- | --- |
| 0:00 à 0:06 | Titre | LA DÉMO EN 2 MINUTES. **Une pièce comptable, du scan à l'écriture validée.** Sans qu'elle quitte le cabinet. | Nappe de nuit, marque LX Studio en haut à gauche. |
| 0:06 à 0:20 | 01 · Où ça tourne | **La machine est chez vous.** Installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel vers un service externe. | Schéma qui se dessine : le cadre « VOS LOCAUX », la machine, vos postes, vos dossiers et Bexio, le réseau interne qui les relie ; à droite, hors du cadre, « Internet, cloud, éditeurs d'IA » avec le lien barré en rouge : AUCUN APPEL PENDANT LE TRAITEMENT. |
| 0:20 à 0:34 | 02 · L'arrivée | **Les pièces arrivent comme aujourd'hui.** Scanner, e-mail, photo. Rien ne change pour vos clients ni pour vos collaborateurs. | Trois sources à gauche (scanner, e-mail, photo) ; cinq documents glissent l'un après l'autre dans la fente de la machine, dont l'anneau tourne. |
| 0:34 à 0:54 | 03 · La lecture | **Lue sur place.** Fournisseur, date, montants, TVA, référence QR : extraits sur la machine, dans vos murs. | La facture d'exemple (Fournisseur Exemple SA, F-2026-0418, 14.10.2026, CHF 1'250.00 HT, TVA 8,1 % CHF 101.25, total CHF 1'351.25, facture QR) ; une ligne de lecture descend, chaque champ est encadré en bleu et sa valeur apparaît à gauche en six puces. |
| 0:54 à 1:08 | 04 · Le classement | **Classée, renommée.** Dans le dossier du bon mandat, nommée selon votre convention, prête pour l'archivage. | La facture se réduit en fichier et file dans l'arborescence Mandats › Boulangerie Exemple SA › 2026 › Fournisseurs ; « scan_0418.pdf » devient « 2026-10-14_Fournisseur-Exemple-SA_F-2026-0418.pdf ». |
| 1:08 à 1:30 | 05 · La validation | **L'écriture est proposée. Vous validez.** Compte et code TVA proposés d'après vos écritures passées. Un clic pour valider, un clic pour corriger. Puis : Vous corrigez ? Le système retient la correction pour ce mandat et la propose la fois suivante. | Écran « Écriture proposée », badge « Confiance : élevée », les huit lignes (pièce, mandat, date, débit 4000 Achats de marchandises, crédit 2000 Créanciers, HT, TVA, total), boutons Corriger / Valider ; le curseur clique Valider, « Écriture validée, envoyée dans votre logiciel comptable ». |
| 1:30 à 1:44 | 06 · Le doute | **Ce qu'il ne comprend pas, il le met de côté.** Avec la raison. Rien n'est comptabilisé sans votre clic. | Un ticket flou passe devant la machine, un « ? » apparaît, le ticket part dans le bac « À traiter à la main » avec l'étiquette « Montant illisible ». |
| 1:44 à 1:55 | 07 · Le contrôle | **Chaque mois, un rapport.** Pièces traitées, heures récupérées, corrections. Mesuré chez vous, pas promis. | Carte « Rapport mensuel, comparé à la mesure faite avant l'installation », trois barres qui se remplissent sans chiffre, tampon « Mesuré chez vous ». |
| 1:55 à 2:00 | Fin | **Rien n'est sorti du cabinet.** Réserver un diagnostic gratuit de 30 minutes · lxstudio.ch · Jura · Suisse romande | Pastille et adresse. |

## Version voix off (à enregistrer ou à synthétiser, 2 minutes à voix posée)

> Voici ce qui se passe quand une pièce comptable arrive dans un cabinet équipé par LX Studio.
>
> La machine est chez vous. Installée dans vos locaux, branchée sur votre réseau. Pendant le
> traitement, aucun appel ne part vers un service externe : ni vers un éditeur d'intelligence
> artificielle, ni vers LX Studio.
>
> Les pièces arrivent comme aujourd'hui. Par le scanner, par e-mail, par une photo prise au
> téléphone. Rien ne change pour vos clients ni pour vos collaborateurs.
>
> La pièce est lue sur place. Le fournisseur, la date, les montants, la TVA, la référence de la
> facture QR : tout est extrait sur la machine, dans vos murs.
>
> Elle est ensuite classée dans le dossier du bon mandat, et renommée selon votre convention,
> prête pour l'archivage.
>
> L'écriture est proposée dans votre logiciel comptable, avec le compte et le code TVA déduits
> de vos écritures passées. Un clic pour valider. Un clic pour corriger. Si vous corrigez, le
> système retient la correction pour ce mandat et la propose la fois suivante.
>
> Ce qu'il ne comprend pas, il le met de côté, avec la raison. Rien n'est comptabilisé sans
> votre clic.
>
> Et chaque mois, un rapport : les pièces traitées, les heures de saisie récupérées, les
> corrections apportées. Comparé à la mesure faite avant l'installation. Mesuré chez vous, pas
> promis.
>
> Rien n'est sorti du cabinet. Réservez un diagnostic gratuit de 30 minutes sur lxstudio.ch.

## Ce qui reste ouvert

- Voix off : aucune pour l'instant. Si oui : la voix de Tanguy (meilleure preuve) ou une
  synthèse ; dans les deux cas, le texte ci-dessus, sans modification.
- Musique : aucune. Une nappe discrète peut être ajoutée au montage si le site la lance avec le
  son coupé par défaut.
- La facture, le mandat et les comptes sont des exemples. Si Tanguy préfère un cas réel
  anonymisé, remplacer les valeurs dans `scripts/demo/demo.html` (scène 3 et scène 5) et relancer
  `npm run demo`.
