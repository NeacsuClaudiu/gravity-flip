# Gravity Flip — ghid publicare Google Play

## Ce e deja făcut ✅

- **Proiect Capacitor + Android** (`com.nclaudiu.gravityflip`, nume „Gravity Flip"), landscape, ecran imersiv (fără bare de sistem).
- **Reclame AdMob (interstitial)**: apare la **fiecare a 3-a moarte**, cu **ID-uri de TEST** Google (vezi mai jos cum le înlocuiești).
- **Reclame rewarded (alegi să te uiți)** — 3 plasamente:
  - **▶ FREE BALL CLAW** (meniu): o tragere gratis la mașina de skinuri, **o dată pe zi**;
  - **▶ REVIVE** (ecranul de moarte): continui aceeași rundă, **o dată pe rundă** (scor/distanță păstrate, statisticile nu se dublează);
  - **▶ 2X COINS** (ecranul de moarte): dublează bănuții rundei, **o dată pe rundă**.
- **Buton „REMOVE ADS"** în meniu (doar în aplicație): plată unică prin Google Play Billing, produs `remove_ads` (non-consumabil). După cumpărare: reclamele dispar definitiv, butonul dispare, iar la reinstalare cumpărătura se **restaurează automat**.
- **Consimțământ GDPR (UMP)**: fluxul e apelat la pornire; formularul apare doar după ce îl configurezi în consola AdMob (Privacy & messaging).
- **Salvare persistentă** în aplicație prin localStorage.
- Sursa unică a jocului: `gravity-flip.html`. Orice modificare la joc → rulează `npm run sync` ca să ajungă în aplicație.

## Comenzi utile

```powershell
# după orice modificare la gravity-flip.html:
npm run sync            # copiază în www/ + cap sync + re-patch manifest

# build APK de test (instalabil direct pe telefon):
$env:JAVA_HOME = "D:\Claude workshop\tools\jdk-21.0.11+10"
cd android
.\gradlew.bat assembleDebug
# rezultat: android\app\build\outputs\apk\debug\app-debug.apk

# build pentru Play Store (AAB semnat — după ce ai cheia, vezi pasul 4):
.\gradlew.bat bundleRelease
```

## Pași rămași pentru publicare (în ordine)

### 1. Cont și aplicație
- Cont Google Play Console (taxă unică 25 USD) + cont AdMob.
- În AdMob: **Apps → Add app** → primești **App ID real** (`ca-app-pub-XXXX~YYYY`).
- Creează un bloc **Interstitial** → primești **Ad unit ID** (`ca-app-pub-XXXX/ZZZZ`).

### 2. Înlocuiește ID-urile de TEST
- În AdMob creează **două** blocuri: unul *Interstitial* și unul *Rewarded*.
- În `gravity-flip.html`: caută `AD_INTERSTITIAL_ID` și `AD_REWARDED_ID` și pune ID-urile tale reale.
- În `scripts/patch-android.mjs`: înlocuiește `ca-app-pub-3940256099942544~3347511713` cu App ID-ul tău real, apoi editează manual aceeași valoare în `android/app/src/main/AndroidManifest.xml` (sau șterge meta-data din manifest și rulează `npm run patch`).
- Rulează `npm run sync`.
- ⚠️ Nu testa cu ID-urile reale pe telefonul tău prin click-uri repetate — folosește ID-urile de test în dezvoltare.

### 3. Produsul „remove_ads" în Play Console
- Play Console → aplicația ta → **Monetize → Products → In-app products → Create**.
- **Product ID: exact `remove_ads`** (așa e în cod), tip: **one-time (managed)**, preț la alegere (ex. 9,99 lei).
- Butonul din joc afișează automat prețul din Play și livrează/restaurează cumpărătura.
- Billing-ul funcționează abia după ce aplicația e urcată măcar pe **Internal testing** și produsul e activ.

### 4. Semnarea (cheia de release)
```powershell
$env:JAVA_HOME = "D:\Claude workshop\tools\jdk-21.0.11+10"
& "$env:JAVA_HOME\bin\keytool.exe" -genkeypair -v -keystore gravity-flip.keystore -alias gravityflip -keyalg RSA -keysize 2048 -validity 10000
```
- Păstrează fișierul + parolele în loc sigur (pierdute = nu mai poți actualiza aplicația).
- Configurează semnarea în `android/app/build.gradle` (signingConfigs release) sau semnează AAB-ul la upload cu **Play App Signing** (recomandat).

### 5. Consimțământ reclame (obligatoriu în UE/România)
- AdMob → **Privacy & messaging** → creează mesajul GDPR pentru aplicație.
- Codul din joc apelează deja `requestConsentInfo`/`showConsentForm` — formularul va apărea automat la prima pornire în UE după configurare.

### 6. Play Console — fișa aplicației
- `gradlew.bat bundleRelease` → `android\app\build\outputs\bundle\release\app-release.aab` → upload la Internal testing.
- Completezi: descriere, capturi (folosește jocul în landscape), icon 512×512, feature graphic 1024×500, chestionar **Data safety** (bifezi că folosește AdMob/advertising ID), rating de conținut, politică de confidențialitate (obligatorie când ai reclame — o pagină simplă găzduită oriunde).
- Icon/splash: pui un PNG 1024×1024 în `assets/icon.png` și rulezi `npx capacitor-assets generate --android` (pachetul e deja instalat).

## Detalii implementare (pentru referință)

| Ce | Unde în cod |
|---|---|
| Contor morți + afișare la a 3-a | `maybeShowAd()` apelat din `die()` |
| Rewarded (pregătire/afișare/recompensă) | `rewardPrepare()` / `showRewarded(cb)` + listener `onRewardedVideoAdReward`/`Dismissed` |
| Free claw zilnic | `zones.freeclaw` în meniu; `save.freeClaw` = data ultimei folosiri |
| Revive (1/rundă) | `revive()`; `bankRun()` contorizează pe delte (`banked*`), `runCounted` |
| 2X coins (1/rundă) | handler `deadZones.dbl`; flag `runDoubled` |
| Pregătire/reîncărcare interstitial | `adPrepare()` (după fiecare afișare) |
| Flag fără reclame | `save.noAds` (persistat) |
| Cumpărare | `buyNoAds()` → ofertă Google Play → `approved` → `grantNoAds()` |
| Restaurare la reinstalare | `productUpdated` cu `p.owned` → `grantNoAds()` |
| Butonul din meniu | `zones.noads` în `renderMenu()` (doar `isNative && !save.noAds`) |
