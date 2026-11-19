"""Facebook Page Reels publishing — Graph API, standard library only.

Cross-posts the same reels to the Facebook Page. Reads from the environment:
  FB_PAGE_ID        numeric Facebook Page id (the "Imam Ali" page)
  FB_PAGE_TOKEN     Page access token with pages_manage_posts
                    (falls back to IG_ACCESS_TOKEN if the same token has page rights)
  GRAPH_VERSION     optional, defaults below

Facebook Reels are published in 3 phases (start -> upload-by-url -> finish):
  POST /{page_id}/video_reels?upload_phase=start      -> {video_id, upload_url}
  POST {upload_url}  (header file_url: <public mp4>)  -> Facebook fetches the file
  POST /{page_id}/video_reels?upload_phase=finish&video_id=..&video_state=PUBLISHED
"""
import os, json, time, urllib.parse, urllib.request, urllib.error

GRAPH_VERSION = os.environ.get("GRAPH_VERSION", "v21.0")
BASE = os.environ.get("FB_API_BASE", f"https://graph.facebook.com/{GRAPH_VERSION}")


def _token():
    t = os.environ.get("FB_PAGE_TOKEN") or os.environ.get("IG_ACCESS_TOKEN")
    if not t:
        raise SystemExit("FB_PAGE_TOKEN (or IG_ACCESS_TOKEN) is not set.")
    return t


def page_id():
    pid = os.environ.get("FB_PAGE_ID")
    if not pid:
        raise SystemExit("FB_PAGE_ID is not set (add it as a GitHub secret).")
    return pid


def _req(method, url, params=None, headers=None):
    params = dict(params or {})
    data = None
    if method == "GET":
        if params:
            url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params)
    else:
        data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        raise RuntimeError(f"FB {method} -> {e.code}: {detail}")


def publish_reel(video_url, description, poll_secs=5, max_wait=600):
    """Publish a Reel to the Page from a public video URL. Returns the video id."""
    pid, tok = page_id(), _token()
    # 1) start
    start = _req("POST", f"{BASE}/{pid}/video_reels",
                 {"upload_phase": "start", "access_token": tok})
    video_id = start["video_id"]
    upload_url = start["upload_url"]
    # 2) upload by hosted URL — POST to the rupload endpoint with the file_url header
    _req("POST", upload_url, params=None,
         headers={"Authorization": f"OAuth {tok}", "file_url": video_url})
    # 3) wait for the fetched video to finish processing
    waited = 0
    while waited < max_wait:
        st = _req("GET", f"{BASE}/{video_id}",
                  {"fields": "status", "access_token": tok})
        vs = (st.get("status") or {}).get("video_status")
        if vs in ("ready", "processing_complete"):
            break
        if vs == "error":
            raise RuntimeError(f"FB reel {video_id} processing error: {st}")
        time.sleep(poll_secs)
        waited += poll_secs
    # 4) finish / publish
    fin = _req("POST", f"{BASE}/{pid}/video_reels",
               {"upload_phase": "finish", "video_id": video_id,
                "video_state": "PUBLISHED", "description": description,
                "access_token": tok})
    if not fin.get("success", True):
        raise RuntimeError(f"FB finish failed: {fin}")
    return video_id
