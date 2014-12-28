CREATE TABLE prizes_tags(
  prize_id integer NOT NULL REFERENCES prizes(id),
  tag_id integer NOT NULL REFERENCES tags(id)
);
