# Developer Onboarding — Ya Imam Ali

How a new developer gets to **full parity** with the owner: clone the code,
run it locally, edit, and ship. Target time once accounts exist: ~15 minutes.

> This supersedes the dev-setup parts of `COLLABORATION.md` (written before
> the project was on GitHub / Vercel).

---

## 0 · Accounts the collaborator creates (themselves)

| Account | Needed for | Required? |
|---|---|---|
| **GitHub** | the code (clone / push) | ✅ required |
| **Anthropic (Claude Code)** | AI-assisted development — how this app is built | ⭐ recommended (same workflow as the owner) |
| **Vercel** | deploying to production | optional (only if they deploy) |
| **Supabase** | editing the backend (Edge Functions, DB) | optional (only for backend work) |

Frontend work needs **only GitHub + the env values** (step 2). The app talks to
the already-deployed backend, so most work needs nothing else.

---

## 1 · Access the OWNER grants (checklist)

Once the collaborator sends their usernames/emails:

- **GitHub** → `https://github.com/malridha/ya-imam-ali/settings/access` →
  **Add people** → their GitHub username → role **Write** (or **Admin** if they
  should manage the repo too).
- **Vercel** *(if deploying)* → Project **ya-imam-ali** → Settings → **Members**
  → invite their email.
- **Supabase** *(if backend)* → Project → Settings → **Team** → invite their email.
- **Env values** *(always)* → send them `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` via a private channel (these are safe to share — the
  anon key is public-by-design and already ships in the app bundle).

---

## 2 · Local setup (the collaborator runs this)

```bash
# 1. Clone
git clone https://github.com/malridha/ya-imam-ali.git
cd ya-imam-ali/app

# 2. Create the env file (values from the owner, or the Supabase dashboard)
#    See app/.env.example for the variable names.
cat > .env.local <<'EOF'
VITE_SUPABASE_URL=...        # ask the owner
VITE_SUPABASE_ANON_KEY=...   # ask the owner (public anon key)
EOF

# 3. Install + run
npm install
npm run dev          # http://localhost:5173

# 4. Before committing, always:
npx tsc --noEmit     # typecheck must be clean
npm run build        # production build must pass
```

The app runs against the **live** Supabase backend, so chat, voice, and
retrieval all work locally with just the two env values above.

---

## 3 · How the project is structured

```
ya-imam-ali/
├── app/                      # the PWA — React + TypeScript + Vite
│   ├── src/
│   │   ├── pages/            # Setup, Companion (chat), Teachings, Recite,
│   │   │                     #   Discuss, Search, Biography, Calendar, MyStory
│   │   ├── components/       # Avatar, ChatInput, RecitationModal, ServiceNav…
│   │   ├── hooks/            # useAudioPlayer, useSpeechRecognition, useReadAloud
│   │   ├── lib/
│   │   │   ├── prompts/      # baseline-corpus.ts (~4,900 authenticated entries,
│   │   │   │                 #   injected into the system prompt) + unified.ts
│   │   │   ├── claude.ts     # calls the chat Edge Function
│   │   │   ├── speak.ts      # calls the ElevenLabs voice Edge Function
│   │   │   └── arabicCompare.ts  # recitation word-scoring
│   │   └── data/             # teachings.ts, biography.ts, calendar.ts
│   └── supabase/
│       ├── functions/        # Edge Functions: chat, speak, retrieve, embed-corpus…
│       └── migrations/       # DB schema + corpus seed (pgvector `teachings` table)
├── docs/                     # STRATEGY — read these (see §5)
└── sources/                  # source texts + extraction scripts (extracted/ is gitignored)
```

**Backend in one paragraph:** Supabase hosts Postgres (with `pgvector`) and the
Edge Functions. `chat` runs retrieval over the `teachings` table then calls the
**Anthropic** API (key is a Supabase secret). `speak` calls **ElevenLabs** (key
is a Supabase secret) for the voice. The frontend never holds those keys — it
only uses the public anon key to reach the functions.

---

## 4 · Deploying

- **Manual (current):** `cd app && npx vercel --prod` (needs a Vercel token).
- **Auto (recommended, set up once):** connect the GitHub repo in Vercel →
  Project → Settings → **Git**. After that, every `git push` to `main`
  auto-deploys, and updating the phone = just pushing.
- The app is a **PWA**: after a deploy, fully close & reopen it on a phone so the
  service worker fetches the new build.

---

## 5 · Read before changing UX (the editorial standard)

- **`docs/SHRINE_PSYCHOLOGY.md`** — §80, the design philosophy that governs every
  UX decision ("do the shrine's job, don't just copy its aesthetics"). The single
  most important doc.
- **Latest brief** — `Ya_Imam_Ali_Brief_v48_Final.docx` (sections are numbered
  `§NN`; code comments reference them, e.g. `// v48 §81`).

### Working principles (non-negotiable)
- **Authenticated + citation-grounded only.** Never fabricate Arabic or history.
  Every wisdom/du'a/teaching cites a real source. Two corpus agents once correctly
  *refused* to invent Arabic — that's the right call for a devotional app.
- **No metrics, no streaks, no comparison, no social vanity** (§80 anti-patterns).
- **Cross-tradition.** Imam Ali is revered by Sunni *and* Shia; keep framing
  inclusive and balanced (see the Calendar's `tradition: both|shia|sunni` model).
- Keep `tsc` + `npm run build` green before every commit.

---

## 6 · AI-assisted development (how this app is built)

The owner builds this with **Claude Code** (Anthropic) driving the edits. A
collaborator can do the same: install Claude Code, point it at their clone, and
work the same way. It reads this repo's structure and these docs as context.
This is optional — the codebase is a normal Vite app — but it's the native
workflow here.
