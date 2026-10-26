/**
 * Chasse aux tirets longs (U+2014) et demi-cadratins (U+2013), interdits
 * partout : dans le contenu, les composants, les routes, les fichiers
 * publics, et dans le texte rendu de chaque page servie en local.
 *
 *   node verif/dashes.mjs            # fichiers seulement
 *   BASE_URL=http://localhost:4173 node verif/dashes.mjs --pages
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DASH = /[–—]/g;
const ROOTS = [
  "src/content",
  "src/components/ia",
  "src/routes",
  "src/lib",
  "public/llms.txt",
  "scripts",
];
const files = [];
function walk(p) {
  const st = statSync(p);
  if (st.isDirectory()) for (const f of readdirSync(p)) walk(join(p, f));
  else if (/\.(ts|tsx|txt|md|css|mjs|html)$/.test(p)) files.push(p);
}
ROOTS.forEach(walk);

let total = 0;
for (const f of files) {
  const text = readFileSync(f, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const hits = line.match(DASH);
    if (hits) {
      total += hits.length;
      console.log(`${f}:${i + 1}: ${hits.length} tiret(s) : ${line.trim().slice(0, 100)}`);
    }
  });
}
console.log(`Fichiers : ${files.length} lus, ${total} tiret(s) long(s) trouvé(s).`);

if (process.argv.includes("--pages")) {
  const { chromium } = await import("playwright");
  const BASE = (process.env.BASE_URL ?? "http://localhost:4173").replace(/\/$/, "");
  const PAGES = [
    "/",
    "/fiduciaires",
    "/administrations",
    "/pme",
    "/securite",
    "/ressources",
    "/ressources/ia-locale-entreprise-suisse",
    "/ressources/chatgpt-nlpd-entreprise",
    "/ressources/secret-professionnel-ia",
    "/ressources/fiduciaire-automatiser-saisie-pieces-ia",
    "/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment",
    "/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia",
    "/ressources/combien-coute-une-automatisation-ia-pme-suisse",
    "/ressources/chatgpt-copilot-ou-agent-sur-mesure",
    "/ressources/plateforme-automatisation-ou-code",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let pageTotal = 0;
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const { text, head } = await page.evaluate(() => ({
      text: document.body.innerText,
      head: [
        ...document.querySelectorAll(
          "title, meta[name=description], meta[property='og:title'], script[type='application/ld+json']",
        ),
      ]
        .map((e) => e.textContent + (e.getAttribute("content") ?? ""))
        .join("\n"),
    }));
    const n = (text.match(DASH) || []).length + (head.match(DASH) || []).length;
    pageTotal += n;
    console.log(`${path}: ${n} tiret(s) long(s)`);
  }
  await browser.close();
  console.log(`Pages : ${PAGES.length} lues, ${pageTotal} tiret(s) long(s).`);
  total += pageTotal;
}
process.exit(total ? 1 : 0);
