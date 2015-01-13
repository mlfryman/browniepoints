CREATE OR REPLACE FUNCTION my_wallet (f_id INTEGER, myId INTEGER)
RETURNS INTEGER AS $$
DECLARE
BEGIN
  RETURN

    SELECT sum(points) FROM transactions t, friendships f WHERE (t.to_id = myId OR t.from_id = myId)
    AND f.id = f_id;

END;
$$ LANGUAGE plpgsql;

