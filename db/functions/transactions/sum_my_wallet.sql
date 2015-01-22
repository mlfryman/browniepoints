CREATE OR REPLACE FUNCTION sum_my_wallet (friendshipId INTEGER, myId INTEGER)
RETURNS BIGINT AS $$
DECLARE
  myWallet BIGINT;
BEGIN

    myWallet := (SELECT sum(points) AS "myWallet"
                   FROM transactions t WHERE(t.to_id = myId OR t.from_id = myId)
                   AND t.friendship_id = friendshipId);

    RETURN myWallet;

END;
$$ LANGUAGE plpgsql;
