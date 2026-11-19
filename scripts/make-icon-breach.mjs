// Inlocuieste textul "GRAVITY FLIP" din iconita originala cu "GRAVITY BREACH".
// Sursa: assets/icon-flip-original.png -> assets/icon.png
import sharp from 'sharp';
const SRC = 'assets/icon-flip-original.png', OUT = process.argv[2] || 'assets/icon.png';
const S = 1254;
// 1) petic de fundal (mov inchis) cu margini estompate, peste textul vechi
const patch = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="rgb(46,9,136)"/><stop offset="1" stop-color="rgb(28,9,110)"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="20"/></filter>
  </defs>
  <rect x="175" y="785" width="905" height="385" rx="110" fill="url(#bg)" filter="url(#soft)"/>
  <rect x="195" y="808" width="865" height="345" rx="70" fill="url(#bg)"/>
</svg>`;
// 2) textul nou, in stilul celui vechi: alb (GRAVITY) + gradient roz->violet->cyan (BREACH), contur bleumarin, umbra
const font = `font-family="Arial Black, Segoe UI Black, Impact, sans-serif" font-weight="900"`;
const word = (txt, y, size, fill, len) => `
  <text x="627" y="${y + 10}" text-anchor="middle" ${font} font-size="${size}" textLength="${len}" lengthAdjust="spacingAndGlyphs" fill="#14093f" stroke="#14093f" stroke-width="34" stroke-linejoin="round" opacity="0.9">${txt}</text>
  <text x="627" y="${y}" text-anchor="middle" ${font} font-size="${size}" textLength="${len}" lengthAdjust="spacingAndGlyphs" fill="#1b0d55" stroke="#1b0d55" stroke-width="26" stroke-linejoin="round">${txt}</text>
  <text x="627" y="${y}" text-anchor="middle" ${font} font-size="${size}" textLength="${len}" lengthAdjust="spacingAndGlyphs" fill="${fill}" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2">${txt}</text>`;
const text = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <defs>
    <linearGradient id="white" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#e6e9ff"/><stop offset="1" stop-color="#b9c4ff"/>
    </linearGradient>
    <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ff4fd2"/><stop offset="0.5" stop-color="#b44dff"/><stop offset="1" stop-color="#3fd6ff"/>
    </linearGradient>
  </defs>
  ${word('GRAVITY', 978, 172, 'url(#white)', 770)}
  ${word('BREACH', 1112, 150, 'url(#neon)', 690)}
</svg>`;
await sharp(SRC)
  .composite([{ input: Buffer.from(patch) }, { input: Buffer.from(text) }])
  .png().toFile(OUT);
console.log('scris', OUT);
