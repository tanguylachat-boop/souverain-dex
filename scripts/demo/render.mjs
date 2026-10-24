/**
 * Rend la démo (scripts/demo/demo.html) image par image avec Chromium, puis
 * l'encode avec ffmpeg :
 *
 *   npm run demo            # 3600 images, mp4 720p + webm 720p dans public/demo/,
 *                           # affiche public/demo/demo-poster.jpg, master 1080p en .demo-master-1080.mp4
 *   npm run demo -- --preview   # 9 images de contrôle dans verif/captures/demo/
 *
 * La scène est une fonction du temps (window.render(t)) : aucune animation
 * CSS, chaque image est déterministe.
 */
import { chromium } from "playwright";
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const FPS = 30;
const DURATION = 120;
const preview = process.argv.includes("--preview");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
await page.goto(`file://${resolve(root, "scripts/demo/demo.html")}`);
await page.evaluate(() =>
  Promise.all([
    document.fonts.load("800 20px Manrope"),
    document.fonts.load("500 20px Manrope"),
    document.fonts.load("700 20px Manrope"),
  ]).then(() => document.fonts.ready),
);
const shot = async (t, path) => {
  await page.evaluate((tt) => window.render(tt), t);
  return page.screenshot({ path, type: "jpeg", quality: 92 });
};

if (preview) {
  const out = resolve(root, "verif/captures/demo");
  mkdirSync(out, { recursive: true });
  for (const t of [3.5, 14, 27, 46, 63, 78.5, 97, 110, 118]) {
    await shot(t, resolve(out, `t${String(t).replace(".", "_")}.jpg`));
    console.log("aperçu", t, "s");
  }
  await browser.close();
  process.exit(0);
}

const frames = resolve(root, ".demo-frames");
rmSync(frames, { recursive: true, force: true });
mkdirSync(frames, { recursive: true });
const total = FPS * DURATION;
const t0 = Date.now();
for (let f = 0; f < total; f++) {
  await shot(f / FPS, resolve(frames, `${String(f).padStart(5, "0")}.jpg`));
  if (f % 300 === 0) console.log(`image ${f}/${total} (${Math.round((Date.now() - t0) / 1000)} s)`);
}
mkdirSync(resolve(root, "public/demo"), { recursive: true });
await shot(3.4, resolve(root, "public/demo/demo-poster.jpg"));
await browser.close();

const ffmpeg = (args, label) => {
  console.log("ffmpeg :", label);
  const r = spawnSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], {
    stdio: "inherit",
  });
  if (r.status !== 0) throw new Error(`ffmpeg a échoué : ${label}`);
};
const input = ["-framerate", String(FPS), "-i", resolve(frames, "%05d.jpg")];
ffmpeg(
  [
    ...input,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "21",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    resolve(root, ".demo-master-1080.mp4"),
  ],
  "master 1080p",
);
ffmpeg(
  [
    ...input,
    "-vf",
    "scale=1280:720",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "24",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    resolve(root, "public/demo/demo-lx-studio.mp4"),
  ],
  "mp4 720p",
);
ffmpeg(
  [
    ...input,
    "-vf",
    "scale=1280:720",
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    "34",
    "-row-mt",
    "1",
    "-deadline",
    "good",
    "-cpu-used",
    "2",
    resolve(root, "public/demo/demo-lx-studio.webm"),
  ],
  "webm 720p",
);
rmSync(frames, { recursive: true, force: true });
console.log(
  "terminé :",
  existsSync(resolve(root, "public/demo/demo-lx-studio.mp4")) ? "public/demo/" : "?",
);
