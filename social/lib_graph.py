"""Minimal Instagram Graph API client — standard library only (no pip installs).

Reads credentials from the environment so nothing secret ever lives in the repo:
  IG_USER_ID       Instagram Business/Creator account id (numeric)
  IG_ACCESS_TOKEN  long-lived access token with content-publish + manage-comments
  GRAPH_VERSION    optional, defaults to the pinned version below
"""
import os, json, time, urllib.parse, urllib.request, urllib.error

GRAPH_VERSION = os.environ.get("GRAPH_VERSION", "v21.0")
BASE = f"https://graph.facebook.com/{GRAPH_VERSION}"


def _token():
    t = os.environ.get("IG_ACCESS_TOKEN")
    if not t:
        raise SystemExit("IG_ACCESS_TOKEN is not set (add it as a GitHub secret).")
    return t


def ig_user_id():
    uid = os.environ.get("IG_USER_ID")
    if not uid:
        raise SystemExit("IG_USER_ID is not set (add it as a GitHub secret).")
    return uid


def _request(method, path, params=None, data=None):
    params = dict(params or {})
    params["access_token"] = _token()
    url = f"{BASE}/{path.lstrip('/')}"
    if method == "GET":
        url += "?" + urllib.parse.urlencode(params)
        body = None
    else:  # POST — params go in the body
        body = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(url, data=body, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        raise RuntimeError(f"Graph API {method} {path} -> {e.code}: {detail}")


def get(path, **params):
    return _request("GET", path, params)


def post(path, **params):
    return _request("POST", path, params)


# ---- high-level helpers -------------------------------------------------

def publish_reel(video_url, caption, share_to_feed=True, poll_secs=5, max_wait=600):
    """Create a REELS container, wait for it to finish processing, then publish.
    Returns the published media id."""
    uid = ig_user_id()
    container = post(
        f"{uid}/media",
        media_type="REELS",
        video_url=video_url,
        caption=caption,
        share_to_feed="true" if share_to_feed else "false",
    )
    cid = container["id"]
    # Reels must finish server-side processing before publish.
    waited = 0
    while waited < max_wait:
        st = get(cid, fields="status_code,status")
        code = st.get("status_code")
        if code == "FINISHED":
            break
        if code == "ERROR":
            raise RuntimeError(f"Container {cid} processing ERROR: {st.get('status')}")
        time.sleep(poll_secs)
        waited += poll_secs
    else:
        raise RuntimeError(f"Container {cid} not FINISHED after {max_wait}s")
    published = post(f"{uid}/media_publish", creation_id=cid)
    return published["id"]


def add_comment(media_id, message):
    """Post the first comment (we put hashtags here, not in the caption)."""
    return post(f"{media_id}/comments", message=message)


def reply_to_comment(comment_id, message):
    return post(f"{comment_id}/replies", message=message)


def list_media(limit=25):
    uid = ig_user_id()
    return get(f"{uid}/media", fields="id,caption,permalink,timestamp,media_type", limit=limit)


def media_insights(media_id):
    """Reels metrics. Some metrics vary by account/age; we request the common set and
    tolerate any the API rejects by retrying with a safe subset."""
    full = "reach,saved,shares,likes,comments,total_interactions,plays,ig_reels_avg_watch_time,ig_reels_video_view_total_time"
    try:
        return get(f"{media_id}/insights", metric=full)
    except RuntimeError:
        return get(f"{media_id}/insights", metric="reach,saved,shares,likes,comments,plays")


def list_comments(media_id, limit=50):
    return get(f"{media_id}/comments",
               fields="id,text,username,timestamp,like_count,replies{id,text,username}",
               limit=limit)
