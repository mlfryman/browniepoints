CREATE TABLE messages(
  id serial PRIMARY KEY,
  from_id integer NOT NULL REFERENCES users(id),
  to_id integer NOT NULL REFERENCES users(id),
  subject varchar(255) NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_read boolean
);
