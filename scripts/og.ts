/**
 * Images de partage (Open Graph, 1200 × 630), une par page, rendues avec
 * Chromium depuis le contenu du site. À relancer quand un titre change :
 *
 *   npm run og
 *
 * Sortie : public/og/<nom>.jpg (JPEG : la nappe de dégradés pèserait cinq fois plus en PNG). Le nom est celui que `ogImage()` attend
 * (lib/seo.ts) : accueil, fiduciaires, administrations, pme, securite,
 * ressources, puis le slug de chaque article.
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { HERO } from "../src/content/ia/home.ts";
import { METIERS } from "../src/content/ia/metiers.ts";
import { SECURITE_HERO } from "../src/content/ia/securite.ts";
import { ALL_RESOURCES } from "../src/content/ia/ressources.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/og");
mkdirSync(out, { recursive: true });

type Card = { name: string; kicker: string; title: string; foot?: string };

const cards: Card[] = [
  { name: "accueil", kicker: "IA installée chez vous · Jura · Suisse romande", title: HERO.title },
  ...METIERS.map((m) => ({ name: m.slug, kicker: m.hero.eyebrow, title: m.hero.title })),
  { name: "securite", kicker: "Sécurité et conformité", title: SECURITE_HERO.title },
  {
    name: "ressources",
    kicker: "Ressources",
    title: "Ce qu'il faut savoir avant d'installer une IA chez vous.",
  },
  ...ALL_RESOURCES.map((r) => ({
    name: r.slug,
    kicker: r.tag,
    title: r.title,
    foot: `${r.author} · lxstudio.ch/ressources`,
  })),
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function html(card: Card) {
  const size = card.title.length > 90 ? 50 : card.title.length > 64 ? 58 : 68;
  return `<!doctype html><html lang="fr-CH"><head><meta charset="utf-8"><style>
@font-face{font-family:"Manrope";src:url("../fonts/manrope-latin-wght-normal.woff2") format("woff2-variations");font-weight:200 800}
@font-face{font-family:"Manrope";src:url("../fonts/manrope-latin-ext-wght-normal.woff2") format("woff2-variations");font-weight:200 800;unicode-range:U+0100-02BA}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:"Manrope",sans-serif;color:#f6f9ff;background:#050a24;position:relative}
.bg{position:absolute;inset:-10%;background:
 radial-gradient(42% 48% at 22% 30%,rgba(12,30,92,.95),transparent 70%),
 radial-gradient(36% 42% at 80% 20%,rgba(31,95,208,.6),transparent 70%),
 radial-gradient(24% 28% at 58% 80%,rgba(156,200,255,.3),transparent 70%),
 radial-gradient(30% 34% at 8% 90%,rgba(31,95,208,.4),transparent 70%),#050a24}
.grad{position:absolute;inset:0;background:linear-gradient(100deg,rgba(5,10,36,.75),rgba(5,10,36,.2) 60%,rgba(5,10,36,0))}
.in{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px;font-weight:800;font-size:28px;letter-spacing:-.03em}
.brand i{width:18px;height:18px;border-radius:5px;background:#1f5fd0;display:inline-block}
.k{font-size:16px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:rgba(246,249,255,.7);display:flex;align-items:center;gap:14px}
.k:before{content:"";width:34px;height:1px;background:#9cc8ff}
h1{margin-top:22px;font-size:${size}px;font-weight:800;line-height:1.08;letter-spacing:-.04em;max-width:19ch;text-wrap:balance}
.foot{display:flex;justify-content:space-between;font-size:18px;font-weight:600;color:rgba(246,249,255,.7)}
.pill{display:inline-flex;gap:8px;align-items:center;padding:10px 16px;border-radius:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:700}
</style></head><body><div class="bg"></div><div class="grad"></div><div class="in">
<div class="brand"><i></i>LX Studio</div>
<div><div class="k">${esc(card.kicker)}</div><h1>${esc(card.title)}</h1></div>
<div class="foot"><span>${esc(card.foot ?? "Installé sur site · Conçu pour la nLPD · lxstudio.ch")}</span><span class="pill">Vos données restent chez vous</span></div>
</div></body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
const tmp = resolve(out, "_render.html");
for (const card of cards) {
  writeFileSync(tmp, html(card));
  await page.goto(`file://${tmp}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(out, `${card.name}.jpg`), type: "jpeg", quality: 84 });
  console.log("og:", card.name);
}
rmSync(tmp);
await browser.close();
