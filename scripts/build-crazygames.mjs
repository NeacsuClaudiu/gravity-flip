// Build pentru CrazyGames: jocul + SDK-ul lor v3 (activeaza modul isCG din joc).
// node scripts/build-crazygames.mjs -> dist-crazygames/index.html + gravity-breach-crazygames.zip
import fs from 'fs';
import { execFileSync } from 'child_process';
const src = fs.readFileSync('gravity-flip.html', 'utf8');
const tag = '<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>\n';
const i = src.indexOf('<script>');
if (i < 0) throw new Error('nu gasesc scriptul jocului');
const out = src.slice(0, i) + tag + src.slice(i);
fs.rmSync('dist-crazygames', { recursive: true, force: true });
fs.mkdirSync('dist-crazygames');
fs.writeFileSync('dist-crazygames/index.html', out);
// zip pentru upload (PowerShell Compress-Archive, fara dependinte)
fs.rmSync('gravity-breach-crazygames.zip', { force: true });
execFileSync('powershell', ['-NoProfile', '-Command',
  "Compress-Archive -Path 'dist-crazygames/*' -DestinationPath 'gravity-breach-crazygames.zip'"]);
console.log('dist-crazygames/index.html + gravity-breach-crazygames.zip');
