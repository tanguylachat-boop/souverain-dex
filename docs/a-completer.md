# Ce qui reste à décider, et ce qui a été rempli sans attendre

État au 26.10.2026. Le site ne montre plus aucune marque : chaque phrase tient sans la donnée qui
manque, et tout ce qui existait quelque part a été repris tel quel.

## Rempli depuis vos documents (rien à faire)

- **Adresse, raison sociale, IDE, TVA** : Rue des Romains 25, 2854 Bassecourt ; raison individuelle
  Tanguy Lachat ; CHE-325.224.095 ; non assujettie à la TVA (art. 10 al. 2 let. a LTVA). Source :
  facture 2026-248.
- **Lien de réservation** : `https://cal.com/lx-studio/30min` (« Rendez-vous de 30 min »), sur tous
  les boutons « Réserver un diagnostic ».
- **Facchinetti** : logo multimarque envoyé par leur marketing le 24.02.2026 « à utiliser pour être
  dans le juste », affiché. **Richoz Sanitaire** : interventions et techniciens connectés à Bexio,
  confirmé par le dossier Richoz. **Oasis Drink** : pas de logo (leur site affiche le nom en texte,
  brief logo d'avril 2026 : « le client n'a pas de logo existant ») ; le nom est affiché en texte.
- **Matériel** : Mac mini Apple, puce M4 Pro, 64 Go de mémoire unifiée (dépôt fiduciaire,
  décisions du 27.04.2026 et démo du pilote). Prix : « dans le devis ».
- **Modèles et moteur** : familles Llama et Qwen par Ollama, OCR Tesseract, lecteur de factures QR ;
  versions consignées dans le dossier à l'installation.
- **Accès à distance** : tunnel chiffré autorisé par le client, coupable à tout moment, journalisé
  (déploiement `cloudflared` du dépôt). **Sauvegardes** : service planifié sur la machine.
- **Hébergeur du site** : Cloudflare (en-tête `server: cloudflare`). **Mesure d'audience** :
  Plausible, en place sur le site depuis mai 2026, conservé. **For** : Bassecourt, canton du Jura.
  **Conservation** des demandes : 24 mois. **Prestataire d'envoi** : Resend, nommé.
- **Droit** : textes vérifiés sur fedlex le 26.10.2026 (LPD art. 5, 6, 8, 12, 16, 17, 19, 22, 60, 61 ;
  CP art. 320 et 321), passages corrigés.
- **Vidéo** : voix Achird (Gemini TTS, voix des films Mentia), pas de musique, cas d'exemple.

## Tranché par défaut (changeable d'un mot)

- Aucune garantie publiée ; aucun test d'intrusion (dit tel quel) ; délai, mois de suivi,
  maintenance, achat ou location de la machine : « précisé dans le devis ».
- Connecteurs : Bexio « oui, tourne chez un client » ; Abacus, Crésus, WinBIZ, Microsoft 365,
  Google Workspace, Infomaniak : « précisé lors du diagnostic ».
- Cabinet pilote cité sans nom (pas d'accord écrit au dossier). Coca-Cola HBC masqué
  (`VITE_SHOW_CCHBC`) tant qu'un accord écrit n'existe pas.
- Titre de `/administrations` gardé tel que le brief le demande : « Polices et administrations ».
  La veille du 25.10.2026 recommande de retirer « Polices » tant qu'aucune police n'est cliente.

## Ce que vous seul pouvez faire

1. Dire « merge » pour la PR #17, puis publier depuis Lovable.
2. Poser `RESEND_API_KEY` et `MAIL_FROM` dans les secrets du projet, puis envoyer un formulaire de
   test. Tant que les clés manquent, le site affiche « L'envoi n'a pas abouti » avec le téléphone et
   l'e-mail, et aucune demande n'arrive.
3. Si vous voulez les nommer : l'accord écrit du cabinet pilote, et celui de Coca-Cola HBC.
4. Si vous voulez afficher des chiffres à la place de « dans le devis » : délai d'installation,
   mois de suivi compris, prix de la machine, garantie éventuelle.
