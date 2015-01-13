CREATE OR REPLACE FUNCTION show_friend (u_id INTEGER, f_id INTEGER)
RETURNS TABLE (
               "friendshipId" INTEGER,
               "friendId" INTEGER,
               "name" TEXT,
               "username" VARCHAR,
               "gravatar" VARCHAR,
               "avatar" VARCHAR
               ) AS $$
DECLARE
BEGIN
  RETURN QUERY
    SELECT
      f.id AS "friendshipId",
      u.id AS "friendId",
      RTRIM(u.first_name) || ' ' || RTRIM(u.last_name) AS "name",
      u.username AS "username",
      u.gravatar AS "gravatar",
      u.avatar AS "avatar"
    FROM users u, users m, friendships f
    WHERE
      CASE
        WHEN f.friend1_id = u_id
        THEN f.friend2_id = u.id
        WHEN f.friend2_id = u_id
        THEN f.friend1_id = u.id
      END
    AND f.id = f_id;

END;
$$ LANGUAGE plpgsql;
