/**
 * Le dossier sécurité en PDF, quatre pages A4, rendu avec Chromium depuis la
 * même source que la page /securite (src/content/ia/securite.ts) :
 *
 *   npm run dossier:pdf
 *
 * Page 1 : résumé pour la direction. Page 2 : architecture et flux de
 * données. Page 3 : mesures de sécurité. Page 4 : conformité et engagements.
 * Le numéro de version et la date viennent de SECURITE_VERSION. Les points
 * non confirmés restent marqués, en jaune, comme sur la page.
 */
import { chromium } from "playwright";
import { writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SECURITE_VERSION,
  SECURITE_HERO,
  SECURITE_SECTIONS,
  SECURITE_ENGAGEMENTS,
  type SecuriteSection,
} from "../src/content/ia/securite.ts";
import { SITE } from "../src/content/ia/site.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, `public${SECURITE_VERSION.file}`);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const mark = (s: string) => esc(s).replace(/\[À [^\]]+\]/g, (m) => `<mark>${m}</mark>`);
const by = (id: string): SecuriteSection => {
  const s = SECURITE_SECTIONS.find((x) => x.id === id);
  if (!s) throw new Error(`Section manquante : ${id}`);
  return s;
};

function section(s: SecuriteSection) {
  return `<section class="sec"><h2>${esc(s.title)}</h2><p class="sum">${mark(s.summary)}</p><ul>${s.points
    .map((p) => `<li>${mark(p)}</li>`)
    .join(
      "",
    )}</ul>${s.source ? `<p class="src">Source : ${esc(s.source.label)}, ${esc(s.source.url)}</p>` : ""}</section>`;
}

const header = `<header class="hd"><span class="brand"><i></i>LX Studio</span><span>Dossier sécurité · Version ${SECURITE_VERSION.version} · ${SECURITE_VERSION.date}</span></header>`;
const footer = (n: number) =>
  `<footer class="ft"><span>LX Studio · ${SITE.address.zip} ${SITE.address.city} · ${SITE.email} · ${SITE.phone}</span><span>Page ${n} / 4</span></footer>`;

const diagram = `<svg viewBox="0 0 640 300" class="dia" role="img" aria-label="Schéma : tout tourne dans le réseau du client">
<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5 0 10z" fill="#1f5fd0"/></marker></defs>
<rect x="12" y="14" width="430" height="272" rx="18" fill="#f1f5ff" stroke="#1f5fd0" stroke-width="1.5" stroke-dasharray="6 5"/>
<text x="30" y="40" font-size="12" font-weight="800" fill="#1f5fd0" letter-spacing="2">RÉSEAU DU CLIENT</text>
<rect x="30" y="58" width="250" height="210" rx="14" fill="#fff" stroke="#050a24" stroke-width="1.5"/>
<text x="46" y="84" font-size="13" font-weight="800" fill="#050a24">Machine installée sur site</text>
<rect x="46" y="100" width="218" height="40" rx="8" fill="#e8efff"/><text x="58" y="125" font-size="12" fill="#050a24">Connecteurs : messagerie, dossiers, Bexio</text>
<rect x="46" y="150" width="218" height="40" rx="8" fill="#e8efff"/><text x="58" y="175" font-size="12" fill="#050a24">Moteur d'IA exécuté localement</text>
<rect x="46" y="200" width="218" height="40" rx="8" fill="#e8efff"/><text x="58" y="225" font-size="12" fill="#050a24">Interface de validation (réseau interne)</text>
<rect x="310" y="90" width="110" height="52" rx="10" fill="#fff" stroke="#050a24" stroke-width="1.2"/><text x="322" y="112" font-size="12" font-weight="700" fill="#050a24">Vos outils</text><text x="322" y="128" font-size="11" fill="#444">Bexio, mails, NAS</text>
<rect x="310" y="170" width="110" height="52" rx="10" fill="#fff" stroke="#050a24" stroke-width="1.2"/><text x="322" y="192" font-size="12" font-weight="700" fill="#050a24">Vos équipes</text><text x="322" y="208" font-size="11" fill="#444">valident, corrigent</text>
<path d="M280 116 H308" stroke="#1f5fd0" stroke-width="2" marker-end="url(#a)"/><path d="M308 196 H282" stroke="#1f5fd0" stroke-width="2" marker-end="url(#a)"/>
<rect x="490" y="110" width="130" height="70" rx="14" fill="#fff" stroke="#999" stroke-width="1.2"/><text x="506" y="140" font-size="12" font-weight="700" fill="#555">Internet, cloud,</text><text x="506" y="158" font-size="12" font-weight="700" fill="#555">éditeurs d'IA</text>
<path d="M442 148 H486" stroke="#c62828" stroke-width="2" stroke-dasharray="5 4"/><circle cx="464" cy="148" r="11" fill="#fff" stroke="#c62828" stroke-width="2"/><path d="M458 142l12 12M470 142l-12 12" stroke="#c62828" stroke-width="2"/>
<text x="446" y="200" font-size="11" fill="#c62828" font-weight="700">Aucun document ne sort</text>
</svg>`;

