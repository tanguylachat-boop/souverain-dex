# Ce qu'il manque pour retirer tous les marqueurs jaunes

Réponses à écrire sous chaque point (ou en vrac dans la conversation). Chaque réponse est
reportée dans `src/content/ia/*` ; les scripts `npm run og`, `npm run dossier:pdf` et
`npm run verif` sont relancés ensuite.

## A. Données à fournir telles quelles

1. **Lien cal.com** du diagnostic de 30 minutes (URL complète). Tant qu'il manque, les boutons
   mènent au formulaire.
2. **Adresse** : rue et numéro à 2854 Bassecourt. Raison sociale exacte au registre (« LX Studio,
   entreprise individuelle, Tanguy Lachat » ?).
3. **Numéro IDE** (CHE-xxx.xxx.xxx).
4. **Logo Oasis Drink** : fichier PNG ou SVG sur fond transparent. Le monogramme « OD » de l'ancien
   dépôt n'est pas le logo officiel, il n'a pas été repris. Confirmer la ligne « Système de
   commande pour un distributeur de boissons » et la localité (Genève ?).
5. **Coca-Cola HBC** : accord écrit obtenu, oui ou non ? Si oui, logo et ligne vraie (« Rapports
   automatisés » est trop vague : rapports de quoi ?). Sinon la référence reste masquée
   (`VITE_SHOW_CCHBC`).
6. **Facchinetti** : le logo transmis est le logo multimarque du groupe, avec les roundels BMW et
   MINI. Accord écrit pour l'afficher sur lxstudio.ch ? Ligne « Capture des contacts et fiches
   véhicules par QR code au Comptoir du Jura » : correcte ?
7. **Richoz Sanitaire** : ligne « Gestion des interventions et des techniciens, connectée à
   Bexio » : correcte ?
8. **Photo de la machine** dans un bureau suisse, câble réseau débranché (ou on garde le visuel en
   code, qui tient déjà).
9. **Cabinet pilote** (page fiduciaires) : nom et accord écrit pour le citer. Sans accord, la
   phrase « Le produit tourne déjà en pilote dans un cabinet romand » reste sans nom, ou on la
   retire.

## B. Décisions commerciales

10. **Garantie** : en proposer une ? Texte exact (par exemple « Si les heures mesurées après trois
    mois sont inférieures à la moitié de la mesure, ... »). Sans réponse, la ligne est retirée.
11. **Matériel** (FAQ « De quel matériel ai-je besoin ? ») : modèle, mémoire, ordre de prix en CHF,
    ou « compris dans le devis ».
12. **Délai d'installation** à compter de la validation du devis (par exemple « quatre à six
    semaines, mesure comprise »).
13. **Suivi mensuel** : combien de mois sont compris (le texte dit « pendant plusieurs mois »).
14. **Maintenance après le suivi** (FAQ PME) : accord séparé ? forfait mensuel ? montant ou « sur
    devis » ?
15. **La machine est-elle achetée ou louée** par le client ? (page sécurité, fin de contrat).

## C. Technique, pour la page sécurité, le dossier PDF et les FAQ

Une réponse courte par point, ou « pas encore décidé » (dans ce cas la ligne est reformulée
honnêtement, par exemple « Aucun test d'intrusion indépendant n'a encore été réalisé »).

16. **Installation** : machine dédiée fournie par LX Studio, serveur existant du client, ou les
    deux ?
17. **Matériel exact** de la machine : processeur, carte graphique, mémoire, stockage.
18. **Modèles d'IA** utilisés et versions, ou formulation générique (« modèles ouverts, versions
    documentées à l'installation »).
19. **Connecteurs**, état réel pour chacun : Bexio, Abacus, Crésus, WinBIZ, Microsoft 365, Google
    Workspace, Infomaniak (« disponible », « en développement », « sur demande », « non prévu »).
20. **Flux sortants** : pendant la lecture et le classement, aucun ? À la validation, qu'est-ce qui
    part dans Bexio : l'écriture seule, ou aussi le PDF de la pièce ? (Bexio est un service
    cloud : si la pièce y est jointe, elle quitte le cabinet pour le compte Bexio du client ; le
    texte du site et de la vidéo doit le dire tel quel.)
21. **Chiffrement au repos** (LUKS, FileVault, BitLocker ? qui garde la clé ?) et **TLS** (certificat
    interne ou Let's Encrypt ?).
22. **Comptes et accès** : comptes locaux, ou intégration à un annuaire (Active Directory, Entra,
    LDAP) ?
23. **Journaux** : format et durée de conservation.
24. **Sauvegardes** : procédure de restauration testée, oui ou non ?
25. **Mises à jour** du système : qui les applique, à quelle fréquence ?
26. **Test d'intrusion** : prévu ? date et prestataire.
27. **Registre des traitements et analyse d'impact** : proposés au client, oui ou non ?
28. **Engagements contractuels supplémentaires** (délai d'intervention, disponibilité, pénalités) à
    mettre en page 4 du dossier.
29. **Formats de pièces pris en charge** (PDF, JPEG, HEIC, factures QR, e-factures ?) pour l'article
    fiduciaire.
30. **Configuration type et ordre de prix** pour l'article « IA locale en entreprise ».

## D. Juridique, à faire relire (14 passages marqués)

Les articles cités : LPD art. 5 (données sensibles), 6 (principes), 8 (sécurité), 16 et 17
(communication à l'étranger), 19 (devoir d'informer), 60 (amendes jusqu'à 250 000 francs) ; entrée
en vigueur le 1er septembre 2023 ; art. 321 CP (professions tenues au secret). Un tableau des
extraits fedlex correspondants peut être préparé pour accélérer la relecture par un conseil. Dire
qui relit (Tanguy, une fiduciaire partenaire, un avocat) et quand.

## E. Pages légales et site

31. **Hébergeur réel** du site publié par Lovable (à lire dans les réglages Lovable ; le texte dit
    Cloudflare).
32. **For juridique** : Bassecourt, canton du Jura ?
33. **Mesure d'audience** : le compte Plausible pour lxstudio.ch existe-t-il ? Sinon on retire le
    script et la mention.
34. **Durée de conservation** des demandes reçues par formulaire (24 mois proposés).
35. **Prestataire d'envoi** : Resend confirmé ? Poser `RESEND_API_KEY` et `MAIL_FROM` dans les
    secrets du projet, puis un envoi de test.

## F. Vidéo démo

36. **Voix off** : faite le 24.10.2026 en synthèse, la voix « Achird » de Gemini TTS, celle des
    films Mentia et LX Sales Coach (`npm run demo:voix`, script dans `scripts/demo/voix.json`).
    Reste ouvert : la remplacer par la voix de Tanguy (meilleure preuve) ; le texte à lire est
    dans `docs/demo-script.md`, phrase par phrase.
37. **Musique** : aucune, ou une nappe discrète ?
38. **Cas montré** : la facture d'exemple et le mandat « Boulangerie Exemple SA » conviennent, ou
    un cas réel anonymisé ?
