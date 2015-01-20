CREATE OR REPLACE FUNCTION sum_my_wallet (friendshipId INTEGER, myId INTEGER)
RETURNS TABLE ("myWallet" BIGINT) AS $$
DECLARE
  myWallet BIGINT;
BEGIN
  RETURN QUERY
    SELECT
      sum(points) AS "myWallet"
    FROM transactions t, friendships f
    WHERE(t.to_id = myId OR t.from_id = myId)
    AND f.id = friendshipId
    GROUP BY f.id;

END;
$$ LANGUAGE plpgsql;
