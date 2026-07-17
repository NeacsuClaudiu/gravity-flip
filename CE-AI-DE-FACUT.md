# 🚀 Gravity Flip — Ce mai ai de făcut pentru Play Store

_Ultima actualizare: 2026-07-17_

Toate lucrurile pe care le-am putut face eu sunt gata. Mai jos e **lista scurtă** cu ce trebuie să faci tu personal, cu explicații pas cu pas.

---

## ✅ Ce am făcut deja

- Jocul complet, testat, cu ID-uri AdMob reale
- Iconiță aplicație + splash screen din logo-ul tău
- **AAB de release semnat**: `android/app/build/outputs/bundle/release/app-release.aab` (11 MB) — ĂSTA e fișierul pe care îl urci pe Play Store
- Politică de confidențialitate publicată la:
  **https://neacsuclaudiu.github.io/gravity-flip/privacy.html**
- Iconiță magazin 512×512: `store-assets/icon-512.png`
- Banner Play Store 1024×500: `store-assets/feature-1024x500.png`
- 4 capturi de ecran: `store-assets/shot-*.png`
- Keystore + credențiale în `KEYSTORE-CREDENTIALS.txt` (⚠️ FĂ-I BACKUP!)

---

## 🔴 PASUL 0 — URGENT: fă backup la keystore!

Deschide `KEYSTORE-CREDENTIALS.txt` și **copiază** aceste 2 fișiere pe Google Drive + stick USB:

1. `KEYSTORE-CREDENTIALS.txt` (parola)
2. `android/app/gravity-flip.keystore` (cheia)

**Dacă le pierzi, nu mai poți actualiza aplicația NICIODATĂ.**

---

## 📱 PASUL 1 — Adaugă aplicația în Play Console (5 min)

