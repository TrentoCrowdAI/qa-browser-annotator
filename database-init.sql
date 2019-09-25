CREATE TABLE IF NOT EXISTS annotations (
  ID SERIAL PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp,
  webpageurl text NOT NULL,
  data JSONB
);
GRANT ALL PRIVILEGES ON TABLE annotations TO qauser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO qauser;