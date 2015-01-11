CREATE TABLE prizes(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL DEFAULT 1 CHECK (cost > 0),
  friendship_id INTEGER NOT NULL REFERENCES friendships(id),
  creator_id INTEGER NOT NULL REFERENCES users(id),
  owner_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  bought_at TIMESTAMPTZ
);
