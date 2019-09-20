CREATE TABLE IF NOT EXISTS annotations (
  ID SERIAL PRIMARY KEY,
  username varchar(150) NOT NULL,
  creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  webpageurl text NOT NULL,
  annotation JSON NOT NULL
);
GRANT ALL PRIVILEGES ON TABLE annotations TO qauser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO qauser;