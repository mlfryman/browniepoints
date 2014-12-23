CREATE TABLE photos(
  id serial PRIMARY KEY,
  url varchar(1000) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  prize_id integer NOT NULL REFERENCES prizes(id)
);
