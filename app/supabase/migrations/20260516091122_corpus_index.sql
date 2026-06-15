-- ============================================================
-- Step 7b · Similarity index
-- HNSW index for fast approximate-nearest-neighbour search over
-- the gte-small embeddings (cosine distance).
-- ============================================================

create index if not exists teachings_embedding_hnsw
  on public.teachings
  using hnsw (embedding vector_cosine_ops);
