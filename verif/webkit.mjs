import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const info = await page.evaluate(() => ({
  hero: document.querySelector("#accueil").offsetHeight, max: Math.round(window.innerHeight * 0.7),
  proofTitleTop: Math.round(document.querySelector("#preuve-title").getBoundingClientRect().top),
  overflow: document.documentElement.scrollWidth > window.innerWidth,
  hiddenInView: [...document.querySelectorAll(".appear:not(.is-in)")].filter((el) => el.getBoundingClientRect().top < window.innerHeight).length,
}));
await page.screenshot({ path: "./verif/captures/webkit-iphone-first-screen.png" });
await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 160)); } });
const after = await page.evaluate(() => ({ hiddenAfterScroll: document.querySelectorAll(".appear:not(.is-in)").length, heroTransform: document.querySelector(".home-hero-photo").style.transform }));
await page.locator("#faq summary").first().click();
const faqOpen = await page.evaluate(() => document.querySelector("#faq details").open);
console.log(JSON.stringify({ browser: browser.version(), ...info, ...after, faqOpen, errors }));
await browser.close();
