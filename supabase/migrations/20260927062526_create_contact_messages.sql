/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — visitor's name
  - `email` (text, not null) — visitor's email (used as reply-to)
  - `subject` (text, not null) — message subject
  - `message` (text, not null) — full message body
  - `submitted_at` (timestamptz, default now()) — submission timestamp
  - `ip_address` (text, nullable) — for basic spam tracking
  - `status` (text, default 'pending') — email delivery status

2. Security
- Enable RLS on `contact_messages`.
- This is a no-auth public portfolio: allow anon + authenticated to INSERT only.
- No SELECT/UPDATE/DELETE for anon — messages are private to the site owner.
- The edge function uses the service role key to read and update rows, bypassing RLS.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Only allow anonymous inserts (form submissions). No reads/updates/deletes from anon.
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Add an index on submitted_at for ordering queries from the edge function
CREATE INDEX IF NOT EXISTS idx_contact_messages_submitted_at
ON contact_messages (submitted_at DESC);
