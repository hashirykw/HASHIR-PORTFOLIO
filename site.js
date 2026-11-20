/* Shared behaviour for every page: smooth scroll, nav, selection boxes,
   reveals, the marquee, streak dividers, polaroids and deep links.
   Nothing here hides text: only frames, images and decorations move. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
root.classList.remove('no-js');
root.classList.add('js');

/* ── smooth wheel scrolling (touch stays native) ── */
let lenis = null;
function startLenis(){
  if(reduce || !window.Lenis || lenis) return;
  lenis = new window.Lenis({ autoRaf:true, duration:1.1, easing:t => 1 - Math.pow(1 - t, 3.4), smoothWheel:true, syncTouch:false });
  lenis.on('scroll', e => onScroll(e.velocity || 0));
  window.__lenis = lenis;
}
if(window.Lenis) startLenis(); else addEventListener('load', startLenis);

const goTo = (el, instant) => {
  if(!el) return;
  const y = el.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0);
  if(lenis && !instant) lenis.scrollTo(y, { duration:1.3 });
  else scrollTo({ top:y, behavior: instant || reduce ? 'auto' : 'smooth' });
};
window.__goTo = goTo;

/* in-page anchors go through Lenis so the easing matches */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"], a[href^="/#"]');
  if(!a) return;
  const href = a.getAttribute('href').replace(/^\//, '');
  if(href.length < 2) return;
  if(a.getAttribute('href').startsWith('/#') && location.pathname !== '/' && !/\/index(\.html)?$/.test(location.pathname)) return;
  const el = document.getElementById(href.slice(1));
  if(!el) return;
  e.preventDefault();
  closeSheet();
  goTo(el);
  history.replaceState(null, '', href);
});

/* ── nav: floating slab after the first screen, sheet on phones ── */
const float = $('.float'), sheet = $('#menu');
const heroEnd = () => (($('.hero, .phero') || {}).offsetHeight || innerHeight) * .7;
function openSheet(){ if(!sheet) return; sheet.classList.add('is-open'); sheet.removeAttribute('inert'); $$('[data-menu]').forEach(b => b.setAttribute('aria-expanded', 'true')); lenis && lenis.stop(); setTimeout(() => ($('a', sheet) || sheet).focus({ preventScroll:true }), 60); }
function closeSheet(){ if(!sheet || !sheet.classList.contains('is-open')) return; sheet.classList.remove('is-open'); sheet.setAttribute('inert', ''); $$('[data-menu]').forEach(b => b.setAttribute('aria-expanded', 'false')); lenis && lenis.start(); }
$$('[data-menu]').forEach(b => b.addEventListener('click', openSheet));
$$('[data-menu-close]').forEach(b => b.addEventListener('click', closeSheet));
addEventListener('keydown', e => { if(e.key === 'Escape') closeSheet(); });

/* ── scroll-driven bits ── */
const marquees = $$('.marquee__track').map(el => {
  const a = el.getAnimations ? el.getAnimations()[0] : null;
  return { el, a, rate:1 };
});
const streaks = $$('.streak');
let lastY = scrollY, lastT = performance.now(), vel = 0, ticking = false;
function onScroll(lv){
  if(typeof lv === 'number' && lv) vel = lv;
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const now = performance.now(), y = scrollY;
    if(!lenis){ vel = (y - lastY) / Math.max(16, now - lastT) * 16; }
    lastY = y; lastT = now;
    if(float) float.classList.toggle('is-on', y > heroEnd());
    if(!reduce){
      const vh = innerHeight;
      for(const s of streaks){
        const r = s.getBoundingClientRect();
        if(r.bottom < -50 || r.top > vh + 50) continue;
        const p = (vh - r.top) / (vh + r.height);           // 0 → 1 while it crosses the screen
        s.style.setProperty('--sx', `${(0.5 - p) * 46 * (s.dataset.dir === 'r' ? -1 : 1)}%`);
      }
    }
  });
}
addEventListener('scroll', () => onScroll(), { passive:true });
addEventListener('resize', () => onScroll(), { passive:true });

/* the marquee drifts on its own and speeds up with scroll velocity */
if(!reduce && marquees.length){
  const loop = () => {
    const target = 1 + Math.min(6, Math.abs(vel) * .45);
    for(const m of marquees){
      if(!m.a) continue;
      m.rate += (target - m.rate) * .08;
      m.a.playbackRate = m.rate;
    }
    vel *= .9;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ── selection boxes: frame draws, handles pop, then images reveal ── */
$$('[data-sel]').forEach(el => {
  el.classList.add('sel');
  const f = document.createElement('span');
  f.className = 'sel__f'; f.setAttribute('aria-hidden', 'true');
  f.innerHTML = Array.from({ length:8 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
  el.appendChild(f);
});
const io = new IntersectionObserver(es => es.forEach(e => {
  if(!e.isIntersecting) return;
  e.target.classList.add('is-on');
  io.unobserve(e.target);
}), { threshold:.25, rootMargin:'0px 0px -6% 0px' });
$$('.tk-grid').forEach(g => [...g.children].forEach((t, i) => t.style.setProperty('--i', i)));
$$('.sel, .polaroid, [data-in], [data-reveal], .tk-grid').forEach(el => io.observe(el));

/* ── deep links: /work, /reels, /contact … land on their section ── */
const PATHS = { services:'services', reels:'reels', design:'design', work:'work', experience:'route', contact:'contact', about:'about' };
function landOnSection(){
  const h = (location.hash || '').replace(/^#(s-)?/, '').toLowerCase();
  const p = (location.pathname || '/').replace(/^\/+|\/+$/g, '').toLowerCase();
  const id = (h && (PATHS[h] || h)) || PATHS[p];
  const el = id && document.getElementById(id);
  if(el) requestAnimationFrame(() => goTo(el, true));
}
if(document.readyState === 'complete') landOnSection(); else addEventListener('load', landOnSection);
addEventListener('hashchange', landOnSection);

$$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
onScroll();
})();
