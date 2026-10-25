/**
 * Rend la démo (scripts/demo/demo.html) image par image avec Chromium, puis
 * l'encode avec ffmpeg, voix off comprise :
 *
 *   npm run demo:voix       # la voix off : lecture Gemini (voix Achird), découpe, minutage
 *                           # -> scripts/demo/voix/timing.json + track.flac (voir voix.py)
 *   npm run demo            # les images, mp4 720p + webm 720p dans public/demo/,
 *                           # affiche public/demo/demo-poster.jpg, master 1080p en .demo-master-1080.mp4
 *   npm run demo -- --preview   # une image de contrôle au début de chaque phrase, dans verif/captures/demo/
 *
 * La scène est une fonction du temps (window.render(t)) : aucune animation CSS, chaque image
 * est déterministe. Si scripts/demo/voix/timing.json existe, les scènes commencent et durent
 * selon la voix (window.TIMING) et la piste track.flac est mixée dans les vidéos ; sinon la
 * démo est rendue muette avec ses bornes de référence.
 */
import { chromium } from "playwright";
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const FPS = 30;
const preview = process.argv.includes("--preview");

const timingPath = resolve(root, "scripts/demo/voix/timing.json");
const voicePath = resolve(root, "scripts/demo/voix/track.flac");
const timing = existsSync(timingPath) ? JSON.parse(readFileSync(timingPath, "utf8")) : null;
const withVoice = Boolean(timing) && existsSync(voicePath);
if (timing && !withVoice)
  throw new Error("timing.json présent sans track.flac : relancer npm run demo:voix");
const DURATION = timing ? timing.total_s : 120.5;
console.log(
  timing ? `voix off : ${timing.voix} (${timing.modele}), ${DURATION} s` : "sans voix off, 120,5 s",
);

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
if (timing)
  await page.evaluate((T) => {
    window.TIMING = T;
  }, timing);
const shot = async (t, path) => {
  await page.evaluate((tt) => window.render(tt), t);
  return page.screenshot({ path, type: "jpeg", quality: 92 });
};

if (preview) {
  const out = resolve(root, "verif/captures/demo");
  mkdirSync(out, { recursive: true });
  const times = timing
    ? Object.entries(timing.scenes).flatMap(([id, sc]) =>
        sc.phrases.map((p, i) => [`${id}-p${i}`, sc.start_s + p.at_s + 0.8]),
      )
    : [3.5, 14, 27, 46, 63, 78.5, 97, 110, 118].map((t) => [`t${String(t).replace(".", "_")}`, t]);
  for (const [name, t] of times) {
    await shot(t, resolve(out, `${name}.jpg`));
    console.log("aperçu", name, `${t.toFixed(2)} s`);
  }
  await browser.close();
  process.exit(0);
}

const frames = resolve(root, ".demo-frames");
rmSync(frames, { recursive: true, force: true });
mkdirSync(frames, { recursive: true });
const total = Math.round(FPS * DURATION);
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
// La voix : mono, 48 kHz, AAC 96 kb/s dans les mp4, Opus 48 kb/s dans le webm, coupée à la durée de l'image.
const voiceIn = withVoice ? ["-i", voicePath] : [];
const maps = withVoice ? ["-map", "0:v", "-map", "1:a", "-shortest"] : [];
const aac = withVoice ? ["-c:a", "aac", "-b:a", "96k", "-ac", "1", "-ar", "48000"] : [];
const opus = withVoice ? ["-c:a", "libopus", "-b:a", "48k", "-ac", "1", "-ar", "48000"] : [];
ffmpeg(
  [
    ...input,
    ...voiceIn,
    ...maps,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "21",
    "-pix_fmt",
    "yuv420p",
    ...aac,
    "-movflags",
    "+faststart",
    resolve(root, ".demo-master-1080.mp4"),
  ],
  "master 1080p",
);
ffmpeg(
  [
    ...input,
    ...voiceIn,
    ...maps,
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
    ...aac,
    "-movflags",
    "+faststart",
    resolve(root, "public/demo/demo-lx-studio.mp4"),
  ],
  "mp4 720p",
);
ffmpeg(
  [
    ...input,
    ...voiceIn,
    ...maps,
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
    ...opus,
    resolve(root, "public/demo/demo-lx-studio.webm"),
  ],
  "webm 720p",
);
rmSync(frames, { recursive: true, force: true });
console.log(
  "terminé :",
  existsSync(resolve(root, "public/demo/demo-lx-studio.mp4")) ? "public/demo/" : "?",
);
