/**
 * Passe de vérification du site, contre le build servi en local :
 *
 *   npm run build && npx wrangler dev --port 4173   # dans un autre terminal
 *   node verif/shots.mjs
 *
 * Pour chaque écran (390×844, 768×1024, 1440×900) : premier écran de
 * l'accueil (titre révélé, nappe WebGL, hauteur), chaque section capturée
 * après son apparition, l'en-tête en verre, le survol d'une ligne, la FAQ,
 * le menu, la validation du formulaire sans envoi, les tirets, le
 * débordement horizontal, les images sans alt, les erreurs console. Puis les
 * pages intérieures, le mouvement réduit, les redirections et la 404.
 * Captures et report.json dans verif/captures/.
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = (process.env.BASE_URL ?? "http://localhost:4173").replace(/\/$/, "");
const OUT = process.env.OUT_DIR ?? "./verif/captures";
const VIEWPORTS = [
  { name: "iphone", width: 390, height: 844, dsf: 2, mobile: true },
  { name: "tablet", width: 768, height: 1024, dsf: 2, mobile: true },
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
];
const SECTIONS = [
  ["01-hero", ".ia-hero"],
  ["02-demo", "#demo"],
  ["03-references", ".ia-refs"],
  ["04-probleme", "section[aria-labelledby='problem-title']"],
  ["05-difference", ".ia-night-sec"],
  ["06-methode", "#methode"],
  ["07-metiers", "section[aria-labelledby='sectors-title']"],
  ["08-ressources", "#posts"],
  ["09-formulaire", "#diagnostic"],
  ["10-faq", "#faq"],
  ["11-footer", ".ia-footer"],
];
const INNER = [
  "/fiduciaires",
  "/administrations",
  "/pme",
  "/securite",
  "/ressources",
  "/ressources/fiduciaire-automatiser-saisie-pieces-ia",
  "/mentions-legales",
  "/politique-de-confidentialite",
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = {};

const layoutChecks = () => ({
  dashes: (document.body.innerText.match(/[–—]/g) || []).length,
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  docHeight: document.documentElement.scrollHeight,
  imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
  imgsNoSize: [...document.querySelectorAll("img")].filter((i) => !i.getAttribute("width")).length,
  h1: document.querySelectorAll("h1").length,
  placeholders: document.querySelectorAll(".ia-placeholder").length,
  font: getComputedStyle(document.body).fontFamily.split(",")[0],
  smallText: [...document.querySelectorAll("main p, main li, main dd")]
    .filter(
      (e) =>
        e.offsetParent && parseFloat(getComputedStyle(e).fontSize) < 13 && !e.closest(".ia-sr"),
    )
    .map((e) => e.className + " " + e.textContent.slice(0, 30))
    .slice(0, 6),
});

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const dir = `${OUT}/${vp.name}`;
  mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await sleep(1800);
  const r = (report[vp.name] = {});

  // 1. Premier écran
  r.first = await page.evaluate(() => {
    const hero = document.querySelector(".ia-hero").getBoundingClientRect();
    const h1 = document.querySelector(".ia-hero-title");
    const words = [...h1.querySelectorAll(".ia-w-in")];
    const shown = words.filter(
      (w) =>
        Math.abs(w.getBoundingClientRect().top - w.parentElement.getBoundingClientRect().top) < 2,
    ).length;
    const ctas = document.querySelector(".ia-hero .ia-btn-row").getBoundingClientRect();
    const canvas = document.querySelector(".ia-hero canvas");
    const header = document.querySelector(".ia-header");
    return {
      heroHeight: Math.round(hero.height),
      innerHeight,
      h1Lines: Math.round(
        h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight),
      ),
      h1Font: getComputedStyle(h1).fontSize,
      wordsShown: `${shown}/${words.length}`,
      ctasBottom: Math.round(ctas.bottom),
      mesh: canvas ? canvas.classList.contains("is-on") : null,
      headerOver: header.classList.contains("is-over"),
      headerScrolled: header.classList.contains("is-scrolled"),
      eyebrowLine: getComputedStyle(document.querySelector(".ia-hero .ia-eyebrow-line")).transform,
    };
  });
  await page.screenshot({ path: `${dir}/00-first-screen.png` });

  // 2. Sections
  r.sections = {};
  for (const [name, sel] of SECTIONS) {
    const ok = await page.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return false;
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: "instant" });
      return true;
    }, sel);
    if (!ok) {
      r.sections[name] = "missing";
      continue;
    }
    await sleep(1500);
    r.sections[name] = await page.evaluate((s) => {
      const el = document.querySelector(s);
      const rv = [...el.querySelectorAll("[data-rv]")];
      const hidden = rv.filter((e) => {
        const b = e.getBoundingClientRect();
        return b.top < innerHeight && b.bottom > 0 && getComputedStyle(e).opacity === "0";
      }).length;
      return {
        height: Math.round(el.getBoundingClientRect().height),
        reveals: rv.length,
        hiddenInView: hidden,
        bg: getComputedStyle(el).backgroundColor,
        canvasOn: el.querySelector("canvas.is-on")
          ? true
          : el.querySelector("canvas")
            ? false
            : null,
        headerScrolled: document.querySelector(".ia-header").classList.contains("is-scrolled"),
        headerOver: document.querySelector(".ia-header").classList.contains("is-over"),
      };
    }, sel);
    await page.screenshot({ path: `${dir}/${name}.png` });
  }

  // 2b. La démo : l'affiche, puis la vidéo qui joue au clic
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector("#demo").getBoundingClientRect().top + scrollY - 70,
      behavior: "instant",
    }),
  );
  await sleep(900);
  await page.click(".ia-demo-start");
  await sleep(2500);
  r.demo = await page.evaluate(() => {
    const v = document.querySelector(".ia-demo-video");
    return v
      ? {
          playing: !v.paused && v.currentTime > 0,
          currentTime: Math.round(v.currentTime * 10) / 10,
          size: `${v.videoWidth}x${v.videoHeight}`,
          duration: Math.round(v.duration),
          src: (v.currentSrc || "").split("/").pop(),
        }
      : "no video";
  });
  await page.screenshot({ path: `${dir}/demo-playing.png` });

  // 3. Survol d'une ligne et d'une carte (souris fine seulement)
  if (!vp.mobile) {
    await page.evaluate(() =>
      window.scrollTo({
        top: document.querySelector("#methode").getBoundingClientRect().top + scrollY - 70,
        behavior: "instant",
      }),
    );
    await sleep(900);
    await page.hover("#methode .ia-row:nth-child(2)");
    await sleep(500);
    r.hoverRow = await page.evaluate(() => {
      const row = document.querySelector("#methode .ia-row:nth-child(2)");
      return {
        bg: getComputedStyle(row).backgroundColor,
        padLeft: getComputedStyle(row).paddingLeft,
      };
    });
    await page.screenshot({ path: `${dir}/hover-row.png` });
    await page.hover(".ia-nav-drop .ia-nav-item");
    await sleep(600);
    r.menuPanel = await page.evaluate(() => {
      const p = document.querySelector(".ia-nav-panel");
      return { opacity: getComputedStyle(p).opacity, visibility: getComputedStyle(p).visibility };
    });
    await page.screenshot({ path: `${dir}/menu-metiers.png` });
    await page.mouse.move(10, 500);
  }

  // 4. FAQ : une seule ouverte
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector("#faq").getBoundingClientRect().top + scrollY - 70,
      behavior: "instant",
    }),
  );
  await sleep(900);
  await page.click("#faq-q1");
  await sleep(700);
  const open1 = await page.evaluate(() =>
    [...document.querySelectorAll("#faq .ia-faq-item")].map((e) => e.dataset.open === "true"),
  );
  await page.click("#faq-q3");
  await sleep(700);
  const open2 = await page.evaluate(() =>
    [...document.querySelectorAll("#faq .ia-faq-item")].map((e) => e.dataset.open === "true"),
  );
  r.faq = { afterFirst: open1, afterSecond: open2 };
  await page.screenshot({ path: `${dir}/faq-open.png` });

  // 5. Formulaire : envoi vide → messages, sans requête
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector("#diagnostic").getBoundingClientRect().top + scrollY - 70,
      behavior: "instant",
    }),
  );
  await sleep(900);
  const requests = [];
  page.on("request", (q) => q.url().includes("_serverFn") && requests.push(q.url()));
  await page.click("#diagnostic form button[type=submit]");
  await sleep(1200);
  r.form = {
    errors: await page.evaluate(() =>
      [...document.querySelectorAll("#diagnostic .ia-field-err")].map((e) => e.textContent),
    ),
    serverCalls: requests.length,
  };
  await page.screenshot({ path: `${dir}/form-errors.png` });

  // 6. Retour en haut et en-tête
  await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
  await sleep(500);
  r.scrolled = await page.evaluate(() => ({
    headerScrolled: document.querySelector(".ia-header").classList.contains("is-scrolled"),
    headerBg: getComputedStyle(document.querySelector(".ia-header")).backgroundColor,
    topVisible: document.querySelector(".ia-top").classList.contains("is-on"),
  }));
  await page.screenshot({
    path: `${dir}/header-scrolled.png`,
    clip: { x: 0, y: 0, width: vp.width, height: 120 },
  });

  // 7. Menu mobile
  if (vp.width < 1024) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await sleep(400);
    await page.click(".ia-burger");
    await sleep(900);
    r.menu = await page.evaluate(() => ({
      open: document.querySelector(".ia-menu").classList.contains("is-open"),
      links: [...document.querySelectorAll(".ia-menu a")].map((a) =>
        a.textContent.trim().slice(0, 30),
      ),
      bodyLocked: document.body.classList.contains("ia-menu-open"),
    }));
    await page.screenshot({ path: `${dir}/menu.png` });
    await page.keyboard.press("Escape");
    await sleep(500);
    r.menuClosed = await page.evaluate(
      () => !document.querySelector(".ia-menu").classList.contains("is-open"),
    );
  }

  // 8. Contrôles de mise en page
  r.layout = await page.evaluate(layoutChecks);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await sleep(300);
  await page.screenshot({ path: `${dir}/full-page.png`, fullPage: true });
  r.errors = errors;
  await ctx.close();
}

// Pages intérieures, aux deux largeurs
for (const vp of [VIEWPORTS[0], VIEWPORTS[2]]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await ctx.newPage();
  const inner = (report[`inner-${vp.name}`] = {});
  for (const path of INNER) {
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    await sleep(1400);
    inner[path] = {
      status: res.status(),
      title: await page.title(),
      ...(await page.evaluate(layoutChecks)),
      canonical: await page.evaluate(() => document.querySelector("link[rel=canonical]")?.href),
      ogImage: await page.evaluate(
        () => document.querySelector("meta[property='og:image']")?.content,
      ),
      jsonLd: await page.evaluate(
        () => [...document.querySelectorAll("script[type='application/ld+json']")].length,
      ),
      errors,
    };
    await page.screenshot({ path: `${OUT}/${vp.name}/inner${path.replace(/\//g, "-")}.png` });
    if (path === "/securite" && vp.name === "desktop") {
      await page.evaluate(() =>
        window.scrollTo({
          top: document.querySelector("#dossier").getBoundingClientRect().top + scrollY - 70,
          behavior: "instant",
        }),
      );
      await sleep(900);
      await page.screenshot({ path: `${OUT}/${vp.name}/inner-securite-dossier.png` });
    }
  }
  await ctx.close();
}

// Mouvement réduit
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await sleep(800);
  report.reducedMotion = await page.evaluate(() => ({
    hiddenRv: [...document.querySelectorAll("[data-rv]")].filter(
      (e) => getComputedStyle(e).opacity === "0",
    ).length,
    motionOff: document.documentElement.classList.contains("ia-motion-off"),
    wordsHidden: [...document.querySelectorAll(".ia-w-in")].filter(
      (e) => getComputedStyle(e).transform !== "none",
    ).length,
    meshAnim: getComputedStyle(document.querySelector(".ia-mesh-css")).animationName,
  }));
  await ctx.close();
}

// Redirections, 404, fichiers publics
{
  const ctx = await browser.newContext();
  const req = ctx.request;
  const check = async (path) => {
    const res = await req.get(BASE + path, { maxRedirects: 0 });
    return { status: res.status(), location: res.headers()["location"] ?? null };
  };
  report.redirects = {};
  for (const p of [
    "/fiduciaire",
    "/mentia",
    "/athlit",
    "/blog",
    "/blog/plateforme-automatisation-ou-code",
    "/blog/pourquoi-chatgpt-cite-votre-concurrent",
  ]) {
    report.redirects[p] = await check(p);
  }
  report.notFound = (await req.get(BASE + "/ressources/inconnu")).status();
  report.files = {};
  for (const p of [
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/dossier-securite-lx-studio.pdf",
    "/og/accueil.jpg",
    "/fonts/manrope-latin-wght-normal.woff2",
  ]) {
    const res = await req.get(BASE + p);
    report.files[p] = {
      status: res.status(),
      type: res.headers()["content-type"],
      robots: res.headers()["x-robots-tag"] ?? null,
    };
  }
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
