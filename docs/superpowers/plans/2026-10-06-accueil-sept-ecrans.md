# Accueil en sept écrans : plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la page d'accueil par la structure validée dans `docs/superpowers/specs/2026-10-06-accueil-structure-design.md` : sept écrans, rangées à défilement horizontal, blocs repliables, photos qui zooment, texte visible divisé par deux.

**Architecture:** Trois briques génériques (`Rail`, `Disclosure`, `ZoomPhoto`) et un registre de défilement partagé (`lib/scroll-track.ts`), puis un composant par écran qui ne fait qu'assembler ces briques avec le texte de `src/content/home.ts`. Tout est natif (scroll-snap, `details`), rien n'est caché avant le script, tout est statique en mouvement réduit.

**Tech Stack:** TanStack Start + React 19, Tailwind v4 (CSS dans `src/styles.css`, classes utilitaires rares), TypeScript strict, Playwright pour la vérification, wrangler pour servir le build.

---

## Structure des fichiers

| Fichier | Rôle |
| --- | --- |
| `src/lib/scroll-track.ts` (créer) | Un seul écouteur `scroll` + `resize`, un `requestAnimationFrame` par image, qui appelle les fonctions inscrites. Utilisé par le hero et les photos. |
| `src/components/site/Rail.tsx` (créer) | Rangée horizontale : `ul.rail-track` à scroll-snap, chaque enfant dans un `li.rail-card`, boutons précédent / suivant dès 768 px, indicateur « n / N ». |
| `src/components/site/Disclosure.tsx` (créer) | `details` stylé : résumé avec chevron, corps animé à l'ouverture, `name` pour l'accordéon avec repli JavaScript. |
| `src/components/site/ZoomPhoto.tsx` (créer) | `figure` qui coupe, `img` qui passe de l'échelle 1 à 1,06 pendant que le cadre traverse l'écran. |
| `src/components/site/Problem.tsx` (créer) | Écran 2 : rangée des cinq situations + bloc replié des trois façons. |
| `src/components/site/Install.tsx` (créer) | Écran 3 : rangée des quatre cartes avec photo et détail replié. |
| `src/components/site/Results.tsx` (créer) | Écran 4 : rangée des trois clients, Problème / Installé / Résultat, détail replié. |
| `src/components/site/Method.tsx` (créer) | Écran 5 : accordéon des quatre étapes. |
| `src/components/site/DataDiagram.tsx` (créer) | Le schéma entre / système / sort, rendu sous la réponse « Où vont mes données ? ». |
| `src/components/site/Closing.tsx` (créer) | Écran 7 : photo, titre, phrase, ligne Tanguy, boutons. |
| `src/components/site/HomeHero.tsx` (modifier) | Zoom en plus du glissement, ligne de confiance = quatre clients, un seul bouton. |
| `src/components/site/Faq.tsx` (modifier) | `FaqEntry.extra?: ReactNode` rendu sous la réponse. |
| `src/content/home.ts` (réécrire) | Tout le texte, raccourci de moitié. |
| `src/routes/index.tsx` (modifier) | Nouvel ordre : HomeHero, Problem, Install, Results, Method, Faq, Closing, OtherProjects. |
| `src/styles.css` (modifier) | Règles `rail-*`, `disclosure-*`, `zoom-photo`, `card-*`, `closing-*` ; suppression des règles de la séquence épinglée, de la bande clients, des anciennes sections. |
| `src/hooks/use-scroll-progress.ts` (modifier) | Retirer `useSequence` et `useCountUp`, qui n'ont plus d'appelant. |
| Supprimer | `ClientNames.tsx`, `Proof.tsx`, `TimeCost.tsx`, `Pitfalls.tsx`, `ProcessPinned.tsx`, `Examples.tsx`, `Infrastructure.tsx`, `About.tsx`. |
| `public/img/factures-relance.webp` (créer) | Provisoire marqué, 1200×800, pour la carte « Les factures à relancer ». |
| `verif/shots.mjs` (réécrire), `VERIF.md` (réécrire) | Captures des sept écrans et des rangées, masse de texte, rangées, repliables, zoom. |

