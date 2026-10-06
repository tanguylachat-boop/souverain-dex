# Vérification de la page d'accueil

Trois scripts Playwright, à lancer depuis la racine du dépôt contre le build servi en local.
Ils ont servi à produire VERIF.md et sont là pour refaire la même passe quand les vraies
photos et le copy d'AUDIT.md seront en place.

```bash
npm run build
npx wrangler dev --port 4173        # dans un autre terminal
npx playwright install chromium     # une seule fois ; `npm i -D playwright` si le paquet manque
node verif/shots.mjs                # captures 390x844, 768x1024, 1440x900 + report.json dans verif/captures/
node verif/inner.mjs                # /fiduciaire, /mentia, /athlit, /blog : statut, débordement, erreurs console
node verif/webkit.mjs               # le même premier écran dans WebKit (moteur de Safari)
node verif/antiai.mjs               # mots creux, titres en question, CTA, icônes, dégradés, flou
```

Lighthouse mobile :

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx -y lighthouse@13.5.0 http://localhost:4173/ --output=html --output-path=./verif/captures/lighthouse-mobile --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
```

Les captures (`verif/captures/`) ne sont pas versionnées.
