// Pune jocul in momente alese si face capturi brute 1920x1080 (960x540 @2x).
// node scripts/shots-raw.cjs [scena...]
const path = require('path');
const puppeteer = require('D:/Claude workshop/bancuri-romanesti/node_modules/puppeteer-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const GAME = 'file:///' + path.resolve('store-assets/promo/game-test.html').split(path.sep).join('/');
const OUT = 'store-assets/promo/raw';
require('fs').mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    defaultViewport: { width: 960, height: 540, deviceScaleFactor: 2 } });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('PAGEERR', e.message));
  await page.goto(GAME);
  await new Promise(r => setTimeout(r, 800));
  const ev = (code) => page.evaluate((c) => window.__ev(c), code);
  await page.evaluate(() => { window.__manual = true; window.__god = true; });
  // progres "plin": multi bani, toate skinurile, nivele deblocate
  await ev(`save.wallet = 12450; save.unlocked = CHARS.map(c=>c.id); best = 4820; save.best = 4820;
            save.lvl.max = 18; for (let i=1;i<18;i++) save.lvl.stars[i] = 1 + (i*7)%3; save.sound = true; 0`);
  const step = (n, dt = 1/60) => ev(`for (let i=0;i<${n};i++){ tNow; update(${dt}); } render(); 0`);
  const shot = (name) => page.screenshot({ path: `${OUT}/${name}.png` });
  global.ctx = { page, ev, step, shot };
  const scenes = require('./shots-scenes.cjs');
  const want = process.argv.slice(2);
  for (const [name, fn] of Object.entries(scenes)) {
    if (want.length && !want.includes(name)) continue;
    await fn(global.ctx);
    console.log('ok', name);
  }
  await browser.close();
})();