1. Intri pe [play.google.com/console](https://play.google.com/console)
2. **Create app**
3. Nume: `Gravity Flip`
4. Limbă implicită: `English (US)` (poți adăuga română după)
5. Tipul: **Game**
6. Gratuit sau plătit: **Free**
7. Bifezi declarațiile obligatorii → **Create app**

---

## 📄 PASUL 2 — Completează fișa magazinului (Store presence → Main store listing)

**Titlu (max 30 caractere):**
```
Gravity Flip: Neon Arcade
```

**Descriere scurtă (max 80 caractere):**
```
Flip gravity, dodge neon obstacles, unlock skins. Simple. Addictive.
```

**Descriere lungă:**
```
Tap to flip gravity. Dodge spikes, walls, and lasers. Collect coins.
Unlock characters from the BALL CLAW machine.

Features:
• One-tap arcade gameplay — instant fun, hard to master
• 30 levels + endless mode + daily challenges with leaderboard
• 15 unlockable skins with 3 rarities (Common, Rare, Legendary)
• Portal effects: Turbo, 2X Gravity, Upside Down, Mirrored Screen
• Powerups: Magnet, Shield, Slow-mo, Gold Rush
• Missions and achievements with coin rewards
• Neon visuals with a Geometry Dash vibe
• Plays landscape, offline, no account needed

Watch a rewarded ad for:
• One free BALL CLAW pull per day
• Revive after death (1 per run)
• Double the coins from your run

Or buy Remove Ads once and skip all ads forever.
```

**Iconiță aplicație:** urcă `store-assets/icon-512.png`
**Feature graphic:** urcă `store-assets/feature-1024x500.png`
**Capturi telefon (min 2, max 8):** urcă `store-assets/shot-menu.png`, `shot-gameplay.png`, `shot-ballclaw.png`, `shot-levels.png`

**Categorie:** Games → Arcade
**Etichete:** casual, arcade, single player

**Contact:**
- Email: `nclaudiu27@gmail.com`
- Site web: `https://neacsuclaudiu.github.io/gravity-flip/`
- **Politică de confidențialitate: `https://neacsuclaudiu.github.io/gravity-flip/privacy.html`**

---

## 🔞 PASUL 3 — Rating de conținut (5 min)

**Policy → App content → Content ratings → Start questionnaire**

- Email: `nclaudiu27@gmail.com`
- Categorie: **Game — Casual/Arcade**
- La toate întrebările despre violență, sex, droguri, gambling, teme sensibile: **NO** (jocul e curat)
- La „Does the app include ads": **YES**
- Trimite → primești automat PEGI 3.

---

## 🛡️ PASUL 4 — Data safety (5 min)

**Policy → App content → Data safety → Start**

- „Does your app collect or share any user data?" → **NO** (jocul în sine nu colectează)
- „Is your data encrypted in transit?" → **Yes** (AdMob folosește HTTPS)
- „Do you provide a way for users to delete their data?" → **Yes** (uninstall = delete tot)

*Nota: Google-ul completează automat partea AdMob din SDK-ul detectat, nu trebuie să declari tu Advertising ID separat.*

---

## 🎯 PASUL 5 — Target audience (5 min)

**Policy → App content → Target audience**
- Target age group: **13+** (recomandat, ca să nu intri în COPPA)
- Appeal to children: **No**

---

## 📢 PASUL 6 — Ads (Advertising) (1 min)

**Policy → App content → Ads**
- „Does your app contain ads?" → **YES**

---

## 📦 PASUL 7 — Urcă AAB-ul (5 min)

**Testing → Internal testing → Create new release**

1. Bifează **„Use Play App Signing"** dacă te întreabă (recomandat — Google gestionează cheia finală)
2. **Upload:** `android/app/build/outputs/bundle/release/app-release.aab`
3. Release name: `1.0 (1)`
4. Release notes:
   ```
   Prima lansare.
   Joc arcade cu flip de gravitație, 30 niveluri, mașină BALL CLAW pentru skinuri.
   ```
5. Adaugă email-ul tău în „Testers"
6. **Review release → Start rollout**

Așteaptă ~1 oră până Google procesează. După aceea primești un link pe care îl deschizi pe telefon și instalezi versiunea „internă".

---

## 💰 PASUL 8 — Creează produsul „Remove Ads" (5 min)

**Monetization → Products → In-app products → Create product**

- **Product ID:** `remove_ads` (exact așa, minuscule, cu subliniere)
- **Name:** `Remove Ads`
- **Description:** `Remove all ads permanently.`
- **Price:** alege tu (ex. 9.99 RON)
- **Status:** Active

---

## 🎬 PASUL 9 — GDPR în AdMob (5 min)

Pe **admob.google.com** → **Privacy & messaging** → **GDPR** → **Create message**
- Îți zice ce publisheri terți folosești (doar Google, nu ai altele) → **Continue**
- Design → alege stilul → **Save**
- **Publish**

Din acest moment, la prima deschidere a aplicației în UE, apare formularul de consimțământ automat.

---

## 🚀 PASUL 10 — După ce merge Internal testing → Production

1. Testezi aplicația pe telefonul tău prin link-ul de internal testing
2. Dacă e ok, mergi la **Production → Create release**
3. Promovează build-ul din Internal testing → Production
4. Completezi „Countries and regions" (bifează România + toată UE minim)
5. **Review release → Start rollout to production**

Google face review timp de câteva zile (2-7 zile de obicei pentru un cont nou). Poți primi întrebări prin email — răspunde repede, altfel se blochează.

---

## 🐛 Când vrei să testezi aplicația fără să dai click accidental pe reclame reale

Google detectează click-uri false și îți poate suspenda contul.

1. Conectează telefonul la PC prin USB
2. Deschide `chrome://inspect#devices` în Chrome de pe PC
3. Deschide aplicația pe telefon (chiar dacă vezi „Test Ad" sau reclama nu apare)
4. În Chrome vei vedea un mesaj în consolă cu Device ID-ul tău (arată `AB12CD34EF56...`)
5. Pui Device ID-ul în **AdMob → Settings → Test devices → Add**
6. Gata — reclamele pe telefonul tău vor avea eticheta „Test Ad", poți da click în voie

---

## 🆘 Când ai o problemă, spune-mi:

- „Google mi-a respins aplicația pentru X" → îți fac fix-ul și dau alt build
- „Reclamele nu apar în app" → verific ID-urile și rețeaua
- „Vreau să modific ceva în joc" → schimb, rebuildez, îți dau AAB-ul nou

**Când vrei să dai UPDATE la aplicație:**
1. Modific ce trebuie
2. Cresc `versionCode` (1 → 2) și `versionName` ("1.0" → "1.1") în `android/app/build.gradle`
3. Rulez `npm run sync && cd android && .\gradlew.bat bundleRelease`
4. Urci noul AAB în Play Console

---

## 📌 Fișiere importante (unde le găsești)

| Fișier | Ce e |
|---|---|
| `android/app/build/outputs/bundle/release/app-release.aab` | **AAB-ul pt. Play Store** |
| `android/app/build/outputs/apk/debug/app-debug.apk` | APK pentru test pe telefon |
| `store-assets/icon-512.png` | Iconiță magazin |
| `store-assets/feature-1024x500.png` | Banner magazin |
| `store-assets/shot-*.png` | Capturi de ecran |
| `privacy.html` | Politica de confidențialitate (live) |
| `KEYSTORE-CREDENTIALS.txt` | ⚠️ Parolele cheii - BACKUP! |
| `android/app/gravity-flip.keystore` | ⚠️ Cheia de semnare - BACKUP! |

---

**Succes cu publicarea! 🎮**
