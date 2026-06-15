# Working with a Collaborator

How to bring another person — designer, developer, photographer, or
producer — into this project so they can contribute without confusion
or duplication.

Three different collaborators need three different setups. Pick the
one that matches your colleague's role.

---

## Option A — The colleague is a developer or technical co-builder

They will be touching code, running the app locally, and shipping
deploys. This is the heaviest setup but it is the standard one.

### Step 1 · Put the project on GitHub

The project is currently not in a Git repository. Initialise one and
push it to GitHub.

```bash
cd /Users/Mohammed/Desktop/ya-imam-ali
git init
```

Before committing anything, set up a `.gitignore` at the repository
root. The Downloads folder has API keys in `api kets .pages` — that
file is in the parent Desktop folder, not in the project, so it is
safe. But the project does have things that must not be committed:

```bash
cat > .gitignore <<'EOF'
# Dependencies
node_modules/
**/node_modules/

# Build outputs
app/dist/
app/.vercel/

# Environment + secrets
.env
.env.local
.env.production
**/.env
**/.env.local

# Large source assets — they live locally, not in git
sources/*.pdf
sources/*.epub
sources/*.zip
sources/*.mobi
sources/extracted/

# OS noise
.DS_Store
**/.DS_Store
Thumbs.db

# Editor noise
.vscode/
.idea/

# Personal-use files that are not part of the codebase
"api kets .pages"
"Untitled.pages"
Downloads/

# But DO keep these tracked
!sources/README.md
!sources/convert.py
!sources/.gitignore
!sources/extracted/.gitkeep
EOF
```

Then commit and push:

```bash
git add .
git commit -m "Initial commit — v48 baseline"

# Create a repo at github.com/new (private), then:
git remote add origin git@github.com:YOUR_USERNAME/ya-imam-ali.git
git branch -M main
git push -u origin main
```

If you do not have GitHub SSH keys set up, use HTTPS instead:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ya-imam-ali.git
```

GitHub will prompt for credentials. Use a Personal Access Token, not
your password. Create one at github.com/settings/tokens with `repo`
scope.

### Step 2 · Add the colleague to the GitHub repo

On github.com → your repo → Settings → Collaborators → Add people →
enter their GitHub username or email. They get an invite, accept it,
and they have full push access.

For a more careful setup, give them *Maintain* rather than *Admin*
access. *Maintain* allows them to push and merge but not delete the
repo or change critical settings.

### Step 3 · Tell them how to clone and run

Once they accept the invite, they run:

```bash
git clone https://github.com/YOUR_USERNAME/ya-imam-ali.git
cd ya-imam-ali/app
npm install
npm run dev
```

The app will open at `http://localhost:5173`. They can edit, see
changes immediately, and push their commits.

### Step 4 · The Supabase + ElevenLabs secrets

The app talks to a Supabase backend (with ElevenLabs voice via Edge
Functions). Those credentials should not be in the GitHub repo — they
live in environment files.

Share with the colleague directly (1Password, email, Signal):
- The Supabase URL and anon key (already configured in
  `app/src/lib/supabase.ts` or `.env`)
- Any ElevenLabs key, if applicable

If the colleague is read-only and just running the frontend, the
public anon key is enough.

### Step 5 · The Vercel deployment

The project deploys to Vercel from your account. To let the colleague
deploy:

- Option 1 — Keep deployments under your account, the colleague pushes
  to GitHub, you click *Promote to Production* on Vercel.
- Option 2 — Move the project to a Vercel Team (free for up to 3
  members). vercel.com → New Team → invite colleague by email. Then
  transfer the project to that team.

Option 2 is recommended if you trust the colleague to ship. Option 1
keeps the launch-control with you.

### Step 6 · The source library

`sources/` contains the PDFs and EPUBs for the corpus extraction
pipeline. These are large (~100 MB total) and are deliberately
excluded from Git. Share them with the colleague separately:

- iCloud Drive or Dropbox: share the `sources/` folder
- Or, easier: zip and send via WeTransfer

They drop the folder into their local clone, run
`python3 sources/convert.py`, and they have the extracted text files.

---

## Option B — The colleague is a designer or photographer

They do not need the code. They need the philosophy, the storyboard,
and the assets.

### What to share

1. **`docs/SHRINE_PSYCHOLOGY.md`** — the design framework
2. **`docs/OPENING_STORYBOARD.md`** — the director's brief
3. **`Ya_Imam_Ali_Brief_v48_Final.docx`** — the project brief
4. **A Figma file** — set one up at figma.com (free for up to 3
   editors) and invite them. Drop screenshots of the existing app in
   so they can see the current state.
5. **A shared folder for assets** (iCloud or Dropbox) so they can drop
   in photos, audio drafts, calligraphy SVGs as they produce them.

### Setup steps

- Make a Figma file at figma.com → New design file → name it
  *Ya Imam Ali — Design*.
- Take 6-8 screenshots of the current app on your iPhone. Drop them
  into the Figma file as a starting point.
- Invite the colleague: top-right *Share* button → enter their email
  → set permission to *Can edit*.
- Set up a shared cloud folder. Right-click → Share → invite their
  email. Folder structure:
  ```
  Ya Imam Ali — Assets/
    photography/
    audio/
    calligraphy/
    fonts/
    mockups/
  ```

### What they will deliver

- Composite frames for the storyboard (Figma)
- Sourced photographs (cloud folder)
- Sound design drafts (cloud folder, .wav format)
- Calligraphy SVGs (cloud folder)

You then hand these to the developer for implementation.

---

## Option C — The colleague is a producer, advisor, or investor

They do not need the code or the assets. They need the narrative.

### What to share

1. **`Ya_Imam_Ali_Brief_v48_Final.docx`** — the canonical brief
2. **`docs/OPENING_STORYBOARD.md`** — the storyboard so they can
   feel the product
3. **The live URL**: `https://ya-imam-ali.vercel.app` — they can
   try the current app on their phone
4. **A screen-recording of the planned opening sequence**, once it
   exists. (Not yet — this comes after motion design.)

### Setup steps

The simplest: email the three files above plus the URL. Set up a
single Notion or Google Doc as the running summary so when you
update the brief, you only have to push the new file once.

---

## Quick reference — what to send to whom

| Role | What they need | Where to put it |
|------|---------------|-----------------|
| Developer | The full repo + secrets | GitHub (code), Signal or 1Password (secrets), shared folder (sources) |
| Designer | Philosophy + storyboard + assets folder + Figma | Email the .md and .docx files; share Figma + cloud folder |
| Photographer | Storyboard + reference list + cloud folder for delivery | Email `OPENING_STORYBOARD.md`; share cloud folder for delivery |
| Sound designer | Storyboard's sound notes + cloud folder | Email `OPENING_STORYBOARD.md` (the audio sections); share cloud folder |
| Advisor / investor | The brief + a link to the live app | Email |

---

## The unwritten rule

Everyone you bring in should read `SHRINE_PSYCHOLOGY.md` before they
touch anything. It is short, it is unambiguous, and it sets the
editorial standard. A designer who has not read it will design a
spiritual-themed app; a designer who has read it will design a shrine.
The same applies to every other role.

If a collaborator does not have the patience to read 1,200 words of
philosophy before contributing, they are the wrong collaborator for
this project.
