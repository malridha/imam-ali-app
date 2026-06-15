#!/usr/bin/env python3
"""
Convert EPUB and PDF source files into plain text (.txt).

EPUBs are zip files containing HTML. PDFs use pypdf for extraction.
Output goes to /sources/extracted/<name>.txt
"""
import zipfile
import re
import os
import sys
from pathlib import Path

SOURCES_DIR = Path(__file__).parent
OUT_DIR = SOURCES_DIR / "extracted"
OUT_DIR.mkdir(exist_ok=True)


def strip_html(html: str) -> str:
    """Remove HTML tags, collapse whitespace."""
    # Drop <head>...</head> entirely
    html = re.sub(r"<head\b[^>]*>.*?</head>", "", html, flags=re.S | re.I)
    # Drop <script>, <style>
    html = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", "", html, flags=re.S | re.I)
    # Newlines after block elements before stripping
    html = re.sub(r"</?(p|div|br|h[1-6]|li|tr)\b[^>]*>", "\n", html, flags=re.I)
    # Strip all remaining tags
    text = re.sub(r"<[^>]+>", " ", html)
    # Decode common HTML entities
    text = (
        text.replace("&nbsp;", " ")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", '"')
        .replace("&#39;", "'")
    )
    # Collapse whitespace
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)
    return text.strip()


def epub_to_text(epub_path: Path) -> str:
    """Extract text from an EPUB by reading every HTML file inside."""
    chunks = []
    with zipfile.ZipFile(epub_path) as z:
        # Read HTML/XHTML files in archive order (preserves book order)
        for name in z.namelist():
            if name.lower().endswith((".html", ".xhtml", ".htm")):
                data = z.read(name).decode("utf-8", errors="ignore")
                chunks.append(strip_html(data))
    return "\n\n".join(c for c in chunks if c)


def pdf_to_text(pdf_path: Path) -> str:
    """Extract text from a PDF."""
    from pypdf import PdfReader
    r = PdfReader(str(pdf_path))
    pages = []
    for i, p in enumerate(r.pages):
        t = (p.extract_text() or "").strip()
        if t:
            pages.append(f"=== Page {i+1} ===\n{t}")
    return "\n\n".join(pages)


def main():
    epubs = sorted(SOURCES_DIR.glob("*.epub"))
    pdfs = sorted(SOURCES_DIR.glob("*.pdf"))

    print(f"Found {len(epubs)} EPUBs and {len(pdfs)} PDFs")
    print(f"Output → {OUT_DIR}\n")

    for f in epubs:
        out = OUT_DIR / (f.stem + ".txt")
        print(f"[EPUB] {f.name} → {out.name} ... ", end="", flush=True)
        text = epub_to_text(f)
        out.write_text(text, encoding="utf-8")
        ar = sum(1 for c in text if "؀" <= c <= "ۿ")
        print(f"{len(text):,} chars ({ar:,} Arabic, {100*ar/max(len(text),1):.1f}%)")

    for f in pdfs:
        out = OUT_DIR / (f.stem + ".txt")
        print(f"[PDF]  {f.name} → {out.name} ... ", end="", flush=True)
        try:
            text = pdf_to_text(f)
            out.write_text(text, encoding="utf-8")
            ar = sum(1 for c in text if "؀" <= c <= "ۿ")
            print(f"{len(text):,} chars ({ar:,} Arabic, {100*ar/max(len(text),1):.1f}%)")
        except Exception as e:
            print(f"FAILED: {e}")


if __name__ == "__main__":
    main()
