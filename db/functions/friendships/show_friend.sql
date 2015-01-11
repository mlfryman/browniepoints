CREATE OR REPLACE FUNCTION show_friend (u_id INTEGER, f_id INTEGER)
RETURNS TABLE ("friendshipId" INTEGER, "friendId" INTEGER, "firstName" VARCHAR, "lastName" VARCHAR, "username" VARCHAR, "gravatar" VARCHAR) AS $$
DECLARE

BEGIN
  RETURN QUERY
    SELECT
      f.id AS "friendshipId",
      u.id AS "friendId",
      u.first_name AS "firstName",
      u.last_name AS "lastName",
      u.username AS "username",
      u.gravatar AS "gravatar"
    FROM users u, friendships f
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
