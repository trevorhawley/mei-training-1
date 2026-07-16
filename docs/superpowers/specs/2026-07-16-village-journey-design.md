# Nozzle Homepage Redesign — "One Lazy Day" Village Journey

**Date:** 2026-07-16
**Status:** Approved by Trevor (structure: one long world; art: hand-drawn Ghibli; full design incl. walker + discovery game)
**Scope:** `index.html` only. Subpages, nav, footer, purr toggle, and custom cursor are unchanged.

## Goal

Replace the current stacked-section scroll journey with a single continuous illustrated
world that feels like walking a 2D SNES overworld path — while keeping the existing
hand-drawn Ghibli art style, palette, fonts, and copy. Scrolling the homepage = one full
day spent following Nozzle the cat as he searches for a nap spot.

The current page reads as "page-builder sections" because every scene repeats the same
composition (full-bleed backdrop, centered cat, floating caption card) with a hard color
jump between sections. This redesign removes the section feel by connecting everything
with one path, one flowing color story, and one protagonist.

## Non-goals

- No pixel art. SNES feel comes from structure (path, idle animations, discoveries,
  counter HUD), not sprites.
- No scroll hijacking. Native vertical scroll only.
- No frameworks or libraries. Vanilla JS modules + generated SVG, matching the codebase.
- No changes to subpages, nav, footer, purr toggle, or cursor.
- No new sound assets (one optional WebAudio-synthesized chime is allowed).

## 1. World structure

The `<main class="journey">` becomes one continuous world, ~9–11 viewport-heights tall,
divided into **regions** laid out top to bottom:

| # | Region | Time of day | Contents |
|---|--------|-------------|----------|
| 1 | `region--dawn` | Dawn | Hero: title in the sky, hills/village rooftops, Nozzle yawning at the trailhead, scroll hint |
| 2 | `region--porch` | Morning | Scene 01 The Box (front porch/yard) + hidden: gate bush, mailbox |
| 3 | `region--study` | Late morning | *(through the front door)* Scene 02 The Keyboard |
| 4 | `region--kitchen` | Noon | Scene 03 The Sink + hidden: window curtain |
| 5 | `region--hall` | Early afternoon | Scene 04 The Shoe + hidden: laundry basket |
| 6 | `region--living` | Afternoon | Scene 05 The Vase and Scene 06 The Shelf |
| 7 | `region--garden` | Golden hour | *(out the back door)* Scene 07 The Bag + hidden: tree |
| 8 | `region--night` | Night | Closing: fireflies, big NOZZLE logotype with Nozzle curled in the "o", CTA signposts |

Notes:

- **Scene order change:** Shelf moves before Bag so all indoor scenes are contiguous
  (Box → Keyboard → Sink → Shoe → Vase → Shelf → Bag). All seven captions are reused
  **verbatim** from the current `index.html`.
- **Day gradient:** one CSS `linear-gradient` on `.journey` runs the full height —
  dawn peach → cream noon → amber golden hour → lilac dusk → deep night blue. No
  per-section background jumps.
- **Indoors:** study/kitchen/hall/living regions render a wall band (SVG) over the
  gradient with window openings; each window is tinted to match the sky gradient at its
  vertical position, so time visibly passes even inside.
- **Door transitions:** the path leads to the front doorstep at the porch→study boundary
  (doormat reads "mrrp") and out a back door at living→garden.
- **Scene composition:** scenes sit on alternating sides of the path at the outer bend of
  each curve (never centered), with the caption signpost on the opposite side. Region
  heights vary (~70–100vh) so the rhythm isn't metronomic.

The current hero section and closing section are absorbed into `region--dawn` and
`region--night`. The existing scene backdrop functions in `cats.js` (`sceneBox`, etc.)
are reworked into **prop clusters** — same geometry, but no full-bleed opaque background
rect, so the world gradient shows through.

## 2. The trail (path system)

