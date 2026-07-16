/* ============================================================
   Cat & Scene SVG Library — flat Ghibli-inspired illustrations
   All cats share a common structure so the wake/blink CSS works.
   ============================================================ */

/* A sleeping cat curled in a generic pose.
   variant: 'orange' | 'grey' | 'cream' | 'black' | 'calico'
   Returns SVG string. The cat is "asleep" — eyes closed by default.
   Hover adds .awake which opens eyes via CSS.
*/
export function sleepingCat(variant = 'orange', opts = {}) {
  const palettes = {
    orange:  { body: '#e8b07a', dark: '#c98a52', stripe: '#b87a4f', belly: '#f5d8b8', nose: '#e8b4b8' },
    grey:    { body: '#b8b8c0', dark: '#909098', stripe: '#7a7a82', belly: '#dcdce0', nose: '#e8b4b8' },
    cream:   { body: '#f0e4cc', dark: '#d4c4a8', stripe: '#c4b498', belly: '#faf0d8', nose: '#e8b4b8' },
    black:   { body: '#4a4250', dark: '#322a38', stripe: '#2a2228', belly: '#6a6070', nose: '#e8b4b8' },
    calico:  { body: '#f0e4cc', dark: '#e8b07a', stripe: '#4a4250', belly: '#faf0d8', nose: '#e8b4b8' },
  };
  const p = palettes[variant] || palettes.orange;
  const flip = opts.flip ? 'transform="scale(-1,1) translate(-300,0)"' : '';

  return `
  <svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" class="cat-svg">
    <g ${flip}>
      <g class="cat-body">
        <!-- tail curled around -->
        <path d="M70 150 Q40 145 35 120 Q33 100 50 95 Q60 95 62 105 Q55 110 55 120 Q60 135 80 138 Z"
              fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <!-- body curled -->
        <ellipse cx="160" cy="155" rx="95" ry="55" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <!-- belly -->
        <ellipse cx="170" cy="170" rx="60" ry="35" fill="${p.belly}" opacity="0.7"/>
        <!-- stripes -->
        <path d="M120 110 Q125 125 120 145" stroke="${p.stripe}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M150 105 Q155 125 150 150" stroke="${p.stripe}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M180 108 Q185 128 180 152" stroke="${p.stripe}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
        <!-- head resting on paws -->
        <circle cx="225" cy="135" r="48" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <!-- ears -->
        <path d="M195 105 L188 78 L210 95 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M255 105 L262 78 L240 95 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <path d="M198 100 L195 88 L207 96 Z" fill="${p.nose}" opacity="0.6"/>
        <path d="M252 100 L255 88 L243 96 Z" fill="${p.nose}" opacity="0.6"/>
        <!-- cheeks fluff -->
        <path d="M180 145 Q175 160 185 165" stroke="${p.dark}" stroke-width="2" fill="none"/>
        <path d="M270 145 Q275 160 265 165" stroke="${p.dark}" stroke-width="2" fill="none"/>
        <!-- closed eyes (sleeping) — these are the "lids" -->
        <g class="cat-eye-lid">
          <path d="M205 130 Q213 126 221 130" stroke="${p.dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M229 130 Q237 126 245 130" stroke="${p.dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </g>
        <!-- open eyes (hidden until awake) -->
        <g class="cat-eye">
          <ellipse cx="213" cy="128" rx="4" ry="6" fill="#3d3528"/>
          <ellipse cx="237" cy="128" rx="4" ry="6" fill="#3d3528"/>
          <circle cx="214" cy="126" r="1.2" fill="#fff"/>
          <circle cx="238" cy="126" r="1.2" fill="#fff"/>
        </g>
        <!-- nose -->
        <path d="M225 142 L221 146 L229 146 Z" fill="${p.nose}" stroke="${p.dark}" stroke-width="1.5"/>
        <!-- mouth -->
        <path d="M225 148 Q220 152 217 150" stroke="${p.dark}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M225 148 Q230 152 233 150" stroke="${p.dark}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- whiskers -->
        <g class="cat-whisker" stroke="${p.dark}" stroke-width="1.5" stroke-linecap="round">
          <line x1="180" y1="142" x2="160" y2="140"/>
          <line x1="180" y1="148" x2="158" y2="150"/>
          <line x1="270" y1="142" x2="290" y2="140"/>
          <line x1="270" y1="148" x2="292" y2="150"/>
        </g>
        <!-- front paws tucked -->
        <ellipse cx="210" cy="195" rx="14" ry="10" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <ellipse cx="240" cy="195" rx="14" ry="10" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
        <circle cx="206" cy="193" r="2" fill="${p.nose}" opacity="0.5"/>
        <circle cx="214" cy="193" r="2" fill="${p.nose}" opacity="0.5"/>
        <circle cx="236" cy="193" r="2" fill="${p.nose}" opacity="0.5"/>
        <circle cx="244" cy="193" r="2" fill="${p.nose}" opacity="0.5"/>
      </g>
    </g>
  </svg>`;
}

