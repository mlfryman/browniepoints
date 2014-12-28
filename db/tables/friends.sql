CREATE TABLE friends_users(
  user_id integer NOT NULL REFERENCES users(id),
  friend_id integer NOT NULL REFERENCES users(id)
);
