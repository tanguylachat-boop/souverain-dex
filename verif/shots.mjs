import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:4173/";
const OUT = process.env.OUT_DIR ?? "./verif/captures";
const BASELINE_CHARS = Number(process.env.BASELINE_CHARS ?? 9428);
const VIEWPORTS = [
  { name: "iphone", width: 390, height: 844, dsf: 2, mobile: true },
  { name: "tablet", width: 768, height: 1024, dsf: 2, mobile: true },
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
];
const SCREENS = ["#accueil", "#probleme", "#installe", "#resultats", "#methode", "#faq", "#reserver", ".other-projects", "footer"];

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
    await new Promise((r) => setTimeout(r, 600));
  });
}

for (const vp of VIEWPORTS) {
  const dir = `${OUT}/${vp.name}`;
  mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dsf, isMobile: vp.mobile, hasTouch: vp.mobile, locale: "fr-CH" });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${dir}/00-first-screen.png` });

  const firstScreen = await page.evaluate(() => {
    const hero = document.querySelector("#accueil");
    const title = document.querySelector("#probleme-title");
    return {
      innerHeight: window.innerHeight,
      heroHeight: hero?.offsetHeight,
      heroMaxAllowed: Math.round(window.innerHeight * 0.7),
      problemTitleTop: Math.round(title?.getBoundingClientRect().top ?? -1),
      hiddenInViewport: [...document.querySelectorAll(".appear:not(.is-in)")].filter((el) => el.getBoundingClientRect().top < window.innerHeight).length,
    };
  });

  // Text mass with every disclosure closed, against the previous version.
  const textMass = await page.evaluate(() => {
    const opened = [...document.querySelectorAll("details[open]")];
    for (const d of opened) d.open = false;
    const t = document.querySelector("main").innerText.replace(/\s+/g, " ").trim();
    for (const d of opened) d.open = true;
    return { chars: t.length, words: t.split(" ").length };
  });
  textMass.ratio = +(textMass.chars / BASELINE_CHARS).toFixed(2);

  // Hero contrast on the darkened photo, worst 5 % of pixels behind each block.
  const heroContrast = await page.evaluate(async () => {
    const img = document.querySelector("#accueil img");
    const shade = 0.55, bg = [5, 5, 7];
    const c = document.createElement("canvas");
    const box = img.getBoundingClientRect();
    c.width = Math.round(box.width); c.height = Math.round(box.height);
    const g = c.getContext("2d");
    try { g.drawImage(img, 0, 0, c.width, c.height); } catch (e) { return { error: String(e) }; }
    const lum = (r, gg, b) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b); };
    const out = {};
    const wide = window.innerWidth >= 768;
    for (const [name, sel, alpha] of [["title", "#accueil-title", 1], ["lede", ".home-hero-lede", 0.92], ["clients", ".home-hero-clients", 0.9], ["eyebrow", ".home-hero-eyebrow", 0.92]]) {
      const el = document.querySelector(sel); if (!el) continue;
      const b = el.getBoundingClientRect();
      const x0 = Math.max(0, Math.round(b.left - box.left)), y0 = Math.max(0, Math.round(b.top - box.top));
      const w = Math.min(c.width - x0, Math.round(b.width)), h = Math.min(c.height - y0, Math.round(b.height));
      if (w <= 0 || h <= 0) continue;
      const d = g.getImageData(x0, y0, w, h).data;
      const lums = [];
      for (let i = 0; i < d.length; i += 16) {
        const px = ((i / 4) % w + x0) / c.width;
        const scrim = !wide ? 0.22 : px < 0.45 ? 0.5 - (0.2 * px) / 0.45 : px < 0.8 ? 0.3 * (1 - (px - 0.45) / 0.35) : 0;
        const keep = (1 - shade) * (1 - scrim), dark = 1 - keep;
        lums.push(lum(d[i] * keep + bg[0] * dark, d[i + 1] * keep + bg[1] * dark, d[i + 2] * keep + bg[2] * dark));
      }
      lums.sort((a, b2) => a - b2);
      const p95 = lums[Math.floor(lums.length * 0.95)];
      const textLum = lum(255 * alpha, 255 * alpha, 255 * alpha);
      out[name] = +((textLum + 0.05) / (p95 + 0.05)).toFixed(2);
    }
    return out;
  });

  // Rails: scrollable on the phone, index follows, arrows work on wide screens.
  const rails = [];
  const railCount = await page.locator(".rail").count();
  for (let r = 0; r < railCount; r++) {
    const rail = page.locator(".rail").nth(r);
    await rail.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const info = await rail.evaluate((el) => {
      const track = el.querySelector(".rail-track");
      return { label: track.getAttribute("aria-label"), cards: track.children.length, scrollable: track.scrollWidth > track.clientWidth + 2, index: el.querySelector(".rail-index")?.textContent?.trim() ?? null, pageOverflow: document.documentElement.scrollWidth > window.innerWidth };
    });
    await rail.screenshot({ path: `${dir}/rail-${r + 1}-start.png` });
    // Swipe: scroll the track by one card.
    await rail.evaluate((el) => { const t = el.querySelector(".rail-track"); const first = t.firstElementChild; const gap = parseFloat(getComputedStyle(t).columnGap) || 0; t.scrollBy({ left: first.offsetWidth + gap, behavior: "instant" }); });
    await page.waitForTimeout(350);
    info.indexAfterSwipe = await rail.evaluate((el) => el.querySelector(".rail-index")?.textContent?.trim() ?? null);
    await rail.screenshot({ path: `${dir}/rail-${r + 1}-second.png` });
    // Arrow button (wide screens only).
    const next = rail.locator('button[aria-label="Carte suivante"]');
    info.arrowVisible = (await next.count()) > 0 && (await next.isVisible());
    info.arrowEnabledAfterSwipe = info.arrowVisible ? !(await next.isDisabled()) : null;
    if (info.arrowVisible && info.arrowEnabledAfterSwipe) {
      await next.click();
      await page.waitForTimeout(500);
      info.indexAfterArrow = await rail.evaluate((el) => el.querySelector(".rail-index")?.textContent?.trim() ?? null);
    }
    await rail.evaluate((el) => { const t = el.querySelector(".rail-track"); t.scrollTo({ left: t.scrollWidth, behavior: "instant" }); });
    await page.waitForTimeout(350);
    info.indexAtEnd = await rail.evaluate((el) => el.querySelector(".rail-index")?.textContent?.trim() ?? null);
    info.nextDisabledAtEnd = info.arrowVisible ? await next.isDisabled() : null;
    await rail.screenshot({ path: `${dir}/rail-${r + 1}-end.png` });
    await rail.evaluate((el) => el.querySelector(".rail-track").scrollTo({ left: 0, behavior: "instant" }));
    rails.push(info);
  }

  // Disclosures: click, keyboard, accordion.
  const disclosures = await (async () => {
    const pitfalls = page.locator(".pitfalls > summary");
    await pitfalls.scrollIntoViewIfNeeded();
    await pitfalls.click();
    await page.waitForTimeout(300);
    const pitfallsOpen = await page.locator(".pitfalls").evaluate((el) => el.open);
    await pitfalls.click();
    const detail = page.locator(".card-detail > summary").first();
    await detail.scrollIntoViewIfNeeded();
    await detail.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const detailOpenByKeyboard = await page.locator(".card-detail").first().evaluate((el) => el.open);
    const stepsBefore = await page.locator(".method details[open]").count();
    const second = page.locator(".method-step > summary").nth(1);
    await second.scrollIntoViewIfNeeded();
    await second.click();
    await page.waitForTimeout(400);
    const openSteps = await page.locator(".method details[open]").evaluateAll((els) => els.map((e) => e.querySelector(".method-title")?.textContent));
    return { pitfallsOpen, detailOpenByKeyboard, openStepsBefore: stepsBefore, openStepsAfterSecondClick: openSteps };
  })();

  // Photos zoom while crossing the screen.
  const zoom = await (async () => {
    const fig = page.locator(".zoom-photo").first();
    const top = await fig.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo({ top: y - window.innerHeight + 40, behavior: "instant" }), top);
    await page.waitForTimeout(250);
    const entering = await fig.locator("img").evaluate((img) => img.style.transform);
    await page.evaluate((y) => window.scrollTo({ top: y - 80, behavior: "instant" }), top);
    await page.waitForTimeout(250);
    const atTop = await fig.locator("img").evaluate((img) => img.style.transform);
    return { entering, atTop };
  })();

  await scrollThrough(page);

  const typography = await page.evaluate(() => {
    const small = [], longLines = [];
    for (const el of document.querySelectorAll("main p, main dd, main li, main summary")) {
      const text = (el.innerText || "").trim();
      if (!text || el.closest("[aria-hidden='true']")) continue;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const isBody = (el.tagName === "P" || el.tagName === "DD") && text.length > 60;
      const label = `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ").filter(Boolean).slice(0, 2).join(".")} “${text.slice(0, 36)}”`;
      if (isBody && fs < 17) small.push({ label, fontSize: fs });
      if (isBody) {
        const range = document.createRange(); range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((r) => r.width > 0);
        const avg = rects.reduce((a, r) => a + r.width, 0) / Math.max(1, text.length);
        const longest = Math.round(Math.max(...rects.map((r) => r.width)) / avg);
        if (longest > 65) longLines.push({ label, longestLineChars: longest });
      }
    }
    return { small, longLines };
  });

  const layout = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    emDash: (document.body.innerText.match(/—/g) || []).length,
    hiddenAfterScroll: document.querySelectorAll(".appear:not(.is-in)").length,
    images: [...document.querySelectorAll("main img")].map((img) => ({ src: img.getAttribute("src").split("/").pop(), alt: !!img.alt, loading: img.getAttribute("loading"), sized: !!(img.getAttribute("width") && img.getAttribute("height")), upscale: +((img.getBoundingClientRect().width * devicePixelRatio) / (img.naturalWidth || 1)).toFixed(2) })),
  }));

  for (const sel of SCREENS) {
    const loc = page.locator(sel).first();
    if ((await loc.count()) === 0) continue;
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await loc.screenshot({ path: `${dir}/${sel.replace(/[^a-z-]/gi, "")}.png` });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${dir}/full-page.png`, fullPage: true });

  report[vp.name] = { firstScreen, textMass, heroContrast, rails, disclosures, zoom, typography, layout, consoleErrors };
  await ctx.close();
}

// Reduced motion: nothing hidden, nothing moving.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await page.waitForTimeout(300);
  report.reducedMotion = await page.evaluate(() => ({
    hiddenAppear: document.querySelectorAll(".appear:not(.is-in)").length,
    heroTransform: document.querySelector(".home-hero-photo").style.transform || "none",
    photoTransforms: [...document.querySelectorAll(".zoom-photo img")].map((i) => i.style.transform || "none"),
  }));
  await ctx.close();
}

// Keyboard and links.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const focus = [];
  for (let i = 0; i < 16; i++) {
    await page.keyboard.press("Tab");
    focus.push(await page.evaluate(() => { const el = document.activeElement; const cs = getComputedStyle(el); return { tag: el.tagName.toLowerCase(), text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 36), outline: cs.outlineStyle !== "none" }; }));
  }
  report.keyboard = focus;
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab"); await page.keyboard.press("Enter"); await page.waitForTimeout(300);
  report.skipLink = await page.evaluate(() => document.activeElement.id);
  report.links = await page.evaluate(() => [...document.querySelectorAll("main a[href]")].map((a) => ({ href: a.getAttribute("href"), target: a.getAttribute("target") })));
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log("report written");
