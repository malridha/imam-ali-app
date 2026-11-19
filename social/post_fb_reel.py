"""Cross-post the next due reel to the Facebook Page as a Reel.

Reuses social/reels_manifest.json but tracks Facebook separately via `fb_posted_id`,
so the Facebook channel runs independently of Instagram. On Facebook we put the
hashtags at the end of the description (not a separate first comment).

Env flags:
  DRY_RUN=1   print what would post, call no write endpoints
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
        if it.get("fb_posted_id"):
            continue
        sched = it.get("scheduled")
        if sched and sched > today:
            continue
        if not it.get("video_url"):
            continue
        return it
    return None


def main():
    items = load()
    it = next_due(items)
    if not it:
        print("Nothing due to post to Facebook today.")
        return 0
    desc = it["caption"]
    if it.get("hashtags"):
        desc = f"{desc}\n\n{it['hashtags']}"
    print(f"Next FB due: {it['id']} ({it.get('theme')}) -> {it['video_url']}")
    if DRY:
        print("DRY_RUN: would publish FB reel with description:\n", desc)
        return 0

    from lib_fb import publish_reel
    video_id = publish_reel(it["video_url"], desc)
    print("published FB reel id:", video_id)
    it["fb_posted_id"] = video_id
    it["fb_posted_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    save(items)
    print("manifest updated.")
    return 0


if __name__ == "__main__":
    sys.path.insert(0, HERE)
    raise SystemExit(main())
