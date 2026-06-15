#!/usr/bin/env python3
"""
extract_ghurar.py — parse sources/extracted/ghurar-al-hikam.txt and emit
TypeScript BaselineEntry records ready to paste into baseline-corpus.ts.

Usage:
    python3 sources/extract_ghurar.py > /tmp/ghurar_entries.ts

The Ghurar file format (post-header):
    Section Title
     Section Title العربية

    1. English sentence.

    1ـ Arabic sentence.

    2. English sentence.

    2ـ Arabic sentence.
    ...

We skip the preamble (lines 1-117) and extract every (english, arabic) pair,
tagging each with section name + aphorism number for provenance.
"""

import re
import sys
import unicodedata

GHURAR_FILE = "/Users/Mohammed/Desktop/ya-imam-ali/sources/extracted/ghurar-al-hikam.txt"
SKIP_LINES = 117  # preamble / intro — start from "Parents"

# ── Section → theme-string map ────────────────────────────────────────────
# Covers ~90 % of sections; anything not here gets a generic theme.
SECTION_THEMES = {
    "parents": "when navigating family duty, when honouring parents",
    "knowledge": "when seeking wisdom, when deciding whether to learn or teach",
    "action": "when weighing action against talk, when procrastination looms",
    "patience": "when enduring difficulty, when tempted to give up too soon",
    "silence": "when about to speak unnecessarily, when restraint serves better",
    "self-sacrifice": "when choosing generosity over self-interest",
    "generosity": "when giving feels costly, when weighing charity",
    "justice": "when in authority, when fairness is tested",
    "repentance": "when weighed by guilt, when seeking a clean start",
    "gratitude": "when blessings go unnoticed, when wanting more",
    "faith": "when belief wavers, when trials test trust in God",
    "hope": "when hope becomes wishful thinking, when shortening ambition sharpens focus",
    "fear": "when worldly fears crowd out the only fear worth having",
    "humility": "when pride rises, when elevation through lowering is the paradox",
    "the hereafter": "when attachment to this world needs reframing, when remembering what lasts",
    "the world": "when the temporary is mistaken for the permanent",
    "death": "when mortality feels abstract, when reminded that time is limited",
    "character": "when building the self, when choosing who to become",
    "good character": "when choosing between easy and right, when virtue needs daily practice",
    "the brother and the friend": "when choosing companions, when loyalty is tested",
    "friendship": "when choosing companions, when loyalty is tested",
    "anger": "when anger threatens good judgment, when restraint wins the real battle",
    "speech": "when words can build or destroy, when choosing what to say",
    "truthfulness": "when honesty is costly, when the easy lie tempts",
    "the truthful": "when honesty is costly, when the easy lie tempts",
    "mercy": "when power allows harshness, when the merciful path is harder",
    "mercy and compassion": "when power allows harshness, when the merciful path is harder",
    "hardships": "when difficulty arrives, when endurance is the only option",
    "anxiety": "when worry outweighs the actual burden, when calm is the wiser choice",
    "wealth": "when money becomes the measure of worth",
    "the poor and poverty": "when material lack feels like spiritual lack",
    "the rich": "when wealth creates arrogance, when abundance creates blindness",
    "the intellect": "when reason must govern impulse, when the mind is the highest gift",
    "knowledge and wisdom": "when seeking wisdom, when deciding to teach or stay silent",
    "the student": "when beginning to learn, when feeling behind",
    "the scholar": "when knowledge becomes ego, when teaching is the real test",
    "worship": "when ritual feels empty, when understanding the spirit of devotion",
    "prayer": "when connection with God feels distant, when prayer is the anchor",
    "sin": "when guilt accumulates, when the wrong has already been done",
    "asceticism": "when detachment from the world is the practice, when enough is enough",
    "contentment": "when wanting more steals peace, when enough is wealth",
    "trust in god": "when outcomes are out of your hands, when surrender is the only move",
    "good deeds": "when small acts seem pointless, when every good deed compounds",
    "remembrance": "when God feels distant, when the heart needs re-anchoring",
    "backbiting": "when speech about the absent could wound",
    "envy": "when comparing yourself to others becomes corrosive",
    "pride and arrogance": "when ego inflates, when status becomes identity",
    "the self": "when self-mastery is the work, when the inner battle is the real one",
    "struggling against the self": "when the hardest enemy is inside, when inner work is the real jihad",
    "courage": "when fear holds back what is right, when acting takes nerve",
    "determination": "when resolve must be the rudder, when wavering",
    "advice": "when counsel is given or received, when learning from others' experience",
    "time": "when moments pass unnoticed, when urgency is the lesson",
    "opportunity": "when chances appear and vanish, when hesitation is the real cost",
    "work and effort": "when effort must precede outcome, when diligence is the path",
    "striving and seeking": "when beginning a pursuit, when the outcome is uncertain",
    "diligence and striving": "when effort feels unrewarded, when giving up tempts",
    "near relatives": "when family bonds have weakened, when kin deserve renewed care",
    "the son of adam": "when mortality and frailty are the lesson, when humbling of ego is needed",
    "trustworthiness": "when integrity is tested, when trust is the currency",
    "justice and fairness": "when fairness competes with loyalty, when equality is the measure",
    "the appointed time of death": "when urgency of the finite is the teaching",
    "hope and aspiration": "when hope must be realistic, when aspiration must drive action",
    "forgiving and pardoning": "when forgiving a wrong, when pardon is the nobler choice",
    "hospitality": "when generosity to guests is the teaching",
    "the tongue": "when words carry more weight than intended, when to speak is the question",
    "lying": "when deception tempts, when truthfulness is the harder and better path",
    "hypocrisy": "when outward appearance hides inner reality",
    "consultation": "when deciding whether to seek counsel, when others' wisdom is needed",
    "modesty": "when restraint and shame are protective, when modesty is the shield",
    "gratitude and thankfulness": "when blessing goes unacknowledged, when gratitude is the practice",
    "the heart": "when the inner state is the real battleground",
    "goodness": "when a small good act seems worthless, when goodness compounds silently",
    "good": "when a small good act seems worthless, when goodness compounds silently",
    "religion": "when religion is the anchor in turbulence",
    "peace and reconciliation": "when conflict could be resolved, when peace is chosen over pride",
    "fasting": "when restraint at a deeper level is needed",
    "correctness": "when precision and accuracy are the virtue",
    "the apologizing": "when pride resists saying sorry, when repair is the goal",
    "apologizing": "when pride resists saying sorry, when repair is the goal",
    "vices": "when a bad habit needs confronting, when naming the fault is the first step",
    "the student of knowledge": "when beginning to learn, when patience with the process is the lesson",
    "leadership": "when authority is the responsibility, when power must serve",
    "governance": "when power must serve people, when authority is stewardship",
    "the imam": "when guidance and leadership are the subject",
    "doing good": "when virtuous acts need no audience, when good deeds compound",
    "listening": "when attentiveness is wisdom, when the ears teach what the mouth cannot",
    "the nation": "when community and collective responsibility are the focus",
    "eating": "when moderation in appetite is the teaching",
    "beauty": "when inner beauty outranks the outer",
    "the body": "when physical care and its limits are the lesson",
    "blessing and bounty": "when God's gifts are the subject, when gratitude is the response",
    "books and writing": "when preserving wisdom matters, when learning from what is written",
    "the heart and soul": "when the innermost state matters most",
    "sleep": "when rest and wakefulness carry wisdom",
    "wealth and possessions": "when possessions become burdens, when enough is freedom",
    "children": "when raising children is the work, when legacy is the question",
    "women": None,  # skip — historically problematic in context
    "buying and selling": "when dealings and commerce carry ethical weight",
    "the judge": "when fairness in judgment is the subject",
    "kings": "when power and its responsibility are the lesson",
    "medicine": "when healing body and soul are linked",
    "supplication": "when prayer and petition are the practice",
    "asking for forgiveness": "when seeking God's mercy, when repentance is the door",
    "asking": "when asking for help or forgiveness is the act",
}

