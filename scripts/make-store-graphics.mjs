// Genereaza asset-urile pentru fisa Play Store: feature graphic 1024x500 + capturi
import sharp from 'sharp';
import fs from 'fs';

// 1) Feature graphic: banner-ul de sus din pagina magazinului
const svgBanner = `<svg width="1024" height="500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="30%" cy="50%" r="90%">
      <stop offset="0%" stop-color="#141733"/>
      <stop offset="100%" stop-color="#050710"/>
    </radialGradient>
    <linearGradient id="titleCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00e5ff"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="1024" height="500" fill="url(#bg)"/>
  <g opacity="0.5">
    <circle cx="120" cy="80" r="1.5" fill="#00e5ff"/>
    <circle cx="920" cy="60" r="1.5" fill="#ff2d95"/>
    <circle cx="860" cy="420" r="1.5" fill="#00e5ff"/>
    <circle cx="200" cy="380" r="1.5" fill="#ff2d95"/>
    <circle cx="560" cy="450" r="1.5" fill="#00e5ff"/>
    <circle cx="740" cy="140" r="1.5" fill="#ff2d95"/>
    <circle cx="300" cy="60" r="1.5" fill="#00e5ff"/>
    <circle cx="680" cy="360" r="1.5" fill="#ff2d95"/>
    <circle cx="420" cy="100" r="1.5" fill="#00e5ff"/>
  </g>
  <text x="530" y="230" font-family="Impact,Arial Black,sans-serif" font-size="130" font-weight="900" fill="url(#titleCyan)" filter="url(#glow)">GRAVITY</text>
  <text x="530" y="355" font-family="Impact,Arial Black,sans-serif" font-size="130" font-weight="900" fill="#ff2d95" filter="url(#glow)">FLIP</text>
  <text x="530" y="410" font-family="Courier New,monospace" font-size="22" fill="#00e5ff" letter-spacing="8">TAP &#183; FLIP &#183; SURVIVE</text>
</svg>`;

const iconBuf = await sharp('assets/icon.png').resize(420, 420).toBuffer();
await sharp(Buffer.from(svgBanner))
  .composite([{ input: iconBuf, gravity: 'northwest', top: 40, left: 55 }])
  .png()
  .toFile('store-assets/feature-1024x500.png');
const st = fs.statSync('store-assets/feature-1024x500.png');
console.log('feature-1024x500.png:', Math.round(st.size / 1024) + ' KB');
