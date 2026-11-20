// Copie de test a jocului pentru capturi de magazin / video:
// - window.__ev(cod) ruleaza cod IN interiorul jocului (acces la toate variabilele)
// - window.__manual = true opreste bucla rAF; cadrele se pompeaza manual
// - window.__god = true: die() nu mai omoara jucatorul
import fs from 'fs';
const src = fs.readFileSync('gravity-flip.html', 'utf8');
let out = src
  .replace('function loop(now) {', 'function loop(now) {\n    if (window.__manual) return;')
  .replace('function die() {', 'function die() {\n    if (window.__god) { window.__dead = true; return; }');
const i = out.lastIndexOf('requestAnimationFrame(loop);');
out = out.slice(0, i) + 'window.__ev = (s) => eval(s);\n  ' + out.slice(i);
fs.mkdirSync('store-assets/promo', { recursive: true });
fs.writeFileSync('store-assets/promo/game-test.html', out);
console.log('scris store-assets/promo/game-test.html');
