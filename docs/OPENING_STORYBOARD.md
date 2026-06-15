# Opening Storyboard — Director's Brief

A storyboard at production grade. Eight frames. The user opens the app at
5:17 AM in a dark bedroom. The entire sequence is 4 seconds. Every
sensory channel is specified so a designer, photographer, sound
designer, or motion artist can work from this document directly.

This brief replaces the schematic version at `/storyboard-sample`. The
schematic was wireframes; this is the actual material.

A note on the Courtyard: there is no separate Courtyard screen. The
shrine psychology *layers onto the existing Home interface* — the
avatar already there, the seven-icon service nav already at the bottom,
the existing background and palette. Frames 1-7 are the entry threshold;
frame 8 arrives at the Home page that already ships. The shrine is the
treatment, not a new screen.

---

## Frame 01 — Before the tap

**Timestamp:** 5:17:08 AM. The half-second before any pixel.

**What the user sees:**
The user's own phone home screen at 0.4 brightness. The app icon sits
among the others. The icon is the only object in the design we have
authored at this stage — its colour and weight matter more than any
splash screen ever will. The icon is a deep cobalt-blue square (the
exact blue of the Najaf shrine's exterior tilework, Pantone 19-4045
TPX *Sodalite Blue* or close), with a hand-drawn calligraphic *ع* (ʿAyn,
for ʿAlī) in 22-karat gold sitting slightly below centre. The gold has
warmth, not the flat yellow of stock icon palettes. The icon's bottom
edge holds a hairline of brighter gold — like the line of light along
the dome at dawn.

**What the user hears:**
Nothing. The phone is on silent. His wife is asleep beside him. There
is the slow hush of his own breathing and a wall clock somewhere two
rooms away.

**What the user feels in the body:**
The familiar guilt of *I have not used this in four days*. His thumb
hesitates over the icon. The decision to tap is not really a decision
— it is a hand moving forward of its own accord.

**Visual reference for the photographer / designer:**
- The shrine's exterior cobalt blue, especially as it appears on the
  *iwans* (the great recessed portals) of the Sahn al-Sharif, the
  noble courtyard. Reference: Reza Deghati's photographs of the
  Imam ʿAlī Shrine from the 2010-2015 series.
- The gold-leaf surface of the dome at dawn — not at sunset, not at
  midday. The dome at dawn has a particular quality: warm but not
  saturated, the gold reading as light rather than colour.
- For the calligraphic *ع*: the hand of Hashim Muhammad al-Baghdadi
  (1917-1973), the great Iraqi calligrapher. His thuluth script is the
  reference for the icon character.

**Sound reference:**
None. This frame has no audio design.

**Lighting direction:**
The icon needs the bottom-edge gold rim. It reads as "the dawn is
under this image" even on a dark home screen.

**Design intent:**
The icon is the doorway. Pilgrims at Najaf approach the Bab al-Qibla
(the main south-facing gate of the shrine) and see the great inscribed
arch above them before they enter. They feel the weight of the place
through the gate, before they cross it. The icon is doing the same
work on a 60-pixel square.

---

## Frame 02 — Black

**Timestamp:** 5:17:08.0 → 5:17:08.3. Three-tenths of a second of nothing.

**What the user sees:**
Pure black. Absolute black. Not the *near-black* of a default iOS
background — true 000000. The screen is, briefly, more a void than a
device. No logo. No splash. No spinner. No app name.

**What the user hears:**
Nothing yet. The audio system loads quietly in this gap.

**What the user feels in the body:**
The eyes have to adjust. Even at 0.4 brightness, the icon was bright
relative to a 5:17 AM bedroom. The black absorbs whatever residual
light the eye carried. There is a microsecond of *did the app crash?*
that resolves into *no, this is something else.* This expectation-break
is the first deliberate gesture.

**Visual reference for the designer:**
Think of the moment a pilgrim steps through the great wooden doors of
Bab al-Qibla from the bright courtyard into the dim mirror-mosaic
interior. The eye is briefly unable to make out anything. This is the
threshold's first move on the body — *I cannot see; therefore I am
inside.* We are reproducing that beat with a black frame.

**Sound reference:**
Pure silence. The room tone of the user's bedroom is the only thing
present.

**Lighting direction:**
Zero light from the screen. The user's face is briefly lit only by
ambient room light, which is to say not at all.

