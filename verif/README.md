# Vérification de la page d'accueil

Deux scripts Playwright, à lancer depuis la racine du dépôt contre le build servi en local.
Ils ont produit `VERIF.md` et servent à refaire la même passe quand les vraies photos, la
vraie vidéo et le texte validé seront en place.

```bash
npm run build
npx wrangler dev --port 4173        # dans un autre terminal (jamais `vite dev` sur cette machine)
npx playwright install chromium     # une seule fois ; `npx playwright install webkit` pour webkit.mjs
node verif/shots.mjs                # 390x844, 768x1024, 1440x900 : premier écran (vidéo, mot qui tourne,
                                    # deux lignes), sections et ton sombre vers clair, compteurs, carrousel
                                    # (défilement 7 s, flèches, glisser, découverte de la photo), mur d'avis,
                                    # accordéon, menu, pied de page collé, débordement, tirets longs, erreurs
                                    # console, mouvement réduit, pages intérieures ; captures par écran et
                                    # report.json dans verif/captures/
node verif/webkit.mjs               # premier écran, parallaxe, ton clair et pied de page dans WebKit (moteur
                                    # de Safari), 390x844
```

Variables : `BASE_URL` (défaut `http://localhost:4173/`), `OUT_DIR` (défaut `./verif/captures`).

Lighthouse (mobile puis bureau) :

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx -y lighthouse@13.5.0 http://localhost:4173/ --output=html --output=json --output-path=./verif/captures/lighthouse-mobile --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx -y lighthouse@13.5.0 http://localhost:4173/ --preset=desktop --output=html --output=json --output-path=./verif/captures/lighthouse-desktop --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
```

Les captures (`verif/captures/`) ne sont pas versionnées.
