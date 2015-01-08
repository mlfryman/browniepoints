CREATE OR REPLACE FUNCTION pending_friendships_by_user (u_id INTEGER)
RETURNS TABLE ("friendshipId" INTEGER, "friendFirstName" VARCHAR, "friendLastName" VARCHAR, "friendUsername" VARCHAR, "friendEmail" VARCHAR, "friendGravatar" VARCHAR) AS $$
DECLARE
BEGIN
  RETURN QUERY
    SELECT f.id AS "friendshipId", u.first_name AS "friendFirstName", u.last_name AS "friendLastName", u.username AS "friendUsername", u.email AS "friendEmail", u.gravatar AS "friendGravatar"
    FROM users u, friendships f
    WHERE
      CASE
        WHEN f.friend1_id = u_id
        THEN f.friend2_id = u.id
        WHEN f.friend2_id = u_id
        THEN f.friend1_id = u.id
      END
    AND f.accepted = FALSE;

END;
$$ LANGUAGE plpgsql;