# Sections to completely skip (too sensitive, OCR-heavy, or non-applicable)
SKIP_SECTIONS = {
    "women", "the camel", "buying and selling", "selling",
    "the imam", "kings", "the apostle", "the nation",
}


def is_clean_arabic(text: str) -> bool:
    """Return True if text looks like authentic diacritized Arabic."""
    if not text:
        return False
    # Must have at least 4 Arabic characters
    arabic_chars = sum(1 for c in text if '؀' <= c <= 'ۿ')
    if arabic_chars < 4:
        return False
    # Reject if has lots of Latin letters (OCR garbage)
    latin = sum(1 for c in text if c.isalpha() and c.isascii())
    if latin > 5:
        return False
    # Reject if has unusual codepoints > U+06FF that aren't punctuation
    for c in text:
        cp = ord(c)
        if cp > 0x06FF and cp not in (0x200C, 0x200D, 0xFEFB, 0x060C, 0x061B, 0x061F,
                                       0x200F, 0x200E, 0x00B7, 0xFB50, 0xFE70) and \
           not (0xFB50 <= cp <= 0xFDFF) and not (0xFE70 <= cp <= 0xFEFF):
            return False
    return True


def word_count(text: str) -> int:
    return len(text.split())


def slugify_section(name: str) -> str:
    return name.lower().strip()


def get_theme(section_name: str):
    key = slugify_section(section_name)
    # Direct match
    if key in SECTION_THEMES:
        return SECTION_THEMES[key]
    # Partial match
    for k, v in SECTION_THEMES.items():
        if k in key or key in k:
            return v
    # Generic fallback
    return f"when {section_name.lower()} is the teaching needed"


