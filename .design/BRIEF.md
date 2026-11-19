# Portfolio redesign brief (written 20 Nov 2026, 01:10 PKT)

Hashir asked for his portfolio (hashir.nexlyr.solutions, this repo) to be redesigned
in the style of a Pinterest pin: "PORTFOLIO 2026 | RAAGAV SUNDAR"
(pinterest.com/pin/1050253575626116140, full project on Behance:
behance.net/gallery/252076827/GRAPHIC-DESIGN-PORTFOLIO-2026).
Frames from the pin video and contact sheets of the whole Behance project are in
`.design/reference/`. Look at every one of them before designing.

This is a style reference only. Do not copy that designer's text, face illustration,
photos, projects, phone, email or names. Use Hashir's own content from this repo.

## What the reference looks like

**Surfaces**
- Off-white crumpled paper texture with a faint square grid (graph paper), for light
  sections.
- Near-black sections, also with a faint grid and paper crumple.
- Sections are separated by **torn paper edges**: a ragged white tear over black, and
  the reverse. This is the signature move.

**Colour**
- Paper off-white, ink near-black, one signal red (about #E3262B) for accents.
- A pink selection colour for the editor-style boxes.
- Nothing else. Project images bring their own colour.

**Type**
- Ultra-bold, wide, heavy grotesk display in caps ("PORTFOLIO", "HELLO", "GRACIAS").
  Use a free font of that kind, self-hosted woff2, e.g. Archivo Black / Archivo
  Expanded ExtraBold / Unbounded / Dela Gothic One. The repo already has Archivo 600/700.
- Small, wide caps labels in the corners: "DESIGNER / ILLUSTRATOR" at top left,
  "2026" at top right, "PORTFOLIO OF …" and coordinates at the bottom.
- Handwritten script for signatures and polaroid captions.
- Small tidy sans for body text.

**Signature elements**
1. Hero word "PORTF◯LIO": an illustrated face sits inside the O.
   - For Hashir, use his cutout (`hashir-cutout.webp`) or the avatar in a circle.
   - Do not invent a cartoon of him.
   - A hand-drawn arrow and a signature "Muhammad Hashir" write themselves in
     (SVG stroke animation), with the glyph row ✸ ✦ ♣ underneath.
2. **Figma/editor selection boxes**: thin pink or red rectangles with square handles at
   the corners and mid-edges, around a photo, a heading or a red title word.
   - On scroll a box draws in, then the content appears.
   - Some headings sit in a box rotated a few degrees.
3. "HELLO" about block on paper.
   - Left: a tall selection box with a full-body cutout whose photo **turns around**
     (front, side, back), flicking frames in the pin video. Hashir only has the one
     cutout, so use a subtle 3D tilt or a flip of the same image instead.
   - Middle: HELLO, a short intro, EDUCATION.
   - Right: SKILLS as a grid of tool icons (Ps, Ai, Ae, Pr, Blender, etc.; for Hashir
     include the web stack: HTML/JS, Three.js, GSAP, Supabase, Vercel, Premiere, After
     Effects, Blender), then EXPERIENCE with a year range plus role lines.
4. **Black band with a huge marquee** of wide caps text scrolling sideways, broken by
   ✸ ✦ ♣ glyphs ("MUHAMMAD HASHIR ✸ WEB DEVELOPER ✦ MOTION DESIGNER ♣ 2026").
   - A portrait cutout with a thick **red sticker outline** sits on top, breaking out of
     the band's top torn edge.
5. **Polaroids** scattered at slight angles with handwritten quotes under the photos
   ("THE STUDIO" section: workspace photos).
6. **Chapter dividers**:
   - Repeated wide-caps text with heavy horizontal **motion blur / streak** on black
     ("LOGOS & MARKS ✦ LOGOS & MARKS"), as if whipping past.
   - Then a chapter card: a dark moody desk photo with a big red bold title in a
     selection box ("WEB DEVELOPMENT", "MOTION", "BRANDING").
   - Corner labels on the card: "PORTFOLIO OF MUHAMMAD HASHIR", "2026 PORTFOLIO" and
     coordinates (Karachi 24.8607° N, 67.0011° E).
7. Work layouts:
   - a logo grid on cream tiles
   - "process" pages that look like marker sketch notes on crumpled grid paper
   - bento mockup boards per project
   - posters in a row on black
   - phone mockups with stories and reels
8. End card "GRACIAS" (Hashir may prefer "SHUKRIYA" or "THANK YOU": pick one) on paper,
   with phone, email and Instagram in a row with small icons.

**Motion**
- The marquee in the black band drifts continuously, and speeds up with scroll velocity.
- Torn-edge sections slide over each other (sticky stacking) as you scroll.
- Selection boxes draw their outline and pop their handles, then the content reveals.
- The signature and arrow write in.
- Chapter streak-text whips across.
- Polaroids drop in with a slight rotation settle.
- Keep it tasteful and fast. Text must never blink or arrive late; headline text is
  present at first paint and only images and decorations animate.

## Hashir's content (keep all of it)

**Who he is:** Muhammad Hashir, founder of Nexlyr Solutions.
- Full web developer and motion graphics expert.
- Nexlyr has delivered 500+ projects, including international clients. Present it as a
  worldwide studio, not tied to Karachi, while SEO still targets Karachi.
- Present Hashir as the main person.

**Existing content and features:**
- `config.js`:
  - projects (live / demo groups, categories, logos)
  - contact: WhatsApp 923322483233, Instagram hashirykw, GitHub, nexlyr.solutions
  - hero video settings
  - Supabase settings
- Admin panel and Supabase integration: keep them working (the projects list can come
  from admin).
- The contact form posts to Supabase. Keep it.
- Reels `reel-1..4.mp4` with posters.
- Design samples `design-1..4`.
- Client logos `logo-*.webp`.
- `avatar.webp` and `hashir-cutout.webp`.

**Showcase and pages:**
- Demos (`*.nexlyr.solutions`) appear in a Demos tab and also in Live sites.
- Order the showcase best first:
  Wrappi, Cambridge Online, Physics with SMK, Markaz OUJ, Sir Xahid Anwar, Verzish,
  Fit Monster, 14th Street Pizza, Vision Properties, SolarScape, Legacive,
  Sir Osama Musani, Sir Yawar Abbas, Grub, Cafe Shafe, Desi Sawad, Evessé, Island Shop.
  Follow the order already in config.js where it differs.
- Pages to redesign in the same system:
  - index.html
  - about.html
  - web-development.html
  - video-editing.html
  - graphic-design.html
  - social-media-marketing.html
- Keep URLs, `vercel.json` redirects and rewrites, `sitemap.xml`, `robots.txt`, OG and
  meta tags and JSON-LD working.

**Branding:**
- The Nexlyr credit strip stays: dark card, Nexlyr mark, NEXLYR name, cyan Connect
  button, physicswithsmk style.
- Use only the official logo files `nexlyr-mark.png` and `nexlyr-wordmark.png`.
- The brand is "Nexlyr Solutions", never "Nexlyr Lab".

## Rules
- Apply the Hallmark design skill (anti-AI-slop).
- No invented stats or testimonials.
- Mobile flawless at 320, 375, 414 and 768 px.
- All assets are local files in the repo: no CDN fonts or images, no base64 blobs.
- Load in under ~2 s.
  - The hero video is 13 MB. It can stay for a later section or be dropped from the
    hero, since this style's hero is typographic.
  - Never autoplay the 13 MB file on mobile.
- Keep `lenis.min.js` smooth scrolling.
- Sound is not needed.
- QA with Playwright (Chrome) at desktop and mobile: no console errors, no 404s, no
  horizontal scroll.
- Work on branch `redesign`. Push only that branch. **Never push to `main`.** Main is
  the live site, and Hashir pushes it on his own command.
- `.design/` is reference material: keep it out of the deploy with `.vercelignore`.
