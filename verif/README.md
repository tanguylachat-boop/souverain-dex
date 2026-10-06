# Vérification de la page d'accueil

Quatre scripts Playwright, à lancer depuis la racine du dépôt contre le build servi en local.
Ils ont produit `VERIF.md` et servent à refaire la même passe quand les vraies photos et le
copy d'AUDIT.md seront en place.

```bash
npm run build
npx wrangler dev --port 4173        # dans un autre terminal (jamais `vite dev` sur cette machine)
npx playwright install chromium     # une seule fois ; `npx playwright install webkit` pour webkit.mjs
node verif/shots.mjs                # 390x844, 768x1024, 1440x900 : premier écran, masse de texte,
                                    # contraste du hero, rails (glisser, flèches, fin), dépliants,
                                    # zoom des photos, typographie, mouvement réduit, clavier, liens ;
                                    # captures par écran et report.json dans verif/captures/
node verif/inner.mjs                # /fiduciaire, /mentia, /athlit, /blog : statut, débordement, erreurs console
node verif/webkit.mjs               # premier écran, parallaxe et FAQ dans WebKit (moteur de Safari)
node verif/antiai.mjs               # mots creux, titres en question, CTA, icônes, dégradés, flou
```

Variables : `BASE_URL` (défaut `http://localhost:4173/`), `OUT_DIR` (défaut `./verif/captures`),
`BASELINE_CHARS` pour `shots.mjs` (masse de texte de la page d'avant, 9428 caractères).

Lighthouse mobile :

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx -y lighthouse@13.5.0 http://localhost:4173/ --output=html --output=json --output-path=./verif/captures/lighthouse-mobile --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
```

Les captures (`verif/captures/`) ne sont pas versionnées.
