#!/usr/bin/env python3
"""
insert_via_api.py — Insert corpus_seed.sql into Supabase via REST API

Usage:
    1. Set SUPABASE_SERVICE_ROLE_KEY below (from Supabase Dashboard → Settings → API)
    2. Run: python3 /tmp/insert_via_api.py

The service role key bypasses Row Level Security (RLS), which is required for
bulk inserts. The anon key will NOT work here unless INSERT is explicitly
granted to the anon role in your RLS policies.

Find your service role key at:
  https://supabase.com/dashboard/project/sunvqtxesfdkrqkulwys/settings/api
  Under "Project API keys" → "service_role" (click Reveal)
"""

import re
import csv
import io
import sys
import time
import json
import urllib.request
import urllib.error

# ─── CONFIGURATION ────────────────────────────────────────────────────────────

SUPABASE_URL     = "https://sunvqtxesfdkrqkulwys.supabase.co"
SERVICE_ROLE_KEY = "REPLACE_WITH_YOUR_KEY_FROM_SUPABASE_DASHBOARD"

SQL_FILE         = "/tmp/corpus_seed.sql"
TABLE            = "public.teachings"   # schema.table
BATCH_SIZE       = 500                  # rows per REST call (safe limit)
RETRY_LIMIT      = 3                    # retries per batch on transient errors
RETRY_DELAY      = 3                    # seconds between retries

# ─── PARSE SQL FILE ───────────────────────────────────────────────────────────

def parse_sql_rows(path: str) -> list[dict]:
    """Parse INSERT ... VALUES (...) rows from the SQL file into dicts."""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"VALUES\s*(.*?)\s*ON CONFLICT", content, re.DOTALL)
    if not match:
        sys.exit("ERROR: Could not find VALUES block in SQL file.")

    values_block = match.group(1).strip()

    # Split on tuple boundaries: ),\n  (
    raw_tuples = re.split(r"\),\s*\n\s*\(", values_block)

    # Strip the outer parentheses from first and last
    raw_tuples[0]  = raw_tuples[0].lstrip("(")
    raw_tuples[-1] = raw_tuples[-1].rstrip(")")

    rows = []
    for i, raw in enumerate(raw_tuples):
        reader = csv.reader(io.StringIO(raw), quotechar="'", skipinitialspace=True)
        try:
            fields = next(reader)
        except StopIteration:
            print(f"WARNING: Empty row at index {i}, skipping.")
            continue

        # csv.reader with single-quote quotechar returns empty strings between
        # comma-separated fields that aren't quoted — filter them out.
        fields = [f for f in fields if f != ""]

        if len(fields) != 4:
            print(f"WARNING: Row {i} has {len(fields)} fields (expected 4), skipping: {raw[:60]!r}")
            continue

        rows.append({
            "arabic":  fields[0],
            "english": fields[1],
            "source":  fields[2],
            "domain":  fields[3],
        })

    return rows

# ─── INSERT VIA REST API ──────────────────────────────────────────────────────

def insert_batch(batch: list[dict], batch_num: int, total_batches: int) -> bool:
    """POST one batch to the Supabase REST API. Returns True on success."""
    url     = f"{SUPABASE_URL}/rest/v1/teachings"
    payload = json.dumps(batch).encode("utf-8")
    headers = {
        "apikey":        SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "Content-Type":  "application/json",
        "Prefer":        "resolution=ignore-duplicates,return=minimal",
    }

    for attempt in range(1, RETRY_LIMIT + 1):
        req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                status = resp.status
                if status in (200, 201):
                    print(f"  Batch {batch_num}/{total_batches} → {len(batch)} rows inserted (HTTP {status})")
                    return True
                else:
                    body = resp.read().decode("utf-8", errors="replace")
                    print(f"  Batch {batch_num} attempt {attempt}: unexpected HTTP {status}: {body[:200]}")
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            print(f"  Batch {batch_num} attempt {attempt}: HTTP {e.code} — {body[:300]}")
        except urllib.error.URLError as e:
            print(f"  Batch {batch_num} attempt {attempt}: network error — {e.reason}")
        except Exception as e:
            print(f"  Batch {batch_num} attempt {attempt}: unexpected error — {e}")

        if attempt < RETRY_LIMIT:
            print(f"  Retrying in {RETRY_DELAY}s …")
            time.sleep(RETRY_DELAY)

    print(f"  Batch {batch_num} FAILED after {RETRY_LIMIT} attempts.")
    return False

# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    if SERVICE_ROLE_KEY == "REPLACE_WITH_YOUR_KEY_FROM_SUPABASE_DASHBOARD":
        print(
            "\nERROR: You must set SERVICE_ROLE_KEY in this script before running.\n"
            "Find it at:\n"
            "  https://supabase.com/dashboard/project/sunvqtxesfdkrqkulwys/settings/api\n"
            "  Under 'Project API keys' → 'service_role' (click Reveal)\n"
        )
        sys.exit(1)

    print(f"Parsing {SQL_FILE} …")
    rows = parse_sql_rows(SQL_FILE)
    print(f"Parsed {len(rows)} rows.\n")

    batches = [rows[i : i + BATCH_SIZE] for i in range(0, len(rows), BATCH_SIZE)]
    total   = len(batches)
    print(f"Inserting in {total} batches of up to {BATCH_SIZE} rows each …\n")

    failed_batches = []
    for idx, batch in enumerate(batches, start=1):
        success = insert_batch(batch, idx, total)
        if not success:
            failed_batches.append(idx)
        # Small pause between batches to be kind to the API
        if idx < total:
            time.sleep(0.25)

    print()
    if not failed_batches:
        print(f"Done! All {len(rows)} rows inserted successfully.")
    else:
        print(f"Completed with errors. Failed batches: {failed_batches}")
        print("Re-running the script is safe — ON CONFLICT DO NOTHING means duplicates are skipped.")
        sys.exit(1)

if __name__ == "__main__":
    main()
