# Source library

Classical Islamic source texts used to extract entries for the corpus baked
into the system prompt (`app/src/lib/prompts/baseline-corpus.ts`).

These files are NOT shipped with the app. They live here as the upstream
material that agents read from when expanding the corpus. The build pipeline
never touches them.

## Workflow

```
1. Drop new source (EPUB or PDF) into this folder
2. Run:    python3 sources/convert.py
3. Spawn agents that read from `sources/extracted/*.txt`
4. Agents extract entries verbatim into `baseline-corpus.ts`
```

The conversion script (`convert.py`) handles both EPUB and PDF. EPUBs are
zip files of HTML — it strips tags. PDFs use `pypdf`. Output goes to
`sources/extracted/` as plain `.txt`.

## What's in here

### Tier S — voweled Arabic, agent-ready
| File | Size | Arabic chars | Notes |
|------|------|--------------|-------|
| `ghurar-al-hikam.epub` | 964 K | 576 K | **THE big one.** ~11,000 sayings of Imam Ali, numbered, theme-organised. Fully voweled. |
| `nahj-al-balagha-sermons.epub` | 695 K | 358 K | Nahj sermons with Arabic + English. Full Subhi al-Salih edition. |
| `nahj-al-balagha-letters-sayings.epub` | 360 K | 204 K | Nahj letters + sayings (companion to sermons). |
| `sahifa-sajjadiyya.epub` | 352 K | 235 K | Imam Sajjad's prayers, voweled Arabic + English + isnad. |

### Tier A — useful, needs minor cleanup
| File | Size | Arabic chars | Notes |
|------|------|--------------|-------|
| `mafatih-al-jinan.pdf` | 6.7 M | 502 K | Voweled bilingual du'as + ziyarat. |
| `bihar-al-anwar-ar-vol1.pdf` | 33 M | 460 K | Bihar al-Anwar vol 1. Arabic-only. Some RTL extraction quirks. |
| `al-kafi-en-vol1.pdf` | 1.9 M | 0 | English-only, clean text. Vol 1 of 8. Has hadith numbering. |
| `al-kafi-selections.epub` | 22 K | 4.5 K | Bilingual selections — supplement to the full al-Kafi. |
| `nahj-al-balagha-en.pdf` | 15 M | 0 | English Nahj. Has missing-space issue (`WhenTalhaand…`) — needs cleanup. |
| `sahifa-sajjadiyya-3col.pdf` | 39 M | 0 | 3-column Sahifa. Font-substitution glyphs make raw text hard. Use the EPUB instead. |
| `nahj-glimpses-en.epub` | 265 K | 0 | English-only Nahj commentary. Reference material. |

### Convention
- Filenames are slugified — `nahj-al-balagha-sermons` not `Nahjul Balagha Part 1 - The Sermons`.
- `*.epub` and `*.pdf` sit at the top of `sources/`.
- `extracted/` mirrors the source filenames with `.txt` extension.

## Skipped sources (not worth bringing in)

These were inspected and rejected:
- `Al_veFatima.zip` — Turkish-language content, not Arabic.
- `Nahjul Balagah a/b.zip` — windows-1256 encoded HTML, harder to clean than the EPUB equivalents we have.
- `NahjulBalaghavol.1-TranslatedByYasinAlJibouri.pdf` — scanned images, would need OCR.
- `Great Shi'i Works_ Al-Kafi.epub` — 13 KB abstract only, no real content.
- `The Contents of Nahjul Balaghah.epub` — index page only.

## Re-running extraction

If you add a new source PDF or EPUB, just run:

```bash
python3 sources/convert.py
```

It processes every file in `sources/` and overwrites `extracted/*.txt`.
Safe to re-run anytime.

## Extraction status

| Source | Entries already extracted to corpus | Remaining ceiling |
|--------|-------------------------------------|-------------------|
| Ghurar al-Hikam | ~350 (from memory, pre-source) | ~1,500–2,500 more |
| Nahj al-Balagha (full) | ~300 (from memory) | ~400 more |
| Sahifa Sajjadiyya | ~25 (from memory) | ~250 more |
| Al-Kafi | ~50 (from memory) | ~200 more |
| Mafatih al-Jinan | ~30 (from memory) | ~250 more |
| Bihar al-Anwar | ~15 (from memory) | ~150 more |

Library status at last deploy: **1,000 entries**. Realistic source-grounded
ceiling: **~3,500–5,000 entries**.