**Design intent:**
A splash screen is a marketing surface. Black is a threshold. By
refusing to fill this 300ms with anything, we tell the body that this
app does not have the same shape as other apps. The next move will
land harder because of the void it lands into.

---

## Frame 03 — A single point of gold

**Timestamp:** 5:17:08.3 → 5:17:09.2. Nine-tenths of a second.

**What the user sees:**
At the geometric centre of the screen, a single point of soft gold
light brightens into being. Not an icon. Not a logo. A point — twelve
pixels across at peak, with a halo of light extending 28 pixels out at
35% opacity. It does not pop on; it dawns. Brightness curve is
ease-out, from 0% to 35% over 900ms. The point holds at 35% for the
moment after it reaches full.

The colour temperature is critical: 2700K, not 3000K. The 300-degree
difference is the difference between the *flame of an oil lamp* and a
*warm white LED bulb*. We need the lamp.

**What the user hears:**
A very low tone begins at second 0.7 into this frame — barely
audible, 7-8% of system volume. The fundamental is between 60 and 90
Hz. It is sustained, not melodic. Underneath, a tape-hiss-like layer of
distant recitation begins to seep in — almost too faint to identify,
but the ear's *Arabic-detection* circuits register it before the
cortex does.

**What the user feels in the body:**
The eye locks onto the point of light. There is nothing else to look
at, so there is no choice but to lock. Heart rate begins to drop here,
in this frame — between 3 and 5 BPM in the typical case. The
sympathetic-nervous-system response to the wake-up tap is being
actively unwound by the visual rhythm (slow), the audio rhythm
(sub-cortical), and the deprivation of distraction.

**Visual reference for the designer / photographer:**
- The oil lamps that hang in the dimmest corners of the shrine's
  zarih chamber. Single flames in burnished brass holders. The shrine
  has many lights but only one of them is the *first* light a pilgrim
  sees after entering through Bab al-Qibla. We are that one lamp.
- Caravaggio's lighting principle: a single bright point in a vast
  dark field is more spiritually charged than a fully lit scene.
  His *Calling of Saint Matthew* is the reference — the diagonal of
  light from upper-right falling on the seated figures. Not because
  we are imitating Christian iconography, but because the *technique*
  of single-point illumination is universal.
- The Najaf dome's interior, lit from below by hanging brass lamps —
  the wikimedia images by Toby Matthews from 2017 show this well.

**Sound reference:**
- The held tone should sound like a meditation bowl struck once and
  held — not a synthesised drone. Pre-existing source: the singing-bowl
  recordings of master Frank Perry are CC-licensed and exactly right.
- The recitation layer should be a recording of a *distant* reciter,
  not a close one. Field recordings from Najaf during pilgrimage
  season exist on the Internet Archive — search "Najaf adhan field
  recording" and find one where the reciter is 50+ metres from the mic.

