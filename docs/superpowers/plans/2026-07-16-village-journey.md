# One Lazy Day — Village Journey Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `index.html` as one continuous dawn-to-night illustrated world with a winding trail, a scroll-driven walking cat (Nozzle), and a 12-cat discovery game — per `docs/superpowers/specs/2026-07-16-village-journey-design.md`.

**Architecture:** Static site, no build step. All art is generated SVG strings from `js/cats.js`. A runtime-generated SVG trail spans the journey; `js/journey.js` owns scroll/layout (trail, walker, paw prints, parallax, mini-map) and `js/discovery.js` owns game state (found cats, HUD, celebration). They never import each other; `js/app.js` wires them. Audio stays in `js/purr.js`.

**Tech Stack:** Vanilla ES modules, SVG, CSS. Local preview via `python3 -m http.server`. No frameworks, no npm.

## Global Constraints

- Scene captions reused **verbatim** from current `index.html` (seven scenes; order: Box, Keyboard, Sink, Shoe, Vase, Shelf, Bag — Shelf/Bag swapped vs. today).
- Do **not** modify `sleepingCat`, `sittingCat`, or any existing `scene*` function signature/behavior — `featured.html` and `spots.html` depend on them.
- Subpages, nav, footer, purr toggle, custom cursor: unchanged.
- Native scroll only; animations use transform/opacity only; one scroll listener + one rAF loop in `journey.js`.
- Reduced motion: keyed off a `reduced-motion` class that `app.js` puts on `<body>` when `prefers-reduced-motion: reduce` matches (this makes it testable by toggling the class).
- localStorage keys: `nozzle.spotted` (JSON array of ids), `nozzle.celebrated` (`"1"`).
- Palette/fonts: existing tokens in `css/style.css`; new night tokens may be added but existing tokens unchanged.
- Verification: `node --check` for each touched JS file + browser checks against `http://localhost:4173` (server config `nozzle` in `.claude/launch.json`).

---

### Task 1: World skeleton — regions, scenes, signposts, props

**Files:**
- Modify: `index.html` (full rewrite of body content; final markup for ALL later tasks lands here once)
- Modify: `css/journey.css` (full rewrite)
- Modify: `js/cats.js` (append `prop*` functions + no changes to existing exports)
- Modify: `js/app.js` (injectArt handles `[data-prop]` and `[data-spot]`; initCats gains optional `onWake` callback + click/tap wake; boot does dynamic import of journey/discovery modules on home only; capture `initPurr()` return)
- Create: `.claude/launch.json`

**Interfaces:**
- Produces: `cats.propBox()`, `propKeyboard()`, `propSink()`, `propShoe()`, `propVase()`, `propShelf()`, `propBag()`, `propHills()`, `propDoor(kind)`, `propWindow(sky)`, `propLogotype()`, `propCloudcat()` — each returns an SVG string with transparent background.
- Produces: markup contract used by every later task:
  - `.journey > svg.trail` (empty; Task 2 fills it)
  - `.journey > .walker` div (empty; Task 3 fills it)
  - `[data-trail-anchor]` spans in document order: dawn trailhead → box → front door (`data-trail-door`) → keyboard → sink → shoe → vase → shelf → back door (`data-trail-door`) → bag → night end
  - `.scene__cat[data-spot-id="scene-*"]` on the seven scene cats
  - `button.hidden-spot[data-spot="hidden-*"]` ×5 (empty until Task 4)
  - `.cloud-cat[data-prop="cloudcat"]` in night region
- Consumes: existing `sleepingCat`, `pawLogo`, `pawSmall` from `cats.js`.

- [ ] **Step 1: Create `.claude/launch.json`**

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "nozzle",
      "runtimeExecutable": "python3",
      "runtimeArgs": ["-m", "http.server", "4173"],
      "port": 4173
    }
  ]
}
```

- [ ] **Step 2: Rewrite `index.html`**

Full file (captions are verbatim from the current file; only Shelf/Bag order changes):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nozzle — Cats Sleeping in Weird Spaces</title>
  <meta name="description" content="A quiet little photography project celebrating cats who sleep in places they probably shouldn't.">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/journey.css">
</head>
<body data-page="home">

  <main class="journey" id="journey">
    <svg class="trail" aria-hidden="true"></svg>
    <div class="walker" aria-hidden="true"></div>

    <!-- 1 · Dawn -->
    <section class="region region--dawn" data-region="dawn">
      <div class="cloud" data-depth="far" style="top:14%; left:-10%; width:120px"></div>
      <div class="cloud" data-depth="far" style="top:26%; left:60%; width:80px"></div>
      <div class="region__art region__art--hills" data-prop="hills" data-depth="far"></div>
      <div class="hero__content">
        <span class="eyebrow">A photography project</span>
        <h1 class="hero__title">Cats sleeping in<br><span class="accent">weird spaces</span></h1>
        <p class="lede center">Every good spot in the village is taken. Walk with Nozzle — hover the cats, peek in the bushes, and spot all&nbsp;12.</p>
        <div class="scroll-hint">
          <span>scroll to walk</span>
          <div class="scroll-hint__arrow"></div>
        </div>
      </div>
      <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
    </section>

    <!-- 2 · Porch (morning) -->
    <section class="region region--porch" data-region="porch">
      <button class="hidden-spot hidden-spot--mailbox" data-spot="hidden-mailbox" data-bubble="special delivery" aria-label="A mailbox with something poking out"></button>
      <div class="scene scene--box">
        <div class="scene__stage">
          <div class="scene__prop" data-prop="box"></div>
          <div class="scene__cat" data-cat="orange" data-spot-id="scene-box" data-bubble="the box is mine now"></div>
        </div>
        <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
        <div class="signpost reveal">
          <span class="signpost__plank">No. 01 — The Box</span>
          <div class="signpost__board">
            <h2>It was here for ten seconds.</h2>
            <p>And yet somehow, before you could even break it down, a cat was already inside. They don't need the thing you ordered. They need the container it came in.</p>
          </div>
        </div>
      </div>
      <button class="hidden-spot hidden-spot--bush" data-spot="hidden-bush" data-bubble="mrrp?!" aria-label="A suspicious bush"></button>
      <div class="doorway doorway--front">
        <div class="doorway__art" data-prop="door" data-door="front"></div>
        <span class="trail-anchor" data-trail-anchor data-trail-door aria-hidden="true"></span>
      </div>
    </section>

    <!-- 3 · Study (late morning) -->
    <section class="region region--study region--indoor" data-region="study">
      <div class="region__window" data-prop="window" data-sky="#cfe4ea"></div>
      <div class="scene scene--keys scene--flip">
        <div class="scene__stage">
          <div class="scene__prop" data-prop="keyboard"></div>
          <div class="scene__cat" data-cat="grey" data-spot-id="scene-keys" data-bubble="you weren't typing"></div>
        </div>
        <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
        <div class="signpost reveal">
          <span class="signpost__plank">No. 02 — The Keyboard</span>
          <div class="signpost__board">
            <h2>Work can wait.</h2>
            <p>The exact moment you sit down to be productive is the exact moment a warm rectangle becomes the most desirable bed in the house.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 · Kitchen (noon) -->
    <section class="region region--kitchen region--indoor" data-region="kitchen">
      <button class="hidden-spot hidden-spot--curtain" data-spot="hidden-curtain" data-bubble="the sun was here" aria-label="A kitchen curtain that just moved"></button>
      <div class="scene scene--sink">
        <div class="scene__stage">
          <div class="scene__prop" data-prop="sink"></div>
          <div class="scene__cat" data-cat="cream" data-spot-id="scene-sink" data-bubble="this is porcelain, actually"></div>
        </div>
        <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
        <div class="signpost reveal">
          <span class="signpost__plank">No. 03 — The Sink</span>
          <div class="signpost__board">
            <h2>Cool, smooth, and curved just so.</h2>
            <p>Cats gravitate toward sinks in summer. The porcelain stays cool, the basin cradles them, and the faucet drips on schedule. A five-star suite.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5 · Hall (early afternoon) -->
    <section class="region region--hall region--indoor" data-region="hall">
      <div class="scene scene--shoe scene--flip">
        <div class="scene__stage">
          <div class="scene__prop" data-prop="shoe"></div>
          <div class="scene__cat" data-cat="black" data-spot-id="scene-shoe" data-bubble="smells like you"></div>
        </div>
        <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
        <div class="signpost reveal">
          <span class="signpost__plank">No. 04 — The Shoe</span>
          <div class="signpost__board">
            <h2>Your scent, concentrated.</h2>
            <p>A shoe is a small cave that smells exactly like the person they love. From the cat's perspective, this is not weird. This is a hug.</p>
          </div>
        </div>
      </div>
      <button class="hidden-spot hidden-spot--basket" data-spot="hidden-basket" data-bubble="do NOT fold me" aria-label="A laundry basket with its lid ajar"></button>
    </section>

    <!-- 6 · Living room (afternoon) -->
    <section class="region region--living region--indoor" data-region="living">
      <div class="region__window" data-prop="window" data-sky="#f0c894"></div>
      <div class="scene scene--vase">
        <div class="scene__stage">
          <div class="scene__prop" data-prop="vase"></div>
          <div class="scene__cat" data-cat="calico" data-spot-id="scene-vase" data-bubble="don't move the vase"></div>
        </div>
        <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
        <div class="signpost reveal">
          <span class="signpost__plank">No. 05 — The Vase</span>
          <div class="signpost__board">
            <h2>An act of quiet rebellion.</h2>
            <p>They know it's not for them. That's the point. The vase is high, narrow, and slightly dangerous — which, to a cat, reads as "premium napping real estate."</p>
          </div>
        </div>
      </div>
      <div class="scene scene--shelf scene--flip">
        <div class="scene__stage">
          <div class="scene__prop" data-prop="shelf"></div>
          <div class="scene__cat" data-cat="grey" data-spot-id="scene-shelf" data-bubble="this gap is mine"></div>
        </div>
        <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
        <div class="signpost reveal">
          <span class="signpost__plank">No. 06 — The Bookshelf</span>
          <div class="signpost__board">
            <h2>They made a gap. On purpose.</h2>
            <p>Books were removed to create a custom shelf-bed. You didn't ask for this renovation. You're not even mad about it.</p>
          </div>
        </div>
      </div>
      <div class="doorway doorway--back">
        <div class="doorway__art" data-prop="door" data-door="back"></div>
        <span class="trail-anchor" data-trail-anchor data-trail-door aria-hidden="true"></span>
      </div>
    </section>

    <!-- 7 · Garden (golden hour) -->
    <section class="region region--garden" data-region="garden">
      <button class="hidden-spot hidden-spot--tree" data-spot="hidden-tree" data-bubble="birds owe me rent" aria-label="A tree with a tail hanging from it"></button>
      <div class="scene scene--bag">
        <div class="scene__stage">
          <div class="scene__prop" data-prop="bag"></div>
          <div class="scene__cat" data-cat="orange" data-cat-flip="1" data-spot-id="scene-bag" data-bubble="i live here now"></div>
        </div>
        <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
        <div class="signpost reveal">
          <span class="signpost__plank">No. 07 — The Bag</span>
          <div class="signpost__board">
            <h2>Open for one minute. Occupied.</h2>
            <p>A bag on the floor is an invitation. A bag with handles is a hammock. The groceries can wait on the counter.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8 · Night -->
    <section class="region region--night" data-region="night">
      <div class="night-sky" aria-hidden="true">
        <span class="star" style="top:12%; left:18%"></span>
        <span class="star" style="top:8%;  left:52%"></span>
        <span class="star" style="top:20%; left:74%"></span>
        <span class="star" style="top:30%; left:32%"></span>
        <span class="star" style="top:16%; left:88%"></span>
        <span class="star" style="top:34%; left:60%"></span>
        <svg class="moon" viewBox="0 0 60 60"><path d="M38 6 A24 24 0 1 0 54 40 A19 19 0 1 1 38 6 Z" fill="#f4e6b8"/></svg>
        <span class="firefly" style="top:55%; left:20%"></span>
        <span class="firefly" style="top:66%; left:70%"></span>
        <span class="firefly" style="top:74%; left:40%"></span>
        <span class="firefly" style="top:60%; left:85%"></span>
      </div>
      <div class="cloud-cat" data-prop="cloudcat" aria-hidden="true"></div>
      <div class="closing">
        <h2>Every spot was taken.</h2>
        <p class="lede center">So Nozzle picked the weirdest one of all.</p>
        <div class="logotype" data-prop="logotype"></div>
        <div class="cta-row">
          <div class="signpost signpost--cta">
            <div class="signpost__board"><a class="btn btn--primary" href="featured.html">Meet this week's cat</a></div>
          </div>
          <div class="signpost signpost--cta" style="--tilt:1.4deg">
            <div class="signpost__board"><a class="btn btn--ghost" href="spots.html">Browse favorite spots</a></div>
          </div>
        </div>
      </div>
      <span class="trail-anchor" data-trail-anchor aria-hidden="true"></span>
    </section>
  </main>

  <script type="module" src="js/app.js"></script>
</body>
</html>
```