/* A simple sitting cat (for hero / about) */
export function sittingCat(variant = 'orange') {
  const palettes = {
    orange: { body: '#e8b07a', dark: '#c98a52', belly: '#f5d8b8', nose: '#e8b4b8' },
    grey:   { body: '#b8b8c0', dark: '#909098', belly: '#dcdce0', nose: '#e8b4b8' },
    cream:  { body: '#f0e4cc', dark: '#d4c4a8', belly: '#faf0d8', nose: '#e8b4b8' },
    black:  { body: '#4a4250', dark: '#322a38', belly: '#6a6070', nose: '#e8b4b8' },
  };
  const p = palettes[variant] || palettes.orange;
  return `
  <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" class="cat-svg">
    <g class="cat-body">
      <!-- tail -->
      <path d="M150 180 Q175 175 178 150 Q180 130 168 128" stroke="${p.dark}" stroke-width="2.5" fill="${p.body}"/>
      <!-- body -->
      <ellipse cx="100" cy="170" rx="55" ry="60" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <ellipse cx="100" cy="185" rx="32" ry="40" fill="${p.belly}" opacity="0.7"/>
      <!-- head -->
      <circle cx="100" cy="95" r="45" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <!-- ears -->
      <path d="M68 65 L60 35 L82 58 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <path d="M132 65 L140 35 L118 58 Z" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <path d="M71 60 L67 45 L78 56 Z" fill="${p.nose}" opacity="0.6"/>
      <path d="M129 60 L133 45 L122 56 Z" fill="${p.nose}" opacity="0.6"/>
      <!-- closed eyes -->
      <g class="cat-eye-lid">
        <path d="M82 92 Q90 88 98 92" stroke="${p.dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M102 92 Q110 88 118 92" stroke="${p.dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>
      <g class="cat-eye">
        <ellipse cx="90" cy="90" rx="4" ry="6" fill="#3d3528"/>
        <ellipse cx="110" cy="90" rx="4" ry="6" fill="#3d3528"/>
        <circle cx="91" cy="88" r="1.2" fill="#fff"/>
        <circle cx="111" cy="88" r="1.2" fill="#fff"/>
      </g>
      <path d="M100 105 L95 110 L105 110 Z" fill="${p.nose}" stroke="${p.dark}" stroke-width="1.5"/>
      <path d="M100 112 Q95 116 92 114" stroke="${p.dark}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M100 112 Q105 116 108 114" stroke="${p.dark}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <g class="cat-whisker" stroke="${p.dark}" stroke-width="1.5" stroke-linecap="round">
        <line x1="60" y1="105" x2="40" y2="103"/>
        <line x1="60" y1="112" x2="38" y2="115"/>
        <line x1="140" y1="105" x2="160" y2="103"/>
        <line x1="140" y1="112" x2="162" y2="115"/>
      </g>
      <!-- front legs -->
      <rect x="78" y="210" width="16" height="22" rx="8" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <rect x="106" y="210" width="16" height="22" rx="8" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
    </g>
  </svg>`;
}

/* ---------- Scene backdrops ---------- */