Interfaces fixées pour tout le plan :

```ts
// Rail
export function Rail(props: { children: ReactNode; label: string; count: number }): JSX.Element;
// Disclosure
export function Disclosure(props: { summary: ReactNode; children: ReactNode; name?: string; open?: boolean; className?: string }): JSX.Element;
// ZoomPhoto
export function ZoomPhoto(props: { image: SiteImage; ratio?: string; eager?: boolean; className?: string }): JSX.Element;
// scroll-track
export function trackScroll(update: () => void): () => void; // renvoie la fonction de désinscription, appelle update() tout de suite
```

Classes CSS fixées : `.rail`, `.rail-track`, `.rail-card`, `.rail-nav`, `.rail-index`, `.rail-btn` ; `.disclosure`, `.disclosure-summary`, `.disclosure-body` ; `.zoom-photo` ; `.card-num`, `.card-title`, `.card-body`, `.card-rows` (dl à trois lignes) ; `.problem-card`, `.install-card`, `.result-card`, `.method-step`, `.closing`, `.closing-photo`, `.closing-person` ; `.pitfalls-list`, `.pitfalls-answer` (conservée).

---

### Task 1 : point de départ mesuré et image provisoire manquante

**Files:**
- Create: `public/img/factures-relance.webp`
- Measure: masse de texte visible de la page actuelle (référence pour le « divisé par deux »)

- [ ] **Step 1 : mesurer la masse de texte actuelle**

Run (build courant servi) :
```bash
npm run build && (npx wrangler dev --port 4173 &) && sleep 8
node -e 'import("playwright").then(async ({chromium})=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.goto("http://localhost:4173/",{waitUntil:"networkidle"});console.log(await p.evaluate(()=>{for(const d of document.querySelectorAll("details"))d.open=false;return document.querySelector("main").innerText.replace(/\s+/g," ").length}));await b.close()})'
```
Expected : un nombre (caractères visibles, `details` fermés). Noter la valeur dans VERIF.md au Task 11. Attendu autour de 9 000.

- [ ] **Step 2 : créer l'image provisoire**

```bash
F=/System/Library/Fonts/Supplemental/Arial.ttf
magick src/assets/swiss-office.webp -gravity south -crop 1024x683+0+0 +repage -resize 1200x800! -modulate 85,60 -quality 80 -font "$F" -gravity southeast -pointsize 20 -fill "rgba(255,255,255,0.75)" -annotate +20+16 "image provisoire, a remplacer : factures-relance.webp" public/img/factures-relance.webp
```
Expected : `public/img/factures-relance.webp` de 1200×800.

- [ ] **Step 3 : commit**

```bash
git add public/img/factures-relance.webp && git commit -m "feat(home): stand-in photo for the overdue invoices card"
```

### Task 2 : les trois briques et le registre de défilement

**Files:**
- Create: `src/lib/scroll-track.ts`, `src/components/site/Rail.tsx`, `src/components/site/Disclosure.tsx`, `src/components/site/ZoomPhoto.tsx`
- Modify: `src/styles.css` (ajouter les règles `rail-*`, `disclosure-*`, `zoom-photo`)

- [ ] **Step 1 : `scroll-track.ts`**

```ts
const subscribers = new Set<() => void>();
let frame = 0;
let listening = false;
function run() { frame = 0; for (const fn of subscribers) fn(); }
function onScroll() { if (!frame) frame = requestAnimationFrame(run); }
export function trackScroll(update: () => void): () => void {
  subscribers.add(update);
  if (!listening) { listening = true; window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll, { passive: true }); }
  update();
  return () => { subscribers.delete(update); if (subscribers.size === 0 && listening) { listening = false; window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) { cancelAnimationFrame(frame); frame = 0; } } };
}
export function prefersReducedMotion(): boolean { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
```

- [ ] **Step 2 : `Rail.tsx`**

