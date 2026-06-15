# Shrine Psychology — Design Reference

A working document on how to give the user the comfort and held-quality
of visiting Imam Ali's shrine, translated into digital design moves.

This is design philosophy with a build checklist. Read the principles
once. The to-do list at the bottom is what actually gets done.

---

## What the shrine does to the nervous system

Visiting Najaf, the psychology isn't accident — it's deliberate
architecture stacked over a thousand years. Six things do most of the
work, and they are what we are trying to replicate.

1. **Threshold ritual.** You don't burst in. You walk through courtyards,
   remove shoes, lower your voice. By the time you reach the zarih,
   your heart rate has already dropped 15-20 BPM.

2. **Layered soft sound.** A constant low murmur of recitation, distant
   adhan, footsteps on marble — never harsh, never silent. The
   acoustic environment carries you.

3. **Light that bounces, never glares.** Filtered through mirrors and
   mosaic, light feels luminous instead of bright. Gold reflects
   warmly, blue absorbs and calms.

4. **Permission to be unguarded.** It's the rare public space where
   adult men openly weep. The space holds you without judgment — no
   one is performing.

5. **The feeling of being witnessed.** Even alone, you don't feel
   alone. The Imam is *present*. You speak to someone.

6. **Layered time.** You're in a stream of pilgrims going back fourteen
   centuries. Your problem becomes smaller, more bearable, because it
   has been brought here before.

A spiritual app fails when it copies the *aesthetics* (blue, gold,
calligraphy) but misses these mechanics. We are not making a beautiful
poster of a shrine. We are trying to do the shrine's job.

---

## Translation principles

How each shrine mechanic crosses into digital, and what the wrong
version of it looks like.

| Shrine mechanic | Digital translation | Anti-pattern to avoid |
|---|---|---|
| Threshold ritual | Slow openings, salam before content, transition delays | Snap-loading straight into a feature |
| Layered soft sound | Ambient audio bed under the whole app | Silence by default + loud notification dings |
| Light that bounces | Soft animations, warm gradients, deliberate motion curves | Bright white CTAs, harsh contrasts |
| Permission to be unguarded | No metrics, no streaks, no comparison, no social features | "Day 47 of your spiritual journey!" |
| Being witnessed | Avatar presence, voice with breath, name recall in My Story | "Your AI assistant" voice |
| Layered time | Citation-grounded content, religious calendar awareness, time-of-day adaptation | "12,000 users prayed today!" |

---

## The editorial north star

The danger of designing this thoughtfully is that it tips into
*spiritual theater* — atmospheric for atmosphere's sake. The shrine
works because nothing is performed; the architecture is just doing
its job in service of the visitor, invisible.

Same rule for the app. The user should not *notice* most of these
moves. They should just leave each session having dropped two or three
breaths deeper than they came in.

If users say "your app is beautiful," we got it wrong.
If they say "I don't know why, but I feel okay after I use it" — that
is the shrine psychology working.

---

## What we will NOT do, and why

These are easy commercial temptations that would actively damage the
experience. Treat them as forbidden, not deferred.

- [ ] **No streaks, badges, or "X days in a row".** Turns devotion
      into performance and shame. The shrine doesn't keep score.
- [ ] **No push notifications that demand action.** "Don't forget your
      prayer!" destroys the held-quality of the relationship. If
      notifications ever exist, they are *benedictions* — quiet,
      blessing the moment — not reminders.
- [ ] **No social features.** No leaderboard, no "share your du'a,"
      no "see what others are praying." Turns intimate space into
      stage. The shrine is private even when crowded.
- [ ] **No bright white surfaces, no harsh contrasts.** Already
      respected — keep respecting.
