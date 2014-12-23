CREATE TABLE prizes(
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  body varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id integer NOT NULL REFERENCES users(id),
  category_id integer NOT NULL REFERENCES (id),
  photo_id integer NOT NULL REFERENCES photos(id)
);