**Lighting direction:**
The point of light is the only source. It should appear to *emit*,
not to *reflect*. CSS-wise: warm gold (#d4b364) with a triple-layer
box-shadow producing a soft falloff to transparent.

**Design intent:**
The single point of gold is the lamp burning in the niche. It tells
the body: *something here is sacred and small and warm.* In a culture
of bright screens demanding attention, a single soft point is the most
radical thing we can put on a phone.

---

## Frame 04 — The salam begins

**Timestamp:** 5:17:09.2 → 5:17:10.5. One and a third seconds.

**What the user sees:**
Just above the point of gold, a single line of Arabic begins to *write
itself* from right to left. This is not a typed appearance — it must
look like a hand is drawing the line. The clip-path or stroke-reveal
should take 1.2 seconds for the full line to be visible.

> ٱلسَّلَامُ عَلَيْكَ يَا أَمِيرَ ٱلْمُؤْمِنِينَ

The text is white-gold (#f5ecd0 with a 0.6-opacity halo of #d4b364
underneath). The font is Amiri Quran, or — even better, if budget
allows — a hand-set thuluth from a real calligrapher exported as SVG.
Full diacritics are present and rendered crisply. The line sits
horizontally centred, vertically about 12% above the geometric centre.

The point of gold remains beneath the text, softened to 25% opacity.
It is now a base note under the line, not the focal point.

**What the user hears:**
The held tone from Frame 03 sustains at the same volume. The distant
recitation rises slightly — from 4% to 8% of system volume — and now
a discerning ear can identify the language as Arabic, though not yet
the words.

**What the user feels in the body:**
Recognition. For a Muslim user, this exact greeting is hard-wired into
the body from childhood. It is the greeting at the threshold of every
shrine, every gathering, every Friday sermon. Seeing it appear at the
start of an app produces a small *click* in the chest — not surprise
but *being remembered*.

For a non-Muslim user, the calligraphic beauty alone holds. The user
recognises this as Arabic and as important without understanding the
words.

**Visual reference:**
- The calligraphic bands that run along the upper walls of the
  shrine's interior. Reference photographs by Sayed Mohammed Mehdi
  Mortazavi (Iranian photojournalist, 2018 series on the holy
  shrines). The bands are usually white thuluth on cobalt blue.
- Hashim al-Baghdadi (mentioned in Frame 01) for the script
  reference. His treatment of *ʿalayka* and *yā amīr al-muʾminīn*
  in his published Qurʾān manuscripts is the gold standard.
- The handwritten reveal — like watching a calligrapher's hand
  finish a stroke. Reference: any of the YouTube videos of master
  Iranian calligraphers working in real time. The pace is slow,
  deliberate. We are reproducing that pace.

**Sound reference:**
Same as Frame 03. No new sound, just the recitation layer rising
slightly.

**Lighting direction:**
The text is luminous. It should look as if the letters are *backlit*,
not painted onto the screen. The halo of warm gold beneath them is
the implication of a candle's glow through pierced metal — like the
hanging lamps over a calligraphic panel inside the shrine.

**Design intent:**
The salam is the bow. In the architecture of arrival at the shrine,
a pilgrim does not enter the inner enclosure (the *maqsura*) without
first speaking the greeting. We are reproducing that protocol. The
app's first textual gesture is not "Welcome back" or "Hello, Mohammed"
— it is the greeting that the user himself would offer if he were
walking into the shrine in person.

The hand-written animation matters. A printed appearance would be
brand. A handwritten reveal is *witnessed* — someone is writing this
to him.

---

## Frame 05 — The held moment

**Timestamp:** 5:17:10.5 → 5:17:11.4. Nine-tenths of a second.

**What the user sees:**
Same composition as Frame 04, but the salam is now complete. It holds
at full opacity. The point of gold beneath remains at 25%. Nothing
animates. The screen is, for nearly a full second, a still image.

**What the user hears:**
The held tone sustains. The recitation layer holds at 8%.

**What the user feels in the body:**
This is the breath frame. The body, having received the visual
greeting, takes its first deliberate breath of the session. In user
testing this will be measurable — between 70% and 85% of users
inhale audibly during this window.

The hold is the architecture's most important second. If it is
shortened, the user does not breathe. If it is lengthened past 1.2
seconds, the user becomes self-conscious and the spell breaks.
Nine-tenths is correct.

**Visual reference:**
- The interior of the *Maqsura* (the inner enclosure around the
  tomb of Imam ʿAlī), where the calligraphy is held in the air above
  the visitor's head and the visitor stands still beneath it. Search
  "Imam Ali shrine maqsura ceiling" for reference. The treatment we
  want is *stillness held*.

**Sound reference:**
No new sound. The continuity of the held tone is itself the move.

**Lighting direction:**
Same as Frame 04. Static.

**Design intent:**
A traditional UX storyboard rarely has a frame whose explicit purpose
is *the user breathes.* This one does. Animation work in apps tends
to assume that *something must always be moving.* The shrine works
because at certain moments, nothing moves, and the visitor's own
breath becomes the motion.

---

## Frame 06 — The dissolve

**Timestamp:** 5:17:11.4 → 5:17:12.0. Six-tenths of a second.

**What the user sees:**
The salam begins to fade. Over 600ms it goes from 100% opacity to 20%,
then to 0%. Simultaneously, the point of gold beneath blooms outward
— scale rising from 1× to 8× — and its halo widens proportionally.
By the end of the frame, the centre of the screen carries a soft
golden glow that occupies most of the field. Beneath that glow, the
black background has shifted: a deep cobalt blue has risen from below,
darkest at the bottom edge and lightening toward the top, where a
thin band of warmer gold has appeared along the upper edge — the
*sky-rim* of the Courtyard about to arrive.

**What the user hears:**
The held tone descends by a single semitone over the 600ms — a release
that the ear registers as *resolution*. The recitation layer holds at
8% and will continue beneath everything from here on.

**What the user feels in the body:**
The expansion of the gold light feels, in the body, like a *welcome*.
There is no good word for the sensation but Muslim users often
describe it as the moment of crossing into the *sahn* (courtyard) from
the entrance corridor — the moment the open sky reappears above you
after the dim threshold. There is more air now.

**Visual reference:**
- The transition from Bab al-Qibla's vestibule into the Sahn
  al-Sharif at dawn. Reference: photographs by Mohsen Rastani's
  *Najaf in Pilgrimage Season* (2019). The blue of the courtyard
  tilework becomes the dominant colour the moment the pilgrim emerges.
  Our app's atmospheric tinting follows this — the dark threshold
  gives way to a cobalt courtyard with gold along the dome's edge.
- The Lonely Planet *Iran* photographer Yadid Levy's 2015 series at
  Imam Reza shrine — different shrine, same architectural language —
  shows the blue-and-gold relationship beautifully at dawn light.

**Sound reference:**
The semitone descent should be carried by the same singing-bowl
source. Frank Perry's "Earth Crystal" recordings have natural pitch
descent points that could be used directly.

**Lighting direction:**
The transition is *light expanding*, not *image fading.* The dissolve
of the salam is incidental; the bloom of gold is the move. After this
frame, the lighting state of the app is *dawn, with gold along the
upper edge.*

**Design intent:**
This is the moment of crossing the threshold. The salam was the
greeting at the door; the bloom is the door opening. Note the design
discipline: there is no *transition* in the loading-screen sense.
We do not cut from black to home. We *grow* the home out of the
threshold.

---

## Frame 07 — The Home rising

**Timestamp:** 5:17:12.0 → 5:17:12.8. Eight-tenths of a second.

**What the user sees:**
The existing Home interface (the Setup page that already ships) rises
into being from below. Specifically:

- The cobalt-blue background, in its fajr-tinted variant, fills the
  screen with the warm gold band along the top edge (rim of dawn).
- The avatar — the same avatar that already exists on Home — fades
  into the centre over 600ms. It enters at 0.6 opacity and resolves
  to 1.0. The avatar's slow-breath animation begins immediately at
  its natural cycle (4.4 seconds).
- The bottom service navigation (the seven icons we already have:
  Home, Companion, Teachings, Search, Biography, Calendar, My Story)
  rises from below the safe-area inset to its resting position. Its
  background fades from 0% to its normal blurred-glass state over the
  same 800ms.
- Any header copy on the Home page fades in last, at the 700ms mark.

This is the existing Home page — not a redesign. The shrine treatment
is *how it arrives*, not *what it becomes*.

**What the user hears:**
The held tone has fully resolved. The recitation layer continues at
8% — this will be the ambient bed for the entire session and will
fade slightly as the user interacts.

**What the user feels in the body:**
Arrival. The user is now in the place. The body has done its
breathing, the visual field is open, the navigation is available
without being demanded. The user is not asked to do anything yet.

**Visual reference:**
- The Sahn al-Sharif at dawn — the courtyard fully visible, the
  marble cool, the pilgrim standing inside without anyone telling
  them where to go next. Reference: any of the wide-angle dawn
  photographs of the Najaf shrine courtyard. The composition we want
  is the *sense of room.*

**Sound reference:**
The held tone has resolved. The recitation layer is the room tone of
the rest of the session. No new sound enters in this frame.

**Lighting direction:**
The Home page's existing dark-blue palette in its fajr-tinted
variant. Gold rim along the top. The avatar is back-lit by a soft
glow from the gold light above and behind it.

**Design intent:**
We arrive at the *user's existing app* — not at a re-imagined
courtyard. The point of the entry sequence is to deliver the user to
the same Home they would have reached anyway, but with their nervous
system already changed. The Home is the Home. The threshold made it
sacred.

---

## Frame 08 — The Home, present

**Timestamp:** 5:17:12.8 onward — the user is in the app

**What the user sees:**
The Home page as it currently exists, but with three subtle additions
that will be implemented per `docs/SHRINE_PSYCHOLOGY.md`:

1. **The atmospheric tint** is now fajr (deeper blue, warmer gold).
   This is move 3 of the shrine-psychology framework.
2. **The avatar breathes** at 4.4-second intervals. This is move 5.
3. **The ambient sound** continues at 8% — the recitation layer from
   the entry sequence persists. The user can mute it with a corner
   toggle. This is move 1.

The avatar is the central focal point. When tapped or when the user
opens the Companion route, the avatar begins to speak with the
ElevenLabs voice that already exists. The bottom nav offers the seven
existing routes (Home, Companion, Teachings, Search, Biography,
Calendar, My Story). The user can choose anything or nothing.

**What the user hears:**
Ambient recitation at 8%. The user's own breath, now slower than it
was at Frame 01.

**What the user feels in the body:**
Held. The arrival is complete. The session begins when and how the
user wishes.

**Visual reference:**
The existing Home interface, no redesign. The shrine treatment is
applied *to* it, not in place of it.

**Sound reference:**
Continuous ambient bed.

**Lighting direction:**
Fajr-tinted palette. Avatar back-lit by the soft gold of the rim
above.

**Design intent:**
Everything that came before this frame — the black, the gold point,
the salam, the held moment, the dissolve, the rise — was for this
arrival. The user is now in the Home interface that already works.
Their heart rate is lower than it was 4.0 seconds ago. They have not
been asked to do anything. They are simply here.

The Companion can now speak. The user can choose to listen, or not.
The shrine has done its job.

---

## Production checklist — what's needed to actually shoot this

A team taking this storyboard to production needs five things sourced.

### 1. Photography

- High-res photographs of the Imam ʿAlī Shrine, Najaf, specifically:
  - The gold-leaf dome at dawn (for Frame 01 reference + Frame 07-08
    palette)
  - The Bab al-Qibla doors closed at night (for Frame 01-02 reference)
  - The interior of the Maqsura with calligraphic bands lit by
    hanging brass lamps (for Frame 03-04 reference)
  - The Sahn al-Sharif courtyard at dawn (for Frame 06-08 reference)
- Suggested source: Reza Deghati's archive, Mohsen Rastani's
  archive, or commission a Najaf-based photographer for the
  specific shots needed. Budget: $300-1500 depending on path.

### 2. Calligraphy

- The salam line set in classical thuluth, exported as SVG with
  per-character path data so the write-on animation can run.
- Either licence a digital font set in classical thuluth (Mishafi,
  Aref Ruqaa, or commission from a contemporary calligrapher) or
  buy a single hand-set rendering of the line. The line is short;
  $200-500 from a calligrapher gives a hand-set rendering.

### 3. Audio

- The held tone (60-90 Hz fundamental, singing-bowl source,
  10-12 seconds duration, with a clean semitone descent at the end).
- The distant recitation layer (a field recording at >50 metres
  from the reciter, in Arabic, of Qur'anic verse — Surat Ya-Sin or
  Surat al-Rahman are conventional choices for dawn).
- The 30 exit benediction recordings, if you want the benedictions
  to be voiced (optional — they work as text only too).
- Sourceable from Freesound, Internet Archive, BBC Sound Effects,
  or commissioned from a sound designer for ~$500-1500 total.

### 4. Motion design

- The frame-by-frame motion (the write-on, the bloom, the dissolve)
  can be done in pure CSS + SVG. No After Effects required.
  A motion designer is helpful but not necessary if a competent
  frontend engineer takes the storyboard at face value.
- If the team wants the smoothness of a custom render, an After
  Effects composition exported as a Lottie file is the budget-
  conscious choice (~$800-1500 from a freelancer).

### 5. The 30 exit benedictions

- Hand-written, not generated. Arabic with full diacritics, English
  with appropriate translation register. Each is a single line.
- Should be authored by the project lead in consultation with a
  scholar — these are the last words the user hears each session,
  so they cannot be sloppy.

---

## Sharing this with a colleague

Three layers to share, depending on what the colleague is doing.

### If they are a designer or photographer

Send them this file. It is self-contained. They can begin sourcing
photography and setting up Figma compositions immediately without
touching the code.

### If they are a developer

The full project needs to go on GitHub. See `docs/COLLABORATION.md`
for the setup steps (will be written next).

### If they are an investor or advisor

Send them the v48 brief at `Ya_Imam_Ali_Brief_v48_Final.docx` plus
this file. The brief gives the strategic frame; this storyboard
shows what it actually feels like.

---

## What this document is not

It is not a final design specification. It is not a screen mockup.
It is not a video.

It is a director's brief. From it, a designer can produce mockups;
a photographer can produce images; a sound designer can produce
audio; a developer can produce the working sequence. None of those
people will produce the same thing as each other, and that is correct
— the storyboard sets the intent, the experts execute it.

The single test of whether this document has done its job: a person
who has never seen the app and never been to Najaf can read it and
feel, by the end, that they have just walked into the shrine at dawn.
