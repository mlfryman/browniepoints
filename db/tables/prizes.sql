CREATE TABLE prizes(
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  cost integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id integer NOT NULL REFERENCES users(id)
);
