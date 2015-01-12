CREATE OR REPLACE FUNCTION find_pending_friends (u_id INTEGER)
RETURNS TABLE ("friendshipId" INTEGER, "date" TIMESTAMPTZ, "firstName" VARCHAR, "lastName" VARCHAR, "username" VARCHAR, "email" VARCHAR, "gravatar" VARCHAR) AS $$
DECLARE
BEGIN
  RETURN QUERY
    SELECT f.id AS "friendshipId", f.created_at AS "date", u.first_name AS "firstName", u.last_name AS "lastName", u.username AS "username", u.email AS "email", u.gravatar AS "gravatar"
    FROM users u, friendships f
    WHERE
      CASE
        WHEN f.friend1_id = u_id
        THEN f.friend2_id = u.id
        WHEN f.friend2_id = u_id
        THEN f.friend1_id = u.id
      END
    AND f.accepted = FALSE
    ORDER BY f.created_at;

END;
$$ LANGUAGE plpgsql;
