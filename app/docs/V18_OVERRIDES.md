# Avatar Direction History

This file used to be a single owner-authorised override of v18 §33.
It now documents the full back-and-forth on the avatar question — face
shown vs. faceless — so contributors reading the brief and the code
together can trace why earlier commits look the way they do.

The current authoritative spec is **v44 §73** (see decisions below).

---

## v18 §33 era (Jun 2026 → early Jun 2026) — Face shown (override)

Owner approved face-shown video and image:

- `public/threshold.mp4` — face-shown video in the threshold arrival
- `public/imam.jpg` — face-shown still image on the welcome page

Both shipped under an explicit override of v18 §33 ("Forbidden —
Realistic Face"). The wow factor / body-language tradeoff was named
and accepted.

## v41 §55 (early Jun 2026) — Faceless restored

Owner reviewed v41 §55.2 and chose to honour the brief. The
face-shown assets were deleted and both screens reverted to the
existing SVG `<Avatar>` component:

- `public/threshold.mp4` — deleted
- `public/imam.jpg` — deleted
- `public/THRESHOLD_VIDEO.md` — deleted
- `src/pages/Setup.tsx` — render SVG `<Avatar>` instead of `<img>`
- `src/components/Threshold.tsx` — drop video probe entirely, always
  use the SVG fallback during reveal

## v44 §73 (Jun 2026) — Realistic cinematic portrait, HeyGen compatible

The brief was updated again. v44 §73 supersedes both v18 §33 (forbid
faces) and v43 (stylised non-photorealistic face). The new locked
specification:

- The avatar is a **realistic cinematic portrait** — a dignified male
  scholar in his late 40s, oil-painting quality. Full bisht, white
  imamah with red crown, salt-and-pepper beard.
- The avatar is **NOT Imam Ali (عليه السلام)**. It is an AI
  scholar-companion carrying his authenticated wisdom.
- HeyGen Photo Avatar III is the target — full lip-sync on top of the
  static portrait.
- Generation: ChatGPT image (GPT-4o) or Midjourney v6.1 with the
  locked prompt in §73.2.
- Islamic scholar review required before any public use.

### What changed in the codebase on 2026-06-11

- System prompts (`src/lib/prompts/unified.ts` and `ar/unified.ts`) —
  major identity rewrite. The companion is now an AI scholar
  carrying Imam Ali's wisdom, **not** Imam Ali speaking directly.
  Teachings are attributed to Imam Ali in third person; the
  companion's own warmth and reception remain first-person.
- Product copy (`src/lib/i18n.ts`) — `setupDesc`, `greetingIntro`,
  `subAvatarText`, `interactionDisclosure`, `tapToHear` all updated
  to the v44 framing.
- Manifest (`vite.config.ts`) and HTML meta (`index.html`) — primary
  description now matches v44 §73.3: "An AI scholar guided by the
  authenticated wisdom of Imam Ali ibn Abi Talib (عليه السلام)."

### What did NOT change yet, pending external work

- The actual avatar IMAGE — the locked portrait prompt in §73.2 must
  be run through ChatGPT/Midjourney, the best result selected,
  reviewed by an Islamic scholar, then registered with HeyGen as
  Photo Avatar III. Until that happens, the app continues to render
  the existing SVG `<Avatar>` (faceless luminous figure) — which is
  v41-compliant but v44-superseded. The SVG is the placeholder, not
  the final state.
- The HeyGen video production pipeline — §71 specifies Agent C5
  generating ~1,000 videos/month for the Library tab. This is a
  multi-week build that requires a HeyGen subscription, the
  registered Photo Avatar III, the 13,000-entry corpus, and Agent C5
  scaffolding.
- §72 "Day 1 launch content inventory" — the Library tab itself,
  ~150 videos, audio playlists, etc.

---
