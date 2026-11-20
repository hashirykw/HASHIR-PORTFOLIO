# Design — Muhammad Hashir portfolio

Locked design system for every page of hashir.nexlyr.solutions. All pages read
`site.css`; extend that file (and this note) rather than styling a page on its own.
Source of the look: `.design/BRIEF.md` and `.design/reference/` (style only — none of
that designer's content is used).

## Genre
Editorial, studied DNA: crumpled graph paper, near-black ink sections, torn paper
edges between them, ultra-wide heavy caps, editor-style selection boxes.

## Surfaces
- `.paper` — off-white crumpled graph paper (`paper-light.webp` + 28px CSS grid)
- `.ink` — near-black crumpled sheet (`paper-dark.webp` + dark grid)
- `.tear-t` / `.tear-b` / `.tear-tb` — the section's top/bottom edge is torn
  (`tear-*.svg` masks, `fringe-*.svg` for the white fibres). The torn section
  always slides over its neighbour.

## Colour (tokens in `site.css :root`)
- paper `oklch(95.5% 0.004 90)` · ink `oklch(16% 0.004 90)`
- signal red `oklch(59% 0.215 27.5)` — one red per screen, never decoration
- selection pink `oklch(66% 0.2 6)` — only for selection frames
- Nexlyr cyan lives only inside the Nexlyr credit strip

## Type
- Display: Archivo Wide 900 (`font-archivo-wide-900.woff2`), caps, roman only
- Labels: Archivo Wide 700, small, tracked caps (`.lbl`) — corner labels
- Body: Archivo 400/600
- Handwriting: Nothing You Could Do (`font-hand.woff2`) — captions, notes only
- Hero and closing words are sized to fit the column exactly (`calc(... / 7.8)`)

## Signature components
- `data-sel` → selection frame with 8 handles; draws in, then images reveal
- `.glyphs` → ✸ ✦ ♣ row (SVG symbols `#g-burst`, `#g-spark`, `#g-club`)
- `.band` + `.marquee` + `.sticker` — black band, scroll-speed marquee, red-outlined cutout
- `.streak` + `.chapter` — motion-blurred chapter divider, then a moody photo card
  with a red title in a selection box and four corner labels
- `.polaroid`, `.sheetnote` (marker notes), `.logo-tile` (cream tiles)

## Motion
Ease `cubic-bezier(.16,1,.3,1)`. Text is never hidden or delayed; only frames,
images and decorations move. Reduced motion: marquee, streak drift and sticky
stacking switch off.

## CTA voice
Primary: black slab, wide caps, ↗ (`.btn`). Secondary: underlined caps link (`.link`).
