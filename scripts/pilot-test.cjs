// test: cate ciocniri face pilotul in 60s de joc la viteza mare
const path = require('path'), fs = require('fs');
const puppeteer = require('D:/Claude workshop/bancuri-romanesti/node_modules/puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new',
    defaultViewport: { width: 960, height: 540, deviceScaleFactor: 1 } });
  const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file:///' + path.resolve('store-assets/promo/game-test.html').split(path.sep).join('/'));
  await new Promise(r => setTimeout(r, 600));
  await p.evaluate(() => { window.__manual = true; window.__god = true; });
  const ev = c => p.evaluate(x => window.__ev(x), c);
  await ev(fs.readFileSync('scripts/autopilot.js', 'utf8'));
  await ev(`state = S.PLAY; reset('endless'); speed = 600; 0`);
  for (let k = 0; k < 12; k++) {
    const cr = await ev(`__pilot(300, {style: 0.02})`);
    console.log('t=' + (k + 1) * 5 + 's crashes=' + cr + ' speed=' + Math.round(await ev('speed')) + ' obst=' + await ev('obstacles.length'));
  }
  await b.close();
})();
