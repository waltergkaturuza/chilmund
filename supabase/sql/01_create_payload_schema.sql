-- Run once in Supabase → SQL Editor (your existing database is unchanged except for this new schema).
-- Payload will create all CMS tables ONLY inside this schema — not in `public`.

CREATE SCHEMA IF NOT EXISTS chilmund_payload;

COMMENT ON SCHEMA chilmund_payload IS 'Chilmund website — Payload CMS (isolated from other schemas)';

-- Connection strings usually use the `postgres` role. Add more GRANTs if your pool user is different.
GRANT USAGE ON SCHEMA chilmund_payload TO postgres;
GRANT CREATE ON SCHEMA chilmund_payload TO postgres;
GRANT ALL ON SCHEMA chilmund_payload TO postgres;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA chilmund_payload
  GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA chilmund_payload
  GRANT ALL ON SEQUENCES TO postgres;
