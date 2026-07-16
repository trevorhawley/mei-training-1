/* ============================================================
   Purr Engine — Web Audio synthesized purr on scroll
   ============================================================ */

export function initPurr() {
  let ctx = null;
  let enabled = false;
  let masterGain = null;
  let rumble = null;
  let modGain = null;
  let modOsc = null;
  let currentIntensity = 0;
  let targetIntensity = 0;

  const toggle = document.querySelector('.purr-toggle');

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);

    rumble = ctx.createOscillator();
    rumble.type = 'sawtooth';
    rumble.frequency.value = 38;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value = 2;

    modGain = ctx.createGain();
    modGain.gain.value = 0;

    modOsc = ctx.createOscillator();
    modOsc.type = 'sine';
    modOsc.frequency.value = 26;

    const modDepth = ctx.createGain();
    modDepth.gain.value = 0.5;

    modOsc.connect(modDepth);
    modDepth.connect(modGain.gain);

    rumble.connect(filter);
    filter.connect(modGain);
    modGain.connect(masterGain);

    rumble.start();
    modOsc.start();
  }

  function enable() {
    if (!ctx) build();
    if (ctx.state === 'suspended') ctx.resume();
    enabled = true;
    targetIntensity = 0.35;
    if (toggle) toggle.classList.add('on');
  }

  function disable() {
    enabled = false;
    targetIntensity = 0;
    if (toggle) toggle.classList.remove('on');
  }

  function setIntensity(v) {
    if (!enabled) return;
    targetIntensity = Math.min(1, 0.25 + v * 0.6);
  }

  function tick() {
    if (ctx && masterGain) {
      currentIntensity += (targetIntensity - currentIntensity) * 0.08;
      masterGain.gain.setTargetAtTime(currentIntensity, ctx.currentTime, 0.05);
      if (modOsc) {
        modOsc.frequency.setTargetAtTime(24 + currentIntensity * 8, ctx.currentTime, 0.1);
      }
    }
    requestAnimationFrame(tick);
  }
  tick();

  let lastScroll = window.scrollY;
  let lastTime = performance.now();
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (!enabled) return;
    const now = performance.now();
    const dy = Math.abs(window.scrollY - lastScroll);
    const dt = now - lastTime;
    const velocity = dt > 0 ? dy / dt : 0;
    lastScroll = window.scrollY;
    lastTime = now;

    setIntensity(Math.min(1, velocity / 2));

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { targetIntensity = 0.25; }, 250);
  }, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      if (enabled) disable(); else enable();
    });
  }

  return { enable, disable, setIntensity };
}
