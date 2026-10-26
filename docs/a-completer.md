# Ce qu'il manque encore, et ce qui a été tranché sans attendre

État au 26.10.2026. Plus aucune marque jaune n'apparaît sur le site : chaque phrase a été réécrite
pour être vraie sans la donnée manquante (« précisé dans le devis », « fixé à l'installation »,
« aucun test d'intrusion à ce jour »). Les réponses ci-dessous remplacent ces formules par le fait.
Chaque réponse est reportée dans `src/content/ia/*` ; `npm run dossier:pdf`, `npm run og` et
`npm run verif` sont relancés ensuite.

## A. Données à fournir telles quelles (bloquant pour une version complète)

1. **Lien cal.com** du diagnostic de 30 minutes (URL complète). Sans lui, les boutons mènent au
   formulaire et la ligne « En direct dans l'agenda » n'apparaît pas.
2. **Adresse** : rue et numéro à 2854 Bassecourt (pied de page, mentions légales, politique de
   confidentialité, page 4 du dossier PDF affichent seulement « 2854 Bassecourt »). Raison sociale
   exacte au registre.
3. **Numéro IDE** (CHE-xxx.xxx.xxx) : la ligne est retirée des mentions légales tant qu'il manque.
4. **Logo Oasis Drink** : PNG ou SVG sur fond transparent ; le nom est affiché en texte en
   attendant. Confirmer la ligne « Système de commande pour un distributeur de boissons ».
5. **Coca-Cola HBC** : accord écrit obtenu, oui ou non ? Sans accord la référence reste masquée
   (`VITE_SHOW_CCHBC`). Avec : logo et une ligne vraie (« Rapports automatisés » est trop vague).
6. **Facchinetti** : le logo transmis est le logo multimarque du groupe, avec les roundels BMW et
   MINI. Accord écrit pour l'afficher sur lxstudio.ch ? Ligne « Capture des contacts et fiches
   véhicules par QR code au Comptoir du Jura » : correcte ?
7. **Richoz Sanitaire** : ligne « Gestion des interventions et des techniciens, connectée à
   Bexio » : correcte ?
8. **Cabinet pilote** (page fiduciaires et article) : nom et accord écrit pour le citer. Le site
   dit « Le produit tourne déjà en pilote dans un cabinet romand », sans nom. Si ce n'est plus le
   cas, dire lequel des deux : on nomme, ou on retire la phrase.
9. **Photo de la machine** dans un bureau suisse, câble réseau débranché, si tu en veux une à la
   place du visuel en code (qui tient).

## B. Décisions commerciales (le site dit aujourd'hui « dans le devis »)

10. **Garantie** : en proposer une ? Texte exact. Sans réponse, aucune garantie n'est publiée.
11. **Matériel** : modèle, mémoire, ordre de prix en CHF. Le site dit « son modèle et son prix
    figurent dans le devis ». IdealGPT affiche « NVIDIA GB10 » et « garantie 2 ans » : c'est le
    seul avantage visible du concurrent (veille du 25.10.2026).
12. **Délai d'installation** à compter de la validation du devis (le site dit « fixé dans le
    devis »).
13. **Suivi mensuel** : combien de mois compris (le site dit « les premiers mois »).
14. **Maintenance après le suivi** : accord séparé, forfait, montant ou « sur devis ». Le site dit
    « accord séparé, sans abonnement à un service cloud ».
15. **Achat ou location** de la machine. Le site dit « La machine vous appartient dès
    l'installation ; les conditions figurent dans le devis ».
16. **Positionnement** : garder « Polices et administrations » dans le titre de la page
    `/administrations` ? La veille du 25.10.2026 recommande de retirer « Polices » tant qu'aucun
    corps de police n'est client (aucun concurrent ne l'écrit, et Genève pose un cadre strict :
    CPP et LIPAD, vérification humaine systématique). Santé : pas sans cabinet pilote.

## C. Faits techniques (le site dit aujourd'hui « fixé à l'installation, consigné dans le dossier »)

Une réponse courte par point, ou « pas encore décidé » (la formule reste alors).

17. **Installation** : machine dédiée fournie par LX Studio seulement (ce que le site dit), ou
    aussi le serveur existant du client ?
18. **Matériel exact** : processeur, carte graphique, mémoire, stockage.
19. **Modèles d'IA** et versions (le site dit « modèles ouverts, noms et versions consignés dans
    le dossier »).
