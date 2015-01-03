CREATE TABLE prizes(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL DEFAULT 1 CHECK (cost > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id INTEGER NOT NULL REFERENCES users(id)
);
