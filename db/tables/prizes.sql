CREATE TABLE prizes(
  id SERIAL PRIMARY KEY,
  friendship_id INTEGER NOT NULL REFERENCES friendships(id),
  owner_id INTEGER NOT NULL REFERENCES users(id),
  from_id INTEGER NOT NULL REFERENCES users(id),
  to_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  cost INTEGER NOT NULL DEFAULT 1 CHECK (cost > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
