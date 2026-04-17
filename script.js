/* =========================================================
   THREE.JS 3D SPACE BACKGROUND — ULTRA ENHANCED
   Spiral Galaxy · Deep Star Field · Lens Flares · Nebulae
   Gas Giant Planet · Asteroid Belt · Gradient Meteor Trails
   Space Dust · Scroll Parallax · Mouse Camera Rotation
   ========================================================= */
(function initSpaceBackground() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('bg-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00000a, 1);
    renderer.shadowMap.enabled = false;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 6000);
    camera.position.set(0, 0, 130);

    // ── Mouse + Scroll momentum ──────────────────────────────────
    const mouse   = { x: 0, y: 0, tx: 0, ty: 0 };
    let   rawScrollY     = 0;   // raw window.scrollY
    let   scrollCurrent  = 0;   // smoothed scroll value
    let   scrollVel      = 0;   // scroll velocity (for warp)
    let   prevRawScrollY = 0;   // to compute velocity

    document.addEventListener('mousemove', (e) => {
        mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    });
    window.addEventListener('scroll', () => {
        rawScrollY = window.scrollY;
    });

    /* ─── Canvas texture helpers ──────────────────────────────── */
    function makeGlowTex(hex, r, softness) {
        r = r || 128; softness = softness || 0.3;
        const s = r * 2, cnv = document.createElement('canvas');
        cnv.width = cnv.height = s;
        const ctx = cnv.getContext('2d');
        const g = ctx.createRadialGradient(r, r, 0, r, r, r);
        g.addColorStop(0,          hex + 'ff');
        g.addColorStop(softness,   hex + 'cc');
        g.addColorStop(0.6,        hex + '44');
        g.addColorStop(1,          hex + '00');
        ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
        return new THREE.CanvasTexture(cnv);
    }

    function makeLensFlare(hex, r) {
        r = r || 64;
        const s = r * 2, cnv = document.createElement('canvas');
        cnv.width = cnv.height = s;
        const ctx = cnv.getContext('2d');
        // Core star
        const g = ctx.createRadialGradient(r, r, 0, r, r, r);
        g.addColorStop(0,    hex + 'ff');
        g.addColorStop(0.08, hex + 'ff');
        g.addColorStop(0.15, hex + 'aa');
        g.addColorStop(0.4,  hex + '33');
        g.addColorStop(1,    hex + '00');
        ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
        // Cross spikes
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = hex + 'aa';
        ctx.lineWidth   = 1.5;
        const grad1 = ctx.createLinearGradient(0, r, s, r);
        grad1.addColorStop(0,   hex + '00');
        grad1.addColorStop(0.4, hex + 'aa');
        grad1.addColorStop(0.5, hex + 'ff');
        grad1.addColorStop(0.6, hex + 'aa');
        grad1.addColorStop(1,   hex + '00');
        ctx.strokeStyle = grad1;
        ctx.beginPath(); ctx.moveTo(0, r); ctx.lineTo(s, r); ctx.stroke();
        const grad2 = ctx.createLinearGradient(r, 0, r, s);
        grad2.addColorStop(0, hex + '00'); grad2.addColorStop(0.4, hex + 'aa');
        grad2.addColorStop(0.5, hex + 'ff'); grad2.addColorStop(0.6, hex + 'aa'); grad2.addColorStop(1, hex + '00');
        ctx.strokeStyle = grad2;
        ctx.beginPath(); ctx.moveTo(r, 0); ctx.lineTo(r, s); ctx.stroke();
        return new THREE.CanvasTexture(cnv);
    }

    /* ═══════════════════════════════════════════════════════════
       1. SPIRAL GALAXY  (deep background, 15 000 stars in arms)
    ═══════════════════════════════════════════════════════════ */
    const GALAXY_COUNT = 15000;
    const gPos = new Float32Array(GALAXY_COUNT * 3);
    const gCol = new Float32Array(GALAXY_COUNT * 3);
    const gSiz = new Float32Array(GALAXY_COUNT);

    const armColors = [
        [0.55, 0.58, 1.00], // indigo
        [0.65, 0.48, 1.00], // violet
        [0.50, 0.70, 1.00], // periwinkle
        [0.88, 0.82, 1.00], // lavender
        [1.00, 1.00, 1.00], // white core
        [0.70, 0.85, 1.00], // blue-white
    ];

    for (let i = 0; i < GALAXY_COUNT; i++) {
        const i3    = i * 3;
        const armId = Math.floor(Math.random() * 3);
        const r     = Math.pow(Math.random(), 0.6) * 350 + 5;
        const angle = (armId / 3) * Math.PI * 2 + r * 0.012 + (Math.random() - 0.5) * 0.8;
        const spread= Math.random() * 18 * (1 - r / 400);

        gPos[i3]     = Math.cos(angle) * r + (Math.random() - 0.5) * spread;
        gPos[i3 + 1] = (Math.random() - 0.5) * (12 + spread * 0.5);
        gPos[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * spread - 300;

        const brightness = Math.random();
        const c = armColors[Math.floor(Math.random() * armColors.length)];
        gCol[i3]     = Math.min(1, c[0] * (0.6 + brightness * 0.4));
        gCol[i3 + 1] = Math.min(1, c[1] * (0.6 + brightness * 0.4));
        gCol[i3 + 2] = Math.min(1, c[2] * (0.6 + brightness * 0.4));
        gSiz[i] = Math.random() < 0.02 ? Math.random() * 1.5 + 1.0 : Math.random() * 0.6 + 0.2;
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    galaxyGeo.setAttribute('color',    new THREE.BufferAttribute(gCol, 3));
    galaxyGeo.setAttribute('size',     new THREE.BufferAttribute(gSiz, 1));
    const galaxyMat = new THREE.PointsMaterial({
        size: 0.7, vertexColors: true, transparent: true, opacity: 0.85,
        sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(galaxy);

    /* ═══════════════════════════════════════════════════════════
       2. LAYERED STAR FIELD  (3 layers for mouse parallax depth)
    ═══════════════════════════════════════════════════════════ */
    const starLayers = [];
    const LAYER_CFGS = [
        { n: 5000, spread: 3000, sz: 0.40, op: 0.80, parallax: 0.5  },
        { n: 1800, spread:  900, sz: 0.75, op: 0.90, parallax: 1.5  },
        { n:  600, spread:  300, sz: 1.40, op: 1.00, parallax: 3.0  },
    ];
    const STAR_COLS = [
        [1.00, 1.00, 1.00],[0.80, 0.88, 1.00],[1.00, 0.92, 0.74],
        [0.70, 0.80, 1.00],[0.92, 0.82, 1.00],[1.00, 0.80, 0.80],
    ];

    LAYER_CFGS.forEach((cfg) => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(cfg.n * 3);
        const col = new Float32Array(cfg.n * 3);
        const siz = new Float32Array(cfg.n);
        for (let i = 0; i < cfg.n; i++) {
            const i3 = i * 3;
            pos[i3]     = (Math.random() - 0.5) * cfg.spread;
            pos[i3 + 1] = (Math.random() - 0.5) * cfg.spread;
            pos[i3 + 2] = (Math.random() - 0.5) * cfg.spread;
            const c     = STAR_COLS[Math.floor(Math.random() * STAR_COLS.length)];
            col[i3]     = c[0]; col[i3+1] = c[1]; col[i3+2] = c[2];
            siz[i] = Math.random() < 0.015 ? Math.random() * 2 + 1 : Math.random() * 0.8 + 0.2;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
        geo.setAttribute('size',     new THREE.BufferAttribute(siz, 1));
        const mat = new THREE.PointsMaterial({
            size: cfg.sz, vertexColors: true, transparent: true, opacity: cfg.op,
            sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const pts = new THREE.Points(geo, mat);
        pts.userData.parallax = cfg.parallax;
        pts.userData.baseRot  = { x: 0, y: 0 };
        scene.add(pts);
        starLayers.push(pts);
    });

    /* ═══════════════════════════════════════════════════════════
       3. TWINKLING BRIGHT STARS  (300 bigger animated ones)
    ═══════════════════════════════════════════════════════════ */
    const twinkleStars = [];
    const TWINKLE_COUNT = 300;
    const twinkleGeo = new THREE.BufferGeometry();
    const twinkPos = new Float32Array(TWINKLE_COUNT * 3);
    const twinkleSiz = new Float32Array(TWINKLE_COUNT);
    const twinkleData = [];

    for (let i = 0; i < TWINKLE_COUNT; i++) {
        const i3 = i * 3;
        twinkPos[i3]     = (Math.random() - 0.5) * 800;
        twinkPos[i3 + 1] = (Math.random() - 0.5) * 800;
        twinkPos[i3 + 2] = (Math.random() - 0.5) * 400 - 50;
        twinkleSiz[i]    = Math.random() * 2.5 + 1.0;
        twinkleData.push({ phase: Math.random() * Math.PI * 2, speed: Math.random() * 0.8 + 0.3 });
    }
    twinkleGeo.setAttribute('position', new THREE.BufferAttribute(twinkPos, 3));
    twinkleGeo.setAttribute('size',     new THREE.BufferAttribute(twinkleSiz, 1));
    const twinkleMat = new THREE.PointsMaterial({
        size: 1.8, color: 0xffffff, transparent: true, opacity: 0.9,
        sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const twinklePoints = new THREE.Points(twinkleGeo, twinkleMat);
    scene.add(twinklePoints);

    /* ═══════════════════════════════════════════════════════════
       4. VOLUMETRIC NEBULA CLOUDS  (15 layered colorful sprites)
    ═══════════════════════════════════════════════════════════ */
    const nebulaDefs = [
        { col: '#6366f1', x: -80,  y:  30, z: -280, s: 320, op: 0.10, soft: 0.25 },
        { col: '#8b5cf6', x:  100, y: -40, z: -360, s: 400, op: 0.08, soft: 0.20 },
        { col: '#1e3a8a', x:   20, y:  70, z: -450, s: 450, op: 0.07, soft: 0.30 },
        { col: '#7c3aed', x: -130, y: -60, z: -230, s: 260, op: 0.12, soft: 0.22 },
        { col: '#0ea5e9', x:   70, y:  55, z: -500, s: 350, op: 0.05, soft: 0.35 },
        { col: '#4f46e5', x:  -45, y: -95, z: -400, s: 300, op: 0.09, soft: 0.28 },
        { col: '#7e22ce', x:  140, y:  20, z: -320, s: 280, op: 0.07, soft: 0.25 },
        { col: '#312e81', x:  -20, y:  90, z: -200, s: 200, op: 0.15, soft: 0.20 },
        { col: '#e879f9', x:   50, y: -70, z: -350, s: 220, op: 0.04, soft: 0.40 },
        { col: '#0c4a6e', x: -110, y:  10, z: -420, s: 380, op: 0.06, soft: 0.30 },
        { col: '#581c87', x:   90, y:  60, z: -260, s: 240, op: 0.08, soft: 0.22 },
        { col: '#1e1b4b', x:  -60, y: -30, z: -150, s: 180, op: 0.18, soft: 0.15 },
        { col: '#4c1d95', x:  160, y: -20, z: -300, s: 310, op: 0.06, soft: 0.32 },
        { col: '#2e1065', x:  -90, y:  50, z: -500, s: 420, op: 0.05, soft: 0.38 },
        { col: '#3730a3', x:   30, y: -50, z: -180, s: 160, op: 0.13, soft: 0.20 },
    ];

    nebulaDefs.forEach((d) => {
        const spr = new THREE.Sprite(new THREE.SpriteMaterial({
            map: makeGlowTex(d.col, 256, d.soft), transparent: true, opacity: d.op,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        spr.position.set(d.x, d.y, d.z);
        spr.scale.set(d.s, d.s, 1);
        scene.add(spr);
    });

    /* ═══════════════════════════════════════════════════════════
       5. LENS-FLARE BRIGHT STARS  (10 prominent stars)
    ═══════════════════════════════════════════════════════════ */
    const brightStarDefs = [
        { col: '#ffffff', x: -120, y:  60, z: -100, s: 18 },
        { col: '#aac4ff', x:  150, y: -30, z:  -80, s: 12 },
        { col: '#ffd4a3', x:  -40, y: -80, z:  -60, s: 10 },
        { col: '#c4b5fd', x:   80, y:  90, z: -140, s: 14 },
        { col: '#ffffff', x: -170, y:  20, z: -120, s:  8 },
        { col: '#bfdbfe', x:  120, y: -90, z:  -50, s:  9 },
        { col: '#fde68a', x:  -80, y:  50, z:  -90, s: 11 },
        { col: '#ddd6fe', x:   30, y: 100, z: -110, s: 13 },
        { col: '#a5f3fc', x: -150, y: -50, z:  -70, s:  7 },
        { col: '#ffffff', x:   60, y: -60, z: -130, s:  9 },
    ];
    const brightStarObjs = [];
    brightStarDefs.forEach((d) => {
        const spr = new THREE.Sprite(new THREE.SpriteMaterial({
            map: makeLensFlare(d.col, 128), transparent: true, opacity: 0.9,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        spr.position.set(d.x, d.y, d.z);
        spr.scale.set(d.s, d.s, 1);
        spr.userData.baseOpacity = 0.9;
        spr.userData.phase = Math.random() * Math.PI * 2;
        scene.add(spr);
        brightStarObjs.push(spr);
    });

    /* ═══════════════════════════════════════════════════════════
       6. GAS GIANT PLANET  (banded surface + layered glow + rings)
    ═══════════════════════════════════════════════════════════ */
    const planetGroup = new THREE.Group();
    planetGroup.position.set(55, 14, -80);
    scene.add(planetGroup);

    // Planet body with banded texture simulation
    const pGeo = new THREE.SphereGeometry(18, 64, 64);
    function makePlanetTexture() {
        const size = 512, cnv = document.createElement('canvas');
        cnv.width = size; cnv.height = size;
        const ctx = cnv.getContext('2d');
        // Deep space base
        ctx.fillStyle = '#0d0530'; ctx.fillRect(0, 0, size, size);
        // Banded atmosphere
        const bands = [
            { y: 0.0,  h: 0.10, col: '#1a0e5e', op: 0.9 },
            { y: 0.10, h: 0.06, col: '#2d1b8a', op: 0.8 },
            { y: 0.16, h: 0.08, col: '#3730a3', op: 0.7 },
            { y: 0.24, h: 0.05, col: '#4338ca', op: 0.9 },
            { y: 0.29, h: 0.10, col: '#1e1b4b', op: 0.8 },
            { y: 0.39, h: 0.04, col: '#6366f1', op: 0.6 },
            { y: 0.43, h: 0.14, col: '#312e81', op: 0.9 },
            { y: 0.57, h: 0.06, col: '#4f46e5', op: 0.7 },
            { y: 0.63, h: 0.12, col: '#1e1b4b', op: 0.85 },
            { y: 0.75, h: 0.10, col: '#2d1b8a', op: 0.8 },
            { y: 0.85, h: 0.08, col: '#1a0e5e', op: 0.9 },
            { y: 0.93, h: 0.07, col: '#0d0530', op: 1.0 },
        ];
        bands.forEach(b => {
            ctx.globalAlpha = b.op;
            const g = ctx.createLinearGradient(0, b.y * size, 0, (b.y + b.h) * size);
            g.addColorStop(0, b.col); g.addColorStop(0.5, b.col + 'cc'); g.addColorStop(1, b.col);
            ctx.fillStyle = g; ctx.fillRect(0, b.y * size, size, b.h * size);
        });
        // Storm spots
        ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.4;
        [[0.35, 0.42], [0.55, 0.65], [0.15, 0.75]].forEach(([cx, cy]) => {
            const sg = ctx.createRadialGradient(cx*size, cy*size, 0, cx*size, cy*size, 30);
            sg.addColorStop(0, '#818cf888'); sg.addColorStop(1, '#00000000');
            ctx.fillStyle = sg; ctx.fillRect(0, 0, size, size);
        });
        return new THREE.CanvasTexture(cnv);
    }

    const planet = new THREE.Mesh(pGeo, new THREE.MeshStandardMaterial({
        map: makePlanetTexture(), emissive: 0x1a0860, emissiveIntensity: 0.35,
        roughness: 0.85, metalness: 0.0,
    }));
    planetGroup.add(planet);

    // Layered atmospheric glow sprites
    [
        { s: 48,  op: 0.45, col: '#6366f1' },
        { s: 70,  op: 0.20, col: '#4338ca' },
        { s: 100, op: 0.10, col: '#312e81' },
        { s: 140, op: 0.05, col: '#1e1b4b' },
    ].forEach(({ s, op, col }) => {
        const atm = new THREE.Sprite(new THREE.SpriteMaterial({
            map: makeGlowTex(col, 256, 0.15), transparent: true, opacity: op,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        atm.scale.set(s, s, 1);
        planetGroup.add(atm);
    });

    // Multi-band ring system
    [
        { ri: 21, ro: 28, col: 0x8b7cf8, op: 0.35 },
        { ri: 29, ro: 33, col: 0x6366f1, op: 0.20 },
        { ri: 35, ro: 40, col: 0x4f46e5, op: 0.14 },
        { ri: 42, ro: 45, col: 0x4338ca, op: 0.08 },
        { ri: 47, ro: 49, col: 0x3730a3, op: 0.05 },
    ].forEach(({ ri, ro, col, op }) => {
        const r = new THREE.Mesh(
            new THREE.RingGeometry(ri, ro, 128),
            new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false })
        );
        r.rotation.x = Math.PI / 2.4; r.rotation.z = 0.15;
        planetGroup.add(r);
    });

    // Lights
    const pLight = new THREE.PointLight(0x6060ff, 3.5, 300);
    pLight.position.set(30, 20, 40);
    scene.add(pLight);
    const pLight2 = new THREE.PointLight(0x8b5cf6, 1.2, 200);
    pLight2.position.set(-40, -10, 50);
    scene.add(pLight2);
    scene.add(new THREE.AmbientLight(0x050515, 2.5));

    /* ═══════════════════════════════════════════════════════════
       7. ORBITING MOON  with glow halo
    ═══════════════════════════════════════════════════════════ */
    const moon = new THREE.Mesh(
        new THREE.SphereGeometry(3.5, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x8890b8, roughness: 0.88, emissive: 0x1a1a3a, emissiveIntensity: 0.3 })
    );
    scene.add(moon);
    const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeGlowTex('#818cf8', 64, 0.2), transparent: true, opacity: 0.30,
        blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    moonGlow.scale.set(18, 18, 1);
    moon.add(moonGlow);
    let moonAngle = 0;

    /* ═══════════════════════════════════════════════════════════
       8. ASTEROID BELT  (250 varied rocks)
    ═══════════════════════════════════════════════════════════ */
    const asteroids   = [];
    const beltCentre  = new THREE.Vector3(55, 14, -80);
    const BELT_N      = 250;
    const BELT_R      = 62;
    const rockColors  = [0x3d3560, 0x4a4070, 0x2e2a50, 0x564880, 0x332a5a];
    const rockGeos    = [
        new THREE.DodecahedronGeometry(1, 0),
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
    ];

    for (let i = 0; i < BELT_N; i++) {
        const angle = (i / BELT_N) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const r     = BELT_R + (Math.random() - 0.5) * 22;
        const s     = Math.random() * 0.7 + 0.12;
        const geo   = rockGeos[Math.floor(Math.random() * rockGeos.length)].clone();
        const mesh  = new THREE.Mesh(
            geo,
            new THREE.MeshStandardMaterial({
                color: rockColors[Math.floor(Math.random() * rockColors.length)],
                roughness: 0.95, metalness: 0.05,
            })
        );
        mesh.scale.set(s * (0.8 + Math.random() * 0.4), s, s * (0.8 + Math.random() * 0.4));
        mesh.position.set(
            beltCentre.x + Math.cos(angle) * r,
            beltCentre.y + (Math.random() - 0.5) * 8,
            beltCentre.z + Math.sin(angle) * r
        );
        mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
        mesh.userData = {
            angle, r,
            spd:  (Math.random() * 0.0003 + 0.00008) * (Math.random() < 0.5 ? 1 : -1),
            yOff: (Math.random() - 0.5) * 8,
            rx: (Math.random() - 0.5) * 0.022,
            ry: (Math.random() - 0.5) * 0.022,
        };
        scene.add(mesh);
        asteroids.push(mesh);
    }

    /* ═══════════════════════════════════════════════════════════
       9. SECOND & THIRD PLANET  (distant, smaller)
    ═══════════════════════════════════════════════════════════ */
    function makeSmallPlanet(color, emColor, x, y, z, radius, glowCol, glowScale) {
        const grp = new THREE.Group();
        grp.add(new THREE.Mesh(
            new THREE.SphereGeometry(radius, 32, 32),
            new THREE.MeshStandardMaterial({ color, emissive: emColor, emissiveIntensity: 0.40, roughness: 0.80 })
        ));
        const g = new THREE.Sprite(new THREE.SpriteMaterial({
            map: makeGlowTex(glowCol, 128, 0.2), transparent: true, opacity: 0.25,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        g.scale.set(glowScale, glowScale, 1);
        grp.add(g);
        grp.position.set(x, y, z);
        scene.add(grp);
        return grp;
    }
    const planet2 = makeSmallPlanet(0x7c3aed, 0x3b0f72, -85, -28, -200, 6.5, '#7c3aed', 38);
    const planet3 = makeSmallPlanet(0x0e7490, 0x0c4a6e, 130, -55, -250, 4.5, '#0ea5e9', 28);

    // Orbit parameters for distant planets
    // planet2 orbits a centre left of scene, tilted plane
    planet2.userData.orbit = {
        cx: -20, cy: 0,  cz: -220,  // orbit centre
        rx: 90,  rz: 55,            // X and Z radii (ellipse)
        inclination: 0.28,          // tilt of orbit plane (radians)
        angle: 0,                   // current angle
        speed: 0.0018,              // radians per frame
        axisSpeed: 0.0009,          // self-spin speed
    };
    // planet3 orbits a centre right of scene, steeper inclination
    planet3.userData.orbit = {
        cx: 40,  cy: 10, cz: -260,
        rx: 110, rz: 70,
        inclination: -0.38,
        angle: Math.PI,             // start on opposite side
        speed: 0.0012,
        axisSpeed: 0.0014,
    };

    /* ═══════════════════════════════════════════════════════════
       10. SPACE DUST  (fine particles near camera for depth)
    ═══════════════════════════════════════════════════════════ */
    const DUST_N   = 800;
    const dustGeo  = new THREE.BufferGeometry();
    const dustPos  = new Float32Array(DUST_N * 3);
    const dustVel  = [];
    for (let i = 0; i < DUST_N; i++) {
        const i3 = i * 3;
        dustPos[i3]     = (Math.random() - 0.5) * 280;
        dustPos[i3 + 1] = (Math.random() - 0.5) * 180;
        dustPos[i3 + 2] = Math.random() * 80 - 20; // near camera
        dustVel.push((Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008, 0);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
        size: 0.25, color: 0xaabbff, transparent: true, opacity: 0.35,
        sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    /* ═══════════════════════════════════════════════════════════
       11. GRADIENT METEOR TRAILS  (dramatic shooting stars)
    ═══════════════════════════════════════════════════════════ */
    const meteors    = [];
    const MAX_M      = 10;
    let   meteorTimer = 0;

    function makeMeteorTexture(col) {
        const cnv = document.createElement('canvas'); cnv.width = 128; cnv.height = 4;
        const ctx = cnv.getContext('2d');
        const g = ctx.createLinearGradient(0, 0, 128, 0);
        g.addColorStop(0,   '#00000000');
        g.addColorStop(0.5, col + '88');
        g.addColorStop(0.85,col + 'ff');
        g.addColorStop(1,   '#ffffffff');
        ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 4);
        return new THREE.CanvasTexture(cnv);
    }

    const meteorColours = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ffffff'];

    function spawnMeteor() {
        const col = meteorColours[Math.floor(Math.random() * meteorColours.length)];
        const len = Math.random() * 35 + 20;
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(len, Math.random() * 0.8 + 0.3),
            new THREE.MeshBasicMaterial({
                map: makeMeteorTexture(col), transparent: true, opacity: 0,
                blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
            })
        );
        plane.position.set((Math.random() - 0.5) * 300, Math.random() * 100 + 40, (Math.random() - 0.5) * 100 - 20);
        const angle = -(Math.PI / 5 + Math.random() * 0.5);
        plane.rotation.z = angle;
        scene.add(plane);
        meteors.push({
            mesh: plane,
            vx: -(Math.random() * 3.0 + 2.0) * Math.cos(-angle - Math.PI / 2),
            vy: -(Math.random() * 2.0 + 1.0),
            life: 0, maxLife: Math.floor(Math.random() * 70 + 50),
        });
    }

    /* ═══════════════════════════════════════════════════════════
       12. COSMIC WEB / LIGHT STREAKS  (subtle background lines)
    ═══════════════════════════════════════════════════════════ */
    const WEB_N = 30;
    for (let i = 0; i < WEB_N; i++) {
        const pts = [];
        let x = (Math.random() - 0.5) * 800, y = (Math.random() - 0.5) * 400;
        const z = -(Math.random() * 200 + 200);
        pts.push(new THREE.Vector3(x, y, z));
        for (let j = 0; j < 3; j++) {
            x += (Math.random() - 0.5) * 200;
            y += (Math.random() - 0.5) * 100;
            pts.push(new THREE.Vector3(x, y, z));
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x4f46e5, transparent: true,
            opacity: Math.random() * 0.05 + 0.01,
            blending: THREE.AdditiveBlending, depthWrite: false,
        });
        scene.add(new THREE.Line(lineGeo, lineMat));
    }

    /* ═══════════════════════════════════════════════════════════
       ANIMATION LOOP
    ═══════════════════════════════════════════════════════════ */
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        meteorTimer++;

        // ── Smooth mouse camera parallax ─────────────────────
        mouse.x += (mouse.tx - mouse.x) * 0.022;
        mouse.y += (mouse.ty - mouse.y) * 0.022;

        // ── Scroll momentum system ────────────────────────────
        // Compute per-frame scroll velocity
        scrollVel     = rawScrollY - prevRawScrollY;
        prevRawScrollY = rawScrollY;
        // Smooth the raw scroll into scrollCurrent
        scrollCurrent += (rawScrollY - scrollCurrent) * 0.06;
        const sc = scrollCurrent; // shorthand

        // How far through the page (0 → 1)
        const pageProgress = sc / Math.max(1, document.body.scrollHeight - window.innerHeight);

        // Camera FLIES FORWARD through space as user scrolls down
        // Z goes from 130 (start) → 30 (bottom of page) — feels like FLY-THROUGH
        const targetZ  = 130 - pageProgress * 100;
        const targetY  = mouse.y * 12 - sc * 0.04;   // scene drifts up
        const velTilt  = scrollVel * 0.12;             // lean forward/back on fast scroll

        camera.position.x  = mouse.x * 18;
        camera.position.y  = targetY;
        camera.position.z  = targetZ;
        camera.rotation.x  = velTilt * 0.015;          // brief tilt on scroll burst
        camera.lookAt(0, targetY * 0.1, 0);

        // ── Star layers — parallax: mouse X/Y + scroll Y ─────
        starLayers.forEach((layer) => {
            layer.position.x = -mouse.x * layer.userData.parallax * 2;
            layer.position.y = -mouse.y * layer.userData.parallax * 1.2 - sc * 0.015 * layer.userData.parallax;
            layer.rotation.y += 0.00012;
        });

        // ── Galaxy — scroll tilts + rotates it ───────────────
        galaxy.rotation.y = t * 0.006 + sc * 0.0003;
        galaxy.rotation.x = Math.sin(t * 0.004) * 0.05 + sc * 0.00015;
        galaxy.position.y = -sc * 0.025;   // galaxy drifts upward as you scroll

        // ── Twinkling stars ───────────────────────────────────
        const tSizArr = twinkleGeo.attributes.size.array;
        twinkleData.forEach((td, i) => {
            const base = twinkleSiz[i];
            tSizArr[i] = base * (0.75 + 0.5 * Math.abs(Math.sin(t * td.speed + td.phase)));
        });
        twinkleGeo.attributes.size.needsUpdate = true;
        twinkleMat.opacity = 0.8 + 0.2 * Math.sin(t * 0.3);

        // ── Bright star flicker ───────────────────────────────
        brightStarObjs.forEach((s) => {
            s.material.opacity = s.userData.baseOpacity *
                (0.85 + 0.15 * Math.sin(t * 1.2 + s.userData.phase));
        });

        // -- Planet animation + scroll parallax
        planet.rotation.y     += 0.0010;
        planet.rotation.z      = Math.sin(t * 0.05) * 0.02;
        planetGroup.rotation.y = Math.sin(t * 0.06) * 0.04;
        planetGroup.position.y = 14 + Math.sin(t * 0.18) * 1.2 - sc * 0.020;
        planetGroup.position.z = -80 - sc * 0.012;
        pLight.intensity  = 3.5 + Math.sin(t * 1.5) * 0.8;
        pLight2.intensity = 1.2 + Math.sin(t * 0.9 + 1) * 0.3;

        // ── Asteroid belt orbit ───────────────────────────────
        asteroids.forEach((ast) => {
            ast.userData.angle += ast.userData.spd;
            const a = ast.userData.angle, r = ast.userData.r;
            ast.position.set(
                beltCentre.x + Math.cos(a) * r,
                beltCentre.y + ast.userData.yOff + Math.sin(t * 0.22 + a) * 0.6,
                beltCentre.z + Math.sin(a) * r
            );
            ast.rotation.x += ast.userData.rx;
            ast.rotation.y += ast.userData.ry;
        });

        // ── Moon orbit ────────────────────────────────────────
        moonAngle += 0.0025;
        moon.position.set(
            beltCentre.x + Math.cos(moonAngle) * 50,
            beltCentre.y + Math.sin(moonAngle * 0.4) * 12,
            beltCentre.z + Math.sin(moonAngle) * 50
        );
        moon.rotation.y += 0.004;

        // -- Distant planets: ORBITAL REVOLUTION + scroll parallax
        [planet2, planet3].forEach((p) => {
            const o = p.userData.orbit;
            o.angle += o.speed;

            // Elliptical orbit in XZ plane, then tilt by inclination
            const localX = Math.cos(o.angle) * o.rx;
            const localZ = Math.sin(o.angle) * o.rz;

            // Apply inclination: rotate around X axis
            p.position.x = o.cx + localX;
            p.position.y = o.cy + localZ * Math.sin(o.inclination) - sc * (p === planet2 ? 0.012 : 0.008);
            p.position.z = o.cz + localZ * Math.cos(o.inclination);

            // Self-spin (axis rotation)
            p.children[0].rotation.y += o.axisSpeed;
            // Glow sprite doesn't need rotation (always faces camera)
        });

        // ── Space dust drift ──────────────────────────────────
        const dp = dustGeo.attributes.position.array;
        for (let i = 0; i < DUST_N; i++) {
            const i3 = i * 3;
            dp[i3]     += dustVel[i3]     + mouse.tx * 0.008;
            dp[i3 + 1] += dustVel[i3 + 1] + mouse.ty * 0.008;
            if (Math.abs(dp[i3])     > 140) dp[i3]     *= -0.98;
            if (Math.abs(dp[i3 + 1]) > 90)  dp[i3 + 1] *= -0.98;
        }
        dustGeo.attributes.position.needsUpdate = true;

        // ── Shooting meteors ──────────────────────────────────
        if (meteorTimer % 75 === 0 && meteors.length < MAX_M) spawnMeteor();
        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.life++;
            m.mesh.position.x += m.vx;
            m.mesh.position.y += m.vy;
            const p = m.life / m.maxLife;
            m.mesh.material.opacity = (p < 0.15 ? p / 0.15 : p > 0.75 ? (1 - p) / 0.25 : 1) * 0.95;
            if (m.life >= m.maxLife) { scene.remove(m.mesh); meteors.splice(i, 1); }
        }

        renderer.render(scene, camera);
    }

    animate();

    // ── Resize ────────────────────────────────────────────────
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

/* =========================================================
   ROBUST WEB AUDIO SYSTEM
   — music.mp3 + Synthesized SFX (Web Audio API)
   — Automatic fallback to Space Drone if MP3 fails
   ========================================================= */
(function initSoundSystem() {
    let audioCtx      = null;
    let masterGain    = null;
    let musicGain     = null;
    let musicSource   = null;
    let fallbackNodes = [];
    let isMuted       = false;
    let isInitialized = false;

    // Load music.mp3 early (but don't play yet)
    const bgMusic = new Audio('music.mp3');
    bgMusic.loop     = true;
    bgMusic.preload  = 'auto';

    /* -- Sound Toggle Button UI */
    const soundBtn = document.createElement('button');
    soundBtn.id        = 'sound-toggle';
    soundBtn.title     = 'Mute Sound Effects';
    soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    soundBtn.classList.add('active-sound');
    document.body.appendChild(soundBtn);

    function initAudio() {
        if (isInitialized) return;
        isInitialized = true;

        audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.connect(audioCtx.destination);
        
        musicGain = audioCtx.createGain();
        musicGain.connect(masterGain);

        // Routing bgMusic through AudioContext for better control
        try {
            musicSource = audioCtx.createMediaElementSource(bgMusic);
            musicSource.connect(musicGain);
        } catch (e) { console.warn("Audio element routing failed (already connected?)"); }

        // Set initial volumes
        masterGain.gain.setValueAtTime(isMuted ? 0 : 0.45, audioCtx.currentTime);
        musicGain.gain.setValueAtTime(0, audioCtx.currentTime);

        if (!isMuted) startMusicTrack();
    }

    /* -- Music Controls */
    function startMusicTrack() {
        if (!bgMusic) return;
        bgMusic.play().then(() => {
            // Smooth fade-in
            if (musicGain) {
                musicGain.gain.cancelScheduledValues(audioCtx.currentTime);
                musicGain.gain.setTargetAtTime(0.6, audioCtx.currentTime, 1.5);
            }
        }).catch(err => {
            console.error("music.mp3 blocked or missing, using fallback drone.");
            startFallbackDrone();
        });
    }

    function stopMusicTrack() {
        if (musicGain) {
            musicGain.gain.cancelScheduledValues(audioCtx.currentTime);
            musicGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.5);
            setTimeout(() => { if (isMuted) bgMusic.pause(); }, 600);
        } else {
            bgMusic.pause();
        }
        stopFallbackDrone();
    }

    /* -- Fallback Synthesizer (Space Drone) */
    function startFallbackDrone() {
        if (fallbackNodes.length > 0) return;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const filt = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();

        osc1.type = 'sine'; osc1.frequency.value = 42;
        osc2.type = 'sine'; osc2.frequency.value = 63;
        filt.type = 'lowpass'; filt.frequency.value = 180;
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 3);

        osc1.connect(filt); osc2.connect(filt); filt.connect(gain);
        gain.connect(masterGain);
        
        osc1.start(); osc2.start();
        fallbackNodes = [osc1, osc2, filt, gain];
    }

    function stopFallbackDrone() {
        fallbackNodes.forEach(node => {
            try { node.stop(); } catch(e) {}
            try { node.disconnect(); } catch(e) {}
        });
        fallbackNodes = [];
    }

    /* -- SFX Generators */
    function playHover() {
        if (!isInitialized || isMuted) return;
        const osc  = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain); gain.connect(masterGain);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    }

    function playClick() {
        if (!isInitialized || isMuted) return;
        const osc  = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine'; osc.frequency.value = 440;
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.connect(gain); gain.connect(masterGain);
        osc.start(); osc.stop(audioCtx.currentTime + 0.15);
    }

    function playScrollWhoosh(vel) {
        if (!isInitialized || isMuted) return;
        const ac = audioCtx.currentTime;
        const dur = 0.4;
        const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * dur, audioCtx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const src = audioCtx.createBufferSource();
        const filt = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();

        filt.type = 'bandpass'; filt.frequency.value = 400; filt.Q.value = 0.5;
        filt.frequency.exponentialRampToValueAtTime(vel > 0 ? 800 : 200, ac + dur);
        
        src.buffer = buf;
        gain.gain.setValueAtTime(Math.min(0.08, Math.abs(vel) * 0.002), ac);
        gain.gain.exponentialRampToValueAtTime(0.001, ac + dur);
        src.connect(filt); filt.connect(gain); gain.connect(masterGain);
        src.start();
    }

    function playPing() {
        if (!isInitialized || isMuted) return;
        [1200, 900, 600].forEach((f, i) => {
            const t = audioCtx.currentTime + (i * 0.1);
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.value = f;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.05, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.connect(gain); gain.connect(masterGain);
            osc.start(t); osc.stop(t + 0.5);
        });
    }

    /* -- Mute/Unmute & UI */
    function setMuted(mute) {
        isMuted = mute;
        if (!isInitialized) return;
        updateBtn();
        if (isMuted) {
            masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
            stopMusicTrack();
        } else {
            masterGain.gain.setTargetAtTime(0.45, audioCtx.currentTime, 0.2);
            startMusicTrack();
        }
    }

    function updateBtn() {
        if (isMuted) {
            soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            soundBtn.classList.add('muted');
            soundBtn.classList.remove('active-sound');
        } else {
            soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            soundBtn.classList.remove('muted');
            soundBtn.classList.add('active-sound');
        }
    }

    soundBtn.addEventListener('click', () => {
        initAudio();
        setMuted(!isMuted);
    });

    /* -- System Listeners */
    function attachSFX() {
        document.querySelectorAll('.nav-link, .btn, .skill-tab, .project-link, .social-link, .hamburger').forEach(el => {
            el.addEventListener('mouseenter', playHover);
            el.addEventListener('click', playClick);
        });
        const pingObs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { playPing(); pingObs.unobserve(e.target); }});
        }, { threshold: 0.1 });
        document.querySelectorAll('.project-card, .achievement-card, .leadership-card').forEach(el => pingObs.observe(el));
    }

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const vel = window.scrollY - lastScroll;
        lastScroll = window.scrollY;
        if (Math.abs(vel) > 6) playScrollWhoosh(vel);
    });

    document.addEventListener('DOMContentLoaded', attachSFX);

    // Initial Wake-up on Gesture
    const wakeUp = () => {
        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        if (!isMuted && bgMusic.paused) bgMusic.play().catch(() => {});
    };
    ['click', 'scroll', 'keydown', 'touchstart'].forEach(evt => window.addEventListener(evt, wakeUp, { once: true }));

    window.spaceSounds = { playHover, playClick, playPing };
})();


// TYPEWRITER EFFECT
// ─────────────────────────────────────────────────────────────
const titles = [
    'Full Stack Developer',
    'AI & ML Enthusiast',
    'Problem Solver'
];
let titleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter');

function typeWriter() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed  = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeWriter);

// ─────────────────────────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
    const loader       = document.getElementById('loader');
    const loadingVideo = document.querySelector('.loading-video');
    if (loadingVideo) {
        loadingVideo.addEventListener('ended', () => loader.classList.add('hidden'));
        setTimeout(() => loader.classList.add('hidden'), 5000);
    } else {
        setTimeout(() => loader.classList.add('hidden'), 3000);
    }
});

// ─────────────────────────────────────────────────────────────
// NAV MENU TOGGLE
// ─────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// ─────────────────────────────────────────────────────────────
// SMOOTH SCROLLING
// ─────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ─────────────────────────────────────────────────────────────
// NAVBAR SCROLL EFFECT
// ─────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 10, 0.92)';
        navbar.style.boxShadow  = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(0, 0, 10, 0.7)';
        navbar.style.boxShadow  = 'none';
    }
});

