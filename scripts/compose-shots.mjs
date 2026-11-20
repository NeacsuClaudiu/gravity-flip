// Capturi finale pentru Google Play: 1920x1080, titlu mare sus + captura in rama neon.
import sharp from 'sharp';
import fs from 'fs';
const RAW = 'store-assets/promo/raw', OUT = 'store-assets/promo/final';
fs.mkdirSync(OUT, { recursive: true });
const SHOTS = [
  ['flip',       'TAP TO',       'FLIP GRAVITY',      '#00e5ff'],
  ['tunnel',     'DODGE LASERS,', 'SPIKES & WALLS',   '#ff2d95'],
  ['gold',       'GRAB THE',     'GOLD RUSH',         '#ffc531'],
  ['claw-grab',  'PLAY THE',     'BALL CLAW',         '#b44dff'],
  ['claw-reveal','UNLOCK',       'LEGENDARY SKINS',   '#ffd700'],
  ['menu',       '15 SKINS',     '+ DAILY MISSIONS',  '#00ff9d'],
  ['levels',     '30 LEVELS',    '+ DAILY CHALLENGE', '#ff8c00'],
];
const W = 1920, H = 1080, SW = 1500, SH = 844, SX = (W - SW) / 2, SY = 200;
const esc = s => s.replace(/&/g, '&amp;');
const font = 'font-family="Arial Black, Segoe UI Black, sans-serif" font-weight="900"';
for (const [i, [name, a, b, col]] of SHOTS.entries()) {
  // Arial Black majuscule ~0.78 x font-size pe caracter; incape in 1720px
  const fs = Math.min(92, Math.floor(1720 / ((a.length + b.length + 1) * 0.78)));
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="g" cx="50%" cy="0%" r="90%">
        <stop offset="0" stop-color="${col}" stop-opacity="0.35"/>
        <stop offset="0.55" stop-color="#140a3a"/><stop offset="1" stop-color="#05060f"/>
      </radialGradient>
      <filter id="glow" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect x="${SX - 6}" y="${SY - 6}" width="${SW + 12}" height="${SH + 12}" rx="26" fill="none" stroke="${col}" stroke-width="10" filter="url(#glow)" opacity="0.9"/>
    <rect x="${SX - 5}" y="${SY - 5}" width="${SW + 10}" height="${SH + 10}" rx="24" fill="#05060f" stroke="${col}" stroke-width="5"/>
    <text x="${W / 2}" y="132" text-anchor="middle" ${font} font-size="${fs}" letter-spacing="2">
      <tspan fill="#ffffff">${esc(a)}</tspan><tspan dx="${Math.round(fs * 0.37)}" fill="${col}">${esc(b)}</tspan>
    </text>
  </svg>`;
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}"><rect width="${SW}" height="${SH}" rx="20" fill="#fff"/></svg>`);
  const shot = await sharp(`${RAW}/${name}.png`).resize(SW, SH)
    .composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  const file = `${OUT}/${String(i + 1).padStart(2, '0')}-${name}.png`;
  await sharp(Buffer.from(bg)).composite([{ input: shot, left: SX, top: SY }]).png().toFile(file);
  console.log(file);
}
