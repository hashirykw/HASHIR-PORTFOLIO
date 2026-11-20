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

/* ═════════ theme switch (light is the default) ═════════ */
(() => {
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const root = document.documentElement;
  const SUN = '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>';
  const label = () => root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  const btns = [];
  $$('.top .wrap, .float, .sheet__top').forEach(host => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'theme-btn'; b.innerHTML = SUN + MOON; b.setAttribute('aria-label', label());
    const ref = host.matches('.top .wrap') ? host.querySelector(':scope > .menu-btn') : host.querySelector('.cta-nav, .menu-btn, .sheet__close');
    host.insertBefore(b, ref || null); btns.push(b);
  });
  const meta = document.querySelector('meta[name="theme-color"]'), metaLight = meta ? meta.content : '';
  function set(t){
    root.classList.add('theme-swap');
    root.dataset.theme = t;
    try { localStorage.setItem('hm-theme', t); } catch(e){}
    if(meta) meta.content = t === 'dark' ? '#1c1b19' : metaLight;
    btns.forEach(b => b.setAttribute('aria-label', label()));
    setTimeout(() => root.classList.remove('theme-swap'), 500);
  }
  btns.forEach(b => b.addEventListener('click', () => set(root.dataset.theme === 'dark' ? 'light' : 'dark')));
})();

/* ═════════ cookie notice (the site only keeps your theme and this choice in your browser) ═════════ */
(() => {
  let seen = null; try { seen = localStorage.getItem('hm-cookies'); } catch(e){}
  if(seen) return;
  const c = document.createElement('div');
  c.className = 'cookie'; c.setAttribute('role', 'region'); c.setAttribute('aria-label', 'Cookie notice');
  c.innerHTML = `<b><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g-burst"/></svg>Cookies, quickly</b>
    <p>This site only stores your theme and this choice in your browser. Nothing is sold or shared.</p>
    <div class="cookie__row"><button type="button" class="cookie__ok">Accept</button><button type="button" class="cookie__no">Essential only</button></div>`;
  document.body.appendChild(c);
  setTimeout(() => c.classList.add('is-on'), 1400);
  const done = v => { try { localStorage.setItem('hm-cookies', v); } catch(e){} c.classList.remove('is-on'); setTimeout(() => c.remove(), 700); };
  c.querySelector('.cookie__ok').onclick = () => done('all');
  c.querySelector('.cookie__no').onclick = () => done('essential');
})();