// ─────────────────────────────────────────────────────────────
// SCROLL REVEAL ANIMATIONS
// ─────────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card, .stat-card, .achievement-card, .leadership-card, .about-card, .skill-category').forEach(el => {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const skillTabs    = document.querySelectorAll('.skill-tab');
    const skillPlanets = document.querySelectorAll('.skill-planet');
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            skillPlanets.forEach((planet, index) => {
                if (category === 'all' || planet.dataset.category === category) {
                    planet.classList.remove('hidden');
                    planet.style.animationDelay = `${index * 0.04}s`;
                    planet.style.animation = 'none';
                    planet.offsetHeight;
                    planet.style.animation = '';
                } else {
                    planet.classList.add('hidden');
                }
            });
        });
    });
});

// ─────────────────────────────────────────────────────────────
// EMAILJS CONTACT FORM
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'akula_narendra_kumar';
const EMAILJS_TEMPLATE_ID = 'narendra_20';
const EMAILJS_PUBLIC_KEY  = 'vfqFW58u_BZT7lg0G';
(function () { emailjs.init(EMAILJS_PUBLIC_KEY); })();

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn       = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML   = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled    = true;
        try {
            const response = await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            alert('Sorry, there was an error. Please try again later.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled  = false;
        }
    });
}

// ─────────────────────────────────────────────────────────────
// ACTIVE NAV HIGHLIGHTING
// ─────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current    = '';
    sections.forEach(s => { if (scrollY >= (s.offsetTop - 200)) current = s.getAttribute('id'); });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// ─────────────────────────────────────────────────────────────
// KEYBOARD / RESIZE HELPERS
// ─────────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});
