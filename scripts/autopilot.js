// Pilot automat pentru video: la fiecare decizie simuleaza cu update()-ul REAL al jocului
// doua variante (nu apasa / flip acum) si o alege pe cea care supravietuieste.
// Se injecteaza in pagina prin window.__ev, deci ruleaza in interiorul closure-ului jocului.
(function () {
  const VARS = ['player','obstacles','coins','powerups','portals','particles','trail','speed','dist','coinCount',
    'coinPoints','gravDir','flips','spawnTimer','portalTimer','shake','flashT','tNow','magnetT','slowmoT','shield',
    'goldRushT','goldSpawnT','goldPhase','puBag','combo','comboT','effect','effectT','runTime','runPower','runRare',
    'runPortals','runPortalSurv','state','save','missionToasts','lvlCoinsSpawned'];
  const snap = () => { const o = {}; for (const v of VARS) o[v] = structuredClone(eval(v)); return o; };
  const restore = (o) => { for (const v of VARS) { window.__tmp = o[v]; eval(v + ' = structuredClone(window.__tmp)'); } };
  const sfxSave = sfx; let mute = false;
  sfx = function () { if (!mute) return sfxSave.apply(this, arguments); };
  function survive(flipNow, frames) {
    window.__dead = false;
    if (flipNow) doFlip();
    for (let i = 0; i < frames; i++) { update(1 / 60); if (window.__dead) return i; }
    return frames;
  }
  let cool = 0;
  window.__pilot = function (stepFrames, opts) {
    opts = opts || {};
    for (let s = 0; s < stepFrames; s++) {
      // mai multe obstacole pe ecran (pentru video): nu lasa pauze lungi intre spawn-uri
      if (opts.dense && spawnTimer > opts.dense) spawnTimer = opts.dense;
      if (cool > 0) cool--;
      else {
        const s0 = snap(); mute = true;
        const a = survive(false, 54); restore(s0);
        const b = survive(true, 54); restore(s0);
        mute = false;
        // flip doar daca e nevoie; ocazional flip "de stil" cand ambele variante sunt sigure
        const style = opts.style && a === 54 && b === 54 && Math.random() < opts.style;
        if (b > a || style) { doFlip(); cool = 8; }
      }
      window.__dead = false;
      update(1 / 60);
      if (window.__dead) window.__crashes = (window.__crashes || 0) + 1;
    }
    render();
    return window.__crashes || 0;
  };
})();
