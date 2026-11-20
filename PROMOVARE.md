# Gravity Breach — promovare

## 1. CrazyGames (portal web, milioane de jucători)

### Ce e pregătit
| Fișier | La ce folosește |
|---|---|
| `gravity-breach-crazygames.zip` | jocul cu SDK-ul CrazyGames (îl urci la „Game files”) |
| `store-assets/crazygames/cover-landscape-1920x1080.png` | copertă 16:9 |
| `store-assets/crazygames/cover-portrait-800x1200.png` | copertă 2:3 |
| `store-assets/crazygames/cover-square-800x800.png` | copertă 1:1 |
| `store-assets/crazygames/preview-landscape-1080p.mp4` | video preview 16:9 (18,5 s, fără sunet) |
| `store-assets/crazygames/preview-portrait-1080x1620.mp4` | video preview 2:3 (18,5 s, fără sunet) |

Refacere după orice modificare la joc: `node scripts/build-crazygames.mjs`
(coperțile: `node scripts/make-crazygames-covers.mjs`, video: `$env:CG='1'; node scripts/make-video.cjs`).

### Ce face versiunea CrazyGames (diferit de Android)
- salvarea merge prin contul CrazyGames (`sdk.data`), nu prin browser;
- reclamele vin doar prin SDK-ul lor: **midgame** la RETRY (după primele 2 runde; SDK-ul le limitează la 1 / 3 min) și **rewarded** pentru *2X COINS* și *FREE BALL CLAW*;
- **REVIVE e scos** (regula lor: fără oferte „continuă” la fiecare moarte);
- fără buton/cerere de fullscreen proprie (îl dă platforma), fără clasament zilnic, fără REMOVE ADS;
- cu ad blocker, bonusurile cu reclamă dispar și în meniu apare un mesaj de ce;
- trimite `gameplayStart` / `gameplayStop` și `happytime` la skin legendar.

### Pașii de trimitere (îi faci tu, din contul tău)
1. Intră pe **developer.crazygames.com** → creezi cont de dezvoltator (gratuit).
2. **Submit a game** → tip **HTML5** → urci `gravity-breach-crazygames.zip`.
3. Completezi:
   - **Name:** Gravity Breach
   - **Category:** Arcade (sau Skill) · **Tags:** gravity, neon, runner, one button, arcade, skill, endless
   - **Description** (EN):
     > Flip gravity with a single tap and race through a neon world full of spikes, lasers and walls. Grab coins, ride the Gold Rush, survive crazy portals (Turbo, Upside Down, Mirror, 2X Gravity) and win new skins from the Ball Claw machine. Endless mode, 30 levels and a daily challenge — how far can you go?
   - **Controls:** Tap / Click / Space — flip gravity. That's it!
   - **Mobile support:** Yes (landscape)
   - **Store links (Google Play):** `https://play.google.com/store/apps/details?id=com.nclaudiu.gravityflip` — doar în câmpul din portal, **niciodată în joc** (regula lor).
4. Urci cele 3 coperți și cele 2 video-uri.
5. Trimiți → urmează **Basic Launch** (fără reclame, ~2 săptămâni de test). Dacă jocul are rezultate bune, trec la **Full Launch** cu reclame și împărțire de venit.

## 2. itch.io (gratuit, comunitate indie)
- Folosești **versiunea fără SDK**: `index.html` din rădăcină (aceeași ca pe GitHub Pages), arhivat ca zip.
- Pe itch.io: *Upload new project* → Kind: **HTML** → bifezi „This file will be played in the browser” → Viewport 960×540, „Mobile friendly”, „Fullscreen button”.
- În descriere poți pune liber linkul de Google Play.

## 3. Reddit (din contul tău)
Reguli: nu posta în toate subreddit-urile în aceeași zi (1–2 pe zi), răspunde la comentarii,
pune un GIF/video scurt, nu suna a reclamă. Citește regulile fiecărui subreddit înainte (unele cer flair sau „self-promo” doar sâmbăta).

### r/playmygame și r/indiegames
**Titlu:** I made my first game: a one-tap neon gravity runner. Would love honest feedback!

> Hi! I'm a student and this is the first game I've ever finished. It's called **Gravity Breach**: you tap to flip gravity and try to survive as long as possible while dodging spikes, lasers and walls.
>
> Some things I added: a Gold Rush power-up, portals that flip the screen upside down or mirror it, and a little claw machine where you win skins.
>
> It's free on Android and also playable in the browser:
> - Android: https://play.google.com/store/apps/details?id=com.nclaudiu.gravityflip
> - Browser: https://neacsuclaudiu.github.io/gravity-flip/
>
> What feels too hard / too easy? Anything confusing? Every bit of feedback helps a beginner like me. Thanks!

### r/AndroidGaming
**Titlu:** [DEV] Gravity Breach — a free one-tap neon arcade runner (my first game)

> Hey r/AndroidGaming! I just released my first game on Google Play. One tap flips gravity, and you dodge spikes, lasers and walls in a neon world. There's an endless mode, 30 levels, a daily challenge and 15 skins to unlock from a claw machine.
>
> Free, works offline, no account needed. Ads are optional (rewarded) plus one interstitial every few runs, and you can remove them with a one-time purchase.
>
> https://play.google.com/store/apps/details?id=com.nclaudiu.gravityflip
>
> I'm still learning, so feedback is super welcome!

### r/IndieDev (accent pe „cum l-am făcut”)
**Titlu:** My first finished game — from a single HTML file to Google Play

> I started Gravity Breach as a tiny HTML canvas experiment and kept adding stuff until it became a real game: gravity flipping, lasers, portals that mirror the screen, a claw machine for skins… Then I wrapped it with Capacitor and published it on Google Play.
>
> Biggest lessons: playtest on a real phone early (half my bugs only showed up there), and small UX things matter a lot (a stray tap starting a new run was the #1 complaint).
>
> Trailer: https://www.youtube.com/watch?v=xloA0eC8mPc
> Google Play: https://play.google.com/store/apps/details?id=com.nclaudiu.gravityflip
>
> Happy to answer questions!

### Grupuri românești (Facebook / Discord)
> Salut! Sunt student și tocmai mi-am publicat primul joc pe Google Play: **Gravity Breach**, un arcade neon unde cu un singur tap schimbi gravitația și te ferești de țepi, lasere și ziduri. E gratuit, merge și offline. M-ar ajuta mult dacă îl încercați și îmi spuneți sincer ce părere aveți (și o recenzie dacă vă place 🙏):
> https://play.google.com/store/apps/details?id=com.nclaudiu.gravityflip

## 4. Mai târziu
- **House ads AdMob** (Bancuri ↔ Gravity Breach) — după ce ambele aplicații sunt publice.
- **Google Ads App Campaign** 3–5 €/zi — după 10–20 de recenzii bune.