Note the `.cloud` divs no longer carry inline SVG — add to `injectArt` in Step 4 a tiny branch that fills `.cloud` elements with the cloud SVG (two ellipses, as today).

- [ ] **Step 3: Append `prop*` functions to `js/cats.js`**

Every function returns transparent-background SVG (no full-bleed rects). Reuse the existing geometry from the `scene*` functions where noted. Complete code:

```js
/* ---------- World props (home journey v2) ----------
   Transparent-background prop clusters. The old scene*()
   full-bleed backdrops remain for featured/spots pages. */

export function propBox() {
  return `
  <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="200" cy="272" rx="180" ry="16" fill="#3d3528" opacity="0.07"/>
    <g transform="translate(80 60)">
      <path d="M0 0 L200 0 L240 60 L-40 60 Z" fill="#d4a878" stroke="#8a6a48" stroke-width="3"/>
      <path d="M0 0 L-40 60 L-40 200 L0 140 Z" fill="#b88a5a" stroke="#8a6a48" stroke-width="3"/>
      <path d="M200 0 L240 60 L240 200 L200 140 Z" fill="#c89a6a" stroke="#8a6a48" stroke-width="3"/>
      <path d="M0 0 L0 140 L200 140 L200 0 Z" fill="#e8c8a0" stroke="#8a6a48" stroke-width="3"/>
      <path d="M0 0 L100 -20 L200 0" fill="none" stroke="#8a6a48" stroke-width="3"/>
      <text x="100" y="80" font-family="serif" font-size="22" fill="#8a6a48" text-anchor="middle" opacity="0.5">FRAGILE</text>
    </g>
    <g transform="translate(360 170)">
      <rect x="-20" y="0" width="40" height="60" rx="4" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <path d="M0 0 Q-30 -40 -20 -80 Q0 -60 0 -90" stroke="#5c7e60" stroke-width="3" fill="#7a9e7e"/>
      <path d="M0 0 Q30 -40 20 -80 Q0 -60 0 -90" stroke="#5c7e60" stroke-width="3" fill="#7a9e7e"/>
    </g>
  </svg>`;
}

export function propKeyboard() {
  return `
  <svg viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="300" width="540" height="22" rx="10" fill="#d4c4a8" stroke="#a89c8a" stroke-width="2.5"/>
    <rect x="40" y="322" width="18" height="50" rx="6" fill="#b8a888" stroke="#a89c8a" stroke-width="2"/>
    <rect x="502" y="322" width="18" height="50" rx="6" fill="#b8a888" stroke="#a89c8a" stroke-width="2"/>
    <rect x="150" y="60" width="280" height="170" rx="10" fill="#3d3528" stroke="#2a2228" stroke-width="3"/>
    <rect x="165" y="75" width="250" height="140" rx="4" fill="#9bc4d0" opacity="0.5"/>
    <rect x="255" y="230" width="70" height="16" fill="#3d3528"/>
    <rect x="225" y="246" width="130" height="8" rx="4" fill="#3d3528"/>
    <g transform="translate(70 258)">
      <rect width="300" height="42" rx="8" fill="#f0e4cc" stroke="#a89c8a" stroke-width="2"/>
      ${Array.from({ length: 9 }, (_, i) => `<rect x="${8 + i * 32}" y="7" width="26" height="12" rx="3" fill="#fffdf8" stroke="#a89c8a" stroke-width="1.2"/>`).join('')}
      <rect x="40" y="24" width="210" height="11" rx="3" fill="#fffdf8" stroke="#a89c8a" stroke-width="1.2"/>
    </g>
    <g transform="translate(452 240)">
      <rect x="0" y="0" width="42" height="52" rx="4" fill="#fffdf8" stroke="#a89c8a" stroke-width="2"/>
      <path d="M42 8 Q58 8 58 26 Q58 42 42 42" fill="none" stroke="#a89c8a" stroke-width="2"/>
      <ellipse cx="21" cy="4" rx="18" ry="5" fill="#6b6051"/>
    </g>
  </svg>`;
}

export function propSink() {
  return `
  <svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.35">
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${40 + i * 82}" y="10" width="78" height="78" fill="#cfe4ea" stroke="#a89c8a" stroke-width="1"/>`).join('')}
    </g>
    <rect x="0" y="230" width="560" height="26" rx="8" fill="#f0e4cc" stroke="#a89c8a" stroke-width="2.5"/>
    <ellipse cx="280" cy="232" rx="180" ry="34" fill="#c8d8de" stroke="#8a9aa0" stroke-width="3"/>
    <ellipse cx="280" cy="224" rx="160" ry="25" fill="#b8c8ce"/>
    <path d="M272 140 L272 96 Q272 78 290 78 L316 78" stroke="#a89c8a" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="316" cy="78" r="9" fill="#a89c8a"/>
    <path d="M316 90 q-3 10 0 14 q3 -4 0 -14" fill="#9bc4d0"/>
    <g transform="translate(478 150)">
      <rect x="0" y="16" width="34" height="60" rx="6" fill="#7a9e7e" stroke="#5c7e60" stroke-width="2"/>
      <rect x="10" y="0" width="14" height="18" rx="3" fill="#5c7e60"/>
    </g>
  </svg>`;
}

export function propShoe() {
  return `
  <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(20 40)">
      <rect x="0" y="0" width="600" height="20" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="0" y="90" width="600" height="20" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="0" y="180" width="600" height="20" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="0" y="0" width="20" height="200" fill="#a86a3f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="580" y="0" width="20" height="200" fill="#a86a3f" stroke="#8a6a48" stroke-width="2"/>
      <g transform="translate(50 32)"><path d="M0 50 Q0 30 30 25 L80 25 Q100 25 110 50 L110 55 L0 55 Z" fill="#d4956a" stroke="#8a6a48" stroke-width="2"/></g>
      <g transform="translate(200 32)"><path d="M0 50 Q0 30 30 25 L80 25 Q100 25 110 50 L110 55 L0 55 Z" fill="#7a9e7e" stroke="#5c7e60" stroke-width="2"/></g>
      <g transform="translate(350 122)"><path d="M0 50 Q0 30 30 25 L80 25 Q100 25 110 50 L110 55 L0 55 Z" fill="#c4a8d4" stroke="#909098" stroke-width="2"/></g>
      <g transform="translate(480 32)"><path d="M0 50 Q0 30 30 25 L80 25 Q100 25 110 50 L110 55 L0 55 Z" fill="#9bc4d0" stroke="#7a9aa4" stroke-width="2"/></g>
    </g>
  </svg>`;
}

export function propVase() {
  return `
  <svg viewBox="0 0 380 400" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="330" width="360" height="16" rx="6" fill="#d4c4a8" stroke="#a89c8a" stroke-width="2.5"/>
    <g transform="translate(120 150)">
      <path d="M0 180 Q-20 160 -10 100 Q-30 60 0 0 L120 0 Q150 60 130 100 Q140 160 120 180 Z" fill="#c4a8d4" stroke="#909098" stroke-width="3"/>
      <ellipse cx="60" cy="0" rx="60" ry="12" fill="#a888c4" stroke="#909098" stroke-width="2"/>
      <path d="M20 60 Q60 50 100 60" stroke="#909098" stroke-width="2" fill="none" opacity="0.4"/>
    </g>
    <g transform="translate(180 150)" stroke="#5c7e60" stroke-width="2" fill="none">
      <path d="M0 0 Q-10 -60 -30 -100"/>
      <path d="M0 0 Q10 -60 30 -100"/>
      <path d="M0 0 Q0 -70 0 -120"/>
      <circle cx="-30" cy="-100" r="8" fill="#e8c97a" stroke="#b8a058"/>
      <circle cx="30" cy="-100" r="8" fill="#e8b4b8" stroke="#b8888c"/>
      <circle cx="0" cy="-120" r="8" fill="#d4956a" stroke="#a8754a"/>
    </g>
  </svg>`;
}

export function propShelf() {
  const colors = ['#d4956a', '#7a9e7e', '#c4a8d4', '#9bc4d0', '#e8c97a', '#e8b4b8'];
  const row = (x0, y, n, seed) => Array.from({ length: n }, (_, i) => {
    const h = 78 + ((i + seed) % 4) * 14;
    return `<rect x="${x0 + i * 52}" y="${y - h}" width="46" height="${h}" fill="${colors[(i + seed) % colors.length]}" stroke="#8a6a48" stroke-width="2"/>`;
  }).join('');
  return `
  <svg viewBox="0 0 820 460" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#8a6a48" stroke-width="3" fill="#d4a878">
      <rect x="30" y="60" width="760" height="16"/>
      <rect x="30" y="200" width="760" height="16"/>
      <rect x="30" y="340" width="760" height="16"/>
      <rect x="30" y="60" width="16" height="296"/>
      <rect x="774" y="60" width="16" height="296"/>
    </g>
    ${row(60, 200, 13, 0)}
    ${row(60, 340, 5, 2)}
    ${row(560, 340, 4, 4)}
  </svg>`;
}

export function propBag() {
  return `
  <svg viewBox="0 0 420 430" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="210" cy="408" rx="170" ry="14" fill="#3d3528" opacity="0.07"/>
    <rect x="40" y="10" width="6" height="70" fill="#8a6a48"/>
    <rect x="22" y="80" width="42" height="8" rx="4" fill="#8a6a48"/>
    <g transform="translate(50 92)">
      <circle cx="0" cy="14" r="11" fill="none" stroke="#a89c8a" stroke-width="3"/>
      <rect x="-2.5" y="22" width="5" height="24" fill="#a89c8a"/>
      <rect x="-12" y="42" width="11" height="16" rx="3" fill="#a89c8a"/>
      <rect x="4" y="42" width="11" height="16" rx="3" fill="#a89c8a"/>
    </g>
    <g transform="translate(120 140)">
      <path d="M0 0 L0 260 L240 260 L240 0 Z" fill="#e8dcc4" stroke="#a89c8a" stroke-width="3"/>
      <path d="M40 0 Q40 -60 80 -60 Q120 -60 120 0" fill="none" stroke="#a89c8a" stroke-width="4"/>
      <path d="M120 0 Q120 -60 160 -60 Q200 -60 200 0" fill="none" stroke="#a89c8a" stroke-width="4"/>
      <text x="120" y="150" font-family="serif" font-size="28" fill="#a89c8a" text-anchor="middle" opacity="0.5">market</text>
    </g>
  </svg>`;
}

export function propHills() {
  return `
  <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
    <circle cx="880" cy="150" r="52" fill="#f2b98a" opacity="0.85"/>
    <ellipse cx="220" cy="330" rx="420" ry="150" fill="#e8cfa8" opacity="0.8"/>
    <ellipse cx="900" cy="360" rx="520" ry="180" fill="#dfc09a" opacity="0.8"/>
    <g stroke="#8a6a48" stroke-width="2" opacity="0.9">
      <path d="M140 250 l30 -26 l30 26 Z" fill="#c98a52"/><rect x="150" y="250" width="40" height="34" fill="#f0e4cc"/>
      <path d="M310 262 l26 -22 l26 22 Z" fill="#b87a4f"/><rect x="318" y="262" width="36" height="28" fill="#f0e4cc"/>
      <path d="M980 268 l28 -24 l28 24 Z" fill="#c98a52"/><rect x="988" y="268" width="40" height="30" fill="#f0e4cc"/>
    </g>
  </svg>`;
}

export function propDoor(kind = 'front') {
  const mat = kind === 'front'
    ? `<ellipse cx="110" cy="238" rx="66" ry="14" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
       <text x="110" y="243" font-family="inherit" font-size="14" fill="#f5e8d8" text-anchor="middle">mrrp</text>`
    : '';
  return `
  <svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="10" width="160" height="220" rx="8" fill="#f0e4cc" stroke="#a89c8a" stroke-width="3"/>
    <rect x="52" y="30" width="116" height="200" rx="58 58 0 0" fill="#b87a4f" stroke="#8a6a48" stroke-width="3"/>
    <rect x="66" y="52" width="88" height="60" rx="6" fill="#c89a6a" stroke="#8a6a48" stroke-width="2"/>
    <rect x="66" y="126" width="88" height="80" rx="6" fill="#c89a6a" stroke="#8a6a48" stroke-width="2"/>
    <circle cx="146" cy="140" r="6" fill="#e8c97a" stroke="#8a6a48" stroke-width="2"/>
    ${mat}
  </svg>`;
}

export function propWindow(sky = '#cfe4ea') {
  return `
  <svg viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="240" height="260" rx="10" fill="${sky}" stroke="#a89c8a" stroke-width="5"/>
    <line x1="130" y1="10" x2="130" y2="270" stroke="#a89c8a" stroke-width="4"/>
    <line x1="10" y1="140" x2="250" y2="140" stroke="#a89c8a" stroke-width="4"/>
    <ellipse cx="70" cy="70" rx="34" ry="14" fill="#fff" opacity="0.7"/>
    <rect x="0" y="270" width="260" height="14" rx="6" fill="#d4c4a8" stroke="#a89c8a" stroke-width="2"/>
  </svg>`;
}

export function propLogotype() {
  /* Letters hand-placed so the "o" position is exact; the curled cat
     nests in the first o. Uses display font via CSS class. */
  return `
  <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" class="logotype__svg" role="img" aria-label="Nozzle">
    <g class="logotype__letters" fill="#f5e8d8">
      <text x="60"  y="130" text-anchor="middle">N</text>
      <text x="160" y="130" text-anchor="middle" opacity="0">o</text>
      <text x="255" y="130" text-anchor="middle">z</text>
      <text x="340" y="130" text-anchor="middle">z</text>
      <text x="425" y="130" text-anchor="middle">l</text>
      <text x="505" y="130" text-anchor="middle">e</text>
    </g>
    <g transform="translate(160 96)">
      <circle cx="0" cy="0" r="52" fill="none" stroke="#f5e8d8" stroke-width="14"/>
      <g class="logotype__cat" transform="translate(-34 -26) scale(0.23)">
        <ellipse cx="160" cy="155" rx="95" ry="55" fill="#e8b07a" stroke="#c98a52" stroke-width="6"/>
        <path d="M70 150 Q40 145 35 120 Q33 100 50 95 Q60 95 62 105 Q55 110 55 120 Q60 135 80 138 Z" fill="#e8b07a" stroke="#c98a52" stroke-width="6"/>
        <circle cx="225" cy="135" r="48" fill="#e8b07a" stroke="#c98a52" stroke-width="6"/>
        <path d="M195 105 L188 78 L210 95 Z" fill="#e8b07a" stroke="#c98a52" stroke-width="6"/>
        <path d="M255 105 L262 78 L240 95 Z" fill="#e8b07a" stroke="#c98a52" stroke-width="6"/>
        <path d="M205 130 Q213 126 221 130" stroke="#3d3528" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M229 130 Q237 126 245 130" stroke="#3d3528" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M225 142 L221 146 L229 146 Z" fill="#e8b4b8" stroke="#c98a52" stroke-width="3"/>
      </g>
    </g>
  </svg>`;
}

export function propCloudcat() {
  return `
  <svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="110" cy="110" rx="90" ry="38" fill="#fffdf8" opacity="0.9"/>
    <ellipse cx="185" cy="98" rx="60" ry="30" fill="#fffdf8" opacity="0.9"/>
    <g transform="translate(60 30) scale(0.45)">
      <ellipse cx="160" cy="155" rx="95" ry="55" fill="#e8c97a" stroke="#c9a352" stroke-width="4"/>
      <circle cx="225" cy="135" r="48" fill="#e8c97a" stroke="#c9a352" stroke-width="4"/>
      <path d="M195 105 L188 78 L210 95 Z" fill="#e8c97a" stroke="#c9a352" stroke-width="4"/>
      <path d="M255 105 L262 78 L240 95 Z" fill="#e8c97a" stroke="#c9a352" stroke-width="4"/>
      <path d="M205 130 Q213 126 221 130" stroke="#7a6428" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M229 130 Q237 126 245 130" stroke="#7a6428" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}
