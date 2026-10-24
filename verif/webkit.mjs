/**
 * Premier écran, parallaxe, nappe WebGL et pied de page dans WebKit (moteur
 * de Safari), 390×844. `npx playwright install webkit` une fois.
 */
import { webkit } from "playwright";
const BASE = (process.env.BASE_URL ?? "http://localhost:4173").replace(/\/$/, "");
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
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await sleep(1800);
const first = await page.evaluate(() => {
  const h1 = document.querySelector(".ia-hero-title");
  const words = [...h1.querySelectorAll(".ia-w-in")];
  return {
    heroH: Math.round(document.querySelector(".ia-hero").getBoundingClientRect().height),
    mesh: document.querySelector(".ia-hero canvas")?.classList.contains("is-on") ?? null,
    wordsShown: `${words.filter((w) => Math.abs(w.getBoundingClientRect().top - w.parentElement.getBoundingClientRect().top) < 2).length}/${words.length}`,
    font: getComputedStyle(h1).fontFamily.split(",")[0],
    h1Lines: Math.round(
      h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight),
    ),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  };
});
await page.screenshot({ path: `${OUT}/webkit-first.png` });
const parallax = await page.evaluate(async () => {
  window.scrollTo(0, 400);
  await new Promise((r) => setTimeout(r, 400));
  return {
    hp: document.querySelector(".ia-hero-visual").style.getPropertyValue("--hp"),
    headerScrolled: document.querySelector(".ia-header").classList.contains("is-scrolled"),
  };
});
await page.evaluate(() =>
  window.scrollTo(
    0,
    document.querySelector(".ia-night-sec").getBoundingClientRect().top + scrollY - 60,
  ),
);
await sleep(1200);
await page.screenshot({ path: `${OUT}/webkit-night.png` });
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await sleep(1200);
const footer = await page.evaluate(() => ({
  footerH: Math.round(document.querySelector(".ia-footer").getBoundingClientRect().height),
  footerCanvas: !!document.querySelector(".ia-footer canvas"),
}));
await page.screenshot({ path: `${OUT}/webkit-footer.png` });
await browser.close();
console.log(JSON.stringify({ first, parallax, footer, errors }, null, 1));
