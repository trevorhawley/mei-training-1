/* ============================================================
   Journey engine — trail, paw prints, walker, mini-map, parallax
   Owns all scroll-linked layout on the home page.
   ============================================================ */

import { walkingCat } from "./cats.js";

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
      if (slice.length < 2) continue;
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
    const scaled = pts.map((p) => ({
      x: 4 + (p.x / w) * (MW - 8),
      y: 4 + (p.y / h) * (MH - 8),
    }));
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

  /* ---- extension point used by walker / parallax ---- */
  const hooks = [];
  function onFrame(fn) { hooks.push(fn); }

  /* ---- walker (Nozzle) ---- */
  const walker = journey.querySelector(".walker");
  if (walker && !reduced) {
    walker.innerHTML = walkingCat();
    let lastMove = performance.now();
    let facing = 1;
    let px = 0, py = 0;

    onFrame((st, { idx }) => {
      const s = st.samples;
      if (!s.length) return;
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
      walker.classList.toggle("is-yawning", idle >= 450 && state.progress < 0.03);
    }, 150);
  } else if (walker) {
    walker.remove(); // reduced motion: no walker
  }

  /* ---- parallax ---- */
  const isMobile = matchMedia("(max-width: 760px)").matches;
  if (!reduced) {
    const bands = [...journey.querySelectorAll("[data-depth]")]
      .map((el) => ({
        el,
        coef: el.dataset.depth === "near" ? (isMobile ? 0 : -0.1) : 0.14,
      }))
      .filter((b) => b.coef !== 0);

    onFrame(() => {
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

  /* ---- per-frame scroll work ---- */
  let dirty = true;
  let lastScrollY = window.scrollY;

  function sampleAtY(targetY) {
    const s = state.samples;
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
        const mi = Math.max(
          0,
          Math.min(
            state.minimap.scaled.length - 1,
            Math.floor(state.progress * (state.minimap.scaled.length - 1))
          )
        );
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
