/* ============================================================
   App bootstrap — shared across all pages
   ============================================================ */

import { initCursor } from "./cursor.js";
import { initPurr } from "./purr.js";
import * as cats from "./cats.js";
const { pawLogo, purrIcon } = cats;

/* ---- Inject cats & scenes from data attributes ---- */
function injectArt() {
  document.querySelectorAll("[data-cat]").forEach((el) => {
    const variant = el.dataset.cat || "orange";
    const opts = {
      flip: el.dataset.flip === "1" || el.dataset.catFlip === "1",
    };
    const fn = el.dataset.pose === "sit" ? cats.sittingCat : cats.sleepingCat;
    el.innerHTML =
      fn(variant, opts) +
      (el.dataset.bubble
        ? `<span class="bubble">${el.dataset.bubble}</span>`
        : "");
  });
  document.querySelectorAll("[data-scene]").forEach((el) => {
    const name = el.dataset.scene;
    const fn = cats["scene" + name.charAt(0).toUpperCase() + name.slice(1)];
    if (fn) el.innerHTML = fn();
  });
}

/* ---- Inject nav, footer, purr toggle ---- */
function injectChrome() {
  const page = document.body.dataset.page || "";

  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <a class="nav__brand" href="index.html">
      ${pawLogo()}
      <span>Nozzle</span>
    </a>
    <button class="nav__toggle" aria-label="Menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3d3528" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
    <div class="nav__links">
      <a href="index.html" class="${page === "home" ? "active" : ""}">Journey</a>
      <a href="featured.html" class="${page === "featured" ? "active" : ""}">Cat of the Week</a>
      <a href="spots.html" class="${page === "spots" ? "active" : ""}">Favorite Spots</a>
      <a href="research.html" class="${page === "research" ? "active" : ""}">Research</a>
      <a href="tips.html" class="${page === "tips" ? "active" : ""}">Happy Cat Tips</a>
      <a href="equipment.html" class="${page === "equipment" ? "active" : ""}">Equipment</a>
      <a href="about.html" class="${page === "about" ? "active" : ""}">About</a>
    </div>
  `;
  document.body.prepend(nav);

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <div class="nav__brand" style="color:var(--cream)">
            ${pawLogo()}
            <span>Nozzle</span>
          </div>
          <p style="margin-top:1rem; opacity:0.7; max-width:30ch">
            A quiet little project celebrating cats who sleep in places they probably shouldn't.
          </p>
        </div>
        <div>
          <h3 style="font-size:1rem; margin-bottom:0.8rem">Explore</h3>
          <div style="display:flex; flex-direction:column; gap:0.4rem">
            <a href="index.html">Journey</a>
            <a href="featured.html">Cat of the Week</a>
            <a href="spots.html">Favorite Spots</a>
            <a href="research.html">Research</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1rem; margin-bottom:0.8rem">More</h3>
          <div style="display:flex; flex-direction:column; gap:0.4rem">
            <a href="tips.html">Happy Cat Tips</a>
            <a href="equipment.html">Equipment</a>
            <a href="about.html">About</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1rem; margin-bottom:0.8rem">The Fine Print</h3>
          <p style="opacity:0.6; font-size:0.85rem">
            No cats were disturbed in the making of this site. Probably.
          </p>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} Nozzle. Made by people who live with cats.</span>
        <span>Hover the cats. Scroll for purrs.</span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  const purrBtn = document.createElement("button");
  purrBtn.className = "purr-toggle";
  purrBtn.setAttribute("aria-label", "Toggle purr sound");
  purrBtn.innerHTML = `${purrIcon()}<span class="ripple"></span>`;
  document.body.appendChild(purrBtn);
}

/* ---- Nav scroll state + mobile toggle ---- */
function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );

  toggle?.addEventListener("click", () => links.classList.toggle("open"));
  links
    ?.querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open")),
    );
}

/* ---- Reveal on scroll ---- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---- Cat wake on hover ---- */
function initCats() {
  document
    .querySelectorAll(".scene__cat, .hero__cat, .cat-pet")
    .forEach((cat) => {
      const bubble = cat.querySelector(".bubble");
      cat.addEventListener("mouseenter", () => {
        cat.classList.add("awake");
        bubble?.classList.add("show");
      });
      cat.addEventListener("mouseleave", () => {
        cat.classList.remove("awake");
        bubble?.classList.remove("show");
      });
      // spawn Zzz while sleeping
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

/* ---- Journey dots + parallax (home only) ---- */
function initJourney() {
  const journey = document.querySelector(".journey");
  if (!journey) return;

  const scenes = Array.from(journey.querySelectorAll(".scene"));
  const dots = document.querySelector(".journey-dots");

  // Build dots
  scenes.forEach((s, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Scene ${i + 1}`);
    b.addEventListener("click", () => s.scrollIntoView({ behavior: "smooth" }));
    dots?.appendChild(b);
  });

  // Parallax layers
  function onScroll() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const showDots = scrollY > vh * 0.5;
    dots?.classList.toggle("show", showDots);

    scenes.forEach((scene, i) => {
      const rect = scene.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = (center - vh / 2) / vh;
      const layers = scene.querySelectorAll("[data-speed]");
      layers.forEach((l) => {
        const speed = parseFloat(l.dataset.speed);
        l.style.transform = `translateY(${dist * speed * 100}px)`;
      });
      // active dot
      if (rect.top < vh * 0.5 && rect.bottom > vh * 0.5) {
        dots
          ?.querySelectorAll("button")
          .forEach((b, j) => b.classList.toggle("active", j === i));
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---- Boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  injectArt();
  injectChrome();
  initNav();
  initReveal();
  initCats();
  initJourney();
  initCursor();
  initPurr();
});
