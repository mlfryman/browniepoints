CREATE TABLE prizes_tags(
  prize_id INTEGER NOT NULL REFERENCES prizes(id),
  tag_id INTEGER NOT NULL REFERENCES tags(id)
);
