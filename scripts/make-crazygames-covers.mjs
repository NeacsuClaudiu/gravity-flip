// Coperti CrazyGames: 1920x1080 (16:9), 800x1200 (2:3), 800x800 (1:1), acelasi stil.
// Fundal = captura reala din joc (intunecata), peste ea iconita jocului (+ titlu la landscape).
import sharp from 'sharp';
import fs from 'fs';
const OUT = 'store-assets/crazygames';
fs.mkdirSync(OUT, { recursive: true });

// iconita fara colturile negre din PNG-ul original (masca cu colturi rotunjite)
const ICON = 'assets/icon.png', IS = 1254, INSET = 52, RAD = 210;
const iconMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${IS}" height="${IS}">
  <rect x="${INSET}" y="${INSET}" width="${IS - 2 * INSET}" height="${IS - 2 * INSET}" rx="${RAD}" fill="#fff"/></svg>`);
const iconMasked = await sharp(ICON).ensureAlpha().composite([{ input: iconMask, blend: 'dest-in' }]).png().toBuffer();
const iconClean = await sharp(iconMasked).extract({ left: INSET - 10, top: INSET - 10, width: IS - 2 * INSET + 20, height: IS - 2 * INSET + 20 }).png().toBuffer();
const icon = (size) => sharp(iconClean).resize(size, size).png().toBuffer();

async function background(w, h, shot) {
  const shade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><radialGradient id="g" cx="50%" cy="45%" r="75%">
      <stop offset="0" stop-color="#140a3a" stop-opacity="0.35"/><stop offset="1" stop-color="#05060f" stop-opacity="0.9"/>
    </radialGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`);
  const base = await sharp(`store-assets/promo/raw/${shot}.png`).resize(w, h, { fit: 'cover' }).blur(3)
    .modulate({ brightness: 0.75 }).png().toBuffer();
  return sharp(base).composite([{ input: shade }]).png().toBuffer();
}
const title = (w, h, x, y, size, anchor) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><filter id="gl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter></defs>
  <g font-family="Arial Black, Segoe UI Black, sans-serif" font-weight="900" font-size="${size}" text-anchor="${anchor}">
    <text x="${x}" y="${y}" fill="#00e5ff" filter="url(#gl)" opacity="0.8">GRAVITY</text>
    <text x="${x}" y="${y}" fill="#ffffff">GRAVITY</text>
    <text x="${x}" y="${y + size * 1.02}" fill="#ff2d95" filter="url(#gl)" opacity="0.9">BREACH</text>
    <text x="${x}" y="${y + size * 1.02}" fill="#ff4fd2">BREACH</text>
  </g></svg>`);

// 16:9 - iconita stanga, titlu dreapta
{
  const bg = await background(1920, 1080, 'flip');
  await sharp(bg).composite([
    { input: await icon(720), left: 170, top: 180 },
    { input: title(1920, 1080, 1010, 500, 170, 'start') },
  ]).png().toFile(`${OUT}/cover-landscape-1920x1080.png`);
}
// 2:3 - iconita mare sus, titlu jos
{
  const bg = await background(800, 1200, 'gold');
  await sharp(bg).composite([
    { input: await icon(600), left: 100, top: 150 },
    { input: title(800, 1200, 400, 920, 112, 'middle') },
  ]).png().toFile(`${OUT}/cover-portrait-800x1200.png`);
}
// 1:1 - iconita (are deja titlul pe ea)
{
  const bg = await background(800, 800, 'tunnel');
  await sharp(bg).composite([{ input: await icon(640), left: 80, top: 80 }])
    .png().toFile(`${OUT}/cover-square-800x800.png`);
}
console.log('coperti in', OUT);