export function sceneBox() {
  return `
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <!-- wall -->
    <rect width="1200" height="800" fill="#f6ead8"/>
    <!-- window -->
    <rect x="80" y="80" width="240" height="280" rx="8" fill="#cfe4ea" stroke="#a89c8a" stroke-width="4"/>
    <line x1="200" y1="80" x2="200" y2="360" stroke="#a89c8a" stroke-width="3"/>
    <line x1="80" y1="220" x2="320" y2="220" stroke="#a89c8a" stroke-width="3"/>
    <circle cx="270" cy="140" r="30" fill="#e8c97a" opacity="0.7"/>
    <!-- floor -->
    <rect y="560" width="1200" height="240" fill="#e8d4b8"/>
    <line x1="0" y1="560" x2="1200" y2="560" stroke="#a89c8a" stroke-width="2"/>
    <!-- the box -->
    <g transform="translate(700 380)">
      <path d="M0 0 L200 0 L240 60 L-40 60 Z" fill="#d4a878" stroke="#8a6a48" stroke-width="3"/>
      <path d="M0 0 L-40 60 L-40 200 L0 140 Z" fill="#b88a5a" stroke="#8a6a48" stroke-width="3"/>
      <path d="M200 0 L240 60 L240 200 L200 140 Z" fill="#c89a6a" stroke="#8a6a48" stroke-width="3"/>
      <path d="M0 0 L0 140 L200 140 L200 0 Z" fill="#e8c8a0" stroke="#8a6a48" stroke-width="3"/>
      <path d="M0 0 L100 -20 L200 0" fill="none" stroke="#8a6a48" stroke-width="3"/>
      <text x="100" y="80" font-family="serif" font-size="22" fill="#8a6a48" text-anchor="middle" opacity="0.5">FRAGILE</text>
    </g>
    <!-- plant -->
    <g transform="translate(950 460)">
      <rect x="-20" y="0" width="40" height="60" rx="4" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <path d="M0 0 Q-30 -40 -20 -80 Q0 -60 0 -90" stroke="#5c7e60" stroke-width="3" fill="#7a9e7e"/>
      <path d="M0 0 Q30 -40 20 -80 Q0 -60 0 -90" stroke="#5c7e60" stroke-width="3" fill="#7a9e7e"/>
      <ellipse cx="-15" cy="-70" rx="12" ry="6" fill="#7a9e7e" transform="rotate(-30 -15 -70)"/>
      <ellipse cx="15" cy="-70" rx="12" ry="6" fill="#7a9e7e" transform="rotate(30 15 -70)"/>
    </g>
  </svg>`;
}

export function sceneKeyboard() {
  return `
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#eaf0f2"/>
    <!-- desk -->
    <rect y="500" width="1200" height="300" fill="#d4c4a8"/>
    <line x1="0" y1="500" x2="1200" y2="500" stroke="#a89c8a" stroke-width="2"/>
    <!-- monitor -->
    <rect x="420" y="180" width="360" height="220" rx="10" fill="#3d3528" stroke="#2a2228" stroke-width="3"/>
    <rect x="440" y="200" width="320" height="180" rx="4" fill="#9bc4d0" opacity="0.5"/>
    <rect x="540" y="400" width="120" height="20" fill="#3d3528"/>
    <rect x="500" y="420" width="200" height="10" rx="4" fill="#3d3528"/>
    <!-- keyboard -->
    <g transform="translate(380 540)">
      <rect width="440" height="120" rx="8" fill="#f0e4cc" stroke="#a89c8a" stroke-width="2"/>
      ${Array.from({length: 13}, (_, i) => `<rect x="${10 + i*33}" y="15" width="28" height="28" rx="4" fill="#fffdf8" stroke="#a89c8a" stroke-width="1.5"/>`).join('')}
      ${Array.from({length: 12}, (_, i) => `<rect x="${26 + i*33}" y="50" width="28" height="28" rx="4" fill="#fffdf8" stroke="#a89c8a" stroke-width="1.5"/>`).join('')}
      <rect x="60" y="85" width="320" height="22" rx="4" fill="#fffdf8" stroke="#a89c8a" stroke-width="1.5"/>
    </g>
    <!-- mug -->
    <g transform="translate(900 540)">
      <rect x="0" y="0" width="50" height="60" rx="4" fill="#fffdf8" stroke="#a89c8a" stroke-width="2"/>
      <path d="M50 10 Q70 10 70 30 Q70 50 50 50" fill="none" stroke="#a89c8a" stroke-width="2"/>
      <ellipse cx="25" cy="5" rx="22" ry="6" fill="#6b6051"/>
      <path d="M15 0 Q25 -8 35 0" stroke="#a89c8a" stroke-width="1.5" fill="none" opacity="0.5"/>
    </g>
  </svg>`;
}

export function sceneSink() {
  return `
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#e8eef0"/>
    <!-- counter -->
    <rect y="450" width="1200" height="350" fill="#f0e4cc"/>
    <line x1="0" y1="450" x2="1200" y2="450" stroke="#a89c8a" stroke-width="2"/>
    <!-- backsplash tiles -->
    <g opacity="0.4">
      ${Array.from({length: 12}, (_, i) => `<rect x="${i*100}" y="200" width="98" height="98" fill="#cfe4ea" stroke="#a89c8a" stroke-width="1"/>`).join('')}
      ${Array.from({length: 12}, (_, i) => `<rect x="${i*100}" y="300" width="98" height="98" fill="#cfe4ea" stroke="#a89c8a" stroke-width="1"/>`).join('')}
    </g>
    <!-- sink basin -->
    <ellipse cx="600" cy="500" rx="220" ry="40" fill="#c8d8de" stroke="#8a9aa0" stroke-width="3"/>
    <ellipse cx="600" cy="490" rx="200" ry="30" fill="#b8c8ce"/>
    <!-- faucet -->
    <path d="M590 380 L590 320 Q590 300 610 300 L640 300" stroke="#a89c8a" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="640" cy="300" r="10" fill="#a89c8a"/>
    <!-- soap bottle -->
    <g transform="translate(900 380)">
      <rect x="0" y="20" width="40" height="70" rx="6" fill="#7a9e7e" stroke="#5c7e60" stroke-width="2"/>
      <rect x="12" y="0" width="16" height="22" rx="3" fill="#5c7e60"/>
    </g>
  </svg>`;
}

