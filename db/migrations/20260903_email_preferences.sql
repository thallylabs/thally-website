-- Email preferences and unsubscribes from the marketing site.
--
-- thally.io/unsubscribe is the landing page for every "Email preferences"
-- footer link and for List-Unsubscribe headers. It posts to
-- /api/unsubscribe (a Netlify Function in thally-website), which writes here.
--
-- Same shape of trust as contact_messages: the writer is an anonymous visitor
-- holding a signed link, there is no authenticated principal, so no org or
-- site foreign keys and no cascade. The sending system reads
-- `email_preferences` before every send; `email_preference_events` is the
-- append-only trail behind it, so an unsubscribe can be traced (and undone)
-- after the fact.
--
-- Category columns mirror EMAIL_CATEGORIES in src/lib/email-preferences.ts.
-- Add or drop a column there and here together.
--
-- `ip_hash` is a salted digest, never an address; it exists for throttling
-- and abuse review only.
--
-- Safe to re-run. Additive only.
CREATE TABLE IF NOT EXISTS email_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  announcements boolean NOT NULL DEFAULT true,
  digest boolean NOT NULL DEFAULT true,
  activity boolean NOT NULL DEFAULT true,
  tips boolean NOT NULL DEFAULT true,
  unsubscribed_all boolean NOT NULL DEFAULT false,
  unsubscribed_at timestamptz,
  source text NOT NULL,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_preferences_email_len CHECK (char_length(email) BETWEEN 3 AND 254),
  CONSTRAINT email_preferences_email_lower CHECK (email = lower(email)),
  CONSTRAINT email_preferences_source_known CHECK (source IN ('save', 'unsubscribe_all', 'restore', 'one_click', 'form'))
);

-- One row per address; the handler upserts on it.
CREATE UNIQUE INDEX IF NOT EXISTS email_preferences_email_idx
  ON email_preferences (email);

-- "Who unsubscribed this week" reads newest first.
CREATE INDEX IF NOT EXISTS email_preferences_unsubscribed_at_idx
  ON email_preferences (unsubscribed_at DESC)
  WHERE unsubscribed_all;

CREATE TABLE IF NOT EXISTS email_preference_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  action text NOT NULL,
  announcements boolean NOT NULL,
  digest boolean NOT NULL,
  activity boolean NOT NULL,
  tips boolean NOT NULL,
  unsubscribed_all boolean NOT NULL,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_preference_events_email_len CHECK (char_length(email) BETWEEN 3 AND 254),
  CONSTRAINT email_preference_events_action_known CHECK (action IN ('save', 'unsubscribe_all', 'restore', 'one_click', 'form'))
);

CREATE INDEX IF NOT EXISTS email_preference_events_email_created_at_idx
  ON email_preference_events (email, created_at DESC);

CREATE INDEX IF NOT EXISTS email_preference_events_created_at_idx
  ON email_preference_events (created_at DESC);

COMMENT ON TABLE email_preferences IS
  'Current email opt-ins per address, written by thally.io/unsubscribe. No tenant owns a row.';
COMMENT ON COLUMN email_preferences.source IS
  'The action that last changed the row: save, unsubscribe_all, restore, one_click (List-Unsubscribe-Post) or form.';
COMMENT ON COLUMN email_preferences.ip_hash IS
  'Salted digest used only for throttling and abuse review. Never an address.';
COMMENT ON TABLE email_preference_events IS
  'Append-only trail of every preference change, one row per action, newest last.';
