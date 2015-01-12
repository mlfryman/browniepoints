CREATE TABLE wallets(
  id SERIAL PRIMARY KEY,
  friendship_id INTEGER NOT NULL REFERENCES friendships(id),
  user_id INTEGER NOT NULL REFERENCES users(id)
);