const page1 = `<section class="page">${header}
<p class="k">Dossier sécurité</p><h1>${esc(SECURITE_HERO.title)}</h1><p class="lede">${esc(SECURITE_HERO.sub)}</p>
<h2>Résumé pour la direction</h2>
<ol class="sumlist">${SECURITE_SECTIONS.map((s) => `<li><strong>${esc(s.title)}.</strong> ${mark(s.summary)}</li>`).join("")}</ol>
<p class="note">Ce dossier n'est pas un avis juridique. Les points marqués en jaune sont en cours de confirmation et seront remplacés dans la version suivante, datée et numérotée.</p>
${footer(1)}</section>`;

const page2 = `<section class="page">${header}
<p class="k">Page 2</p><h1>Architecture et flux de données</h1>
${diagram}
${section(by("donnees"))}${section(by("architecture"))}
${footer(2)}</section>`;

const page3 = `<section class="page">${header}
<p class="k">Page 3</p><h1>Mesures de sécurité</h1>
${["chiffrement", "acces", "sauvegardes", "mises-a-jour", "fin-de-contrat", "pentest"].map((id) => section(by(id))).join("")}
${footer(3)}</section>`;

const page4 = `<section class="page">${header}
<p class="k">Page 4</p><h1>Conformité et engagements</h1>
${section(by("nlpd"))}
<section class="sec"><h2>Engagements contractuels</h2><ul>${SECURITE_ENGAGEMENTS.map((e) => `<li>${mark(e)}</li>`).join("")}</ul></section>
<section class="sec"><h2>Contact</h2><p>${esc(SITE.founder)}, ${esc(SITE.name)}<br>${mark(SITE.address.street)}, ${SITE.address.zip} ${esc(SITE.address.city)}<br>${esc(SITE.email)} · ${esc(SITE.phone)}<br>${esc(SITE.url)}/securite</p></section>
${footer(4)}</section>`;

const html = `<!doctype html><html lang="fr-CH"><head><meta charset="utf-8"><title>Dossier sécurité LX Studio ${SECURITE_VERSION.version}</title><style>
@font-face{font-family:"Manrope";src:url("fonts/manrope-latin-wght-normal.woff2") format("woff2-variations");font-weight:200 800}
@font-face{font-family:"Manrope";src:url("fonts/manrope-latin-ext-wght-normal.woff2") format("woff2-variations");font-weight:200 800;unicode-range:U+0100-02BA}
@page{size:A4;margin:0}
*{box-sizing:border-box}
html,body{margin:0;font-family:"Manrope",sans-serif;color:#050a24;font-size:10.5pt;line-height:1.5}
.page{position:relative;width:210mm;height:297mm;padding:22mm 18mm 20mm;page-break-after:always;overflow:hidden}
.page:last-child{page-break-after:auto}
.hd{position:absolute;top:10mm;left:18mm;right:18mm;display:flex;justify-content:space-between;font-size:8.5pt;font-weight:700;color:#5a6280;letter-spacing:.04em}
.brand{display:flex;align-items:center;gap:6px;color:#050a24;font-size:11pt;letter-spacing:-.02em;font-weight:800}
.brand i{width:9px;height:9px;border-radius:2.5px;background:#1f5fd0;display:inline-block}
.ft{position:absolute;bottom:9mm;left:18mm;right:18mm;display:flex;justify-content:space-between;font-size:8pt;color:#5a6280;border-top:1px solid #dfe5f3;padding-top:3mm}
.k{font-size:8.5pt;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#1f5fd0;margin:0 0 4mm}
h1{font-size:22pt;line-height:1.1;letter-spacing:-.03em;margin:0 0 5mm;font-weight:800}
h2{font-size:12.5pt;letter-spacing:-.015em;margin:6mm 0 2mm;font-weight:800}
.lede{font-size:11pt;color:#3a4160;margin:0 0 6mm}
.sumlist{padding-left:5mm;margin:0}
.sumlist li{margin:0 0 2.2mm}
.sec{margin:0 0 3mm}
.sec .sum{margin:0 0 1.5mm;font-weight:600}
.sec ul{margin:0;padding-left:5mm}
.sec li{margin:0 0 1.2mm}
.src{font-size:8.5pt;color:#5a6280;margin:1.5mm 0 0}
.note{margin-top:7mm;padding:4mm 5mm;border-radius:3mm;background:#eef3ff;font-size:9.5pt;color:#3a4160}
mark{background:#ffe08a;padding:0 2px;border-radius:2px;font-weight:700}
.dia{width:100%;height:auto;max-height:56mm;margin:1mm 0 3mm;border:1px solid #dfe5f3;border-radius:3mm}
</style></head><body>${page1}${page2}${page3}${page4}</body></html>`;

const tmp = resolve(root, "public/_dossier.html");
writeFileSync(tmp, html);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${tmp}`);
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: target, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
rmSync(tmp);
console.log("PDF écrit :", target);