```

- [ ] **Step 4: Update `js/app.js`**

Replace `injectArt` and `initCats`, replace `initJourney` usage with dynamic imports, and capture the purr API. Show complete replacement for the changed parts:

```js
/* ---- Inject cats & art from data attributes ---- */
function injectArt() {
  document.querySelectorAll("[data-cat]").forEach((el) => {
    const variant = el.dataset.cat || "orange";
    const opts = { flip: el.dataset.flip === "1" || el.dataset.catFlip === "1" };
    const fn = el.dataset.pose === "sit" ? cats.sittingCat : cats.sleepingCat;
    el.innerHTML =
      fn(variant, opts) +
      (el.dataset.bubble ? `<span class="bubble">${el.dataset.bubble}</span>` : "");
  });
  document.querySelectorAll("[data-scene]").forEach((el) => {
    const name = el.dataset.scene;
    const fn = cats["scene" + name.charAt(0).toUpperCase() + name.slice(1)];
    if (fn) el.innerHTML = fn();
  });
  document.querySelectorAll("[data-prop]").forEach((el) => {
    const name = el.dataset.prop;
    const fn = cats["prop" + name.charAt(0).toUpperCase() + name.slice(1)];
    if (!fn) return;
    if (name === "door") el.innerHTML = fn(el.dataset.door);
    else if (name === "window") el.innerHTML = fn(el.dataset.sky);
    else el.innerHTML = fn();
  });
  document.querySelectorAll("[data-spot]").forEach((el) => {
    const name = el.dataset.spot.replace("hidden-", "");
    const fn = cats["spot" + name.charAt(0).toUpperCase() + name.slice(1)];
    if (fn) {
      el.innerHTML =
        fn() +
        (el.dataset.bubble ? `<span class="bubble">${el.dataset.bubble}</span>` : "");
    }
  });
  document.querySelectorAll(".cloud").forEach((el) => {
    el.innerHTML = `<svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg"><ellipse cx="40" cy="30" rx="40" ry="20" fill="#fff"/><ellipse cx="70" cy="25" rx="30" ry="16" fill="#fff"/></svg>`;
  });
}
```

```js
/* ---- Cat wake on hover/tap ---- */
function initCats(onWake) {
  document
    .querySelectorAll(".scene__cat, .hero__cat, .cat-pet")
    .forEach((cat) => {
      const bubble = cat.querySelector(".bubble");
      const wake = () => {
        cat.classList.add("awake");
        bubble?.classList.add("show");
        onWake?.(cat);
      };
      const sleep = () => {
        cat.classList.remove("awake");
        bubble?.classList.remove("show");
      };
      cat.addEventListener("mouseenter", wake);
      cat.addEventListener("mouseleave", sleep);
      cat.addEventListener("click", () => {
        wake();
        clearTimeout(cat._napTimer);
        cat._napTimer = setTimeout(sleep, 1800);
      });
      const spawnZzz = () => {
        if (cat.classList.contains("awake")) return;
        const z = document.createElement("span");
        z.className = "zzz";
        z.textContent = "z";
        z.style.left = 50 + Math.random() * 20 + "%";
        z.style.top = 20 + Math.random() * 20 + "%";
        z.style.fontSize = 14 + Math.random() * 10 + "px";
        cat.appendChild(z);
        setTimeout(() => z.remove(), 3000);
      };
      setInterval(spawnZzz, 2200);
    });
}
```

Boot block (replaces the old `DOMContentLoaded` handler and deletes the old `initJourney` function from app.js entirely):

```js
/* ---- Boot ---- */
document.addEventListener("DOMContentLoaded", async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("reduced-motion");
  }
  injectArt();
  injectChrome();
  initNav();
  initReveal();
  initCursor();
  const purr = initPurr();

  if (document.querySelector(".journey")) {
    const [{ initJourney }, { initDiscovery }] = await Promise.all([
      import("./journey.js"),
      import("./discovery.js"),
    ]);
    const game = initDiscovery({ chime: purr.chime });
    initCats((cat) => {
      if (cat.dataset.spotId) game.markFound(cat.dataset.spotId);
    });
    initJourney();
  } else {
    initCats();
  }
});
```

(`purr.chime` is added in Task 5; until then calling `initDiscovery` doesn't happen because `discovery.js` doesn't exist yet — for Task 1 only, guard the dynamic import block with `try { ... } catch (e) { console.warn("journey modules pending", e); initCats(); }` and remove the guard in Task 5. `purr.js` returns an object without `chime` until Task 5; passing `undefined` is handled by discovery's default.)

- [ ] **Step 5: Rewrite `css/journey.css` (world core)**

Complete file at this stage (later tasks append their own sections):

```css
/* ============================================================
   One Lazy Day — continuous world journey (home page)
   ============================================================ */

:root {
  --night-ink: #2b3152;
  --night-soft: #6a6f94;
  --wall: #f7efe0;
  --wood: #c89a6a;
  --wood-dark: #8a6a48;
  --wood-mid: #a86a3f;
}

/* ---------- The world ---------- */
.journey {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg,
    #f9d9b8 0%,
    #fae9d3 8%,
    #faf6f0 20%,
    #fdf8ec 36%,
    #f8eeda 52%,
    #f6dfb4 62%,
    #e8c9a0 72%,
    #cfa9b8 80%,
    #8d7ba8 88%,
    #3c4166 95%,
    #2b3152 100%);
}

.trail {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 2;
}

.walker { position: absolute; top: 0; left: 0; z-index: 6; width: 96px; }

.trail-anchor {
  display: block; width: 2px; height: 2px;
  flex: 0 0 2px; pointer-events: none;
}

/* ---------- Regions ---------- */
.region {
  position: relative;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 3rem;
  padding: 4rem 1.5rem;
  min-height: 640px;
}
.region--dawn    { min-height: 100svh; }
.region--porch   { min-height: 95svh; }
.region--study   { min-height: 85svh; }
.region--kitchen { min-height: 85svh; }
.region--hall    { min-height: 80svh; }
.region--living  { min-height: 135svh; }
.region--garden  { min-height: 95svh; }
.region--night   { min-height: 110svh; }

/* Indoor wall band over the sky gradient */
.region--indoor {
  background:
    linear-gradient(180deg, transparent 0, var(--wall) 60px calc(100% - 60px), transparent 100%),
    repeating-linear-gradient(90deg, rgba(168,156,138,0.06) 0 3px, transparent 3px 110px);
}
.region__window {
  position: absolute; top: 12%; width: clamp(120px, 16vw, 220px);
  z-index: 1;
}
.region--study  .region__window { right: 8%; }
.region--living .region__window { left: 6%; }

