import { webkit } from "playwright";
const BASE = process.env.BASE_URL ?? "http://localhost:4173/";
const OUT = process.env.OUT_DIR ?? "./verif/captures";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await webkit.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(BASE, { waitUntil: "networkidle" });
await sleep(1500);
const first = await page.evaluate(() => {
  const v = document.querySelector(".hs");
  const words = [...document.querySelectorAll(".rw")].map((w) => ({
    cls: w.className,
    op: getComputedStyle(w.querySelector(".c")).opacity,
  }));
  return {
    heroH: Math.round(document.querySelector(".hero").getBoundingClientRect().height),
    scene: v
      ? {
          running: !v.animationsPaused() && v.getCurrentTime() > 0,
          t: Math.round(v.getCurrentTime()),
        }
      : null,
    words,
    font: getComputedStyle(document.querySelector(".hero-h1")).fontFamily.split(",")[0],
    h1Lines: Math.round(
      document.querySelector(".hero-h1").getBoundingClientRect().height /
        parseFloat(getComputedStyle(document.querySelector(".hero-h1")).lineHeight),
    ),
  };
});
await page.screenshot({ path: `${OUT}/webkit-first.png` });
await sleep(3600);
const rot = await page.evaluate(() => document.querySelector(".rw.on")?.textContent);
const hp = await page.evaluate(async () => {
  window.scrollTo(0, 400);
  await new Promise((r) => setTimeout(r, 300));
  return {
    hp: document.querySelector(".hero-media").style.getPropertyValue("--hp"),
    transform: getComputedStyle(document.querySelector(".hs")).transform,
  };
});
const tone = await page.evaluate(async () => {
  const el = document.querySelector(".tarifs");
  window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 40);
  await new Promise((r) => setTimeout(r, 700));
  const root = document.querySelector("main.lx");
  return {
    tone: getComputedStyle(root).getPropertyValue("--tone").trim(),
    inkOn: root.classList.contains("ink-on"),
    bg: getComputedStyle(root).backgroundColor,
    text: getComputedStyle(el).color,
    cardBg: getComputedStyle(document.querySelector(".pr-card")).backgroundColor,
  };
});
await page.screenshot({ path: `${OUT}/webkit-tarifs.png` });
const footer = await page.evaluate(async () => {
  window.scrollTo(0, document.documentElement.scrollHeight);
  await new Promise((r) => setTimeout(r, 900));
  const root = document.querySelector(".lx-site-footer");
  return {
    sticky: getComputedStyle(root).position === "sticky",
    flow: root.classList.contains("ft-flow"),
    top: Math.round(root.querySelector(".ft").getBoundingClientRect().top),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  };
});
await page.screenshot({ path: `${OUT}/webkit-footer.png` });
console.log(JSON.stringify({ first, rot, hp, tone, footer, errors }, null, 1));
await browser.close();
