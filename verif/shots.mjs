import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:4173/";
const OUT = process.env.OUT_DIR ?? "./verif/captures";
const VIEWPORTS = [
  { name: "iphone", width: 390, height: 844, dsf: 2, mobile: true },
  { name: "tablet", width: 768, height: 1024, dsf: 2, mobile: true },
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
];
const SECTIONS = [
  ".hero",
  ".chiffres",
  ".works",
  ".avis",
  ".pourquoi",
  ".methode",
  ".inclus",
  ".seuil",
  ".tarifs",
  ".faq",
  ".cta",
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = {};

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
  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(1200);
  const r = (report[vp.name] = {});

  // 1. First screen
  r.first = await page.evaluate(() => {
    const hero = document.querySelector(".hero").getBoundingClientRect();
    const v = document.querySelector(".hero-video");
    const h1 = document.querySelector(".hero-h1").getBoundingClientRect();
    const ctas = document.querySelector(".hero-ctas").getBoundingClientRect();
    const rot = document.querySelector(".rw.on")?.textContent;
    return {
      heroHeight: Math.round(hero.height),
      innerHeight: innerHeight,
      h1Top: Math.round(h1.top),
      h1Lines: Math.round(
        h1.height / parseFloat(getComputedStyle(document.querySelector(".hero-h1")).lineHeight),
      ),
      ctasBottom: Math.round(ctas.bottom),
      videoSrc: v?.getAttribute("src"),
      videoPlaying: v ? !v.paused && v.readyState >= 2 : null,
      rotating: rot,
      font: getComputedStyle(document.querySelector(".hero-h1")).fontFamily.split(",")[0],
    };
  });
  await page.screenshot({ path: `${dir}/00-first-screen.png` });

  // 2. Rotating word changes
  await sleep(3600);
  r.rotatingAfter = await page.evaluate(() => document.querySelector(".rw.on")?.textContent);

  // 3. Sections: scroll, wait reveal, screenshot
  r.sections = {};
  for (const sel of SECTIONS) {
    const ok = await page.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return false;
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 60, behavior: "instant" });
      return true;
    }, sel);
    if (!ok) {
      r.sections[sel] = "missing";
      continue;
    }
    await sleep(1600);
    r.sections[sel] = await page.evaluate((s) => {
      const el = document.querySelector(s);
      const rv = [...el.querySelectorAll("[data-rv]")];
      const hidden = rv.filter((e) => {
        const b = e.getBoundingClientRect();
        return b.top < innerHeight && b.bottom > 0 && getComputedStyle(e).opacity === "0";
      }).length;
      const root = document.querySelector("main.lx");
      return {
        height: Math.round(el.getBoundingClientRect().height),
        hiddenInView: hidden,
        tone: getComputedStyle(root).getPropertyValue("--tone").trim(),
        inkOn: root.classList.contains("ink-on"),
        bg: getComputedStyle(el).backgroundColor,
        text: getComputedStyle(el).color,
      };
    }, sel);
    await page.screenshot({ path: `${dir}/${sel.replace(".", "")}.png` });
  }

  // 4. Counters
  r.counters = await page.evaluate(() =>
    [...document.querySelectorAll("[data-count]")].map((e) => ({
      target: e.dataset.count,
      shown: e.querySelector("[data-count-value]")?.textContent,
    })),
  );

  // 5. Carousel: go back, wait autoplay
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".works").getBoundingClientRect().top + scrollY + 100,
      behavior: "instant",
    }),
  );
  await sleep(800);
  const idx0 = await page.evaluate(() =>
    getComputedStyle(document.querySelector(".wk-piste")).getPropertyValue("--i").trim(),
  );
  const pausedAttr = await page.evaluate(() =>
    document.querySelector(".wk-car").hasAttribute("data-pause"),
  );
  await sleep(7800);
  const idx1 = await page.evaluate(() =>
    getComputedStyle(document.querySelector(".wk-piste")).getPropertyValue("--i").trim(),
  );
  await page.click(".wk-fl[aria-label='Client suivant']");
  await sleep(900);
  const idx2 = await page.evaluate(() =>
    getComputedStyle(document.querySelector(".wk-piste")).getPropertyValue("--i").trim(),
  );
  const tabSel = await page.evaluate(() =>
    [...document.querySelectorAll(".wk-onglet")].map((b) => b.getAttribute("aria-selected")),
  );
  const coverClip = await page.evaluate(
    () =>
      getComputedStyle(document.querySelector(".wf:not([aria-hidden='true']) .wf-cover > img"))
        .clipPath,
  );
  r.carousel = { idx0, pausedAttr, idxAfter7s: idx1, idxAfterArrow: idx2, tabSel, coverClip };
  await page.screenshot({ path: `${dir}/works-after.png` });
  if (vp.mobile) {
    const box = await page.locator(".wk-vue").boundingBox();
    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + box.width * 0.8, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, y, { steps: 8 });
    await page.mouse.up();
    await sleep(900);
    r.carousel.idxAfterSwipe = await page.evaluate(() =>
      getComputedStyle(document.querySelector(".wk-piste")).getPropertyValue("--i").trim(),
    );
  }

  // 6. Wall motion
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".avis").getBoundingClientRect().top + scrollY + 200,
      behavior: "instant",
    }),
  );
  await sleep(600);
  const t1 = await page.evaluate(
    () => getComputedStyle(document.querySelector(".av-col .av-piste")).transform,
  );
  await sleep(1200);
  const t2 = await page.evaluate(
    () => getComputedStyle(document.querySelector(".av-col .av-piste")).transform,
  );
  r.wall = {
    moving: t1 !== t2,
    t1,
    t2,
    cols: await page.evaluate(() => document.querySelectorAll(".av-col").length),
  };

  // 7. Tone flip around the threshold
  r.tone = [];
  for (const sel of [".inclus", ".seuil", ".tarifs", ".faq", ".cta"]) {
    await page.evaluate(
      (s) =>
        window.scrollTo({
          top: document.querySelector(s).getBoundingClientRect().top + scrollY - 40,
          behavior: "instant",
        }),
      sel,
    );
    await sleep(700);
    r.tone.push(
      await page.evaluate((s) => {
        const root = document.querySelector("main.lx");
        const el = document.querySelector(s);
        return {
          sel: s,
          tone: getComputedStyle(root).getPropertyValue("--tone").trim(),
          inkOn: root.classList.contains("ink-on"),
          bg: getComputedStyle(root).backgroundColor,
          text: getComputedStyle(el).color,
          h2: el.querySelector(".h2, .sl-pivot")
            ? getComputedStyle(el.querySelector(".h2, .sl-pivot")).color
            : null,
        };
      }, sel),
    );
  }

  // 8. FAQ
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".faq").getBoundingClientRect().top + scrollY,
      behavior: "instant",
    }),
  );
  await sleep(900);
  const open0 = await page.evaluate(() =>
    [...document.querySelectorAll(".fq-item")].map((e) => e.hasAttribute("data-open")),
  );
  await page.click("#fq-q2");
  await sleep(800);
  const open1 = await page.evaluate(() =>
    [...document.querySelectorAll(".fq-item")].map((e) => e.hasAttribute("data-open")),
  );
  const a2h = await page.evaluate(() =>
    Math.round(document.querySelector("#fq-a2").getBoundingClientRect().height),
  );
  r.faq = { open0, open1, a2Height: a2h };
  await page.screenshot({ path: `${dir}/faq-open.png` });

  // 9. Footer reveal
  await page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
  );
  await sleep(1200);
  r.footer = await page.evaluate(() => {
    const root = document.querySelector(".lx-site-footer");
    const ft = root.querySelector(".ft");
    return {
      sticky: getComputedStyle(root).position === "sticky",
      flow: root.classList.contains("ft-flow"),
      pos: getComputedStyle(ft).position,
      ftp: root.style.getPropertyValue("--ftp"),
      fth: root.style.getPropertyValue("--fth"),
      vh: innerHeight,
      ftHeight: Math.round(ft.getBoundingClientRect().height),
      visibleTop: Math.round(ft.getBoundingClientRect().top),
      graveFont: getComputedStyle(root.querySelector(".ft-grave")).fontSize,
    };
  });
  await page.screenshot({ path: `${dir}/footer.png` });

  // 10. Menu
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await sleep(600);
  await page.click(".nav-key");
  await sleep(1000);
  r.menu = await page.evaluate(() => {
    const nav = document.querySelector("header.nav");
    const body = nav.querySelector(".nav-body");
    return {
      open: nav.classList.contains("open"),
      bodyHeight: Math.round(body.getBoundingClientRect().height),
      links: [...nav.querySelectorAll(".nav-links a")].map((a) => a.textContent),
      veilOpacity: getComputedStyle(nav.querySelector(".nav-veil")).opacity,
      shellWidth: Math.round(nav.querySelector(".nav-shell").getBoundingClientRect().width),
    };
  });
  await page.screenshot({ path: `${dir}/menu.png` });
  await page.keyboard.press("Escape");
  await sleep(700);
  r.menuClosed = await page.evaluate(
    () => !document.querySelector("header.nav").classList.contains("open"),
  );

  // 11. Layout checks
  r.layout = await page.evaluate(() => {
    const em = (document.body.innerText.match(/—/g) || []).length;
    const overflow =
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    const imgs = [...document.querySelectorAll("main img")].map((i) => ({
      src: i.getAttribute("src").split("/").pop(),
      alt: i.hasAttribute("alt"),
      w: i.getAttribute("width"),
      loading: i.getAttribute("loading"),
    }));
    const small = [...document.querySelectorAll("main p, main li, main dd")]
      .filter(
        (e) =>
          e.offsetParent &&
          parseFloat(getComputedStyle(e).fontSize) < 14 &&
          !e.closest(
            ".mono, .ch-l, .wf-meta, .av-meta, .in-sheet-h, .pr-label, .cp-legende, .bn-badge-l, .ft-eti, .ft-pied-c",
          ),
      )
      .map((e) => e.className + " " + e.textContent.slice(0, 30));
    return {
      emDash: em,
      overflow,
      docHeight: document.documentElement.scrollHeight,
      imgs,
      smallText: small.slice(0, 8),
    };
  });

  // 12. Full page
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: `${dir}/full-page.png`, fullPage: true });
  r.errors = errors;
  await ctx.close();
}

