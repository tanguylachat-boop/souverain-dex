import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:4173/";
const OUT = process.env.OUT_DIR ?? "./verif/captures";
const VIEWPORTS = [
  { name: "iphone", width: 390, height: 844, dsf: 2, mobile: true },
  { name: "tablet", width: 768, height: 1024, dsf: 2, mobile: true },
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
];
const SECTIONS = ["#accueil", "#clients", "#preuve", "#temps", "#erreurs", "#exemples", "#donnees", "#faq", "#a-propos", "section:has(#cta-title)", ".other-projects", "footer"];

const report = {};
const browser = await chromium.launch();

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 700));
  });
}

for (const vp of VIEWPORTS) {
  const dir = `${OUT}/${vp.name}`;
  mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    locale: "fr-CH",
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  // First screen, untouched: what a visitor sees before any scroll.
  await page.screenshot({ path: `${dir}/00-first-screen.png` });

  const firstScreen = await page.evaluate(() => {
    const hero = document.querySelector("#accueil");
    const proofTitle = document.querySelector("#preuve-title");
    const clients = document.querySelector("#clients");
    const r = (el) => el ? el.getBoundingClientRect() : null;
    return {
      innerHeight: window.innerHeight,
      heroHeight: hero?.offsetHeight,
      heroMaxAllowed: Math.round(window.innerHeight * 0.7),
      clientsTop: r(clients)?.top,
      proofTitleTop: r(proofTitle)?.top,
      proofTitleBottom: r(proofTitle)?.bottom,
      hidden: document.querySelectorAll(".appear:not(.is-in)").length,
      hiddenInViewport: [...document.querySelectorAll(".appear:not(.is-in)")].filter((el) => el.getBoundingClientRect().top < window.innerHeight).length,
    };
  });

  // Hero text contrast against the darkened photo, measured on the real pixels.
  const heroContrast = await page.evaluate(async () => {
    const img = document.querySelector("#accueil img");
    const shade = 0.55;
    const bg = [5, 5, 7];
    const c = document.createElement("canvas");
    const box = img.getBoundingClientRect();
    c.width = Math.round(box.width); c.height = Math.round(box.height);
    const g = c.getContext("2d");
    try { g.drawImage(img, 0, 0, c.width, c.height); } catch (e) { return { error: String(e) }; }
    const lum = (r, gg, b) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b);
    };
    const out = {};
    for (const [name, sel, alpha] of [["title", "#accueil-title", 1], ["lede", ".home-hero-lede", 0.92], ["trust", ".home-hero-trust", 0.9], ["eyebrow", ".home-hero-eyebrow", 0.92]]) {
      const el = document.querySelector(sel); if (!el) continue;
      const b = el.getBoundingClientRect();
      const x0 = Math.max(0, Math.round(b.left - box.left)), y0 = Math.max(0, Math.round(b.top - box.top));
      const w = Math.min(c.width - x0, Math.round(b.width)), h = Math.min(c.height - y0, Math.round(b.height));
      if (w <= 0 || h <= 0) continue;
      const d = g.getImageData(x0, y0, w, h).data;
      const lums = [];
      const wide = window.innerWidth >= 768;
      for (let i = 0; i < d.length; i += 16) {
        // The text scrim: uniform 22 % on phones, a left-to-right gradient
        // (50 % to 30 % until 45 % of the width, then to 0 at 80 %) elsewhere.
        const px = ((i / 4) % w + x0) / c.width;
        const scrim = !wide ? 0.22 : px < 0.45 ? 0.5 - (0.2 * px) / 0.45 : px < 0.8 ? 0.3 * (1 - (px - 0.45) / 0.35) : 0;
        const keep = (1 - shade) * (1 - scrim), dark = 1 - keep;
        const r = d[i] * keep + bg[0] * dark, gg = d[i + 1] * keep + bg[1] * dark, bb = d[i + 2] * keep + bg[2] * dark;
        lums.push(lum(r, gg, bb));
      }
      lums.sort((a, b2) => a - b2);
      const mean = lums.reduce((a, b2) => a + b2, 0) / lums.length;
      const p95 = lums[Math.floor(lums.length * 0.95)];
      const textLum = lum(255 * alpha + mean * 0 , 255 * alpha, 255 * alpha); // text over mean bg approximated as alpha white
      const ratio = (bgl) => (textLum + 0.05) / (bgl + 0.05);
      out[name] = { meanBgLum: +mean.toFixed(3), p95BgLum: +p95.toFixed(3), contrastVsMean: +ratio(mean).toFixed(2), contrastVsP95: +ratio(p95).toFixed(2) };
    }
    return out;
  });

  await scrollThrough(page);

  // Typography audit over the whole page.
  const typography = await page.evaluate(() => {
    const small = [], longLines = [], lowLineHeight = [];
    const sel = "main p, main dd, main li, main summary, main h3, main a.btn";
    for (const el of document.querySelectorAll(sel)) {
      const text = (el.innerText || "").trim();
      if (!text || el.closest("[aria-hidden='true']")) continue;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const lh = cs.lineHeight === "normal" ? 1.2 * fs : parseFloat(cs.lineHeight);
      const isBody = (el.tagName === "P" || el.tagName === "DD" || el.tagName === "LI") && text.length > 60;
      const label = `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ").filter(Boolean).slice(0, 2).join(".")} “${text.slice(0, 40)}”`;
      if (isBody && fs < 18) small.push({ label, fontSize: fs });
      if (isBody && lh / fs < 1.55) lowLineHeight.push({ label, lineHeight: +(lh / fs).toFixed(2) });
      if (isBody) {
        // Real line count from the layout, then the longest line in characters.
        const range = document.createRange(); range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((r) => r.width > 0);
        const lines = Math.max(1, Math.round(el.getBoundingClientRect().height / lh));
        const cpl = Math.round(text.length / lines);
        // Average advance per character from the laid-out text itself.
        const inkWidth = rects.reduce((a, r) => a + r.width, 0);
        const avg = inkWidth / Math.max(1, text.length);
        const widthChars = Math.round(el.clientWidth / avg);
        const longest = Math.round(Math.max(...rects.map((r) => r.width)) / avg);
        if (longest > 65) longLines.push({ label, longestLineChars: longest, widthInChars: widthChars, charsPerLine: cpl, lines });
      }
    }
    return { small, lowLineHeight, longLines };
  });

  const layout = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth > window.innerWidth;
    const outside = [];
    for (const el of document.querySelectorAll("main *")) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > window.innerWidth + 1) outside.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} right=${Math.round(r.right)}`);
      if (outside.length > 8) break;
    }
    const images = [...document.querySelectorAll("main img")].map((img) => ({
      src: img.getAttribute("src"), alt: img.alt, loading: img.getAttribute("loading"), w: img.getAttribute("width"), h: img.getAttribute("height"),
      natural: `${img.naturalWidth}x${img.naturalHeight}`, displayed: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
      upscale: +(img.getBoundingClientRect().width * devicePixelRatio / (img.naturalWidth || 1)).toFixed(2),
    }));
    const emDash = (document.body.innerText.match(/—/g) || []).length;
    return { overflow, outside, images, emDash, hiddenAfterScroll: document.querySelectorAll(".appear:not(.is-in)").length };
  });

  // Section screenshots.
  for (const sel of SECTIONS) {
    const loc = page.locator(sel).first();
    if ((await loc.count()) === 0) continue;
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    const name = sel.replace(/[^a-z0-9-]/gi, "").replace(/^-+/, "") || "section";
    await loc.screenshot({ path: `${dir}/${name}.png` });
  }
  // The pinned sequence, one shot per step.
  const methode = page.locator("#methode");
  const box = await methode.boundingBox();
  if (box) {
    const top = await page.evaluate(() => document.querySelector("#methode").getBoundingClientRect().top + window.scrollY);
    const h = box.height;
    const steps = 4;
    for (let i = 0; i < steps; i++) {
      const y = h > vp.height * 1.5 ? top + ((h - vp.height) * (i + 0.5)) / steps : top;
      await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${dir}/methode-${i + 1}.png` });
      if (h <= vp.height * 1.5) { await methode.screenshot({ path: `${dir}/methode-stacked.png` }); break; }
    }
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${dir}/full-page.png`, fullPage: true });

  report[vp.name] = { firstScreen, heroContrast, typography, layout, consoleErrors };
  await ctx.close();
}

// Reduced motion: nothing hidden, nothing moving.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  report.reducedMotion = await page.evaluate(() => ({
    hiddenAppear: document.querySelectorAll(".appear:not(.is-in)").length,
    appearOpacity: [...document.querySelectorAll(".appear")].map((e) => getComputedStyle(e).opacity).filter((o) => o !== "1").length,
    heroTransform: getComputedStyle(document.querySelector(".home-hero-photo")).transform,
  }));
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  await page.waitForTimeout(200);
  report.reducedMotion.heroTransformAfterScroll = await page.evaluate(() => getComputedStyle(document.querySelector(".home-hero-photo")).transform);
  await ctx.close();
}

// Parallax: the photo moves, and never more than 40px.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const samples = [];
  for (const y of [0, 200, 400, 630, 1200]) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(160);
    samples.push({ y, transform: await page.evaluate(() => document.querySelector(".home-hero-photo").style.transform) });
  }
  report.parallax = samples;
  await ctx.close();
}

// Keyboard: tab order, focus visibility, skip link.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const focus = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    focus.push(await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40), href: el.getAttribute("href"), outline: cs.outlineStyle !== "none" ? `${cs.outlineStyle} ${cs.outlineWidth}` : "none", onScreen: r.top >= 0 && r.bottom <= window.innerHeight };
    }));
  }
  report.keyboard = focus;
  // Skip link activation lands on main.
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  report.skipLink = await page.evaluate(() => ({ active: document.activeElement.id || document.activeElement.tagName, hash: location.hash }));
  // FAQ disclosure by keyboard.
  await page.locator("#faq summary").first().focus();
  await page.keyboard.press("Enter");
  report.faqKeyboard = await page.evaluate(() => document.querySelector("#faq details").open);
  // Links to check.
  report.links = await page.evaluate(() => [...document.querySelectorAll("main a[href]")].map((a) => ({ href: a.getAttribute("href"), text: a.innerText.trim().slice(0, 40), target: a.getAttribute("target"), rel: a.getAttribute("rel") })));
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