export function sceneShoe() {
  return `
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#f0e8e6"/>
    <!-- floor -->
    <rect y="520" width="1200" height="280" fill="#d4c4a8"/>
    <line x1="0" y1="520" x2="1200" y2="520" stroke="#a89c8a" stroke-width="2"/>
    <!-- shoe rack -->
    <g transform="translate(300 320)">
      <rect x="0" y="0" width="600" height="20" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="0" y="80" width="600" height="20" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="0" y="160" width="600" height="20" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="0" y="0" width="20" height="180" fill="#a86a3f" stroke="#8a6a48" stroke-width="2"/>
      <rect x="580" y="0" width="20" height="180" fill="#a86a3f" stroke="#8a6a48" stroke-width="2"/>
      <!-- shoes -->
      <g transform="translate(40 30)">
        <path d="M0 50 Q0 30 30 25 L80 25 Q100 25 110 50 L110 55 L0 55 Z" fill="#d4956a" stroke="#8a6a48" stroke-width="2"/>
      </g>
      <g transform="translate(180 30)">
        <path d="M0 50 Q0 30 30 25 L80 25 Q100 25 110 50 L110 55 L0 55 Z" fill="#7a9e7e" stroke="#5c7e60" stroke-width="2"/>
      </g>
      <g transform="translate(320 30)">
        <path d="M0 50 Q0 30 30 25 L80 25 Q100 25 110 50 L110 55 L0 55 Z" fill="#c4a8d4" stroke="#909098" stroke-width="2"/>
      </g>
    </g>
  </svg>`;
}

export function sceneVase() {
  return `
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#ece6f0"/>
    <!-- shelf -->
    <rect y="540" width="1200" height="14" fill="#d4c4a8" stroke="#a89c8a" stroke-width="2"/>
    <rect y="554" width="1200" height="246" fill="#e8dcc4"/>
    <!-- vase -->
    <g transform="translate(540 360)">
      <path d="M0 180 Q-20 160 -10 100 Q-30 60 0 0 L120 0 Q150 60 130 100 Q140 160 120 180 Z"
            fill="#c4a8d4" stroke="#909098" stroke-width="3"/>
      <ellipse cx="60" cy="0" rx="60" ry="12" fill="#a888c4" stroke="#909098" stroke-width="2"/>
      <path d="M20 60 Q60 50 100 60" stroke="#909098" stroke-width="2" fill="none" opacity="0.4"/>
    </g>
    <!-- dried flowers -->
    <g transform="translate(600 360)" stroke="#5c7e60" stroke-width="2" fill="none">
      <path d="M0 0 Q-10 -60 -30 -100"/>
      <path d="M0 0 Q10 -60 30 -100"/>
      <path d="M0 0 Q0 -70 0 -120"/>
      <circle cx="-30" cy="-100" r="8" fill="#e8c97a" stroke="#b8a058"/>
      <circle cx="30" cy="-100" r="8" fill="#e8b4b8" stroke="#b8888c"/>
      <circle cx="0" cy="-120" r="8" fill="#d4956a" stroke="#a8754a"/>
    </g>
  </svg>`;
}