/* Night text */
.region--night { color: var(--cream); }
.region--night .lede { color: #cfd2e8; }

/* ---------- Dawn hero ---------- */
.region--dawn { justify-content: center; text-align: center; }
.region--dawn .hero__content { position: relative; z-index: 3; }
.region--dawn .hero__title { margin: 0.4rem 0 1rem; }
.region--dawn .hero__title .accent { color: var(--terracotta); }
.region--dawn .lede { margin-inline: auto; max-width: 44ch; }
.region--dawn .scroll-hint { margin: 2.2rem auto 0; }
.region__art--hills {
  position: absolute; left: 0; right: 0; bottom: -4px; z-index: 0;
}
.region--dawn .trail-anchor { position: absolute; bottom: 6%; left: 50%; }

.cloud { position: absolute; opacity: 0.6; z-index: 0; }

/* ---------- Scenes ---------- */
.scene {
  position: relative; z-index: 3;
  display: flex; align-items: center; justify-content: center;
  gap: clamp(1.5rem, 5vw, 4.5rem);
  width: min(100%, 1150px);
}
.scene--flip { flex-direction: row-reverse; }

.scene__stage { position: relative; width: min(46vw, 520px); }
.scene__prop svg { width: 100%; height: auto; }

.scene__cat {
  position: absolute;
  width: 56%;
  left: 22%; bottom: 18%;
  cursor: none;
}
.scene__cat svg { width: 100%; height: auto; overflow: visible; }

/* Per-scene cat placement (tuned in polish pass) */
.scene--box   .scene__cat { width: 46%; left: 20%; bottom: 34%; }
.scene--keys  .scene__cat { width: 42%; left: 14%; bottom: 12%; }
.scene--sink  .scene__cat { width: 44%; left: 28%; bottom: 24%; }
.scene--shoe  .scene__cat { width: 34%; left: 33%; bottom: 34%; }
.scene--vase  .scene__cat { width: 40%; left: 26%; bottom: 52%; }
.scene--shelf .scene__cat { width: 30%; left: 52%; bottom: 26%; }
.scene--bag   .scene__cat { width: 44%; left: 26%; bottom: 42%; }

/* ---------- Signposts ---------- */
.signpost { position: relative; max-width: 380px; z-index: 3; --tilt: -1.2deg; }
.signpost::before {
  content: '';
  position: absolute; left: 50%; bottom: -58px;
  width: 12px; height: 70px; margin-left: -6px;
  background: var(--wood-mid);
  border: 3px solid var(--wood-dark);
  border-radius: 4px;
  z-index: -1;
}
.signpost__plank {
  display: inline-block;
  background: var(--wood-mid); color: #fff8ec;
  font-weight: 700; font-size: 0.72rem;
  letter-spacing: 0.16em; text-transform: uppercase;
  padding: 0.25rem 0.75rem; border-radius: 6px;
  border: 2px solid var(--wood-dark);
  transform: rotate(1deg);
  margin-bottom: -0.4rem; position: relative; z-index: 1;
}
.signpost__board {
  background: linear-gradient(175deg, #d3a874, var(--wood));
  border: 3px solid var(--wood-dark);
  border-radius: 12px;
  box-shadow: 0 5px 0 var(--wood-dark), 0 10px 24px var(--shadow-md);
  padding: 1.2rem 1.4rem 1.3rem;
  transform: rotate(var(--tilt));
}
.signpost__board h2 { font-size: clamp(1.3rem, 2.6vw, 1.7rem); color: #4a3722; margin-bottom: 0.4rem; }
.signpost__board p { font-size: 0.92rem; color: #5d4630; }
.signpost__board::after {
  content: ''; position: absolute; top: 10px; left: 14px;
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--wood-dark); box-shadow: calc(100% + 320px) 0 0 var(--wood-dark);
  opacity: 0.55;
}

/* ---------- Doorways ---------- */
.doorway { position: relative; z-index: 3; margin-top: 1rem; }
.doorway__art { width: clamp(130px, 15vw, 190px); }
.doorway .trail-anchor { position: absolute; bottom: 8px; left: 50%; }

/* ---------- Sleeping-cat behaviors (unchanged mechanics) ---------- */
.cat-eye-lid { transition: transform 0.3s ease; transform-origin: center; }
.scene__cat .cat-eye { opacity: 0; transition: opacity 0.25s; }
.scene__cat .cat-whisker { transition: transform 0.3s; transform-origin: center; }
.scene__cat .cat-body { transition: transform 0.4s ease; transform-origin: center bottom; }
.scene__cat.awake .cat-eye { opacity: 1; animation: blink 4s ease-in-out infinite; }
.scene__cat.awake .cat-eye-lid { transform: scaleY(0); }
.scene__cat.awake .cat-body { transform: translateY(-4px) rotate(-1deg); animation: none; }
.scene__cat.awake .cat-whisker { transform: rotate(3deg); }
@keyframes blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
.scene__cat .cat-body { animation: breathe 3.5s ease-in-out infinite; }
@keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.015); } }

.zzz {
  position: absolute; font-family: var(--font-display);
  color: var(--ink-faint); opacity: 0; pointer-events: none;
  animation: floatZ 3s ease-out infinite; z-index: 4;
}
@keyframes floatZ {
  0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
  20% { opacity: 0.6; }
  100% { opacity: 0; transform: translate(20px, -50px) scale(1.2); }
}

