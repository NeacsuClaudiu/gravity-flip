// Scene pentru capturile de magazin. Coordonate in px CSS (ecran 960x540, floorH 42).
const clean = (speed) => `state = S.PLAY; reset('endless'); spawnTimer = 999; portalTimer = 999;
  speed = ${speed}; save.skin = 'cub'; 0`;

module.exports = {
  // 1. flip in aer peste tepi, laser in fata, monede pe tavan
  async flip({ ev, step, shot }) {
    await ev(clean(560));
    await step(40);                       // alearga pe podea -> dara
    await ev(`doFlip(); 0`);
    await step(9);                        // la jumatatea drumului spre tavan
    await ev(`
      dist = 18400; coinCount = 86; combo = 3; comboT = 2;
      obstacles = [
        {type:'spike', x: 60, ceil:false}, {type:'spike', x: 94, ceil:false}, {type:'spike', x: 128, ceil:false},
        {type:'laser', x: 470, gap: 230, cy: 300},
        {type:'spike', x: 690, ceil:true}, {type:'spike', x: 724, ceil:true},
        {type:'wall', x: 860, gapTop: false, w: 36, gapMul: 1.1},
      ];
      coins = [];
      for (let i=0;i<5;i++) coins.push({x: 230 + i*42, y: TUNE.floorH + 22, taken:false, rare:false});
      coins.push({x: 470, y: 300, taken:false, rare:true});
      for (let i=0;i<3;i++) coins.push({x: 600 + i*42, y: H - TUNE.floorH - 22, taken:false, rare:false});
      0`);
    await step(1);
    await shot('flip');
  },

  // 2. Gold Rush: panglica de banuti
  async gold({ ev, step, shot }) {
    await ev(clean(520));
    await ev(`goldRushT = TUNE.goldDur; goldSpawnT = 0; dist = 23100; coinCount = 140; 0`);
    await step(170);
    await ev(`doFlip(); 0`); await step(8);
    await shot('gold');
  },

  // 3. tunel (slab) cu monede + laser + scut
  async tunnel({ ev, step, shot }) {
    await ev(clean(600));
    await step(30);
    await ev(`
      dist = 30750; coinCount = 211; shield = true;
      const playH = H - 2*TUNE.floorH, gH = Math.min(180, playH - 90);
      obstacles = [
        {type:'slab', x: 30, len: 320, gapY: H - TUNE.floorH - gH, gapH: gH},
        {type:'laser', x: 560, gap: 220, cy: 250},
        {type:'spike', x: 740, ceil:false}, {type:'spike', x: 774, ceil:false},
      ];
      coins = [];
      for (let i=1;i<6;i++) coins.push({x: 64 + i*60, y: H - TUNE.floorH - gH/2, taken:false, rare:false});
      coins.push({x: 560, y: 250, taken:false, rare:true});
      powerups = [{x: 880, y: 230, kind:'magnet', taken:false}];
      0`);
    await step(1);
    await shot('tunnel');
  },

  // 4. portal: efect TURBO activ
  async portal({ ev, step, shot }) {
    await ev(clean(700));
    await ev(`effect = 'turbo'; effectT = 9; dist = 4120; coinCount = 260; 0`);
    await step(30);
    await ev(`portals = [{x: 640, y: 290, used:false, a: 0}];
      obstacles = [{type:'spike', x: 300, ceil:true},{type:'spike', x: 334, ceil:true},{type:'spike', x: 368, ceil:true}];
      coins = []; for (let i=0;i<4;i++) coins.push({x: 420 + i*42, y: H - TUNE.floorH - 22, taken:false, rare:false});
      0`);
    await step(1);
    await shot('portal');
  },

  // 5. BALL CLAW - reveal legendar
  async claw({ ev, step, shot }) {
    await ev(`state = S.MENU; 0`); await step(1);
    await ev(`openCrate(true); crateResult.ch = CHARS.find(c => c.id === 'cristal'); crateResult.dupe = false;
      crateResult.capCol = '#b026ff'; 0`);
    await step(84);                        // 1.4s: gheara a prins bila in gramada
    await shot('claw-grab');
    await step(246);                       // dupa deschidere: cardul
    await shot('claw-reveal');
  },

  // 6. meniu cu skin legendar selectat
  async menu({ ev, step, shot }) {
    await ev(`state = S.MENU; save.skin = 'curcubeu'; selChar = CHARS.findIndex(c => c.id === 'curcubeu'); 0`);
    await step(60);
    await shot('menu');
  },

  // 7. ecranul de nivele
  async levels({ ev, step, shot }) {
    await ev(`state = S.LVL; 0`);
    await step(30);
    await shot('levels');
  },
};
