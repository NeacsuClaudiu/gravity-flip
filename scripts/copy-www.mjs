// Copiaza jocul (sursa unica: gravity-flip.html) in www/index.html pentru Capacitor.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'gravity-flip.html');
const wwwDir = path.join(root, 'www');
fs.mkdirSync(wwwDir, { recursive: true });
fs.copyFileSync(src, path.join(wwwDir, 'index.html'));
// index.html din radacina = versiunea web publicata pe GitHub Pages
fs.copyFileSync(src, path.join(root, 'index.html'));
console.log('www/index.html + index.html (GitHub Pages) actualizate din gravity-flip.html');