Comportement : `ul.rail-track` reçoit les enfants, chacun dans `li.rail-card`. Un effet mesure `scrollLeft`, `scrollWidth`, `clientWidth` et la largeur de la première carte plus l'écart (`columnGap` calculé) pour déduire l'index courant, `atStart`, `atEnd` et `scrollable` (`scrollWidth > clientWidth + 2`). `go(dir)` fait `scrollBy({ left: dir * step, behavior: prefersReducedMotion() ? "auto" : "smooth" })`. La barre `div.rail-nav` n'est rendue que si `scrollable` ; elle contient `span.rail-index` (`aria-live="polite"`, texte « 2 / 5 ») et deux `button.rail-btn` (`aria-label` « Carte précédente » / « Carte suivante », `disabled` en bout de rangée, flèche SVG `aria-hidden`). L'état initial (SSR) est index 0, non défilable : rien ne clignote.

- [ ] **Step 3 : `Disclosure.tsx`**

Rendu : `details.disclosure` (+ `className`, `name`, `open`) > `summary.disclosure-summary` (> `span` résumé + chevron SVG `aria-hidden`) + `div.disclosure-body` > `div` enfants. `onToggle` : si `name` est défini et que l'élément vient de s'ouvrir, fermer les autres `details[name=...]` ouverts du document (repli pour les navigateurs sans accordéon natif).

- [ ] **Step 4 : `ZoomPhoto.tsx`**

Rendu : `figure.zoom-photo` (style `aspectRatio: ratio` si fourni) > `img` avec `src`, `width`, `height`, `alt`, `loading` (`eager` ou `lazy`), `decoding="async"`, `fetchPriority="high"` si `eager`. Effet : si mouvement réduit, rien ; sinon `trackScroll` qui lit le rectangle du `figure`, calcule `t = clamp((innerHeight - top) / (innerHeight + height), 0, 1)` et écrit `img.style.transform = scale(1 + 0.06 * t)`.

- [ ] **Step 5 : CSS**

```css
.rail { position: relative; margin-top: 2rem; }
.rail-track { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: var(--gutter); padding: 0.25rem var(--gutter) 1rem; margin-inline: calc(-1 * var(--gutter)); list-style: none; scrollbar-width: thin; scrollbar-color: var(--border-strong) transparent; overscroll-behavior-x: contain; }
.rail-card { flex: 0 0 78%; min-width: 0; scroll-snap-align: start; }
@media (min-width: 640px) { .rail-card { flex-basis: 360px; } }
.rail-nav { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; margin-top: 0.25rem; }
.rail-index { font-variant-numeric: tabular-nums; font-size: 0.9375rem; color: var(--text-muted); margin-right: auto; }
.rail-btn { display: none; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--border-subtle); background: rgba(255,255,255,0.05); color: var(--text-primary); align-items: center; justify-content: center; cursor: pointer; }
.rail-btn:disabled { opacity: 0.35; cursor: default; }
@media (min-width: 768px) { .rail-btn { display: inline-flex; } }
.disclosure { border-top: 1px solid var(--border-subtle); }
.disclosure-summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 44px; padding: 0.75rem 0; cursor: pointer; list-style: none; font-size: 1.0625rem; font-weight: 600; color: var(--text-primary); }
.disclosure-summary::-webkit-details-marker { display: none; }
.disclosure-summary svg { flex-shrink: 0; transition: transform var(--dur-base) var(--ease-spring); }
.disclosure[open] > .disclosure-summary svg { transform: rotate(180deg); }
.disclosure-body { padding-bottom: 1rem; }
@keyframes disclosure-in { from { opacity: 0; transform: translate3d(0, -4px, 0); } to { opacity: 1; transform: none; } }
.disclosure[open] > .disclosure-body { animation: disclosure-in 200ms var(--ease-out); }
.zoom-photo { margin: 0; overflow: hidden; border-radius: 14px; }
.zoom-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transform-origin: center; will-change: transform; }
@media (prefers-reduced-motion: reduce) { .zoom-photo img { transform: none !important; } .disclosure[open] > .disclosure-body { animation: none; } }
```

- [ ] **Step 6 : typecheck puis commit**

```bash
npx tsc --noEmit -p tsconfig.json && git add src/lib/scroll-track.ts src/components/site/Rail.tsx src/components/site/Disclosure.tsx src/components/site/ZoomPhoto.tsx src/styles.css && git commit -m "feat(site): horizontal rail, native disclosure and scroll-zoom photo"
```

