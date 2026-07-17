// Patch-uri dupa `npx cap add android` / `npx cap sync` (idempotent, rulabil oricand):
// 1. AdMob APPLICATION_ID in AndroidManifest.xml (ID de TEST Google - inlocuieste la publicare).
// 2. Orientare sensorLandscape pe MainActivity (jocul e gandit landscape).
// 3. MainActivity cu mod imersiv (fara bara de status / navigare).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
const mainActivityPath = path.join(root, 'android', 'app', 'src', 'main', 'java', 'com', 'nclaudiu', 'gravityflip', 'MainActivity.java');

if (!fs.existsSync(manifestPath)) {
  console.error('AndroidManifest.xml lipseste - ruleaza intai `npx cap add android`.');
  process.exit(1);
}

let xml = fs.readFileSync(manifestPath, 'utf8');

// 1) AdMob APPLICATION_ID (TEST)
const ADMOB_META = `        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-5712899602059155~1588643327"/>`;
if (!xml.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  xml = xml.replace(/(<application[^>]*>)/, `$1\n\n${ADMOB_META}`);
  console.log('+ AdMob APPLICATION_ID adaugat (ID de TEST Google)');
} else {
  console.log('= AdMob APPLICATION_ID exista deja');
}

// 2) landscape pe activitate
if (!xml.includes('android:screenOrientation')) {
  xml = xml.replace(/(<activity\b)/, '$1\n            android:screenOrientation="sensorLandscape"');
  console.log('+ screenOrientation=sensorLandscape adaugat');
} else {
  console.log('= screenOrientation exista deja');
}

fs.writeFileSync(manifestPath, xml);

// 3) MainActivity imersiv (suprascriere completa, idempotent)
const MAIN_ACTIVITY = `package com.nclaudiu.gravityflip;

import android.view.View;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) {
      getWindow().getDecorView().setSystemUiVisibility(
        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
          | View.SYSTEM_UI_FLAG_FULLSCREEN
          | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
          | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
          | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
          | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }
  }
}
`;
if (fs.existsSync(path.dirname(mainActivityPath))) {
  fs.writeFileSync(mainActivityPath, MAIN_ACTIVITY);
  console.log('+ MainActivity.java rescris cu mod imersiv');
} else {
  console.warn('! Nu gasesc directorul MainActivity - verifica appId');
}

console.log('Patch Android OK');