- One SVG path S-curving the full height of the journey, visually a dirt path outdoors
  and floorboards/rug runner indoors (stroke styling switches per region).
- **Runtime-generated:** JS measures anchor elements (`[data-trail-anchor]`, one per
  scene/region stop) after fonts load, and builds a smooth cubic Bézier path through
  them. Rebuilt on debounced resize. This keeps the path correct across responsive
  layouts instead of hardcoding coordinates.
- **Paw prints:** small paw SVGs stamp along the traversed portion of the path behind
  Nozzle, spaced ~40px, alternating left/right of the path centerline, fading in.
  Capped (~30 visible); older prints fade out.
- **Mini-map (replaces journey-dots):** fixed at the right edge, a tiny squiggle version
  of the trail with a paw marker at current progress and clickable tick marks per region
  (reuses `scrollIntoView` behavior). Hidden below 700px viewport width, like the
  current dots.

## 3. Nozzle the walker

- A new side-view walking cat SVG (~70–90px) pinned to the trail, positioned via
  `path.getPointAtLength(progress × totalLength)` where `progress` = how far the
  viewport center has traveled through the journey (clamped 0–1), updated in a single
  `requestAnimationFrame` scroll loop.
- **Direction:** horizontal flip based on path direction (dx sign) with hysteresis so he
  doesn't jitter at curve apexes.
- **States:** `walking` (leg-cycle animation) while scroll velocity is above a threshold;
  after ~400ms of no scrolling → `sitting`; after ~4s idle → occasional groom/tail-flick
  loop. All CSS keyframes toggled by class.