def escape_ts(s: str) -> str:
    """Escape for TypeScript single-quoted string."""
    s = s.replace("\\", "\\\\")
    s = s.replace("'", "\\'")
    return s


def parse_ghurar(path: str):
    with open(path, encoding="utf-8") as f:
        lines = f.readlines()

    # Skip preamble
    lines = lines[SKIP_LINES:]

    entries = []
    current_section = ""
    i = 0

    # Regex patterns
    # English: "N. text" or "N) text"
    en_pat = re.compile(r'^\s*(\d+)[.)]\s+(.+)$')
    # Arabic: "Nـ text" or "Nـ text" — the ـ char is U+0640 (TATWEEL)
    ar_pat = re.compile(r'^\s*\d+[ـ\-ـ]\s*(.+)$')

    pending_english = None
    pending_number = None

    while i < len(lines):
        raw = lines[i]
        line = raw.strip()

        # Skip completely empty lines
        if not line:
            i += 1
            continue

        # Detect section heading: a line that is mostly ASCII letters/spaces,
        # followed immediately by a line with the same text + Arabic
        # We detect it as: no leading digit, no ـ char, not too long, not a sentence
        # Actually simpler: if a line is short and all alpha/space and the NEXT
        # non-empty line contains Arabic after similar text → section heading.
        if (len(line) < 80
                and not re.match(r'^\d', line)
                and 'ـ' not in line  # no tatweel = not Arabic numbered
                and not line.startswith('1.')  # not first entry
                and sum(1 for c in line if '؀' <= c <= 'ۿ') < 5  # few Arabic chars
                and sum(1 for c in line if c.isalpha()) > 2):
            # Check next non-empty line: if it has Arabic, this is a section heading
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j < len(lines):
                next_line = lines[j].strip()
                arabic_in_next = sum(1 for c in next_line if '؀' <= c <= 'ۿ')
                if arabic_in_next > 3 and line.split()[0].lower() in next_line.lower():
                    new_section = line.strip()
                    if slugify_section(new_section) not in SKIP_SECTIONS:
                        current_section = new_section
                    else:
                        current_section = "__SKIP__"
                    pending_english = None
                    pending_number = None
                    i += 1
                    continue

        if current_section == "__SKIP__":
            i += 1
            continue

        # Match English entry
        m_en = en_pat.match(line)
        if m_en:
            num = int(m_en.group(1))
            text_en = m_en.group(2).strip()
            # Remove footnote markers like " 1 " or "[1]"
            text_en = re.sub(r'\s*\d+\s*$', '', text_en).strip()
            text_en = re.sub(r'\s*\[\d+\]\s*$', '', text_en).strip()
            pending_english = text_en
            pending_number = num
            i += 1
            continue

        # Match Arabic entry
        m_ar = ar_pat.match(line)
        if m_ar:
            arabic = m_ar.group(1).strip()
            # Remove trailing footnote numbers
            arabic = re.sub(r'\s*\d+\s*$', '', arabic).strip()
            arabic = re.sub(r'&#\d+;', '', arabic).strip()

            if (pending_english
                    and current_section
                    and is_clean_arabic(arabic)
                    and word_count(arabic) >= 3
                    and word_count(arabic) <= 50
                    and word_count(pending_english) >= 3
                    and word_count(pending_english) <= 80):
                theme = get_theme(current_section)
                if theme is not None:
                    entries.append({
                        "arabic": arabic,
                        "english": pending_english,
                        "source": f"Ghurar al-Hikam, {current_section} §{pending_number}",
                        "theme": theme,
                    })
            pending_english = None
            pending_number = None
            i += 1
            continue

        i += 1

    return entries


def render_ts(entries):
    lines = []
    lines.append("// Auto-extracted from Ghurar al-Hikam (ghurar_extract.py)")
    lines.append(f"// {len(entries)} entries — paste into BASELINE_WISDOM[] in baseline-corpus.ts")
    lines.append("")
    for e in entries:
        ar = escape_ts(e["arabic"])
        en = escape_ts(e["english"])
        src = escape_ts(e["source"])
        th = escape_ts(e["theme"])
        lines.append("  {")
        lines.append(f"    arabic: '{ar}',")
        lines.append(f"    english: '{en}',")
        lines.append(f"    source: '{src}',")
        lines.append(f"    theme: '{th}',")
        lines.append("  },")
    return "\n".join(lines)


if __name__ == "__main__":
    entries = parse_ghurar(GHURAR_FILE)
    # Deduplicate by arabic text
    seen = set()
    unique = []
    for e in entries:
        key = e["arabic"][:40]
        if key not in seen:
            seen.add(key)
            unique.append(e)
    print(f"// Extracted {len(unique)} unique entries", file=sys.stderr)
    output = sys.argv[1] if len(sys.argv) > 1 else None
    rendered = render_ts(unique)
    if output:
        with open(output, "w", encoding="utf-8") as f:
            f.write(rendered)
        print(f"Written to {output}", file=sys.stderr)
    else:
        print(rendered)