### Task 3 : le texte, divisé par deux

**Files:**
- Rewrite: `src/content/home.ts`

- [ ] **Step 1 : réécrire le fichier** avec les constantes `BOOKING_URL`, `CONTACT_EMAIL`, `CREDENTIAL`, `IMAGES` (hero, chantier, factures, mails = bureau-soir, pieces, tanguy), `SEO`, `SERVICE_DESCRIPTION`, `HERO` (`eyebrow`, `title`, `lede`, `primary`, `clientsLabel`, `clients`), `PROBLEM` (5 items, corps ≤ 90 caractères), `PITFALLS` (3 items ≤ 110 caractères, `answer`), `INSTALL` (4 items : `key`, `title`, `image`, `summary`, `trigger`, `happens`, `keep`, `aside?`), `RESULTS` (3 items : `client`, `place`, `sector`, `problem`, `installed`, `result`, `before`, `after`, `running`), `METHOD` (4 étapes : `title`, `duration`, `body`, `output`), `FAQ` (6 entrées, la question des données en quatrième), `DATA_DIAGRAM`, `CLOSING`, `OTHER_PROJECTS`. Espaces insécables avant « : » et « ? ». Aucun tiret long.

- [ ] **Step 2 : vérifier**

```bash
grep -c "—" src/content/home.ts   # attendu 0
npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 3 : commit**

```bash
git add src/content/home.ts && git commit -m "feat(home): copy for the seven screens, half the visible text"
```

### Task 4 : écran 1, l'accueil

**Files:**
- Modify: `src/components/site/HomeHero.tsx`, `src/styles.css`

- [ ] **Step 1 :** remplacer l'effet de parallaxe par `trackScroll` : `ratio = clamp(scrollY / heroHeight)`, `transform = translate3d(0, -40 * ratio px, 0) scale(1 + 0.06 * ratio)` sur `.home-hero-photo`. Retirer le bouton secondaire. Remplacer la liste de confiance par `p.home-hero-clients` : `HERO.clientsLabel` puis les quatre noms séparés par « · ».
- [ ] **Step 2 :** CSS : `.home-hero-clients { margin-top: 1.5rem; font-size: 0.9375rem; line-height: 1.6; color: rgba(255,255,255,0.9) }`, `.home-hero-clients span { color: rgba(255,255,255,0.7) }`. Supprimer `.home-hero-trust`, `.home-hero-dot` et leurs règles mobiles.
- [ ] **Step 3 :** `npx tsc --noEmit -p tsconfig.json`, puis `git add -A src/components/site/HomeHero.tsx src/styles.css && git commit -m "feat(home): hero zooms and slides, clients as trust line"`.

### Task 5 : écran 2, le problème concret

**Files:**
- Create: `src/components/site/Problem.tsx`
- Modify: `src/styles.css` (`.card-num`, `.card-title`, `.card-body`, `.problem-card`, `.pitfalls-list`)

- [ ] **Step 1 :** `Section id="probleme" tone="base" labelledBy="probleme-title"` > `Appear` (Eyebrow, H2, Lede size lg) > `Rail label="Cinq situations" count={5}` > cinq `Appear className="card problem-card" delay={i*60}` (span.card-num, h3.card-title, p.card-body) > `Disclosure summary={PITFALLS.title} className="pitfalls"` > `ol.pitfalls-list` (li : h4 + p) + `p.pitfalls-answer`.
- [ ] **Step 2 :** CSS : `.problem-card { padding: 1.5rem; height: 100%; }`, `.card-num { display:block; font-size:.875rem; font-weight:600; letter-spacing:.08em; color: var(--accent-text); font-variant-numeric: tabular-nums; margin-bottom:.75rem }`, `.card-title { font-size:1.25rem; font-weight:600; color: var(--text-primary) }`, `.card-body { margin-top:.5rem; font-size:1.125rem; line-height:1.6; color: var(--text-secondary) }`, `.pitfalls { margin-top: 2rem; border-bottom: 1px solid var(--border-subtle) }`, `.pitfalls-list { list-style:none; margin:0; padding:0; display:grid; gap:1rem }`, `@media (min-width: 900px) { .pitfalls-list { grid-template-columns: repeat(3, minmax(0,1fr)); gap: 2rem } }`, `.pitfalls-list h4 { font-size:1.125rem; font-weight:600; color: var(--text-primary) }`, `.pitfalls-list p { margin-top:.375rem; font-size:1.125rem; line-height:1.6; color: var(--text-secondary); max-width: 30rem }`.
- [ ] **Step 3 :** typecheck, `git add src/components/site/Problem.tsx src/styles.css && git commit -m "feat(home): the concrete problem, five cards in a rail and the three ways folded"`.

### Task 6 : écran 3, ce qu'on installe

**Files:**
- Create: `src/components/site/Install.tsx`
- Modify: `src/styles.css` (`.install-card`, `.card-rows`)

- [ ] **Step 1 :** `Section id="installe"` > en-tête > `Rail label="Quatre choses qu'on installe" count={4}` > quatre `Appear className="card install-card"` : `ZoomPhoto image ratio="2 / 1"`, `div.install-body` (h3.card-title, p.card-body summary, `Disclosure summary={INSTALL.detailLabel}` > `dl.card-rows` trois lignes + `p.card-aside` avec `Link to="/fiduciaire"` si `aside`).
- [ ] **Step 2 :** CSS : `.install-card { overflow:hidden; height:100%; display:flex; flex-direction:column }`, `.install-card .zoom-photo { border-radius: 0; border-bottom: 1px solid var(--border-subtle) }`, `.install-body { padding: 1.25rem 1.5rem 0.5rem; display:flex; flex-direction:column; flex:1 }`, `.card-rows { margin:0 }`, `.card-rows div + div { margin-top: .875rem }`, `.card-rows dt { font-size:.75rem; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color: var(--text-muted); margin-bottom:.25rem }`, `.card-rows dd { margin:0; font-size:1.0625rem; line-height:1.6; color: var(--text-secondary) }`, `.card-aside { margin-top:1rem; font-size:1rem; line-height:1.6; color: var(--text-muted) }`.
- [ ] **Step 3 :** typecheck, `git add src/components/site/Install.tsx src/styles.css && git commit -m "feat(home): what gets installed, four photo cards with folded detail"`.

### Task 7 : écran 4, résultats clients

**Files:**
- Create: `src/components/site/Results.tsx`
- Modify: `src/styles.css` (`.result-card`, `.result-meta`, `.result-value`)

- [ ] **Step 1 :** `Section id="resultats" tone="deep"` > en-tête > `Rail label="Trois clients" count={3}` > trois `Appear className="card result-card"` : h3.card-title client, p.result-meta (lieu · secteur), `dl.card-rows` (Problème, Installé, Résultat : la dd du résultat porte `strong.result-value`), `Disclosure summary={RESULTS.detailLabel}` > `dl.card-rows` (Avant, Après, Ce qui tourne).
- [ ] **Step 2 :** CSS : `.result-card { padding: 1.5rem; height: 100% }`, `.result-meta { margin-top:.375rem; font-size:1rem; color: var(--text-muted) }`, `.result-card .card-rows { margin-top: 1.25rem }`, `.result-value { color: var(--text-primary); font-weight: 600 }`, `.rail-card:has(.result-card) { flex-basis: 86% } @media (min-width: 640px) { .rail-card:has(.result-card) { flex-basis: 420px } }`.
- [ ] **Step 3 :** typecheck, `git add src/components/site/Results.tsx src/styles.css && git commit -m "feat(home): client results, problem / installed / result in a rail"`.

### Task 8 : écran 5, la méthode en accordéon

**Files:**
- Create: `src/components/site/Method.tsx`
- Modify: `src/styles.css` (`.method-step`, `.method-head`), `src/hooks/use-scroll-progress.ts` (retirer `useSequence`, `useCountUp`)

- [ ] **Step 1 :** `Section id="methode"` > en-tête > `div.method` > quatre `Disclosure name="methode" open={i === 0} className="method-step" summary={<span className="method-head"><span className="card-num">0i</span><span className="method-title">titre</span><span className="method-duration">durée</span></span>}` > `p.card-body` + `p.method-output` (« Vous repartez avec : » + output).
- [ ] **Step 2 :** CSS : `.method { margin-top: 2rem; border-bottom: 1px solid var(--border-subtle) }`, `.method-head { display:flex; align-items:baseline; gap:.75rem; flex-wrap:wrap }`, `.method-head .card-num { margin-bottom:0 }`, `.method-title { font-size:1.125rem }`, `.method-duration { font-size:.9375rem; font-weight:400; color: var(--text-muted) }`, `.method-output { margin-top:.5rem; font-size:1.0625rem; line-height:1.6; color: var(--warm-text); max-width: 30rem }`, `.method-output span { color: var(--text-muted) }`, `.method-step .card-body { max-width: 34rem }`.
- [ ] **Step 3 :** dans `use-scroll-progress.ts`, supprimer `useSequence` et `useCountUp` (vérifier `grep -rn "useSequence\|useCountUp" src` vide après suppression de ProcessPinned au Task 10 ; garder `useScrollProgress` seulement s'il a un appelant, sinon supprimer le fichier).
- [ ] **Step 4 :** typecheck, `git add src/components/site/Method.tsx src/styles.css src/hooks/use-scroll-progress.ts && git commit -m "feat(home): the method as a four-step accordion"`.

### Task 9 : écrans 6 et 7, questions et rendez-vous

**Files:**
- Create: `src/components/site/DataDiagram.tsx`, `src/components/site/Closing.tsx`
- Modify: `src/components/site/Faq.tsx`, `src/styles.css` (`.closing-*`)

- [ ] **Step 1 :** `Faq.tsx` : `FaqEntry = { q: string; a: string; extra?: ReactNode }` ; rendre `{entry.extra}` dans un `div` sous le `p` de réponse. La signature `faqSchema` accepte toujours les entrées (elle ne lit que `q` et `a`).
- [ ] **Step 2 :** `DataDiagram.tsx` : le schéma de l'ancien `Infrastructure.tsx` (colonnes entre / système / sort, flèches, `role="img"` + `aria-label` depuis `DATA_DIAGRAM`), sans la section ni l'en-tête, `style={{ marginTop: "1rem" }}`.
- [ ] **Step 3 :** `Closing.tsx` : `Section id="reserver" tone="deep" labelledBy="reserver-title"` > `Appear` > `div.closing` : `img.closing-photo` (tanguy, lazy, width/height/alt) + `div` (h2#reserver-title, p.closing-body, p.closing-person, div.closing-actions avec `Action primary arrow href=cal.com` et `Action secondary href=mailto`).
- [ ] **Step 4 :** CSS : `.closing { display:grid; gap:1.5rem; align-items:start }`, `@media (min-width: 768px) { .closing { grid-template-columns: 160px minmax(0,1fr); gap: 2.5rem } }`, `.closing-photo { width: 120px; height:auto; border-radius: 14px; border: 1px solid var(--border-strong) }`, `@media (min-width: 768px) { .closing-photo { width: 160px } }`, `.closing h2 { font-size: clamp(1.875rem, 4vw, 3rem); font-weight:700; color: var(--text-primary); max-width: 18ch }`, `.closing-body { margin-top:1rem; font-size:1.125rem; line-height:1.6; color: var(--text-secondary); max-width: 31rem }`, `.closing-person { margin-top:.75rem; font-size:1rem; line-height:1.6; color: var(--text-muted); max-width: 31rem }`, `.closing-actions { margin-top:1.75rem; display:flex; flex-wrap:wrap; gap:.75rem }`.
- [ ] **Step 5 :** typecheck, `git add src/components/site/DataDiagram.tsx src/components/site/Closing.tsx src/components/site/Faq.tsx src/styles.css && git commit -m "feat(home): data question with its diagram, closing screen with the photo"`.

### Task 10 : assemblage, suppressions, nettoyage CSS

**Files:**
- Modify: `src/routes/index.tsx`, `src/styles.css`
- Delete: `ClientNames.tsx`, `Proof.tsx`, `TimeCost.tsx`, `Pitfalls.tsx`, `ProcessPinned.tsx`, `Examples.tsx`, `Infrastructure.tsx`, `About.tsx`

- [ ] **Step 1 :** `index.tsx` : importer HomeHero, Problem, Install, Results, Method, Faq, Closing, OtherProjects ; `head()` inchangé sauf `faqSchema("/", FAQ.entries)` ; `HomePage` rend les huit dans cet ordre ; `Faq` reçoit `size="lg"` et les entrées avec `extra: <DataDiagram />` sur la question des données (assemblée dans `index.tsx` pour garder `home.ts` sans JSX).
- [ ] **Step 2 :** `git rm` des huit composants ; `grep -rn "ClientNames\|site/Proof\|TimeCost\|site/Pitfalls\|ProcessPinned\|site/Examples\|site/Infrastructure\|site/About\|CtaBand" src/routes/index.tsx` vide.
- [ ] **Step 3 :** `styles.css` : supprimer les blocs `.pinned*`, `.step-*`, `.stage-art*`, `.process-grid`, `.steps`, `.client-row*`, `.proof-*`, `.timecost-*`, `.pitfall` (ancienne grille), `.examples-grid`, `.example-*`, `.about*`, `.tight-top` et la règle `main > section:not(.home-hero):not(.client-row)` (revenir à `main > section:not(.home-hero)`). Garder `.infra-*`, `.appear`, `.home-hero*`, `.pitfalls-answer`, `.other-projects*`.
- [ ] **Step 4 :** `npx tsc --noEmit -p tsconfig.json`, `npx eslint` sur les fichiers de la branche, `npm run build`.
- [ ] **Step 5 :** `git add -A src && git commit -m "feat(home): seven screens assembled, former sections removed"`.

### Task 11 : vérification et VERIF.md

**Files:**
- Rewrite: `verif/shots.mjs`, `VERIF.md`

- [ ] **Step 1 :** `shots.mjs` : conserver captures par taille, premier écran (hero ≤ 70 svh, titre de l'écran 2 visible), typographie, débordement, contraste du hero, mouvement réduit, clavier, liens. Ajouter : (a) masse de texte de `main` tous `details` fermés, comparée à la référence du Task 1 (attendu ≤ 50 %) ; (b) pour chaque `.rail-track` : largeur défilable > 0 sur téléphone, `scrollBy` d'une carte puis lecture de `.rail-index` (attendu « 2 / N »), clic sur « Carte suivante » sur bureau ; captures de chaque rangée à la première, à la deuxième et à la dernière carte ; (c) pour `.disclosure` : clic sur le résumé ouvre, Entrée au clavier ouvre, dans `.method` une seule étape `open` après avoir cliqué la deuxième ; (d) pour `.zoom-photo img` : `transform` lu à l'entrée (scale ≈ 1) et quand le cadre est en haut de l'écran (scale > 1.03) ; `none` en mouvement réduit ; (e) capture de chaque écran (`#accueil`, `#probleme`, `#installe`, `#resultats`, `#methode`, `#faq`, `#reserver`).
- [ ] **Step 2 :** lancer `npm run build`, `npx wrangler dev --port 4173`, `node verif/shots.mjs`, `node verif/inner.mjs`, `node verif/antiai.mjs`, `node verif/webkit.mjs`, Lighthouse mobile. Regarder les captures. Corriger ce qui ne passe pas, recommencer.
- [ ] **Step 3 :** réécrire `VERIF.md` : ce qui manque toujours (AUDIT.md, photos), masse de texte avant / après, résultats par écran, rangées, repliables, zoom, Lighthouse, clavier, pages non touchées, non testé, pour finir.
- [ ] **Step 4 :** `git add verif VERIF.md && git commit -m "docs(home): VERIF.md for the seven-screen home page"`.

### Task 12 : livraison

- [ ] **Step 1 :** publier la branche `refonte-pme-v2` sur le dépôt distant, puis ouvrir la PR vers la branche par défaut avec `gh pr create` (résumé, tableau de vérification, avertissement sur le texte et les photos provisoires). Ne pas merger.
