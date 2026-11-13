"""Publish the next due reel from the manifest, then drop its hashtags as the first
comment and mark it posted. Designed to be run once per day by a GitHub Actions cron.

Manifest entry shape (social/reels_manifest.json):
  {
    "id": "test_00",
    "theme": "patience",
    "video_url": "https://imam-ali1.netlify.app/reels/test_00.mp4",
    "caption": "…",
    "hashtags": "#ImamAli #NahjAlBalagha …",
    "scheduled": "2026-11-12",      # optional; if set, only posts on/after this date
    "posted_media_id": null          # filled in once published
  }

Env flags:
  DRY_RUN=1   validate + print what would post, call no write endpoints (default on CI PRs)
"""
import os, json, datetime, sys

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "reels_manifest.json")
DRY = os.environ.get("DRY_RUN", "0") == "1"


def load():
    with open(MANIFEST) as f:
        return json.load(f)


def save(items):
    with open(MANIFEST, "w") as f:
        json.dump(items, f, ensure_ascii=False, indent=1)


def next_due(items):
    today = datetime.date.today().isoformat()
    for it in items:
        if it.get("posted_media_id"):
            continue
        sched = it.get("scheduled")
        if sched and sched > today:
            continue
        if not it.get("video_url"):
            print(f"skip {it['id']}: no video_url yet")
            continue
        return it
    return None


def main():
    items = load()
    it = next_due(items)
    if not it:
        print("Nothing due to post today.")
        return 0
    print(f"Next due: {it['id']} ({it.get('theme')}) -> {it['video_url']}")
    if DRY:
        print("DRY_RUN: would publish with caption:\n", it["caption"])
        print("DRY_RUN: would first-comment:\n", it.get("hashtags", ""))
        return 0

    from lib_graph import publish_reel, add_comment
    media_id = publish_reel(it["video_url"], it["caption"])
    print("published media id:", media_id)
    if it.get("hashtags"):
        try:
            add_comment(media_id, it["hashtags"])
            print("hashtags posted as first comment")
        except Exception as e:
            print("warning: first comment failed:", e)
    it["posted_media_id"] = media_id
    it["posted_at"] = datetime.datetime.utcnow().isoformat() + "Z"
    save(items)
    print("manifest updated.")
    return 0


if __name__ == "__main__":
    sys.path.insert(0, HERE)
    raise SystemExit(main())
