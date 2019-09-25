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

/* 
fields example for annotations table:
  ID: generated id,
  created_at: creation date,
  updated_at: update date,
  deleted_at: delete date,
  webpageurl: webpage url refered to annotations,
  data: all the annotations with the following structure:
  [
    {
      annotation_id: "528df360-dfb5-11e9-b7ab-170cdac35bcf",
      pageurl: "https://it.wikipedia.org/wiki/Trento",
      quote: "piuttosto diversi l'uno dall'altro e che conservano ancora una propria identità sia urbana",
      ranges: [
        {
          end: "/div[3]/div[3]/div[4]/div[1]/p[3]",
          endOffset: 263,
          start: "/div[3]/div[3]/div[4]/div[1]/p[3]",
          startOffset: 71,
        }
      ],
      text: "comment here"
    }
  ]
*/
