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

/* ============================================================
   World props (home journey v2)
   Transparent-background prop clusters. The old scene*()
   full-bleed backdrops remain for featured/spots pages.
   ============================================================ */

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
  <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
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
    ? `<ellipse cx="110" cy="244" rx="66" ry="14" fill="#b87a4f" stroke="#8a6a48" stroke-width="2"/>
       <text x="110" y="249" font-family="inherit" font-size="14" fill="#f5e8d8" text-anchor="middle">mrrp</text>`
    : '';
  return `
  <svg viewBox="0 0 220 264" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="10" width="160" height="220" rx="8" fill="#f0e4cc" stroke="#a89c8a" stroke-width="3"/>
    <path d="M52 230 L52 88 Q52 30 110 30 Q168 30 168 88 L168 230 Z" fill="#b87a4f" stroke="#8a6a48" stroke-width="3"/>
    <path d="M68 110 L68 92 Q68 48 110 48 Q152 48 152 92 L152 110 Z" fill="#c89a6a" stroke="#8a6a48" stroke-width="2"/>
    <rect x="68" y="126" width="84" height="80" rx="6" fill="#c89a6a" stroke="#8a6a48" stroke-width="2"/>
    <circle cx="146" cy="146" r="6" fill="#e8c97a" stroke="#8a6a48" stroke-width="2"/>
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
     nests in the first o. Uses the display font via CSS class. */
  return `
  <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" class="logotype__svg" role="img" aria-label="Nozzle">
    <g class="logotype__letters" fill="#f5e8d8">
      <text x="60"  y="140" text-anchor="middle">N</text>
      <text x="255" y="140" text-anchor="middle">z</text>
      <text x="340" y="140" text-anchor="middle">z</text>
      <text x="420" y="140" text-anchor="middle">l</text>
      <text x="500" y="140" text-anchor="middle">e</text>
    </g>
    <g transform="translate(160 100)">
      <circle cx="0" cy="0" r="52" fill="none" stroke="#f5e8d8" stroke-width="14"/>
      <g class="logotype__cat" transform="translate(-36 -28) scale(0.24)">
        <path d="M70 150 Q40 145 35 120 Q33 100 50 95 Q60 95 62 105 Q55 110 55 120 Q60 135 80 138 Z" fill="#e8b07a" stroke="#c98a52" stroke-width="6"/>
        <ellipse cx="160" cy="155" rx="95" ry="55" fill="#e8b07a" stroke="#c98a52" stroke-width="6"/>
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

/* Side-view Nozzle for the trail. Two pose groups toggled by CSS. */
export function walkingCat() {
  const p = { body: '#e8b07a', dark: '#c98a52', belly: '#f5d8b8', nose: '#e8b4b8' };
  return `
  <svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg" class="walker__sprite">
    <g class="pose pose--walk">
      <path class="walker-tail" d="M18 52 Q2 44 6 26 Q8 16 16 18" fill="none" stroke="${p.dark}" stroke-width="7" stroke-linecap="round"/>
      <g class="walker-leg walker-leg--b"><rect x="34" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
      <g class="walker-leg walker-leg--a"><rect x="46" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
      <ellipse cx="55" cy="55" rx="32" ry="17" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/>
      <ellipse cx="55" cy="62" rx="22" ry="9" fill="${p.belly}" opacity="0.7"/>
      <g class="walker-leg walker-leg--a"><rect x="62" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
      <g class="walker-leg walker-leg--b"><rect x="74" y="60" width="8" height="26" rx="4" fill="${p.body}" stroke="${p.dark}" stroke-width="2.5"/></g>
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

/* ============================================================
   Hidden spots (discovery game)
   Each returns SVG with a .spot__cat group revealed when the
   parent button gets .found. Tease parts animate on hover/focus.
   Cats are drawn BEFORE cover art so they hide behind it.
   ============================================================ */

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
    <g class="spot__door">
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
    <g class="spot__curtain">
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
    <g class="spot__lid">
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
