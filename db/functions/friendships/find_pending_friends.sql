CREATE OR REPLACE FUNCTION find_pending_friends (u_id INTEGER)
RETURNS TABLE (
               "friendshipId" INTEGER,
               "name" TEXT,
               "username" VARCHAR,
               "email" VARCHAR,
               "gravatar" VARCHAR,
               "avatar" VARCHAR,
               "date" TIMESTAMPTZ
               ) AS $$
DECLARE
BEGIN
  RETURN QUERY
    SELECT
      f.id AS "friendshipId",
      RTRIM(u.first_name) || ' ' || RTRIM(u.last_name) AS "name",
      u.username AS "username",
      u.email AS "email",
      u.gravatar AS "gravatar",
      u.avatar AS "avatar",
      f.requested_at AS "date"
    FROM users u, friendships f
    WHERE
      CASE
        WHEN f.friend1_id = u_id
        THEN f.friend2_id = u.id
        WHEN f.friend2_id = u_id
        THEN f.friend1_id = u.id
      END
    AND f.accepted = FALSE
    ORDER BY f.requested_at;

END;
$$ LANGUAGE plpgsql;
