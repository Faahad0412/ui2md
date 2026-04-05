-- UI2MD: Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extractions table: stores every URL scrape result
CREATE TABLE IF NOT EXISTS extractions (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  url           TEXT        NOT NULL,
  design_markdown TEXT      NOT NULL,
  design_tokens JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by URL
CREATE INDEX IF NOT EXISTS idx_extractions_url ON extractions (url);

-- Index for chronological ordering
CREATE INDEX IF NOT EXISTS idx_extractions_created_at ON extractions (created_at DESC);

-- Enable Row Level Security
ALTER TABLE extractions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access (adjust for auth later)
CREATE POLICY "Allow public read"
  ON extractions FOR SELECT
  USING (true);

-- Policy: Allow public insert (lock down with auth later)
CREATE POLICY "Allow public insert"
  ON extractions FOR INSERT
  WITH CHECK (true);
