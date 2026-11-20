// Video promo Gravity Breach (1920x1080, 30fps, ~23s) din jocul real.
// node scripts/make-video.cjs  -> store-assets/promo/gravity-breach-promo.mp4
const path = require('path'), fs = require('fs'), { execFileSync } = require('child_process');
const puppeteer = require('D:/Claude workshop/bancuri-romanesti/node_modules/puppeteer-core');
const FFMPEG = 'D:/Claude workshop/tools/ffmpeg/node_modules/ffmpeg-static/ffmpeg.exe';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FR = 'store-assets/promo/frames', OUT = 'store-assets/promo/gravity-breach-promo.mp4';
const FPS = 30;
// CG=1: varianta pentru CrazyGames - fara titluri, fara ecran final, fara tranzitii negre,
// incepe cu coperta, 16:9 + 2:3, fara sunet, sub 20s
const CGV = process.env.CG === '1';
fs.rmSync(FR, { recursive: true, force: true }); fs.mkdirSync(FR, { recursive: true });
const ICON = 'data:image/png;base64,' + fs.readFileSync('store-assets/icon-512.png').toString('base64');

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    defaultViewport: { width: 960, height: 540, deviceScaleFactor: 2 } });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('PAGEERR', e.message));
  await page.goto('file:///' + path.resolve('store-assets/promo/game-test.html').split(path.sep).join('/'));
  await new Promise(r => setTimeout(r, 800));
  await page.evaluate(() => { window.__manual = true; window.__god = true; });
  const ev = c => page.evaluate(x => window.__ev(x), c);
  await ev(fs.readFileSync('scripts/autopilot.js', 'utf8'));
  await ev(`save.wallet = 12450; save.unlocked = CHARS.map(c=>c.id); best = 4820; save.best = 4820;
            save.lvl.max = 18; save.skin = 'cub'; 0`);

  // stratul de text peste joc (titluri + ecranul final)
  await page.evaluate((icon) => {
    const css = document.createElement('style');
    css.textContent = `
      #cap{position:fixed;left:0;right:0;top:64px;text-align:center;pointer-events:none;z-index:9;
        font:900 44px "Arial Black","Segoe UI Black",sans-serif;letter-spacing:1px;color:#fff;
        text-shadow:0 0 18px rgba(0,0,0,.9),0 3px 0 #000;opacity:0}
      #cap b{font-weight:900}
      #fade{position:fixed;inset:0;background:#000;opacity:0;z-index:10;pointer-events:none}
      #end{position:fixed;inset:0;z-index:11;display:none;align-items:center;justify-content:center;gap:44px;
        background:radial-gradient(circle at 50% 30%,#3a1680 0%,#140a3a 45%,#05060f 100%)}
      #end img{width:250px;height:250px;border-radius:44px;box-shadow:0 0 50px #b44dffaa}
      #end .t{font:900 64px "Arial Black",sans-serif;color:#fff;line-height:1;text-shadow:0 0 22px #00e5ff}
      #end .t span{color:#ff4fd2;text-shadow:0 0 22px #ff4fd2}
      #end .s{margin-top:22px;font:900 26px "Arial Black",sans-serif;color:#00e5ff;letter-spacing:3px}
      #end .p{display:inline-block;margin-top:26px;padding:14px 30px;border-radius:14px;background:#01875f;
        font:700 24px Arial,sans-serif;color:#fff}`;
    document.head.appendChild(css);
    document.body.insertAdjacentHTML('beforeend', `<div id="cap"></div><div id="fade"></div>
      <div id="end"><img src="${icon}"><div><div class="t">GRAVITY<br><span>BREACH</span></div>
      <div class="s">TAP · FLIP · SURVIVE</div><div class="p">▶ Play free on Google Play</div></div></div>`);
  }, ICON);

  let frame = 0, crashes0 = 0;
  const caps = [];   // {from, to, html} in secunde globale
  const capAt = (t) => caps.find(c => t >= c.from && t < c.to);
  async function grab(extraJs) {
    const t = frame / FPS;
    const c = capAt(t);
    await page.evaluate((html, k) => {
      const el = document.getElementById('cap');
      if (!html) { el.style.opacity = 0; return; }
      el.innerHTML = html;
      const pop = Math.min(1, k.in / 0.18), out = Math.min(1, k.out / 0.18);
      el.style.opacity = Math.min(pop, out);
      el.style.transform = `scale(${0.85 + 0.15 * pop})`;
    }, c ? c.html : '', c ? { in: t - c.from, out: c.to - t } : {});
    if (extraJs) await page.evaluate(extraJs);
    await page.screenshot({ path: `${FR}/f${String(frame).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
    frame++;
  }
  const cap = (sec, dur, white, colored, col) => CGV ? 0 : caps.push({ from: sec, to: sec + dur,
    html: `${white} <b style="color:${col};text-shadow:0 0 20px ${col},0 3px 0 #000">${colored}</b>` });
  const fadeTo = (v) => `document.getElementById('fade').style.opacity=${v}`;

  // ruleaza N secunde de joc cu pilotul; 2 update-uri de 1/60 per cadru video
  async function play(sec, opts) {
    for (let i = 0; i < sec * FPS; i++) {
      await ev(`__pilot(2, ${JSON.stringify(opts || { style: 0.03 })})`);
      await grab();
    }
  }
  // repeta un segment pana trece fara nicio ciocnire (pilotul nu e perfect la viteza mare)
  async function segment(name, setupJs, sec, opts) {
    for (let tries = 0; tries < 6; tries++) {
      const startFrame = frame;
      await ev(setupJs);
      const before = await ev('window.__crashes || 0');
      await play(sec, opts);
      const after = await ev('window.__crashes || 0');
      if (after === before) { console.log(name, 'ok', tries ? `(incercarea ${tries + 1})` : ''); return; }
      console.log(name, 'ciocnire, refac');
      for (let f = startFrame; f < frame; f++) fs.rmSync(`${FR}/f${String(f).padStart(5, '0')}.jpg`, { force: true });
      frame = startFrame;
    }
    throw new Error('segment ' + name + ' nereusit');
  }

  // 0-6s: gameplay rapid
  cap(0.2, 2.8, 'TAP TO', 'FLIP GRAVITY', '#00e5ff');
  cap(3.2, 2.7, 'DODGE', 'LASERS & SPIKES', '#ff2d95');
  await segment('gameplay', `state = S.PLAY; reset('endless'); speed = 640; dist = 15200; spawnTimer = 0.3; 0`, CGV ? 6.5 : 6, { style: 0.03, dense: 0.62 });
  // 6-10s: Gold Rush
  cap(6.15, 3.7, 'GRAB THE', 'GOLD RUSH', '#ffc531');
  await segment('gold', `goldRushT = TUNE.goldDur; goldSpawnT = 0; 0`, CGV ? 3.5 : 4, { style: 0.03, dense: 0.9 });
  // 10-14s: portal -> UPSIDE DOWN
  cap(10.2, 3.7, 'CRAZY', 'PORTALS', '#b44dff');
  await segment('portal', `triggerPortal(); effect = 'rotate'; effectT = 6; 0`, CGV ? 3 : 4, { style: 0.03, dense: 0.75 });
  // 14-19.5s: BALL CLAW -> skin legendar
  if (!CGV) for (let i = 0; i < 4; i++) await grab(fadeTo(i / 4));
  await ev(`state = S.MENU; openCrate(true); crateResult.ch = CHARS.find(c => c.id === 'cristal');
            crateResult.dupe = false; crateResult.capCol = '#b026ff'; 0`);
  cap(14.3, 6.0, 'WIN', 'LEGENDARY SKINS', '#ffd700');
  if (CGV) await ev(`for (let k = 0; k < 36; k++) update(1/60); 0`); // sare peste asteptarea de la inceput
  for (let i = 0; i < (CGV ? 5.0 : 6.3) * FPS; i++) {
    await ev(`update(1/60); update(1/60); render(); 0`);
    await grab(!CGV && i < 4 ? fadeTo(1 - (i + 1) / 4) : null);
  }
  // 19.6-23s: ecranul final
  caps.length = 0;
  if (!CGV) for (let i = 0; i < 3.4 * FPS; i++) {
    await grab(`document.getElementById('end').style.display='flex'; ${fadeTo(Math.max(0, 1 - i / 6))}`);
  }
  await browser.close();

  console.log('cadre:', frame, '-> encodare');
  if (CGV) {
    const C = 'store-assets/crazygames';
    const enc = ['-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart'];
    // 16:9: 0.5s coperta, apoi jocul
    execFileSync(FFMPEG, ['-y', '-loop', '1', '-t', '0.5', '-i', `${C}/cover-landscape-1920x1080.png`,
      '-framerate', String(FPS), '-i', `${FR}/f%05d.jpg`, '-filter_complex',
      `[0]scale=1920:1080,fps=${FPS},format=yuv420p,setsar=1[a];[1]scale=1920:1080,fps=${FPS},format=yuv420p,setsar=1[b];[a][b]concat=n=2:v=1[v]`,
      '-map', '[v]', ...enc, `${C}/preview-landscape-1080p.mp4`], { stdio: 'inherit' });
    // 2:3 (1080x1620): jocul pe latime, fundal = acelasi cadru marit si blurat (fara benzi negre)
    execFileSync(FFMPEG, ['-y', '-loop', '1', '-t', '0.5', '-i', `${C}/cover-portrait-800x1200.png`,
      '-framerate', String(FPS), '-i', `${FR}/f%05d.jpg`, '-filter_complex',
      `[0]scale=1080:1620,fps=${FPS},format=yuv420p,setsar=1[a];` +
      `[1]split[x][y];[x]scale=-2:1620,crop=1080:1620,boxblur=24:2,eq=brightness=-0.22[bg];[y]scale=-2:940,crop=1080:940:90:0[fg];` +
      `[bg][fg]overlay=0:(H-h)/2,fps=${FPS},format=yuv420p,setsar=1[b];[a][b]concat=n=2:v=1[v]`,
      '-map', '[v]', ...enc, `${C}/preview-portrait-1080x1620.mp4`], { stdio: 'inherit' });
    console.log('scris', C + '/preview-*.mp4');
    return;
  }
  execFileSync(FFMPEG, ['-y', '-framerate', String(FPS), '-i', `${FR}/f%05d.jpg`,
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-shortest',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-movflags', '+faststart', OUT],
    { stdio: 'inherit' });
  console.log('scris', OUT);
})();