20. **Connecteurs**, état réel pour chacun : Bexio (le site dit « oui, tourne chez un client »),
    Abacus, Crésus, WinBIZ, Microsoft 365, Google Workspace, Infomaniak (le site dit « précisé lors
    du diagnostic »).
21. **Flux sortants** : à la validation, qu'est-ce qui part dans Bexio : l'écriture seule, ou
    aussi le PDF de la pièce ? Bexio est un service cloud : si la pièce y est jointe, elle quitte
    le cabinet pour le compte Bexio du client, et le texte « rien ne sort du cabinet » (site,
    vidéo) doit le dire tel quel.
22. **Chiffrement au repos** (LUKS, FileVault, BitLocker ? qui garde la clé ?) et **TLS**
    (certificat interne ou Let's Encrypt ?).
23. **Comptes et accès** : comptes locaux, ou annuaire (Active Directory, Entra, LDAP) ?
24. **Journaux** : format et durée de conservation.
25. **Sauvegardes** : procédure de restauration testée, oui ou non ?
26. **Mises à jour** du système : qui les applique, à quelle fréquence ?
27. **Test d'intrusion** : prévu ? date et prestataire. Le site et le PDF disent « aucun test
    d'intrusion indépendant à ce jour ».
28. **Registre des traitements et analyse d'impact** : proposés au client, oui ou non ?
29. **Engagements contractuels supplémentaires** (délai d'intervention, disponibilité, pénalités)
    pour la page 4 du dossier : quatre engagements y figurent, rien d'autre.
30. **Formats de pièces** : le site dit « PDF ou image (scan, photo) » et « facture QR lue
    directement » ; HEIC, TIFF, e-factures ?

## D. Juridique : vérifié contre le texte officiel le 26.10.2026, relecture d'un conseil conseillée

Les passages cités ont été comparés aux textes consolidés sur fedlex.admin.ch le 26.10.2026 :
LPD (RS 235.1) art. 5 let. c, 6, 8, 12, 16, 17, 19, 22, 60 et 61, entrée en vigueur le 1er
septembre 2023 ; Code pénal (RS 311.0) art. 320 et 321. Corrections apportées : la liste des
professions de l'art. 321 CP est complète (infirmiers, physiothérapeutes, ergothérapeutes,
diététiciens, optométristes, ostéopathes ajoutés depuis le 1er juillet 2023) ; les fiduciaires n'y
figurent pas en tant que telles, seuls les réviseurs astreints au secret par le CO ; le secret de
fonction des administrations est l'art. 320 CP ; les données sensibles de l'art. 5 incluent les
mesures d'aide sociale ; l'amende de 250 000 francs vise l'art. 60 (information) et l'art. 61
(communication à l'étranger, sous-traitance, sécurité). Les marques « à vérifier » ont été
retirées. Reste utile : une relecture par un avocat ou une fiduciaire partenaire avant d'utiliser
ces pages dans une offre, parce que le site reste un texte commercial et non un avis juridique.

## E. Pages légales et site

31. **Hébergeur** : le site répond avec l'en-tête `server: cloudflare` (vérifié le 25.10.2026) ;
    les mentions légales citent Cloudflare, Inc. Confirmer que Lovable ne déclare pas un autre
    hébergeur.
32. **For juridique** : Bassecourt, canton du Jura, comme écrit.
33. **Mesure d'audience** : le compte Plausible pour lxstudio.ch existe-t-il ? Sinon on retire le
    script et la mention dans la politique de confidentialité.
34. **Durée de conservation** des demandes reçues par formulaire : 24 mois, comme écrit.
35. **Prestataire d'envoi** : Resend, nommé dans la politique de confidentialité. Poser
    `RESEND_API_KEY` et `MAIL_FROM` dans les secrets du projet, puis un envoi de test. Tant que les
    clés manquent, le formulaire affiche « L'envoi n'a pas abouti » avec le téléphone et
    l'e-mail, et le dossier PDF s'ouvre sans copie par e-mail.

## F. Vidéo démo

36. **Voix off** : faite le 25.10.2026, voix « Achird » de Gemini TTS, celle des films Mentia
    (`npm run demo:voix`). Option : ta voix, les 23 phrases sont dans `docs/demo-script.md`.
37. **Musique** : aucune, ou une nappe discrète ?
38. **Cas montré** : la facture d'exemple et le mandat « Boulangerie Exemple SA » conviennent, ou
    un cas réel anonymisé ?
