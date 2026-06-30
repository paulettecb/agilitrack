-- AgiliTrack - Initial Schema
-- Run in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Courses ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('XS','S','M','L')),
  ruleset       TEXT NOT NULL DEFAULT 'FCI_2023' CHECK (ruleset IN ('FCI_2023','AKC','FCM')),
  canvas_width_m  NUMERIC(5,1) DEFAULT 40,
  canvas_height_m NUMERIC(5,1) DEFAULT 20,
  obstacles     JSONB NOT NULL DEFAULT '[]',
  validation    JSONB NOT NULL DEFAULT '{"is_valid":false,"errors":[],"warnings":[]}',
  created_by    UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Training Sessions ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS training_sessions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date          DATE NOT NULL,
  dog_name      TEXT NOT NULL,
  course_id     UUID REFERENCES courses(id),
  result        TEXT NOT NULL CHECK (result IN ('clean','faults','eliminated','dnf')),
  time_seconds  NUMERIC(6,2),
  faults        INTEGER NOT NULL DEFAULT 0,
  notes         TEXT,
  created_by    UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Competition Results ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS competition_results (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date            DATE NOT NULL,
  event_name      TEXT NOT NULL,
  location        TEXT,
  category        TEXT NOT NULL CHECK (category IN ('XS','S','M','L')),
  run_type        TEXT NOT NULL CHECK (run_type IN ('agility','jumping')),
  result          TEXT NOT NULL CHECK (result IN ('clean','faults','eliminated','dnf')),
  time_seconds    NUMERIC(6,2),
  standard_time   NUMERIC(6,2),
  faults          INTEGER NOT NULL DEFAULT 0,
  placement       INTEGER,
  judge           TEXT,
  notes           TEXT,
  created_by      UUID REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────────────────
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_results ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own data
CREATE POLICY "own_courses" ON courses
  FOR ALL USING (auth.uid() = created_by);

CREATE POLICY "own_sessions" ON training_sessions
  FOR ALL USING (auth.uid() = created_by);

CREATE POLICY "own_competitions" ON competition_results
  FOR ALL USING (auth.uid() = created_by);

-- ─── Updated_at trigger ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
