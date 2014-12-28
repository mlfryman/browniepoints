CREATE TABLE images(
  id serial PRIMARY KEY,
  url varchar(1000) NOT NULL,
  prize_id integer NOT NULL REFERENCES prizes(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