// Reduced motion
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(800);
  report.reducedMotion = await page.evaluate(() => ({
    hiddenRv: [...document.querySelectorAll("[data-rv]")].filter(
      (e) => getComputedStyle(e).opacity === "0",
    ).length,
    video: !!document.querySelector(".hero-video"),
    poster: !!document.querySelector(".hero-poster"),
    wall: getComputedStyle(document.querySelector(".av-piste")).animationName,
    rotating: document.querySelectorAll(".rw.on").length,
  }));
  await ctx.close();
}

// Inner routes with the new chrome
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  report.inner = {};
  for (const path of ["/fiduciaire", "/mentia", "/athlit", "/blog"]) {
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(BASE.replace(/\/$/, "") + path, { waitUntil: "networkidle" });
    await sleep(600);
    report.inner[path] = await page.evaluate(() => ({
      nav: !!document.querySelector("header.nav"),
      footer: !!document.querySelector("footer.ft"),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      h1: document.querySelector("h1")?.textContent.slice(0, 50),
      heroTop: Math.round(
        document.querySelector("#top, main > section")?.getBoundingClientRect().top ?? -1,
      ),
    }));
    report.inner[path].status = res.status();
    report.inner[path].errors = errors;
    await page.screenshot({ path: `${OUT}/inner${path.replace("/", "-")}.png` });
  }
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
