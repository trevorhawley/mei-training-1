/* ============================================================
   Custom Cursor — a little paw/hand that scratches
   ============================================================ */

const CURSOR_SVG = `
<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="cursor-glyph">
    <ellipse cx="22" cy="27" rx="11" ry="9" fill="#fffdf8" stroke="#3d3528" stroke-width="2"/>
    <ellipse cx="13" cy="19" rx="3" ry="5" fill="#fffdf8" stroke="#3d3528" stroke-width="2"/>
    <ellipse cx="19" cy="16" rx="3" ry="6" fill="#fffdf8" stroke="#3d3528" stroke-width="2"/>
    <ellipse cx="25" cy="16" rx="3" ry="6" fill="#fffdf8" stroke="#3d3528" stroke-width="2"/>
    <ellipse cx="31" cy="19" rx="3" ry="5" fill="#fffdf8" stroke="#3d3528" stroke-width="2"/>
    <ellipse cx="32" cy="28" rx="3.5" ry="4.5" fill="#fffdf8" stroke="#3d3528" stroke-width="2" transform="rotate(35 32 28)"/>
    <ellipse cx="22" cy="28" rx="5" ry="4" fill="#f0c4b8"/>
  </g>
</svg>`;

const SCRATCH_SVG = `
<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="cursor-glyph" style="transform-origin: 22px 27px;">
    <ellipse cx="22" cy="27" rx="11" ry="9" fill="#fffdf8" stroke="#3d3528" stroke-width="2"/>
    <path d="M13 19 q-2 6 1 9" stroke="#3d3528" stroke-width="2" fill="#fffdf8" stroke-linecap="round"/>
    <path d="M19 16 q-2 8 1 11" stroke="#3d3528" stroke-width="2" fill="#fffdf8" stroke-linecap="round"/>
    <path d="M25 16 q2 8 -1 11" stroke="#3d3528" stroke-width="2" fill="#fffdf8" stroke-linecap="round"/>
    <path d="M31 19 q2 6 -1 9" stroke="#3d3528" stroke-width="2" fill="#fffdf8" stroke-linecap="round"/>
    <ellipse cx="32" cy="28" rx="3.5" ry="4.5" fill="#fffdf8" stroke="#3d3528" stroke-width="2" transform="rotate(35 32 28)"/>
    <ellipse cx="22" cy="28" rx="5" ry="4" fill="#e8b4b8"/>
  </g>
</svg>`;

export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const el = document.createElement('div');
  el.className = 'cursor cursor--hidden';
  el.innerHTML = CURSOR_SVG;
  document.body.appendChild(el);
  document.body.classList.add('custom-cursor');

  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y;
  let visible = false;

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    if (!visible) { visible = true; el.classList.remove('cursor--hidden'); }
  });

  window.addEventListener('mouseleave', () => { el.classList.add('cursor--hidden'); visible = false; });
  window.addEventListener('mouseenter', () => { el.classList.remove('cursor--hidden'); visible = true; });

  // Scratch mode on interactive cat hover
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.scene__cat, .hero__cat, .cat-pet')) {
      el.innerHTML = SCRATCH_SVG;
      el.classList.add('cursor--scratch');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.scene__cat, .hero__cat, .cat-pet')) {
      el.innerHTML = CURSOR_SVG;
      el.classList.remove('cursor--scratch');
    }
  });

  // Click = quick scratch tilt
  window.addEventListener('mousedown', () => {
    const g = el.querySelector('.cursor-glyph');
    if (g) { g.style.transition = 'transform 0.1s'; g.style.transform = 'rotate(-12deg)'; }
  });
  window.addEventListener('mouseup', () => {
    const g = el.querySelector('.cursor-glyph');
    if (g) { g.style.transform = ''; }
  });

  function render() {
    x += (tx - x) * 0.25;
    y += (ty - y) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  render();
}