export function sceneBag() {
  return `
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#f0eee6"/>
    <!-- floor -->
    <rect y="560" width="1200" height="240" fill="#d4c4a8"/>
    <line x1="0" y1="560" x2="1200" y2="560" stroke="#a89c8a" stroke-width="2"/>
    <!-- coat hook -->
    <rect x="200" y="120" width="6" height="80" fill="#8a6a48"/>
    <rect x="180" y="200" width="46" height="8" rx="4" fill="#8a6a48"/>
    <!-- tote bag -->
    <g transform="translate(450 280)">
      <path d="M0 0 L0 280 L240 280 L240 0 Z" fill="#e8dcc4" stroke="#a89c8a" stroke-width="3"/>
      <path d="M40 0 Q40 -60 80 -60 Q120 -60 120 0" fill="none" stroke="#a89c8a" stroke-width="4"/>
      <path d="M120 0 Q120 -60 160 -60 Q200 -60 200 0" fill="none" stroke="#a89c8a" stroke-width="4"/>
      <text x="120" y="150" font-family="serif" font-size="28" fill="#a89c8a" text-anchor="middle" opacity="0.5">market</text>
    </g>
    <!-- keys hanging -->
    <g transform="translate(220 200)">
      <circle cx="0" cy="20" r="14" fill="none" stroke="#a89c8a" stroke-width="3"/>
      <rect x="-3" y="30" width="6" height="30" fill="#a89c8a"/>
      <rect x="-15" y="55" width="14" height="20" rx="3" fill="#a89c8a"/>
      <rect x="5" y="55" width="14" height="20" rx="3" fill="#a89c8a"/>
    </g>
  </svg>`;
}

export function sceneShelf() {
  return `
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#e8eee6"/>
    <!-- bookshelf -->
    <g stroke="#8a6a48" stroke-width="3" fill="#d4a878">
      <rect x="100" y="120" width="1000" height="20"/>
      <rect x="100" y="280" width="1000" height="20"/>
      <rect x="100" y="440" width="1000" height="20"/>
      <rect x="100" y="600" width="1000" height="20"/>
      <rect x="100" y="120" width="20" height="500"/>
      <rect x="1080" y="120" width="20" height="500"/>
    </g>
    <!-- books row 1 -->
    ${Array.from({length: 14}, (_, i) => {
      const colors = ['#d4956a','#7a9e7e','#c4a8d4','#9bc4d0','#e8c97a','#e8b4b8'];
      const h = 100 + (i % 4) * 20;
      return `<rect x="${120 + i*68}" y="${140 - (h-100)}" width="60" height="${h}" fill="${colors[i%colors.length]}" stroke="#8a6a48" stroke-width="2"/>`;
    }).join('')}
    <!-- books row 2 (with gap for cat) -->
    ${Array.from({length: 6}, (_, i) => {
      const colors = ['#d4956a','#7a9e7e','#c4a8d4','#9bc4d0','#e8c97a','#e8b4b8'];
      const h = 100 + (i % 3) * 20;
      return `<rect x="${120 + i*68}" y="${300 - (h-100)}" width="60" height="${h}" fill="${colors[i%colors.length]}" stroke="#8a6a48" stroke-width="2"/>`;
    }).join('')}
    ${Array.from({length: 6}, (_, i) => {
      const colors = ['#9bc4d0','#e8c97a','#e8b4b8','#d4956a','#7a9e7e','#c4a8d4'];
      const h = 100 + (i % 3) * 20;
      return `<rect x="${620 + i*68}" y="${300 - (h-100)}" width="60" height="${h}" fill="${colors[i%colors.length]}" stroke="#8a6a48" stroke-width="2"/>`;
    }).join('')}
    <!-- books row 3 -->
    ${Array.from({length: 14}, (_, i) => {
      const colors = ['#c4a8d4','#9bc4d0','#e8c97a','#e8b4b8','#d4956a','#7a9e7e'];
      const h = 100 + (i % 4) * 20;
      return `<rect x="${120 + i*68}" y="${460 - (h-100)}" width="60" height="${h}" fill="${colors[i%colors.length]}" stroke="#8a6a48" stroke-width="2"/>`;
    }).join('')}
  </svg>`;
}

/* Paw print logo */
export function pawLogo() {
  return `
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="26" rx="10" ry="8" fill="#d4956a"/>
    <ellipse cx="11" cy="16" rx="3.5" ry="4.5" fill="#d4956a"/>
    <ellipse cx="20" cy="12" rx="3.5" ry="5" fill="#d4956a"/>
    <ellipse cx="29" cy="16" rx="3.5" ry="4.5" fill="#d4956a"/>
  </svg>`;
}

/* Small paw for dividers */
export function pawSmall() {
  return `
  <svg viewBox="0 0 30 30" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="15" cy="20" rx="7" ry="5" fill="currentColor"/>
    <ellipse cx="8" cy="12" rx="2.5" ry="3" fill="currentColor"/>
    <ellipse cx="15" cy="9" rx="2.5" ry="3.5" fill="currentColor"/>
    <ellipse cx="22" cy="12" rx="2.5" ry="3" fill="currentColor"/>
  </svg>`;
}

/* Purr toggle icon */
export function purrIcon() {
  return `
  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d3528" stroke-width="2" stroke-linecap="round">
    <path d="M5 15 Q8 10 12 15 Q16 20 20 15 Q24 10 28 15" />
  </svg>`;
}
