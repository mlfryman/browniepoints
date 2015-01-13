CREATE OR REPLACE FUNCTION buy_prize (prizeId INTEGER,
                                      friendshipId INTEGER,
                                      fromId INTEGER,
                                      toId INTEGER,
                                      body TEXT,
                                      points INTEGER
                                     )
RETURNS TABLE (tid INTEGER, pid INTEGER) AS $$
DECLARE
  pid INTEGER;
  tid INTEGER;
BEGIN
    INSERT INTO transactions (
                              friendship_id,
                              from_id,
                              to_id,
                              body,
                              points
                             )
    VALUES (
            friendshipId,
            fromId,
            toId,
            body,
            points
           ) RETURNING id INTO tid;

    UPDATE prizes SET owner_id = fromId WHERE id = prizeId RETURNING id INTO pid;

END;
$$ language plpgsql;
