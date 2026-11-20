// figure.js: a hand-built 3D figure of Hashir for the HELLO block.
// Black Nexlyr polo with the cyan trim, baggy cargo pants, chunky white sneakers, a watch on the left wrist.
// It turns slowly on a round plinth; drag (or swipe) to spin it. Loaded only when the block comes near the screen.
import * as THREE from './vendor/three/three.min.js';
import { RoundedBoxGeometry } from './vendor/three/RoundedBoxGeometry.js';
import { GLTFLoader } from './vendor/three/GLTFLoader.js';

// If a real scan of Hashir exists at hashir.glb, it replaces the hand-built figure (same plinth, light and spin).
const MODEL_URL = 'hashir.glb';

export function mountFigure(box) {
  const canvas = document.createElement('canvas');
  canvas.className = 'fig3d';
  canvas.setAttribute('aria-hidden', 'true');
  box.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 3 / 4, .1, 50);
  camera.position.set(0, 1.18, 6.6);
  camera.lookAt(0, 1.0, 0);

  /* light: soft studio key, a fill, a cyan rim (the Nexlyr colour) and a red kicker (the page accent) */
  scene.add(new THREE.HemisphereLight(0xfff7ee, 0x3a3634, 1.25));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(2.2, 4.2, 3.2); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -1.4, right: 1.4, top: 2.6, bottom: -.4, near: .5, far: 12 });
  key.shadow.radius = 3; key.shadow.bias = -.0006;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x22c7f5, 2.2); rim.position.set(-3, 2.4, -2.6); scene.add(rim);
  const kick = new THREE.DirectionalLight(0xe3262b, .9); kick.position.set(3, .6, -3); scene.add(kick);

  /* materials */
  const M = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .62, metalness: 0, ...o });
  const skin = M(0xd9a582, { roughness: .55 });
  const skinShade = M(0xc48f6d, { roughness: .6 });
  const polo = M(0x121214, { roughness: .82 });
  const cyan = M(0x16b8ee, { roughness: .45, emissive: 0x0a5f7a, emissiveIntensity: .25 });
  const pants = M(0x47464b, { roughness: .9 });
  const pantsDeep = M(0x38373b, { roughness: .92 });
  const sneaker = M(0xf2efe9, { roughness: .55 });
  const sole = M(0xe1ddd5, { roughness: .7 });
  const grey = M(0x8d8c8a, { roughness: .6 });
  const hair = M(0x1d1511, { roughness: .78 });
  const dark = M(0x111111, { roughness: .4 });
  const white = M(0xffffff, { roughness: .2 });
  const steel = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: .9, roughness: .25 });
  const ink = M(0x111111, { roughness: .9 });
  const red = M(0xe3262b, { roughness: .5 });

  const fig = new THREE.Group();
  scene.add(fig);
  const add = (geo, mat, x = 0, y = 0, z = 0, parent = fig) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  };
  const lathe = (pts, seg = 40) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);

  /* plinth */
  const plinth = add(new THREE.CylinderGeometry(.82, .86, .1, 64), ink, 0, -.05, 0); plinth.castShadow = false;
  add(new THREE.TorusGeometry(.84, .012, 8, 96), red, 0, 0, 0).rotation.x = Math.PI / 2;

  /* sneakers: chunky sole, rounded upper, grey heel tab */
  for (const s of [-1, 1]) {
    const shoe = new THREE.Group(); shoe.position.set(s * .17, 0, .04); shoe.rotation.y = s * .12; fig.add(shoe);
    add(new RoundedBoxGeometry(.2, .07, .42, 3, .03), sole, 0, .035, .02, shoe);
    add(new RoundedBoxGeometry(.18, .12, .36, 4, .06), sneaker, 0, .12, 0, shoe);
    add(new RoundedBoxGeometry(.16, .07, .16, 3, .035), sneaker, 0, .19, -.08, shoe);
    add(new RoundedBoxGeometry(.06, .08, .03, 2, .012), grey, 0, .16, -.19, shoe);
    add(new RoundedBoxGeometry(.19, .018, .3, 2, .008), grey, 0, .075, .03, shoe);   // midsole line
  }

  /* baggy cargo pants: wide legs that stack at the ankle, side pockets, a waistband */
  for (const s of [-1, 1]) {
    const leg = add(lathe([[.0, 0], [.13, 0], [.155, .04], [.15, .1], [.158, .16], [.15, .26], [.152, .4], [.155, .55], [.16, .7], [.165, .82], [.16, .9], [0, .9]]), pants, s * .165, .16, 0);
    leg.rotation.z = s * .025;
    for (const y of [.03, .1]) add(new THREE.TorusGeometry(.152, .016, 8, 32), pantsDeep, s * .165, .16 + y, 0).rotation.x = Math.PI / 2;   // stacked hem
    add(new RoundedBoxGeometry(.05, .2, .15, 2, .02), pantsDeep, s * .32, .62, .01);   // cargo pocket
    add(new RoundedBoxGeometry(.052, .03, .155, 2, .01), pants, s * .322, .73, .01);   // pocket flap
  }
  add(lathe([[0, 0], [.31, 0], [.315, .1], [.3, .14], [0, .14]]), pants, 0, .96, 0).scale.z = .6;

  /* polo: torso lathe, short sleeves with the cyan trim, collar points, cyan placket, Nexlyr mark */
  const torso = new THREE.Group(); torso.position.y = 1.02; fig.add(torso);
  const body = add(lathe([[0, 0], [.345, 0], [.34, .1], [.32, .25], [.33, .42], [.355, .56], [.34, .63], [.27, .69], [.12, .72], [0, .72]], 48), polo, 0, 0, 0, torso);
  body.scale.z = .68;
    add(new RoundedBoxGeometry(.05, .24, .012, 2, .005), cyan, 0, .52, .228, torso);   // placket
  add(new THREE.SphereGeometry(.01, 10, 8), dark, 0, .55, .236, torso);
  add(new THREE.SphereGeometry(.01, 10, 8), dark, 0, .47, .236, torso);
  for (const s of [-1, 1]) {
    const c = add(new RoundedBoxGeometry(.15, .1, .02, 2, .008), polo, s * .075, .63, .225, torso);
    c.rotation.set(-.3, 0, s * -.7); c.position.y = .665;
    const tip = add(new RoundedBoxGeometry(.15, .012, .022, 1, .004), cyan, s * .085, .6, .23, torso);
    tip.rotation.set(-.3, 0, s * -.7); tip.position.set(s * .088, .635, .236);
  }
  const markTex = new THREE.TextureLoader().load('nexlyr-mark.png'); markTex.colorSpace = THREE.SRGBColorSpace; markTex.anisotropy = 4;
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(.1, .1), new THREE.MeshStandardMaterial({ map: markTex, transparent: true, roughness: .5 }));
  mark.position.set(-.15, .5, .22); mark.rotation.y = -.3; torso.add(mark);

  /* neck + arms */
  add(new THREE.CylinderGeometry(.07, .08, .2, 24), skin, 0, .78, 0, torso);
  const arms = [];
  for (const s of [-1, 1]) {
    const shoulder = new THREE.Group(); shoulder.position.set(s * .36, .6, 0); shoulder.rotation.z = s * .14; torso.add(shoulder);
    const sleeve = add(lathe([[.0, 0], [.11, 0], [.115, -.05], [.105, -.2], [0, -.2]], 28), polo, 0, 0, 0, shoulder);
    add(new THREE.TorusGeometry(.103, .013, 8, 28), cyan, 0, -.19, 0, shoulder).rotation.x = Math.PI / 2;
    add(new THREE.CapsuleGeometry(.065, .2, 6, 16), skin, 0, -.3, 0, shoulder);
    const elbow = new THREE.Group(); elbow.position.y = -.42; shoulder.add(elbow);
    add(new THREE.CapsuleGeometry(.058, .22, 6, 16), skin, 0, -.13, 0, elbow);
    add(new THREE.SphereGeometry(.068, 16, 12), skin, 0, -.29, .005, elbow).scale.set(.85, 1.15, .7);   // hand
    if (s === -1) {   // his watch is on the left wrist
      add(new THREE.CylinderGeometry(.064, .064, .045, 24), dark, 0, -.21, 0, elbow);
      const face = add(new THREE.CylinderGeometry(.038, .038, .02, 24), steel, -.06, -.21, 0, elbow); face.rotation.z = Math.PI / 2;
      add(new THREE.CylinderGeometry(.03, .03, .022, 24), dark, -.062, -.21, 0, elbow).rotation.z = Math.PI / 2;
    }
    arms.push({ shoulder, elbow, s });
  }
  arms[0].elbow.rotation.set(-.3, 0, .12); arms[1].elbow.rotation.set(-.26, 0, -.12);

  /* head: toy proportions, swept-up hair, brows, eyes, mustache, ears */
  const head = new THREE.Group(); head.position.set(0, 1.04, .01); head.scale.setScalar(1.08); torso.add(head);
  add(new THREE.SphereGeometry(.205, 40, 32), skin, 0, 0, 0, head).scale.set(.9, 1.06, .96);
  add(new THREE.SphereGeometry(.185, 32, 24, 0, Math.PI * 2, Math.PI * .58, Math.PI * .42), skinShade, 0, -.012, .008, head).scale.set(.92, 1.05, .98);   // jaw stubble shade
  for (const s of [-1, 1]) {
    add(new THREE.SphereGeometry(.045, 16, 12), skin, s * .18, -.01, -.01, head).scale.set(.5, 1, .8);   // ears
    const eye = add(new THREE.SphereGeometry(.024, 16, 12), dark, s * .07, .02, .178, head); eye.scale.set(1.15, .85, .6);
    add(new THREE.SphereGeometry(.007, 8, 6), white, s * .07 + .008, .028, .19, head);
    const brow = add(new RoundedBoxGeometry(.075, .02, .02, 2, .008), hair, s * .072, .075, .176, head); brow.rotation.z = s * -.12;
    const stache = add(new THREE.CapsuleGeometry(.011, .045, 4, 8), hair, s * .03, -.085, .182, head); stache.rotation.z = Math.PI / 2 + s * .32;
  }
  add(new THREE.SphereGeometry(.026, 14, 10), skin, 0, -.03, .195, head).scale.set(.9, 1.1, .9);   // nose
  add(new RoundedBoxGeometry(.06, .012, .01, 1, .005), M(0xa86a58), 0, -.115, .178, head);   // mouth
  // hair: a full cap, then a quiff swept up and back with volume on top
  const cap = add(new THREE.SphereGeometry(.212, 36, 24, 0, Math.PI * 2, 0, Math.PI * .44), hair, 0, .045, -.03, head); cap.scale.set(.96, .95, 1); cap.rotation.x = -.42;
  add(new THREE.SphereGeometry(.2, 32, 20, 0, Math.PI * 2, Math.PI * .3, Math.PI * .45), hair, 0, -.0, -.06, head).scale.set(.94, 1, .9);
  [[0, .2, .05, .14, 1.15, .75, .95, -.45], [-.08, .19, .02, .11, 1, .7, .9, -.3], [.08, .2, .03, .12, 1, .72, .9, -.35], [-.01, .2, -.08, .14, 1.15, .7, 1, 0], [.04, .175, .11, .09, 1.3, .55, .8, -.9], [-.05, .17, .1, .08, 1.2, .55, .8, -.8]]
    .forEach(([x, y, z, r, sx, sy, sz, rx]) => { const h = add(new THREE.SphereGeometry(r, 24, 16), hair, x, y, z, head); h.scale.set(sx, sy, sz); h.rotation.x = rx; });
  for (const s of [-1, 1]) add(new RoundedBoxGeometry(.03, .08, .12, 2, .012), hair, s * .178, .07, -.03, head);   // short sides

  fig.position.y = 0;

  /* swap in the real model when hashir.glb is present */
  fetch(MODEL_URL, { method: 'HEAD' }).then(r => {
    if (!r.ok || !/model|octet|gltf/.test(r.headers.get('content-type') || '')) return;
    new GLTFLoader().load(MODEL_URL, g => {
      const m = g.scene;
      m.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      const b = new THREE.Box3().setFromObject(m), size = b.getSize(new THREE.Vector3());
      const k = 2.02 / size.y; m.scale.setScalar(k);
      const c = b.getCenter(new THREE.Vector3());
      m.position.set(-c.x * k, -b.min.y * k, -c.z * k);
      [...fig.children].forEach(ch => { if (ch !== plinth && !(ch.geometry && ch.geometry.type === 'TorusGeometry' && ch.position.y === 0)) fig.remove(ch); });
      fig.add(m); real = true;
    });
  }).catch(() => {});
  let real = false;

  /* interaction: slow turn, drag to spin with inertia */
  let angle = -.35, vel = 0, dragging = false, lastX = 0, lastT = 0;
  const autoSpeed = .32;   // radians per second
  canvas.style.touchAction = 'pan-y';
  canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastT = performance.now(); vel = 0; canvas.setPointerCapture(e.pointerId); box.classList.add('is-drag'); });
  canvas.addEventListener('pointermove', e => {
    if (!dragging) return;
    const now = performance.now(), dx = e.clientX - lastX;
    angle += dx * .012; vel = dx * .012 / Math.max(1, now - lastT) * 1000; lastX = e.clientX; lastT = now;
  });
  const up = () => { dragging = false; box.classList.remove('is-drag'); };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);

  /* size + render loop (paused off-screen) */
  const resize = () => {
    const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.fov = w / h < .7 ? 28 : 26; camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(box); resize();
  let running = false, raf = 0, prev = performance.now();
  const clock = performance.now();
  function frame(now) {
    const dt = Math.min(.05, (now - prev) / 1000); prev = now;
    if (!dragging) { vel *= Math.pow(.04, dt); angle += (autoSpeed + vel) * dt; }
    fig.rotation.y = angle;
    const t = (now - clock) / 1000;
    if (!real) {
      torso.position.y = 1.02 + Math.sin(t * 1.7) * .006;            // breathing
      head.rotation.z = Math.sin(t * .6) * .035;
      head.rotation.x = Math.sin(t * .45) * .03;
      arms.forEach(a => { a.shoulder.rotation.x = Math.sin(t * 1.1 + a.s) * .04; });
    }
    renderer.render(scene, camera);
    raf = running ? requestAnimationFrame(frame) : 0;
  }
  new IntersectionObserver(es => {
    const on = es[0].isIntersecting;
    if (on && !running) { running = true; prev = performance.now(); raf = requestAnimationFrame(frame); box.classList.add('is-3d'); }
    else if (!on) { running = false; cancelAnimationFrame(raf); }
  }, { rootMargin: '120px' }).observe(box);
}