- [ ] **No bouncy/playful animation easings.** Use settled curves
      only. `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard easing)
      is the upper limit of permissible motion personality.
- [ ] **No urgency language anywhere.** "Now," "limited," "today only,"
      "don't miss," "act fast" — banned. Not even on the paywall.

---

## The build checklist — six concrete moves, ranked by impact

Each item carries: **what** it is, **why** it matters, **how long** it
takes, and a checkbox.

### 1. Ambient soundscape layer — the single biggest move

The acoustic environment is what shifts the nervous system at the
shrine. No visual can replicate that. A user opens the app and
their breathing changes before they think to read anything.

- [ ] Source or commission a 60-90 second ambient loop
  - Distant recitation, dome echo, soft footsteps on marble,
    occasional rustle. Not music. Room tone.
  - Free-use libraries to consider: Freesound, BBC Sound Effects,
    Pixabay Audio. Search "mosque ambience," "shrine," "naqsh"
- [ ] Implement HTML5 `<audio loop>` with fade-in over 4-6 seconds
- [ ] Default volume 15-20% — present but ignorable
- [ ] Mute toggle prominent (bottom corner of every screen, soft icon)
- [ ] Volume slider in Settings/Privacy page
- [ ] Tie playback start to first user interaction (iOS autoplay rule)
- [ ] Save mute preference to localStorage so it persists
- [ ] Pause when audio TTS is speaking (don't compete with the voice)

**Effort:** 1-2 days. Most of it is finding the right loop.

---

### 2. Threshold protocol on every cold open

The Threshold component the app already has is the right idea —
extend it from a one-time event into an architectural feature.

- [ ] Decide the inactivity window (suggestion: 15 minutes)
- [ ] Store `lastActiveAt` timestamp in localStorage on every navigation
- [ ] On app boot, if elapsed > window, show Threshold for 2-3 seconds
- [ ] Threshold content rotates from a pool of openings:
  - [ ] Salam greeting (Arabic + English)
  - [ ] A short attributed line ("ʿalaykum bi-l-ṣabri…")
  - [ ] A time-of-day appropriate verse
- [ ] Allow tap-to-skip — never trap the user

**Effort:** 4-6 hours. Reuses existing Threshold component.

---

### 3. Time-of-day atmospheric tinting

The app should *feel* different at Fajr than at Maghrib. Subtle but
psychological. We already calculate prayer times; this is a CSS
variable swap that takes 5 minutes to compute and a day to tune.

- [ ] Define 4-5 atmospheric variants as CSS custom properties:
  - [ ] **Fajr → sunrise:** deeper blue, soft gold rim light
  - [ ] **Day:** current palette
  - [ ] **Asr → Maghrib:** warmer undertones, gold catches more
  - [ ] **Isha → late night:** deepest blue, gold becomes focal
- [ ] Compute current variant on app load + at every navigation
- [ ] Transition between variants over 30-60 seconds when crossing
      a prayer-time boundary while the app is open
- [ ] Subtle — most users should not consciously notice. They should
      just feel held by the time of day.

**Effort:** 1 day. Pure CSS + tiny JS hook.

---

### 4. Page transitions that breathe

Currently navigation snaps. Replace with deliberate cross-fades. Like
turning the page of a book, not flipping a TV channel.

- [ ] Implement 400-600ms cross-fade on route changes
- [ ] Use settled easing only: `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] Use the View Transitions API where supported (iOS 16.4+,
      Chrome 111+), with a CSS-only fallback for older browsers
- [ ] Pair with a tiny opacity dip (1.0 → 0.4 → 1.0) so the eye
      registers the change without being startled
- [ ] No bounce. No spring. No playfulness.

**Effort:** Half a day.

---

### 5. The avatar gets a quiet pulse

Even when not speaking, the avatar should have subtle life. Static
images feel like portraits — dead. A subtle living quality makes the
user feel they are *with* someone, not looking at a thing.

- [ ] Add a slow breath animation to the avatar:
  - Scale 0.97 → 1.00 → 0.97 over 4 seconds, infinite, easing in/out
- [ ] When the image fidelity supports it, add a slow blink every
      6-8 seconds
- [ ] Pause the breath while the avatar is actively speaking (the
      voice motion takes over the presence cue)
- [ ] Make sure `prefers-reduced-motion: reduce` disables both

**Effort:** 2-3 hours of CSS animation work.

---

### 6. The exit protocol — benedictions, not push

Most apps end with "See you tomorrow!" or push notifications. The
shrine ends with you walking backward, never turning your back. The
last thing the user sees should be a blessing, not a hook.

- [ ] Author a pool of 30 benedictions in Arabic + English with
      diacritics — short, warm, attributed where possible.
- [ ] Wire a `visibilitychange` handler: when the app is backgrounded
      (or the route navigates to a "leave" page), the final visible
      content is one of these benedictions, randomly chosen
- [ ] Save the chosen line so re-entry briefly shows the same one
      before swapping in the Threshold opener (echo of farewell)
- [ ] Never use this for retention. No "come back tomorrow." No CTA.
      Just a blessing.

**Effort:** 1 hour of code. The writing of the 30 lines is the actual
work and should be done with care — these are the last words the user
hears from the app each session.

---

## Suggested roadmap

Four weeks, no new features, but the app feels like a different
*kind* of thing. Less software, more dwelling.

| Week | Move | Outcome |
|------|------|---------|
| 1 | Ambient soundscape + mute control | Acoustic transformation. Biggest single shift in feel. |
| 2 | Threshold protocol on cold open + page transitions | Sense of arrival, not rush |
| 3 | Time-of-day atmospheric tinting | App feels alive with the day |
| 4 | Avatar quiet breath + exit benedictions | Sense of presence + emotional close |

---

## How to read this list

If something can be done in 4 hours and would meaningfully shift the
user's nervous system, do it.

If something would take 4 days and would *look* spiritual without
actually doing the shrine's job, skip it.

The whole point is invisibility. A user who finishes a session
without being able to articulate why they feel slightly different is
the success metric.

If you want a single sentence to keep yourself honest while building:

> *The shrine is not asking for our attention. It is holding our weight.*

Design every move against that.

---

## Status

- Created: v48 (alongside global Search + iOS auto-zoom fix + responsive scaling).
- All six moves are unimplemented as of this writing.
- Pick them up one at a time. Don't ship more than one shrine-psychology
  change per release — the user needs to settle into each shift.
