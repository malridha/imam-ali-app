"""Comment-reply agent — bound to social/charter.md.

Design principle: a missed auto-reply costs nothing; a wrong one costs the mission.
So the agent is cautious by construction:

  Tier 0  CRISIS      -> never auto-reply. Flagged at the TOP of the review queue.
  Tier 1  BENIGN      -> may auto-reply with a short, warm, rotating acknowledgement.
  Tier 2  EVERYTHING  -> drafted (optionally) and written to the review queue for a
          ELSE           human to approve. Never auto-sent.

Auto-sending is OFF unless AUTO_REPLY=1 is set, and even then only Tier 1 is sent.
The review queue is written to social/review_queue/<date>.md for a human.

Env:
  AUTO_REPLY=1        enable Tier-1 auto acknowledgements (default: off, draft-only)
  REPLY_LOOKBACK=25   media items to sweep (default 25)
"""
import os, json, sys, datetime, random, re

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
RQ = os.path.join(HERE, "review_queue")
os.makedirs(RQ, exist_ok=True)
STATE = os.path.join(HERE, "data", "replied_ids.json")
os.makedirs(os.path.dirname(STATE), exist_ok=True)

AUTO = os.environ.get("AUTO_REPLY", "0") == "1"

# ---- classification lexicons -------------------------------------------
CRISIS = ["kill myself", "suicid", "end my life", "want to die", "self harm",
          "self-harm", "hurt myself", "no reason to live", "cutting myself",
          "i can't go on", "give up on life", "overdose"]

# Red-line triggers -> always human review, never auto.
REDLINE = ["sunni", "shia", "shiite", "shi'a", "rafidi", "nasibi", "wahhab",
           "kafir", "kufr", "apostate", "aisha", "muawiya", "yazid",
           "fatwa", "halal", "haram", "is it permissible", "ruling on",
           "bid'ah", "bidah", "sect", "which sect"]

# Benign appreciation -> Tier 1 auto-eligible.
BENIGN = ["beautiful", "ma sha", "masha", "subhan", "jazak", "alhamd", "amazing",
          "love this", "so true", "ya ali", "salawat", "allahumma", "thank you",
          "thanks", "needed this", "peace be upon him", "pbuh", "❤", "🤍", "🕊",
          "🥹", "😭", "🙏", "ameen", "aameen", "amen"]

QUESTION = ["?", "how ", "why ", "what ", "where", "source", "reference", "who said",
            "can you", "could you", "explain", "meaning of"]

ACKS = [
    "Thank you for sitting with this. 🤍",
    "May it reach you well. 🤍",
    "Ameen — thank you for being here.",
    "Peace to you. Glad it landed. 🤍",
    "Grateful you paused with these words.",
]


def classify(text):
    t = (text or "").lower()
    if any(k in t for k in CRISIS):
        return "CRISIS"
    if any(k in t for k in REDLINE):
        return "REDLINE"
    if any(k in t for k in QUESTION):
        return "QUESTION"
    # benign only if it looks like pure appreciation and is short
    if any(k in t for k in BENIGN) and len(t) <= 60 and not any(k in t for k in QUESTION):
        return "BENIGN"
    return "OTHER"


def load_replied():
    try:
        return set(json.load(open(STATE)))
    except Exception:
        return set()


def save_replied(s):
    json.dump(sorted(s), open(STATE, "w"), indent=0)


def main():
    from lib_graph import list_media, list_comments, reply_to_comment
    lookback = int(os.environ.get("REPLY_LOOKBACK", "25"))
    replied = load_replied()
    media = list_media(limit=lookback).get("data", [])

    crisis, redline, questions, other, auto_done = [], [], [], [], []

    for m in media:
        mid = m["id"]
        try:
            comments = list_comments(mid).get("data", [])
        except Exception as e:
            print(f"comments failed for {mid}:", e)
            continue
        for c in comments:
            cid = c["id"]
            if cid in replied:
                continue
            text = c.get("text", "")
            user = c.get("username", "?")
            kind = classify(text)
            entry = {"cid": cid, "user": user, "text": text, "permalink": m.get("permalink"),
                     "kind": kind}
            if kind == "CRISIS":
                crisis.append(entry)
            elif kind == "REDLINE":
                redline.append(entry)
            elif kind == "QUESTION":
                questions.append(entry)
            elif kind == "BENIGN":
                if AUTO:
                    try:
                        reply_to_comment(cid, random.choice(ACKS))
                        replied.add(cid)
                        auto_done.append(entry)
                    except Exception as e:
                        print("auto-reply failed:", e)
                        other.append(entry)
                else:
                    other.append(entry)  # draft-only mode: route to review
            else:
                other.append(entry)

    save_replied(replied)
    write_review_queue(crisis, redline, questions, other, auto_done)
    print(f"swept {len(media)} media. CRISIS={len(crisis)} REDLINE={len(redline)} "
          f"QUESTIONS={len(questions)} OTHER={len(other)} AUTO_SENT={len(auto_done)}")
    if crisis:
        print("\n*** CRISIS COMMENTS NEED A HUMAN NOW ***")
    return 0


def _sec(f, title, rows, guidance):
    if not rows:
        return
    f.write(f"\n## {title}\n_{guidance}_\n\n")
    for e in rows:
        f.write(f"- **@{e['user']}** — {e['text']!r}\n")
        f.write(f"  - link: {e.get('permalink')}  · comment_id: `{e['cid']}`\n")


def write_review_queue(crisis, redline, questions, other, auto_done):
    stamp = datetime.date.today().isoformat()
    path = os.path.join(RQ, f"{stamp}.md")
    with open(path, "w") as f:
        f.write(f"# Comment review — {stamp}\n")
        f.write("Bound to `social/charter.md`. Nothing here was auto-sent except the "
                "Tier-1 acknowledgements listed at the bottom.\n")
        _sec(f, "🚨 CRISIS — respond personally, now", crisis,
             "Self-harm / acute distress. A human replies with care and, where "
             "appropriate, local emergency or helpline info. Never a template.")
        _sec(f, "⛔ Red line — human only", redline,
             "Touches Sunni/Shia, a Companion, or a ruling. Decline warmly, return to "
             "the teaching, never adjudicate. See charter red lines.")
        _sec(f, "❓ Questions — draft then approve", questions,
             "Answer the question itself, warmly and briefly; point to a scholar for "
             "any ruling. Draft a reply, a human approves before posting.")
        _sec(f, "• Other — review", other,
             "Ambiguous or non-benign. Review individually.")
        _sec(f, "✅ Auto-acknowledged (already sent)", auto_done,
             "Tier-1 benign appreciation. Sent automatically. Listed for the record.")
    print("review queue ->", path)


if __name__ == "__main__":
    raise SystemExit(main())
