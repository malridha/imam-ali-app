"""Pull Instagram Insights for every posted reel in the manifest and write a tidy
CSV + JSON into social/data/. Run on a cron (e.g. daily) so performance accrues over
the 2-week test. This is the measurement half of the post -> measure -> scale loop.
"""
import os, json, csv, sys, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
DATA = os.path.join(HERE, "data")
os.makedirs(DATA, exist_ok=True)
MANIFEST = os.path.join(HERE, "reels_manifest.json")

METRIC_KEYS = ["reach", "saved", "shares", "likes", "comments",
               "total_interactions", "plays", "ig_reels_avg_watch_time",
               "ig_reels_video_view_total_time"]


def flatten(insights):
    out = {}
    for row in insights.get("data", []):
        name = row.get("name")
        vals = row.get("values", [])
        out[name] = vals[0].get("value") if vals else None
    return out


def main():
    from lib_graph import media_insights
    items = json.load(open(MANIFEST))
    rows = []
    for it in items:
        mid = it.get("posted_media_id")
        if not mid:
            continue
        try:
            data = flatten(media_insights(mid))
        except Exception as e:
            print(f"insights failed for {it['id']} ({mid}):", e)
            data = {}
        row = {"id": it["id"], "theme": it.get("theme"), "media_id": mid}
        for k in METRIC_KEYS:
            row[k] = data.get(k)
        rows.append(row)
        print(f"{it['id']:10s} {it.get('theme',''):12s} "
              f"plays={row.get('plays')} saved={row.get('saved')} shares={row.get('shares')}")

    stamp = datetime.date.today().isoformat()
    with open(os.path.join(DATA, f"insights_{stamp}.csv"), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["id", "theme", "media_id"] + METRIC_KEYS)
        w.writeheader()
        w.writerows(rows)
    json.dump(rows, open(os.path.join(DATA, f"insights_{stamp}.json"), "w"),
              ensure_ascii=False, indent=1)

    # Theme leaderboard by (saved + shares) — the real signal.
    by_theme = {}
    for r in rows:
        t = r.get("theme") or "?"
        s = (r.get("saved") or 0) + (r.get("shares") or 0)
        by_theme.setdefault(t, 0)
        by_theme[t] += s
    print("\nTHEME LEADERBOARD (saves+shares):")
    for t, s in sorted(by_theme.items(), key=lambda x: -x[1]):
        print(f"  {t:14s} {s}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
