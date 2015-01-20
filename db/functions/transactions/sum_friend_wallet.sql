CREATE OR REPLACE FUNCTION sum_friend_wallet (friendshipId INTEGER, friendId INTEGER)
RETURNS TABLE ("friendWallet" BIGINT) AS $$
DECLARE
  myWallet BIGINT;
BEGIN
  RETURN QUERY
    SELECT
      sum(points) AS "friendWallet"
    FROM transactions t, friendships f
    WHERE(t.to_id = friendId OR t.from_id = friendId)
    AND f.id = friendshipId
    GROUP BY f.id;

END;
$$ LANGUAGE plpgsql;