/* ---------- Night region ---------- */
.night-sky { position: absolute; inset: 0; pointer-events: none; }
.star {
  position: absolute; width: 4px; height: 4px; border-radius: 50%;
  background: #f4e6b8; box-shadow: 0 0 8px 1px rgba(244,230,184,0.8);
  animation: twinkle 3.2s ease-in-out infinite;
}
.star:nth-child(2n) { animation-delay: 1.1s; }
.star:nth-child(3n) { animation-delay: 2.2s; }
@keyframes twinkle { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
.moon { position: absolute; top: 8%; right: 12%; width: clamp(44px, 6vw, 72px); }
.firefly {
  position: absolute; width: 6px; height: 6px; border-radius: 50%;
  background: #ffe89a; box-shadow: 0 0 10px 2px rgba(255,232,154,0.9);
  animation: firefly 7s ease-in-out infinite;
}
.firefly:nth-child(2n) { animation-delay: 2.4s; animation-duration: 9s; }
@keyframes firefly {
  0%, 100% { transform: translate(0, 0); opacity: 0.2; }
  25% { transform: translate(26px, -20px); opacity: 1; }
  55% { transform: translate(-14px, -38px); opacity: 0.5; }
  80% { transform: translate(12px, -10px); opacity: 0.9; }
}

.closing { position: relative; z-index: 3; text-align: center; }
.closing .lede { margin: 0.6rem auto 2rem; }
.logotype { width: min(86vw, 620px); margin: 0 auto 2.5rem; }
.logotype__svg .logotype__letters text {
  font-family: var(--font-display);
  font-size: 150px;
}
.cta-row { display: flex; gap: 2.5rem; justify-content: center; flex-wrap: wrap; }
.signpost--cta::before { bottom: -46px; height: 56px; }
.signpost--cta .signpost__board { padding: 0.9rem 1.1rem; }
.signpost--cta .signpost__board::after { display: none; }

.cloud-cat {
  position: absolute; top: 18%; left: 10%;
  width: clamp(130px, 16vw, 210px);
  opacity: 0; transform: translateY(12px);
  transition: opacity 1.2s ease, transform 1.2s ease;
  pointer-events: none; z-index: 2;
}
.cloud-cat.found { opacity: 1; transform: none; animation: cloudBob 6s ease-in-out infinite; }
@keyframes cloudBob { 0%,100% { translate: 0 0; } 50% { translate: 0 -10px; } }

/* ---------- Hidden spots (art/interactions in Task 4) ---------- */
.hidden-spot {
  position: relative; z-index: 3;
  background: none; border: 0; padding: 0;
  width: clamp(110px, 13vw, 190px);
  cursor: none;
}
.hidden-spot svg { width: 100%; height: auto; overflow: visible; }
.hidden-spot:focus-visible { outline: 3px dashed var(--terracotta); outline-offset: 6px; border-radius: 12px; }

/* Rough spot placement within regions */
.hidden-spot--mailbox { position: absolute; top: 8%; left: 10%; }
.hidden-spot--bush    { position: absolute; bottom: 26%; right: 8%; }
.hidden-spot--curtain { position: absolute; top: 10%; right: 7%; }
.hidden-spot--basket  { position: absolute; bottom: 10%; left: 9%; }
.hidden-spot--tree    { position: absolute; top: 6%; right: 6%; width: clamp(150px, 18vw, 260px); }

/* ---------- Reveal-on-scroll (kept) ---------- */
.reveal { opacity: 0; transform: translateY(30px) rotate(var(--tilt, 0deg)); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.in { opacity: 1; transform: rotate(var(--tilt, 0deg)) translateY(0); }
.signpost.reveal.in { transform: none; }

/* ---------- Responsive ---------- */
@media (max-width: 760px) {
  .scene, .scene--flip { flex-direction: column; gap: 1.2rem; }
  .scene__stage { width: min(88vw, 440px); }
  .signpost { max-width: 330px; }
  .region { gap: 2rem; }
  .region__window { display: none; }
  .hidden-spot--tree { width: 140px; }
}
```

Note: the old `.scene__caption`, `.journey-dots`, `.hero`, `.closing__cat`, per-scene tint blocks are all gone — `.hero`-related styles that `style.css` doesn't own move into `.region--dawn` rules above. `initJourney`/dots code was removed from `app.js` in Step 4.

- [ ] **Step 6: Syntax-check and visual check**

Run: `node --check js/app.js && node --check js/cats.js`
Expected: no output (both pass).

Start preview server `nozzle`, open `http://localhost:4173/`, verify:
- Page renders top-to-bottom as one continuous gradient world; no per-section background jumps.
- Seven scenes alternate sides with wooden signposts showing the original captions; cats sleep/wake on hover; Zzz float.
- Indoor regions show wall band + window; night region shows stars/moon/fireflies, light text, logotype with cat in the "o", two CTA signposts.
- Hidden-spot buttons exist (focusable via Tab) even though art is empty.
- Console shows only the temporary "journey modules pending" warning, nothing else.
- Subpage regression: open `featured.html` and `spots.html` — cards with `data-scene` thumbnails still render, hero cats still sit.

- [ ] **Step 7: Commit**

```bash
git add index.html css/journey.css js/cats.js js/app.js .claude/launch.json
git commit -m "feat: rebuild home as continuous dawn-to-night world with signpost scenes"
```

---

### Task 2: The trail — path generation, paw prints, mini-map

**Files:**
- Create: `js/journey.js`
- Modify: `css/journey.css` (append trail/paws/minimap styles)

**Interfaces:**
- Consumes: `[data-trail-anchor]` / `[data-trail-door]` spans, `svg.trail`, `.region` elements from Task 1.
- Produces: `initJourney()` export; internal `state.samples` (`{x, y, len}` every 8px), `state.total`, `state.progress` — Task 3's walker reads these. A single `frame()` rAF loop that later tasks extend.

- [ ] **Step 1: Write `js/journey.js`**

```js
/* ============================================================
   Journey engine — trail, paw prints, walker, mini-map, parallax
   Owns all scroll-linked layout on the home page.
   ============================================================ */

const SVGNS = "http://www.w3.org/2000/svg";

export function initJourney() {
  const journey = document.querySelector(".journey");
  const svg = journey?.querySelector(".trail");
  if (!journey || !svg) return;

  const reduced = document.body.classList.contains("reduced-motion");

  const state = {
    samples: [],       // {x, y, len} every SAMPLE_STEP px of path length
    total: 0,          // total path length
    progress: 0,       // 0..1 along the path
    paws: [],          // {el, t}
    master: null,      // hidden <path> used for measurement
    minimap: null,
  };
  const SAMPLE_STEP = 8;
  const PAW_STEP = 52;

  /* ---- helpers ---- */
  const relRect = (el) => {
    const j = journey.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - j.left + r.width / 2,
      y: r.top - j.top + r.height / 2,
    };
  };

  function pathThrough(pts) {
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const dy = (b.y - a.y) * 0.45;
      d += ` C ${a.x.toFixed(1)} ${(a.y + dy).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - dy).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
  }

  /* ---- build / rebuild everything layout-dependent ---- */
  function build() {
    const anchors = [...journey.querySelectorAll("[data-trail-anchor]")];
    if (anchors.length < 2) return;
    const pts = anchors.map(relRect);
    const doorIdx = anchors
      .map((a, i) => (a.hasAttribute("data-trail-door") ? i : -1))
      .filter((i) => i >= 0);

    const w = journey.clientWidth;
    const h = journey.scrollHeight;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.innerHTML = `
      <defs>
        <g id="pawSym">
          <ellipse cx="0" cy="2.6" rx="3.4" ry="2.6"/>
          <ellipse cx="-3" cy="-2" rx="1.3" ry="1.7"/>
          <ellipse cx="0" cy="-3.2" rx="1.3" ry="1.8"/>
          <ellipse cx="3" cy="-2" rx="1.3" ry="1.7"/>
        </g>
      </defs>
      <g class="trail__segments"></g>
      <g class="trail__paws"></g>`;

    // Hidden master path for measurement
    state.master = document.createElementNS(SVGNS, "path");
    state.master.setAttribute("d", pathThrough(pts));
    state.master.setAttribute("fill", "none");
    state.master.setAttribute("stroke", "none");
    svg.appendChild(state.master);

    // Visible segments split at doors: outdoor / indoor / outdoor
    const segs = svg.querySelector(".trail__segments");
    const bounds = [0, ...doorIdx, pts.length - 1];
    for (let s = 0; s < bounds.length - 1; s++) {
      const slice = pts.slice(bounds[s], bounds[s + 1] + 1);
      const indoor = doorIdx.length === 2 && s === 1;
      const d = pathThrough(slice);
      const bed = document.createElementNS(SVGNS, "path");
      bed.setAttribute("d", d);
      bed.setAttribute("class", `trail__bed ${indoor ? "trail__bed--indoor" : ""}`);
      const dash = document.createElementNS(SVGNS, "path");
      dash.setAttribute("d", d);
      dash.setAttribute("class", `trail__dash ${indoor ? "trail__dash--indoor" : ""}`);
      segs.append(bed, dash);
    }

    // Sample table
    state.total = state.master.getTotalLength();
    state.samples = [];
    for (let len = 0; len <= state.total; len += SAMPLE_STEP) {
      const p = state.master.getPointAtLength(len);
      state.samples.push({ x: p.x, y: p.y, len });
    }

    // Paw prints along the path
    const paws = svg.querySelector(".trail__paws");
    state.paws = [];
    let side = 1;
    for (let len = PAW_STEP; len < state.total - PAW_STEP; len += PAW_STEP) {
      const p = state.master.getPointAtLength(len);
      const q = state.master.getPointAtLength(Math.min(len + 6, state.total));
      const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI + 90;
      const nx = -(q.y - p.y), ny = q.x - p.x;
      const nl = Math.hypot(nx, ny) || 1;
      const off = 9 * side;
      side = -side;
      const use = document.createElementNS(SVGNS, "use");
      use.setAttribute("href", "#pawSym");
      use.setAttribute(
        "transform",
        `translate(${(p.x + (nx / nl) * off).toFixed(1)} ${(p.y + (ny / nl) * off).toFixed(1)}) rotate(${ang.toFixed(1)})`
      );
      use.setAttribute("class", "paw");
      paws.appendChild(use);
      state.paws.push({ el: use, t: len / state.total });
    }

    buildMinimap(pts, w, h);
    dirty = true;
  }

  /* ---- mini-map ---- */
  function buildMinimap(pts, w, h) {
    let mm = document.querySelector(".minimap");
    if (!mm) {
      mm = document.createElement("aside");
      mm.className = "minimap";
      mm.setAttribute("aria-label", "Journey overview");
      document.body.appendChild(mm);
    }
    const MW = 34, MH = 150;
    const scaled = pts.map((p) => ({ x: 4 + (p.x / w) * (MW - 8), y: 4 + (p.y / h) * (MH - 8) }));
    mm.innerHTML = `
      <svg viewBox="0 0 ${MW} ${MH}" width="${MW}" height="${MH}" aria-hidden="true">
        <path class="minimap__path" d="${pathThrough(scaled)}"/>
        <circle class="minimap__marker" r="3.4" cx="${scaled[0].x}" cy="${scaled[0].y}"/>
      </svg>`;
    const regions = [...journey.querySelectorAll(".region")];
    regions.forEach((rg) => {
      const b = document.createElement("button");
      b.className = "minimap__tick";
      b.setAttribute("aria-label", `Go to ${rg.dataset.region}`);
      const y = ((rg.offsetTop + rg.offsetHeight / 2) / h) * MH;
      b.style.top = `${(y / MH) * 100}%`;
      b.addEventListener("click", () =>
        rg.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })
      );
      mm.appendChild(b);
    });
    state.minimap = {
      marker: mm.querySelector(".minimap__marker"),
      scaled,
    };
  }

  /* ---- per-frame scroll work ---- */
  let dirty = true;
  let lastScrollY = window.scrollY;

  function sampleAtY(targetY) {
    const s = state.samples;
    if (!s.length) return null;
    let lo = 0, hi = s.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (s[mid].y < targetY) lo = mid + 1;
      else hi = mid;
    }
    return Math.max(0, Math.min(s.length - 1, lo));
  }

  function frame() {
    const scrollY = window.scrollY;
    if (scrollY !== lastScrollY) dirty = true;

    if (dirty && state.samples.length) {
      const jTop = journey.getBoundingClientRect().top + scrollY;
      const targetY = scrollY + window.innerHeight * 0.55 - jTop;
      const idx = sampleAtY(targetY);
      const smp = state.samples[idx];
      state.progress = smp.len / state.total;

      // paw prints: trailing window behind current position
      const lead = state.progress, tail = state.progress - 0.12;
      state.paws.forEach((p) =>
        p.el.classList.toggle("shown", reduced || (p.t <= lead && p.t >= tail))
      );

      // mini-map marker
      if (state.minimap) {
        const mi = Math.floor(state.progress * (state.minimap.scaled.length - 1));
        const mp = state.minimap.scaled[mi];
        state.minimap.marker.setAttribute("cx", mp.x);
        state.minimap.marker.setAttribute("cy", mp.y);
      }

      hooks.forEach((fn) => fn(state, { scrollY, idx }));
      dirty = false;
    }
    lastScrollY = scrollY;
    requestAnimationFrame(frame);
  }

  /* Extension point used by walker (Task 3) / parallax (Task 6) */
  const hooks = [];
  function onFrame(fn) { hooks.push(fn); }

  /* ---- lifecycle ---- */
  window.addEventListener("scroll", () => { dirty = true; }, { passive: true });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 160);
  });
  document.fonts?.ready.then(() => build());
  window.addEventListener("load", () => build());

  build();
  requestAnimationFrame(frame);

  return { state, onFrame, rebuild: build };
}
```

- [ ] **Step 2: Append trail/minimap CSS to `css/journey.css`**

```css
/* ---------- Trail ---------- */
.trail__bed {
  fill: none; stroke: #dcc39a; stroke-width: 34;
  stroke-linecap: round; stroke-linejoin: round; opacity: 0.75;
}
.trail__bed--indoor { stroke: #d9b6a2; opacity: 0.6; }
.trail__dash {
  fill: none; stroke: #c2a276; stroke-width: 5;
  stroke-linecap: round; stroke-dasharray: 2 26; opacity: 0.8;
}
.trail__dash--indoor { stroke: #b98d78; stroke-dasharray: 16 18; }
.trail .paw {
  fill: #a3865e; opacity: 0;
  transition: opacity 0.5s ease;
}
.trail .paw.shown { opacity: 0.55; }
.region--night ~ * .paw { fill: #cbb98a; }

/* ---------- Mini-map ---------- */
.minimap {
  position: fixed; right: 1rem; top: 50%;
  transform: translateY(-50%);
  z-index: 60; width: 34px; height: 150px;
  opacity: 0.85;
}
.minimap__path { fill: none; stroke: var(--ink-faint); stroke-width: 2.5; stroke-linecap: round; opacity: 0.6; }
.minimap__marker { fill: var(--terracotta); }
.minimap__tick {
  position: absolute; left: 50%;
  width: 14px; height: 14px; margin-left: -7px; margin-top: -7px;
  border: 0; border-radius: 50%; background: transparent;
  cursor: none; padding: 0;
}
.minimap__tick:hover { background: rgba(212, 149, 106, 0.25); }
@media (max-width: 760px) { .minimap { display: none; } }
```

- [ ] **Step 3: Remove the temporary import guard note**

If Task 1's `try/catch` around dynamic imports logs "journey modules pending", it will now succeed for `journey.js` but still fail on `discovery.js` (doesn't exist until Task 5). Point the catch at a stub instead: create `js/discovery.js` as a stub now:

```js
/* Discovery game — full implementation in Task 5 */
export function initDiscovery() {
  return { markFound() {}, found: new Set() };
}
```

Remove the `try/catch` guard in `app.js` (plain awaits now).

- [ ] **Step 4: Verify**

Run: `node --check js/journey.js && node --check js/discovery.js && node --check js/app.js`
Expected: all pass.

Browser at `http://localhost:4173/`:
- A tan winding trail S-curves from the dawn hillside through every scene (passing between cat and signpost), through both doorways, ending in the night region. Indoor stretch looks like a rug/floor runner (denser dashes, warmer tone).
- Scrolling reveals paw prints trailing behind the current position; prints more than ~12% of the journey behind fade back out.
- Mini-map squiggle at right edge: marker moves as you scroll; clicking a tick scrolls to that region.
- Resize the window: trail redraws through the scenes (no drift).
- No console errors.

- [ ] **Step 5: Commit**

```bash
git add js/journey.js js/discovery.js js/app.js css/journey.css
git commit -m "feat: runtime-generated winding trail with paw prints and mini-map"
```

---

### Task 3: Nozzle the walker

**Files:**
- Modify: `js/cats.js` (append `walkingCat()`)
- Modify: `js/journey.js` (walker driver via `onFrame` hook)
- Modify: `css/journey.css` (append walker poses/keyframes)

**Interfaces:**
- Consumes: `state.samples`, `state.progress`, `onFrame(fn)` from Task 2; `.walker` div from Task 1.
- Produces: `cats.walkingCat()` SVG with pose groups `.pose--walk` / `.pose--sit`, part classes `.walker-leg--a`, `.walker-leg--b`, `.walker-tail`, `.walker-head`, `.walker-mouth`. Walker element classes driven by JS: `.is-walking`, `.is-sitting`, `.is-grooming`, `.is-yawning`, `.is-done`, `.flip`.

- [ ] **Step 1: Append `walkingCat()` to `js/cats.js`**

```js
/* Side-view Nozzle for the trail. Two pose groups toggled by CSS. */
export function walkingCat() {
  const p = { body: '#e8b07a', dark: '#c98a52', belly: '#f5d8b8', nose: '#e8b4b8' };
  return `
  <svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg" class="walker__sprite">
    <g class="pose pose--walk">
      <path class="walker-tail" d="M18 52 Q2 44 6 26 Q8 16 16 18" fill="none" stroke="${p.dark}" stroke-width="7" stroke-linecap="round"/>
      <g class="walker-leg walker-leg--b" transform-origin="38 62"><rect x="34" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
      <g class="walker-leg walker-leg--a" transform-origin="50 62"><rect x="46" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
      <ellipse cx="55" cy="55" rx="32" ry="17" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <ellipse cx="55" cy="62" rx="22" ry="9" fill="${p.belly}" opacity="0.7"/>
      <g class="walker-leg walker-leg--a" transform-origin="66 62"><rect x="62" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
      <g class="walker-leg walker-leg--b" transform-origin="78 62"><rect x="74" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
      <g class="walker-head">
        <circle cx="95" cy="36" r="17" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M84 24 L80 10 L92 20 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M104 22 L110 9 L96 18 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M96 34 Q101 31 106 34" stroke="#3d3528" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M108 41 L104 44 L110 45 Z" fill="${p.nose}" stroke="${p.dark}" stroke-width="1.4"/>
        <path class="walker-mouth" d="M106 47 Q103 50 100 48" stroke="${p.dark}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        <g stroke="${p.dark}" stroke-width="1.3" stroke-linecap="round">
          <line x1="86" y1="41" x2="76" y2="40"/><line x1="86" y1="45" x2="77" y2="47"/>
        </g>
      </g>
    </g>
    <g class="pose pose--sit">
      <path class="walker-tail" d="M28 84 Q10 82 12 66 Q13 58 20 59" fill="none" stroke="${p.dark}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="52" cy="66" rx="26" ry="24" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <ellipse cx="52" cy="74" rx="15" ry="13" fill="${p.belly}" opacity="0.7"/>
      <rect x="40" y="72" width="8" height="18" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <rect x="56" y="72" width="8" height="18" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <g class="walker-head">
        <circle cx="60" cy="34" r="18" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M48 22 L44 6 L57 17 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M70 20 L77 5 L62 16 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M52 33 Q56 30 60 33" stroke="#3d3528" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M63 33 Q67 30 71 33" stroke="#3d3528" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M61 40 L58 43 L64 43 Z" fill="${p.nose}" stroke="${p.dark}" stroke-width="1.4"/>
        <ellipse class="walker-mouth walker-mouth--yawn" cx="61" cy="47" rx="4" ry="5" fill="#8a5a3f" opacity="0"/>
        <g stroke="${p.dark}" stroke-width="1.3" stroke-linecap="round">
          <line x1="46" y1="40" x2="36" y2="39"/><line x1="46" y1="44" x2="37" y2="46"/>
          <line x1="74" y1="40" x2="84" y2="39"/><line x1="74" y1="44" x2="83" y2="46"/>
        </g>
      </g>
    </g>
  </svg>`;
}
```

- [ ] **Step 2: Add the walker driver to `js/journey.js`**

Inside `initJourney`, after `build()` is defined (before the lifecycle block), add — and import at top of file `import { walkingCat } from "./cats.js";`:

```js
  /* ---- walker (Nozzle) ---- */
  const walker = journey.querySelector(".walker");
  if (walker && !reduced) {
    walker.innerHTML = walkingCat();
    let lastMove = performance.now();
    let facing = 1;
    let px = 0, py = 0;

    onFrame((st, { idx }) => {
      const s = st.samples;
      const smp = s[idx];
      const look = s[Math.min(idx + 4, s.length - 1)];
      const back = s[Math.max(idx - 4, 0)];
      const dx = look.x - back.x;
      if (dx > 8) facing = 1;
      else if (dx < -8) facing = -1;

      if (Math.abs(smp.x - px) + Math.abs(smp.y - py) > 0.5) {
        lastMove = performance.now();
        px = smp.x; py = smp.y;
      }
      walker.style.transform = `translate3d(${smp.x - 48}px, ${smp.y - 78}px, 0)`;
      walker.classList.toggle("flip", facing === -1);
      walker.classList.toggle("is-done", st.progress > 0.965);
    });

    // pose state machine on a light interval (no layout reads)
    setInterval(() => {
      const idle = performance.now() - lastMove;
      walker.classList.toggle("is-walking", idle < 200);
      walker.classList.toggle("is-sitting", idle >= 450);
      walker.classList.toggle("is-grooming", idle >= 4500);
      walker.classList.toggle(
        "is-yawning",
        idle >= 450 && state.progress < 0.03
      );
    }, 150);
  } else if (walker) {
    walker.remove(); // reduced motion: no walker
  }
```

- [ ] **Step 3: Append walker CSS to `css/journey.css`**

```css
/* ---------- Walker (Nozzle) ---------- */
.walker { pointer-events: none; will-change: transform; transition: opacity 0.6s; }
.walker.is-done { opacity: 0; }
.walker__sprite { width: 96px; height: auto; overflow: visible; }
.walker.flip .walker__sprite { transform: scaleX(-1); }

.walker .pose--sit { display: none; }
.walker.is-sitting .pose--walk { display: none; }
.walker.is-sitting .pose--sit { display: block; }

.walker.is-walking .walker-leg--a { animation: legSwing 0.42s ease-in-out infinite; }
.walker.is-walking .walker-leg--b { animation: legSwing 0.42s ease-in-out infinite reverse; }
@keyframes legSwing {
  0%, 100% { transform: rotate(24deg); }
  50% { transform: rotate(-24deg); }
}
.walker.is-walking .pose--walk { animation: walkBob 0.42s ease-in-out infinite; }
@keyframes walkBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
.walker .walker-tail { animation: tailWave 2.8s ease-in-out infinite; transform-origin: 80% 90%; }
@keyframes tailWave { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(9deg); } }

.walker.is-grooming .pose--sit .walker-head { animation: groom 5s ease-in-out infinite; transform-origin: 60px 50px; }
@keyframes groom {
  0%, 70%, 100% { transform: rotate(0deg); }
  76%, 88% { transform: rotate(26deg) translateY(6px); }
}
.walker.is-yawning .walker-mouth--yawn { animation: yawn 4s ease-in-out infinite; }
@keyframes yawn {
  0%, 55%, 100% { opacity: 0; transform: scaleY(0.2); }
  65%, 85% { opacity: 1; transform: scaleY(1); }
}
```

- [ ] **Step 4: Verify**

Run: `node --check js/journey.js && node --check js/cats.js`
Expected: pass.

Browser:
- An orange side-view cat stands on the trail near the viewport center; scrolling makes him walk (legs swing, slight bob), and he follows the trail's curves, flipping to face travel direction.
- Stop scrolling: within ~half a second he sits; after ~4.5s he grooms (head dips). At the very top, sitting Nozzle yawns periodically.
- Scroll to the very end: he fades out near the logotype.
- No jitter at curve bends (facing doesn't flicker).

- [ ] **Step 5: Commit**

```bash
git add js/cats.js js/journey.js css/journey.css
git commit -m "feat: scroll-driven walking Nozzle with sit/groom/yawn idle states"
```

---

### Task 4: Hidden spots — art, tease, reveal

**Files:**
- Modify: `js/cats.js` (append `spotBush`, `spotMailbox`, `spotCurtain`, `spotBasket`, `spotTree`)
- Modify: `css/journey.css` (append tease/reveal styles)

**Interfaces:**
- Consumes: `button.hidden-spot[data-spot]` markup from Task 1; `injectArt`'s `[data-spot]` branch from Task 1.
- Produces: SVG structure contract used by CSS and Task 5: each spot SVG contains `.spot__cat` (the hidden cat, revealed by `.found` on the button) and optional `.spot__door`, `.spot__flag`, `.spot__curtain`, `.spot__lid`, `.spot__tease-tail` parts. Task 5 toggles `.found` on the button.

- [ ] **Step 1: Append spot art to `js/cats.js`**

```js
/* ---------- Hidden spots (discovery game) ----------
   Each returns SVG with a .spot__cat group revealed when the
   parent button gets .found. Tease parts animate on hover/focus. */

export function spotBush() {
  return `
  <svg viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg">
    <g class="spot__cat">
      <circle cx="112" cy="76" r="26" fill="#b8b8c0" stroke="#909098" stroke-width="2.5"/>
      <path d="M96 60 L92 42 L106 54 Z" fill="#b8b8c0" stroke="#909098" stroke-width="2.5"/>
      <path d="M126 58 L134 41 L118 52 Z" fill="#b8b8c0" stroke="#909098" stroke-width="2.5"/>
      <ellipse cx="104" cy="74" rx="3.4" ry="5" fill="#3d3528"/>
      <ellipse cx="120" cy="74" rx="3.4" ry="5" fill="#3d3528"/>
      <path d="M112 84 L109 87 L115 87 Z" fill="#e8b4b8" stroke="#909098" stroke-width="1.4"/>
    </g>
    <g class="spot__shake">
      <ellipse cx="70" cy="130" rx="62" ry="46" fill="#7a9e7e" stroke="#5c7e60" stroke-width="3"/>
      <ellipse cx="140" cy="138" rx="66" ry="44" fill="#8aac8a" stroke="#5c7e60" stroke-width="3"/>
      <ellipse cx="108" cy="112" rx="52" ry="40" fill="#96b492" stroke="#5c7e60" stroke-width="3"/>
      <path d="M84 104 q6 -12 2 -20 M118 98 q8 -10 4 -20 M140 116 q10 -8 8 -18" stroke="#5c7e60" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}

export function spotMailbox() {
  return `
  <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
    <rect x="88" y="120" width="12" height="120" fill="#a86a3f" stroke="#8a6a48" stroke-width="2.5"/>
    <g class="spot__flag">
      <rect x="140" y="34" width="8" height="34" rx="3" fill="#c96a5a" stroke="#8a5040" stroke-width="2"/>
      <rect x="132" y="28" width="26" height="14" rx="4" fill="#c96a5a" stroke="#8a5040" stroke-width="2"/>
    </g>
    <path d="M40 70 Q40 40 70 40 L130 40 Q160 40 160 70 L160 120 L40 120 Z" fill="#9bb4c0" stroke="#6a8490" stroke-width="3"/>
    <g class="spot__cat">
      <circle cx="100" cy="86" r="22" fill="#f0e4cc" stroke="#d4c4a8" stroke-width="2.5"/>
      <path d="M86 72 L82 56 L95 66 Z" fill="#f0e4cc" stroke="#d4c4a8" stroke-width="2.5"/>
      <path d="M112 70 L119 55 L104 65 Z" fill="#f0e4cc" stroke="#d4c4a8" stroke-width="2.5"/>
      <ellipse cx="93" cy="84" rx="3" ry="4.5" fill="#3d3528"/>
      <ellipse cx="107" cy="84" rx="3" ry="4.5" fill="#3d3528"/>
      <path d="M100 92 L97 95 L103 95 Z" fill="#e8b4b8"/>
    </g>
    <g class="spot__door" transform-origin="100 120">
      <path d="M46 70 Q46 46 70 46 L130 46 Q154 46 154 70 L154 114 L46 114 Z" fill="#b0c6d0" stroke="#6a8490" stroke-width="3"/>
      <circle cx="100" cy="92" r="5" fill="#6a8490"/>
    </g>
    <path class="spot__tease-tail" d="M120 118 q10 26 -2 44 q-8 12 -18 8" fill="none" stroke="#e8d0a8" stroke-width="9" stroke-linecap="round"/>
  </svg>`;
}

export function spotCurtain() {
  return `
  <svg viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="14" width="212" height="180" rx="8" fill="#f6dfb4" stroke="#a89c8a" stroke-width="5"/>
    <line x1="120" y1="14" x2="120" y2="194" stroke="#a89c8a" stroke-width="3" opacity="0.5"/>
    <g class="spot__cat">
      <ellipse cx="150" cy="172" rx="46" ry="24" fill="#f0e4cc" stroke="#d4c4a8" stroke-width="2.5"/>
      <ellipse cx="150" cy="164" rx="20" ry="14" fill="#e8b07a" stroke="#c98a52" stroke-width="2" opacity="0.8"/>
      <circle cx="178" cy="160" r="17" fill="#f0e4cc" stroke="#d4c4a8" stroke-width="2.5"/>
      <path d="M168 148 L165 134 L176 144 Z" fill="#4a4250" stroke="#322a38" stroke-width="2"/>
      <path d="M188 146 L194 133 L181 142 Z" fill="#f0e4cc" stroke="#d4c4a8" stroke-width="2"/>
      <path d="M170 158 Q175 155 180 158" stroke="#3d3528" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M182 158 Q187 155 192 158" stroke="#3d3528" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
    <rect x="0" y="194" width="240" height="16" rx="6" fill="#d4c4a8" stroke="#a89c8a" stroke-width="2.5"/>
    <g class="spot__curtain" transform-origin="20 20">
      <path d="M20 10 L150 10 L150 160 Q140 178 118 168 Q96 182 76 168 Q52 180 34 166 Q22 172 20 160 Z"
            fill="#e8b4b8" stroke="#c48890" stroke-width="3"/>
      <path d="M55 12 Q60 90 50 160 M95 12 Q100 90 92 164 M130 12 Q134 80 128 160" stroke="#c48890" stroke-width="2" fill="none" opacity="0.5"/>
    </g>
    <rect x="6" y="4" width="228" height="10" rx="5" fill="#a86a3f" stroke="#8a6a48" stroke-width="2"/>
  </svg>`;
}

export function spotBasket() {
  return `
  <svg viewBox="0 0 220 210" xmlns="http://www.w3.org/2000/svg">
    <text class="spot__zzz" x="150" y="52" font-size="20" fill="#a89c8a" opacity="0.7" font-family="serif">z</text>
    <text class="spot__zzz" x="168" y="34" font-size="14" fill="#a89c8a" opacity="0.5" font-family="serif">z</text>
    <g class="spot__cat">
      <circle cx="110" cy="92" r="24" fill="#4a4250" stroke="#322a38" stroke-width="2.5"/>
      <path d="M94 78 L90 60 L104 72 Z" fill="#4a4250" stroke="#322a38" stroke-width="2.5"/>
      <path d="M124 76 L132 59 L116 70 Z" fill="#4a4250" stroke="#322a38" stroke-width="2.5"/>
      <ellipse cx="102" cy="90" rx="3.2" ry="5" fill="#e8c97a"/>
      <ellipse cx="118" cy="90" rx="3.2" ry="5" fill="#e8c97a"/>
      <path d="M110 100 L107 103 L113 103 Z" fill="#e8b4b8"/>
    </g>
    <path d="M40 110 L180 110 L166 190 Q110 202 54 190 Z" fill="#d4a878" stroke="#8a6a48" stroke-width="3"/>
    <path d="M46 130 L174 130 M50 152 L170 152 M54 172 L166 172" stroke="#8a6a48" stroke-width="2" opacity="0.5"/>
    <g class="spot__lid" transform-origin="42 108">
      <ellipse cx="110" cy="106" rx="76" ry="14" fill="#c89a6a" stroke="#8a6a48" stroke-width="3"/>
      <ellipse cx="110" cy="102" rx="18" ry="6" fill="#a86a3f" stroke="#8a6a48" stroke-width="2"/>
    </g>
  </svg>`;
}

export function spotTree() {
  return `
  <svg viewBox="0 0 260 330" xmlns="http://www.w3.org/2000/svg">
    <path d="M118 330 L118 210 Q116 170 100 150 M126 330 L126 200 Q130 168 148 150" fill="none" stroke="#8a6a48" stroke-width="16" stroke-linecap="round"/>
    <g class="spot__cat">
      <circle cx="150" cy="96" r="24" fill="#e8b07a" stroke="#c98a52" stroke-width="2.5"/>
      <path d="M134 82 L130 64 L144 76 Z" fill="#e8b07a" stroke="#c98a52" stroke-width="2.5"/>
      <path d="M164 80 L172 63 L156 74 Z" fill="#e8b07a" stroke="#c98a52" stroke-width="2.5"/>
      <ellipse cx="142" cy="94" rx="3.2" ry="5" fill="#3d3528"/>
      <ellipse cx="158" cy="94" rx="3.2" ry="5" fill="#3d3528"/>
      <ellipse cx="128" cy="116" rx="10" ry="7" fill="#e8b07a" stroke="#c98a52" stroke-width="2.5"/>
      <ellipse cx="172" cy="116" rx="10" ry="7" fill="#e8b07a" stroke="#c98a52" stroke-width="2.5"/>
    </g>
    <g class="spot__shake">
      <ellipse cx="90" cy="120" rx="72" ry="52" fill="#7a9e7e" stroke="#5c7e60" stroke-width="3"/>
      <ellipse cx="180" cy="130" rx="66" ry="48" fill="#8aac8a" stroke="#5c7e60" stroke-width="3"/>
      <ellipse cx="134" cy="88" rx="64" ry="46" fill="#96b492" stroke="#5c7e60" stroke-width="3"/>
    </g>
    <path class="spot__tease-tail" d="M186 158 q14 34 0 60 q-10 20 -26 16" fill="none" stroke="#e8b07a" stroke-width="10" stroke-linecap="round"/>
  </svg>`;
}
```

Note: in `spotBush`/`spotTree` the `.spot__cat` group is drawn **before** the foliage so it hides behind it until translated up/out on `.found`. In `spotMailbox` the cat is inside the box behind the door; in `spotBasket` behind the basket front wall; in `spotCurtain` behind the curtain panel.

- [ ] **Step 2: Append spot interaction CSS to `css/journey.css`**

```css
/* ---------- Hidden spot interactions ---------- */
.hidden-spot .spot__cat { transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s; }

/* resting (hidden) positions */
.hidden-spot--bush   .spot__cat { transform: translateY(58px); opacity: 0; }
.hidden-spot--tree   .spot__cat { transform: translateY(64px); opacity: 0; }
.hidden-spot--mailbox .spot__cat { opacity: 0; }
.hidden-spot--basket .spot__cat { transform: translateY(34px); opacity: 0; }
.hidden-spot--curtain .spot__cat { opacity: 1; } /* covered by curtain */

/* teases */
@keyframes rustle { 0%,100% { transform: rotate(0); } 25% { transform: rotate(1.6deg); } 75% { transform: rotate(-1.6deg); } }
.hidden-spot:hover .spot__shake,
.hidden-spot:focus-visible .spot__shake { animation: rustle 0.35s ease-in-out 2; transform-origin: 50% 90%; }

@keyframes sway { 0%,100% { transform: rotate(0); } 50% { transform: rotate(7deg); } }
.spot__tease-tail { animation: sway 3.4s ease-in-out infinite; transform-origin: 50% 0%; }
.hidden-spot:hover .spot__tease-tail,
.hidden-spot:focus-visible .spot__tease-tail { animation-duration: 1.1s; }

.spot__flag { transform-origin: 144px 64px; }
.hidden-spot:hover .spot__flag,
.hidden-spot:focus-visible .spot__flag { animation: sway 0.8s ease-in-out infinite; }

.spot__curtain { transition: transform 0.5s ease; }
.hidden-spot:hover .spot__curtain,
.hidden-spot:focus-visible .spot__curtain { transform: translateX(-7px); }

.spot__lid { transition: transform 0.4s ease; }
.hidden-spot:hover .spot__lid,
.hidden-spot:focus-visible .spot__lid { transform: rotate(-6deg); }

/* found (reveals) */
.hidden-spot.found .spot__cat { transform: translateY(0); opacity: 1; }
.hidden-spot--bush.found  .spot__cat { transform: translateY(-38px); }
.hidden-spot--tree.found  .spot__cat { transform: translateY(-26px); }
.hidden-spot--basket.found .spot__cat { transform: translateY(-20px); }
.hidden-spot--mailbox.found .spot__door { transform: rotate(-78deg); transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hidden-spot--mailbox.found .spot__tease-tail { opacity: 0; transition: opacity 0.3s; }
.hidden-spot--curtain.found .spot__curtain { transform: translateX(-62%) scaleX(0.4); }
.hidden-spot--basket.found .spot__lid { transform: rotate(-40deg) translateY(-6px); }
.hidden-spot--basket.found .spot__zzz,
.hidden-spot.found .spot__shake { animation: none; }

/* found badge */
.hidden-spot::after {
  content: '✓';
  position: absolute; top: -6px; right: -6px;
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--sage); color: #fff;
  font-weight: 700; font-size: 0.9rem; line-height: 26px;
  transform: scale(0); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hidden-spot.found::after { transform: scale(1); }

/* bubbles on spots */
.hidden-spot .bubble { top: -14px; left: 50%; transform: translate(-50%, 6px) scale(0.9); }
.hidden-spot .bubble.show { transform: translate(-50%, 0) scale(1); }
```

- [ ] **Step 3: Temporary reveal handler for verification**

Discovery lands in Task 5; to make this task independently testable, add to the Task 2 stub `js/discovery.js`:

```js
/* Discovery game — full implementation in Task 5 */
export function initDiscovery() {
  document.querySelectorAll(".hidden-spot").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("found");
      btn.querySelector(".bubble")?.classList.add("show");
      setTimeout(() => btn.querySelector(".bubble")?.classList.remove("show"), 2000);
    });
  });
  return { markFound() {}, found: new Set() };
}
```

- [ ] **Step 4: Verify**

Run: `node --check js/cats.js && node --check js/discovery.js`
Expected: pass.

Browser:
- Porch: mailbox has a cream tail dangling + flag wiggles on hover; clicking flops the door open revealing the cat, tail disappears, ✓ badge pops, bubble "special delivery".
- Porch: bush rustles on hover; click springs the grey cat up over the bush with "mrrp?!".
- Kitchen: curtain sways on hover; click slides it aside revealing the calico.
- Hall: basket lid teases; click tips lid and black cat rises.
- Garden: tail dangles from tree; click makes orange cat peek over the canopy.
- Keyboard: Tab reaches each spot (dashed outline), Enter reveals.

- [ ] **Step 5: Commit**

```bash
git add js/cats.js js/discovery.js css/journey.css
git commit -m "feat: five hidden-cat spots with tease and reveal interactions"
```

---

### Task 5: Discovery game — counter, persistence, celebration

**Files:**
- Modify: `js/discovery.js` (replace stub with full implementation)
- Modify: `js/purr.js` (add `chime()` to the returned API)
- Modify: `css/journey.css` (append HUD + celebration styles)

**Interfaces:**
- Consumes: `.hidden-spot[data-spot]`, `.scene__cat[data-spot-id]`, `.cloud-cat` from Task 1; `pawSmall()` from `cats.js`; `purr.chime` passed by `app.js` (Task 1 boot already wires `initDiscovery({ chime: purr.chime })` and `initCats` → `markFound`).
- Produces: `initDiscovery({ chime }) → { markFound(id), found:Set }`. localStorage: `nozzle.spotted`, `nozzle.celebrated`.

- [ ] **Step 1: Add `chime()` to `js/purr.js`**

Inside `initPurr`, add the function and include it in the return:

```js
  function chime() {
    if (!enabled) return;
    if (!ctx) build();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(880, t);
    o.frequency.setValueAtTime(1318.5, t + 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.connect(g);
    g.connect(masterGain ? ctx.destination : ctx.destination);
    o.start(t);
    o.stop(t + 0.4);
  }
```

Change the return to `return { enable, disable, setIntensity, chime };`

- [ ] **Step 2: Replace `js/discovery.js` with the full game**

```js
/* ============================================================
   Discovery game — "cats spotted"
   Owns found-state, HUD plaque, celebration. No layout work.
   ============================================================ */

import { pawSmall } from "./cats.js";

const KEY = "nozzle.spotted";
const CKEY = "nozzle.celebrated";

export const SPOTS = [
  { id: "scene-box",   label: "the box cat" },
  { id: "scene-keys",  label: "the keyboard cat" },
  { id: "scene-sink",  label: "the sink cat" },
  { id: "scene-shoe",  label: "the shoe cat" },
  { id: "scene-vase",  label: "the vase cat" },
  { id: "scene-shelf", label: "the bookshelf cat" },
  { id: "scene-bag",   label: "the bag cat" },
  { id: "hidden-bush",    label: "a cat in the bush" },
  { id: "hidden-mailbox", label: "a cat in the mailbox" },
  { id: "hidden-curtain", label: "a cat behind the curtain" },
  { id: "hidden-basket",  label: "a cat in the laundry basket" },
  { id: "hidden-tree",    label: "a cat up the tree" },
];

export function initDiscovery({ chime } = {}) {
  const ding = typeof chime === "function" ? chime : () => {};
  const reduced = document.body.classList.contains("reduced-motion");
  let found;
  try {
    found = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    found = new Set();
  }

  /* ---- HUD plaque ---- */
  const hud = document.createElement("div");
  hud.className = "hud-plaque";
  hud.setAttribute("role", "status");
  hud.innerHTML = `<span class="hud-plaque__paw">🐾</span><span class="hud-plaque__text"><b>0</b>/${SPOTS.length} spotted</span>`;
  document.body.appendChild(hud);
  const countEl = hud.querySelector("b");
  const textEl = hud.querySelector(".hud-plaque__text");

  function renderHud(stamp) {
    countEl.textContent = found.size;
    hud.classList.toggle("show", found.size > 0);
    if (found.size === SPOTS.length) {
      textEl.innerHTML = `All ${SPOTS.length} spotted — <a href="featured.html">Nozzle approves</a>`;
    }
    if (stamp && !reduced) {
      hud.classList.remove("stamp");
      void hud.offsetWidth;
      hud.classList.add("stamp");
    }
  }

  /* ---- state sync ---- */
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify([...found])); } catch {}
  }

  function syncSpotDom(id) {
    if (id.startsWith("hidden-")) {
      const btn = document.querySelector(`.hidden-spot[data-spot="${id}"]`);
      if (btn) {
        btn.classList.add("found");
        const spot = SPOTS.find((s) => s.id === id);
        btn.setAttribute("aria-label", `Found: ${spot.label}`);
      }
    } else {
      document
        .querySelector(`[data-spot-id="${id}"]`)
        ?.classList.add("spotted");
    }
  }

  function markFound(id) {
    if (!SPOTS.some((s) => s.id === id) || found.has(id)) return;
    found.add(id);
    save();
    syncSpotDom(id);
    renderHud(true);
    ding();
    if (found.size === SPOTS.length) celebrate();
  }

  /* ---- hidden spot clicks ---- */
  document.querySelectorAll(".hidden-spot").forEach((btn) => {
    btn.addEventListener("click", () => {
      const first = !btn.classList.contains("found");
      markFound(btn.dataset.spot);
      if (first || true) {
        const bubble = btn.querySelector(".bubble");
        bubble?.classList.add("show");
        clearTimeout(btn._bubbleTimer);
        btn._bubbleTimer = setTimeout(() => bubble?.classList.remove("show"), 2200);
      }
    });
  });

  /* ---- celebration ---- */
  function celebrate() {
    document.querySelector(".cloud-cat")?.classList.add("found");
    if (localStorage.getItem(CKEY) === "1") return;
    try { localStorage.setItem(CKEY, "1"); } catch {}

    // bubble chorus: wake every cat briefly, staggered
    const cats = document.querySelectorAll(".scene__cat, .hidden-spot");
    cats.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("awake");
        el.querySelector(".bubble")?.classList.add("show");
      }, i * 130);
      setTimeout(() => {
        el.classList.remove("awake");
        el.querySelector(".bubble")?.classList.remove("show");
      }, 4200 + i * 60);
    });

    // paw confetti
    if (!reduced) {
      const holder = document.createElement("div");
      holder.className = "confetti";
      holder.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 26; i++) {
        const paw = document.createElement("span");
        paw.className = "confetti__paw";
        paw.innerHTML = pawSmall();
        paw.style.left = Math.random() * 100 + "vw";
        paw.style.color = ["#d4956a", "#7a9e7e", "#c4a8d4", "#e8c97a", "#e8b4b8"][i % 5];
        paw.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
        paw.style.animationDelay = Math.random() * 0.8 + "s";
        paw.style.fontSize = 14 + Math.random() * 14 + "px";
        holder.appendChild(paw);
      }
      document.body.appendChild(holder);
      setTimeout(() => holder.remove(), 5200);
    }
    for (let i = 0; i < 3; i++) setTimeout(ding, i * 220);
  }

  /* ---- restore previous session ---- */
  found.forEach(syncSpotDom);
  renderHud(false);
  if (found.size === SPOTS.length) {
    document.querySelector(".cloud-cat")?.classList.add("found");
  }

  return { markFound, found };
}
```

- [ ] **Step 3: Append HUD/celebration CSS to `css/journey.css`**

```css
/* ---------- HUD plaque ---------- */
.hud-plaque {
  position: fixed; left: 1.2rem; bottom: 1.2rem; z-index: 100;
  display: flex; align-items: center; gap: 0.5rem;
  background: linear-gradient(175deg, #d3a874, var(--wood));
  border: 3px solid var(--wood-dark);
  border-radius: 10px;
  box-shadow: 0 4px 0 var(--wood-dark), 0 8px 20px var(--shadow-md);
  padding: 0.5rem 0.9rem;
  font-weight: 700; font-size: 0.9rem; color: #4a3722;
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none;
}
.hud-plaque.show { opacity: 1; transform: none; pointer-events: auto; }
.hud-plaque a { color: #7a4a22; text-decoration: underline; }
.hud-plaque.stamp .hud-plaque__paw { animation: stamp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes stamp { 0% { transform: scale(2.2) rotate(-18deg); } 100% { transform: scale(1) rotate(0); } }

/* ---------- Confetti ---------- */
.confetti { position: fixed; inset: 0; z-index: 200; pointer-events: none; overflow: hidden; }
.confetti__paw {
  position: absolute; top: -40px;
  animation: pawFall linear forwards;
}
.confetti__paw svg { width: 1.6em; height: 1.6em; }
@keyframes pawFall {
  to { transform: translateY(110vh) rotate(320deg); opacity: 0.6; }
}

/* spotted marker on scene cats */
.scene__cat.spotted::after {
  content: '✓';
  position: absolute; top: 0; right: 4%;
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--sage); color: #fff;
  font-weight: 700; font-size: 0.9rem; line-height: 26px; text-align: center;
}
```

- [ ] **Step 4: Verify**

Run: `node --check js/discovery.js && node --check js/purr.js`
Expected: pass.

Browser (start from clean state — DevTools → `localStorage.clear()`):
- Wake the box cat: plaque slides in showing "1/12 spotted" with paw stamp. Each scene cat and hidden spot adds one; re-waking the same cat does not.
- Reload mid-game: count persists; previously found hidden spots render already-revealed with ✓.
- Find all 12: bubble chorus ripples through the page, paw confetti falls, plaque reads "All 12 spotted — Nozzle approves", cloud cat fades into the night sky. Reload: no repeat celebration, cloud cat still present, plaque still complete.
- Purr toggle ON → finding a cat plays a soft two-note chime; toggle OFF → silent.

- [ ] **Step 5: Commit**

```bash
git add js/discovery.js js/purr.js css/journey.css
git commit -m "feat: 12-cat discovery game with HUD, persistence, and celebration"
```

---

### Task 6: Parallax + region activation

**Files:**
- Modify: `js/journey.js` (parallax hook + IntersectionObserver region activation)
- Modify: `css/journey.css` (near-band foreground tufts, region-gated ambient animations)
- Modify: `index.html` (add foreground tuft elements to outdoor regions)

**Interfaces:**
- Consumes: `onFrame` hook from Task 2; `[data-depth]` attributes from Task 1 markup.
- Produces: `.region.active` class contract (CSS gates ambient animations on it).

- [ ] **Step 1: Add foreground tufts to outdoor regions in `index.html`**

Inside `region--porch`, `region--garden`, and `region--night` (before the closing `</section>`):

```html
      <svg class="tuft" data-depth="near" style="left:4%; bottom:10%" viewBox="0 0 80 50" aria-hidden="true"><path d="M10 50 Q14 20 8 10 M24 50 Q28 16 22 4 M40 50 Q42 14 38 2 M56 50 Q60 18 54 8 M70 50 Q74 24 68 14" stroke="#7a9e7e" stroke-width="5" fill="none" stroke-linecap="round"/></svg>
      <svg class="tuft" data-depth="near" style="right:6%; bottom:16%" viewBox="0 0 80 50" aria-hidden="true"><path d="M10 50 Q14 20 8 10 M24 50 Q28 16 22 4 M40 50 Q42 14 38 2 M56 50 Q60 18 54 8" stroke="#5c7e60" stroke-width="5" fill="none" stroke-linecap="round"/></svg>
```

- [ ] **Step 2: Add parallax + IO to `js/journey.js`**

Inside `initJourney`, before the lifecycle block:

```js
  /* ---- parallax ---- */
  const isMobile = matchMedia("(max-width: 760px)").matches;
  if (!reduced) {
    const bands = [...journey.querySelectorAll("[data-depth]")].map((el) => ({
      el,
      coef: el.dataset.depth === "near" ? (isMobile ? 0 : -0.1) : 0.14,
    })).filter((b) => b.coef !== 0);

    onFrame((st, { scrollY }) => {
      const vh = window.innerHeight;
      bands.forEach((b) => {
        const r = b.el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const delta = (r.top + r.height / 2 - vh / 2) / vh;
        b.el.style.transform = `translate3d(0, ${(delta * b.coef * 100).toFixed(1)}px, 0)`;
      });
    });
  }

  /* ---- region activation (pause offscreen ambient animation) ---- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => e.target.classList.toggle("active", e.isIntersecting)),
    { rootMargin: "20% 0px" }
  );
  journey.querySelectorAll(".region").forEach((r) => io.observe(r));
```

- [ ] **Step 3: Gate ambient animations + tuft styles in `css/journey.css`**

```css
/* ---------- Foreground tufts / parallax ---------- */
.tuft { position: absolute; width: clamp(50px, 6vw, 90px); z-index: 5; opacity: 0.9; will-change: transform; }

/* ambient animations only run in active regions */
.region:not(.active) .star,
.region:not(.active) .firefly,
.region:not(.active) .spot__tease-tail { animation-play-state: paused; }
.region:not(.active) .cat-body { animation-play-state: paused; }
```

Also add drifting clouds back (the dawn clouds are `data-depth="far"` so they parallax; give them a slow drift too):

```css
.region.active .cloud { animation: drift 70s linear infinite; }
@keyframes drift { from { margin-left: -6vw; } to { margin-left: 12vw; } }
```

- [ ] **Step 4: Verify**

Run: `node --check js/journey.js`
Expected: pass.

Browser:
- Scrolling the porch/garden: foreground tufts slide slightly faster than the scene; hills/clouds lag slightly behind — visible depth.
- DevTools: elements in far-offscreen regions have `animation-play-state: paused` (inspect a star while at the top of the page).
- Mobile width (375px): near-band tufts don't parallax (static), everything still renders.

- [ ] **Step 5: Commit**

```bash
git add index.html js/journey.js css/journey.css
git commit -m "feat: three-band parallax and offscreen animation pausing"
```

---

### Task 7: Responsive, accessibility, reduced motion, acceptance pass

**Files:**
- Modify: `css/journey.css` (reduced-motion block, mobile refinements)
- Modify: `js/journey.js` / `js/app.js` (only if verification reveals gaps)

**Interfaces:**
- Consumes: `body.reduced-motion` contract set by `app.js` (Task 1).

- [ ] **Step 1: Append the reduced-motion block to `css/journey.css`**

```css
/* ---------- Reduced motion ---------- */
body.reduced-motion .walker { display: none; }
body.reduced-motion .trail .paw { opacity: 0.5; transition: none; }
body.reduced-motion .cloud,
body.reduced-motion .star,
body.reduced-motion .firefly,
body.reduced-motion .spot__tease-tail,
body.reduced-motion .cat-body,
body.reduced-motion .cloud-cat.found { animation: none; }
body.reduced-motion .reveal { opacity: 1; transform: none; transition: none; }
body.reduced-motion .tuft { transform: none !important; }
body.reduced-motion .hidden-spot .spot__cat,
body.reduced-motion .spot__curtain,
body.reduced-motion .spot__door,
body.reduced-motion .spot__lid { transition: none; }
```

(JS already skips the walker and parallax when `body.reduced-motion` is present — from Tasks 3 and 6.)

- [ ] **Step 2: Full acceptance pass against the spec**

Desktop (1280×800) at `http://localhost:4173/`:
1. Continuous world, no hard background seams between regions.
2. Trail connects dawn→night; scenes alternate sides; all seven captions verbatim on signposts.
3. Nozzle walks/flips/sits/grooms/yawns; curled in the "o" at the end (walker fades near night).
4. All 12 cats findable by mouse; HUD correct; reload persists; 12/12 celebration exactly once.
5. Keyboard: Tab reaches all five hidden spots and scene cats' regions; Enter reveals hidden cats (scene cats wake on focus? — verify `focusin` triggers wake; if not, add a `focusin` listener alongside `mouseenter` in `initCats`).
6. Console: zero errors.

Mobile (375×812 via preview resize):
7. Scenes stack (stage above signpost), trail runs down the middle, tap wakes cats and counts them, tap reveals hidden spots, mini-map hidden.

Reduced motion (DevTools: run `document.body.classList.add('reduced-motion')` then reload flow relies on the class being set at boot — instead verify by emulating `prefers-reduced-motion: reduce` in DevTools Rendering panel and reloading):
8. No walker, trail + all paw prints fully drawn/static, no parallax, reveals instant, all 12 still findable.

Subpages:
9. `featured.html`, `spots.html`, `about.html` unchanged and error-free.

Fix anything failing; the likely fix list is small (e.g., add `focusin` wake, z-index collisions).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: reduced-motion support and responsive/a11y refinements"
```

---

### Task 8: Visual polish pass

**Files:**
- Modify: `css/journey.css`, `js/cats.js`, `index.html` (numeric tuning only — positions, sizes, colors, timings)

This task is screenshot-driven iteration; the checklist below is the definition of done:

- [ ] **Step 1: Screenshot every region at 1280w and review against these checkpoints**
  - Cats sit convincingly *in/on* their props (box cat inside box opening, keyboard cat on the keys, sink cat in the basin, shoe cat by the rack, vase cat balanced on the vase mouth, shelf cat in the book gap, bag cat in the tote).
  - Trail passes *between* stage and signpost without clipping either; anchors don't leave the trail hugging a page edge.
  - Signpost posts visually "plant" (post bottom not floating); tilt angles alternate pleasantly.
  - Day gradient: dawn/dusk bands align with their regions (adjust gradient stops to match actual region boundaries measured on the live page).
  - Walker's feet track the trail (adjust the `-78px` y-offset if he floats/sinks).
  - Night region: logotype letters legible, cat properly nested in the "o" ring, CTA signposts don't collide on narrow widths.
- [ ] **Step 2: Same pass at 375w** (cat/signpost stacking, hidden spots not overlapping scenes, HUD not covering CTAs).
- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "polish: cat placement, trail alignment, gradient and night tuning"
```

---

## Self-review notes

- **Spec coverage:** world/regions/gradient (T1), trail/paws/minimap (T2), walker+states+payoff (T3), hidden spots (T4), game/HUD/persistence/celebration/cloud cat/chime (T5), parallax/ambient gating (T6), a11y/mobile/reduced-motion/acceptance (T7), polish (T8). Doormat "mrrp" in `propDoor`. Windows-tinted-by-time via `data-sky` per region. Captions verbatim (T1 markup). Subpage safety: `scene*` functions untouched; `injectArt` only gains new branches.
- **Type consistency:** `initJourney()` returns `{state, onFrame, rebuild}`; walker and parallax both use `onFrame(fn(state, {scrollY, idx}))`. `initDiscovery({chime}) → {markFound, found}` matches app.js boot wiring. `data-spot` ids match `SPOTS` ids; `data-spot-id` scene ids (`scene-box`, `scene-keys`, `scene-sink`, `scene-shoe`, `scene-vase`, `scene-shelf`, `scene-bag`) match `SPOTS`.
- **Known intentional deviation:** trail visual segments are straight-line region splits of the same anchor sequence, so bed/dash may not perfectly overlap the master path at door joints — acceptable visually; polish task checks it.