/* ═════════ chat assistant: answers the common questions, hands real conversations to WhatsApp ═════════ */
(() => {
  const C = (window.PORTFOLIO_CONFIG || {});
  const contact = C.contact || {};
  const WA = (contact.whatsapp || '923322483233').replace(/\D/g, '');
  const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const AV = '/avatar.webp';
  const A = {
    hi: "Hi, I'm Hashir's assistant. Ask me about websites, video editing, design, social media, timelines or how to start a project.",
    web: "Hashir builds custom websites, web apps and admin panels by hand (no page builders): 3D and motion where it helps, Supabase backends, fast on phones, hosted on Vercel with your domain.\n\nSee the work: <a href=\"/web-development\">Web development</a>",
    video: "Promos, explainers, reels and brand idents, edited in Premiere and After Effects with motion graphics that carry the message. AI video (Veo 3, Higgsfield, Runway) when it fits.\n\nSee: <a href=\"/video-editing\">Video editing</a>",
    design: "Logos, brand identity, social posts and print, designed to hold up everywhere.\n\nSee: <a href=\"/graphic-design\">Graphic design</a>",
    social: "Full social media management: strategy, a monthly calendar, posts and reels made in-house, posting, boosting and ads.\n\nSee: <a href=\"/social-media-marketing\">Social media</a>",
    price: "Every project is quoted on its scope, so there are no fixed price lists. Tell Hashir what you need on WhatsApp and you'll get a clear quote and timeline.",
    time: "Rough guide: a landing page takes days, a multi-page site one to three weeks, a web app with an admin panel longer. Videos and designs are usually days. You get an exact timeline with the quote.",
    work: "Nexlyr has delivered 500+ projects for clients at home and abroad: schools and teachers, gyms, cafés, clinics, stores and more.\n\nBrowse them: <a href=\"/#work\">Selected work</a>",
    about: "Muhammad Hashir is a full web developer, motion designer and generative AI expert, and the founder of Nexlyr Solutions and Nexlyr InfiniMind Academy, with Nexlyr for Students coming soon.\n\nMore: <a href=\"/about\">About</a>",
    contact: `The fastest way is WhatsApp: <a href="${wa("Hi Hashir, I'd like to talk about a project.")}" target="_blank" rel="noopener">message Hashir</a>.\nOr use the <a href="/#contact">contact form</a>.`,
    start: `Great. Send a short message on WhatsApp with what you need and any links or references: <a href="${wa("Hi Hashir, I want to start a project: ")}" target="_blank" rel="noopener">start on WhatsApp</a>.`,
    ai: "Hashir uses generative AI across the work: ChatGPT, Claude and Gemini for writing and code, Midjourney for images, Veo 3, Google Flow, Higgsfield and Runway for video, ElevenLabs for voice and Suno for music. Nexlyr also builds AI chatbots and AI calling agents.",
    hosting: "Yes. Sites go live on Vercel with your own domain and SSL, and Hashir can handle the domain setup, SEO basics and updates after launch.",
    thanks: "Anytime. If you want to take it further, Hashir is one tap away on WhatsApp."
  };
  const RULES = [
    [/\b(hi|hello|hey|salam|assalam|aoa)\b/i, 'hi'],
    [/price|cost|charge|rate|budget|kitna|paisa|fee|quote/i, 'price'],
    [/how long|time ?line|deadline|days|weeks|kab tak|fast/i, 'time'],
    [/start|hire|book|order|begin|project/i, 'start'],
    [/web|site|website|app|admin|landing|shop|store|e-?commerce|portal/i, 'web'],
    [/video|edit|reel|promo|motion|after effects|premiere|animation/i, 'video'],
    [/logo|brand|design|poster|graphic|identity|print/i, 'design'],
    [/social|instagram|facebook|tiktok|content|ads|marketing|post/i, 'social'],
    [/\bai\b|chatgpt|claude|gemini|veo|higgs|runway|generative|chatbot|calling/i, 'ai'],
    [/domain|host|hosting|vercel|seo|ssl/i, 'hosting'],
    [/portfolio|work|projects|clients|examples|demo/i, 'work'],
    [/who|about|hashir|nexlyr|founder/i, 'about'],
    [/contact|whatsapp|phone|number|email|call|reach/i, 'contact'],
    [/thank|thanks|shukria|great|cool|nice/i, 'thanks']
  ];
  const CHIPS = [['Websites','web'],['Video editing','video'],['Design','design'],['Social media','social'],['Pricing','price'],['Timeline','time'],['Start a project','start']];

  const fab = document.createElement('button');
  fab.type = 'button'; fab.className = 'chat-fab'; fab.setAttribute('aria-label', 'Chat with Hashir\'s assistant'); fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = `<span class="chat-fab__av"><img src="${AV}" alt="" width="40" height="40" loading="lazy"></span><span>Ask me anything</span>`;
  const box = document.createElement('section');
  box.className = 'chat'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Chat with Hashir\'s assistant');
  box.innerHTML = `<header class="chat__head"><img src="${AV}" alt="" width="38" height="38"><div><b>Hashir's assistant</b><small>Usually replies on WhatsApp within the hour</small></div>
      <button class="chat__x" type="button" aria-label="Close chat"><svg viewBox="0 0 24 24"><path d="m6.5 6.5 11 11M17.5 6.5l-11 11"/></svg></button></header>
    <div class="chat__log" aria-live="polite"></div>
    <div class="chat__chips">${CHIPS.map(([t,k]) => `<button type="button" data-k="${k}">${t}</button>`).join('')}</div>
    <form class="chat__form"><input name="q" autocomplete="off" placeholder="Type a question..." aria-label="Your message" maxlength="300"><button type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button></form>`;
  document.body.append(fab, box);
  const log = box.querySelector('.chat__log'), input = box.querySelector('input');
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
  const add = (html, who) => { const m = document.createElement('div'); m.className = 'msg msg--' + who; m.innerHTML = html; log.appendChild(m); log.scrollTop = log.scrollHeight; return m; };
  function reply(key, asked){
    const t = add('<i></i><i></i><i></i>', 'bot'); t.classList.add('msg--typing');
    setTimeout(() => {
      t.remove();
      if(key) add(A[key], 'bot');
      else add(`Good question. Hashir can answer that directly: <a href="${wa('Hi Hashir, ' + asked)}" target="_blank" rel="noopener">send it on WhatsApp</a>.`, 'bot');
    }, 650);
  }
  function ask(text, key){
    add(esc(text), 'me');
    if(!key){ const r = RULES.find(([re]) => re.test(text)); key = r ? r[1] : null; }
    reply(key, text);
  }
  let opened = false;
  const open = v => {
    box.classList.toggle('is-open', v); fab.classList.toggle('is-open', v); fab.setAttribute('aria-expanded', String(v));
    if(v && !opened){ opened = true; reply('hi'); }
    if(v) setTimeout(() => input.focus({ preventScroll:true }), 300);
  };
  fab.addEventListener('click', () => open(true));
  box.querySelector('.chat__x').addEventListener('click', () => { open(false); fab.focus(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && box.classList.contains('is-open')) open(false); });
  box.querySelector('.chat__chips').addEventListener('click', e => { const b = e.target.closest('button'); if(b) ask(b.textContent, b.dataset.k); });
  box.querySelector('form').addEventListener('submit', e => { e.preventDefault(); const q = input.value.trim(); if(!q) return; input.value = ''; ask(q); });
  // keep the cookie notice and the chat button from overlapping on small screens
  const fixCookie = () => { const ck = document.querySelector('.cookie'); if(ck && innerWidth < 560) ck.style.bottom = 'calc(max(.75rem, env(safe-area-inset-bottom)) + 4.4rem)'; };
  setTimeout(fixCookie, 1500);
})();
