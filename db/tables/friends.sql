CREATE TABLE friends_users(
  user_id INTEGER NOT NULL REFERENCES users(id),
  friend_id INTEGER NOT NULL REFERENCES users(id)
);
