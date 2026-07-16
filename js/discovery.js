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

  function renderHud(stamp) {
    const textEl = hud.querySelector(".hud-plaque__text");
    if (found.size === SPOTS.length) {
      textEl.innerHTML = `All ${SPOTS.length} spotted — <a href="featured.html">Nozzle approves</a>`;
    } else {
      textEl.innerHTML = `<b>${found.size}</b>/${SPOTS.length} spotted`;
    }
    hud.classList.toggle("show", found.size > 0);
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
      btn.classList.add("found");
      markFound(btn.dataset.spot);
      const bubble = btn.querySelector(".bubble");
      bubble?.classList.add("show");
      clearTimeout(btn._bubbleTimer);
      btn._bubbleTimer = setTimeout(() => bubble?.classList.remove("show"), 2200);
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