- **Story beats:** at the trailhead he yawns (dawn). At the end of the trail the walker
  fades out and the payoff renders: a large NOZZLE logotype with Nozzle curled asleep
  inside the "o", plus closing copy ("Every spot was taken. So Nozzle picked the
  weirdest one of all.") and CTA signposts to `featured.html` and `spots.html`.

## 4. Discovery game — "cats spotted"

**12 findable cats** = 7 scene cats (waking one for the first time counts) + 5 hidden:

| id | Spot | Tease (ambient) | Reveal (on click/tap) |
|----|------|------------------|----------------------|
| `hidden-bush` | Bush by the garden gate (porch) | Rustles on hover/focus | Grey cat springs up, "mrrp?!" bubble |
| `hidden-mailbox` | Mailbox on the front path (porch) | Tail sticking out, flag wiggles | Door flops open, cream cat inside |
| `hidden-curtain` | Kitchen window curtain | Curtain shifts on hover | Calico revealed on the sill |
| `hidden-basket` | Laundry basket (hall) | Lid slightly lifted, Zzz leaking | Lid tips, black cat inside |
| `hidden-tree` | Garden tree (golden hour) | Tail dangling from a branch | Orange cat peeks over the branch |

Mechanics:

- Hidden spots are real `<button>` elements with descriptive `aria-label`s
  (e.g., "A suspicious bush"), keyboard-focusable; the tease animation also plays on
  focus. Once found, the cat stays visible (asleep in its spot) with a small ✓ paw badge.
- **HUD:** a small wooden plaque, fixed bottom-left, appears after the first find:
  "🐾 4/12 spotted", with a paw-stamp micro-animation on each new find. If purr audio is
  enabled, a soft synthesized chime plays on find.
- **Persistence:** found ids stored in `localStorage` (`nozzle.spotted`); returning
  visitors keep their finds (revealed cats render found on load).
- **Completion (12/12):** every cat on the page wakes for ~4s with a staggered bubble
  chorus, paw-print confetti falls (~30 transform/opacity-animated paws, then removed),
  the plaque switches to "All 12 spotted — Nozzle approves" linking to `featured.html`,
  and a secret **13th cat fades in, asleep on a cloud** in the night sky. Celebration
  fires once (flag persisted).

## 5. Parallax & ambient motion

Three depth bands, all `transform`-only:

- **Far (slow):** clouds, distant hills/rooftops, moon and fireflies at night.
- **Mid (1:1):** the world itself — scenes, path, signposts.
- **Near (slightly fast):** foreground grass tufts, fence posts, houseplant leaves
  overlapping the page edges — this is what sells "walking through, not past."

Existing ambient touches stay: cat breathing, blink-on-wake, floating Zzz, drifting
clouds. Parallax amplitude is reduced on small screens; the near band is disabled on
mobile.

## 6. Architecture

| File | Change |
|------|--------|
| `index.html` | Rebuilt journey markup: regions, scenes with `data-trail-anchor`, hidden-spot buttons, HUD/mini-map mount points. Captions verbatim. |
| `css/journey.css` | Rewritten: world gradient, regions, trail, walker states, signposts, HUD, mini-map, celebration, reduced-motion rules. |
| `css/style.css` | Untouched except possibly new tokens (night palette colors). |
| `js/journey.js` | **New.** Trail generation from anchors, scroll→progress mapping, walker driver, paw prints, parallax, mini-map. One scroll listener + one rAF loop. |
| `js/discovery.js` | **New.** Spots registry, found-state + localStorage, HUD plaque, celebration, cloud cat. |
| `js/cats.js` | Extended: `walkingCat()`, `signpost()`, world props (bush, mailbox, curtain window, basket, tree, gate, doors, hills, logotype-with-cat, cloud cat, fireflies); scene functions reworked to transparent prop clusters. |
| `js/app.js` | Boot new modules on home; generalize cat wake handling so scene + hidden cats both report to discovery. |
| Other pages / `purr.js` / `cursor.js` | Untouched. |

Data flow: `journey.js` owns scroll/layout; `discovery.js` owns game state; they don't
import each other — `app.js` wires cat-wake events to `discovery.markFound(id)`.

## 7. Accessibility, mobile, performance

- **Mobile:** hover interactions become tap; signposts stack below cats on narrow
  screens; path amplitude narrows; walker remains (it's cheap).
- **Keyboard:** every findable cat reachable and revealable via focus + Enter.
- **`prefers-reduced-motion`:** walker hidden, trail fully pre-drawn with paw prints,
  no parallax/clouds/confetti; reveals become instant opacity changes; all 12 cats
  still findable. Scroll-linked reveals still occur but without translate animation.
- **Performance:** transforms/opacity only; single passive scroll listener feeding one
  rAF loop; IntersectionObserver toggles an `.active` class per region so offscreen CSS
  animations pause; paw print count capped; trail rebuilt only on debounced resize and
  after `document.fonts.ready` (anchor positions depend on final layout).

## 8. Acceptance criteria

1. Homepage renders as one continuous world: no visible hard background seams between
   regions at any scroll position (1280px and 375px widths).
2. A winding trail connects dawn → night; scenes alternate sides; all seven original
   captions appear verbatim on signposts.
3. Nozzle walks the trail as you scroll, flips on curves, sits when you stop, and
   appears curled in the "o" of NOZZLE at the end.
4. All 12 cats findable by mouse, touch, and keyboard; HUD counts correctly; state
   survives reload; 12/12 triggers the celebration + cloud cat exactly once.
5. `prefers-reduced-motion` yields a static-but-complete world with the game intact.
6. No console errors; scrolling stays smooth (no layout thrash — verified via DevTools
   performance pass); subpages and shared chrome (nav/footer/purr/cursor) unchanged.

## Risks / notes

- Runtime trail generation depends on anchor layout: must regenerate after web-font
  load and on resize, or the walker drifts off the drawn path.
- Very short viewports (landscape phones) need a minimum-height clamp per region so
  scenes don't overlap the trail.
- The `o`-of-NOZZLE payoff needs the logotype rendered as SVG text/paths (not the nav
  wordmark) so the cat can nest precisely.
