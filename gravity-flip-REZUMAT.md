# Gravity Flip — rezumat sesiune & handoff

_Ultima actualizare: 2026-07-09_

Document de predare pentru o sesiune nouă. Deschide-l sau atașează-l la începutul următoarei conversații ca să continui de unde am rămas.

---

## Fișiere (toate în `D:\Descarcari\gravity-flip\`)

| Fișier | Ce e |
|---|---|
| `gravity-flip.html` | **Jocul** (un singur fișier HTML + canvas, tot codul inline). Deschide-l în browser ca să te joci. |
| `gravity-flip.backup.html` | Copie de siguranță a versiunii finale. |
| `gravity-flip-REZUMAT.md` | Acest document. |

Copie găzduită (jucabilă + descărcabilă): artifactul „gravity-flip-joc". Rezumat găzduit: artifactul „gravity-flip-rezumat".

Jocul folosește `window.storage` (Claude artifact storage) pentru salvare/clasament. Local (deschis direct în browser) rulează normal, dar salvarea nu persistă între reîncărcări.

---

## Ce am făcut în această sesiune

Am pornit de la jocul existent (~1740 linii, temă neon, vibe Geometry Dash) și l-am modernizat + i-am refăcut sistemul de skinuri, **fără să stric nicio mecanică**.

### 1. Mecanicile — păstrate intacte
Flip de gravitație (un tap = schimbă gravitația), spikes + pereți cu gap, monede + diamante rare, portaluri cu 4 efecte, combo, powerups (magnet / scut / slowmo), moduri (endless / daily seeded / 30 niveluri), misiuni, realizări, clasament zilnic, sistemul de salvare, personaje + raritate.

### 2. Modernizare vizuală (neon)
- Fundal cu gradient mai bogat + **stele parallax pe 2 straturi** + **puls pe ritm** + **vignetă** pentru adâncime.
- **Grilă în mișcare pe podea/tavan** + margini neon cu glow (feel Geometry Dash).
- **Glow neon pe personaj.**

### 3. Mașina „BALL CLAW" (înlocuiește ecranul vechi de lăzi)
- Cabinet neon cu titlu „BALL CLAW", buton START, panou cu șanse (COMUN 70% / RAR 25% / LEGENDAR 5%).
- **Toate bilele = capsule tip pokémon** (jumătate colorată sus, jumătate albă jos, bandă neagră + buton central) — la fel ca cea extrasă.
- **Grămadă 3D densă**: ~48 de capsule pe 7 rânduri suprapuse, sortate spate→față, cu adâncime (rândurile din spate mai mici și mai închise).
- **Gheara intră în morman și scoate DOAR una**; restul rămân (gol pe crestet). Capsulele din față îi acoperă degetele cât e băgată (ordine desen: back → gheară → front), ca să pară că sapă în interior.
- Flux: monede → gheara coboară în morman → prinde o capsulă → o ridică drept în sus → capsula se deschide → **reveal skin** (echipat automat dacă e nou, refund în monede dacă e duplicat).

### 4. Skinuri noi (6)
`Slime`, `Pixel` (comune), `Ember`(foc), `Dragon` (rare), `Crystal`(cristal), `Rainbow`(curcubeu, animat) — legendare. Intră în pool-ul mașinii și în galeria din meniu.

---

## Decizii confirmate (NU le schimba fără să întrebi)

- **Temă neon/dark peste tot** — varianta pastel a fost respinsă explicit.
- **Un tap = schimbă gravitația.** FĂRĂ jetpack „ține apăsat = zbor" (respins). Powerups existente sunt considerate suficiente ca stil „Jetpack Joyride".
- Numele mașinii: **„BALL CLAW"**.
- Bilele din mașină: **capsule tip pokémon**, toate la fel ca cea extrasă.

---

## Unde e codul relevant (în `gravity-flip.html`)

- `CHARS` (lista de personaje) + `drawCharCentered()` (are un `case` per skin, inclusiv cele 6 noi).
- `openCrate()` — alege skinul random pe raritate, scade costul, gestionează duplicate.
- `renderCrate()` — desenează mașina BALL CLAW: cabinetul, mormanul 3D (`rowsDef` → `backRow`/`frontRow` + `crownFront`), fazele ghearei, apoi cardul de reveal după `CRATE_T`.
- `drawCrateBox()` — desenează o **capsulă pokémon** (param `openAmt` 0..1 = deschidere).
- `drawClaw()` — gheara cromată cu 3 degete + reflex cyan.
- Fazele ghearei (secunde, în `renderCrate`): coboară `<1.0` → prinde `<1.45` → ridică `<2.5` → pauză `<2.75` → deschidere `<CRATE_T (3.6)` → card reveal.
- `render()` — fundalul modernizat (parallax + puls + vignetă) + podeaua cu grilă/glow + glow-ul personajului.

---

## Stare & verificare

- Verificat **live** (server local): mașina cu mormanul 3D dens randează (~7000 px colorați), gheara extrage o singură capsulă (densitatea scade + capsula urcă), reveal-ul apare — **0 erori în consolă**.
- `node --check` pe scriptul final: **sintaxă validă**.
- Fișierul e curat (fără valori de test; `wallet: 0`).

Notă tehnică: tool-ul de preview suspendă animația când tab-ul e în fundal (`document.hidden`), iar screenshot-ul dă timeout pe canvas care animă continuu. Verificare fiabilă = eșantionare pixeli când tab-ul e vizibil + `node --check`.

---

## Idei pentru mai departe (neîncepute)

- Morman și mai înalt/plin sau capsule mai mari.
- Reglaj cost capsulă / șanse pe raritate.
- Mici capsule care se „așază" (settle) după ce gheara scoate una.
- Alte skinuri / skinuri sezoniere.
