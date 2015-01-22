CREATE OR REPLACE FUNCTION sum_friend_wallet (friendshipId INTEGER, friendId INTEGER)
RETURNS BIGINT AS $$
DECLARE
  friendWallet BIGINT;
BEGIN

    friendWallet := (SELECT sum(points) AS "friendWallet"
                   FROM transactions t WHERE(t.to_id = friendId OR t.from_id = friendId)
                   AND t.friendship_id = friendshipId);

    RETURN friendWallet;

END;
$$ LANGUAGE plpgsql;
