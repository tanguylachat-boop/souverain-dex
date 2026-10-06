import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const BASE = "http://localhost:4173";
const OUT = "./verif/captures/inner";
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const out = {};
for (const path of ["/fiduciaire", "/mentia", "/athlit", "/blog"]) {
  for (const vp of [{ name: "iphone", width: 390, height: 844, mobile: true }, { name: "desktop", width: 1440, height: 900, mobile: false }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.mobile, deviceScaleFactor: vp.mobile ? 2 : 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(e.message));
    const resp = await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      h1: document.querySelector("h1")?.innerText.slice(0, 60),
      heroPadding: getComputedStyle(document.querySelector("#top > div") || document.body).paddingTop,
      navBg: getComputedStyle(document.querySelector("header")).backgroundColor,
    }));
    await page.screenshot({ path: `${OUT}/${path.slice(1)}-${vp.name}.png` });
    out[`${path} ${vp.name}`] = { status: resp.status(), ...info, errors };
    await ctx.close();
  }
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
