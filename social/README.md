# Ya Imam Ali — Social Pipeline

A self-contained engine that **posts reels, measures them, and triages comments** —
all from this repo, on the Instagram Graph API, run by GitHub Actions. No third-party
scheduler required. Standard-library Python only (no installs).

```
social/
  charter.md            the rules every caption & reply obeys (anti-sectarian, crisis-first)
  lib_graph.py          minimal Graph API client (stdlib only)
  post_reel.py          publish the next due reel from the manifest + first-comment hashtags
  pull_insights.py      pull Insights -> social/data/*.csv + a theme leaderboard
  reply_agent.py        comment sweep -> review_queue/ (auto-reply OFF by default)
  reels_manifest.json   the queue: id, theme, video_url, caption, hashtags, schedule
  review_queue/         dated markdown of comments a human must handle
  data/                 insights snapshots + replied-comment state
.github/workflows/
  social-post.yml       daily: post next reel
  social-insights.yml   daily: pull insights
  social-comments.yml   every 4h: sweep + triage comments
```

The loop: **post → measure (saves+shares+watch-%) → scale the winning themes.** The
first 20 reels are a theme test (10 territories × 2). After ~2 weeks, read the theme
leaderboard and mass-render the top 2–3 from the 4,108-teaching library.

---

## ⚠️ One-time setup — the part only you can do (Meta side)

The Graph API needs an app + token. ~30–45 min, once.

### 1. Make the Instagram account a Business or Creator account
In the IG app: **Settings → Account type and tools → Switch to professional account**
(Creator is fine). A personal account cannot use the publishing API.

### 2. Link it to a Facebook Page
Create a Facebook Page (free) if you don't have one, and connect the IG account to it:
IG app → **Settings → Business tools / Linked accounts → Facebook**. Publishing requires
the IG account to be linked to a Page.

### 3. Create a Meta developer app
- Go to **developers.facebook.com → My Apps → Create App → "Business"**.
- Add the **Instagram Graph API** product.
- Under **App roles**, add yourself; keep the app in **Development** mode (fine for your
  own account — no App Review needed for a self-owned account).

### 4. Get the two values the pipeline needs
Use the **Graph API Explorer** (Tools menu) with these permissions granted:
`instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`,
`pages_show_list`, `pages_read_engagement`, `business_management`.

- **IG_USER_ID** — the Instagram Business account id. Get it:
  `GET /me/accounts` → your Page id → `GET /{page-id}?fields=instagram_business_account`.
- **IG_ACCESS_TOKEN** — exchange the short token for a **long-lived** one (≈60 days):
  `GET /oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-token}`
  (Set a calendar reminder to refresh it before it expires, or we add a refresh step.)

### 5. Add them as GitHub repository secrets
Repo → **Settings → Secrets and variables → Actions → New repository secret**:
- `IG_USER_ID`
- `IG_ACCESS_TOKEN`

### 6. Host the reel videos (already solved by your stack)
Reels publish from a **public HTTPS URL**. We drop the MP4s in `app/public/reels/`, which
Netlify serves at `https://imam-ali1.netlify.app/reels/<id>.mp4` — exactly the `video_url`
values in the manifest. (For scale beyond a few dozen we move these to GitHub Releases or a
bucket so the repo stays light.)

---

## Running it

- **Safe first run:** Actions tab → *Social — post next reel* → **Run workflow** with
  **Dry run = true**. It validates the manifest and prints what it *would* post. No write.
- **Go live:** flip the schedule on (it's daily at 17:00 UTC) or run with dry-run off.
- **Insights:** *Social — pull insights* runs daily and commits `social/data/insights_*.csv`
  plus a theme leaderboard in the run log.
- **Comments:** *Social — comment sweep* runs every 4h and writes `social/review_queue/`.
  **Auto-reply stays OFF** until you deliberately enable it — and even then only Tier-1
  benign appreciation is auto-sent. Crisis and red-line comments are *never* auto-answered.

## Safety model (see charter.md)
- **Crisis first:** self-harm / distress → flagged at the top of the review queue, never a template.
- **Red lines:** Sunni/Shia, any Companion, any ruling → human only.
- **Draft-only by default:** questions and anything ambiguous are drafted for a human to approve.
- A missed auto-reply costs nothing. A wrong one costs the mission.
