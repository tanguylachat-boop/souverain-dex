# Vérification du site

Scripts Playwright, à lancer depuis la racine du dépôt contre le build servi en local. Ils ont
produit `VERIF.md` et servent à refaire la même passe quand les textes, les photos et la vidéo
validés seront en place.

```bash
npm run build
npx wrangler dev --port 4173        # dans un autre terminal (jamais `vite dev` sur cette machine)
npx playwright install chromium     # une seule fois ; `npx playwright install webkit` pour webkit.mjs
npm run verif                       # 390×844, 768×1024, 1440×900 : premier écran (titre révélé mot à
                                    # mot, nappe WebGL), chaque section après son apparition, en-tête
                                    # en verre, survol d'une ligne, panneau Métiers, FAQ, menu mobile,
                                    # formulaire vide (messages, aucun envoi), tirets, débordement,
                                    # images, erreurs console ; pages intérieures ; mouvement réduit ;
                                    # redirections 301 ; 404 ; fichiers publics. Captures et
                                    # report.json dans verif/captures/
npm run verif:webkit                # premier écran, parallaxe, bande de nuit, pied de page dans WebKit
BASE_URL=http://localhost:4173 npm run verif:dashes -- --pages
                                    # tirets longs et demi-cadratins : fichiers sources puis texte
                                    # rendu de chaque page (sortie 1 s'il en reste)
```

Variables : `BASE_URL` (défaut `http://localhost:4173`), `OUT_DIR` (défaut `./verif/captures`).

Lighthouse (mobile, sur l'accueil et sur /fiduciaires) :

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx -y lighthouse@13.5.0 http://localhost:4173/ --output=html --output=json --output-path=./verif/captures/lighthouse-accueil --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx -y lighthouse@13.5.0 http://localhost:4173/fiduciaires --output=html --output=json --output-path=./verif/captures/lighthouse-fiduciaires --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
```

Les captures (`verif/captures/`) ne sont pas versionnées.

Autres générateurs :

- `npm run og` : les images de partage (`public/og/*.jpg`), à relancer quand un titre change.
- `npm run dossier:pdf` : le dossier sécurité (`public/dossier-securite-lx-studio.pdf`) depuis
  `src/content/ia/securite.ts`, à relancer quand le contenu ou la version change.
